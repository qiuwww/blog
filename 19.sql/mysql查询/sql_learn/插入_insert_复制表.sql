-- 1. 数据插入，INSERT INTO table_name ( field1, field2,...fieldN )
--                         VALUES
--                        ( value1, value2,...valueN );
-- 插入的数据字段完全由field控制

-- 这里没问题，下边的只能是数据有问题
-- insert into tb_name
-- (id, name)
-- values
-- (12, "哈哈哈");

-- 先删除了，不然会报错
DELETE FROM brand
where id >= 347 ;

-- 实在是看不出来为什么的
INSERT INTO brand
-- 这里添加说明filed就会报错，不添加就是正确的
-- 这里的key必须添加``，不然就会报错
(`id`, `name`, `logo`, `describe`, `url`, `sort`, `cat_name`, `parent_cat_id`, `cat_id`, `is_hot`)
VALUES
-- 同时拆入两条
(347, "创维/Skyworth", "/Public/upload/brand/2016/04-01/347586936.jpg", "凝聚健康科技", "www.Skyworth.com", 50, "手机、数码、配件", 1, 1, 0),
(348, "创维/Skyworth", "/Public/upload/brand/2016/04-01/347586936.jpg", "凝聚健康科技", "www.Skyworth.com", 50, "手机、数码、配件", 1, 1, 0);

SELECT * FROM brand;

-- 2. 通过查询插入多条数据，新建一个表，并插入获得的内容
-- 这里的key也要添加``
-- 如果存在就删除表
drop table if exists brand_new;

CREATE TABLE brand_new(
	    `id` int NOT NULL PRIMARY KEY,
	    `name` varchar(60) NOT NULL DEFAULT '',
	    `logo` varchar(80) NOT NULL DEFAULT '',
	    `describe` text NOT NULL,
	    `url` varchar(255) NOT NULL DEFAULT '',
	    `sort` int NOT NULL DEFAULT 50,
	    `cat_name` varchar(128) NULL DEFAULT '',
	    `parent_cat_id` int NULL DEFAULT 0,
	    `cat_id` int NULL DEFAULT 0,
	    `is_hot` int NULL DEFAULT 0
);

INSERT INTO brand_new
SELECT * FROM brand
WHERE cat_name = '手机、数码、配件';

SELECT id,name,cat_name FROM brand_new; 

-- 3. 复制表
drop table if exists newbrand;

CREATE TABLE newbrand AS
SELECT id,name,cat_name
FROM brand WHERE cat_name='手机、数码、配件';

SELECT id,name,cat_name 
FROM newbrand;




