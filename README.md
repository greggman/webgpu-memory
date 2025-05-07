# WebGPU-Memory

<img src="./webgpu-memory.png" style="max-width: 640px">

This is a WebGPU-Memory tracker. You add the script to your page
before you initialize WebGPU and then for a given context
you can ask how much WebGPU memory you're using.

Note: This is only a guess as various GPUs have different
internal requirements. For example a GPU might
have alignment requirements. Still, this is likely to give
a reasonable approximation.

**You can use this without manually adding to your page
via the [webgpu-dev-extension](https://github.com/greggman/webgpu-dev-extension).**

## Usage

```html
<script src="https://greggman.github.io/webgpu-memory/dist/1.x/webgpu-memory.js" crossorigin></script>
<script>
  const {getWebGPUMemoryUsage} = webgpuMemory;
```

or 

```js
import {getWebGPUMemoryUsage} from 'https://greggman.github.io/webgpu-memory/dist/1.x/webgpu-memory.module.js';
```

Then in your code

```js
  const info = getWebGPUMemoryUsage();
```

The info returned is 

```js
{
  memory: {
    buffer: // bytes used by buffers
    texture: // bytes used by textures
    canvas: // bytes used by canvases
    total: // bytes used in total
    maxTotal: // highest total ever got
  },
  resources: {
    buffer: // count of buffers
    texture: // count of textures
    devices: // count of devices or undefined if none
    canvas: // count of canvases or undefined if none
    sampler: // count of samplers or undefined if none
    bindGroup: // count of bindGroups or undefined if none
    bindGroupLayout: // count of bindGroupLayouts or undefined if none
    pipelineLayout: // count of pipelineLayouts or undefined if none
    shaderModule: // count of shaderModules or undefined if none
    computePipeline: // count of computePipelines or undefined if none
    renderPipeline: // count of renderPipelines or undefined if none
    computePipeline: // count of computePipelines or undefined if none
    renderPipeline: // count of renderPipelines or undefined if none
    querySet: // count of querySets or undefined if none
  },
}
```

By default `getWebGPUMemoryUsage` returns info for all devices.
You can get info for a single device by passing the device.

```js
const allInfo = getWebGPUMemoryUsage();
const deviceSpecificInfo = getWebGPUMemoryUsage(someDevice);
```

## Caveats

1. You must have WebGPU error free code. 

   If your code is generating WebGPU errors you must fix those first
   before using this library. That also means it doesn't handle out-of-memory

2. Most resources in WebGPU are garbage collected

   Only `GPUDevice`, `GPUTexture`, `GPUBuffer`, and `GPUQuerySet` have
   a `destroy` method. All other objects are garbage collected. That
   means, it's unknown when they will actually be collected. So for example,
   if you create 50 bind groups and then stop using them and lose all references
   to them it's undefined how long they will continue to exist.

   The point being, just because the number doesn't go down immediately
   after you stop using the object, doesn't mean you have a bug.

   One possible thing to try, at least in Chrome, you can pass the flag
   `--js-flags="--expose-gc"` and then there should be a global function `gc`
   so you could do

   ```js
   ...release references to objects...
   gc(); 
   const info = getWebGPUMemoryUsage();
   ```

   Still, the resource counts are useful info. If you're not expecting to
   see them increase constantly and they are then you probably have an bug
   that's not losing all references to them.

3. It doesn't track render bundles

   it's on the TODO list

4. Lost contexts are not handled

   it's on the TODO list

## `resetMaxTotal`

You can import `resetMaxTotal` to reset the total.
Pass in a device to reset just one device or pass in no device
to reset all devices.

Example:

```js
import { getWebGPUMemoryUsage, resetMaxTotal } from 'https://greggman.github.io/webgpu-memory/dist/1.x/webgpu-memory.module.js'

const device = await (await navigator.gpu.requestAdapter()).requestDevice();
const b1 = device.createBuffer({size: 128, usage: GPBufferUsage.COPY_DST});
const b2 = device.createBuffer({size: 128, usage: GPBufferUsage.COPY_DST});
b2.destroy();

// shows
//   memory: {
//     total: 128,
//     maxTotal: 256,
//   }
console.log(JSON.stringify(getWebGPUMemoryUsage(), null, 2));

resetMaxTotal();

// shows
//   memory: {
//     total: 128,
//     maxTotal: 128,
//   }
console.log(JSON.stringify(getWebGPUMemoryUsage(), null, 2));
```

## Example:

[Click here for an Example](https://jsgist.org/?src=b0572c68c7168d6d791cc714fe8b604c)

## Development

```bash
git clone https://github.com/greggman/webgpu-memory.git
cd webgpu-memory
npm ci
npm start
```

and go to [`http://localhost:8080/test`](http://localhost:8080/test)

`grep=<some expression>` will limit the tests as in `...?src=true&grep=texture` only
runs the tests with `texture` in their description.

## Live Tests

[tests](https://greggman.github.io/webgpu-memory/test/)  

## Licence

[MIT](https://github.com/greggman/webgpu-memory/blob/main/LICENCE.md)
