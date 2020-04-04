-- 视图是一种虚拟表，可以简化操作，可以看作是一系列操作的结果的中间存储过程，中间表
-- 视图: 存储的查询语句, 当调用的时候, 产生结果集, 视图充当的是虚拟表的角色。

-- 2. 删除视图，使用drop
DROP VIEW if exists GoodsPrice;

-- 1. 创建一个视图，并使用
CREATE VIEW GoodsPrice
AS
SELECT goods_id,goods_name,shop_price
FROM goods;

SELECT * FROM GoodsPrice;


-- 3. 使用视图，组合查询，简化操作，就相当于自定义函数
DROP VIEW if exists GoodsBrandType;
CREATE VIEW GoodsBrandType
AS
SELECT goods.goods_id,goods.goods_name,brand.name brand,goods_type.name type
FROM goods,brand,goods_type 
WHERE goods.brand_id=brand.id AND goods.goods_type=goods_type.id;

SELECT * FROM GoodsBrandType
WHERE type = '电视';

