import { main } from "./main";
// main();


import { simpleFetch } from "./fetcher";
import { Obj } from "./parse/obj";

(async () => {
    let raw = await simpleFetch("cube.obj");
    let obj = new Obj();
    // obj.parse(raw);
})();


import * as utf8 from "./unicode/utf8";

let bytes = new Uint8Array(8);

let rs = [20320, 98, 99];
let offset = 0;
for (let i: int = 0; i < rs.length; ++i) {
    offset += utf8.EncodeRune(new Uint8Array(bytes.buffer, offset), rs[i]);
}

offset = 0
let arr = [];
while (offset < bytes.byteLength) {
    let [cp, n] = utf8.DecodeRune(new Uint8Array(bytes.buffer, offset));
    arr.push(cp);
    offset += n;
}


console.log(String.fromCodePoint(...arr));




