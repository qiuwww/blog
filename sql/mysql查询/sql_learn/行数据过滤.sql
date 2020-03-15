-- 1. 使用not exists来限定，这里的aa，bb是中间表
SELECT goods_id,goods_name,shop_price FROM (SELECT * FROM goods limit 6) aa
WHERE NOT EXISTS (SELECT * FROM (SELECT * FROM goods limit 5) bb WHERE aa.goods_id=bb.goods_id);

-- 2. 使用rand()函数随机查询一行数据
SELECT goods_id,cat_id,goods_name,RAND() AS random
FROM goods ORDER BY random LIMIT 10;

-- 3. 添加行号
-- 不太明白什么原理的
SELECT (SELECT COUNT(order_id) FROM orderform A
WHERE A.order_id>=B.order_id) 编号,order_id,order_sn,total_amount
FROM orderform B ORDER BY 1;

-- 4. 查询空值
SELECT user_id,email,nickname 
FROM users 
WHERE nickname IS NULL;

-- 5. 空值填充
-- 这里使用ifnull替代isnull，isnull只会得到一个boolean值
SELECT BookName,Writer,ifnull(newbook,0) AS newbook
FROM bookinfo_zerobasis;

-- 6. NULLIF用来处理，如果是指定的值的话，就转为null
SELECT user_id,email,NULLIF(nickname,'Andy') AS nickname 
FROM users;


