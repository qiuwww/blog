# payload于formData

FormData和Payload是浏览器传输给接口的两种格式，这两种方式浏览器是通过Content-Type来进行区分的(了解Content-Type)，如果是 application/x-www-form-urlencoded的话，则为formdata方式，如果是application/json或multipart/form-data的话，则为 request payload


### 通过ajax 方式上传文件的时候，不要设置 content-type

// xhr.setRequestHeader('Content-Type', 'multipart/form-data');

设置multipart/form-data就会出错 

不设置就会默认生成 multipart/form-data; boundary=----WebKitFormBoundaryUYeZy5WWBOIsKacJ

