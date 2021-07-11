const fs = require("fs");
const path = require("path");
const parse5 = require("parse5");
const jsdom = require("jsdom");

const thtml = fs.readFileSync(path.join(__dirname, "t.html")).toString();

// parse5.parse(thtml);
const dom = new jsdom.JSDOM(thtml);

const document = dom.window.document;

function initZelComponent(zelComponentEl) {
  const url = zelComponentEl.getAttribute("zel-component");
  const content = fs.readFileSync(path.join(__dirname, url));
  const divEl = document.createElement("div");
  divEl.innerHTML = content;
  const fragmentEl = document.createDocumentFragment();
  fragmentEl.append(...divEl.childNodes);

  // init comp
  const zelComponentEls = Array.from(
    fragmentEl.querySelectorAll("[zel-component]")
  );
  zelComponentEls.forEach((el) => {
    initZelComponent(el);
  });

  // insert
  zelComponentEl.parentElement.insertBefore(fragmentEl, zelComponentEl);
  zelComponentEl.setAttribute("zel-component-loaded", url);
  zelComponentEl.removeAttribute("zel-component");
}

// init comp
const zelComponentEls = Array.from(
  document.querySelectorAll("[zel-component]")
);

zelComponentEls.forEach((el) => {
  initZelComponent(el);
});

fs.writeFileSync(path.join(__dirname, "tt.html"), dom.serialize());
