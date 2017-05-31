import * as matrix from "./math/matrix";
import * as vector from "./math/vector";
import * as utils from "./webgl/utils";

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
let p:WebGLProgram;
export function beforeRender(): void {
    const vs = createShader(ShaderType.VERTEX, vss);
    const fs = createShader(ShaderType.FRAGMENT, fss);
    p = createProgram(vs, fs);
    ctx.useProgram(p);

    const pos_data = [
        -0.5, 0.5, 0.0, 1.0,
        0.5, 0.5, 0.0, 1.0,
        0.5, -0.5, 0.0, 1.0,
        -0.5, 0.5, 0.0, 1.0,
        0.5, -0.5, 0.0, 1.0,
        -0.5, -0.5, 0.0, 1.0,

        -0.5, 0.5, 1.0, 1.0,
        0.5, 0.5, 1.0, 1.0,
        0.5, -0.5, 1.0, 1.0,
        -0.5, 0.5, 1.0, 1.0,
        0.5, -0.5, 1.0, 1.0,
        -0.5, -0.5, 1.0, 1.0,
    ];
    const pos_raw = new Float32Array(pos_data);
    
    const pos_buff = ctx.createBuffer()!;
    ctx.bindBuffer(ctx.ARRAY_BUFFER, pos_buff);
    ctx.bufferData(ctx.ARRAY_BUFFER, pos_raw, ctx.STATIC_DRAW);

    const l = ctx.getAttribLocation(p, "a_position");
    ctx.vertexAttribPointer(l, 4, ctx.FLOAT, false, 0, 0);
    ctx.enableVertexAttribArray(l);
}

export function render(elapse:uint): void {
    ctx.clear(ctx.COLOR_BUFFER_BIT);

    const s_m: matrix.Matrix = utils.MakeScale();
    const r_m: matrix.Matrix = utils.MakeRotate(elapse / 30, 1);
    const t_m: matrix.Matrix = utils.MakeTranslate(0, 0, 1);
    const v_m: matrix.Matrix = utils.MakeUVN(vector.Make(0, 0, 0, 1), vector.Make(0, 0, 1, 1), vector.Make(0, 1, 0, 0));
    const p_m: matrix.Matrix = utils.MakeProjection(90.0, wid / hei, 0.1, 1000);

    const u = ctx.getUniformLocation(p, "u_m")!;
    ctx.uniformMatrix4fv(u, false, matrix.MakeIdentity().multiplies(s_m, r_m, t_m, v_m, p_m).transpose().raw);

    ctx.drawArrays(ctx.TRIANGLES, 0, 12);
}
