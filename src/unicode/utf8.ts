/** 替换无效编码 */
export const RuneError: rune = "\u{FFFD}".codePointAt(0)!;

export const RuneSelf: uint = 0x80;
/** 最大有效Unicode codepoint */
export const MaxRune: rune = "\u{10FFFF}".codePointAt(0)!;
/** UTF-8编码最高字节数 */
export const UTF8Max: uint = 4;

/** surrogateMin <= codepoint <= surrogateMax 为无效Unicode codepoint */
const surrogateMin: uint = 0xD800;
/** surrogateMin <= codepoint <= surrogateMax 为无效Unicode codepoint */
const surrogateMax: uint = 0xDFFF;

const t1: byte = 0x00; // 0000 0000
const tx: byte = 0x80; // 1000 0000
const t2: byte = 0xC0; // 1100 0000
const t3: byte = 0xE0; // 1110 0000
const t4: byte = 0xF0; // 1111 0000
const t5: byte = 0xF8; // 1111 1000

const maskx: byte = 0x3F; // 0011 1111
const mask2: byte = 0x1F; // 0001 1111
const mask3: byte = 0x0F; // 0000 1111
const mask4: byte = 0x07; // 0000 0111

/** codepoint <= rune1Max，占用1个字节*/
const rune1Max: uint = (1 << 7) - 1;
/** codepoint <= rune2Max，占用2个字节*/
const rune2Max: uint = (1 << 11) - 1;
/** codepoint <= rune3Max，占用3个字节*/
const rune3Max: uint = (1 << 16) - 1;

const locb: byte = 0x80; // 1000 0000
const hicb: byte = 0xBF; // 1011 1111

const xx: byte = 0xF1 // invalid: size 1
const as: byte = 0xF0 // ASCII: size 1
const s1: byte = 0x02 // accept 0, size 2
const s2: byte = 0x13 // accept 1, size 3
const s3: byte = 0x03 // accept 0, size 3
const s4: byte = 0x23 // accept 2, size 3
const s5: byte = 0x34 // accept 3, size 4
const s6: byte = 0x04 // accept 0, size 4
const s7: byte = 0x44 // accept 4, size 4

const first: byte[] = [
    //   1   2   3   4   5   6   7   8   9   A   B   C   D   E   F
    as, as, as, as, as, as, as, as, as, as, as, as, as, as, as, as, // 0x00-0x0F
    as, as, as, as, as, as, as, as, as, as, as, as, as, as, as, as, // 0x10-0x1F
    as, as, as, as, as, as, as, as, as, as, as, as, as, as, as, as, // 0x20-0x2F
    as, as, as, as, as, as, as, as, as, as, as, as, as, as, as, as, // 0x30-0x3F
    as, as, as, as, as, as, as, as, as, as, as, as, as, as, as, as, // 0x40-0x4F
    as, as, as, as, as, as, as, as, as, as, as, as, as, as, as, as, // 0x50-0x5F
    as, as, as, as, as, as, as, as, as, as, as, as, as, as, as, as, // 0x60-0x6F
    as, as, as, as, as, as, as, as, as, as, as, as, as, as, as, as, // 0x70-0x7F
    //   1   2   3   4   5   6   7   8   9   A   B   C   D   E   F
    xx, xx, xx, xx, xx, xx, xx, xx, xx, xx, xx, xx, xx, xx, xx, xx, // 0x80-0x8F
    xx, xx, xx, xx, xx, xx, xx, xx, xx, xx, xx, xx, xx, xx, xx, xx, // 0x90-0x9F
    xx, xx, xx, xx, xx, xx, xx, xx, xx, xx, xx, xx, xx, xx, xx, xx, // 0xA0-0xAF
    xx, xx, xx, xx, xx, xx, xx, xx, xx, xx, xx, xx, xx, xx, xx, xx, // 0xB0-0xBF
    xx, xx, s1, s1, s1, s1, s1, s1, s1, s1, s1, s1, s1, s1, s1, s1, // 0xC0-0xCF
    s1, s1, s1, s1, s1, s1, s1, s1, s1, s1, s1, s1, s1, s1, s1, s1, // 0xD0-0xDF
    s2, s3, s3, s3, s3, s3, s3, s3, s3, s3, s3, s3, s3, s4, s3, s3, // 0xE0-0xEF
    s5, s6, s6, s6, s7, xx, xx, xx, xx, xx, xx, xx, xx, xx, xx, xx, // 0xF0-0xFF
];

const acceptRanges: { lo: byte, hi: byte }[] = [
    { lo: locb, hi: hicb },
    { lo: 0xA0, hi: hicb },
    { lo: locb, hi: 0x9F },
    { lo: 0x90, hi: hicb },
    { lo: locb, hi: 0x8F },
]

/**
 * 计算Unicode codepoint的UTF-8编码字节数
 */
export function RuneLen(codepoint: rune): int {
    if (rune1Max >= codepoint) {
        return 1;
    }

    if (rune2Max >= codepoint) {
        return 2;
    }

    if (surrogateMin <= codepoint && codepoint <= surrogateMax) {
        return -1;
    }

    if (rune3Max >= codepoint) {
        return 3;
    }

    if (MaxRune >= codepoint) {
        return UTF8Max;
    }

    return -1;
}

/**
 * 解码bytes中第一个rune，返回读字节数
 * @returns [codepoint:rune, size:int]
 */
export function DecodeRune(bytes: Uint8Array): [rune, int] {
    const len: int = bytes.byteLength;

    if (1 > len) {
        return [RuneError, 0];
    }

    const byte0: byte = bytes[0];
    const x: byte = first[byte0];

    if (as <= x) {
        const mask = x << 31 >> 31;
        return [byte0 & ~mask | RuneError & mask, 1];
    }

    const size: int = x & 0xF;
    const accept = acceptRanges[x >> 4];

    if (len < size) {
        return [RuneError, 1];
    }

    const byte1: byte = bytes[1];
    if (byte1 < accept.lo || accept.hi < byte1) {
        return [RuneError, 1];
    }

    if (2 === size) {
        return [(byte0 & mask2) << 6 | byte1 & maskx, 2];
    }

    const byte2: byte = bytes[2];
    if (byte2 < locb || hicb < byte2) {
        return [RuneError, 1];
    }

    if (3 === size) {
        return [(byte0 & mask3) << 12 | (byte1 & maskx) << 6 | byte2 & maskx, 3];
    }

    const byte3: byte = bytes[3];
    if (byte3 < locb || hicb < byte3) {
        return [RuneError, 1];
    }

    return [(byte0 & mask4) << 18 | (byte1 & maskx) << 12 | (byte2 & maskx) << 6 | byte3 & maskx, 4];
}

/**
 * 编码codepoint到bytes，返回写字节数
 */
export function EncodeRune(bytes: Uint8Array, codepoint: rune): int {
    if (rune1Max >= codepoint) {
        bytes[0] = codepoint;
        return 1;
    }

    if (rune2Max >= codepoint) {
        bytes[0] = t2 | codepoint >> 6;
        bytes[1] = tx | codepoint & maskx;
        return 2;
    }

    if (MaxRune < codepoint || (surrogateMin <= codepoint && codepoint <= surrogateMax)) {
        codepoint = RuneError;
    }

    if (rune3Max >= codepoint) {
        bytes[0] = t3 | codepoint >> 12;
        bytes[1] = tx | (codepoint >> 6) & maskx;
        bytes[2] = tx | codepoint & maskx;
        return 3;
    }

    bytes[0] = t4 | codepoint >> 18;
    bytes[1] = tx | (codepoint >> 12) & maskx;
    bytes[2] = tx | (codepoint >> 6) & maskx;
    bytes[3] = tx | codepoint & maskx;
    return 4;
}
