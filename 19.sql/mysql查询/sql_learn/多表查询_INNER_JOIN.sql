-- 多表查询，这里[INNER] JOIN将goods和goods_type进行内部连接，goods_id,goods_name,name是要查询的列，goods.goods_type=goods_type.id是限制条件
SELECT goods_id,goods_name,name
FROM goods
INNER JOIN goods_type
ON goods.goods_type=goods_type.id;
