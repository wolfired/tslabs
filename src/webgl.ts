const vss = `
    attribute vec4 a_position;

    void main(){
        gl_Position = a_position;
    }
`;

const fss = `
    precision mediump float;

    uniform vec2 u_resolution;
    
    //gl_FragCoord
    //gl_FragColor
    //discard
    void main(){
        vec2 center = u_resolution / 2.0;
        float r = min(center.x, center.y);

        vec2 pos = gl_FragCoord.xy - center;

        // if(abs(pos.x) > r || abs(pos.y) > r){
        if(length(pos) > r){    
            gl_FragColor = vec4(1.0, 0.0, 0.0, 0.5);
        }else{
            gl_FragColor = vec4(0.0, 1.0, 0.0, 0.5);
        }
    }
`;

export enum ShaderType { VERTEX, FRAGMENT };

export class WebGL {
    public readonly ctx: WebGLRenderingContext;

    public constructor(ctx: WebGLRenderingContext) {
        this.ctx = ctx;
    }

    public createShader(st: ShaderType, s: string): WebGLShader {
        const shader = this.ctx.createShader(ShaderType.VERTEX === st ? this.ctx.VERTEX_SHADER : this.ctx.FRAGMENT_SHADER);
        if (null === shader) {
            throw "error";
        }

        this.ctx.shaderSource(shader, s);
        this.ctx.compileShader(shader);

        return shader;
    }

    public createProgram(vs: WebGLShader, fs: WebGLShader): WebGLProgram {
        const program = this.ctx.createProgram();
        if (null === program) {
            throw "error";
        }
        this.ctx.attachShader(program, vs);
        this.ctx.attachShader(program, fs);
        this.ctx.linkProgram(program);

        return program;
    }
}


export function setup(can:HTMLCanvasElement): void {
    const ctx: WebGLRenderingContext = can.getContext("webgl")!;

    ctx.viewport(0, 0, can.width, can.height);
    ctx.clearColor(0.157, 0.173, 0.204, 1.0);

    ctx.clear(ctx.COLOR_BUFFER_BIT);

    const webgl = new WebGL(ctx);

    const vs = webgl.createShader(ShaderType.VERTEX, vss);
    const fs = webgl.createShader(ShaderType.FRAGMENT, fss);
    const p = webgl.createProgram(vs, fs);

    const pdata = [
        -1.0, 1.0,
        1.0, 1.0,
        1.0, -1.0,
        -1.0, 1.0,
        1.0, -1.0,
        -1.0, -1.0
    ];
    const pbuffer = ctx.createBuffer()!;
    ctx.bindBuffer(ctx.ARRAY_BUFFER, pbuffer);
    ctx.bufferData(ctx.ARRAY_BUFFER, new Float32Array(pdata), ctx.STATIC_DRAW);

    ctx.useProgram(p);

    const l = ctx.getAttribLocation(p, "a_position");
    ctx.vertexAttribPointer(l, 2, ctx.FLOAT, false, 0, 0);
    ctx.enableVertexAttribArray(l);

    const u = ctx.getUniformLocation(p, "u_resolution");
    ctx.uniform2f(u, can.width, can.height);


    ctx.drawArrays(ctx.TRIANGLES, 0, 6);
}
