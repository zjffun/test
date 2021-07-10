(() => {
  const zelSelector = "[zel]";
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
        res = res();
      } else {
        try {
          res = eval(zelFnEl.textContent)();
        } catch (error) {
          console.error(error);
        }
      }
    }

    const attributes = res?.attr;

    if (attributes) {
      for (const attribute of Object.entries(attributes)) {
        attribute[1].subscribe((val) => {
          el.setAttribute(attribute[0], val);
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

  document.addEventListener("DOMContentLoaded", () => {
    const zelEL = Array.from(document.querySelectorAll(zelSelector));
    zelEL.forEach((el) => {
      initZel(el);
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
