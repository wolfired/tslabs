import { Args, Main } from "./main";
Args.server = "ws://localhost:9999/idiot";
// Main();


// Check for wasm support.
if (!('WebAssembly' in window)) {
  alert('you need a browser with wasm support enabled :(');
}
// Loads a WebAssembly dynamic library, returns a promise.
// imports is an optional imports object
function loadWebAssembly(filename: string, imports?: WebAssembly.ImportObject) {
  // Fetch the file and compile it
  return fetch(filename)
    .then(response => response.arrayBuffer())
    .then(buffer => WebAssembly.compile(buffer))
    .then(module => {
      // Create the imports for the module, including the
      // standard dynamic library imports
      imports = imports || {};
      imports.env = imports.env || {};
      imports.env.memoryBase = imports.env.memoryBase || 0;
      imports.env.tableBase = imports.env.tableBase || 0;
      if (!imports.env.memory) {
        imports.env.memory = new WebAssembly.Memory({ initial: 256 });
      }
      if (!imports.env.table) {
        imports.env.table = new WebAssembly.Table({ initial: 0, element: 'anyfunc' });
      }
      // Create the instance.
      return new WebAssembly.Instance(module, imports);
    });
}
// Main part of this example, loads the module and uses it.
loadWebAssembly('math.wasm')
  .then(instance => {
    var exports = instance.exports; // the exports of that instance
    var max = exports._max; // the "max" function (note "_" prefix)
    console.log(max(9, 2));
  }
  );
