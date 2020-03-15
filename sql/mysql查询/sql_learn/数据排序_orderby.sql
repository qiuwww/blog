-- 1. 一般排序，按照别名
SELECT goods_id 商品编号,goods_name 商品名称,sales_sum 商品销量 
FROM goods 
ORDER BY 商品销量 DESC;

-- 2. 多列排序，区分优先级
SELECT goods_id,goods_name,shop_price
FROM goods
ORDER BY shop_price DESC,goods_name ASC;


-- 另有按照汉字排序、笔画排序、拼音排序的方法
