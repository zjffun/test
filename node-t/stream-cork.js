const stream = process.stdout;

stream.cork();
stream.write("some ");
stream.cork();
stream.write("data ");
process.nextTick(() => {
  stream.uncork();
  // The data will not be flushed until uncork() is called a second time.
  stream.uncork();
});
