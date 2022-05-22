import { diffChars, diffLines } from "diff";
let strOld = `test1
test2
test21
test3
test4
`;

let strNew = `test5
test2
test21
test4
test6 test7`;

const diffLinesResult = diffLines(strOld, strNew, {
  //   newlineIsToken: true,
});

const diffCharsResult = diffChars(strOld, strNew);

console.log(diffLinesResult, diffCharsResult);

debugger;
