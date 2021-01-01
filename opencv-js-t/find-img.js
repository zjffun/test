const Jimp = require("jimp");
const cv = require("./opencv.js");

function drawImg(img, name) {
  new Jimp({
    width: img.cols,
    height: img.rows,
    data: Buffer.from(img.data),
  }).write(name);
}

async function main() {
  const mask = new cv.Mat();
  // load local image file with jimp. It supports jpg, png, bmp, tiff and gif:
  var jimpInput = await Jimp.read("./img.jpg");
  var jimpTemplate = await Jimp.read("./img2.jpg");
  // `jimpImage.bitmap` property has the decoded ImageData that we can use to create a cv:Mat
  var input = cv.matFromImageData(jimpInput.bitmap);
  var template = cv.matFromImageData(jimpTemplate.bitmap);

  let matchResultMat = new cv.Mat();
  cv.matchTemplate(input, template, matchResultMat, cv.TM_CCOEFF_NORMED, mask);
  let result = cv.minMaxLoc(matchResultMat, mask);
  let maxPoint = result.maxLoc;
  let color = new cv.Scalar(255, 0, 0, 255);
  let point = new cv.Point(
    maxPoint.x + template.cols,
    maxPoint.y + template.rows
  );

  // cv.rectangle(input, maxPoint, point, color, 2, cv.LINE_8, 0);

  drawImg(input, "./dist/output.png");

  let rect = new cv.Rect(maxPoint.x, maxPoint.y, template.cols, template.rows);

  let inputCrop = input.roi(rect);

  drawImg(inputCrop, "./dist/input_crop.png");

  let histCrop = new cv.Mat();
  let histTemplate = new cv.Mat();
  let cropMatVec = new cv.MatVector();
  let templateMatVec = new cv.MatVector();
  cropMatVec.push_back(inputCrop);
  templateMatVec.push_back(template);

  cv.calcHist(
    cropMatVec,
    [0, 1, 2],
    mask,
    histCrop,
    [8, 8, 8],
    [0, 256, 0, 256, 0, 256],
    false
  );

  cv.calcHist(
    templateMatVec,
    [0, 1, 2],
    mask,
    histTemplate,
    [8, 8, 8],
    [0, 256, 0, 256, 0, 256],
    false
  );

  let colorHist = cv.compareHist(histCrop, histTemplate, cv.HISTCMP_CORREL);

  if (colorHist > 0.9 && result.maxVal > 0.9) {
    // find
    return true;
  }
}

cv.onRuntimeInitialized = () => {
  main();
};
