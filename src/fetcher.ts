export function simpleFetch(url: string) {
    return new Promise<Uint8Array>(async (resolve, reject) => {
        let r = await fetch(url);

        let len = parseInt(r.headers.get("Content-Length")!);

        let buf: Uint8Array = new Uint8Array(len);

        let rr = r.body!.getReader();
        let tt = 0;

        while (true) {
            let { done, value }: { done: bool, value: Uint8Array } = await rr.read();
            if (done) {
                break;
            }

            buf.set(value);

            tt += value.byteLength;
        }

        resolve(buf);
    });
}

type Callback = (result: Uint8Array) => void;

class Task {
    private _url: string;
    private _callback: Callback;

    public constructor(url: string, callback: Callback) {
        this._url = url;
        this._callback = callback;
    }
}

interface Dict<T> {
    [index: string]: T;
}

export class Fetcher {
    private _dict: Dict<Task>;

    public constructor() {
        this._dict = {};
    }

    public Fetch(url: string, callback: Callback): void {
        let task = this._dict[url];
        if (void 0 === task) {
            this._dict[url] = task = new Task(url, callback);
        }
    }

    public Fetchs(urls: string[], callback: Callback): void {
        urls.forEach(url => {
            this.Fetch(url, (result) => callback(result));
        });
    }
}
