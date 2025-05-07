declare const webgpuMemoryIdSymbol: unique symbol;
declare global {
    interface GPUObjectBase {
        [webgpuMemoryIdSymbol]: number;
    }
    interface GPUCanvasContext {
        [webgpuMemoryIdSymbol]: number;
    }
}
type MemoryInfo = {
    total: number;
    buffer: number;
    texture: number;
    querySet: number;
    canvas: number;
    maxTotal: number;
};
/**
 * Gets WebGPU memory usage. If no device is passed in returns info for all devices.
 */
export declare function getWebGPUMemoryUsage(device?: GPUDevice): {
    memory: MemoryInfo;
    resources: {
        [key: string]: number;
    };
};
export declare function resetMaxTotal(device?: GPUDevice): void;
declare global {
    interface GPUDevice {
        createSampler(descriptor?: any): GPUSampler;
        createBindGroup(descriptor: any): GPUBindGroup;
        createBindGroupLayout(descriptor: any): GPUBindGroupLayout;
        createPipelineLayout(descriptor: any): GPUPipelineLayout;
        createShaderModule(descriptor: any): GPUShaderModule;
        createComputePipeline(descriptor: any): GPUComputePipeline;
        createRenderPipeline(descriptor: any): GPURenderPipeline;
        createComputePipelineAsync(descriptor: any): Promise<GPUComputePipeline>;
        createRenderPipelineAsync(descriptor: any): Promise<GPURenderPipeline>;
        prototype: GPUDevice;
    }
}
export {};
