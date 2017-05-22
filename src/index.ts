import { main } from "./main";
main({canvas_w: 1440, canvas_h: 2560});


import { simpleFetch } from "./fetcher";
import { Obj } from "./parse/obj";

(async () => {
    let raw = await simpleFetch("cube.obj");
    let obj = new Obj();
    obj.parse(raw);
})();
