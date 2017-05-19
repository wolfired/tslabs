import * as utf8 from "../unicode/utf8";

export class Buffer {
    private _bytes: Uint8Array;
    private _cursor: int = 0;

    public constructor(bytes: Uint8Array) {
        this._bytes = bytes;
    }

    /**
     * 封装全部未读字节，游标不移动
     */
    public bytes(): Uint8Array {
        return new Uint8Array(this._bytes.buffer, this._cursor, this.len());
    }

    /**
     * 容量
     */
    public cap(): int {
        return this._bytes.byteLength;
    }

    /**
     * 增加指定容量
     */
    public grow(n: int): void {
        const bytes = this._bytes;

        this._bytes = new Uint8Array(this.cap() + n);

        this._bytes.set(bytes);
    }

    /**
     * 未读字节数
     */
    public len(): int {
        return this._bytes.byteLength - this._cursor;
    }

    /**
     * 封装n个未读字节，游标移动
     */
    public next(n: int): Uint8Array {
        if (this.len() < n) {
            n = this.len();
        }

        const cursor = this._cursor;

        this._cursor += n;

        return new Uint8Array(this._bytes.buffer, cursor, n);
    }

    /**
     * 读取dst.byteLength字节，返回实际读取字节数，游标移动
     */
    public read(dst: Uint8Array): int {
        const bytes = this.next(dst.byteLength);

        for (let i = 0; i < bytes.byteLength; ++i) {
            dst[i] = bytes[i];
        }

        return bytes.byteLength;
    }

    /**
     * 读取一个字节，游标移动
     */
    public readByte(): byte {
        if (0 === this.len()) {
            throw "error"
        }

        return this._bytes[this._cursor++];
    }

    /**
     * 读取多个字节，游标移动
     */
    public readBytes(delim: byte): Uint8Array {
        const bytes = this.bytes();

        let n: int = 0;
        for (n = 0; n < bytes.byteLength; ++n) {
            if (delim === bytes[n]) {
                ++n;
                break;
            }
        }

        const dst = new Uint8Array(n);

        this.read(dst);

        return dst;
    }

    /**
     * 数据流：this._bytes <- src
     */
    public readFrom(src: "io.Reader"): void {

    }

    /**
     * 读取一个UTF-8编码的Unicode codepoint
     */
    public readRune(): [rune, int] {
        const bytes = this.bytes();
        const [codepoint, size] = utf8.DecodeRune(bytes);

        this._cursor += size;

        return [codepoint, size];
    }
}

export function NewBuffer(bytes: Uint8Array): Buffer {
    return new Buffer(bytes);
}

// export function NewBufferString(str: String): Buffer {
//     return new Buffer();
// }
