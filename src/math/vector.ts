export function Make(x: float32 = 0.0, y: float32 = 0.0, z: float32 = 0.0, w: float32 = 0.0): Vector {
    return new Vector(x, y, z, w);
}

export function Clone(dst: Float32Array, src: Float32Array): void {
    dst[0x0] = src[0x0], dst[0x1] = src[0x1], dst[0x2] = src[0x2], dst[0x3] = src[0x3];
}

export function LengthRaw(t: Float32Array): float32 {
    return Math.sqrt(t[0] * t[0] + t[1] * t[1] + t[2] * t[2]);
}

export function NormalizeRaw(t: Float32Array, r: Float32Array): void {
    const len: float32 = LengthRaw(t);
    [r[0], r[1], r[2]] = [
        t[0] /= len,
        t[1] /= len,
        t[2] /= len,
    ];
}

export function Normalize(t: Vector, r: Vector = new Vector()): Vector {
    NormalizeRaw(t.raw, r.raw);
    return r;
}

export function AdditionRaw(lh: Float32Array, rh: Float32Array, r: Float32Array): void {
    [r[0], r[1], r[2]] = [
        lh[0] + rh[0],
        lh[1] + rh[1],
        lh[2] + rh[2],
    ];
}

export function Addition(lh: Vector, rh: Vector, r: Vector = new Vector()): Vector {
    AdditionRaw(lh.raw, rh.raw, r.raw);
    return r;
}

export function SubtractionRaw(lh: Float32Array, rh: Float32Array, r: Float32Array): void {
    [r[0], r[1], r[2]] = [
        lh[0] - rh[0],
        lh[1] - rh[1],
        lh[2] - rh[2],
    ];
}

export function Subtraction(lh: Vector, rh: Vector, r: Vector = new Vector()): Vector {
    SubtractionRaw(lh.raw, rh.raw, r.raw);
    return r;
}

export function DotProductRaw(lh: Float32Array, rh: Float32Array): float32 {
    let r: float32 = 0.0;
    r += lh[0] * rh[0];
    r += lh[1] * rh[1];
    r += lh[2] * rh[2];
    return r;
}

export function DotProduct(lh: Vector, rh: Vector): float32 {
    return DotProductRaw(lh.raw, rh.raw);
}

export function CrossProductRaw(lh: Float32Array, rh: Float32Array, r: Float32Array): void {
    [r[0], r[1], r[2]] = [
        lh[1] * rh[2] - lh[2] * rh[1],
        lh[2] * rh[0] - lh[0] * rh[2],
        lh[0] * rh[1] - lh[1] * rh[0],
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
    public get x(): float32 { return this.raw[0]; }
    public set x(value: float32) { this.raw[0] = value; }
    public get y(): float32 { return this.raw[1]; }
    public set y(value: float32) { this.raw[1] = value; }
    public get z(): float32 { return this.raw[2]; }
    public set z(value: float32) { this.raw[2] = value; }
    public get w(): float32 { return this.raw[3]; }
    public set W(value: float32) { this.raw[3] = value; }
}
