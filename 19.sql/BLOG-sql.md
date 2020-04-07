---
title: sql
date: 2020-3-4
tags:
  - SQL
  - MySql
  - Mongodb
categories:
  - [SQL, MySql]
  - [SQL, Mongodb]
---

[TOC]

sql 语言、MySql 数据库、MongoDB 数据库

## 数据库表名命名规范

[数据库表字段命名规范](https://cloud.tencent.com/developer/article/1054482)

### 一、数据库命名规范

采用 26 个英文字母(区分大小写)和 0-9 的自然数(经常不需要)加上下划线'_'组成，命名简洁明确，多个单词用下划线'_'分隔，**一个项目一个数据库**，多个项目慎用同一个数据库。

### 二、数据库表命名规范

2.1 数据表命名规范

（1）采用 26 个英文字母(区分大小写)和 0-9 的自然数(经常不需要)加上下划线'_'组成，命名简洁明确，多个单词用下划线'_'分隔

（2）**全部小写命名，禁止出现大写**

（3）**禁止使用数据库关键字**，如：name，time ，datetime，password 等

（4）表名称不应该取得太长（一般不超过三个英文单词）

（5）表的名称一般使用**名词或者动宾短语**

（6）用**单数形式表示名称**，例如，使用 employee，而不是 employees

- 明细表的名称为：主表的名称+字符 dtl（detail 缩写）
- 例如：采购定单的名称为：po_order，则采购定单的明细表为：po_orderdtl

（7）表必须填写描述信息（使用 SQL 语句建表时）

2.2 命名规范

① 模块\_+功能点 示例：alllive_log alllive_category

② 功能点 示例：live message

③ 通用表 示例：all_user

### 三、数据库**字段**命名规范

3.1 字段命名规范

（1）采用 26 个英文字母(区分大小写)和 0-9 的自然数(经常不需要)加上下划线'_'组成，命名简洁明确，多个单词用下划线'_'分隔

（2）**全部小写命名**，禁止出现大写

（3）字段必须填写描述信息

（4）禁止使用数据库关键字，如：name，time ，datetime password 等

（5）字段名称一般采用名词或动宾短语

（6）采用字段的名称必须是易于理解，一般不超过三个英文单词

（7）在命名表的列时，不要重复表的名称

例如，在名 employe 的表中避免使用名为 employee_lastname 的字段

（8）不要在列的名称中包含数据类型

（9）字段命名使用完整名称，禁止缩写

3.2 命名规范

① 名词 示例：user_id user_name sex

② 动宾短语 示例：is_friend is_good

### 四、SQL 语言编码规范

4.1 大小写规范

（1）**所有关键字必须大写**，如：INSERT、UPDATE、DELETE、SELECT 及其子句，IF……ELSE、CASE、DECLARE 等

（2）**所有函数及其参数中除用户变量以外的部分必须大写**

（3）在定义变量时用到的**数据类型必须小写**

## 30 种 SQL 语句优化

[参考文章](https://zhuanlan.zhihu.com/p/72071609)

## 语法笔记

[一千行 MySQL 学习笔记](https://www.cnblogs.com/shockerli/p/1000-plus-line-mysql-notes.html)
