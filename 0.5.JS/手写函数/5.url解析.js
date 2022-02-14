/**
 * @description 解析url
 */

function parseParam(url) {
  const execRes = /^(https?):\/\/(.+)(#[^?]+)\?(.+)$/.exec(url)[1]; // 将 ? 后面的字符串取出来
  const paramsArr = execRes[4].split('&'); // 将字符串以 & 分割后存到数组中
  let paramsObj = {};
  // 将 params 存到对象中
  paramsArr.forEach((param) => {
    if (/=/.test(param)) {
      // 处理有 value 的参数
      let [key, val] = param.split('='); // 分割 key 和 value
      val = decodeURIComponent(val); // 解码
      val = /^\d+$/.test(val) ? parseFloat(val) : val; // 判断是否转为数字

      if (paramsObj.hasOwnProperty(key)) {
        // 如果对象有 key，则添加一个值
        paramsObj[key] = [].concat(paramsObj[key], val);
      } else {
        // 如果对象没有这个 key，创建 key 并设置值
        paramsObj[key] = val;
      }
    } else {
      // 处理没有 value 的参数
      paramsObj[param] = true;
    }
  });

  return { ...paramsObj, protocol: execRes[1], hash: execRes[4] };
}

const url =
  'https://lanhuapp.com/web/#/item/project/detailDetach?pid=47a37142-99aa-4c7b-8e55-4e37b9477ff8&image_id=44c2a89d-35bd-447f-a2c1-3bcfc6b89909&project_id=47a37142-99aa-4c7b-8e55-4e37b9477ff8&fromEditor=true';
console.log(url, parseParam(url));
