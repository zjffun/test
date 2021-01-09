const cv = require("./opencv.js");

const { imread, imshow, drawRect, histShow } = require("./utils");

async function main() {
  const mask = new cv.Mat();
  var input = await imread("./img.jpg");
  var template = await imread("./transparency.png");
  var templateMask = new cv.Mat();
  template.copyTo(templateMask);

  for (let i = 3; i < templateMask.data.length; i += 4) {
    let data = 0;
    if (templateMask.data[i] > 0) {
      data = 255;
    }

    templateMask.data[i] = data; // alpha
    templateMask.data[i - 1] = data;
    templateMask.data[i - 2] = data;
    templateMask.data[i - 3] = data;
  }

  let matchResultMat = new cv.Mat();
  cv.matchTemplate(
    input,
    template,
    matchResultMat,
    cv.TM_CCOEFF_NORMED,
    // !!! mask will chnage to `new Mat()`
    templateMask.clone()
  );

  let result = cv.minMaxLoc(matchResultMat, mask);
  let maxPoint = result.maxLoc;
  let point = new cv.Point(
    maxPoint.x + template.cols,
    maxPoint.y + template.rows
  );

  imshow("./dist/output.png", await drawRect(input, maxPoint, point));

  let rect = new cv.Rect(maxPoint.x, maxPoint.y, template.cols, template.rows);

  let inputCrop = input.roi(rect);
  let temp = new cv.Mat();
  inputCrop.copyTo(temp);
  imshow("./dist/input_crop.png", temp);

  let histCrop = new cv.Mat();
  let histTemplate = new cv.Mat();
  let cropMatVec = new cv.MatVector();
  let templateMatVec = new cv.MatVector();
  let histMask = new cv.Mat();
  cropMatVec.push_back(inputCrop);
  templateMatVec.push_back(template);

  cv.cvtColor(templateMask, histMask, cv.COLOR_RGBA2GRAY, 0);

  cv.calcHist(
    cropMatVec,
    [0, 1, 2],
    histMask,
    histCrop,
    [8, 8, 8],
    [0, 256, 0, 256, 0, 256],
    false
  );

  cv.calcHist(
    templateMatVec,
    [0, 1, 2],
    histMask,
    histTemplate,
    [8, 8, 8],
    [0, 256, 0, 256, 0, 256],
    false
  );

  await histShow(histCrop, "hist1");
  await histShow(histTemplate, "hist2");

  let colorHist = cv.compareHist(histCrop, histTemplate, cv.HISTCMP_CORREL);

  if (colorHist > 0.9 && result.maxVal > 0.9) {
    // find
    return true;
  }
}

cv.onRuntimeInitialized = () => {
  main();
};
