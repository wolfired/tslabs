declare type bool = boolean;
declare type int8 = number;
declare type int16 = number;
declare type int32 = number;
declare type int64 = number;
declare type int = int32;
declare type rune = int32;
declare type uint8 = number;
declare type uint16 = number;
declare type uint32 = number;
declare type uint64 = number;
declare type byte = uint8;
declare type uint = uint32;
declare type float32 = number;
declare type float64 = number;

declare namespace WebAssembly {
    type ImportObject = { env?: { memoryBase?: uint, tableBase?: uint, memory?: WebAssembly.Memory, table?: WebAssembly.Table } };

    class Module {
        public constructor(bytes: ArrayBufferView | ArrayBuffer);

        public static exports(moduleObject: Module): Array<{ name: string, kink: string }>;
        public static imports(moduleObject: Module): Array<{ module: string, name: string, kink: string }>;
        public static customSections(moduleObject: Module, sectionName: string): Array<any>;
    }
    class Instance {
        public constructor(moduleObject: Module, importObject?: ImportObject);

        public exports: any;
    }
    class Memory {
        public constructor(memoryDescriptor: { initial: uint32, maximum?: uint32 });
    }
    class Table {
        public constructor(tableDescriptor: { element: "anyfunc", initial: uint32, maximum?: uint32 });
    }
    function validate(bytes: ArrayBufferView | ArrayBuffer): bool;
    function compile(bytes: ArrayBufferView | ArrayBuffer): Promise<Module>;
    type WebAssemblyInstantiatedSource = {
        module: Module;
        instance: Instance;
    };
    function instantiate(bytes: ArrayBufferView | ArrayBuffer, importObject?: ImportObject): Promise<WebAssemblyInstantiatedSource>;
}
