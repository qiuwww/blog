-- 1. 使用in操作符过滤数据
SELECT name,cat_name 
FROM brand 
WHERE name IN ('OPPO','维维','湾仔码头','华硕/ASUS');

-- 2. 列查询
SELECT goods_name,market_price,shop_price 
FROM goods 
WHERE 3899 IN (market_price,shop_price);

-- 3. not in
-- mysql中使用limit替代top, 不能用top
-- 这里limit不能用在子句
-- 这里通过添加一层，生成中间表的方式，绕过这个问题
SELECT order_id,order_sn,total_amount
FROM orderform
WHERE order_id in (select m.order_id from (SELECT * FROM orderform limit 8) as m);

-- 4. 骚操作
select m.order_id from (SELECT * FROM orderform limit 8) as m;