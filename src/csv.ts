import * as fs from "fs";

const QUOTE_MINIMAL: uint = 100;

export interface IWriter {
    writerow(content: string[]): void;
}

class WriterImpl implements IWriter {
    public writerow(content: string[]): void {

    }
}

export function Writer(fd: uint, delimiter: string = ",", quotechar: string = "\"", quoting: uint = QUOTE_MINIMAL): IWriter {
    return new WriterImpl();
}
