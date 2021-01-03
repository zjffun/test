const Jimp = require("jimp");
const cv = require("./opencv.js");

async function imread(path) {
  const img = await Jimp.read(path);
  return cv.matFromImageData(img.bitmap);
}

function imshow(path, mat) {
  if (mat.channels() === 1) {
    mat = mat.clone();
    cv.cvtColor(mat, mat, cv.COLOR_GRAY2RGBA, 0);
    for (let i = 0; i < mat.data.length; i++) {
      // 不然看不出差异
      if (mat.data[i] === 1) {
        mat.data[i] = 255;
      }
    }
  }

  new Jimp({
    width: mat.cols,
    height: mat.rows,
    data: Buffer.from(mat.data),
  }).write(path);
}

async function drawRect(input, maxPoint, point) {
  input = input.clone();
  let color = new cv.Scalar(255, 0, 0, 255);

  await cv.rectangle(input, maxPoint, point, color, 2, cv.LINE_8, 0);
  return input;
}

async function histShow(hist, name = "hist") {
  let height = 255;
  let mask = new cv.Mat();
  let color = new cv.Scalar(255, 255, 255);
  let scale = 2;
  let max = height;

  let dst = new cv.Mat.zeros(height, hist.data.length * scale, cv.CV_8UC3);
  // draw histogram
  for (let i = 0; i < hist.data.length; i++) {
    let binVal = (hist.data[i] * height) / max;
    let point1 = new cv.Point(i * scale, height - 1);
    let point2 = new cv.Point((i + 1) * scale - 1, height - binVal);
    await cv.rectangle(dst, point1, point2, color, cv.FILLED);
  }
  imshow(`./dist/${name}.png`, dst);
  dst.delete();
  mask.delete();
}

module.exports = {
  imread,
  imshow,
  drawRect,
  histShow,
};
