import * as signal from "./signal";
import * as webgl from "./webgl";

export class MainSignal extends signal.Signal {
    public static readonly CANVAS_READY: uint = 1;
    public static readonly WEBGL_READY: uint = 2;
}

export class Main extends signal.SignalRouter {

}

export class Forever {
    private _id: uint;

    public play(): void {
        let forver = (elapse: uint) => {
            this._id = window.requestAnimationFrame(forver);
        };
        forver(0);
    }

    public stop(): void {
        window.cancelAnimationFrame(this._id);
    }
}

export interface Args {
    canvas_w?: uint;
    canvas_h?: uint;
}

let args: Args = {
    canvas_w: 400,
    canvas_h: 400,
};

export function main({ canvas_w = args.canvas_w!, canvas_h = args.canvas_h! }: Args = args): void {
    document.body.style.margin = "0px";

    let can = document.createElement("canvas");
    can.style.width = "100vw";
    can.style.height = "100vh";
    can.style.display = "block";
    document.body.appendChild(can);

    can.width = Math.round(can.clientWidth * window.devicePixelRatio);
    can.height = Math.round(can.clientHeight * window.devicePixelRatio);

    can.addEventListener("mousedown", (event: MouseEvent) => {
    });

    webgl.setup(can);

    let f = new Forever();
    f.play();
}
