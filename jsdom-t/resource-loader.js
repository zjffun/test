const jsdom = require("jsdom");
const { JSDOM } = jsdom;

class CustomResourceLoader extends jsdom.ResourceLoader {
  fetch(url, options) {
    const { origin } = new URL(url);

    if (origin !== "https://example.com") {
      return null;
    }

    // Override the contents of this script to do something unusual.
    if (url === "https://example.com/some-specific-script.js") {
      return Promise.resolve(Buffer.from("window.someGlobal = 5;"));
    }

    return super.fetch(url, options);
  }
}

const dom = new JSDOM(
  `
  <script src="https://example.com/some-specific-script.js"></script>
  <script src="https://example1.com/some-specific-script.js"></script>
`,
  { runScripts: "dangerously", resources: new CustomResourceLoader() }
);
