// 前端文件下载.js
fetch(
  "https://scarletsky.github.io/2016/07/03/download-file-using-javascript/"
).then(res =>
  res.blob().then(blob => {
    var a = document.createElement("a");
    var url = window.URL.createObjectURL(blob);
    var filename = "myfile.doc";
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  })
);
