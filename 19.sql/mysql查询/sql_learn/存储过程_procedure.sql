
-- 创建存储过程，并使用
-- 这里还是不太懂，用到了再来深究了

CREATE PROCEDURE `sql_learn`.`newTable` (OUT param1 INT)
BEGIN
  SELECT COUNT(*) INTO param1 FROM goods;
END;

use sql_learn;
call newTable(@'test_function');
select * from test_function;