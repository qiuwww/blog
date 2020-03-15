select * from goods;

-- limit start,end
-- 这样也可以，先输出*，在输出计算的列
SELECT *,
(market_price - cost_price) 商品盈利
FROM goods
LIMIT 2,5;

-- limit len offset start
SELECT goods_name,
market_price
FROM goods
LIMIT 2 OFFSET 3;