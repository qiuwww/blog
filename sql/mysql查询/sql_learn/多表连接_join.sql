-- 1. 等值连接，不使用join实现
SELECT goods_id,goods_name,name 
FROM goods,goods_type 
WHERE goods.goods_type=goods_type.id;

-- 2. 使用join 连接两个表，并添加限制条件on，连接操作一定要添加限制子句
SELECT goods_id,goods_name,name
FROM goods inner join goods_type
-- 这里注意，连接条件使用特殊的on子句，而不是where子句
on goods.goods_type=goods_type.id;

-- 3. inner join 默认表示join，内链接，也就是求交集
SELECT a.id,a.name,COUNT(b.cat_id) num
FROM goods_category a INNER JOIN goods b
ON a.id=b.cat_id GROUP BY a.id,a.name;

-- 4. 左连接，包含交集及左表不满足条件的部分
SELECT goods_id,goods_name,name
FROM goods LEFT JOIN goods_type
ON goods.goods_type=goods_type.id ORDER BY goods_id DESC;

-- 5. 联合查询 union，合并返回的结果
SELECT BookName,Writer,Price
FROM bookinfo
WHERE Price = 59.80
UNION
SELECT BookName,Writer,Price
FROM bookinfo_zerobasis
WHERE Price = 69.80;