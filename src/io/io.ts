import * as errors from '../errors';

export interface Reader {
    Read(p: ArrayBuffer): { n: int, err: error };
}

export interface Writer {
    Write(p: ArrayBuffer): { n: int, err: error };
}
