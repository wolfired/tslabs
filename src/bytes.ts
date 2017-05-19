/**
 * 按字典序逐byte比较
 * x[i] < y[i] -> -1
 * x[i] == y[i] -> 0
 * x[i] > y[i] -> 1
 */
export function Compare(x: Uint8Array, y: Uint8Array): int {
    const min_len: int = x.byteLength < y.byteLength ? x.byteLength : y.byteLength;
    for (let i: int = 0; i < min_len; ++i) {
        if (x[i] < y[i]) {
            return -1;
        }
        if (x[i] > y[i]) {
            return 1;
        }
    }

    if (x.byteLength < y.byteLength) {
        return -1;
    }
    if (x.byteLength > y.byteLength) {
        return 1;
    }

    return 0;
}

export function Contains(superset: Uint8Array, subset: Uint8Array): bool {
    return false;
}

export function Index(superset: Uint8Array, subset: Uint8Array): int {
    return -1;
}
