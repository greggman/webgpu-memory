export declare const kRegularTextureFormats: readonly ("r8unorm" | "r8snorm" | "r8uint" | "r8sint" | "rg8unorm" | "rg8snorm" | "rg8uint" | "rg8sint" | "rgba8unorm" | "rgba8unorm-srgb" | "rgba8snorm" | "rgba8uint" | "rgba8sint" | "bgra8unorm" | "bgra8unorm-srgb" | "r16uint" | "r16sint" | "r16float" | "rg16uint" | "rg16sint" | "rg16float" | "rgba16uint" | "rgba16sint" | "rgba16float" | "r32uint" | "r32sint" | "r32float" | "rg32uint" | "rg32sint" | "rg32float" | "rgba32uint" | "rgba32sint" | "rgba32float" | "rgb10a2uint" | "rgb10a2unorm" | "rg11b10ufloat" | "rgb9e5ufloat")[];
export declare const kSizedDepthStencilFormats: readonly ("stencil8" | "depth16unorm" | "depth32float")[];
export declare const kUnsizedDepthStencilFormats: readonly ("depth24plus" | "depth24plus-stencil8" | "depth32float-stencil8")[];
export declare const kCompressedTextureFormats: readonly ("bc1-rgba-unorm" | "bc1-rgba-unorm-srgb" | "bc2-rgba-unorm" | "bc2-rgba-unorm-srgb" | "bc3-rgba-unorm" | "bc3-rgba-unorm-srgb" | "bc4-r-unorm" | "bc4-r-snorm" | "bc5-rg-unorm" | "bc5-rg-snorm" | "bc6h-rgb-ufloat" | "bc6h-rgb-float" | "bc7-rgba-unorm" | "bc7-rgba-unorm-srgb" | "etc2-rgb8unorm" | "etc2-rgb8unorm-srgb" | "etc2-rgb8a1unorm" | "etc2-rgb8a1unorm-srgb" | "etc2-rgba8unorm" | "etc2-rgba8unorm-srgb" | "eac-r11unorm" | "eac-r11snorm" | "eac-rg11unorm" | "eac-rg11snorm" | "astc-4x4-unorm" | "astc-4x4-unorm-srgb" | "astc-5x4-unorm" | "astc-5x4-unorm-srgb" | "astc-5x5-unorm" | "astc-5x5-unorm-srgb" | "astc-6x5-unorm" | "astc-6x5-unorm-srgb" | "astc-6x6-unorm" | "astc-6x6-unorm-srgb" | "astc-8x5-unorm" | "astc-8x5-unorm-srgb" | "astc-8x6-unorm" | "astc-8x6-unorm-srgb" | "astc-8x8-unorm" | "astc-8x8-unorm-srgb" | "astc-10x5-unorm" | "astc-10x5-unorm-srgb" | "astc-10x6-unorm" | "astc-10x6-unorm-srgb" | "astc-10x8-unorm" | "astc-10x8-unorm-srgb" | "astc-10x10-unorm" | "astc-10x10-unorm-srgb" | "astc-12x10-unorm" | "astc-12x10-unorm-srgb" | "astc-12x12-unorm" | "astc-12x12-unorm-srgb")[];
export declare const kBCCompressedTextureFormats: readonly ("bc1-rgba-unorm" | "bc1-rgba-unorm-srgb" | "bc2-rgba-unorm" | "bc2-rgba-unorm-srgb" | "bc3-rgba-unorm" | "bc3-rgba-unorm-srgb" | "bc4-r-unorm" | "bc4-r-snorm" | "bc5-rg-unorm" | "bc5-rg-snorm" | "bc6h-rgb-ufloat" | "bc6h-rgb-float" | "bc7-rgba-unorm" | "bc7-rgba-unorm-srgb")[];
export declare const kASTCCompressedTextureFormats: readonly ("astc-4x4-unorm" | "astc-4x4-unorm-srgb" | "astc-5x4-unorm" | "astc-5x4-unorm-srgb" | "astc-5x5-unorm" | "astc-5x5-unorm-srgb" | "astc-6x5-unorm" | "astc-6x5-unorm-srgb" | "astc-6x6-unorm" | "astc-6x6-unorm-srgb" | "astc-8x5-unorm" | "astc-8x5-unorm-srgb" | "astc-8x6-unorm" | "astc-8x6-unorm-srgb" | "astc-8x8-unorm" | "astc-8x8-unorm-srgb" | "astc-10x5-unorm" | "astc-10x5-unorm-srgb" | "astc-10x6-unorm" | "astc-10x6-unorm-srgb" | "astc-10x8-unorm" | "astc-10x8-unorm-srgb" | "astc-10x10-unorm" | "astc-10x10-unorm-srgb" | "astc-12x10-unorm" | "astc-12x10-unorm-srgb" | "astc-12x12-unorm" | "astc-12x12-unorm-srgb")[];
export declare const kColorTextureFormats: readonly ("r8unorm" | "r8snorm" | "r8uint" | "r8sint" | "rg8unorm" | "rg8snorm" | "rg8uint" | "rg8sint" | "rgba8unorm" | "rgba8unorm-srgb" | "rgba8snorm" | "rgba8uint" | "rgba8sint" | "bgra8unorm" | "bgra8unorm-srgb" | "r16uint" | "r16sint" | "r16float" | "rg16uint" | "rg16sint" | "rg16float" | "rgba16uint" | "rgba16sint" | "rgba16float" | "r32uint" | "r32sint" | "r32float" | "rg32uint" | "rg32sint" | "rg32float" | "rgba32uint" | "rgba32sint" | "rgba32float" | "rgb10a2uint" | "rgb10a2unorm" | "rg11b10ufloat" | "rgb9e5ufloat" | "bc1-rgba-unorm" | "bc1-rgba-unorm-srgb" | "bc2-rgba-unorm" | "bc2-rgba-unorm-srgb" | "bc3-rgba-unorm" | "bc3-rgba-unorm-srgb" | "bc4-r-unorm" | "bc4-r-snorm" | "bc5-rg-unorm" | "bc5-rg-snorm" | "bc6h-rgb-ufloat" | "bc6h-rgb-float" | "bc7-rgba-unorm" | "bc7-rgba-unorm-srgb" | "etc2-rgb8unorm" | "etc2-rgb8unorm-srgb" | "etc2-rgb8a1unorm" | "etc2-rgb8a1unorm-srgb" | "etc2-rgba8unorm" | "etc2-rgba8unorm-srgb" | "eac-r11unorm" | "eac-r11snorm" | "eac-rg11unorm" | "eac-rg11snorm" | "astc-4x4-unorm" | "astc-4x4-unorm-srgb" | "astc-5x4-unorm" | "astc-5x4-unorm-srgb" | "astc-5x5-unorm" | "astc-5x5-unorm-srgb" | "astc-6x5-unorm" | "astc-6x5-unorm-srgb" | "astc-6x6-unorm" | "astc-6x6-unorm-srgb" | "astc-8x5-unorm" | "astc-8x5-unorm-srgb" | "astc-8x6-unorm" | "astc-8x6-unorm-srgb" | "astc-8x8-unorm" | "astc-8x8-unorm-srgb" | "astc-10x5-unorm" | "astc-10x5-unorm-srgb" | "astc-10x6-unorm" | "astc-10x6-unorm-srgb" | "astc-10x8-unorm" | "astc-10x8-unorm-srgb" | "astc-10x10-unorm" | "astc-10x10-unorm-srgb" | "astc-12x10-unorm" | "astc-12x10-unorm-srgb" | "astc-12x12-unorm" | "astc-12x12-unorm-srgb")[];
export declare const kEncodableTextureFormats: readonly ("r8unorm" | "r8snorm" | "r8uint" | "r8sint" | "rg8unorm" | "rg8snorm" | "rg8uint" | "rg8sint" | "rgba8unorm" | "rgba8unorm-srgb" | "rgba8snorm" | "rgba8uint" | "rgba8sint" | "bgra8unorm" | "bgra8unorm-srgb" | "r16uint" | "r16sint" | "r16float" | "rg16uint" | "rg16sint" | "rg16float" | "rgba16uint" | "rgba16sint" | "rgba16float" | "r32uint" | "r32sint" | "r32float" | "rg32uint" | "rg32sint" | "rg32float" | "rgba32uint" | "rgba32sint" | "rgba32float" | "rgb10a2uint" | "rgb10a2unorm" | "rg11b10ufloat" | "rgb9e5ufloat" | "stencil8" | "depth16unorm" | "depth32float")[];
export declare const kSizedTextureFormats: readonly ("r8unorm" | "r8snorm" | "r8uint" | "r8sint" | "rg8unorm" | "rg8snorm" | "rg8uint" | "rg8sint" | "rgba8unorm" | "rgba8unorm-srgb" | "rgba8snorm" | "rgba8uint" | "rgba8sint" | "bgra8unorm" | "bgra8unorm-srgb" | "r16uint" | "r16sint" | "r16float" | "rg16uint" | "rg16sint" | "rg16float" | "rgba16uint" | "rgba16sint" | "rgba16float" | "r32uint" | "r32sint" | "r32float" | "rg32uint" | "rg32sint" | "rg32float" | "rgba32uint" | "rgba32sint" | "rgba32float" | "rgb10a2uint" | "rgb10a2unorm" | "rg11b10ufloat" | "rgb9e5ufloat" | "stencil8" | "depth16unorm" | "depth32float" | "bc1-rgba-unorm" | "bc1-rgba-unorm-srgb" | "bc2-rgba-unorm" | "bc2-rgba-unorm-srgb" | "bc3-rgba-unorm" | "bc3-rgba-unorm-srgb" | "bc4-r-unorm" | "bc4-r-snorm" | "bc5-rg-unorm" | "bc5-rg-snorm" | "bc6h-rgb-ufloat" | "bc6h-rgb-float" | "bc7-rgba-unorm" | "bc7-rgba-unorm-srgb" | "etc2-rgb8unorm" | "etc2-rgb8unorm-srgb" | "etc2-rgb8a1unorm" | "etc2-rgb8a1unorm-srgb" | "etc2-rgba8unorm" | "etc2-rgba8unorm-srgb" | "eac-r11unorm" | "eac-r11snorm" | "eac-rg11unorm" | "eac-rg11snorm" | "astc-4x4-unorm" | "astc-4x4-unorm-srgb" | "astc-5x4-unorm" | "astc-5x4-unorm-srgb" | "astc-5x5-unorm" | "astc-5x5-unorm-srgb" | "astc-6x5-unorm" | "astc-6x5-unorm-srgb" | "astc-6x6-unorm" | "astc-6x6-unorm-srgb" | "astc-8x5-unorm" | "astc-8x5-unorm-srgb" | "astc-8x6-unorm" | "astc-8x6-unorm-srgb" | "astc-8x8-unorm" | "astc-8x8-unorm-srgb" | "astc-10x5-unorm" | "astc-10x5-unorm-srgb" | "astc-10x6-unorm" | "astc-10x6-unorm-srgb" | "astc-10x8-unorm" | "astc-10x8-unorm-srgb" | "astc-10x10-unorm" | "astc-10x10-unorm-srgb" | "astc-12x10-unorm" | "astc-12x10-unorm-srgb" | "astc-12x12-unorm" | "astc-12x12-unorm-srgb")[];
export declare const kDepthStencilFormats: readonly ("stencil8" | "depth16unorm" | "depth32float" | "depth24plus" | "depth24plus-stencil8" | "depth32float-stencil8")[];
export declare const kUncompressedTextureFormats: readonly ("r8unorm" | "r8snorm" | "r8uint" | "r8sint" | "rg8unorm" | "rg8snorm" | "rg8uint" | "rg8sint" | "rgba8unorm" | "rgba8unorm-srgb" | "rgba8snorm" | "rgba8uint" | "rgba8sint" | "bgra8unorm" | "bgra8unorm-srgb" | "r16uint" | "r16sint" | "r16float" | "rg16uint" | "rg16sint" | "rg16float" | "rgba16uint" | "rgba16sint" | "rgba16float" | "r32uint" | "r32sint" | "r32float" | "rg32uint" | "rg32sint" | "rg32float" | "rgba32uint" | "rgba32sint" | "rgba32float" | "rgb10a2uint" | "rgb10a2unorm" | "rg11b10ufloat" | "rgb9e5ufloat" | "stencil8" | "depth16unorm" | "depth32float" | "depth24plus" | "depth24plus-stencil8" | "depth32float-stencil8")[];
export declare const kAllTextureFormats: readonly ("r8unorm" | "r8snorm" | "r8uint" | "r8sint" | "rg8unorm" | "rg8snorm" | "rg8uint" | "rg8sint" | "rgba8unorm" | "rgba8unorm-srgb" | "rgba8snorm" | "rgba8uint" | "rgba8sint" | "bgra8unorm" | "bgra8unorm-srgb" | "r16uint" | "r16sint" | "r16float" | "rg16uint" | "rg16sint" | "rg16float" | "rgba16uint" | "rgba16sint" | "rgba16float" | "r32uint" | "r32sint" | "r32float" | "rg32uint" | "rg32sint" | "rg32float" | "rgba32uint" | "rgba32sint" | "rgba32float" | "rgb10a2uint" | "rgb10a2unorm" | "rg11b10ufloat" | "rgb9e5ufloat" | "stencil8" | "depth16unorm" | "depth32float" | "depth24plus" | "depth24plus-stencil8" | "depth32float-stencil8" | "bc1-rgba-unorm" | "bc1-rgba-unorm-srgb" | "bc2-rgba-unorm" | "bc2-rgba-unorm-srgb" | "bc3-rgba-unorm" | "bc3-rgba-unorm-srgb" | "bc4-r-unorm" | "bc4-r-snorm" | "bc5-rg-unorm" | "bc5-rg-snorm" | "bc6h-rgb-ufloat" | "bc6h-rgb-float" | "bc7-rgba-unorm" | "bc7-rgba-unorm-srgb" | "etc2-rgb8unorm" | "etc2-rgb8unorm-srgb" | "etc2-rgb8a1unorm" | "etc2-rgb8a1unorm-srgb" | "etc2-rgba8unorm" | "etc2-rgba8unorm-srgb" | "eac-r11unorm" | "eac-r11snorm" | "eac-rg11unorm" | "eac-rg11snorm" | "astc-4x4-unorm" | "astc-4x4-unorm-srgb" | "astc-5x4-unorm" | "astc-5x4-unorm-srgb" | "astc-5x5-unorm" | "astc-5x5-unorm-srgb" | "astc-6x5-unorm" | "astc-6x5-unorm-srgb" | "astc-6x6-unorm" | "astc-6x6-unorm-srgb" | "astc-8x5-unorm" | "astc-8x5-unorm-srgb" | "astc-8x6-unorm" | "astc-8x6-unorm-srgb" | "astc-8x8-unorm" | "astc-8x8-unorm-srgb" | "astc-10x5-unorm" | "astc-10x5-unorm-srgb" | "astc-10x6-unorm" | "astc-10x6-unorm-srgb" | "astc-10x8-unorm" | "astc-10x8-unorm-srgb" | "astc-10x10-unorm" | "astc-10x10-unorm-srgb" | "astc-12x10-unorm" | "astc-12x10-unorm-srgb" | "astc-12x12-unorm" | "astc-12x12-unorm-srgb")[];
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
export declare const kTextureFormatInfo: {
    'astc-4x4-unorm': {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: undefined;
        readonly multisample: boolean;
        readonly feature: string;
        readonly baseFormat: string;
        readonly bytesPerBlock: number;
    };
    'astc-4x4-unorm-srgb': {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: undefined;
        readonly multisample: boolean;
        readonly feature: string;
        readonly baseFormat: string;
        readonly bytesPerBlock: number;
    };
    'astc-5x4-unorm': {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: undefined;
        readonly multisample: boolean;
        readonly feature: string;
        readonly baseFormat: string;
        readonly bytesPerBlock: number;
    };
    'astc-5x4-unorm-srgb': {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: undefined;
        readonly multisample: boolean;
        readonly feature: string;
        readonly baseFormat: string;
        readonly bytesPerBlock: number;
    };
    'astc-5x5-unorm': {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: undefined;
        readonly multisample: boolean;
        readonly feature: string;
        readonly baseFormat: string;
        readonly bytesPerBlock: number;
    };
    'astc-5x5-unorm-srgb': {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: undefined;
        readonly multisample: boolean;
        readonly feature: string;
        readonly baseFormat: string;
        readonly bytesPerBlock: number;
    };
    'astc-6x5-unorm': {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: undefined;
        readonly multisample: boolean;
        readonly feature: string;
        readonly baseFormat: string;
        readonly bytesPerBlock: number;
    };
    'astc-6x5-unorm-srgb': {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: undefined;
        readonly multisample: boolean;
        readonly feature: string;
        readonly baseFormat: string;
        readonly bytesPerBlock: number;
    };
    'astc-6x6-unorm': {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: undefined;
        readonly multisample: boolean;
        readonly feature: string;
        readonly baseFormat: string;
        readonly bytesPerBlock: number;
    };
    'astc-6x6-unorm-srgb': {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: undefined;
        readonly multisample: boolean;
        readonly feature: string;
        readonly baseFormat: string;
        readonly bytesPerBlock: number;
    };
    'astc-8x5-unorm': {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: undefined;
        readonly multisample: boolean;
        readonly feature: string;
        readonly baseFormat: string;
        readonly bytesPerBlock: number;
    };
    'astc-8x5-unorm-srgb': {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: undefined;
        readonly multisample: boolean;
        readonly feature: string;
        readonly baseFormat: string;
        readonly bytesPerBlock: number;
    };
    'astc-8x6-unorm': {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: undefined;
        readonly multisample: boolean;
        readonly feature: string;
        readonly baseFormat: string;
        readonly bytesPerBlock: number;
    };
    'astc-8x6-unorm-srgb': {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: undefined;
        readonly multisample: boolean;
        readonly feature: string;
        readonly baseFormat: string;
        readonly bytesPerBlock: number;
    };
    'astc-8x8-unorm': {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: undefined;
        readonly multisample: boolean;
        readonly feature: string;
        readonly baseFormat: string;
        readonly bytesPerBlock: number;
    };
    'astc-8x8-unorm-srgb': {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: undefined;
        readonly multisample: boolean;
        readonly feature: string;
        readonly baseFormat: string;
        readonly bytesPerBlock: number;
    };
    'astc-10x5-unorm': {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: undefined;
        readonly multisample: boolean;
        readonly feature: string;
        readonly baseFormat: string;
        readonly bytesPerBlock: number;
    };
    'astc-10x5-unorm-srgb': {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: undefined;
        readonly multisample: boolean;
        readonly feature: string;
        readonly baseFormat: string;
        readonly bytesPerBlock: number;
    };
    'astc-10x6-unorm': {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: undefined;
        readonly multisample: boolean;
        readonly feature: string;
        readonly baseFormat: string;
        readonly bytesPerBlock: number;
    };
    'astc-10x6-unorm-srgb': {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: undefined;
        readonly multisample: boolean;
        readonly feature: string;
        readonly baseFormat: string;
        readonly bytesPerBlock: number;
    };
    'astc-10x8-unorm': {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: undefined;
        readonly multisample: boolean;
        readonly feature: string;
        readonly baseFormat: string;
        readonly bytesPerBlock: number;
    };
    'astc-10x8-unorm-srgb': {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: undefined;
        readonly multisample: boolean;
        readonly feature: string;
        readonly baseFormat: string;
        readonly bytesPerBlock: number;
    };
    'astc-10x10-unorm': {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: undefined;
        readonly multisample: boolean;
        readonly feature: string;
        readonly baseFormat: string;
        readonly bytesPerBlock: number;
    };
    'astc-10x10-unorm-srgb': {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: undefined;
        readonly multisample: boolean;
        readonly feature: string;
        readonly baseFormat: string;
        readonly bytesPerBlock: number;
    };
    'astc-12x10-unorm': {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: undefined;
        readonly multisample: boolean;
        readonly feature: string;
        readonly baseFormat: string;
        readonly bytesPerBlock: number;
    };
    'astc-12x10-unorm-srgb': {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: undefined;
        readonly multisample: boolean;
        readonly feature: string;
        readonly baseFormat: string;
        readonly bytesPerBlock: number;
    };
    'astc-12x12-unorm': {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: undefined;
        readonly multisample: boolean;
        readonly feature: string;
        readonly baseFormat: string;
        readonly bytesPerBlock: number;
    };
    'astc-12x12-unorm-srgb': {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: undefined;
        readonly multisample: boolean;
        readonly feature: string;
        readonly baseFormat: string;
        readonly bytesPerBlock: number;
    };
    'etc2-rgb8unorm': {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: undefined;
        readonly multisample: boolean;
        readonly feature: string;
        readonly baseFormat: string;
        readonly bytesPerBlock: number;
    };
    'etc2-rgb8unorm-srgb': {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: undefined;
        readonly multisample: boolean;
        readonly feature: string;
        readonly baseFormat: string;
        readonly bytesPerBlock: number;
    };
    'etc2-rgb8a1unorm': {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: undefined;
        readonly multisample: boolean;
        readonly feature: string;
        readonly baseFormat: string;
        readonly bytesPerBlock: number;
    };
    'etc2-rgb8a1unorm-srgb': {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: undefined;
        readonly multisample: boolean;
        readonly feature: string;
        readonly baseFormat: string;
        readonly bytesPerBlock: number;
    };
    'etc2-rgba8unorm': {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: undefined;
        readonly multisample: boolean;
        readonly feature: string;
        readonly baseFormat: string;
        readonly bytesPerBlock: number;
    };
    'etc2-rgba8unorm-srgb': {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: undefined;
        readonly multisample: boolean;
        readonly feature: string;
        readonly baseFormat: string;
        readonly bytesPerBlock: number;
    };
    'eac-r11unorm': {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: undefined;
        readonly multisample: boolean;
        readonly feature: string;
        readonly baseFormat: undefined;
        readonly bytesPerBlock: number;
    };
    'eac-r11snorm': {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: undefined;
        readonly multisample: boolean;
        readonly feature: string;
        readonly baseFormat: undefined;
        readonly bytesPerBlock: number;
    };
    'eac-rg11unorm': {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: undefined;
        readonly multisample: boolean;
        readonly feature: string;
        readonly baseFormat: undefined;
        readonly bytesPerBlock: number;
    };
    'eac-rg11snorm': {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: undefined;
        readonly multisample: boolean;
        readonly feature: string;
        readonly baseFormat: undefined;
        readonly bytesPerBlock: number;
    };
    'bc1-rgba-unorm': {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: undefined;
        readonly multisample: boolean;
        readonly feature: string;
        readonly baseFormat: string;
        readonly bytesPerBlock: number;
    };
    'bc1-rgba-unorm-srgb': {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: undefined;
        readonly multisample: boolean;
        readonly feature: string;
        readonly baseFormat: string;
        readonly bytesPerBlock: number;
    };
    'bc2-rgba-unorm': {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: undefined;
        readonly multisample: boolean;
        readonly feature: string;
        readonly baseFormat: string;
        readonly bytesPerBlock: number;
    };
    'bc2-rgba-unorm-srgb': {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: undefined;
        readonly multisample: boolean;
        readonly feature: string;
        readonly baseFormat: string;
        readonly bytesPerBlock: number;
    };
    'bc3-rgba-unorm': {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: undefined;
        readonly multisample: boolean;
        readonly feature: string;
        readonly baseFormat: string;
        readonly bytesPerBlock: number;
    };
    'bc3-rgba-unorm-srgb': {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: undefined;
        readonly multisample: boolean;
        readonly feature: string;
        readonly baseFormat: string;
        readonly bytesPerBlock: number;
    };
    'bc4-r-unorm': {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: undefined;
        readonly multisample: boolean;
        readonly feature: string;
        readonly baseFormat: undefined;
        readonly bytesPerBlock: number;
    };
    'bc4-r-snorm': {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: undefined;
        readonly multisample: boolean;
        readonly feature: string;
        readonly baseFormat: undefined;
        readonly bytesPerBlock: number;
    };
    'bc5-rg-unorm': {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: undefined;
        readonly multisample: boolean;
        readonly feature: string;
        readonly baseFormat: undefined;
        readonly bytesPerBlock: number;
    };
    'bc5-rg-snorm': {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: undefined;
        readonly multisample: boolean;
        readonly feature: string;
        readonly baseFormat: undefined;
        readonly bytesPerBlock: number;
    };
    'bc6h-rgb-ufloat': {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: undefined;
        readonly multisample: boolean;
        readonly feature: string;
        readonly baseFormat: undefined;
        readonly bytesPerBlock: number;
    };
    'bc6h-rgb-float': {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: undefined;
        readonly multisample: boolean;
        readonly feature: string;
        readonly baseFormat: undefined;
        readonly bytesPerBlock: number;
    };
    'bc7-rgba-unorm': {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: undefined;
        readonly multisample: boolean;
        readonly feature: string;
        readonly baseFormat: string;
        readonly bytesPerBlock: number;
    };
    'bc7-rgba-unorm-srgb': {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: undefined;
        readonly multisample: boolean;
        readonly feature: string;
        readonly baseFormat: string;
        readonly bytesPerBlock: number;
    };
    depth24plus: {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: undefined;
        readonly depth: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: undefined;
        };
        readonly stencil: undefined;
        readonly colorRender: undefined;
        readonly multisample: boolean;
        readonly feature: undefined;
        readonly baseFormat: undefined;
        readonly bytesPerBlock: number;
    };
    'depth24plus-stencil8': {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: undefined;
        readonly depth: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: undefined;
        };
        readonly stencil: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly colorRender: undefined;
        readonly multisample: boolean;
        readonly feature: undefined;
        readonly baseFormat: undefined;
        readonly bytesPerBlock: number;
    };
    'depth32float-stencil8': {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: undefined;
        readonly depth: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly stencil: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly colorRender: undefined;
        readonly multisample: boolean;
        readonly feature: string;
        readonly baseFormat: undefined;
        readonly bytesPerBlock: number;
    };
    stencil8: {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: undefined;
        readonly depth: undefined;
        readonly stencil: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly colorRender: undefined;
        readonly multisample: boolean;
        readonly feature: undefined;
        readonly baseFormat: undefined;
        readonly bytesPerBlock: number;
    };
    depth16unorm: {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: undefined;
        readonly depth: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly stencil: undefined;
        readonly colorRender: undefined;
        readonly multisample: boolean;
        readonly feature: undefined;
        readonly baseFormat: undefined;
        readonly bytesPerBlock: number;
    };
    depth32float: {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: undefined;
        readonly depth: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly stencil: undefined;
        readonly colorRender: undefined;
        readonly multisample: boolean;
        readonly feature: undefined;
        readonly baseFormat: undefined;
        readonly bytesPerBlock: number;
    };
    r8unorm: {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: {
            blend: boolean;
            resolve: boolean;
            byteCost: number;
            alignment: number;
        };
        readonly multisample: boolean;
        readonly feature: undefined;
        readonly baseFormat: undefined;
        readonly bytesPerBlock: number;
    };
    r8snorm: {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: undefined;
        readonly multisample: boolean;
        readonly feature: undefined;
        readonly baseFormat: undefined;
        readonly bytesPerBlock: number;
    };
    r8uint: {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: {
            blend: boolean;
            resolve: boolean;
            byteCost: number;
            alignment: number;
        };
        readonly multisample: boolean;
        readonly feature: undefined;
        readonly baseFormat: undefined;
        readonly bytesPerBlock: number;
    };
    r8sint: {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: {
            blend: boolean;
            resolve: boolean;
            byteCost: number;
            alignment: number;
        };
        readonly multisample: boolean;
        readonly feature: undefined;
        readonly baseFormat: undefined;
        readonly bytesPerBlock: number;
    };
    rg8unorm: {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: {
            blend: boolean;
            resolve: boolean;
            byteCost: number;
            alignment: number;
        };
        readonly multisample: boolean;
        readonly feature: undefined;
        readonly baseFormat: undefined;
        readonly bytesPerBlock: number;
    };
    rg8snorm: {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: undefined;
        readonly multisample: boolean;
        readonly feature: undefined;
        readonly baseFormat: undefined;
        readonly bytesPerBlock: number;
    };
    rg8uint: {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: {
            blend: boolean;
            resolve: boolean;
            byteCost: number;
            alignment: number;
        };
        readonly multisample: boolean;
        readonly feature: undefined;
        readonly baseFormat: undefined;
        readonly bytesPerBlock: number;
    };
    rg8sint: {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: {
            blend: boolean;
            resolve: boolean;
            byteCost: number;
            alignment: number;
        };
        readonly multisample: boolean;
        readonly feature: undefined;
        readonly baseFormat: undefined;
        readonly bytesPerBlock: number;
    };
    rgba8unorm: {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: {
            blend: boolean;
            resolve: boolean;
            byteCost: number;
            alignment: number;
        };
        readonly multisample: boolean;
        readonly feature: undefined;
        readonly baseFormat: string;
        readonly bytesPerBlock: number;
    };
    'rgba8unorm-srgb': {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: {
            blend: boolean;
            resolve: boolean;
            byteCost: number;
            alignment: number;
        };
        readonly multisample: boolean;
        readonly feature: undefined;
        readonly baseFormat: string;
        readonly bytesPerBlock: number;
    };
    rgba8snorm: {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: undefined;
        readonly multisample: boolean;
        readonly feature: undefined;
        readonly baseFormat: undefined;
        readonly bytesPerBlock: number;
    };
    rgba8uint: {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: {
            blend: boolean;
            resolve: boolean;
            byteCost: number;
            alignment: number;
        };
        readonly multisample: boolean;
        readonly feature: undefined;
        readonly baseFormat: undefined;
        readonly bytesPerBlock: number;
    };
    rgba8sint: {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: {
            blend: boolean;
            resolve: boolean;
            byteCost: number;
            alignment: number;
        };
        readonly multisample: boolean;
        readonly feature: undefined;
        readonly baseFormat: undefined;
        readonly bytesPerBlock: number;
    };
    bgra8unorm: {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: {
            blend: boolean;
            resolve: boolean;
            byteCost: number;
            alignment: number;
        };
        readonly multisample: boolean;
        readonly feature: undefined;
        readonly baseFormat: string;
        readonly bytesPerBlock: number;
    };
    'bgra8unorm-srgb': {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: {
            blend: boolean;
            resolve: boolean;
            byteCost: number;
            alignment: number;
        };
        readonly multisample: boolean;
        readonly feature: undefined;
        readonly baseFormat: string;
        readonly bytesPerBlock: number;
    };
    r16uint: {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: {
            blend: boolean;
            resolve: boolean;
            byteCost: number;
            alignment: number;
        };
        readonly multisample: boolean;
        readonly feature: undefined;
        readonly baseFormat: undefined;
        readonly bytesPerBlock: number;
    };
    r16sint: {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: {
            blend: boolean;
            resolve: boolean;
            byteCost: number;
            alignment: number;
        };
        readonly multisample: boolean;
        readonly feature: undefined;
        readonly baseFormat: undefined;
        readonly bytesPerBlock: number;
    };
    r16float: {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: {
            blend: boolean;
            resolve: boolean;
            byteCost: number;
            alignment: number;
        };
        readonly multisample: boolean;
        readonly feature: undefined;
        readonly baseFormat: undefined;
        readonly bytesPerBlock: number;
    };
    rg16uint: {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: {
            blend: boolean;
            resolve: boolean;
            byteCost: number;
            alignment: number;
        };
        readonly multisample: boolean;
        readonly feature: undefined;
        readonly baseFormat: undefined;
        readonly bytesPerBlock: number;
    };
    rg16sint: {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: {
            blend: boolean;
            resolve: boolean;
            byteCost: number;
            alignment: number;
        };
        readonly multisample: boolean;
        readonly feature: undefined;
        readonly baseFormat: undefined;
        readonly bytesPerBlock: number;
    };
    rg16float: {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: {
            blend: boolean;
            resolve: boolean;
            byteCost: number;
            alignment: number;
        };
        readonly multisample: boolean;
        readonly feature: undefined;
        readonly baseFormat: undefined;
        readonly bytesPerBlock: number;
    };
    rgba16uint: {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: {
            blend: boolean;
            resolve: boolean;
            byteCost: number;
            alignment: number;
        };
        readonly multisample: boolean;
        readonly feature: undefined;
        readonly baseFormat: undefined;
        readonly bytesPerBlock: number;
    };
    rgba16sint: {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: {
            blend: boolean;
            resolve: boolean;
            byteCost: number;
            alignment: number;
        };
        readonly multisample: boolean;
        readonly feature: undefined;
        readonly baseFormat: undefined;
        readonly bytesPerBlock: number;
    };
    rgba16float: {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: {
            blend: boolean;
            resolve: boolean;
            byteCost: number;
            alignment: number;
        };
        readonly multisample: boolean;
        readonly feature: undefined;
        readonly baseFormat: undefined;
        readonly bytesPerBlock: number;
    };
    r32uint: {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: {
            blend: boolean;
            resolve: boolean;
            byteCost: number;
            alignment: number;
        };
        readonly multisample: boolean;
        readonly feature: undefined;
        readonly baseFormat: undefined;
        readonly bytesPerBlock: number;
    };
    r32sint: {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: {
            blend: boolean;
            resolve: boolean;
            byteCost: number;
            alignment: number;
        };
        readonly multisample: boolean;
        readonly feature: undefined;
        readonly baseFormat: undefined;
        readonly bytesPerBlock: number;
    };
    r32float: {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: {
            blend: boolean;
            resolve: boolean;
            byteCost: number;
            alignment: number;
        };
        readonly multisample: boolean;
        readonly feature: undefined;
        readonly baseFormat: undefined;
        readonly bytesPerBlock: number;
    };
    rg32uint: {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: {
            blend: boolean;
            resolve: boolean;
            byteCost: number;
            alignment: number;
        };
        readonly multisample: boolean;
        readonly feature: undefined;
        readonly baseFormat: undefined;
        readonly bytesPerBlock: number;
    };
    rg32sint: {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: {
            blend: boolean;
            resolve: boolean;
            byteCost: number;
            alignment: number;
        };
        readonly multisample: boolean;
        readonly feature: undefined;
        readonly baseFormat: undefined;
        readonly bytesPerBlock: number;
    };
    rg32float: {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: {
            blend: boolean;
            resolve: boolean;
            byteCost: number;
            alignment: number;
        };
        readonly multisample: boolean;
        readonly feature: undefined;
        readonly baseFormat: undefined;
        readonly bytesPerBlock: number;
    };
    rgba32uint: {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: {
            blend: boolean;
            resolve: boolean;
            byteCost: number;
            alignment: number;
        };
        readonly multisample: boolean;
        readonly feature: undefined;
        readonly baseFormat: undefined;
        readonly bytesPerBlock: number;
    };
    rgba32sint: {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: {
            blend: boolean;
            resolve: boolean;
            byteCost: number;
            alignment: number;
        };
        readonly multisample: boolean;
        readonly feature: undefined;
        readonly baseFormat: undefined;
        readonly bytesPerBlock: number;
    };
    rgba32float: {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: {
            blend: boolean;
            resolve: boolean;
            byteCost: number;
            alignment: number;
        };
        readonly multisample: boolean;
        readonly feature: undefined;
        readonly baseFormat: undefined;
        readonly bytesPerBlock: number;
    };
    rgb10a2uint: {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: {
            blend: boolean;
            resolve: boolean;
            byteCost: number;
            alignment: number;
        };
        readonly multisample: boolean;
        readonly feature: undefined;
        readonly baseFormat: undefined;
        readonly bytesPerBlock: number;
    };
    rgb10a2unorm: {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: {
            blend: boolean;
            resolve: boolean;
            byteCost: number;
            alignment: number;
        };
        readonly multisample: boolean;
        readonly feature: undefined;
        readonly baseFormat: undefined;
        readonly bytesPerBlock: number;
    };
    rg11b10ufloat: {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: {
            blend: boolean;
            resolve: boolean;
            byteCost: number;
            alignment: number;
        };
        readonly multisample: boolean;
        readonly feature: undefined;
        readonly baseFormat: undefined;
        readonly bytesPerBlock: number;
    };
    rgb9e5ufloat: {
        readonly blockWidth: number;
        readonly blockHeight: number;
        readonly color: {
            type: string;
            copySrc: boolean;
            copyDst: boolean;
            storage: boolean;
            readWriteStorage: boolean;
            bytes: number;
        };
        readonly depth: undefined;
        readonly stencil: undefined;
        readonly colorRender: undefined;
        readonly multisample: boolean;
        readonly feature: undefined;
        readonly baseFormat: undefined;
        readonly bytesPerBlock: number;
    };
};
export declare const kCanvasTextureFormats: string[];
