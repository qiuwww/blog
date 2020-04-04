-- 1. 删除多条数据，如果删除一条，就填一个
DELETE FROM brand
WHERE name IN ('台电/Teclast','酷开/Coocaa','海力/horion');

SELECT * FROM brand 
WHERE name IN ('台电/Teclast','酷开/Coocaa','海力/horion');

-- 2. 删除整个表，不添加限制条件或者使用truncate
SELECT * INTO newgoods_type
FROM goods_type;

DELETE FROM newgoods_type;

SELECT * FROM newgoods_type;