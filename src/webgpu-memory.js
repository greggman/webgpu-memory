import { kTextureFormatInfo } from './capabilities-info.js';

/**
 * 
 * @callback ComputeMemSizeFn
 * @param {any} arg
 * @returns {number} The size in bytes
 */

const webgpuMemoryIdSymbol = Symbol('webgpu-memory-object-id');
const deviceIdToDeviceWeakRef = new Map();

/**
 * @typedef {Object} ObjectInfo
 * @property {WeakRef} ref to object
 * @property {number} id object's id (same as key)
 * @property {number} deviceId object's device
 * @property {string} category
 * @property {number|ComputeMemSizeFn} [size]
 */

let nextId = 1;
/** @type {Map<number, ObjectInfo>} */
const allWebGPUObjectsById = new Map();

/**
 * Start tracking a resource by device
 * @param {GPUDevice} device
 * @param {GPUObjectBase} webgpuObject
 * @param {string} category
 * @param {number|ComputeMemSizeFn} [size]
 */
function addDeviceObject(device, webgpuObject, category, size) {
  let id = webgpuObject[webgpuMemoryIdSymbol];
  if (!id) {
    id = nextId++;
    webgpuObject[webgpuMemoryIdSymbol] = id;
  }
  allWebGPUObjectsById.set(id, {
    ref: new WeakRef(webgpuObject),
    id,
    deviceId: device[webgpuMemoryIdSymbol],
    category,
    size,
  });
}

/**
 * Start tracking a resource by device
 * @param {GPUDevice} device
 * @param {GPUTexture | GPUBuffer} webgpuObject
 * @param {string} category
 * @property {number|ComputeMemSizeFn} size
 */
function addDeviceMem(device, webgpuObject, category, size) {
  addDeviceObject(device, webgpuObject, category, size);
}

/**
 * @param {number} deviceId
 * @returns true if device still exists
 */
function deviceExists(deviceId) {
  const ref = deviceIdToDeviceWeakRef.get(deviceId);
  return ref && !!ref.deref();
}

/**
 * Free an object's memory
 * @param {number} id
 */
function freeObjectById(id) {
  allWebGPUObjectsById.delete(id);
}

/**
 * Free the memory used by object.
 * @param {GPUTexture | GPUBuffer} webgpuObject
 * @param {string} category
 */
function freeObject(webgpuObject, category) {
  const id = webgpuObject[webgpuMemoryIdSymbol];
  freeObjectById(id, category);
}

/**
 * @typedef {Object} WebGPUMemoryInfo
 * @property {Object.<string, number>} memory
 * @property {Object.<string, number>} resources
 */

/**
 * Gets WebGPU memory usage. If no device is passed in returns info for all devices.
 *
 * @param {GPUDevice} [device] optional device.
 * @returns {WebGPUMemoryInfo}
 */
export function getWebGPUMemoryUsage(device) {
  const memory = {
    total: 0,
    buffer: 0,
    texture: 0,
    canvas: 0,
  };
  const resources = {
    buffer: 0,
    texture: 0,
  };
  const info = { memory, resources };

  const requestedDeviceId = device && device[webgpuMemoryIdSymbol];

  const idsToDelete = [];
  for (const [id, {ref, deviceId, category, size}] of allWebGPUObjectsById.entries()) {
    const webgpuObject = ref.deref();
    if (!webgpuObject || !deviceExists(deviceId)) {
      idsToDelete.push(id);
    } else {
      if (!requestedDeviceId || deviceId === requestedDeviceId) {
        resources[category] = (resources[category] || 0) + 1;
        if (size) {
          const numBytes = typeof size === 'function' ? size(webgpuObject) : size;
          memory.total += numBytes;
          memory[category] += numBytes;
        }
      }
    }
  }

  idsToDelete.forEach(freeObjectById);

  return info;
}

/**
 *
 * @param {GPUTexture} texture
 * @returns {number} approximate number of bytes used by texture.
 */
function computeTextureMemorySize(texture) {
  const {
    blockWidth,
    blockHeight,
    bytesPerBlock,
  } = kTextureFormatInfo[texture.format];

  let size = 0;
  let width = texture.width;
  let height = texture.height;
  let depth = texture.dimension === '3d' ? texture.depthOrArrayLayers : 1;
  const layers = texture.dimension === '3d' ? 1 : texture.depthOrArrayLayers;

  for (let level = 0; level < texture.mipLevelCount; ++level) {
    const blocksAcross = Math.ceil(width * texture.sampleCount / blockWidth);
    const blocksDown = Math.ceil(height * texture.sampleCount / blockHeight);
    const numBlocks = blocksAcross * blocksDown;
    const bytesUsed = numBlocks * bytesPerBlock;
    size += bytesUsed;
    width = Math.max(1, width / 2 | 0);
    height = Math.max(1, height / 2 | 0);
    depth = Math.max(1, depth / 2);
  }

  size *= layers;

  return size;
}

/**
 * @param {object} object with method to wrap
 * @param {string} name Name of method to wrap
 * @param {} fn
 */
function wrapFunction(object, name, fn) {
  const origFn = object.prototype[name];
  object.prototype[name] = function(...args) {
    const result = origFn.call(this, ...args);
    if (result !== undefined && typeof result.then === 'function') {
      result.then(realResult => fn(this, realResult, ...args));
    } else {
      fn(this, result, ...args);
    }
    return result;
  };
}

/**
 *
 * @param {GPUDevice} device
 * @param {GPUBuffer} buffer
 */
function addBuffer(device, buffer) {
  const bytesUsed = buffer.size;
  addDeviceMem(device, buffer, 'buffer', bytesUsed);
}

/**
 *
 * @param {GPUBuffer} buffer
 */
function removeBuffer(buffer) {
  freeObject(buffer, 'buffer');
}

/**
 *
 * @param {GPUDevice} device
 * @param {GPUTexture} texture
 */
function addTexture(device, texture) {
  const bytesUsed = computeTextureMemorySize(texture);
  addDeviceMem(device, texture, 'texture', bytesUsed);
}

/**
 *
 * @param {GPUTexture} texture
 */
function removeTexture(texture) {
  freeObject(texture, 'texture');
}

function addDevice(adapter, device) {
  addDeviceMem(device, device, 'device', 0);
  const id = device[webgpuMemoryIdSymbol];
  deviceIdToDeviceWeakRef.set(id, new WeakRef(device));
}

function removeDevice(device) {
  const id = device[webgpuMemoryIdSymbol];
  deviceIdToDeviceWeakRef.delete(id);
  freeObject(device, 'device');
}

// assuming there are, in general, 2 textures per canvas.
// The one being displayed and the one being rendered to
const kTexturesPerCanvas = 2;

function computeCanvasBytesUsed(context, format) {
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

function addContext(context, dummy, config) {
  freeObject(context, 'canvas');
  const format = config.format;
  addDeviceMem(config.device, context, 'canvas', (context) => computeCanvasBytesUsed(context, format))
}

function removeContext(context) {
  freeObject(context, 'canvas');
}

function wrapCreationDestroy(factoryClass, objectClass, fnName, category) {
  wrapFunction(factoryClass, fnName, function(device, object) {
    addDeviceObject(device, object, category);
  });
  if (objectClass.prototype.destroy) {
    wrapFunction(objectClass, 'destroy', function(object) {
      freeObject(object, category);
    });
  }
}
/* TODO: remove these! */
/* global GPUAdapter */
/* global GPUBuffer */
/* global GPUDevice */
/* global GPUTexture */
/* global GPUSampler */
/* global GPUBindGroup */
/* global GPUBindGroupLayout */
/* global GPUPipelineLayout */
/* global GPUShaderModule */
/* global GPUComputePipeline */
/* global GPURenderPipeline */
/* global GPUComputePipeline */
/* global GPURenderPipeline */
///* global GPUCommandEncoder */
///* global GPURenderBundleEncoder */
/* global GPUQuerySet */

if (typeof GPUAdapter !== 'undefined') {
  wrapFunction(GPUAdapter, 'requestDevice', addDevice);
  wrapFunction(GPUDevice, 'destroy', removeDevice);

  wrapFunction(GPUCanvasContext, 'configure', addContext);
  wrapFunction(GPUCanvasContext, 'unconfigure', removeContext);

  wrapFunction(GPUDevice, 'createBuffer', addBuffer);
  wrapFunction(GPUBuffer, 'destroy', removeBuffer);
  wrapFunction(GPUDevice, 'createTexture', addTexture);
  wrapFunction(GPUTexture, 'destroy', removeTexture);

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
  wrapCreationDestroy(GPUDevice, GPUQuerySet, 'createQuerySet', 'querySet');
  // problem, no device for this
  // GPURenderBundleEncoder, 'finish'
}
