System.register(["react", "./lib.js"], function (_export, _context) {
  var react;
  var lib;

  return {
    setters: [
      (m) => {
        react = m;
      },
      (m) => {
        lib = m;
      },
    ],
    execute() {
      console.log(react);
      setInterval(() => {
        console.log(lib.a);
      }, 1000);
    },
  };
});
