import {assertEqual} from '../assert.js';
import {describe, it} from '../mocha-support.js';
import {getWebGPUMemoryUsage} from '../../src/webgpu-memory.js';

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

  const width = 32;
  const height = 16;
  const formats = [
    makeFormatInfo({ format: 'rgba8unorm', bytesPerBlock: 4, dimension: '2d', mipLevelCount: 1, sampleCount: 1, width, height, memSize: width * height * 4, }),
    makeFormatInfo({ format: 'rgba8unorm', bytesPerBlock: 4, dimension: '2d', mipLevelCount: 5, sampleCount: 1, width, height, memSize: width * height * 4, }),
    makeFormatInfo({ format: 'rgba8unorm', bytesPerBlock: 4, dimension: '2d', mipLevelCount: 1, sampleCount: 4, width, height, memSize: width * height * 4, }),
    makeFormatInfo({ format: 'rgba8unorm', bytesPerBlock: 4, dimension: '2d', mipLevelCount: 1, sampleCount: 1, width, height, depthOrArrayLayers: 10, memSize: width * height * 4, }),
    makeFormatInfo({ format: 'rgba8unorm', bytesPerBlock: 4, dimension: '3d', mipLevelCount: 1, sampleCount: 1, width, height, depthOrArrayLayers: 10, memSize: width * height * 4, }),
    makeFormatInfo({ format: 'rgba32float', bytesPerBlock: 16, dimension: '2d', mipLevelCount: 1, sampleCount: 1, width, height, memSize: width * height * 4, }),
    makeFormatInfo({ format: 'rgba32float', bytesPerBlock: 16, dimension: '2d', mipLevelCount: 1, sampleCount: 1, width, height, memSize: width * height * 4, }),
  ];

  for (const {
    format,
    dimension,
    mipLevelCount,
    sampleCount,
    memSize,
    size,
  } of formats) {
    it(
        `tracks textures of format: ${format}, dimension: ${dimension}, sampleCount: ${sampleCount}, mips: ${mipLevelCount}, size: ${size.join('×')}`,
        async function() {
      const adapter = await navigator.gpu?.requestAdapter();
      const device = await adapter?.requestDevice();
      if (!device) {
        this.skip();
        return;
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
    it(`tracks dimension ${dimension} different then others`, async() => {
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