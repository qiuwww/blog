/**
 * 比较两个时间点
 */

// 1. 默认应该需要转为Date对象，然后取到距离1970-1-1 00:00:00的毫秒数（Date.parse()），然后比大小；
var date1 = "2018-03-02";
// 这两种格式的时间都可以转为标准的Date对象
var date2 = "2018-03-03";
var date3 = "2018/04/05";

var date_1 = new Date(date1);
var date_2 = new Date(date2);
var date_3 = new Date(date3);

var date_1_millisecond = Date.parse(date1);
var date_2_millisecond = Date.parse(date2);
date_1_millisecond > date_2_millisecond;
// 最终的结果是一个数值，自然可以比较，距离越远越大

// 2. 如果格式一致，统一转为数值型的话，直接就可以对比了, 格式一致的前提下

var date1 = "2018/03/02";
var date2 = "2018/03/03";

var date_1 = date1.replace(/\//g, "");
var date_2 = date2.replace(/\//g, "");
// 隐式转换
date_1 < date_2;

// 当然最好的方式还是1
