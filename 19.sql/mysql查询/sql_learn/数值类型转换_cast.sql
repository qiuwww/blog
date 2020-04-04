-- mysql使用limit来代替top
-- 这里使用singed代替int
SELECT user_id,email,CAST(total_amount AS signed) AS total_amount
FROM users
limit 6;
