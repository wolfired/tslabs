import { DEG_2_RAD, AXIS } from "../math";
import { Vector, Subtraction as v_Subtraction, CrossProduct as v_CrossProduct, Clone as v_Clone } from "./vector";

export function MakeZero(): Matrix {
    return new Matrix();
}

export function MakeIdentity(): Matrix {
    return MakeZero().identity();
}

export function Clone(dst: Float32Array, src: Float32Array): void {
    dst[0x0] = src[0x0], dst[0x1] = src[0x1], dst[0x2] = src[0x2], dst[0x3] = src[0x3];
    dst[0x4] = src[0x4], dst[0x5] = src[0x5], dst[0x6] = src[0x6], dst[0x7] = src[0x7];
    dst[0x8] = src[0x8], dst[0x9] = src[0x9], dst[0xA] = src[0xA], dst[0xB] = src[0xB];
    dst[0xC] = src[0xC], dst[0xD] = src[0xD], dst[0xE] = src[0xE], dst[0xF] = src[0xF];
}

export function Transpose(t: Matrix, r: Matrix = new Matrix()): Matrix {
    if (r !== t) {
        r.raw[0x0] = t.raw[0x0];
        r.raw[0x5] = t.raw[0x5];
        r.raw[0xA] = t.raw[0xA];
        r.raw[0xF] = t.raw[0xF];
    }
    [r.raw[0x1], r.raw[0x4]] = [t.raw[0x4], t.raw[0x1]];
    [r.raw[0x2], r.raw[0x8]] = [t.raw[0x8], t.raw[0x2]];
    [r.raw[0x3], r.raw[0xC]] = [t.raw[0xC], t.raw[0x3]];
    [r.raw[0x6], r.raw[0x9]] = [t.raw[0x9], t.raw[0x6]];
    [r.raw[0x7], r.raw[0xD]] = [t.raw[0xD], t.raw[0x7]];
    [r.raw[0xB], r.raw[0xE]] = [t.raw[0xE], t.raw[0xB]];
    return r;
}

export function Multiply(lh: Matrix, rh: Matrix, r: Matrix = new Matrix()): Matrix {
    [r.raw[0x0], r.raw[0x1], r.raw[0x2], r.raw[0x3]] = [
        lh.raw[0x0] * rh.raw[0x0] + lh.raw[0x1] * rh.raw[0x4] + lh.raw[0x2] * rh.raw[0x8] + lh.raw[0x3] * rh.raw[0xC],
        lh.raw[0x0] * rh.raw[0x1] + lh.raw[0x1] * rh.raw[0x5] + lh.raw[0x2] * rh.raw[0x9] + lh.raw[0x3] * rh.raw[0xD],
        lh.raw[0x0] * rh.raw[0x2] + lh.raw[0x1] * rh.raw[0x6] + lh.raw[0x2] * rh.raw[0xA] + lh.raw[0x3] * rh.raw[0xE],
        lh.raw[0x0] * rh.raw[0x3] + lh.raw[0x1] * rh.raw[0x7] + lh.raw[0x2] * rh.raw[0xB] + lh.raw[0x3] * rh.raw[0xF],
    ];

    [r.raw[0x4], r.raw[0x5], r.raw[0x6], r.raw[0x7]] = [
        lh.raw[0x4] * rh.raw[0x0] + lh.raw[0x5] * rh.raw[0x4] + lh.raw[0x6] * rh.raw[0x8] + lh.raw[0x7] * rh.raw[0xC],
        lh.raw[0x4] * rh.raw[0x1] + lh.raw[0x5] * rh.raw[0x5] + lh.raw[0x6] * rh.raw[0x9] + lh.raw[0x7] * rh.raw[0xD],
        lh.raw[0x4] * rh.raw[0x2] + lh.raw[0x5] * rh.raw[0x6] + lh.raw[0x6] * rh.raw[0xA] + lh.raw[0x7] * rh.raw[0xE],
        lh.raw[0x4] * rh.raw[0x3] + lh.raw[0x5] * rh.raw[0x7] + lh.raw[0x6] * rh.raw[0xB] + lh.raw[0x7] * rh.raw[0xF],
    ];

    [r.raw[0x8], r.raw[0x9], r.raw[0xA], r.raw[0xB]] = [
        lh.raw[0x8] * rh.raw[0x0] + lh.raw[0x9] * rh.raw[0x4] + lh.raw[0xA] * rh.raw[0x8] + lh.raw[0xB] * rh.raw[0xC],
        lh.raw[0x8] * rh.raw[0x1] + lh.raw[0x9] * rh.raw[0x5] + lh.raw[0xA] * rh.raw[0x9] + lh.raw[0xB] * rh.raw[0xD],
        lh.raw[0x8] * rh.raw[0x2] + lh.raw[0x9] * rh.raw[0x6] + lh.raw[0xA] * rh.raw[0xA] + lh.raw[0xB] * rh.raw[0xE],
        lh.raw[0x8] * rh.raw[0x3] + lh.raw[0x9] * rh.raw[0x7] + lh.raw[0xA] * rh.raw[0xB] + lh.raw[0xB] * rh.raw[0xF],
    ];

    [r.raw[0xC], r.raw[0xD], r.raw[0xE], r.raw[0xF]] = [
        lh.raw[0xC] * rh.raw[0x0] + lh.raw[0xD] * rh.raw[0x4] + lh.raw[0xE] * rh.raw[0x8] + lh.raw[0xF] * rh.raw[0xC],
        lh.raw[0xC] * rh.raw[0x1] + lh.raw[0xD] * rh.raw[0x5] + lh.raw[0xE] * rh.raw[0x9] + lh.raw[0xF] * rh.raw[0xD],
        lh.raw[0xC] * rh.raw[0x2] + lh.raw[0xD] * rh.raw[0x6] + lh.raw[0xE] * rh.raw[0xA] + lh.raw[0xF] * rh.raw[0xE],
        lh.raw[0xC] * rh.raw[0x3] + lh.raw[0xD] * rh.raw[0x7] + lh.raw[0xE] * rh.raw[0xB] + lh.raw[0xF] * rh.raw[0xF],
    ];
    return r;
}

export function MakeTranslate(tx: float32 = 0.0, ty: float32 = 0.0, tz: float32 = 0.0): Matrix {
    const r: Matrix = MakeIdentity();
    r.raw[0xC] = tx, r.raw[0xD] = ty, r.raw[0xE] = tz;
    return r;
}

export function MakeScale(sx: float32 = 1.0, sy: float32 = 1.0, sz: float32 = 1.0): Matrix {
    const r: Matrix = MakeIdentity();
    r.raw[0x0] = sx, r.raw[0x5] = sy, r.raw[0xA] = sz;
    return r;
}

export function MakeRotate(deg: float32 = 0, axis: uint = AXIS.X): Matrix {
    const r: Matrix = MakeIdentity();

    const rad: float32 = deg * DEG_2_RAD;

    switch (axis) {
        case AXIS.X: {
            r.raw[0x5] = +Math.cos(rad), r.raw[0x6] = Math.sin(rad);
            r.raw[0x9] = -Math.sin(rad), r.raw[0xA] = Math.cos(rad);
            break;
        }
        case AXIS.Y: {
            r.raw[0x0] = Math.cos(rad), r.raw[0x2] = -Math.sin(rad);
            r.raw[0x8] = Math.sin(rad), r.raw[0xA] = +Math.cos(rad);
            break;
        }
        case AXIS.Z: {
            r.raw[0x0] = +Math.cos(rad), r.raw[0x1] = Math.sin(rad);
            r.raw[0x4] = -Math.sin(rad), r.raw[0x5] = Math.cos(rad);
            break;
        }
    }
    return r;
}

export function MakeUVN(at: Vector, to: Vector, up: Vector): Matrix {
    const n: Vector = v_Subtraction(to, at).normalize();;//前向量
    const u: Vector = v_CrossProduct(up, n).normalize();;//右向量
    const v: Vector = v_CrossProduct(n, u);//上向量

    const t: Vector = new Vector(-at.dotProduct(u), -at.dotProduct(v), -at.dotProduct(n), 1.0);

    const r: Matrix = MakeIdentity();
    r.copyColumnFrom(0, u.raw);
    r.copyColumnFrom(1, v.raw);
    r.copyColumnFrom(2, n.raw);
    r.copyRowFrom(3, t.raw);

    return r;
}

export function MakeProjection(fovx_deg: float32, aspectRatio: float32, near: float32, far: float32): Matrix {
    var zoom_x: float32 = 1.0 / Math.tan(fovx_deg * DEG_2_RAD / 2.0);
    var zoom_y: float32 = aspectRatio * zoom_x;

    var r: Matrix = MakeIdentity();

    r.raw[0x0] = zoom_x;
    r.raw[0x5] = zoom_y;
    r.raw[0xA] = (far + near) / (far - near), r.raw[0xB] = 1.0;
    r.raw[0xE] = -2 * far * near / (far - near), r.raw[0xF] = 0.0;

    return r;
}

export function MakeScreen(view_port_width: float32, view_port_original_width: float32, view_port_height: float32, view_port_original_height: float32, aspectRatio: float32): Matrix {
    var half_width: float32 = (view_port_width - 1) / 2;
    var half_height: float32 = (view_port_height - 1) / 2;

    var r: Matrix = MakeIdentity();

    r.raw[0x0] = half_width * view_port_original_width / view_port_width;
    r.raw[0x5] = -half_height * view_port_original_height / (view_port_height * aspectRatio);
    r.raw[0xE] = half_width, r.raw[0xF] = half_height;

    return r;
}

export function Translate(tx: float32 = 0.0, ty: float32 = 0.0, tz: float32 = 0.0): void {
    // this.multiply(AWMathUtil.makeTranslateMatrix(tx, ty, tz));
}

export function Scale(sx: float32 = 1.0, sy: float32 = 1.0, sz: float32 = 1.0): void {
    // this.multiply(AWMathUtil.makeScaleMatrix(sx, sy, sz));
}

export function Rotate(deg: float32 = 0.0, axis: uint = AXIS.X): void {
    // this.multiply(AWMathUtil.makeRotateMatrix(deg, axis));
}

/**
 * 矩阵
 */
export class Matrix {
    public readonly raw: Float32Array = null!;

    public constructor() {
        this.raw = new Float32Array(16);
    }

    public identity(): Matrix {
        this.raw[0x0] = 1, this.raw[0x1] = 0, this.raw[0x2] = 0, this.raw[0x3] = 0;
        this.raw[0x4] = 0, this.raw[0x5] = 1, this.raw[0x6] = 0, this.raw[0x7] = 0;
        this.raw[0x8] = 0, this.raw[0x9] = 0, this.raw[0xA] = 1, this.raw[0xB] = 0;
        this.raw[0xC] = 0, this.raw[0xD] = 0, this.raw[0xE] = 0, this.raw[0xF] = 1;
        return this;
    }

    public transpose(): Matrix {
        return Transpose(this, this);
    }

    public multiply(rh: Matrix): Matrix {
        return Multiply(this, rh, this);
    }

    public multiplies(...rhs: Matrix[]): Matrix {
        rhs.forEach(rh => {
            this.multiply(rh);
        });
        return this;
    }

    public copyRowFrom(row: uint, raw: Float32Array): void {
        const mark: uint = row << 2;
        this.raw[mark + 0x0] = raw[0x0];
        this.raw[mark + 0x1] = raw[0x1];
        this.raw[mark + 0x2] = raw[0x2];
        this.raw[mark + 0x3] = raw[0x3];
    }

    public copyRowTo(row: uint, raw: Float32Array = new Float32Array(4)): Float32Array {
        const mark: uint = row << 2;
        raw[0x0] = this.raw[mark + 0x0];
        raw[0x1] = this.raw[mark + 0x1];
        raw[0x2] = this.raw[mark + 0x2];
        raw[0x3] = this.raw[mark + 0x3];
        return raw;
    }

    public copyColumnFrom(cloumn: uint, raw: Float32Array): void {
        this.raw[cloumn + 0x0] = raw[0x0];
        this.raw[cloumn + 0x4] = raw[0x1];
        this.raw[cloumn + 0x8] = raw[0x2];
        this.raw[cloumn + 0xC] = raw[0x3];
    }

    public copyColumnTo(cloumn: uint, raw: Float32Array = new Float32Array(4)): Float32Array {
        raw[0x0] = this.raw[cloumn + 0x0];
        raw[0x1] = this.raw[cloumn + 0x4];
        raw[0x2] = this.raw[cloumn + 0x8];
        raw[0x3] = this.raw[cloumn + 0xC];
        return raw;
    }
}

export function Format(t: Matrix): void {
    const arr = [];

    arr.length = 0;
    arr.push(t.raw[0x0], t.raw[0x1], t.raw[0x2], t.raw[0x3]);
    console.log(arr.join("\t"));

    arr.length = 0;
    arr.push(t.raw[0x4], t.raw[0x5], t.raw[0x6], t.raw[0x7]);
    console.log(arr.join("\t"));

    arr.length = 0;
    arr.push(t.raw[0x8], t.raw[0x9], t.raw[0xA], t.raw[0xB]);
    console.log(arr.join("\t"));

    arr.length = 0;
    arr.push(t.raw[0xC], t.raw[0xD], t.raw[0xE], t.raw[0xF]);
    console.log(arr.join("\t"));
}
