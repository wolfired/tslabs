/** 着色器类型 */
export const enum ShaderType {
    /** 片段着色器 */
    FRAGMENT_SHADER = 0x8B30,
    /** 顶点着色器 */
    VERTEX_SHADER = 0x8B31,
};

export class WGLWrapper {

    private ctx: WebGLRenderingContext;

    public constructor(ctx: WebGLRenderingContext) {
        this.ctx = ctx;
    }

    public makeShader(st: ShaderType, src: string): WebGLShader {
        let s = this.ctx.createShader(st);
        this.shaderLog(s);

        this.ctx.shaderSource(s, src);
        this.shaderLog(s);

        this.ctx.compileShader(s);
        this.shaderLog(s);

        return s!;
    }

    public makeProgram(vs: WebGLShader, fs: WebGLShader): WebGLProgram {
        let p = this.ctx.createProgram();
        this.programLog(p);

        this.ctx.attachShader(p, vs);
        this.programLog(p);

        this.ctx.attachShader(p, fs);
        this.programLog(p);

        this.ctx.linkProgram(p);
        this.programLog(p);

        return p!;
    }

    private shaderLog(s: WebGLShader | null): void {
        if (null === s) {
            throw "error during createShader";
        }

        let log = this.ctx.getShaderInfoLog(s);

        if (null === log) {
            throw "error during getShaderInfoLog";
        }

        if ("" !== log) {
            throw log;
        }
    }

    private programLog(p: WebGLProgram | null): void {
        if (null === p) {
            throw "error during createProgram";
        }

        let log = this.ctx.getProgramInfoLog(p);

        if (null === log) {
            throw "error during getProgramInfoLog";
        }

        if ("" !== log) {
            throw log;
        }
    }
}
