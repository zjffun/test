import serialize from "serialize-javascript";

const res = serialize({
  foo: "bar</script>",
});

console.log(res);

debugger;
