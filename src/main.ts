import * as html from "./html";
import * as webgl from "./webgl";

export const Args = {
    canvas_w: "100vw",
    canvas_h: "100vh",
};

export const Envs = {
    can: null! as HTMLCanvasElement,
    ctx: null! as WebGLRenderingContext,
    elapse: 0 as uint,
}

export function Main(): void {
    html.Setup();
    webgl.Setup();

    webgl.BeforeRender();
}
