export class Vector {
    public static addition(lh: Vector, rh: Vector, r: Vector = new Vector()): Vector {
        r._raw[0] = lh._raw[0] + rh._raw[0];
        r._raw[1] = lh._raw[1] + rh._raw[1];
        r._raw[2] = lh._raw[2] + rh._raw[2];

        return r;
    }

    public static subtraction(lh: Vector, rh: Vector, r: Vector = new Vector()): Vector {
        r._raw[0] = lh._raw[0] - rh._raw[0];
        r._raw[1] = lh._raw[1] - rh._raw[1];
        r._raw[2] = lh._raw[2] - rh._raw[2];

        return r;
    }

    public static dotProduct(lh: Vector, rh: Vector, r: Vector = new Vector()): Vector {
        r._raw[0] = lh._raw[0] * rh._raw[0];
        r._raw[1] = lh._raw[1] * rh._raw[1];
        r._raw[2] = lh._raw[2] * rh._raw[2];

        return r;
    }

    public static crossProduct(lh: Vector, rh: Vector, r: Vector = new Vector()): Vector {
        r._raw[0] = lh._raw[1] * rh._raw[2] - lh._raw[2] * rh._raw[1];
        r._raw[1] = lh._raw[2] * rh._raw[0] - lh._raw[0] * rh._raw[2];
        r._raw[2] = lh._raw[0] * rh._raw[1] - lh._raw[1] * rh._raw[0];

        return r;
    }

    public constructor(x: float32 = 0.0, y: float32 = 0.0, z: float32 = 0.0, w: float32 = 0.0) {
        this._raw[0] = x;
        this._raw[1] = y;
        this._raw[2] = z;
        this._raw[3] = w;
    }

    public normalize(): void {
        var len: float32 = this.length;
        this._raw[0] /= len;
        this._raw[1] /= len;
        this._raw[2] /= len;
    }

    public addition(rh: Vector): void {
        this._raw[0] += rh._raw[0];
        this._raw[1] += rh._raw[1];
        this._raw[2] += rh._raw[2];
    }

    public subtraction(rh: Vector): void {
        this._raw[0] -= rh._raw[0];
        this._raw[1] -= rh._raw[1];
        this._raw[2] -= rh._raw[2];
    }

    public dotProduct(rh: Vector): void {
        this._raw[0] *= rh._raw[0];
        this._raw[1] *= rh._raw[1];
        this._raw[2] *= rh._raw[2];
    }

    public crossProduct(rh: Vector): void {
        let t = Vector.crossProduct(this, rh);
        this._raw[0] = t._raw[0];
        this._raw[1] = t._raw[1];
        this._raw[2] = t._raw[2];
    }

    public get length(): float32 {
        return Math.sqrt(this._raw[0] * this._raw[0] + this._raw[1] * this._raw[1] + this._raw[2] * this._raw[2]);
    }

    private _raw: Float32Array = new Float32Array(4);
    public get x(): float32 { return this._raw[0]; }
    public set x(value: float32) { this._raw[0] = value; }
    public get y(): float32 { return this._raw[1]; }
    public set y(value: float32) { this._raw[1] = value; }
    public get z(): float32 { return this._raw[2]; }
    public set z(value: float32) { this._raw[2] = value; }
    public get w(): float32 { return this._raw[3]; }
    public set W(value: float32) { this._raw[3] = value; }
}
