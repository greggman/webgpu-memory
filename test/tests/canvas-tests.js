import {assertEqual, assertFalsy} from '../assert.js';
import {describe, it} from '../mocha-support.js';
import {getWebGPUMemoryUsage} from '../../src/webgpu-memory.js';

describe('canvas tests', () => {

  const kInitialCanvasSize = 300 * 150 * 4 * 2;
  const kNewCanvasSize1 = 500 * 150 * 4 * 2;
  const kNewCanvasSize2 = 400 * 150 * 4 * 2;

  async function testCanvas(canvas1, canvas2) {
    const adapter = await navigator.gpu?.requestAdapter();
    const device = await adapter?.requestDevice();
    if (!device) {
      this.skip();
      return;
    }

    {
      const info = getWebGPUMemoryUsage();
      assertFalsy(info.resources.canvas, 0);
    }

    const context1 = canvas1.getContext('webgpu');
    context1.configure({
      format: 'bgra8unorm',
      device,
      alphaMode: 'opaque',
    });

    {
      const info = getWebGPUMemoryUsage();
      assertEqual(info.resources.canvas, 1);
      assertEqual(info.memory.total, kInitialCanvasSize);
      assertEqual(info.memory.maxTotal, kInitialCanvasSize);
      assertEqual(info.memory.canvas, kInitialCanvasSize);
    }

    const context2 = canvas2.getContext('webgpu');
    context2.configure({
      format: 'bgra8unorm',
      device,
      alphaMode: 'opaque',
    });

    {
      const info = getWebGPUMemoryUsage();
      assertEqual(info.resources.canvas, 2);
      assertEqual(info.memory.total, kInitialCanvasSize * 2);
      assertEqual(info.memory.maxTotal, kInitialCanvasSize * 2);
      assertEqual(info.memory.canvas, kInitialCanvasSize * 2);
    }

    canvas1.width = 500;
    context1.getCurrentTexture();

    {
      const info = getWebGPUMemoryUsage();
      assertEqual(info.resources.canvas, 2);
      assertEqual(info.memory.total, kNewCanvasSize1 + kInitialCanvasSize);
      assertEqual(info.memory.maxTotal, kNewCanvasSize1 + kInitialCanvasSize);
      assertEqual(info.memory.canvas, kNewCanvasSize1 + kInitialCanvasSize);
    }

    // smaller than before. maxTotal should stay large
    canvas1.width = 400;
    context1.getCurrentTexture();

    {
      const info = getWebGPUMemoryUsage();
      assertEqual(info.resources.canvas, 2);
      assertEqual(info.memory.total, kNewCanvasSize2 + kInitialCanvasSize);
      assertEqual(info.memory.maxTotal, kNewCanvasSize1 + kInitialCanvasSize);
      assertEqual(info.memory.canvas, kNewCanvasSize2 + kInitialCanvasSize);
    }

    context1.unconfigure();

    {
      const info = getWebGPUMemoryUsage();
      assertEqual(info.resources.canvas, 1);
      assertEqual(info.memory.total, kInitialCanvasSize);
      assertEqual(info.memory.maxTotal, kNewCanvasSize1 + kInitialCanvasSize);
      assertEqual(info.memory.canvas, kInitialCanvasSize);
    }

    context2.unconfigure();

    {
      const info = getWebGPUMemoryUsage();
      assertFalsy(info.resources.canvas);
      assertEqual(info.memory.total, 0);
      assertEqual(info.memory.maxTotal, kNewCanvasSize1 + kInitialCanvasSize);
      assertEqual(info.memory.canvas, 0);
    }

    device.destroy();
  }

  it('tracks HTMLCanvasElement', async function() {
    const canvas1 = document.createElement('canvas');
    const canvas2 = document.createElement('canvas');
    await testCanvas(canvas1, canvas2);
  });

  it('tracks OffscreenCanvas', async function() {
    const canvas1 = new OffscreenCanvas(300, 150);
    const canvas2 = new OffscreenCanvas(300, 150);
    await testCanvas(canvas1, canvas2);
  });

  it('swaps canvases when reconfigured to a different device', async function() {
    const adapter1 = await navigator.gpu?.requestAdapter();
    const device1 = await adapter1?.requestDevice();
    const adapter2 = await navigator.gpu?.requestAdapter();
    const device2 = await adapter2?.requestDevice();
    if (!device1 || ! device2) {
      if (device1) {
        device1.destroy();
      }
      if (device2) {
        device2.destroy();
      }
      this.skip();
      return;
    }

    const canvas = new OffscreenCanvas(300, 150);
    const context = canvas.getContext('webgpu');
    context.configure({
      device: device1,
      format: 'bgra8unorm',
      alphaMode: 'opaque',
    });

    {
      const info = getWebGPUMemoryUsage(device1);
      assertEqual(info.resources.canvas, 1);
      assertEqual(info.memory.total, kInitialCanvasSize);
      assertEqual(info.memory.canvas, kInitialCanvasSize);
    }

    {
      const info = getWebGPUMemoryUsage(device2);
      assertFalsy(info.resources.canvas, 0);
      assertEqual(info.memory.total, 0);
      assertEqual(info.memory.canvas, 0);
    }

    context.configure({
      device: device2,
      format: 'bgra8unorm',
      alphaMode: 'opaque',
    });

    {
      const info = getWebGPUMemoryUsage(device1);
      assertFalsy(info.resources.canvas, 0);
      assertEqual(info.memory.total, 0);
      assertEqual(info.memory.canvas, 0);
    }

    {
      const info = getWebGPUMemoryUsage(device2);
      assertEqual(info.resources.canvas, 1);
      assertEqual(info.memory.total, kInitialCanvasSize);
      assertEqual(info.memory.canvas, kInitialCanvasSize);
    }

    device1.destroy()
    device2.destroy();

  });

});