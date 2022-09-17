const div = document.createElement("div");
const span = document.createElement("div");

div.appendChild(span);

div.addEventListener(
  "mouseenter",
  () => {
    console.log("div capture listener");
  },
  { capture: true }
);

div.addEventListener("mouseenter", () => {
  console.log("div listener");
});

span.addEventListener("mouseenter", () => {
  console.log("span listener");
});

span.dispatchEvent(
  new MouseEvent("mouseenter", {
    // bubbles: true,
  })
);
