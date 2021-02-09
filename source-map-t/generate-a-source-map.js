const { SourceNode } = require("source-map");
const { parse } = require("acorn");

function compile(ast) {
  switch (ast.type) {
    case "BinaryExpression":
      return new SourceNode(
        ast.loc.start.line,
        ast.loc.start.column,
        ast.loc.source,
        [compile(ast.left), " + ", compile(ast.right)]
      );
    case "Literal":
      return new SourceNode(
        ast.loc.start.line,
        ast.loc.start.column,
        ast.loc.source,
        String(ast.value)
      );
    // ...
    default:
      throw new Error("Bad AST");
  }
}

var ast = parse("40 + 2", {
  locations: true,
  ecmaVersion: 6,
  sourceFile: "add.js",
});

var sm = compile(ast.body[0].expression).toStringWithSourceMap({
  file: "add.js",
});

console.log(sm);

console.log(sm.map.toString());
