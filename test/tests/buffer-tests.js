import {assertEqual} from '../assert.js';
import {describe, it} from '../mocha-support.js';
import {getWebGPUMemoryUsage, resetMaxTotal} from '../../dist/1.x/webgpu-memory.module.js';

describe('buffer tests', () => {

  beforeEach(() => {
    resetMaxTotal();
  });

  it('tracks buffers', async function() {
    const adapter = await navigator.gpu?.requestAdapter();
    const device = await adapter?.requestDevice();
    if (!device) {
      this.skip();
      return;
    }

    {
      const info = getWebGPUMemoryUsage();
      assertEqual(info.memory.buffer, 0);
      assertEqual(info.resources.buffer, 0);
    }

    const buffer1 = device.createBuffer({
      size: 128,
      usage: GPUBufferUsage.COPY_DST,
    });

    {
      const info = getWebGPUMemoryUsage();
      assertEqual(info.memory.buffer, 128);
      assertEqual(info.resources.buffer, 1);
    }

    const buffer2 = device.createBuffer({
      size: 256,
      usage: GPUBufferUsage.COPY_DST,
    });

    {
      const info = getWebGPUMemoryUsage();
      assertEqual(info.memory.buffer, 128 + 256);
      assertEqual(info.resources.buffer, 2);
    }

    buffer1.destroy();

    {
      const info = getWebGPUMemoryUsage();
      assertEqual(info.memory.buffer, 256);
      assertEqual(info.resources.buffer, 1);
    }

    buffer2.destroy();

    {
      const info = getWebGPUMemoryUsage();
      assertEqual(info.memory.buffer, 0);
      assertEqual(info.resources.buffer, 0);
    }

    device.destroy();
  });

});