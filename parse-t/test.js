const { parseFragment } = require("parse5");

const str = `
const user = {
  name: "Hedy Lamarr",
  imageUrl: "https://i.imgur.com/yXOvdOSs.jpg",
  imageSize: 90,
};

export default function Profile() {
  return (
    <>
      <h1>
        {user.name}
        <span>test</span>
      </h1>
      <img
        className="avatar"
        src={user.imageUrl}
        alt={"Photo of " + user.name}
        style={{
          width: user.imageSize,
          height: user.imageSize,
        }}
      />
    </>
  );
}
`;

function addSourceCodeLocation({ source, filePath, tagNames }) {
  const ast = parseFragment(source, {
    sourceCodeLocationInfo: true,
  });

  const allNodes = [ast];
  let nodeIndex = 0;
  while (allNodes.length > nodeIndex) {
    allNodes[nodeIndex]?.childNodes?.forEach?.((node) => {
      allNodes.push(node);
    });

    nodeIndex++;
  }

  const sortedNodes = allNodes
    .filter((node) => tagNames.includes(node?.nodeName))
    .sort(
      (a, b) =>
        b.sourceCodeLocation.startOffset - a.sourceCodeLocation.startOffset
    );

  let result = str;

  sortedNodes.forEach((node) => {
    const { startOffset, startLine, startCol } = node.sourceCodeLocation;
    const sourceCodeLocation = ` data-source-code-location="${filePath}:${startLine}:${startCol}" `;
    const insertPos = startOffset + node.nodeName.length + 1;
    result =
      result.substring(0, insertPos) +
      sourceCodeLocation +
      result.substring(insertPos);
  });

  return result;
}

const res = addSourceCodeLocation({
  source: str,
  filePath: "test.js",
  tagNames: ["h1", "img", "span"],
});

console.log("test.js:64", res);
