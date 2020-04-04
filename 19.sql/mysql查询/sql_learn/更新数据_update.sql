
-- 1. 更新cate_name列，然后限制条件是name='台电/Teclast'
-- 如果不添加限制条件就是更新table的所有行
-- 这里更新单行的两列
UPDATE brand
SET cat_name = '手机、数码、配件', url = 'url'
WHERE name = '台电/Teclast';

SELECT * FROM brand 
WHERE name = '台电/Teclast';

-- 2. 根据外表来更新数据
UPDATE goods
SET store_count = store_count + 1000 
WHERE cat_id = (SELECT id FROM goods_category WHERE name = '平板电脑');

SELECT goods_id,goods_name,store_count
FROM goods
WHERE cat_id = (SELECT id FROM goods_category WHERE name = '平板电脑'); 
