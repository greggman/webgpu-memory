# WebGPU-Memory


This is a WebGPU-Memory tracker. You add the script to your page
before you initialize WebGPU and then for a given context
you can ask how much WebGPU memory you're using.

Note: This is only a guess as various GPUs have different
internal requirements. For example a GPU might
have alignment requirements. Still, this is likely to give
a reasonable approximation.

## Usage

```html
<script src="https://greggman.github.io/webgpu-memory/webgpu-memory.js" crossorigin></script>
<script>
  const {getWebGPUMemoryUsage} = webgpuMemory;
```

or 

```js
import {getWebGPUMemoryUsage} from 'https://greggman.github.io/webgpu-memory/webgpu-memory.js';
```

Then in your code

```js
  const info = getWebGPUMemoryUsage();
```

The info returned is 

```js
{
  memory: {
    buffer: <bytes used by buffers>
    texture: <bytes used by textures>
    total: <bytes used in total>
  },
  resources: {
    buffer: <count of buffers>,
    texture: <count of textures>
  }
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
   before using this library.

2. It's not currently tracking canvas memory

   it's on the TODO list.

## Example:

[Click here for an Example](https://jsgist.org/?src=b0572c68c7168d6d791cc714fe8b604c)

## Development

```bash
git clone https://github.com/greggman/webgpu-memory.git
cd webgpu-memory
npm install
```

now serve the folder

```
npx servez
```

and go to [`http://localhost:8080/test?src=true`](http://localhost:8080/test?src=true)

`src=true` tells the test harness to use the unrolled source from the `src` folder
where as without it uses `webgpu-memory.js` in the root folder which is built using
`npm run build`.

`grep=<some expression>` will limit the tests as in `...?src=true&grep=texture` only
runs the tests with `texture` in their description.

## Live Tests

[built version](https://greggman.github.io/webgpu-memory/test/)  
[source version](https://greggman.github.io/webgpu-memory/test/?src=true)

## Licence

[MIT](https://github.com/greggman/webgpu-memory/blob/main/LICENCE.md)
