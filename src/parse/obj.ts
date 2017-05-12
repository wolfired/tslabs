import { IParser } from "../parse";

const minus: uint = 45;// -
const point: uint = 46;// .
const zero: uint = 48;// 0
const pound: uint = 35;// #
const cr: uint = 13;// \r
const lf: uint = 10;// \n
const space: uint = 32// space

function comment_handler(buffer: ArrayBuffer): void {
    let raw = new Uint8Array(buffer);

}

function string_handler(): void {

}

function number_handler(buffer: ArrayBuffer): float32 {
    let raw = new Uint8Array(buffer);

    let sign: float32 = 1.0;
    let sum: float32 = 0.0;
    let divisor: float32 = 0.0;
    for (var index = 0; index < raw.byteLength; ++index) {
        let v: uint8 = raw[index];

        if (minus === v) {
            sign = -1.0;
            continue;
        } else if (point === v) {
            divisor = 1.0;
            continue;
        }

        sum = sum * 10 + v - 48;

        if (0.0 < divisor) {
            divisor *= 10.0;
        }
    }

    return 0.0 === divisor ? sign * sum : sign * sum / divisor;
}

export class Obj implements IParser {
    public readonly vertex_coord: Uint8Array;
    public readonly texture_coord: Uint8Array;
    public readonly normal_vector: Uint8Array;

    public parse(raw: Uint8Array): void {
        let begin: uint = 0;
        let v: uint8;
        while (true) {
            v = raw[begin];
        }
    }
}
