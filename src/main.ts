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
        let mark: uint = 0;
        let forver = (elapse: uint) => {
            this._id = window.requestAnimationFrame(forver);
            if (16 < elapse - mark) {
                webgl.render(elapse);

                mark = elapse;
            }
            
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
    can.style.width = "300px";
    can.style.height = "300px";
    can.style.display = "block";
    can.addEventListener("mousedown", (event: MouseEvent) => {
    });
    document.body.appendChild(can);

    webgl.setup(can);

    window.addEventListener("resize", (event: UIEvent) => {
        can.width = Math.round(can.clientWidth * window.devicePixelRatio);
        can.height = Math.round(can.clientHeight * window.devicePixelRatio);
        webgl.resetViewport(can.width, can.height);
    });

    can.width = Math.round(can.clientWidth * window.devicePixelRatio);
    can.height = Math.round(can.clientHeight * window.devicePixelRatio);
    webgl.resetViewport(can.width, can.height);

    webgl.beforeRender();
    // webgl.render();

    let f = new Forever();
    f.play();
}
