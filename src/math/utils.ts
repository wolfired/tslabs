import { AXIS, DEG_2_RAD } from "./consts";
import * as matrix from "./matrix";
import * as vector from "./vector";

export function MakeTranslate(tx: float32 = 0.0, ty: float32 = 0.0, tz: float32 = 0.0): matrix.Matrix {
    const r: matrix.Matrix = matrix.MakeIdentity();
    r.raw[0xC] = tx, r.raw[0xD] = ty, r.raw[0xE] = tz;
    return r;
}

export function MakeScale(sx: float32 = 1.0, sy: float32 = 1.0, sz: float32 = 1.0): matrix.Matrix {
    const r: matrix.Matrix = matrix.MakeIdentity();
    r.raw[0x0] = sx, r.raw[0x5] = sy, r.raw[0xA] = sz;
    return r;
}

export function MakeRotate(deg: float32 = 0, axis: AXIS = AXIS.X): matrix.Matrix {
    const r: matrix.Matrix = matrix.MakeIdentity();

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

export function MakeUVN(at: vector.Vector, to: vector.Vector, up: vector.Vector): matrix.Matrix {
    const n: vector.Vector = vector.Subtraction(to, at).normalize();//前向量
    const u: vector.Vector = vector.CrossProduct(up, n).normalize();//右向量
    const v: vector.Vector = vector.CrossProduct(n, u);//上向量

    const t: vector.Vector = vector.Make(-at.dotProduct(u), -at.dotProduct(v), -at.dotProduct(n), 1.0);

    const r: matrix.Matrix = matrix.MakeIdentity();
    r.copyColumnFrom(0, u.raw);
    r.copyColumnFrom(1, v.raw);
    r.copyColumnFrom(2, n.raw);
    r.copyRowFrom(3, t.raw);

    return r;
}

export function MakeProjection(fovx_deg: float32, aspectRatio: float32, near: float32, far: float32): matrix.Matrix {
    var zoom_x: float32 = 1.0 / Math.tan(fovx_deg * DEG_2_RAD / 2.0);
    var zoom_y: float32 = aspectRatio * zoom_x;

    var r: matrix.Matrix = matrix.MakeIdentity();

    r.raw[0x0] = zoom_x;
    r.raw[0x5] = zoom_y;
    r.raw[0xA] = - (far + near) / (far - near), r.raw[0xB] = 1.0;
    r.raw[0xE] = 2 * far * near / (far - near), r.raw[0xF] = 0.0;

    return r;
}

export function MakeScreen(view_port_width: float32, view_port_original_width: float32, view_port_height: float32, view_port_original_height: float32, aspectRatio: float32): matrix.Matrix {
    var half_width: float32 = (view_port_width - 1) / 2;
    var half_height: float32 = (view_port_height - 1) / 2;

    var r: matrix.Matrix = matrix.MakeIdentity();

    r.raw[0x0] = half_width * view_port_original_width / view_port_width;
    r.raw[0x5] = -half_height * view_port_original_height / (view_port_height * aspectRatio);
    r.raw[0xE] = half_width, r.raw[0xF] = half_height;

    return r;
}
