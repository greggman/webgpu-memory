import {assertEqual} from '../assert.js';
import {describe, it} from '../mocha-support.js';
import {getWebGPUMemoryUsage, resetMaxTotal} from '../../dist/1.x/webgpu-memory.module.js';

function makeFormatInfo(textureInfo) {
  let byteSize = 0;
  let width = textureInfo.width;
  let height = textureInfo.height;
  let depth = textureInfo.depthOrArrayLayers || 1;
  const {
    bytesPerBlock,
    blockWidth = 1,
    blockHeight = 1,
  } = textureInfo;
  const size = [width, height, textureInfo.depthOrArrayLayers || 1];

  for (let level = 0; level < textureInfo.mipLevelCount; ++level) {
    const blocksAcross = Math.ceil(width * textureInfo.sampleCount / blockWidth);
    const blocksDown = Math.ceil(height * textureInfo.sampleCount / blockHeight);
    const numBlocks = blocksAcross * blocksDown * depth;
    const bytesUsed = numBlocks * bytesPerBlock;
    byteSize += bytesUsed;
    width = Math.max(1, width / 2 | 0);
    height = Math.max(1, height / 2 | 0);
    depth = textureInfo.dimension === '3d' ? Math.max(1, depth / 2 | 0) : depth;
  }

  return {
    ...textureInfo,
    memSize: byteSize,
    size,
  };
}


describe('texture tests', () => {

  beforeEach(() => {
    resetMaxTotal();
  });

  const width = 32;
  const height = 16;
  const formats = [
    makeFormatInfo({ format: 'rgba8unorm', bytesPerBlock: 4, dimension: '2d', mipLevelCount: 1, sampleCount: 1, width, height }),
    makeFormatInfo({ format: 'rgba8unorm', bytesPerBlock: 4, dimension: '2d', mipLevelCount: 5, sampleCount: 1, width, height }),
    makeFormatInfo({ format: 'rgba8unorm', bytesPerBlock: 4, dimension: '2d', mipLevelCount: 1, sampleCount: 4, width, height }),
    makeFormatInfo({ format: 'rgba8unorm', bytesPerBlock: 4, dimension: '2d', mipLevelCount: 1, sampleCount: 1, width, height, depthOrArrayLayers: 10 }),
    makeFormatInfo({ format: 'rgba8unorm', bytesPerBlock: 4, dimension: '3d', mipLevelCount: 1, sampleCount: 1, width, height, depthOrArrayLayers: 10 }),
    makeFormatInfo({ format: 'rgba32float', bytesPerBlock: 16, dimension: '2d', mipLevelCount: 1, sampleCount: 1, width, height }),
    makeFormatInfo({ format: 'depth16unorm', bytesPerBlock: 2, dimension: '2d', mipLevelCount: 1, sampleCount: 1, width, height }),
    makeFormatInfo({ format: 'depth24plus', bytesPerBlock: 4, dimension: '2d', mipLevelCount: 1, sampleCount: 1, width, height }),
    makeFormatInfo({ format: 'depth24plus-stencil8', bytesPerBlock: 4, dimension: '2d', mipLevelCount: 1, sampleCount: 1, width, height }),
    makeFormatInfo({ format: 'depth32float', bytesPerBlock: 4, dimension: '2d', mipLevelCount: 1, sampleCount: 1, width, height }),
    makeFormatInfo({ format: 'depth32float-stencil8', bytesPerBlock: 5, dimension: '2d', mipLevelCount: 1, sampleCount: 1, width, height, feature: 'depth32float-stencil8' }),
  ];

  for (const {
    format,
    dimension,
    mipLevelCount,
    sampleCount,
    size,
    feature,
    memSize,
  } of formats) {
    it(
        `tracks textures of format: ${format}, dimension: ${dimension}, sampleCount: ${sampleCount}, mips: ${mipLevelCount}, size: ${size.join('×')}`,
        async function() {
      const adapter = await navigator.gpu?.requestAdapter();
      const device = await adapter?.requestDevice({ requiredFeatures: adapter.features });
      if (!device) {
        this.skip();
        return;
      }

      if (feature && !device.features.has(feature)) {
        this.skip(`missing feature: ${feature}`);
      }

      const usage = GPUTextureUsage.TEXTURE_BINDING |
          (sampleCount > 1 ? GPUTextureUsage.RENDER_ATTACHMENT : 0);

      {
        const info = getWebGPUMemoryUsage();
        assertEqual(info.memory.texture, 0);
      }

      const texture1 = device.createTexture({
        size,
        format,
        dimension,
        mipLevelCount,
        sampleCount,
        usage,
      });

      {
        const info = getWebGPUMemoryUsage();
        assertEqual(info.memory.texture, memSize);
      }

      const texture2 = device.createTexture({
        size,
        format,
        dimension,
        mipLevelCount,
        sampleCount,
        usage,
      });

      {
        const info = getWebGPUMemoryUsage();
        assertEqual(info.memory.texture, memSize * 2);
      }

      texture1.destroy();

      {
        const info = getWebGPUMemoryUsage();
        assertEqual(info.memory.texture, memSize);
      }

      texture2.destroy();

      {
        const info = getWebGPUMemoryUsage();
        assertEqual(info.memory.texture, 0);
      }

      device.destroy();
    });
  }

  [
    {
      dimension: '2d',
      memSize: 4 * 4 * 4 * 4 +
               2 * 2 * 4 * 4 +
               1 * 1 * 4 * 4,
    },
    {
      dimension: '3d',
      memSize: 4 * 4 * 4 * 4 +
               2 * 2 * 2 * 4 +
               1 * 1 * 1 * 4,
    },
  ].forEach(({dimension, memSize}) => {
    it(`tracks dimension ${dimension} different than others`, async() => {
      const adapter = await navigator.gpu?.requestAdapter();
      const device = await adapter?.requestDevice();
      if (!device) {
        this.skip();
        return;
      }

      {
        const info = getWebGPUMemoryUsage();
        assertEqual(info.memory.texture, 0);
      }

      const texture = device.createTexture({
        dimension,
        size: [4, 4, 4],
        mipLevelCount: 3,
        format: 'rgba8unorm',
        usage: GPUTextureUsage.TEXTURE_BINDING,
      });

      {
        const info = getWebGPUMemoryUsage();
        assertEqual(info.memory.texture, memSize);
      }

      texture.destroy();

      {
        const info = getWebGPUMemoryUsage();
        assertEqual(info.memory.texture, 0);
      }

      device.destroy();
    });
  });
});