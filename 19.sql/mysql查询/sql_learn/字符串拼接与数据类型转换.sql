-- 这里字符串拼接需要使用concat
-- 这里的convert的参数与参考书上的是反的

SELECT goods_id AS 商品ID,goods_name AS 商品名称,
concat(convert(sales_sum, char(2)),'个') AS 销售数量,
concat(convert(shop_price, char(8)),'元') AS 商场价格
FROM goods; 
