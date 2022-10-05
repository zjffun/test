import { diffChars, diffLines } from "diff";
let strOld = `- start id1 -
line1
line2
line3
- end id1 -`;

let strNew = `- start id1 -
line1
- end id1 -
line2edit
line3edit
- end id1 edit -`;

// detect test2 change to test3, not remove test2
const diffLinesResult = diffLines(strOld, strNew, {
  // newlineIsToken: true,
});

console.log(diffLinesResult);

debugger;
