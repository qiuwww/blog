// eval操作.js


// 比较

eval("{a:1,b:3,c:[],d:{hh:'sdfdf'}}")

-> error: VM228:1 Uncaught SyntaxError: Unexpected identifier
    at <anonymous>:1:42
Ï
eval("(" + "{a:1,b:3,c:[],d:{hh:'sdfdf'}}" + ")")

-> {a: 1, b: 3, c: Array(0), d: {…}}