(() => {
  const zelSelector = "[zel]";
  const zelComponentSelector = "[zel-component]";
  const baseUrl = "http://127.0.0.1:5500/";

  async function initZel(zelEl) {
    let res = {};
    const zelFnEl = zelEl.content.children[0];
    const el = zelEl.parentElement;

    if (zelFnEl) {
      if (zelFnEl.type === "module") {
        const esm = ({ raw }, ...vals) => {
          const newVals = vals.map((v) =>
            v.replace('from "./', `from "${baseUrl}`)
          );

          return URL.createObjectURL(
            new Blob([String.raw({ raw }, ...newVals)], {
              type: "text/javascript",
            })
          );
        };

        res = (await import(esm`${zelFnEl.textContent}`)).default;
        res = res({ el });
      } else {
        try {
          res = eval(zelFnEl.textContent)({ el });
        } catch (error) {
          console.error(error);
        }
      }
    }

    const attributes = res?.attr;

    if (attributes) {
      for (const attribute of Object.entries(attributes)) {
        attribute[1].subscribe((val) => {
          if (!val) {
            el.removeAttribute(attribute[0]);
          } else {
            el.setAttribute(attribute[0], val);
          }
        });
      }
    }

    const events = res?.event;

    if (events) {
      for (const event of Object.entries(events)) {
        el.addEventListener(event[0], event[1]);
      }
    }
  }

  async function initZelComponent(zelComponentEl) {
    const url = zelComponentEl.getAttribute("zel-component");
    const content = await fetch(url).then((d) => d.text());
    const divEl = document.createElement("div");
    divEl.innerHTML = content;
    const fragmentEl = document.createDocumentFragment();
    fragmentEl.append(...divEl.childNodes);

    // init zel
    const zelEl = Array.from(fragmentEl.querySelectorAll(zelSelector));
    zelEl.forEach((el) => {
      initZel(el);
    });

    // init comp
    const zelComponentEls = Array.from(
      fragmentEl.querySelectorAll(zelComponentSelector)
    );
    zelComponentEls.forEach((el) => {
      initZelComponent(el);
    });

    // insert
    zelComponentEl.parentElement.insertBefore(fragmentEl, zelComponentEl);
  }

  document.addEventListener("DOMContentLoaded", () => {
    const zelEl = Array.from(document.querySelectorAll(zelSelector));
    zelEl.forEach((el) => {
      initZel(el);
    });

    const zelComponentEl = Array.from(
      document.querySelectorAll(zelComponentSelector)
    );
    zelComponentEl.forEach((el) => {
      initZelComponent(el);
    });
  });

  const zel = {
    r(initData) {
      const sub = [];

      const res = {
        val: initData,
        next(d) {
          sub.forEach((s) => s(d));
          res.val = d;
        },
        subscribe(fn) {
          sub.push(fn);
          fn(initData);
        },
      };

      return res;
    },
  };

  window.zel = zel;
})();
