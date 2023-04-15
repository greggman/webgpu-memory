import {assertEqual, assertFalsy} from '../assert.js';
import {describe, it} from '../mocha-support.js';
import {getWebGPUMemoryUsage} from '../../src/webgpu-memory.js';

describe('device tests', () => {

  it('tracks devices separately', async function() {
    const adapter1 = await navigator.gpu?.requestAdapter();

    if (!adapter1) {
      this.skip();
      return;
    }

    {
      const info = getWebGPUMemoryUsage();
      assertFalsy(info.resources.device);
    }

    const device1 = await adapter1?.requestDevice();

    if (!device1) {
      this.skip();
      return;
    }

    {
      const info = getWebGPUMemoryUsage();
      assertEqual(info.resources.device, 1);
    }

    const adapter2 = await navigator.gpu?.requestAdapter();
    const device2 = await adapter2?.requestDevice();
    if (!device2) {
      device1.destroy();
      this.skip();
      return;
    }

    {
      const info = getWebGPUMemoryUsage();
      assertEqual(info.memory.buffer, 0);
      assertEqual(info.resources.buffer, 0);
      assertEqual(info.resources.device, 2);
    }

    const buffer1 = device1.createBuffer({
      size: 128,
      usage: GPUBufferUsage.COPY_DST,
    });

    {
      const info = getWebGPUMemoryUsage();
      assertEqual(info.memory.buffer, 128);
      assertEqual(info.resources.buffer, 1);
      assertEqual(info.resources.device, 2);
    }

    {
      const info = getWebGPUMemoryUsage(device1);
      assertEqual(info.memory.buffer, 128);
      assertEqual(info.resources.buffer, 1);
      assertEqual(info.resources.device, 1);
    }

    {
      const info = getWebGPUMemoryUsage(device2);
      assertEqual(info.memory.buffer, 0);
      assertEqual(info.resources.buffer, 0);
      assertEqual(info.resources.device, 1);
    }

    const buffer2 = device2.createBuffer({
      size: 256,
      usage: GPUBufferUsage.COPY_DST,
    });

    {
      const info = getWebGPUMemoryUsage();
      assertEqual(info.memory.buffer, 128 + 256);
      assertEqual(info.resources.buffer, 2);
    }

    {
      const info = getWebGPUMemoryUsage(device1);
      assertEqual(info.memory.buffer, 128);
      assertEqual(info.resources.buffer, 1);
    }

    {
      const info = getWebGPUMemoryUsage(device2);
      assertEqual(info.memory.buffer, 256);
      assertEqual(info.resources.buffer, 1);
    }

    buffer1.destroy();

    {
      const info = getWebGPUMemoryUsage();
      assertEqual(info.memory.buffer, 256);
      assertEqual(info.resources.buffer, 1);
    }

    {
      const info = getWebGPUMemoryUsage(device1);
      assertEqual(info.memory.buffer, 0);
      assertEqual(info.resources.buffer, 0);
    }

    {
      const info = getWebGPUMemoryUsage(device2);
      assertEqual(info.memory.buffer, 256);
      assertEqual(info.resources.buffer, 1);
    }

    buffer2.destroy();

    {
      const info = getWebGPUMemoryUsage();
      assertEqual(info.memory.buffer, 0);
      assertEqual(info.resources.buffer, 0);
    }

    {
      const info = getWebGPUMemoryUsage(device1);
      assertEqual(info.memory.buffer, 0);
      assertEqual(info.resources.buffer, 0);
    }

    {
      const info = getWebGPUMemoryUsage(device2);
      assertEqual(info.memory.buffer, 0);
      assertEqual(info.resources.buffer, 0);
    }

    device1.destroy();


    {
      const info = getWebGPUMemoryUsage();
      assertEqual(info.resources.device, 1);
    }

    device2.destroy();


    {
      const info = getWebGPUMemoryUsage();
      assertFalsy(info.resources.device);
    }
  });

  it('frees resources on device destroy', async function() {
    const adapter = await navigator.gpu?.requestAdapter();
    const device = await adapter?.requestDevice();
    if (!device) {
      this.skip();
      return;
    }

    device.createBuffer({
      size: 128,
      usage: GPUBufferUsage.COPY_DST,
    });

    {
      const info = getWebGPUMemoryUsage();
      assertEqual(info.memory.buffer, 128);
      assertEqual(info.resources.buffer, 1);
    }

    device.destroy();

    {
      const info = getWebGPUMemoryUsage();
      assertEqual(info.memory.buffer, 0);
      assertEqual(info.resources.buffer, 0);
    }

    {
      const info = getWebGPUMemoryUsage(device);
      assertEqual(info.memory.buffer, 0);
      assertEqual(info.resources.buffer, 0);
    }
  });

});