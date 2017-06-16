import { Envs } from "./main";
import * as matrix from "./math/matrix";
import * as vector from "./math/vector";
import * as utils from "./math/utils";

const vss = `
    attribute vec3 a_position;

    uniform mat4 u_m;

    void main(){
        gl_Position = vec4(a_position, 1.0) * u_m;
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

let ctx: WebGLRenderingContext;

export function Setup(): void {
    Envs.ctx = ctx = Envs.can.getContext("webgl")!;
    ctx.clearColor(0.157, 0.173, 0.204, 1.0);

    ResetViewport();
}

export function MakeShader(st: uint, s: string): WebGLShader {
    const shader = ctx.createShader(st);
    if (null === shader) {
        throw "error";
    }

    ctx.shaderSource(shader, s);
    ctx.compileShader(shader);

    return shader;
}

export function MakeProgram(vs: WebGLShader, fs: WebGLShader): WebGLProgram {
    const program = ctx.createProgram();
    if (null === program) {
        throw "error";
    }
    ctx.attachShader(program, vs);
    ctx.attachShader(program, fs);
    ctx.linkProgram(program);

    return program;
}

export function ResetViewport(): void {
    ctx.viewport(0, 0, Envs.can.width, Envs.can.height);
}

let p: WebGLProgram;

export function BeforeRender(): void {
    const vs = MakeShader(ctx.VERTEX_SHADER, vss);
    const fs = MakeShader(ctx.FRAGMENT_SHADER, fss);
    p = MakeProgram(vs, fs);

    const pos_raw = new Float32Array([
        -0.5, 0.5, 0.0,
        0.5, 0.5, 0.0,
        0.5, -0.5, 0.0,
        -0.5, 0.5, 0.0,
        0.5, -0.5, 0.0,
        -0.5, -0.5, 0.0,

        -0.5, 0.5, 1.0,
        0.5, 0.5, 1.0,
        0.5, -0.5, 1.0,
        -0.5, 0.5, 1.0,
        0.5, -0.5, 1.0,
        -0.5, -0.5, 1.0,
    ]);

    let an = ctx.getProgramParameter(p, ctx.ACTIVE_ATTRIBUTES);
    for(let i:int = 0; i < an; ++i){
        let c = ctx.getActiveAttrib(p, i)!;
        console.log(c);
        
    }

    const pos_buff = ctx.createBuffer()!;
    ctx.bindBuffer(ctx.ARRAY_BUFFER, pos_buff);
    ctx.bufferData(ctx.ARRAY_BUFFER, pos_raw, ctx.STATIC_DRAW);

    const l = ctx.getAttribLocation(p, "a_position");
    ctx.vertexAttribPointer(l, 3, ctx.FLOAT, false, 0, 0);
    ctx.enableVertexAttribArray(l);

    ctx.useProgram(p);
}

export function Render(): void {
    ctx.clear(ctx.COLOR_BUFFER_BIT);

    const s_m: matrix.Matrix = utils.MakeScale(2, 2, 2);
    const r_m: matrix.Matrix = utils.MakeRotate(Envs.elapse / 30, 1);
    const t_m: matrix.Matrix = utils.MakeTranslate(0, 0, 1);
    const v_m: matrix.Matrix = utils.MakeUVN(vector.Make(0, 4, -2, 1), vector.Make(0, 0, 0, 1), vector.Make(0, 1, 0, 0));
    const p_m: matrix.Matrix = utils.MakeProjection(90.0, Envs.can.width / Envs.can.height, 0.1, 1000);

    const u = ctx.getUniformLocation(p, "u_m")!;
    ctx.uniformMatrix4fv(u, false, matrix.MakeIdentity().multiplies(s_m, r_m, t_m, v_m, p_m).transpose().raw);

    ctx.drawArrays(ctx.TRIANGLES, 0, 12);
}
