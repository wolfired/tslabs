import * as html from "./html";
import * as sock from "./sock";
import * as webgl from "./webgl";
import { Entity } from "./entity";
import { Transform } from "./component/transform";
import { Mesh } from "./component/mesh";
import { Camera } from "./component/camera";

export const Args = {
    canvas_w: "100vw",
    canvas_h: "100vh",
    server: "ws://localhost",
};

export const Envs = {
    can: null! as HTMLCanvasElement,
    ctx: null! as WebGLRenderingContext,
    sock: null! as WebSocket,
    elapse: 0 as uint,
    entities: null! as Entity[],
}

export function Main(): void {
    html.Setup();
    webgl.Setup();
    sock.Setup();

    Envs.entities = [];

    const e = new Entity();
    e.dryGet(Mesh);
    e.dryGet(Transform);

    Envs.entities.push(e);

    //do component init | update
    for (const e of Envs.entities) {
        e.each();
    }

    //prepare draw data

    //do draw call

    webgl.BeforeRender();
}
