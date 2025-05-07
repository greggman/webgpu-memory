/* eslint-disable no-sparse-arrays */

/*
This file was copied and modified from the WebGPU Conformance Test Suite
https://github.com/gpuweb/cts/blob/main/src/webgpu/capability_info.ts

Note: Changes include adding bytesPerBlock to depth24plus, depth24plus-stencil8
and depth32-stencil8

Copyright 2019 WebGPU CTS Contributors

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

   1. Redistributions of source code must retain the above copyright notice,
      this list of conditions and the following disclaimer.

   2. Redistributions in binary form must reproduce the above copyright notice,
      this list of conditions and the following disclaimer in the documentation
      and/or other materials provided with the distribution.

   3. Neither the name of the copyright holder nor the names of its
      contributors may be used to endorse or promote products derived from this
      software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

function keysOf<T extends string>(obj: { [k in T]?: unknown }): readonly T[] {
  return Object.keys(obj) as unknown[] as T[];
}

/**
 * Defaults applied to all texture format tables automatically. Used only inside
 * `formatTableWithDefaults`. This ensures keys are never missing, always explicitly `undefined`.
 *
 * All top-level keys must be defined here, or they won't be exposed at all.
 * Documentation is also written here; this makes it propagate through to the end types.
 */
const kFormatUniversalDefaults = {
  /** Texel block width. */
  blockWidth: undefined,
  /** Texel block height. */
  blockHeight: undefined,
  color: undefined,
  depth: undefined,
  stencil: undefined,
  /**
   * Info when this format can be used as a color render target. The format may require a feature
   * to actually be used as a render target. Eg: rg11b10ufloat which requires rg11b10ufloat-renderable
   * Call {@link isTextureFormatPossiblyUsableAsColorRenderAttachment} before having a device
   * Call {@link isTextureFormatColorRenderable}(device, format) to find out for a particular device.
   * Use {@link kPossibleColorRenderableTextureFormats} for params.
   */
  colorRender: undefined,
  /**
   * Whether the format can possibly be used as a multisample texture. The format may require a
   * feature to actually multisampled. Eg: rg11b10ufloat which requires rg11b10ufloat-renderable
   * Call {@link isTextureFormatPossiblyMultisampled} before having a device
   * Call {@link isTextureFormatMultisampled}(device, format) to find out for a particular device.
   * Use {@link kPossibleMultisampledTextureFormats} for params.
   */
  multisample: undefined,
  /** Optional feature required to use this format, or `undefined` if none. */
  feature: undefined,
  /** The base format for srgb formats. Specified on both srgb and equivalent non-srgb formats. */
  baseFormat: undefined,

  /** @deprecated Use `.color.bytes`, `.depth.bytes`, or `.stencil.bytes`. */
  bytesPerBlock: undefined,

  // IMPORTANT:
  // Add new top-level keys both here and in TextureFormatInfo_TypeCheck.
} ;
/**
 * Takes `table` and applies `defaults` to every row, i.e. for each row,
 * `{ ... kUniversalDefaults, ...defaults, ...row }`.
 * This only operates at the first level; it doesn't support defaults in nested objects.
 */
function formatTableWithDefaults<Defaults extends {}, Table extends { readonly [K: string]: {} }>({
  defaults,
  table,
}: {
  defaults: Defaults;
  table: Table;
}): {
  readonly [F in keyof Table]: {
    readonly [K in keyof typeof kFormatUniversalDefaults]: K extends keyof Table[F]
      ? Table[F][K]
      : K extends keyof Defaults
      ? Defaults[K]
      : (typeof kFormatUniversalDefaults)[K];
  };
} {
  return Object.fromEntries(
    Object.entries(table).map(([k, row]) => [
      k,
      { ...kFormatUniversalDefaults, ...defaults, ...row },
    ])
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  ) as any;
}

/** "plain color formats", plus rgb9e5ufloat. */
const kRegularTextureFormatInfo = formatTableWithDefaults({
  defaults: { blockWidth: 1, blockHeight: 1 },
  table: {
    // plain, 8 bits per component

    r8unorm: {
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 1,
      },
      colorRender: { blend: true, resolve: true, byteCost: 1, alignment: 1 },
      multisample: true,
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },
    r8snorm: {
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 1,
      },
      multisample: false,
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },
    r8uint: {
      color: {
        type: 'uint',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 1,
      },
      colorRender: { blend: false, resolve: false, byteCost: 1, alignment: 1 },
      multisample: true,
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },
    r8sint: {
      color: {
        type: 'sint',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 1,
      },
      colorRender: { blend: false, resolve: false, byteCost: 1, alignment: 1 },
      multisample: true,
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },

    rg8unorm: {
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 2,
      },
      colorRender: { blend: true, resolve: true, byteCost: 2, alignment: 1 },
      multisample: true,
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },
    rg8snorm: {
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 2,
      },
      multisample: false,
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },
    rg8uint: {
      color: {
        type: 'uint',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 2,
      },
      colorRender: { blend: false, resolve: false, byteCost: 2, alignment: 1 },
      multisample: true,
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },
    rg8sint: {
      color: {
        type: 'sint',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 2,
      },
      colorRender: { blend: false, resolve: false, byteCost: 2, alignment: 1 },
      multisample: true,
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },

    rgba8unorm: {
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: true,
        readWriteStorage: false,
        bytes: 4,
      },
      colorRender: { blend: true, resolve: true, byteCost: 8, alignment: 1 },
      multisample: true,
      baseFormat: 'rgba8unorm',
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },
    'rgba8unorm-srgb': {
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 4,
      },
      colorRender: { blend: true, resolve: true, byteCost: 8, alignment: 1 },
      multisample: true,
      baseFormat: 'rgba8unorm',
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },
    rgba8snorm: {
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: true,
        readWriteStorage: false,
        bytes: 4,
      },
      multisample: false,
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },
    rgba8uint: {
      color: {
        type: 'uint',
        copySrc: true,
        copyDst: true,
        storage: true,
        readWriteStorage: false,
        bytes: 4,
      },
      colorRender: { blend: false, resolve: false, byteCost: 4, alignment: 1 },
      multisample: true,
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },
    rgba8sint: {
      color: {
        type: 'sint',
        copySrc: true,
        copyDst: true,
        storage: true,
        readWriteStorage: false,
        bytes: 4,
      },
      colorRender: { blend: false, resolve: false, byteCost: 4, alignment: 1 },
      multisample: true,
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },
    bgra8unorm: {
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 4,
      },
      colorRender: { blend: true, resolve: true, byteCost: 8, alignment: 1 },
      multisample: true,
      baseFormat: 'bgra8unorm',
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },
    'bgra8unorm-srgb': {
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 4,
      },
      colorRender: { blend: true, resolve: true, byteCost: 8, alignment: 1 },
      multisample: true,
      baseFormat: 'bgra8unorm',
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },

    // plain, 16 bits per component

    r16uint: {
      color: {
        type: 'uint',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 2,
      },
      colorRender: { blend: false, resolve: false, byteCost: 2, alignment: 2 },
      multisample: true,
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },
    r16sint: {
      color: {
        type: 'sint',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 2,
      },
      colorRender: { blend: false, resolve: false, byteCost: 2, alignment: 2 },
      multisample: true,
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },
    r16float: {
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 2,
      },
      colorRender: { blend: true, resolve: true, byteCost: 2, alignment: 2 },
      multisample: true,
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },

    rg16uint: {
      color: {
        type: 'uint',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 4,
      },
      colorRender: { blend: false, resolve: false, byteCost: 4, alignment: 2 },
      multisample: true,
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },
    rg16sint: {
      color: {
        type: 'sint',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 4,
      },
      colorRender: { blend: false, resolve: false, byteCost: 4, alignment: 2 },
      multisample: true,
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },
    rg16float: {
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 4,
      },
      colorRender: { blend: true, resolve: true, byteCost: 4, alignment: 2 },
      multisample: true,
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },

    rgba16uint: {
      color: {
        type: 'uint',
        copySrc: true,
        copyDst: true,
        storage: true,
        readWriteStorage: false,
        bytes: 8,
      },
      colorRender: { blend: false, resolve: false, byteCost: 8, alignment: 2 },
      multisample: true,
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },
    rgba16sint: {
      color: {
        type: 'sint',
        copySrc: true,
        copyDst: true,
        storage: true,
        readWriteStorage: false,
        bytes: 8,
      },
      colorRender: { blend: false, resolve: false, byteCost: 8, alignment: 2 },
      multisample: true,
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },
    rgba16float: {
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: true,
        readWriteStorage: false,
        bytes: 8,
      },
      colorRender: { blend: true, resolve: true, byteCost: 8, alignment: 2 },
      multisample: true,
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },

    // plain, 32 bits per component

    r32uint: {
      color: {
        type: 'uint',
        copySrc: true,
        copyDst: true,
        storage: true,
        readWriteStorage: true,
        bytes: 4,
      },
      colorRender: { blend: false, resolve: false, byteCost: 4, alignment: 4 },
      multisample: false,
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },
    r32sint: {
      color: {
        type: 'sint',
        copySrc: true,
        copyDst: true,
        storage: true,
        readWriteStorage: true,
        bytes: 4,
      },
      colorRender: { blend: false, resolve: false, byteCost: 4, alignment: 4 },
      multisample: false,
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },
    r32float: {
      color: {
        type: 'unfilterable-float',
        copySrc: true,
        copyDst: true,
        storage: true,
        readWriteStorage: true,
        bytes: 4,
      },
      colorRender: { blend: false, resolve: false, byteCost: 4, alignment: 4 },
      multisample: true,
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },

    rg32uint: {
      color: {
        type: 'uint',
        copySrc: true,
        copyDst: true,
        storage: true,
        readWriteStorage: false,
        bytes: 8,
      },
      colorRender: { blend: false, resolve: false, byteCost: 8, alignment: 4 },
      multisample: false,
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },
    rg32sint: {
      color: {
        type: 'sint',
        copySrc: true,
        copyDst: true,
        storage: true,
        readWriteStorage: false,
        bytes: 8,
      },
      colorRender: { blend: false, resolve: false, byteCost: 8, alignment: 4 },
      multisample: false,
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },
    rg32float: {
      color: {
        type: 'unfilterable-float',
        copySrc: true,
        copyDst: true,
        storage: true,
        readWriteStorage: false,
        bytes: 8,
      },
      colorRender: { blend: false, resolve: false, byteCost: 8, alignment: 4 },
      multisample: false,
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },

    rgba32uint: {
      color: {
        type: 'uint',
        copySrc: true,
        copyDst: true,
        storage: true,
        readWriteStorage: false,
        bytes: 16,
      },
      colorRender: { blend: false, resolve: false, byteCost: 16, alignment: 4 },
      multisample: false,
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },
    rgba32sint: {
      color: {
        type: 'sint',
        copySrc: true,
        copyDst: true,
        storage: true,
        readWriteStorage: false,
        bytes: 16,
      },
      colorRender: { blend: false, resolve: false, byteCost: 16, alignment: 4 },
      multisample: false,
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },
    rgba32float: {
      color: {
        type: 'unfilterable-float',
        copySrc: true,
        copyDst: true,
        storage: true,
        readWriteStorage: false,
        bytes: 16,
      },
      colorRender: { blend: false, resolve: false, byteCost: 16, alignment: 4 },
      multisample: false,
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },

    // plain, mixed component width, 32 bits per texel

    rgb10a2uint: {
      color: {
        type: 'uint',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 4,
      },
      colorRender: { blend: false, resolve: false, byteCost: 8, alignment: 4 },
      multisample: true,
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },
    rgb10a2unorm: {
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 4,
      },
      colorRender: { blend: true, resolve: true, byteCost: 8, alignment: 4 },
      multisample: true,
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },
    rg11b10ufloat: {
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 4,
      },
      colorRender: { blend: true, resolve: true, byteCost: 8, alignment: 4 },
      multisample: true,
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },

    // packed

    rgb9e5ufloat: {
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 4,
      },
      multisample: false,
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },
  },
} );

// MAINTENANCE_TODO: Distinguishing "sized" and "unsized" depth stencil formats doesn't make sense
// because one aspect can be sized and one can be unsized. This should be cleaned up, but is kept
// this way during a migration phase.
const kSizedDepthStencilFormatInfo = formatTableWithDefaults({
  defaults: { blockWidth: 1, blockHeight: 1, multisample: true },
  table: {
    stencil8: {
      stencil: {
        type: 'uint',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 1,
      },
      bytesPerBlock: 1,
    },
    depth16unorm: {
      depth: {
        type: 'depth',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 2,
      },
      bytesPerBlock: 2,
    },
    depth32float: {
      depth: {
        type: 'depth',
        copySrc: true,
        copyDst: false,
        storage: false,
        readWriteStorage: false,
        bytes: 4,
      },
      bytesPerBlock: 4,
    },
  },
} );
const kUnsizedDepthStencilFormatInfo = formatTableWithDefaults({
  defaults: { blockWidth: 1, blockHeight: 1, multisample: true },
  table: {
    depth24plus: {
      depth: {
        type: 'depth',
        copySrc: false,
        copyDst: false,
        storage: false,
        readWriteStorage: false,
        bytes: undefined,
      },
      bytesPerBlock: 4,
    },
    'depth24plus-stencil8': {
      depth: {
        type: 'depth',
        copySrc: false,
        copyDst: false,
        storage: false,
        readWriteStorage: false,
        bytes: undefined,
      },
      stencil: {
        type: 'uint',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 1,
      },
      bytesPerBlock: 4,
    },
    'depth32float-stencil8': {
      depth: {
        type: 'depth',
        copySrc: true,
        copyDst: false,
        storage: false,
        readWriteStorage: false,
        bytes: 4,
      },
      stencil: {
        type: 'uint',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 1,
      },
      feature: 'depth32float-stencil8',
      bytesPerBlock: 5,
    },
  },
} );

const kBCTextureFormatInfo = formatTableWithDefaults({
  defaults: {
    blockWidth: 4,
    blockHeight: 4,
    multisample: false,
    feature: 'texture-compression-bc',
  },
  table: {
    'bc1-rgba-unorm': {
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 8,
      },
      baseFormat: 'bc1-rgba-unorm',
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },
    'bc1-rgba-unorm-srgb': {
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 8,
      },
      baseFormat: 'bc1-rgba-unorm',
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },

    'bc2-rgba-unorm': {
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 16,
      },
      baseFormat: 'bc2-rgba-unorm',
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },
    'bc2-rgba-unorm-srgb': {
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 16,
      },
      baseFormat: 'bc2-rgba-unorm',
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },

    'bc3-rgba-unorm': {
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 16,
      },
      baseFormat: 'bc3-rgba-unorm',
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },
    'bc3-rgba-unorm-srgb': {
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 16,
      },
      baseFormat: 'bc3-rgba-unorm',
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },

    'bc4-r-unorm': {
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 8,
      },
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },
    'bc4-r-snorm': {
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 8,
      },
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },

    'bc5-rg-unorm': {
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 16,
      },
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },
    'bc5-rg-snorm': {
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 16,
      },
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },

    'bc6h-rgb-ufloat': {
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 16,
      },
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },
    'bc6h-rgb-float': {
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 16,
      },
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },

    'bc7-rgba-unorm': {
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 16,
      },
      baseFormat: 'bc7-rgba-unorm',
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },
    'bc7-rgba-unorm-srgb': {
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 16,
      },
      baseFormat: 'bc7-rgba-unorm',
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },
  },
} );

const kETC2TextureFormatInfo = formatTableWithDefaults({
  defaults: {
    blockWidth: 4,
    blockHeight: 4,
    multisample: false,
    feature: 'texture-compression-etc2',
  },
  table: {
    'etc2-rgb8unorm': {
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 8,
      },
      baseFormat: 'etc2-rgb8unorm',
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },
    'etc2-rgb8unorm-srgb': {
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 8,
      },
      baseFormat: 'etc2-rgb8unorm',
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },

    'etc2-rgb8a1unorm': {
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 8,
      },
      baseFormat: 'etc2-rgb8a1unorm',
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },
    'etc2-rgb8a1unorm-srgb': {
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 8,
      },
      baseFormat: 'etc2-rgb8a1unorm',
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },

    'etc2-rgba8unorm': {
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 16,
      },
      baseFormat: 'etc2-rgba8unorm',
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },
    'etc2-rgba8unorm-srgb': {
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 16,
      },
      baseFormat: 'etc2-rgba8unorm',
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },

    'eac-r11unorm': {
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 8,
      },
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },
    'eac-r11snorm': {
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 8,
      },
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },

    'eac-rg11unorm': {
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 16,
      },
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },
    'eac-rg11snorm': {
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 16,
      },
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },
  },
} );

const kASTCTextureFormatInfo = formatTableWithDefaults({
  defaults: {
    multisample: false,
    feature: 'texture-compression-astc',
  },
  table: {
    'astc-4x4-unorm': {
      blockWidth: 4,
      blockHeight: 4,
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 16,
      },
      baseFormat: 'astc-4x4-unorm',
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },
    'astc-4x4-unorm-srgb': {
      blockWidth: 4,
      blockHeight: 4,
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 16,
      },
      baseFormat: 'astc-4x4-unorm',
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },

    'astc-5x4-unorm': {
      blockWidth: 5,
      blockHeight: 4,
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 16,
      },
      baseFormat: 'astc-5x4-unorm',
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },
    'astc-5x4-unorm-srgb': {
      blockWidth: 5,
      blockHeight: 4,
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 16,
      },
      baseFormat: 'astc-5x4-unorm',
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },

    'astc-5x5-unorm': {
      blockWidth: 5,
      blockHeight: 5,
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 16,
      },
      baseFormat: 'astc-5x5-unorm',
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },
    'astc-5x5-unorm-srgb': {
      blockWidth: 5,
      blockHeight: 5,
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 16,
      },
      baseFormat: 'astc-5x5-unorm',
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },

    'astc-6x5-unorm': {
      blockWidth: 6,
      blockHeight: 5,
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 16,
      },
      baseFormat: 'astc-6x5-unorm',
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },
    'astc-6x5-unorm-srgb': {
      blockWidth: 6,
      blockHeight: 5,
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 16,
      },
      baseFormat: 'astc-6x5-unorm',
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },

    'astc-6x6-unorm': {
      blockWidth: 6,
      blockHeight: 6,
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 16,
      },
      baseFormat: 'astc-6x6-unorm',
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },
    'astc-6x6-unorm-srgb': {
      blockWidth: 6,
      blockHeight: 6,
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 16,
      },
      baseFormat: 'astc-6x6-unorm',
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },

    'astc-8x5-unorm': {
      blockWidth: 8,
      blockHeight: 5,
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 16,
      },
      baseFormat: 'astc-8x5-unorm',
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },
    'astc-8x5-unorm-srgb': {
      blockWidth: 8,
      blockHeight: 5,
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 16,
      },
      baseFormat: 'astc-8x5-unorm',
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },

    'astc-8x6-unorm': {
      blockWidth: 8,
      blockHeight: 6,
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 16,
      },
      baseFormat: 'astc-8x6-unorm',
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },
    'astc-8x6-unorm-srgb': {
      blockWidth: 8,
      blockHeight: 6,
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 16,
      },
      baseFormat: 'astc-8x6-unorm',
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },

    'astc-8x8-unorm': {
      blockWidth: 8,
      blockHeight: 8,
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 16,
      },
      baseFormat: 'astc-8x8-unorm',
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },
    'astc-8x8-unorm-srgb': {
      blockWidth: 8,
      blockHeight: 8,
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 16,
      },
      baseFormat: 'astc-8x8-unorm',
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },

    'astc-10x5-unorm': {
      blockWidth: 10,
      blockHeight: 5,
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 16,
      },
      baseFormat: 'astc-10x5-unorm',
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },
    'astc-10x5-unorm-srgb': {
      blockWidth: 10,
      blockHeight: 5,
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 16,
      },
      baseFormat: 'astc-10x5-unorm',
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },

    'astc-10x6-unorm': {
      blockWidth: 10,
      blockHeight: 6,
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 16,
      },
      baseFormat: 'astc-10x6-unorm',
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },
    'astc-10x6-unorm-srgb': {
      blockWidth: 10,
      blockHeight: 6,
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 16,
      },
      baseFormat: 'astc-10x6-unorm',
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },

    'astc-10x8-unorm': {
      blockWidth: 10,
      blockHeight: 8,
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 16,
      },
      baseFormat: 'astc-10x8-unorm',
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },
    'astc-10x8-unorm-srgb': {
      blockWidth: 10,
      blockHeight: 8,
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 16,
      },
      baseFormat: 'astc-10x8-unorm',
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },

    'astc-10x10-unorm': {
      blockWidth: 10,
      blockHeight: 10,
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 16,
      },
      baseFormat: 'astc-10x10-unorm',
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },
    'astc-10x10-unorm-srgb': {
      blockWidth: 10,
      blockHeight: 10,
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 16,
      },
      baseFormat: 'astc-10x10-unorm',
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },

    'astc-12x10-unorm': {
      blockWidth: 12,
      blockHeight: 10,
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 16,
      },
      baseFormat: 'astc-12x10-unorm',
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },
    'astc-12x10-unorm-srgb': {
      blockWidth: 12,
      blockHeight: 10,
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 16,
      },
      baseFormat: 'astc-12x10-unorm',
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },

    'astc-12x12-unorm': {
      blockWidth: 12,
      blockHeight: 12,
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 16,
      },
      baseFormat: 'astc-12x12-unorm',
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },
    'astc-12x12-unorm-srgb': {
      blockWidth: 12,
      blockHeight: 12,
      color: {
        type: 'float',
        copySrc: true,
        copyDst: true,
        storage: false,
        readWriteStorage: false,
        bytes: 16,
      },
      baseFormat: 'astc-12x12-unorm',
      /*prettier-ignore*/ get bytesPerBlock() { return this.color.bytes; },
    },
  },
} );

// Definitions for use locally.

// MAINTENANCE_TODO: Consider generating the exports below programmatically by filtering the big list, instead
// of using these local constants? Requires some type magic though.
/* prettier-ignore */ const   kCompressedTextureFormatInfo = { ...kBCTextureFormatInfo, ...kETC2TextureFormatInfo, ...kASTCTextureFormatInfo } ;
/* prettier-ignore */ const        kColorTextureFormatInfo = { ...kRegularTextureFormatInfo, ...kCompressedTextureFormatInfo } ;
/* prettier-ignore */ const    kEncodableTextureFormatInfo = { ...kRegularTextureFormatInfo, ...kSizedDepthStencilFormatInfo } ;
/* prettier-ignore */ const        kSizedTextureFormatInfo = { ...kRegularTextureFormatInfo, ...kSizedDepthStencilFormatInfo, ...kCompressedTextureFormatInfo } ;
/* prettier-ignore */ const        kDepthStencilFormatInfo = { ...kSizedDepthStencilFormatInfo, ...kUnsizedDepthStencilFormatInfo } ;
/* prettier-ignore */ const kUncompressedTextureFormatInfo = { ...kRegularTextureFormatInfo, ...kSizedDepthStencilFormatInfo, ...kUnsizedDepthStencilFormatInfo } ;
/* prettier-ignore */ const          kAllTextureFormatInfo = { ...kUncompressedTextureFormatInfo, ...kCompressedTextureFormatInfo } ;

/* prettier-ignore */ export const        kRegularTextureFormats = keysOf(     kRegularTextureFormatInfo);
/* prettier-ignore */ export const     kSizedDepthStencilFormats = keysOf(  kSizedDepthStencilFormatInfo);
/* prettier-ignore */ export const   kUnsizedDepthStencilFormats = keysOf(kUnsizedDepthStencilFormatInfo);
/* prettier-ignore */ export const     kCompressedTextureFormats = keysOf(  kCompressedTextureFormatInfo);
/* prettier-ignore */ export const   kBCCompressedTextureFormats = keysOf(          kBCTextureFormatInfo);
/* prettier-ignore */ export const kASTCCompressedTextureFormats = keysOf(        kASTCTextureFormatInfo);

/* prettier-ignore */ export const        kColorTextureFormats = keysOf(       kColorTextureFormatInfo);
/* prettier-ignore */ export const    kEncodableTextureFormats = keysOf(   kEncodableTextureFormatInfo);
/* prettier-ignore */ export const        kSizedTextureFormats = keysOf(       kSizedTextureFormatInfo);
/* prettier-ignore */ export const        kDepthStencilFormats = keysOf(       kDepthStencilFormatInfo);
/* prettier-ignore */ export const kUncompressedTextureFormats = keysOf(kUncompressedTextureFormatInfo);
/* prettier-ignore */ export const          kAllTextureFormats = keysOf(         kAllTextureFormatInfo);


/**
 * DO NOT EXPORT THIS - functions that need info from this table should use the appropriate
 * method for their needs.
 *
 * For a list of textures formats for test parameters there are:
 *
 * Lists of formats that might require features to be enabled
 * * kPossibleColorRenderableTextureFormats
 * * kPossibleStorageTextureFormats
 * * kPossibleReadWriteStorageTextureFormats
 * * kPossibleMultisampledTextureFormats
 *
 * Lists of formats that end in -srgb
 * * kDifferentBaseFormatTextureFormats  (includes compressed textures)
 * * kDifferentBaseFormatRegularTextureFormats (does not include compressed textures)
 *
 * Formats that require a feature to use at all (mostly compressed formats)
 * * kOptionalTextureFormats
 *
 * Misc
 * * kRegularTextureFormats
 * * kSizedDepthStencilFormats
 * * kUnsizedDepthStencilFormats
 * * kCompressedTextureFormats
 * * kUncompressedTextureFormats
 * * kColorTextureFormats - color formats including compressed and sint/uint
 * * kEncodableTextureFormats - formats that TexelView supports.
 * * kSizedTextureFormats - formats that have a known size (so not depth24plus ...)
 * * kDepthStencilFormats - depth, stencil, depth-stencil
 * * kDepthTextureFormats - depth and depth-stencil
 * * kStencilTextureFormats - stencil and depth-stencil
 * * kAllTextureFormats
 *
 * If one of the list above does not work, add a new one or to filter in beforeAllSubcases you generally want to use
 * You will not know if you can actually use a texture for the given use case until the test runs and has a device.
 *
 * * isTextureFormatPossiblyUsableAsRenderAttachment
 * * isTextureFormatPossiblyUsableAsColorRenderAttachment
 * * isTextureFormatPossiblyMultisampled
 * * isTextureFormatPossiblyStorageReadable
 * * isTextureFormatPossiblyStorageReadWritable
 * * isTextureFormatPossiblyFilterableAsTextureF32
 *
 * These are also usable before or during a test
 *
 * * isColorTextureFormat
 * * isDepthTextureFormat
 * * isStencilTextureFormat
 * * isDepthOrStencilTextureFormat
 * * isEncodableTextureFormat
 * * isRegularTextureFormat
 * * isCompressedFloatTextureFormat
 * * isSintOrUintFormat
 *
 * To skip a test use the `skipIfXXX` tests in `GPUTest` if possible. Otherwise these functions
 * require a device to give a correct answer.
 *
 * * isTextureFormatUsableAsRenderAttachment
 * * isTextureFormatColorRenderable
 * * isTextureFormatResolvable
 * * isTextureFormatBlendable
 * * isTextureFormatMultisampled
 * * isTextureFormatUsableAsStorageFormat
 * * isTextureFormatUsableAsReadWriteStorageTexture
 * * isTextureFormatUsableAsStorageFormatInCreateShaderModule
 *
 * Per-GPUTextureFormat info.
 */
export const kTextureFormatInfo = {
  ...kRegularTextureFormatInfo,
  ...kSizedDepthStencilFormatInfo,
  ...kUnsizedDepthStencilFormatInfo,
  ...kBCTextureFormatInfo,
  ...kETC2TextureFormatInfo,
  ...kASTCTextureFormatInfo,
};


// The formats of GPUTextureFormat for canvas context.
export const kCanvasTextureFormats = ['bgra8unorm', 'rgba8unorm', 'rgba16float'];
