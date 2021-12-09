import * as React from "react";

function render(props: any) {
  return React.createElement(
    "div",
    {
      ...props,
    },
    props?.children
  );
}

export { render };
