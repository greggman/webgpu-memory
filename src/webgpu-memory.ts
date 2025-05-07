import { kTextureFormatInfo } from './capabilities-info.js';

type ComputeMemSizeFn =  (...args: any[]) => number;;

const webgpuMemoryIdSymbol = Symbol('webgpu-memory-object-id');
const deviceIdToDeviceWeakRef = new Map<number, WeakRef<GPUDevice>>();

declare global {
  interface GPUObjectBase {
     [webgpuMemoryIdSymbol]: number;
  }
  interface GPUCanvasContext {
     [webgpuMemoryIdSymbol]: number;
  }
}

type Category = 
  | 'buffer'
  | 'bindGroup'
  | 'bindGroupLayout'
  | 'canvas'
  | 'computePipeline'
  | 'device'
  | 'pipelineLayout'
  | 'querySet'
  | 'renderPipeline'
  | 'sampler'
  | 'shaderModule'
  | 'texture'
  ;

type WebGPUObject = GPUObjectBase | GPUCanvasContext;
type WebGPUObjectInfo = {
  ref: WeakRef<WebGPUObject>,
  id: number,
  deviceId: number,
  category: Category,
  size: number | ComputeMemSizeFn,
};

type DeviceInfo = WebGPUObjectInfo & {
  maxTotal: number,
  runningTotal: number,
};

type CanvasInfo = WebGPUObjectInfo & {
  oldSize: number,
}

let nextId = 1;
const allWebGPUObjectsById = new Map<number, WebGPUObjectInfo | DeviceInfo | CanvasInfo>();
let globalRunningTotal = 0;
let globalMaxTotal = 0;

/**
 * Start tracking a resource by device
 */
function addDeviceObject(
  device: GPUDevice,
  webgpuObject: WebGPUObject,
  category: Category,
  size: number | ComputeMemSizeFn) {
  let id = webgpuObject[webgpuMemoryIdSymbol];
  if (!id) {
    id = nextId++;
    webgpuObject[webgpuMemoryIdSymbol] = id;
  }
  const deviceId = device[webgpuMemoryIdSymbol];
  const info: WebGPUObjectInfo = {
    ref: new WeakRef(webgpuObject),
    id,
    deviceId,
    category,
    size,
  };
  allWebGPUObjectsById.set(id, info);
  if (typeof size === 'function') {
    size = size(webgpuObject);
    (info as CanvasInfo).oldSize = size;
  }
  if (!isNaN(size)) {
    const deviceInfo = allWebGPUObjectsById.get(deviceId) as DeviceInfo;
    updateDeviceInfoRunningTotal(deviceInfo, size);
  }
}

function updateDeviceInfoRunningTotal(deviceInfo: DeviceInfo, size: number) {
  deviceInfo.runningTotal = (deviceInfo.runningTotal ?? 0) + size;
  deviceInfo.maxTotal = Math.max(deviceInfo.maxTotal ?? 0, deviceInfo.runningTotal);
  globalRunningTotal = globalRunningTotal + size;
  globalMaxTotal = Math.max(globalMaxTotal, globalRunningTotal);
}

/**
 * Start tracking a resource by device
 */
function addDeviceMem(
  device: GPUDevice,
  webgpuObject: WebGPUObject,
  category: Category,
  size: number | ComputeMemSizeFn) {
  addDeviceObject(device, webgpuObject, category, size);
}

/**
 */
function deviceExists(deviceId: number) {
  const ref = deviceIdToDeviceWeakRef.get(deviceId);
  return ref && !!ref.deref();
}

/**
 * Free an object's memory
 */
function freeObjectById(id: number, webgpuObject?: WebGPUObject) {
  const obj = allWebGPUObjectsById.get(id);
  const sizer = obj?.size;
  const size = (webgpuObject && typeof sizer === 'function')
    ? sizer(webgpuObject)
    : sizer as number;
  if (!isNaN(size as any)) {
    const deviceInfo = allWebGPUObjectsById.get(obj!.deviceId) as DeviceInfo;
    if (deviceInfo) {
      updateDeviceInfoRunningTotal(deviceInfo, -size);
    }
  }
  allWebGPUObjectsById.delete(id);
}

/**
 * Free the memory used by object.
 */
function freeObject(webgpuObject: WebGPUObject) {
  const id = webgpuObject[webgpuMemoryIdSymbol];
  freeObjectById(id, webgpuObject);
}

type MemoryInfo = {
  total: number,
  buffer: number,
  texture: number,
  querySet: number,
  canvas: number,
  maxTotal: number,
};

type WebGPUMemoryInfo = {
  memory: MemoryInfo,
  resources: { [key: string]: number } 
};

/**
 * Gets WebGPU memory usage. If no device is passed in returns info for all devices.
 */
export function getWebGPUMemoryUsage(device?: GPUDevice) {
  const memory: MemoryInfo = {
    total: 0,
    buffer: 0,
    texture: 0,
    querySet: 0,
    canvas: 0,
    maxTotal: 0,
  };
  const resources: { [key: string]: number } = {
    buffer: 0,
    texture: 0,
    querySet: 0,
  };
  const info = { memory, resources };

  const requestedDeviceId = device && device[webgpuMemoryIdSymbol];

  const idsToDelete: number[] = [];
  for (const [id, info] of allWebGPUObjectsById.entries()) {
    const {ref, deviceId, category, size} = info;
    const webgpuObject = ref.deref();
    if (!webgpuObject || !deviceExists(deviceId)) {
      idsToDelete.push(id);
    } else {
      if (!requestedDeviceId || deviceId === requestedDeviceId) {
        resources[category] = (resources[category] || 0) + 1;
        if (size) {
          const numBytes = typeof size === 'function' ? size(webgpuObject) : size;
          memory.total += numBytes;
          memory[category as unknown as keyof typeof memory] += numBytes;
        }
        if (category === 'device') {
          memory.maxTotal += (info as DeviceInfo).maxTotal;
        }
      }
    }
  }

  if (!device) {
    memory.maxTotal = globalMaxTotal;
  }

  idsToDelete.forEach(id => freeObjectById(id));

  return info;
}

export function resetMaxTotal(device: GPUDevice) {
  const devices: GPUDevice[] = device ? [device] : [];
  let newGlobalMaxTotal = 0;
  if (!device) {
    for (const [id, {ref, category}] of allWebGPUObjectsById.entries()) {
      if (category === 'device') {
        const webgpuObject = ref.deref();
        if (webgpuObject) {
          devices.push(webgpuObject as GPUDevice);
        }
      }
    }
  }

  for (const device of devices) {
    const info = getWebGPUMemoryUsage(device);
    const deviceId = device[webgpuMemoryIdSymbol];
    const deviceInfo = allWebGPUObjectsById.get(deviceId) as DeviceInfo;
    if (deviceInfo) {
      const { total } = info.memory;
      deviceInfo.maxTotal = total;
      newGlobalMaxTotal += total;
    }
  }

  if (!device) {
    globalRunningTotal = newGlobalMaxTotal;
    globalMaxTotal = newGlobalMaxTotal;
  }
}


function computeTextureMemorySize(texture: {
  format: GPUTextureFormat,
  dimension: GPUTextureDimension,
  width: number,
  height: number,
  depthOrArrayLayers: number,
  mipLevelCount: number,
  sampleCount: number,
}) {
  const {
    blockWidth,
    blockHeight,
    bytesPerBlock,
  } = kTextureFormatInfo[texture.format];

  let size = 0;
  let width = texture.width;
  let height = texture.height;
  let depth = texture.depthOrArrayLayers;

  for (let level = 0; level < texture.mipLevelCount; ++level) {
    const blocksAcross = Math.ceil(width * texture.sampleCount / blockWidth);
    const blocksDown = Math.ceil(height * texture.sampleCount / blockHeight);
    const numBlocks = blocksAcross * blocksDown * depth;
    const bytesUsed = numBlocks * bytesPerBlock;
    size += bytesUsed;
    width = Math.max(1, width / 2 | 0);
    height = Math.max(1, height / 2 | 0);
    depth = texture.dimension === '3d' ? Math.max(1, depth / 2 | 0) : depth;
  }

  return size;
}

function addBuffer(device: GPUDevice, buffer: GPUBuffer) {
  const bytesUsed = buffer.size;
  addDeviceMem(device, buffer, 'buffer', bytesUsed);
}

function removeBuffer(buffer: GPUBuffer) {
  freeObject(buffer);
}

function addTexture(device: GPUDevice, texture: GPUTexture) {
  const bytesUsed = computeTextureMemorySize(texture);
  addDeviceMem(device, texture, 'texture', bytesUsed);
}

function removeTexture(texture: GPUTexture) {
  freeObject(texture);
}

function addQuerySet(device: GPUDevice, querySet: GPUQuerySet) {
  const bytesUsed = querySet.count * 8;
  addDeviceMem(device, querySet, 'querySet', bytesUsed);
}

function removeQuerySet(querySet: GPUQuerySet) {
  freeObject(querySet);
}

function addDevice(adapter: GPUAdapter, device: GPUDevice) {
  addDeviceMem(device, device, 'device', 0);
  const id = device[webgpuMemoryIdSymbol];
  deviceIdToDeviceWeakRef.set(id, new WeakRef(device));
}

function removeDevice(device: GPUDevice) {
  const id = device[webgpuMemoryIdSymbol];
  deviceIdToDeviceWeakRef.delete(id);
  freeObject(device);
}

// assuming there are, in general, 2 textures per canvas.
// The one being displayed and the one being rendered to
const kTexturesPerCanvas = 2;

function computeCanvasBytesUsed(context: GPUCanvasContext, format: GPUTextureFormat) {
  const {width, height} = context.canvas;
  return computeTextureMemorySize({
    format,
    width,
    height,
    depthOrArrayLayers: 1,
    sampleCount: 1,
    mipLevelCount: 1,
    dimension: '2d',
  }) * kTexturesPerCanvas;
}

function addContext(context: GPUCanvasContext, dummy: any, config: GPUCanvasConfiguration) {
  freeObject(context);
  const format = config.format;
  addDeviceMem(config.device, context, 'canvas', (context) => computeCanvasBytesUsed(context, format))
}

function removeContext(context: GPUCanvasContext) {
  freeObject(context);
}

function resizeContext(context: GPUCanvasContext) {
  const id = context[webgpuMemoryIdSymbol];
  const info = allWebGPUObjectsById.get(id) as CanvasInfo;
  const deviceInfo = allWebGPUObjectsById.get(info.deviceId) as DeviceInfo;
  updateDeviceInfoRunningTotal(deviceInfo, -info.oldSize);
  const size = (info.size as ComputeMemSizeFn)(context);
  info.oldSize = size;
  updateDeviceInfoRunningTotal(deviceInfo, size);
}

/**
 * Adds a wrapper function to a class method that gets called after the actual function
 */
//function wrapFunction(object, name: string, fn) {
//  const origFn = object.prototype[name];
//  object.prototype[name] = function(...args) {
//    const result = origFn.call(this, ...args);
//    if (result !== undefined && typeof result.then === 'function') {
//      result.then(realResult => fn(this, realResult, ...args));
//    } else {
//      fn(this, result, ...args);
//    }
//    return result;
//  };
//}

function wrapFunction<K extends PropertyKey, T extends Record<K,(...args: Parameters<T[K]>) => any>>(
    API: { prototype: T },
    fnName: K,
    fn: (t: T, obj: ReturnType<T[K]>, ...args: Parameters<T[K]>) => void) {
  const origFn = API.prototype[fnName];
  API.prototype[fnName] = function (this: T, ...args: Parameters<T[K]>) {
    const result = origFn.call(this, ...args);
    fn(this, result, ...args);
    return result;
  } as any;
}

function wrapAsyncFunction<K extends PropertyKey, T extends Record<K,(...args: Parameters<T[K]>) => any>>(
    API: { prototype: T },
    fnName: K,
    fn: (t: T, obj: Awaited<ReturnType<T[K]>>, ...args: Parameters<T[K]>) => void) {
  const origFn = API.prototype[fnName];
  API.prototype[fnName] = async function (this: T, ...args: Parameters<T[K]>) {
    const result = await origFn.call(this, ...args);
    fn(this, result, ...args);
    return result;
  } as any;
}

declare global {
  interface GPUDevice {
    createSampler(descriptor?: any): GPUSampler;
    createBindGroup(descriptor: any): GPUBindGroup;
    createBindGroupLayout(descriptor: any): GPUBindGroupLayout;
    createPipelineLayout(descriptor: any): GPUPipelineLayout;
    createShaderModule(descriptor: any): GPUShaderModule;
    createComputePipeline(descriptor: any): GPUComputePipeline;
    createRenderPipeline(descriptor: any): GPURenderPipeline;
    createComputePipelineAsync(descriptor: any): Promise<GPUComputePipeline>;
    createRenderPipelineAsync(descriptor: any): Promise<GPURenderPipeline>;
    prototype: GPUDevice; // Prototype should be the instance type for 'this' context    
  }
}

function wrapCreationDestroy(factoryClass: any, objectClass: any, fnName: string, category: Category) {
  // @ts-ignore
  wrapFunction(factoryClass, fnName, function (device: GPUDevice, object: WebGPUObject) {
    addDeviceObject(device, object, category, 0);
  });
  if (objectClass.prototype.destroy) {
    wrapFunction(objectClass, 'destroy', function(object: WebGPUObject) {
      freeObject(object);
    });
  }
}

if (typeof GPUAdapter !== 'undefined') {
  wrapAsyncFunction(GPUAdapter, 'requestDevice', addDevice);
  wrapFunction(GPUDevice, 'destroy', removeDevice);

  wrapFunction(GPUCanvasContext, 'configure', addContext);
  wrapFunction(GPUCanvasContext, 'unconfigure', removeContext);
  wrapFunction(GPUCanvasContext, 'getCurrentTexture', resizeContext)

  wrapFunction(GPUDevice, 'createBuffer', addBuffer);
  wrapFunction(GPUBuffer, 'destroy', removeBuffer);
  wrapFunction(GPUDevice, 'createTexture', addTexture);
  wrapFunction(GPUTexture, 'destroy', removeTexture);
  wrapFunction(GPUDevice, 'createQuerySet', addQuerySet);
  wrapFunction(GPUQuerySet, 'destroy', removeQuerySet);

  wrapCreationDestroy(GPUDevice, GPUSampler, 'createSampler', 'sampler');
  wrapCreationDestroy(GPUDevice, GPUBindGroup, 'createBindGroup', 'bindGroup');
  wrapCreationDestroy(GPUDevice, GPUBindGroupLayout, 'createBindGroupLayout', 'bindGroupLayout');
  wrapCreationDestroy(GPUDevice, GPUPipelineLayout, 'createPipelineLayout', 'pipelineLayout');
  wrapCreationDestroy(GPUDevice, GPUShaderModule, 'createShaderModule', 'shaderModule');
  wrapCreationDestroy(GPUDevice, GPUComputePipeline, 'createComputePipeline', 'computePipeline');
  wrapCreationDestroy(GPUDevice, GPURenderPipeline, 'createRenderPipeline', 'renderPipeline');
  wrapCreationDestroy(GPUDevice, GPUComputePipeline, 'createComputePipelineAsync', 'computePipeline');
  wrapCreationDestroy(GPUDevice, GPURenderPipeline, 'createRenderPipelineAsync', 'renderPipeline');
  //wrapCreationDestroy(GPUDevice, GPUCommandEncoder, 'createCommandEncoder', 'commandEncoder');
  //wrapCreationDestroy(GPUDevice, GPURenderBundleEncoder, 'createRenderBundleEncoder', 'renderBundleEncoder');
  // problem, no device for this
  // GPURenderBundleEncoder, 'finish'
}
