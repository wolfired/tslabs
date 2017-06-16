import { Args, Envs } from "./main";

let sock: WebSocket;

export function Setup(): void {
    Envs.sock = sock = new WebSocket(Args.server);

    sock.binaryType = "arraybuffer";

    sock.onmessage = (e: MessageEvent) => {
    }

    sock.onopen = (e: Event) => {

    };
}

export function Send(raw: ArrayBuffer): void {
    sock.send(raw);
}
