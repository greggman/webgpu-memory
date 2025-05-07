import {assertEqual} from '../assert.js';
import {describe, it} from '../mocha-support.js';
import {getWebGPUMemoryUsage, resetMaxTotal} from '../../dist/1.x/webgpu-memory.module.js';

describe('querySet tests', () => {

  beforeEach(() => {
    resetMaxTotal();
  });

  it('tracks querySets', async function() {
    const adapter = await navigator.gpu?.requestAdapter();
    const device = await adapter?.requestDevice();
    if (!device) {
      this.skip();
      return;
    }

    {
      const info = getWebGPUMemoryUsage();
      assertEqual(info.memory.querySet, 0);
      assertEqual(info.resources.querySet, 0);
    }

    const querySet1 = device.createQuerySet({
      type: 'occlusion',
      count: 20,
    });

    {
      const info = getWebGPUMemoryUsage();
      assertEqual(info.memory.querySet, 160);
      assertEqual(info.resources.querySet, 1);
    }

    const querySet2 = device.createQuerySet({
      type: 'occlusion',
      count: 10,
    });

    {
      const info = getWebGPUMemoryUsage();
      assertEqual(info.memory.querySet, 160 + 80);
      assertEqual(info.resources.querySet, 2);
    }

    querySet1.destroy();

    {
      const info = getWebGPUMemoryUsage();
      assertEqual(info.memory.querySet, 80);
      assertEqual(info.resources.querySet, 1);
    }

    querySet2.destroy();

    {
      const info = getWebGPUMemoryUsage();
      assertEqual(info.memory.querySet, 0);
      assertEqual(info.resources.querySet, 0);
    }

    device.destroy();
  });

});