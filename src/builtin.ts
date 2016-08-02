type bool = boolean;

type int8 = number;
type int16 = number;
type int32 = number;
type int64 = number;

type int = int32;
type rune = int32;

type uint8 = number;
type uint16 = number;
type uint32 = number;
type uint64 = number;

type byte = uint8;
type uint = uint32;

type float32 = number;
type float64 = number;

interface error {
    Error(): string;
}