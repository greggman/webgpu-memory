import {assertEqual, assertFalsy} from '../assert.js';
import {describe, it} from '../mocha-support.js';
import {getWebGPUMemoryUsage, resetMaxTotal} from '../../dist/1.x/webgpu-memory.module.js';

describe('device tests', () => {

  beforeEach(() => {
    resetMaxTotal();
  });

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
      assertEqual(info.memory.maxTotal, 128);
      assertEqual(info.resources.buffer, 1);
      assertEqual(info.resources.device, 2);
    }

    {
      const info = getWebGPUMemoryUsage(device1);
      assertEqual(info.memory.buffer, 128);
      assertEqual(info.memory.maxTotal, 128);
      assertEqual(info.resources.buffer, 1);
      assertEqual(info.resources.device, 1);
    }

    {
      const info = getWebGPUMemoryUsage(device2);
      assertEqual(info.memory.buffer, 0);
      assertEqual(info.memory.maxTotal, 0);
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
      assertEqual(info.memory.maxTotal, 128 + 256);
      assertEqual(info.resources.buffer, 2);
    }

    {
      const info = getWebGPUMemoryUsage(device1);
      assertEqual(info.memory.buffer, 128);
      assertEqual(info.memory.maxTotal, 128);
      assertEqual(info.resources.buffer, 1);
    }

    {
      const info = getWebGPUMemoryUsage(device2);
      assertEqual(info.memory.buffer, 256);
      assertEqual(info.memory.maxTotal, 256);
      assertEqual(info.resources.buffer, 1);
    }

    buffer1.destroy();

    {
      const info = getWebGPUMemoryUsage();
      assertEqual(info.memory.buffer, 256);
      assertEqual(info.memory.maxTotal, 256 + 128);
      assertEqual(info.resources.buffer, 1);
    }

    {
      const info = getWebGPUMemoryUsage(device1);
      assertEqual(info.memory.buffer, 0);
      assertEqual(info.memory.maxTotal, 128);
      assertEqual(info.resources.buffer, 0);
    }

    {
      const info = getWebGPUMemoryUsage(device2);
      assertEqual(info.memory.buffer, 256);
      assertEqual(info.memory.maxTotal, 256);
      assertEqual(info.resources.buffer, 1);
    }

    buffer2.destroy();

    {
      const info = getWebGPUMemoryUsage();
      assertEqual(info.memory.buffer, 0);
      assertEqual(info.memory.maxTotal, 256 + 128);
      assertEqual(info.resources.buffer, 0);
    }

    {
      const info = getWebGPUMemoryUsage(device1);
      assertEqual(info.memory.buffer, 0);
      assertEqual(info.memory.maxTotal, 128);
      assertEqual(info.resources.buffer, 0);
    }

    {
      const info = getWebGPUMemoryUsage(device2);
      assertEqual(info.memory.buffer, 0);
      assertEqual(info.memory.maxTotal, 256);
      assertEqual(info.resources.buffer, 0);
    }

    device1.destroy();


    {
      const info = getWebGPUMemoryUsage();
      assertEqual(info.memory.maxTotal, 256 + 128);
      assertEqual(info.resources.device, 1);
    }

    device2.destroy();

    {
      const info = getWebGPUMemoryUsage();
      assertFalsy(info.resources.device);
      assertEqual(info.memory.maxTotal, 256 + 128);
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

  it('resets maxTotal', async () => {

    const adapter1 = await navigator.gpu?.requestAdapter();
    if (!adapter1) {
      this.skip();
      return;
    }

    const device1 = await adapter1?.requestDevice();
    if (!device1) {
      this.skip();
      return;
    }

    const adapter2 = await navigator.gpu?.requestAdapter();
    const device2 = await adapter2?.requestDevice();
    if (!device2) {
      device1.destroy();
      this.skip();
      return;
    }

    const buffer1 = device1.createBuffer({
      size: 128,
      usage: GPUBufferUsage.COPY_DST,
    });
    const buffer2 = device2.createBuffer({
      size: 256,
      usage: GPUBufferUsage.COPY_DST,
    });

    {
      const info = getWebGPUMemoryUsage();
      assertEqual(info.memory.buffer, 128 + 256);
      assertEqual(info.memory.maxTotal, 128 + 256);
    }

    resetMaxTotal(device1);

    {
      const info = getWebGPUMemoryUsage();
      assertEqual(info.memory.buffer, 128 + 256);
      assertEqual(info.memory.maxTotal, 128 + 256);
    }

    buffer1.destroy();

    {
      const info = getWebGPUMemoryUsage();
      assertEqual(info.memory.buffer, 256);
      assertEqual(info.memory.maxTotal, 128 + 256);
    }

    resetMaxTotal(device1);

    {
      const info = getWebGPUMemoryUsage();
      assertEqual(info.memory.buffer, 256);
      assertEqual(info.memory.maxTotal, 128 + 256);
    }

    {
      const info = getWebGPUMemoryUsage(device1);
      assertEqual(info.memory.buffer, 0);
      assertEqual(info.memory.maxTotal, 0);
    }

    {
      const info = getWebGPUMemoryUsage(device2);
      assertEqual(info.memory.buffer, 256);
      assertEqual(info.memory.maxTotal, 256);
    }

    buffer2.destroy();
    resetMaxTotal(device2);

    {
      const info = getWebGPUMemoryUsage();
      assertEqual(info.memory.buffer, 0);
      assertEqual(info.memory.maxTotal, 128 + 256);
    }

    {
      const info = getWebGPUMemoryUsage(device2);
      assertEqual(info.memory.buffer, 0);
      assertEqual(info.memory.maxTotal, 0);
    }

    const buffer3 = device1.createBuffer({
      size: 128,
      usage: GPUBufferUsage.COPY_DST,
    });
    const buffer4 = device1.createBuffer({
      size: 256,
      usage: GPUBufferUsage.COPY_DST,
    });

    {
      const info = getWebGPUMemoryUsage();
      assertEqual(info.memory.buffer, 128 + 256);
      assertEqual(info.memory.maxTotal, 128 + 256);
    }

    buffer3.destroy();
    buffer4.destroy();

    {
      const info = getWebGPUMemoryUsage();
      assertEqual(info.memory.buffer, 0);
      assertEqual(info.memory.maxTotal, 128 + 256);
    }

    resetMaxTotal();

    {
      const info = getWebGPUMemoryUsage();
      assertEqual(info.memory.buffer, 0);
      assertEqual(info.memory.maxTotal, 0);
    }

    {
      const info = getWebGPUMemoryUsage(device1);
      assertEqual(info.memory.buffer, 0);
      assertEqual(info.memory.maxTotal, 0);
    }

    {
      const info = getWebGPUMemoryUsage(device2);
      assertEqual(info.memory.buffer, 0);
      assertEqual(info.memory.maxTotal, 0);
    }

  });

  it('tracks maxTotal - regression test 01', async () => {
    // bug where maxTotal is reset on allocation
    const adapter = await navigator.gpu?.requestAdapter();
    if (!adapter) {
      this.skip();
      return;
    }

    const device = await adapter?.requestDevice();
    if (!device) {
      this.skip();
      return;
    }

    const buffer1 = device.createBuffer({
      size: 128,
      usage: GPUBufferUsage.COPY_DST,
    });
    const buffer2 = device.createBuffer({
      size: 256,
      usage: GPUBufferUsage.COPY_DST,
    });
    buffer2.destroy();
    const buffer3 = device.createBuffer({
      size: 128,
      usage: GPUBufferUsage.COPY_DST,
    });

    {
      const info = getWebGPUMemoryUsage();
      assertEqual(info.memory.buffer, 128 + 128);
      assertEqual(info.memory.maxTotal, 128 + 256);
    }

    buffer1.destroy();
    buffer3.destroy();

    {
      const info = getWebGPUMemoryUsage();
      assertEqual(info.memory.buffer, 0);
      assertEqual(info.memory.maxTotal, 128 + 256);
    }

    device.destroy();

  });

});