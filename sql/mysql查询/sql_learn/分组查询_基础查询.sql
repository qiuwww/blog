-- 通用查询语句，AS，表示显示新的列表名称，这里的如果添加直接输出的列，就会报错，但是输出生成的列是不会有问题的
SELECT cat_id AS 商品种类id,COUNT(*) AS 数量
FROM goods
GROUP BY cat_id;

-- -- 这里会报错
-- SELECT goods_name,cat_id AS 商品种类id,COUNT(*) AS 数量
-- FROM goods
-- GROUP BY cat_id;

-- 如果需要显示更多的列，需要使用聚合函数
SELECT cat_id AS 商品种类id, MAX(cost_price) 最高成本价, COUNT(*) AS 个数
FROM goods
GROUP BY cat_id
ORDER BY MAX(cost_price) DESC;