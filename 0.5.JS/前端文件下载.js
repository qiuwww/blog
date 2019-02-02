// 前端文件下载.js

fetch('https://scarletsky.github.io/2016/07/03/download-file-using-javascript/').then(res => res.blob().then(blob => {
    var a = document.createElement('a');
    var url = window.URL.createObjectURL(blob);
    var filename = 'myfile.doc';
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
}))

http://172.20.210.251:81/thsft/iFindService/Realty/land-trade/index?title=%E6%88%BF%E5%9C%B0%E4%BA%A7&type=fdc&sel=database&childSel=land-trade

fetch('http://10.10.17.11:8000/%E5%89%8D%E7%AB%AF%E4%BB%A3%E7%A0%81%E8%A7%84%E8%8C%83/%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91%E8%A7%84%E8%8C%83.html').then(res => res.blob().then(blob => {
    var a = document.createElement('a');
    var url = window.URL.createObjectURL(blob);
    var filename = 'myfile.doc';
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
}))
