import * as signal from "./signal";
import * as webgl from "./webgl";

export class MainSignal extends signal.Signal {
    public static readonly CANVAS_READY: uint = 1;
    public static readonly WEBGL_READY: uint = 2;
}

export class Main extends signal.SignalRouter {

}

export interface Args {
    canvas_w?: uint;
    canvas_h?: uint;
}

let args: Args = {
    canvas_w: 500,
    canvas_h: 500,
};

export class Forever {
    private _id: uint;

    public play(): void {
        let forver = (elapse: uint) => {
            this._id = window.requestAnimationFrame(forver);
            console.log(elapse);
        };
        forver(0);
    }

    public stop(): void {
        window.cancelAnimationFrame(this._id);
    }

    public next(): void {

    }
}

export function main({ canvas_w = args.canvas_w!, canvas_h = args.canvas_h! }: Args = args): void {
    let can = document.createElement("canvas");
    can.width = canvas_w;
    can.height = canvas_h;

    can.addEventListener("mousedown", (event: MouseEvent) => {
    });

    document.body.appendChild(can);

    webgl.setup(can.getContext("webgl")!);

    let f = new Forever();
    f.play();
}
