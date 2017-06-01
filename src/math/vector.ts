export function Make(x: float32 = 0.0, y: float32 = 0.0, z: float32 = 0.0, w: float32 = 0.0): Vector {
    return new Vector(x, y, z, w);
}

export function Clone(dst: Float32Array, src: Float32Array): void {
    dst[0x0] = src[0x0], dst[0x1] = src[0x1], dst[0x2] = src[0x2], dst[0x3] = src[0x3];
}

export function LengthRaw(t: Float32Array): float32 {
    return Math.sqrt(t[0x0] * t[0x0] + t[0x1] * t[0x1] + t[0x2] * t[0x2]);
}

export function NormalizeRaw(t: Float32Array, r: Float32Array): void {
    const len: float32 = LengthRaw(t);
    [r[0x0], r[0x1], r[0x2]] = [
        t[0x0] / len,
        t[0x1] / len,
        t[0x2] / len,
    ];
}

export function Normalize(t: Vector, r: Vector = new Vector()): Vector {
    NormalizeRaw(t.raw, r.raw);
    return r;
}

export function AdditionRaw(lh: Float32Array, rh: Float32Array, r: Float32Array): void {
    [r[0x0], r[0x1], r[0x2]] = [
        lh[0x0] + rh[0x0],
        lh[0x1] + rh[0x1],
        lh[0x2] + rh[0x2],
    ];
}

export function Addition(lh: Vector, rh: Vector, r: Vector = new Vector()): Vector {
    AdditionRaw(lh.raw, rh.raw, r.raw);
    return r;
}

export function SubtractionRaw(lh: Float32Array, rh: Float32Array, r: Float32Array): void {
    [r[0x0], r[0x1], r[0x2]] = [
        lh[0x0] - rh[0x0],
        lh[0x1] - rh[0x1],
        lh[0x2] - rh[0x2],
    ];
}

export function Subtraction(lh: Vector, rh: Vector, r: Vector = new Vector()): Vector {
    SubtractionRaw(lh.raw, rh.raw, r.raw);
    return r;
}

export function DotProductRaw(lh: Float32Array, rh: Float32Array): float32 {
    let r: float32 = 0.0;
    r += lh[0x0] * rh[0x0];
    r += lh[0x1] * rh[0x1];
    r += lh[0x2] * rh[0x2];
    return r;
}

export function DotProduct(lh: Vector, rh: Vector): float32 {
    return DotProductRaw(lh.raw, rh.raw);
}

export function CrossProductRaw(lh: Float32Array, rh: Float32Array, r: Float32Array): void {
    [r[0x0], r[0x1], r[0x2]] = [
        lh[0x1] * rh[0x2] - lh[0x2] * rh[0x1],
        lh[0x2] * rh[0x0] - lh[0x0] * rh[0x2],
        lh[0x0] * rh[0x1] - lh[0x1] * rh[0x0],
    ];
}

export function CrossProduct(lh: Vector, rh: Vector, r: Vector = new Vector()): Vector {
    CrossProductRaw(lh.raw, rh.raw, r.raw);
    return r;
}
/**
 * 向量
 */
export class Vector {
    public constructor(x: float32 = 0.0, y: float32 = 0.0, z: float32 = 0.0, w: float32 = 0.0) {
        this.raw = new Float32Array([x, y, z, w]);
    }

    public normalize(): Vector {
        return Normalize(this, this);
    }

    public addition(rh: Vector): Vector {
        return Addition(this, rh, this);
    }

    public subtraction(rh: Vector): Vector {
        return Subtraction(this, rh, this);
    }

    public dotProduct(rh: Vector): float32 {
        return DotProduct(this, rh);
    }

    public crossProduct(rh: Vector): Vector {
        return CrossProduct(this, rh, this);
    }

    public get length(): float32 {
        return LengthRaw(this.raw);
    }

    public readonly raw: Float32Array = null!;
    public get x(): float32 { return this.raw[0x0]; }
    public set x(value: float32) { this.raw[0x0] = value; }
    public get y(): float32 { return this.raw[0x1]; }
    public set y(value: float32) { this.raw[0x1] = value; }
    public get z(): float32 { return this.raw[0x2]; }
    public set z(value: float32) { this.raw[0x2] = value; }
    public get w(): float32 { return this.raw[0x3]; }
    public set W(value: float32) { this.raw[0x3] = value; }
}
