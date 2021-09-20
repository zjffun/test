System.register([], (_export, _context) => {
  var m = {};
  m.a = 0;
  setInterval(() => {
    m.a++;
  }, 1000);

  _export({ a });

  return {
    execute() {
      console.log(a);
    },
  };
});
