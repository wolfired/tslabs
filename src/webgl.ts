import * as m from "./math/matrix";
import * as v from "./math/vector";

const vss = `
    attribute vec4 a_position;

    uniform mat4 u_m;

    void main(){
        gl_Position = a_position * u_m;
    }
`;

const fss = `
    //mediump
    //highp
    precision mediump float;

    //gl_FragCoord
    //gl_FragColor
    //discard
    void main(){
        gl_FragColor = vec4(0.0, 1.0, 0.0, 0.5);
    }
`;

export enum ShaderType { VERTEX, FRAGMENT };

let ctx: WebGLRenderingContext;
let wid: float32;
let hei: float32;

export function setup(can: HTMLCanvasElement): void {
    ctx = can.getContext("webgl")!;
    ctx.clearColor(0.157, 0.173, 0.204, 1.0);
}

export function createShader(st: ShaderType, s: string): WebGLShader {
    const shader = ctx.createShader(ShaderType.VERTEX === st ? ctx.VERTEX_SHADER : ctx.FRAGMENT_SHADER);
    if (null === shader) {
        throw "error";
    }

    ctx.shaderSource(shader, s);
    ctx.compileShader(shader);

    return shader;
}

export function createProgram(vs: WebGLShader, fs: WebGLShader): WebGLProgram {
    const program = ctx.createProgram();
    if (null === program) {
        throw "error";
    }
    ctx.attachShader(program, vs);
    ctx.attachShader(program, fs);
    ctx.linkProgram(program);

    return program;
}

export function resetViewport(w: float32, h: float32): void {
    wid = w;
    hei = h;
    ctx.viewport(0, 0, wid, hei);
}

export function beforeRender(): void {
    const vs = createShader(ShaderType.VERTEX, vss);
    const fs = createShader(ShaderType.FRAGMENT, fss);
    const p = createProgram(vs, fs);
    ctx.useProgram(p);

    const pos_data = [
        -1.0, 1.0, 0.0, 1.0,
        1.0, 1.0, 0.0, 1.0,
        1.0, -1.0, 0.0, 1.0,
        -1.0, 1.0, 0.0, 1.0,
        1.0, -1.0, 0.0, 1.0,
        -1.0, -1.0, 0.0, 1.0,
    ];
    const pos_raw = new Float32Array(pos_data);
    const pos_buff = ctx.createBuffer()!;
    ctx.bindBuffer(ctx.ARRAY_BUFFER, pos_buff);
    ctx.bufferData(ctx.ARRAY_BUFFER, pos_raw, ctx.STATIC_DRAW);

    const l = ctx.getAttribLocation(p, "a_position");
    ctx.vertexAttribPointer(l, 4, ctx.FLOAT, false, 0, 0);
    ctx.enableVertexAttribArray(l);

    const s_m: m.Matrix = m.MakeScale();
    const r_m: m.Matrix = m.MakeRotate(0, 2);
    const t_m: m.Matrix = m.MakeTranslate(0, 0, 8);
    const v_m: m.Matrix = m.MakeUVN(v.Make(0, 0, 0, 1), v.Make(0, 0, 1, 1), v.Make(0, 1, 0, 0));
    const p_m: m.Matrix = m.MakeProjection(90.0, wid / hei, 0.1, 1000);

    const pos_m: m.Matrix = m.MakeZero();
    m.Clone(pos_m.raw, pos_raw);
    m.Format(pos_m.multiplies(s_m, r_m, t_m, v_m, p_m));

    const u = ctx.getUniformLocation(p, "u_m")!;
    ctx.uniformMatrix4fv(u, false, m.MakeIdentity().multiplies(s_m, r_m, t_m, v_m, p_m).raw);


}

export function render(): void {
    ctx.clear(ctx.COLOR_BUFFER_BIT);

    ctx.drawArrays(ctx.TRIANGLES, 0, 6);
}


