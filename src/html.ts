import { Args, Envs } from "./main";
import * as webgl from "./webgl";

const forver = (elapse: uint) => {
    window.requestAnimationFrame(forver);
    if (16 < elapse - Envs.elapse) {
        webgl.Render();

        Envs.elapse = elapse;
    }
};

let can: HTMLCanvasElement;

export function Setup(): void {
    document.body.style.margin = "0px";

    Envs.can = can = document.body.appendChild(document.createElement("canvas"));

    can.style.display = "block";
    can.style.width = Args.canvas_w;
    can.style.height = Args.canvas_h;
    can.width = Math.round(can.clientWidth * window.devicePixelRatio);
    can.height = Math.round(can.clientHeight * window.devicePixelRatio);
    can.addEventListener("mousedown", (event: MouseEvent) => {
        
    });

    window.addEventListener("resize", (event: UIEvent) => {
        can.width = Math.round(can.clientWidth * window.devicePixelRatio);
        can.height = Math.round(can.clientHeight * window.devicePixelRatio);
        webgl.ResetViewport();
    });

    window.addEventListener("touchstart", (event: TouchEvent) => {
        console.log(event.target);
    });

    forver(0);
}
