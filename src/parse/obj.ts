import { IParser } from "../parse";
import * as utf8 from "../unicode/utf8";

const minus: byte = 45;// -
const point: byte = 46;// .
const zero: byte = 48;// 0
const pound: byte = 35;// #
const cr: byte = 13;// \r
const lf: byte = 10;// \n
const tab: byte = 9;// tab
const space: byte = 32// space
const slash: byte = 47// /


/**
 * 判断当前位置是不是行尾，返回行尾字节数
 */
function isLineEnd(buffer: Uint8Array, begin: int): [bool, int] {
    const len: int = buffer.byteLength;

    if (1 < (len - begin) && cr === buffer[begin] && lf === buffer[begin + 1]) {
        return [true, 2];
    }

    if (cr === buffer[begin] || lf === buffer[begin]) {
        return [true, 1];
    }

    return [false, 1];
}

/**
 * 判断当前位置是不是词尾，返回词尾字节数
 */
function isWordEnd(buffer: Uint8Array, begin: int): [bool, int] {
    const end: int = buffer.byteLength;

    if (space === buffer[begin]) {
        return [true, 1];
    }

    return isLineEnd(buffer, begin);
}

/**
 * 返回下一行的开始位置
 */
function cutLine(buffer: Uint8Array, begin: int): int {
    while (begin < buffer.byteLength) {
        let [e, s] = isLineEnd(buffer, begin);
        begin += s;
        if (e) {
            break;
        }
    }
    return begin;
}

/**
 * 返回下一词的开始位置
 */
function cutWord(buffer: Uint8Array, begin: int): int {
    while (begin < buffer.byteLength) {
        let [e, s] = isWordEnd(buffer, begin);
        begin += s;
        if (e) {
            break;
        }
    }
    return begin;
}

function dumpWord(buffer: Uint8Array, begin: int, end: int): string {
    for (let i = begin; i < end; ++i) {
        if (cr !== buffer[i] && lf !== buffer[i] && tab !== buffer[i]) {
            begin = i;
            break;
        }
    }
    for (let i = end - 1; i >= begin; --i) {
        if (cr !== buffer[i] && lf !== buffer[i] && tab !== buffer[i]) {
            end = i;
            break;
        }
    }
    return String.fromCodePoint(...buffer.slice(begin, end));
}

function dumpNumber(buffer: Uint8Array, begin: int, end: int): float32 {
    return parseFloat(dumpWord(buffer, begin, end));
}

export class Obj implements IParser {
    public readonly vs: VertexData = null!;
    public readonly vts: VertexData = null!;
    public readonly vns: VertexData = null!;
    public readonly fs: TriangleData = null!;

    public parse(raw: Uint8Array): void {
        const vs: float32[] = [];
        const vns: float32[] = [];
        const fs: uint32[] = [];

        let line_begin: int = 0;
        let line_end: int = 0;
        while (true) {
            line_end = cutLine(raw, line_begin);

            if (pound !== raw[line_begin]) {
                while (line_begin < line_end) {
                    let word_begin = line_begin;
                    let word_end: int;
                    let word: string;
                    let nums: string[];
                    let num: int;


                    word_end = cutWord(raw, word_begin);
                    word = dumpWord(raw, word_begin, word_end);
                    word_begin = word_end;

                    switch (word) {
                        case "v":
                            word_end = cutWord(raw, word_begin);
                            vs.push(dumpNumber(raw, word_begin, word_end));
                            word_begin = word_end;

                            word_end = cutWord(raw, word_begin);
                            vs.push(dumpNumber(raw, word_begin, word_end));
                            word_begin = word_end;

                            word_end = cutWord(raw, word_begin);
                            vs.push(dumpNumber(raw, word_begin, word_end));
                            word_begin = word_end;
                            break;
                        case "vn":
                            word_end = cutWord(raw, word_begin);
                            vns.push(dumpNumber(raw, word_begin, word_end));
                            word_begin = word_end;

                            word_end = cutWord(raw, word_begin);
                            vns.push(dumpNumber(raw, word_begin, word_end));
                            word_begin = word_end;

                            word_end = cutWord(raw, word_begin);
                            vns.push(dumpNumber(raw, word_begin, word_end));
                            word_begin = word_end;
                            break;
                        case "f":
                            word_end = cutWord(raw, word_begin);
                            word = dumpWord(raw, word_begin, word_end);
                            word_begin = word_end;

                            nums = word.split(/\//);
                            fs.push(parseInt(nums[0]));
                            fs.push(-1);
                            fs.push(parseInt(nums[2]));

                            word_end = cutWord(raw, word_begin);
                            word = dumpWord(raw, word_begin, word_end);
                            word_begin = word_end;

                            nums = word.split(/\//);
                            fs.push(parseInt(nums[0]));
                            fs.push(-1);
                            fs.push(parseInt(nums[2]));

                            word_end = cutWord(raw, word_begin);
                            word = dumpWord(raw, word_begin, word_end);
                            word_begin = word_end;

                            nums = word.split(/\//);
                            fs.push(parseInt(nums[0]));
                            fs.push(-1);
                            fs.push(parseInt(nums[2]));
                            break;
                        default:
                            break;
                    }

                    line_begin = word_end;
                }
            }

            line_begin = line_end;

            if (raw.byteLength <= line_begin) {
                break;
            }
        }
        (<{ vs: VertexData }>this).vs = new VertexData(vs.length, 3);
        this.vs.raw.set(vs);

        (<{ vns: VertexData }>this).vns = new VertexData(vns.length, 3);
        this.vns.raw.set(vns);

        (<{ fs: TriangleData }>this).fs = new TriangleData(fs.length, 9);
        this.fs.raw.set(fs);
    }
}

export class VertexData {
    public readonly size: int = 0;
    public readonly raw: Float32Array = null!;

    public constructor(len: int, size: int) {
        this.size = size;
        this.raw = new Float32Array(len);
    }

    public get count(): int {
        return this.raw.length / this.size;
    }
}

export class TriangleData {
    public readonly size: int = 0;
    public readonly raw: Int32Array = null!;

    public constructor(len: int, size: int) {
        this.size = size;
        this.raw = new Int32Array(len);
    }

    public get count(): int {
        return this.raw.length / this.size;
    }
}
