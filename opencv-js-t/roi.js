const Jimp = require("jimp");
const cv = require("./opencv.js");

async function imread(path) {
  const img = await Jimp.read(path);
  return cv.matFromImageData(img.bitmap);
}

function imshow(path, mat) {
  new Jimp({
    width: mat.cols,
    height: mat.rows,
    data: Buffer.from(mat.data),
  }).write(path);
}

async function main() {
  let src = await imread("./img.jpg");
  let temp = new cv.Mat();
  let dst = new cv.Mat();
  let rect = new cv.Rect(0, 0, 200, 200);
  temp = src.roi(rect);
  // !!! doesn't why must *copyTo* a new mat before Jimp write.
  // if doesn't using copyTo the out put will distorted
  // See https://stackoverflow.com/questions/19700387/opencv-why-is-the-roi-mat-distorted/19715586#19715586
  temp.copyTo(dst);
  imshow("./dist/roi.png", dst);
  temp.delete();
  src.delete();
  dst.delete();
}

cv.onRuntimeInitialized = () => {
  main();
};
