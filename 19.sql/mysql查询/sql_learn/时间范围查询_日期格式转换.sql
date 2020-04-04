-- INTime是表的字段
-- 时间格式这里遵循的是YYYY-MM-DD格式的
SELECT ISBN,bookname,INTime AS 数据录入时间
FROM bookinfo_zerobasis
WHERE INTime BETWEEN '2017-12-01' AND '2018-12-01';

--  借助CURDATE()和DATE_SUB()
-- INTERVAL，表示间隔，跟1，就表示加1，也就是前1(day,month,year)，包括当前
SELECT ISBN,BookName,INTime 数据录入时间 FROM bookinfo_zerobasis
WHERE INTime
BETWEEN
-- DATE_SUB(CURDATE(),INTERVAL-1 DAY)
date_sub('2018-01-24',interval 1 day)
AND
CURDATE();

-- 查询明日图书表中所有图书信息
SELECT ISBN,bookname,writer,price,intime
FROM bookinfo
ORDER BY ISBN;
-- 把长日期格式数据转化为短日期格式数据，一般的转换convert
SELECT ISBN,bookname,

-- date_format('2008-08-08 22:23:01', '%Y%m%d%H%i%s');
DATE_FORMAT(intime, '%Y-%m-%d %H:%i:%s') AS 数据录入日期
FROM bookinfo
ORDER BY ISBN;

-- 将日期格式中的“-”转化为“/”
SELECT
	ISBN,
	bookname,
	DATE_FORMAT(CURDATE(), '%Y-%m-%d %H:%i:%s') AS create_date,
	-- convert(intime, char(10)) AS 数据录入日期
	REPLACE(convert(intime, char(10)), '-', '/')
AS 数据录入日期
FROM bookinfo
ORDER BY ISBN;

-- 6.计算日期差值
SELECT 书号,书名,
convert(出版日期,char(10)) 出版日期,
convert(下一次出版日期,char(10)) 下一次出版日期,
-- 这里做减法，前一次减后一次
DATEDIFF(下一次出版日期, 出版日期) 两次出版相差的天数
FROM bookpub;

-- 7.简洁方法调用
SELECT BookName,Type,pDate
FROM bookinfo
WHERE
MONTH(pDate)=10
AND YEAR(pDate)=2017
AND Type = '零基础系列';



