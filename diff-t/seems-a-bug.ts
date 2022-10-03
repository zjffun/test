import { diffChars, diffLines } from "diff";
let strOld = `test1

test2

test3
test4
`;

let strNew = `test11

test3

test4
`;

// detect test2 change to test3, not remove test2
const diffLinesResult = diffLines(strOld, strNew, {
  // newlineIsToken: true,
});

console.log(diffLinesResult);

debugger;
