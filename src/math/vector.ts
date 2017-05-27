export function Make(x: float32 = 0.0, y: float32 = 0.0, z: float32 = 0.0, w: float32 = 0.0): Vector {
    return new Vector(x, y, z, w);
}

export function Clone(dst: Float32Array, src: Float32Array): void {
    dst[0x0] = src[0x0], dst[0x1] = src[0x1], dst[0x2] = src[0x2], dst[0x3] = src[0x3];
}

export function Normalize(t: Vector, r: Vector = new Vector()): Vector {
    const len: float32 = t.length;
    [r.raw[0], r.raw[1], r.raw[2]] = [
        t.raw[0] /= len,
        t.raw[1] /= len,
        t.raw[2] /= len,
    ];
    return r;
}

export function Addition(lh: Vector, rh: Vector, r: Vector = new Vector()): Vector {
    [r.raw[0], r.raw[1], r.raw[2]] = [
        lh.raw[0] + rh.raw[0],
        lh.raw[1] + rh.raw[1],
        lh.raw[2] + rh.raw[2],
    ];
    return r;
}

export function Subtraction(lh: Vector, rh: Vector, r: Vector = new Vector()): Vector {
    [r.raw[0], r.raw[1], r.raw[2]] = [
        lh.raw[0] - rh.raw[0],
        lh.raw[1] - rh.raw[1],
        lh.raw[2] - rh.raw[2],
    ];
    return r;
}

export function DotProduct(lh: Vector, rh: Vector): float32 {
    let r: float32 = 0.0;
    r += lh.raw[0] * rh.raw[0];
    r += lh.raw[1] * rh.raw[1];
    r += lh.raw[2] * rh.raw[2];
    return r;
}

export function CrossProduct(lh: Vector, rh: Vector, r: Vector = new Vector()): Vector {
    [r.raw[0], r.raw[1], r.raw[2]] = [
        lh.raw[1] * rh.raw[2] - lh.raw[2] * rh.raw[1],
        lh.raw[2] * rh.raw[0] - lh.raw[0] * rh.raw[2],
        lh.raw[0] * rh.raw[1] - lh.raw[1] * rh.raw[0],
    ];
    return r;
}
/**
 * 向量
 */
export class Vector {
    public constructor(x: float32 = 0.0, y: float32 = 0.0, z: float32 = 0.0, w: float32 = 0.0) {
        this.raw = new Float32Array(4);
        this.raw[0] = x;
        this.raw[1] = y;
        this.raw[2] = z;
        this.raw[3] = w;
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
        return Math.sqrt(this.raw[0] * this.raw[0] + this.raw[1] * this.raw[1] + this.raw[2] * this.raw[2]);
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
