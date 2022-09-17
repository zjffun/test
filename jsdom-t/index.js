const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const virtualConsole = new jsdom.VirtualConsole();

const dom = new JSDOM(
  `
<body>
<script>

const div = document.createElement("div");
const span = document.createElement("span");

div.appendChild(span);

div.addEventListener(
  "mouseenter",
  () => {
	document.body.append("div capture listener");
  },
  { capture: true }
);

div.addEventListener("mouseenter", () => {
	document.body.append("div listener");
});

span.addEventListener("mouseenter", () => {
	document.body.append("span listener");
});

span.dispatchEvent(new MouseEvent("mouseenter", {bubbles: false}));
</script>
</body>
`,
  { runScripts: "dangerously", virtualConsole }
);

virtualConsole.on("log", (e) => {
  console.log(e);
});

console.log(dom.window.document.body.innerHTML);
