export function Clone(dst: Float32Array, src: Float32Array): void {
    dst[0x0] = src[0x0], dst[0x1] = src[0x1], dst[0x2] = src[0x2], dst[0x3] = src[0x3];
}

export function LengthRaw(t: Float32Array): float32 {
    return Math.sqrt(t[0x0] * t[0x0] + t[0x1] * t[0x1] + t[0x2] * t[0x2] + t[0x3] * t[0x3]);
}

export function AdditionRaw(lh: Float32Array, rh: Float32Array, r: Float32Array): void {
    [r[0x0], r[0x1], r[0x2], r[0x3]] = [
        lh[0x0] + rh[0x0],
        lh[0x1] + rh[0x1],
        lh[0x2] + rh[0x2],
        lh[0x3] + rh[0x3],
    ];
}

export function Addition(lh: Quaternion, rh: Quaternion, r: Quaternion = new Quaternion()): Quaternion {
    AdditionRaw(lh.raw, rh.raw, r.raw);
    return r;
}

export function SubtractionRaw(lh: Float32Array, rh: Float32Array, r: Float32Array): void {
    [r[0x0], r[0x1], r[0x2], r[0x3]] = [
        lh[0x0] - rh[0x0],
        lh[0x1] - rh[0x1],
        lh[0x2] - rh[0x2],
        lh[0x3] - rh[0x3],
    ];
}

export function Subtraction(lh: Quaternion, rh: Quaternion, r: Quaternion = new Quaternion()): Quaternion {
    SubtractionRaw(lh.raw, rh.raw, r.raw);
    return r;
}

export function InverseRaw(t: Float32Array, r: Float32Array): void {
    const len: float32 = LengthRaw(t);
    [r[0x0], r[0x1], r[0x2], r[0x3]] = [
        -t[0x0] / len,
        -t[0x1] / len,
        -t[0x2] / len,
        +t[0x3] / len,
    ];
}

export function Inverse(t: Quaternion, r: Quaternion = new Quaternion()): Quaternion {
    InverseRaw(t.raw, r.raw);
    return r;
}

export function MultiplyRaw(lh: Float32Array, rh: Float32Array, r: Float32Array): void {
    [r[0x0], r[0x1], r[0x2], r[0x3]] = [
        lh[0x1] * rh[0x2] - lh[0x2] * rh[0x1] + lh[0x3] * rh[0x0] + lh[0x0] * rh[0x3],
        lh[0x2] * rh[0x0] - lh[0x0] * rh[0x2] + lh[0x3] * rh[0x1] + lh[0x1] * rh[0x3],
        lh[0x0] * rh[0x1] - lh[0x1] * rh[0x0] + lh[0x3] * rh[0x2] + lh[0x2] * rh[0x3],
        lh[0x3] * rh[0x3] - lh[0x0] * rh[0x0] - lh[0x1] * rh[0x1] - lh[0x2] * rh[0x2],
    ]
}

export function Multiply(lh: Quaternion, rh: Quaternion, r: Quaternion = new Quaternion()): Quaternion {
    MultiplyRaw(lh.raw, rh.raw, r.raw);
    return r;
}

export class Quaternion {
    public constructor(x: float32 = 0.0, y: float32 = 0.0, z: float32 = 0.0, w: float32 = 0.0) {
        this.raw = new Float32Array([x, y, z, w]);
    }

    public addition(rh: Quaternion): Quaternion {
        return Addition(this, rh, this);
    }

    public subtraction(rh: Quaternion): Quaternion {
        return Subtraction(this, rh, this);
    }

    public inverse(): Quaternion {
        return Inverse(this, this);
    }

    public multiply(rh: Quaternion): Quaternion {
        return Multiply(this, rh, this);
    }

    public raw: Float32Array = null!;
}
