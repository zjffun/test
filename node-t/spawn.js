const { spawn } = require("child_process");
const { Duplex, Readable, Writable } = require("stream");

const author = "zhangjufeng";
const dir = "/Users/zjf/gh/test/node-t/temp";

const ls = spawn("find", [dir, "-type", "d", "-maxdepth", "1"]);

function each(readableStream) {
  readableStream.on("data", (data) => {
    console.log(data.toString());
    data
      .toString()
      .split("\n")
      .forEach((line) => {
        try {
          const gitlog = spawn(
            "git",
            ["log", "--shortstat", "--author", author],
            { cwd: line }
          );

          const grep = spawn("grep", ["-E", "fil(e|es) changed"]);

          gitlog.stdout.pipe(grep.stdin);

          const awk = spawn("awk", [
            `{files+=$1; inserted+=$4; deleted+=$6} END {print "files changed: ", files, "lines inserted: ", inserted, "lines deleted: ", deleted }`,
          ]);

          grep.stdout.pipe(awk.stdin);

          awk.stdout.pipe(process.stdout);
        } catch (error) {
          console.error(error);
        }
      });
  });
}

each(ls.stdout);
