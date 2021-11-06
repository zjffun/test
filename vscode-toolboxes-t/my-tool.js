function getOutput(toolId) {
  return (input, options) => {
    try {
      let result;
      switch (toolId) {
        case "split":
          result = JSON.stringify(input.split("|").map((d) => d.trim()));
          break;
        default:
          result = "";
          break;
      }
      return result;
    } catch (error) {
      return error?.toString() || "unknow error";
    }
  };
}

exports.tools = new Proxy(
  {},
  {
    get(target, p) {
      return getOutput(p);
    },
  }
);
