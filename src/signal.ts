/**
 * 信号基类
 */
export class Signal {
    public readonly sid: uint

    public constructor(sid: uint) {
        this.sid = sid;
    }
}

export type SignalHandler = (s: Signal) => void;

export interface ISignalRouter {
    addHandler(sid: uint, handler: SignalHandler): void;
    delHandler(sid: uint, handler: SignalHandler): void;
    clnHandler(sid: uint): void;
    route(s: Signal): void;
}

export class SignalRouter implements ISignalRouter {
    private _id_handlers_map: SignalHandler[][];

    public constructor() {
        this._id_handlers_map = [];
    }

    public addHandler(sid: uint, handler: SignalHandler): void {
        let index: int = this.indexOfHandler(sid, handler);

        if (-1 !== index) {
            return;
        }

        this.getHandlers(sid).push(handler);
    }

    public delHandler(sid: uint, handler: SignalHandler): void {
        let index: int = this.indexOfHandler(sid, handler);

        if (-1 === index) {
            return;
        }

        this.getHandlers(sid).splice(index, 1);
    }
    public clnHandler(sid: uint): void {
        this.getHandlers(sid).length = 0;
    }

    public route(s: Signal): void {
        let handlers = this.getHandlers(s.sid);

        for (let handler of handlers) {
            handler(s);
        }
    }

    private getHandlers(sid: uint): SignalHandler[] {
        var handlers = this._id_handlers_map[sid] as SignalHandler[];

        if (void 0 === handlers) {
            this._id_handlers_map[sid] = handlers = [];
        }

        return handlers;
    }

    private indexOfHandler(signal_id: uint, handler: SignalHandler): int {
        return this.getHandlers(signal_id).indexOf(handler);
    }
}
