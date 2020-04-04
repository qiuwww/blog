-- 1. AVG聚合函数的使用
SELECT user_id,email, CONVERT(birthday,char(10)) birthday,total_amount
FROM users WHERE (birthday BETWEEN '1985-01-01' AND '1990-12-31') 
AND (total_amount > (SELECT AVG(total_amount) FROM users));
