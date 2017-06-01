import * as html from "./html";
import * as webgl from "./webgl";
import { Entity } from "./entity";
import { Transform } from "./component/transform";
import { Mesh } from "./component/mesh";
import { Camera } from "./component/camera";

export const Args = {
    canvas_w: "100vw",
    canvas_h: "100vh",
};

export const Envs = {
    can: null! as HTMLCanvasElement,
    ctx: null! as WebGLRenderingContext,
    elapse: 0 as uint,
    entities: null! as Entity[],
}

export function Main(): void {
    html.Setup();
    webgl.Setup();

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
