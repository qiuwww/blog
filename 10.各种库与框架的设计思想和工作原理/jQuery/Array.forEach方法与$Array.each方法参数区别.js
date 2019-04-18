

/**
 * 主要区别二者的前两个参数正好相反；forEach用的更多一些，第一个参数是value；
 * 在each方法中，可以使用this取得当前的元素；
 */


/**
 * Array.forEach方法
 */

let arr = [1,3,5,8,10];

arr.forEach((v,i,ele) => {
    console.log("v", v);
    console.log("i", i);
    console.log("ele", ele);
})





/**
 * 使用for...loop来遍历
 */
for(let i = arr.length; i > 0; i++){
    console.log(i);
    console.log(arr[i]);
}

/**
 * $Array.each方法
 */

$("div").each((index, value) => {
    console.log("index", index);
    console.log("value", value);
    console.log(this);// 这里的this指向
});

$("div").each(function (index, value){
    console.log("index", index);
    console.log("value", value);
    console.log(this);// 这里的this指向value
});