-- #1. 形式1，标准mysql匹配
-- 1. 模糊查询，like，使用%匹配0到多个
SELECT goods_id,goods_name,shop_price 
FROM goods 
WHERE goods_name LIKE '%华为%';

-- 2. 使用_匹配单个字符
SELECT address_id,LTRIM(consignee) AS consignee,address
FROM user_address
-- 支持LTRIM
WHERE LTRIM(consignee) LIKE '___';

-- 3. ESCAPE 后指定的字符后边的通配符当作普通字符，这里也就是_
SELECT user_id,email,CONVERT(birthday, CHAR(10)) AS birthday
FROM users
WHERE email LIKE '%/_%' ESCAPE '/';

-- #2. 使用正则表达式匹配
SELECT id,name,cat_name
FROM brand
-- 这里一直没有正常运行，使用正则表达式匹配
WHERE name LIKE REGEXP '^T';