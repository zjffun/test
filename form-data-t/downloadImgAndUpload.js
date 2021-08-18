const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

if (!fs.existsSync("dist")) {
  fs.mkdirSync("dist");
}

async function downloadImgAndUpload(url) {
  // text
  const file1 = (await axios.get(url)).data;

  const params = {
    others: "foo",
  };

  const formData1 = new FormData();
  // formData1.append("imageFile", file1);
  formData1.append("imageFile", file1, {
    filename: "unicycle.jpg",
    contentType: "image/jpeg",
  });

  Object.entries(params).forEach(([k, v]) => {
    formData1.append(k, v);
  });

  const wstream1 = fs.createWriteStream("./dist/test1.txt");
  formData1.pipe(wstream1);

  // stream
  const file2 = (await axios.get(url, { responseType: "stream" })).data;
  const formData2 = new FormData();
  formData2.append("imageFile", file2);

  Object.entries(params).forEach(([k, v]) => {
    formData2.append(k, v);
  });

  const wstream2 = fs.createWriteStream("./dist/test2.txt");
  formData2.pipe(wstream2);
}

downloadImgAndUpload(
  "http://www.baidu.com/img/PCjing_5e539553b5304b9f43deb8a0fc918e45.png"
);
