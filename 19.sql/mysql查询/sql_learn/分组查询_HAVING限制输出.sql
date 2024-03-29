SELECT cat_id, shop_price, COUNT(cat_id) AS 个数
FROM goods
WHERE (store_count < 1000)
GROUP BY cat_id,shop_price
HAVING (shop_price >
          (SELECT AVG(shop_price)
          FROM goods))
ORDER BY shop_price DESC;

SELECT cat_id, shop_price, COUNT(cat_id) AS 个数
FROM goods
WHERE (store_count < 1000)
GROUP BY cat_id,shop_price
-- HAVING (shop_price >
--           (SELECT AVG(shop_price)
--           FROM goods))
ORDER BY shop_price DESC;