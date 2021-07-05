class WHTMLElement extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    this.defaultValue = {};
    this.defaultData = {};
    this.keyAttrMap = new Map();
    this.events = {};
    this.el;

    try {
      this.defaultData = eval(
        this.querySelector("template[defaultData]").content.children[0]
          .textContent
      );
      this.events = eval(
        this.querySelector("template[events]").content.children[0].textContent
      );
    } catch (error) {
      console.error(error);
    }
  }

  initDom(el) {
    const that = this;
    this.el = el;

    [...this.attributes].forEach(({ name, value }) => {
      this.defaultValue[name] = value;

      if (name.startsWith(":")) {
        const tname = name.substring(1);

        this.wSubscribe(tname, value);
        this.wSetAttribute(tname, this.defaultData[value]);

        return;
      }
      if (name.startsWith("@")) {
        const fn = this.wGetEventListener(value);
        el.addEventListener(name.substring(1), (e) => {
          fn.call(that, e);
        });
        return;
      }

      el.setAttribute(name, value);
    });

    [...this.childNodes].forEach((el1) => {
      el.appendChild(el1);
    });

    [...this.attributes].forEach(({ name, value }) => {
      if (name.startsWith(":")) {
        return;
      }
      if (name.startsWith("@")) {
        return;
      }
      this.removeAttribute(name);
    });

    this.parentElement.insertBefore(el, this);
  }

  wGetEventListener(key) {
    return this.events[key];
  }

  wSetData(key, data) {
    const attr = this.keyAttrMap.get(key);
    this.wSetAttribute(attr, data);
  }

  wSubscribe(attr, key) {
    this.keyAttrMap.set(key, attr);
  }

  wSetAttribute(attr, value) {
    if (attr === "class") {
      this.el.setAttribute("class", this.defaultValue.class + " " + value);
      return;
    } else if (attr === "style") {
      this.el.setAttribute("style", this.defaultValue.style + " " + value);
      return;
    }

    if (!value) {
      this.el.removeAttribute(attr);
    } else {
      this.el.setAttribute(attr, value);
    }
  }
}
