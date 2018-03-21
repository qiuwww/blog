


// 借助mock.js的源码，扩展更多常用的方法，最终丢掉mock是最好的


let randomNum = (min, max) => {
    return Math.floor(min + Math.random() * (max - min));
}

let randomColor = () => {
    return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
}

// 生成一个随机的六位数
let random6digits = () => + Math.random().toFixed(6).slice(-6);


let componentMapModelRegistry = (str) => str.match(/^[a-z][a-z0-9]+|[A-Z][a-z0-9]*/g).join('_').toLowerCase();
