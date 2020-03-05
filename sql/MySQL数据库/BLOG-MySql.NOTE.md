---
title: MySql
date: 202000304
---

[MySql 三大知识点——索引、锁、事务](https://zhuanlan.zhihu.com/p/59764376)🌝

## SQL PRIMARY KEY 约束

- PRIMARY KEY 约束**唯一标识数据库表中的每条记录**。
- 主键必须包含唯一的值。
- 主键列不能包含 NULL 值。
- **每个表都应该有一个主键**，并且每个表只能有一个主键。

```sql
CREATE TABLE Persons
(
  Id_P int NOT NULL,
  LastName varchar(255) NOT NULL,
  FirstName varchar(255),
  Address varchar(255),
  City varchar(255),
  PRIMARY KEY (Id_P)
)
```

## SQL 语句一般语法

```sql
SELECT select_list
[INTO new_table]
FROM from_table_name
[WHERE search_condition]
[GROUP BY group_by_expression]
[HAVING search_condition]
[ORDER order_expression [ASC|DESC]]
```

## 查询语句 select

### 多表查询的 sql 语句

SELECT 字段名 FROM 表 1，表 2 … WHERE 表 1.字段 = 表 2.字段 AND 其它查询条件

## 索引

- 索引可以加快数据库的**检索速度**；
- 表经常**进行 INSERT/UPDATE/DELETE 操作就不要建立索引了**，换言之：索引会降低插入、删除、修改等维护任务的速度；
- 索引需要**占物理和数据空间**；
- 了解过索引的**最左匹配原则**；
- 知道索引的分类：聚集索引和非聚集索引；
- Mysql 支持 Hash 索引和 B+树索引两种

### 索引做了些什么可以让我们查询加快速度呢

其实就是**将无序的数据变成有序**(相对)，这样就可以使用二分法查找了。

底层结构就是 B+树，B+树作为树的一种实现，能够让我们很快地查找出对应的记录。

#### 关系型数据库和 nosql 查询效率谁高

添加了索引的表，关系型是 B+ tree 查询效率相对较高。

### 索引降低增删改的速度

也就是查找的时候方便，新增与删除的时候就会更麻烦，需要构建平衡树。

B+树是平衡树的一种。

平衡树：**它是一棵空树或它的左右两个子树的高度差的绝对值不超过 1**，并且左右两个子树都是一棵平衡二叉树。时间复杂度就是 O(logn，二分法 log2(n))。

如果一棵普通的树在极端的情况下，是能退化成链表的(树的优点就不复存在了)。

B+树是一颗平衡树，如果我们对这颗树增删改的话，那肯定会破坏它的原有结构。

要维持平衡树，就必须做额外的工作。正因为这些额外的工作开销，导致索引会降低增删改的速度。

除了 B+树之外，还有一种常见的是**哈希索引**。

## sql 的执行

Mysql 的基本存储结构是**页**(记录都存在页里边)。

- 各个数据页可以组成一个双向链表；
- 而每个数据页中的记录又可以组成一个单向链表；
- 每个数据页都会为存储在它里边儿的记录生成一个**页目录**，在通过**主键**查找某条记录的时候可以在页目录中**使用二分法快速定位到对应的槽**，然后再遍历该槽对应分组中的记录即可快速找到指定的记录；
- 以其他列(非主键)作为搜索条件：只能从最小记录开始**依次遍历单链表中的每条记录**。

如果我们写`select * from user where username = 'qiu'`这样没有进行任何优化的 sql 语句，默认会这样做：

1. 定位到记录所在的页;
2. 需要遍历双向链表，**找到所在的页**;
3. 从所在的页内中查找相应的记录;
4. 由于不是根据主键查询，只能遍历所在页的单链表了;
5. 很明显，在数据量很大的情况下这样查找会很慢！

## 锁

即使我们不会这些锁知识，我们的程序在一般情况下还是可以跑得好好的。因为这些锁数据库隐式帮我们加了。

读锁和写锁是互斥的，读写操作是串行。

## mysql format 的格式

format 为转换的格式，包含格式如下：

%M 月名字(January……December)
%W 星期名字(Sunday……Saturday)
%D 有英语前缀的月份的日期(1st, 2nd, 3rd, 等等。）
%Y 年, 数字, 4 位
%y 年, 数字, 2 位
%a 缩写的星期名字(Sun……Sat)
%d 月份中的天数, 数字(00……31)
%e 月份中的天数, 数字(0……31)
%m 月, 数字(01……12)
%c 月, 数字(1……12)
%b 缩写的月份名字(Jan……Dec)
%j 一年中的天数(001……366)
%H 小时(00……23)
%k 小时(0……23)
%h 小时(01……12)
%I 小时(01……12)
%l 小时(1……12)
%i 分钟, 数字(00……59)
%r 时间,12 小时(hh:mm:ss [AP]M)
%T 时间,24 小时(hh:mm:ss)
%S 秒(00……59)
%s 秒(00……59)
%p AM 或 PM
%w 一个星期中的天数(0=Sunday ……6=Saturday ）
%U 星期(0……52), 这里星期天是星期的第一天
%u 星期(0……52), 这里星期一是星期的第一

需要显示年月日（xxxx-xx-xx），这个时候就可以用 date_format(date,'%Y-%m-%d')处理。

## MySQL 数据类型

在 [MySQL](https://www.w3school.com.cn/sql/sql_datatypes.asp) 中，有三种主要的类型：**文本**、**数字**和**日期/时间**类型。

## 类型转换 CAST(xxx AS 类型)

和 SQL Server 一样,就是类型参数有点点不同 : CAST(xxx AS 类型) , CONVERT(xxx,类型)

可用的类型如下：

- 二进制,同带 binary 前缀的效果 : BINARY
- 字符型,可带参数 : CHAR()
- 日期 : DATE
- 时间: TIME
- 日期时间型 : DATETIME
- 浮点数 : DECIMAL
- 整数 : SIGNED
- 无符号整数 : UNSIGNED

## isnull，空值判断

mysql 中：

1.isnull(exper) 判断 exper 是否为空，是则返回 1，否则返回 0

2.ifnull(exper1,exper2)判断 exper1 是否为空，是则用 exper2 代替

3.nullif(exper1,exper2)如果 expr1= expr2 成立，那么返回值为 NULL，否则返回值为 expr1。

## 内连接、左连接（左外连接）、右连接（右外连接）、全连接（全外连接）

[参考文章](https://blog.csdn.net/plg17/article/details/78758593)

### 内链接：inner join on

返回两个表的交集。

### 左外连接：left join on / left outer join on

left join 是 left outer join 的简写，它的全称是左外连接，是外连接中的一种。
左(外)连接，左表(a_table)的记录将会全部表示出来，而右表(b_table)只会显示符合搜索条件的记录。右表记录不足的地方均为 NULL。

### 右连接（右外连接）：right join on / right outer join on

right join 是 right outer join 的简写，它的全称是右外连接，是外连接中的一种。
与左(外)连接相反，右(外)连接，左表(a_table)只会显示符合搜索条件的记录，而右表(b_table)的记录将会全部表示出来。左表记录不足的地方均为 NULL。

### 全连接（全外连接）

MySQL 目前不支持此种方式，可以用其他方式替代解决。
