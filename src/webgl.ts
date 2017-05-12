


export function setup(ctx: WebGLRenderingContext): void {
    ctx.clearColor(0.6, 0.6, 0.6, 1.0);
    ctx.viewport(100, 100, 100, 100);

    ctx.clear(ctx.COLOR_BUFFER_BIT);
}



