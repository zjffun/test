class WComp extends WHTMLElement {
  constructor() {
    super();

    const el = document.createElement(this.getAttribute("name"));

    this.initDom(el);
  }
}

customElements.define("w-comp", WComp);

class WData extends WHTMLElement {
  constructor() {
    super();
    let data = {};
    let context = Object.create(WHTMLElement.wcontext);
    try {
      data = eval(
        this.querySelector("template[data]").content.children[0].textContent
      );
    } catch (error) {
      console.error(error);
    }

    Object.assign(context, data);
    WHTMLElement.wcontext = context;
  }
}

customElements.define("w-data", WData);

class WButton extends WHTMLElement {
  constructor() {
    super();

    const el = document.createElement("button");

    this.initDom(el);
  }
}

customElements.define("w-button", WButton);

class WDiv extends WHTMLElement {
  constructor() {
    super();

    const divEl = document.createElement("div");

    this.initDom(divEl);
  }
}

customElements.define("w-div", WDiv);

class WImage extends WHTMLElement {
  constructor() {
    super();
    var img1 = document.createElement("img");

    this.initDom(img1);
  }
}

customElements.define("w-img", WImage);

class WTable extends WHTMLElement {
  constructor() {
    super();
    var el = document.createElement("table");

    this.initDom(el);
  }
}
class WTr extends WHTMLElement {
  constructor() {
    super();
    var el = document.createElement("tr");

    this.initDom(el);
  }
}
class WTd extends WHTMLElement {
  constructor() {
    super();
    var el = document.createElement("td");

    this.initDom(el);
  }
}

customElements.define("w-table", WTable);
customElements.define("w-tr", WTr);
customElements.define("w-td", WTd);
