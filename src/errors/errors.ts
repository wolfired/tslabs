export function New(text: string): error {
    return new errorString(text);
}

class errorString implements error {
    public constructor(private s: string) { }

    public Error(): string {
        return this.s;
    }
}
