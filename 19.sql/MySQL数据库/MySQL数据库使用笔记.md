# MySQL 数据库

三大知识点——索引、锁、事务。[参考文章](https://zhuanlan.zhihu.com/p/59764376)
[全面概述](https://zhuanlan.zhihu.com/p/57451327)
[超经典 50 道 SQL 练习题](https://zhuanlan.zhihu.com/p/40522738)
[类比 excel 与 sql](https://zhuanlan.zhihu.com/p/43284471)

## MySQL 一般操作

### 启动 MySQL 服务

sudo /usr/local/MySQL/support-files/mysql.server start

### 停止 MySQL 服务

sudo /usr/local/mysql/support-files/mysql.server stop

### 重启 MySQL 服务

sudo /usr/local/mysql/support-files/mysql.server restart

### 在终端登录到 MySQL 的命令如下

`mysql -u root -p`

### 导入 sql

左侧菜单栏 mysql -> 右键 -> 运行 SQL 文件

## 常用 sql

1. 进入 mysql 的指令 bin 目录`cd /usr/local/mysql/bin`
2. 访问 mysql，`./mysql`
3. 操作数据库

### 库操作 database 操作，登录之后操作

- 链接数据库: mysql -u root -p
- 创建数据库: create database testmysql;
- 查询数据库: show databases;
- 删除数据库: drop database testmysql;

### 表操作 table

- 链接数据库: mysql -u root -p
- 选择数据库: use koa_demo;
- 显示表: show tables;
- 选择数据: select \* from user;
- 创建数据表

  ```sql
    CREATE TABLE IF NOT EXISTS `runoob_tbl`(
      `runoob_id` INT UNSIGNED AUTO_INCREMENT,
      `runoob_title` VARCHAR(100) NOT NULL,
      `runoob_author` VARCHAR(40) NOT NULL,
      `submission_date` DATE,
      PRIMARY KEY ( `runoob_id` )
    )ENGINE=InnoDB DEFAULT CHARSET=utf8;
  ```

### 表中的数据操作

这里在 koa_demo 的 user_info 中增加一个成员并删除。

- 选择数据库: use koa_demo;
- 查询已有数据: select \* from user_info;
- 新增

  ```sql
  INSERT INTO user_info
    (id, email, password)
    VALUES
    ("3", "dsfdsf@sdfd.com", '11111');
  ```

- 查询: select \* from user_info;
- 修改: UPDATE user_info SET email='hhh@dddddd.com' WHERE id=3;
- 删除: DELETE FROM user_info WHERE id=3;

## 索引

索引，类似书籍的目录，可以根据目录的**某个页码**立即找到对应的内容。

索引的优点：1. 天生排序。2. 快速查找。
索引的缺点：1. 占用空间。2. 降低更新表的速度。

注意点：`小表使用全表扫描更快，中大表(多大算是中大表)才使用索引。超级大表索引基本无效`。

索引从实现上说，分成 2 种：聚集索引和辅助索引（也叫二级索引或者非聚集索引）

从功能上说，分为 6 种：普通索引，唯一索引，主键索引，复合索引，外键索引，全文索引。

## Sql 查询

### 分页查询数据，并获取所有的数据

```sql
-- 不常用的写法
SELECT SQL_CALC_FOUND_ROWS * FROM douban_chart_movies order by id limit 0,10;
SELECT found_rows();
-- 一般的写法
-- 查出符合条件的记录总数
SELECT COUNT(*) as total FROM `table` WHERE ......;
-- 查询当页要显示的数据
SELECT * FROM `table` WHERE ...... limit M,N;
```

### 查询当前最新一条数据

```sql
select * from `user_info` order by id DESC limit 1
```

### 清洗数据

数据不能重新获取了，只能自己清理数据了。

### 新增一列，根据已有的两列来生成一列新的

```sql
-- 限制单条
update douban_chart_movies  SET vote_count_multiply_by_score=vote_count*score WHERE id=1291546;
-- 更新所有
update douban_chart_movies SET vote_count_multiply_by_score=vote_count*score;
```

## 范式

参考：https://www.cnblogs.com/best/p/6517755.html#_label3_0_0_0

要设计规范化的数据库，就要求我们根据数据库设计范式――也就是数据库设计的规范原则来做。范式可以指导我们更好地设计数据库的表结构，减少冗余的数据，借此可以提高数据库的存储效率，数据完整性和可扩展性。

设计关系数据库时，遵从不同的规范要求，设计出合理的关系型数据库，这些不同的规范要求被称为不同的范式，各种范式呈递次规范，越高的范式数据库冗余越小。目前关系数据库有六种范式：第一范式（1NF）、第二范式（2NF）、第三范式（3NF）、巴德斯科范式（BCNF）、第四范式(4NF）和第五范式（5NF，又称完美范式）。满足最低要求的范式是第一范式（1NF）。在第一范式的基础上进一步满足更多规范要求的称为第二范式（2NF），其余范式以次类推。一般说来，数据库只需满足第三范式(3NF）就行了。

### 目标

所以在实际的数据库设计中，我们不能一味的追求规范化，既要考虑三大范式，**减少数据冗余和各种数据库操作异常**，又要充分考虑到数据库的性能问题，允许适当的数据库冗余。

### 三大范式

#### 第一范式（1NF），信息都是单独的字段，不存在符合字段

所谓第一范式（1NF）是指在关系模型中，对列添加的一个规范要求，所有的列都应该是原子性的，即数据库表的每一列都是不可分割的原子数据项，而不能是集合，数组，记录等非原子数据项。即实体中的某个属性有多个值时，必须拆分为不同的属性。**在符合第一范式（1NF）表中的每个域值只能是实体的一个属性或一个属性的一部分。简而言之，第一范式就是无重复的域。**

#### 第二范式（2NF），提取公共信息单独建表

在 1NF 的基础上，非 Key 属性必须完全依赖于主键。第二范式（2NF）是在第一范式（1NF）的基础上建立起来的，即满足第二范式（2NF）必须先满足第一范式（1NF）。第二范式（2NF）要求数据库表中的每个实例或记录必须可以被唯一地区分。**选取一个能区分每个实体的属性或属性组，作为实体的唯一标识。**

第二范式（2NF）要求实体的属性完全依赖于主关键字。**所谓完全依赖是指不能存在仅依赖主关键字一部分的属性，如果存在，那么这个属性和主关键字的这一部分应该分离出来形成一个新的实体，新实体与原实体之间是一对多的关系。**为实现区分通常需要为表加上一个列，以存储各个实例的唯一标识。简而言之，第二范式就是在第一范式的基础上属性完全依赖于主键。

#### 第三范式（3NF）

第三范式是在第二范式基础上，更进一层，第三范式的目标就是确保表中各列与主键列直接相关，而不是间接相关。即各列与主键列都是一种直接依赖关系，则满足第三范式。

### 数据库设计原则

- 是不是可以认为是尽可能扁平化。
- 减少数据冗余，提高数据库可维护性和扩展性。
- 对于有共性的结构数据需要抽离出来。

## MySQL 介绍

MySQL 是一种关系数据库管理系统，关系数据库将数据保存在不同的表中，而不是将所有数据放在一个大仓库内，这样就增加了速度并提高了灵活性。

### 名词解释

#### 数据库事务(Database Transaction)

是指作为单个逻辑工作单元执行的一系列操作，要么完全地执行，要么完全地不执行。事务处理可以确保除非事务性单元内的所有操作都成功完成，否则不会永久更新面向数据的资源。通过将一组相关操作组合为一个要么全部成功要么全部失败的单元，可以简化错误恢复并使应用程序更加可靠。一个逻辑工作单元要成为事务，必须满足所谓的 ACID（原子性、一致性、隔离性和持久性）属性。事务是数据库运行中的逻辑工作单位，由 DBMS 中的事务管理子系统负责事务的处理。

#### 主键 PRIMARY KEY (`id`)

应该就是可以唯一表示数据行，不可重复，类似于 react 中的 key。

#### 外键

指向与抽离出来的关联部分的内容，与别的表相连。

#### 唯一键 UNIQUE KEY `un_category_name` (`name`)

唯一键，也称(唯一约束)，和主键的区别是可以为有多个唯一键并且值可以为 NULL，但 NULL 也不能重复，也就是说只能有一行的值为 NULL。它会隐式的创建唯一索引。

mysql 模块是 node 操作 MySQL 的引擎，可以在 node.js 环境下对 MySQL 数据库进行建表，增、删、改、查等操作。

## 数据库操作步骤

1. 创建数据库 koa_demo, 可以使用命令 create database koa_demo;
2. 创建链接

```js
const mysql = require('mysql');
const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '911029',
  database: 'koa_demo',
});
```

3. 链接数据库并查询表

```js
let query = function(sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        reject(err);
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
          connection.release();
        });
      }
    });
  });
};
```

4. 使用 mysql 来查询数据库的内容。

- 链接数据库： mysql -u root -p
- 选择数据库：use koa_demo;
- 显示表：show tables;
- 选择数据： select \* from user;

## 建表相关内容

### 行数据的 id 的问题

id INT NOT NULL AUTO_INCREMENT,

选择自增 id 配置，这样就不需要自己生成 id 了。

### 新加自增 id 的行，如何获取其内容

mysql 中的``与''是有区别的，后者表示字符串。

```sql
select * from `user_info` order by id DESC limit 1
```

## 数据类型

[MySQL 的数据类型](http://www.runoob.com/mysql/mysql-data-types.html)

MySQL 支持多种类型，大致可以分为三类：

- 数值、
- 日期/时间和
- 字符串(字符)类型。

### 数据类型的属性

MySQL 关键字 含义
NULL 数据列可包含 NULL 值
NOT NULL 数据列不允许包含 NULL 值
DEFAULT 默认值
PRIMARY KEY 主键
AUTO_INCREMENT 自动递增，适用于整数类型
UNSIGNED 无符号
CHARACTER SET name 指定一个字符集

### 数据库删除操作

删除符合条件的表内的数据：

```sql
delete from  student where  T_name = "张三";
```

清除表内数据，保存表结构，用 truncate。格式为：

```sql
truncate table 表名;
```

删除表用 drop，就是啥都没了。格式为：

```sql
drop table  表名;
```

### 查询数据

LIKE 子句

SQL LIKE 子句中使用百分号 %字符来表示任意字符，类似于 UNIX 或正则表达式中的星号 \*。

```sql
mysql> SELECT * from runoob_tbl  WHERE runoob_author LIKE '%COM';
```

- '%a' // 以 a 结尾的数据
- 'a%' // 以 a 开头的数据
- '%a%' // 含有 a 的数据
- '_a_' // 三位且中间字母是 a 的
- '\_a' // 两位且结尾字母是 a 的
- 'a\_' // 两位且开头字母是 a 的

### MySQL UNION 操作符

http://www.runoob.com/mysql/mysql-union-operation.html

MySQL UNION 操作符用于连接两个以上的 SELECT 语句的结果组合到一个结果集合中。多个 SELECT 语句会删除重复的数据。

```sql
SELECT expression1, expression2, ... expression_n
FROM tables
[WHERE conditions]
UNION [ALL | DISTINCT]
SELECT expression1, expression2, ... expression_n
FROM tables
[WHERE conditions];
```

UNION 语句：用于将不同表中相同列中查询的数据展示出来；（不包括重复数据）
UNION ALL 语句：用于将不同表中相同列中查询的数据展示出来；（包括重复数据）

使用形式如下：
SELECT 列名称 FROM 表名称 UNION SELECT 列名称 FROM 表名称 ORDER BY 列名称；
SELECT 列名称 FROM 表名称 UNION ALL SELECT 列名称 FROM 表名称 ORDER BY 列名称；

### MySQL 事务

<http://www.runoob.com/mysql/mysql-transaction.html>

MySQL 事务主要用于**处理操作量大，复杂度高的数据**。比如说，在人员管理系统中，你删除一个人员，你即需要删除人员的基本资料，也要删除和该人员相关的信息，如信箱，文章等等，这样，这些数据库操作语句就构成一个事务！

#### MYSQL 事务处理主要有两种方法

1、用 BEGIN, ROLLBACK, COMMIT 来实现

BEGIN 开始一个事务
ROLLBACK 事务回滚
COMMIT 事务确认
2、直接用 SET 来改变 MySQL 的自动提交模式:

SET AUTOCOMMIT=0 禁止自动提交
SET AUTOCOMMIT=1 开启自动提交

### MySQL 索引

实际上，索引也是一张表，该表保存了主键与索引字段，并指向实体表的记录。

这是最基本的索引，它没有任何限制。它有以下几种创建方式：

```sql
CREATE INDEX indexName ON mytable(username(length));
```

### 取值类型

- CHAR 0-255 字节 定长字符串
- VARCHAR 0-65535 字节 变长字符串
- BIGINT 8 字节 (-9,223,372,036,854,775,808，9 223 372 036 854 775 807) (0，18 446 744 073 709 551 615) 极大整数值
- INT(Length) 4 字节 范围：-2 147 483 648~2 147 483 647，或者 0~4 294 967 295（无符号）

### 删除数据库表的操作

清除表内数据，保存表结构，用 truncate。格式为：

```sql
truncate table 表名
```

## 数据字段类型

- CHAR、VARCAHR 的长度是指字符的长度，例如 CHAR[3]则只能放字符串"123"，如果插入数据"1234"，则从高位截取，变为"123"。 VARCAHR 同理。

- TINYINT、SMALLINT、MEDIUMINT、INT 和 BIGINT 的长度，其实和数据的大小无关！Length 指的是显示宽度。

[参考文章](https://blog.csdn.net/DayDreamingBoy/article/details/6310907)
