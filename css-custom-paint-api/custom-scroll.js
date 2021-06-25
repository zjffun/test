class CheckerboardPainter {
  // inputProperties returns a list of CSS properties that this paint function gets access to
  static get inputProperties() {
    return ["--scroll-top", "--client-height", "--scroll-height"];
  }

  paint(ctx, geom, properties) {
    // Paint worklet uses CSS Typed OM to model the input values.
    // As of now, they are mostly wrappers around strings,
    // but will be augmented to hold more accessible data over time.
    const scrollTop = parseInt(properties.get("--scroll-top").toString());
    const clientHeight = parseInt(properties.get("--client-height").toString());
    const scrollHeight = parseInt(properties.get("--scroll-height").toString());

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.rect(
      0,
      (scrollTop * clientHeight) / scrollHeight,
      20,
      (clientHeight * clientHeight) / scrollHeight
    );
    ctx.fill();
  }
}

// Register our class under a specific name
registerPaint("custom-scroll", CheckerboardPainter);
