import Vue from "vue";

let $v = new Vue();
const excelMaxSize = 102400;

export const imageFormatIsCorrect = (
  file = {},
  acceptType,
  errorInfo,
  imageMaxSize
) => {
  let isCorrectSuffix = false;
  acceptType.forEach(item => {
    file.type === `image/${item}` && (isCorrectSuffix = true);
  });
  const isOverstep = imageMaxSize - file.size / 1024 > 1;

  if (!isCorrectSuffix) {
    $v.$notify.error({
      title: "错误",
      message: `上传图片只能是${errorInfo}格式！`
    });
  }

  if (!isOverstep) {
    setTimeout(() => {
      $v.$notify.error({
        title: "错误",
        message: `上传图片大小不能超过 ${imageMaxSize}kb！`
      });
    }, 200);
  }
  return isCorrectSuffix && isOverstep;
};

export const excelImportFormatIsCorrect = ({
  name,
  size
}) => {
  const xlsLen = name.length - 3;
  const xlsxLen = name.length - 4;
  const xlsSuffix = name.substr(xlsLen, name.length);
  const xlsxSuffix = name.substr(xlsxLen, name.length);

  const isCorrectSuffix = xlsxSuffix === "xlsx" || xlsSuffix === "xls";
  const isOverstep = excelMaxSize - size / 1024 > 1;

  if (!isCorrectSuffix) {
    $v.$notify.error({
      title: "错误",
      message: "请使用 .xlsx 或 xls 为后缀命的文件！"
    });
  }

  if (!isOverstep) {
    setTimeout(() => {
      $v.$notify.error({
        title: "错误",
        message: `上传文件大小不能超过 ${excelMaxSize}kb！`
      });
    }, 200);
  }
  return isCorrectSuffix && isOverstep;
};
