// promise.all.js



并行

使用async后，我们上面的例子都是串行的。比如上个list()和count()的例子，我们可以将这个例子用作分页查询数据的场景。

先查询出数据库中总共有多少条记录，然后再根据分页条件查询分页数据，最后返回分页数据以及分页信息。

我们上面的例子count()和list()有个“先后顺序”，即我们先查的总数，然后又查的列表。其实，这两个操作并无先后关联性，我们可以异步的同时进行查询，然后等到所有结果都返回时再拼装数据即可。

let count = ()=>{
    return new Promise((resolve,reject) => {
        setTimeout(()=>{
            resolve(100);
        },500);
    });
}

let list = ()=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve([1,2,3]);
        },500);
    });
}

let getList = async ()=>{
    let result = await Promise.all([count(),list()]);
    return result;
}
console.time('begin');
getList().then(result=> {
    console.timeEnd('begin');  //begin: 505.557ms
    console.log(result);       //[ 100, [ 1, 2, 3 ] ]
}).catch(err=> {
    console.timeEnd('begin');
    console.log(err);
});
我们将count()和list()使用Promise.all()“同时”执行，这里count()和list()可以看作是“并行”执行的，所耗时间将是两个异步操作中耗时最长的耗时。

最后得到的结果是两个操作的结果组成的数组。我们只需要按照顺序取出数组中的值即可。