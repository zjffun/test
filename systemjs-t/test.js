(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined) module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define(["require", "exports", "react", "antd"], factory);
  }
})(function (require, exports) {
  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.List = exports.Image = exports.Card = void 0;
  const react_1 = require("react");
  const antd = require("antd");
  function Card(...args) {
    return react_1.default.createElement(antd.Card, Object.assign({}, args));
  }
  exports.Card = Card;
  function Image(...args) {
    return react_1.default.createElement(antd.Image, Object.assign({}, args));
  }
  exports.Image = Image;
  function List(...args) {
    return react_1.default.createElement(antd.List, Object.assign({}, args));
  }
  exports.List = List;
});
