/*
 Navicat MySQL Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 50723
 Source Host           : localhost:3306
 Source Schema         : sql_learn

 Target Server Type    : MySQL
 Target Server Version : 50723
 File Encoding         : 65001

 Date: 14/03/2020 22:40:32
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for bookinfo
-- ----------------------------
DROP TABLE IF EXISTS `bookinfo`;
CREATE TABLE `bookinfo` (
  `ISBN` varchar(50) NOT NULL,
  `BookName` varchar(50) DEFAULT NULL,
  `Type` varchar(50) DEFAULT NULL,
  `publisher` varchar(50) DEFAULT NULL,
  `Writer` varchar(50) DEFAULT NULL,
  `Introduce` text,
  `Price` decimal(19,4) DEFAULT NULL,
  `pDate` varchar(10) DEFAULT NULL,
  `INTime` timestamp(6) NULL DEFAULT NULL,
  `newbook` int(10) DEFAULT NULL,
  `commend` int(10) DEFAULT NULL,
  PRIMARY KEY (`ISBN`),
  UNIQUE KEY `PK_bookinfo` (`ISBN`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of bookinfo
-- ----------------------------
BEGIN;
INSERT INTO `bookinfo` VALUES ('7-110-12000-1', 'Java项目开发实战入门', '项目入门系列', '吉林大学出版社', '明日科技', '全彩版 附光盘 小白实战手册', 59.8000, '2017-03-01', '2018-01-22 14:53:55.290000', 1, 1);
INSERT INTO `bookinfo` VALUES ('7-110-12000-2', 'C语言项目开发实战入门', '项目入门系列', '吉林大学出版社', '明日科技', '全彩版 附光盘 小白实战手册', 59.8000, '2017-04-01', '2018-01-22 14:55:09.230000', 1, 1);
INSERT INTO `bookinfo` VALUES ('7-110-12000-3', 'Android项目开发实战入门', '项目入门系列', '吉林大学出版社', '明日科技', '全彩版 附光盘 小白实战手册', 59.8000, '2017-05-01', '2018-01-22 14:57:14.260000', 1, 1);
INSERT INTO `bookinfo` VALUES ('7-110-12000-4', 'JavaWeb项目开发实战入门', '项目入门系列', '吉林大学出版社', '明日科技', '全彩版 附光盘 小白实战手册', 69.8000, '2017-04-01', '2018-01-22 14:58:19.160000', 1, 1);
INSERT INTO `bookinfo` VALUES ('7-110-12000-5', 'C++项目开发实战入门', '项目入门系列', '吉林大学出版社', '明日科技', '全彩版 附光盘 小白实战手册', 69.8000, '2017-05-01', '2018-01-22 14:58:59.160000', 1, 1);
INSERT INTO `bookinfo` VALUES ('7-110-12000-6', 'JSP项目开发实战入门', '项目入门系列', '吉林大学出版社', '明日科技', '全彩版 附光盘 小白实战手册', 69.8000, '2017-04-01', '2018-01-22 14:59:49.230000', 1, 1);
INSERT INTO `bookinfo` VALUES ('7-110-12000-7', 'PHP项目开发实战入门', '项目入门系列', '吉林大学出版社', '明日科技', '全彩版 附光盘 小白实战手册', 69.8000, '2017-04-01', '2018-01-22 15:12:36.250000', 1, 1);
INSERT INTO `bookinfo` VALUES ('7-110-12000-8', 'C#项目开发实战入门', '项目入门系列', '吉林大学出版社', '明日科技', '全彩版 附光盘 小白实战手册', 69.8000, '2017-04-01', '2018-01-22 15:13:49.210000', 1, 1);
INSERT INTO `bookinfo` VALUES ('7-110-12000-9', 'ASP.NET项目开发实战入门', '项目入门系列', '吉林大学出版社', '明日科技', '全彩版 附光盘 小白实战手册', 69.8000, '2017-07-01', '2018-02-05 09:18:52.190000', 1, 1);
INSERT INTO `bookinfo` VALUES ('7-110-12073-1', '零基础学Java', '零基础系列', '吉林大学出版社', '明日科技', '全彩版 附光盘 小白实战手册', 69.8000, '2017-08-01', '2018-03-17 11:25:17.190000', 1, 1);
INSERT INTO `bookinfo` VALUES ('7-110-12073-2', '零基础学Android', '零基础系列', '吉林大学出版社', '明日科技', '全彩版 附光盘 小白实战手册', 89.8000, '2017-09-01', '2018-03-17 11:27:26.190000', 1, 1);
INSERT INTO `bookinfo` VALUES ('7-110-12073-3', '零基础学C语言', '零基础系列', '吉林大学出版社', '明日科技', '全彩版 附光盘 小白实战手册', 69.8000, '2017-09-01', '2018-03-17 11:33:10.220000', 1, 1);
INSERT INTO `bookinfo` VALUES ('7-110-12073-4', '零基础学PHP', '零基础系列', '吉林大学出版社', '明日科技', '全彩版 附光盘 小白实战手册', 79.8000, '2017-09-01', '2018-03-17 11:32:17.453000', 1, 1);
INSERT INTO `bookinfo` VALUES ('7-110-12073-5', '零基础学C#', '零基础系列', '吉林大学出版社', '明日科技', '全彩版 附光盘 小白实战手册', 79.8000, '2017-10-01', '2018-03-17 11:35:13.530000', 1, 1);
INSERT INTO `bookinfo` VALUES ('7-110-12073-6', '零基础学JavaScript', '零基础系列', '吉林大学出版社', '明日科技', '全彩版 附光盘 小白实战手册', 79.8000, '2017-10-01', '2018-03-17 11:37:35.467000', 1, 1);
INSERT INTO `bookinfo` VALUES ('7-110-12073-7', '零基础学HTML5+CSS3', '零基础系列', '吉林大学出版社', '明日科技', '全彩版 附光盘 小白实战手册', 79.8000, '2017-10-01', '2018-03-17 11:40:13.167000', NULL, NULL);
INSERT INTO `bookinfo` VALUES ('7-110-12073-8', '零基础学Oracle', '零基础系列', '吉林大学出版社', '明日科技', '全彩版 附光盘 小白实战手册', 79.8000, '2018-01-09', '2018-03-17 11:41:53.543000', NULL, NULL);
INSERT INTO `bookinfo` VALUES ('7-110-12085-1', 'Android精彩编程200例', '200例系列', '吉林大学出版社', '明日科技', '全彩版  附2张光盘', 89.8000, '2017-08-01', '2018-03-18 09:05:36.560000', NULL, NULL);
INSERT INTO `bookinfo` VALUES ('7-110-12085-2', 'Java精彩编程200例', '200例系列', '吉林大学出版社', '明日科技', '全彩版 附光盘', 79.8000, '2017-08-01', '2018-03-18 09:07:14.447000', NULL, NULL);
INSERT INTO `bookinfo` VALUES ('7-110-12085-3', 'C语言精彩编程200例', '200例系列', '吉林大学出版社', '明日科技', '全彩版 附光盘', 79.8000, '2017-09-01', '2018-03-18 09:10:37.193000', NULL, NULL);
INSERT INTO `bookinfo` VALUES ('7-110-12085-4', 'C#精彩编程200例', '200例系列', '吉林大学出版社', '明日科技', '全彩版 附光盘', 89.8000, '2017-10-01', '2018-03-18 09:11:54.133000', NULL, NULL);
INSERT INTO `bookinfo` VALUES ('7-110-12085-5', 'Visual Basic精彩编程200例', '200例系列', '吉林大学出版社', '明日科技', '全彩版 附光盘', 79.8000, '2017-11-01', '2018-03-18 09:13:38.127000', NULL, NULL);
INSERT INTO `bookinfo` VALUES ('7-111-12763-3', 'Visual Basic数据库开发实例解析', 'Visual Basic系列丛书', '机械工业出版社', '刘志铭、高春艳、孙健鹏', '软件开发是一项复杂细致的工作，尤其是开发商业管理软件，不但要求开发人员熟练掌握开发工具的语法知识，而且还要具有商业软件开发的丰富经验。本书以实用商业案例为基础，通过几个完整的商业系统案例，一步一步带领读者完成商业管理软件开发的各个目标。每个实例都突出实用性，不仅可以了解开发商业管理软件的专业知识，而且可以全面掌握整个商业系统的设计思路和开发技术。全书包含宾馆客房管理系统、钢材综合管理系统、餐饮管理系统、医药进销存管理系统、珠宝首饰进销存管理系统等五个案例，既有小型Access数据库，也有大型的SQL Server数据库，通过对不同数据库、不同行业的实例开发，使读者可以快速掌握利用Visual Basic 开发数据库管理软件的精髓。\r\n　　本书附有配套光盘。光盘提供了书中5个案例的全部源代码，全部源代码都经过精心调试，在Windows98下全部通过，保证能够正常运行。\r\n　　本书内容详实，案例完整，步骤详尽，具有很强的实用性。适合于各级软件开发人员学习使用，也可供大中专院校师生学习参考，是编程者不可多得的一本好书。\r\n　　本书的每个案例都可直接作为商业软件使用，在将本书案例直接用于商业行为时，请首先征得作者同意或授权。', 48.0000, '2015-08-01', '2015-12-15 16:35:41.057000', 0, 0);
INSERT INTO `bookinfo` VALUES ('7-111-12812-5', 'Visual FoxPro数据库开发实例解析', 'Visual FoxPro系列丛书', '机械工业出版社', '王晶莹、王国辉、张雨', '软件开发是一项复杂细致的工作，尤其是开发商业管理软件……', 48.0000, '2015-09-01', '2015-12-15 16:37:21.817000', 0, 0);
INSERT INTO `bookinfo` VALUES ('7-111-13024-3', 'Power Builder数据库开发实例解析', 'PowerBuilder系列丛书', '机械工业出版社', '华传铭、张振坤、吴晓英', '软件开发是一项复杂细致的工作，尤其是开发商业管理软件……', 43.0000, '2015-09-01', '2015-12-15 16:39:35.433000', 0, 0);
INSERT INTO `bookinfo` VALUES ('7-111-13900-3', 'Delphi数据库开发实例解析', 'Delphi系列丛书', '机械工业出版社', '赛奎春、郑骁鹏、郑齐心', '软件开发是一项复杂细致的工作，尤其是开发商业管理软件，不但要求开发人员熟练掌握开发工具的语法知识，而且还要具有商业软件开发的丰富经验。本书以实用商业案例为基础，通过几个完整的商业系统案例，一步一步带领读者完成商业管理软件开发的各个目标。每个实例都突出实用性，不仅可以了解开发商业管理软件的专业知识，而且可以全面掌握整个商业系统的设计思路和开发技术。全书包含餐饮管理系统、物业管理系统、校园管理系统、维修管理系统、汽配管理系统等五个案例，既有小型Access数据库，也有大型的SQL Server数据库，通过对不同数据库、不同行业的实例开发，使读者可以快速掌握利用Delphi开发数据库管理软件的精髓。\r\n　　本书附有配套光盘。光盘提供了书中5个案例的全部源代码，全部源代码都经过精心调试，在Windows98/Windows XP下全部通过，保证能够正常运行。\r\n　　本书内容详实，案例完整，步骤详尽，具有很强的实用性。适合于各级软件开发人员学习使用，也可供大中专院校师生学习参考，是编程者不可多得的一本好书。\r\n　　本书的每个案例都可直接作为商业软件使用，在将本书案例直接用于商业行为时，请首先征得作者同意或授权。', 49.0000, '2015-02-01', '2015-12-15 16:41:29.160000', 0, 0);
INSERT INTO `bookinfo` VALUES ('7-111-14939-4', 'PowerBuilder 精彩编程200例', 'PowerBuilder系列丛书', '机械工业出版社', '张振坤、李文立、集虹等', '本书通过大量实例，分门别类地对PowerBuilder的编程方法进行了全页深入的介绍。', 39.0000, '2015-09-01', '2015-12-15 16:43:35.857000', 0, 0);
INSERT INTO `bookinfo` VALUES ('7-111-14967-X', 'Visual FoxPro 精彩编程200例', 'Visual FoxPro系列丛书', '机械工业出版社', '王国辉、董韶华、韩旭等', '本书通过大量实例，详细介绍了Visual FoxPro编程的经验与技巧。', 39.0000, '2015-08-01', '2015-12-15 16:45:29.897000', 0, 0);
INSERT INTO `bookinfo` VALUES ('7-111-15531-9', 'ASP数据库开发实例解析', 'ASP系列丛书', '机械工业出版社', '李严、于亚芳、王国辉', '本书以实用网络应用程序开发实例为基础……', 36.0000, '2015-12-01', '2015-12-15 16:47:50.560000', 0, 0);
INSERT INTO `bookinfo` VALUES ('7-111-15643-1', 'C语言程序开发范例宝典', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `bookinfo` VALUES ('7-111-15821-0', 'Delphi工程应用与项目实践', 'Delphi系列丛书', '机械工业出版社', '宋坤 赵智勇等', '本书从项目开发必备的知识和原则入手……', 39.0000, '2016-01-01', '2015-12-15 16:50:47.690000', 0, 0);
INSERT INTO `bookinfo` VALUES ('7-111-15860-1', 'Visual Basic工程应用与项目实践', '', '机械工业出版社', '高春艳、李俊民等', '本书从项目开发必备的知识和原则入手，全面系统地介绍了Visual Basic在工程开发中的编程知识、方法和技巧。全书在前12章主要介绍Visual Basic进行程序设计的重点和难点技术，每章首先进行知识讲解，然后结合相关知识在工程开发中的应用实例深化理解，应用实例注重实用性、启发性，使读者能结合所学知识快速掌握Visual Basic程序的开发方法和技巧。后两章通过物业和酒店管理系统两个完整实例循序渐进地介绍Visual Basic项目开发的完整过程，使读者在掌握Visual Basic基本开发方法和技巧后，能够快速掌握实用项目的开发思路和方法。从而领会Visual Basic的精髓。\r\n　　全书注重所讲知识的工程应用。作者从多年的开发工程项目的实践入手，将编程必备的知识与工程开发中的实际案例相结合，使读者在学习Visual Basic的同时，快速分享作者在开发中的经验。全书按照深入浅出的原则，根据不同的开发知识和不同的工程应用问题进行了详细的讲解。\r\n　　本书中的实例多来源于我们开发的实际项目，这些例子都具有实际应用的价值，为使读者能更好的使用本书，随书光盘包含了所有实例的源代码程序。', 43.0000, '2015-01-01', '2016-10-23 16:52:33.543000', 0, 0);
INSERT INTO `bookinfo` VALUES ('7-111-15960-8', 'Visual C＋＋工程应用与项目实践', 'Visual C＋＋系列丛书', '机械工业出版社', '张雨、阮伟良、李贺等', '本书从项目开发必备的知识和原则入手……', 41.0000, '2015-01-01', '2016-10-23 16:54:00.960000', 0, 0);
INSERT INTO `bookinfo` VALUES ('7-111-15984-5', 'JSP工程应用与项目实践', 'JSP系列丛书', '机械工业出版社', '陈威、白伟明、李楠', '本书从项目开发必备的知识和原则入手……', 38.0000, '2015-02-01', '2016-10-23 16:55:28.237000', 1, 1);
INSERT INTO `bookinfo` VALUES ('7-111-16332-X', 'ASP工程应用与项目实践', 'ASP系列丛书', '机械工业出版社', '王国辉、牛强、李南南', '本书从项目开发必备的知识和原则入手……', 42.0000, '2015-04-01', '2016-10-23 16:56:47.220000', 0, 1);
INSERT INTO `bookinfo` VALUES ('7-111-16490-4', 'Visual Basic 信息系统开发实例精选', 'Visual Basic系列丛书', '机械工业出版社', '高春艳、李俊民、张耀庭等', '暂无', 44.0000, '2015-07-01', '2016-10-23 16:58:17.227000', 0, 1);
COMMIT;

-- ----------------------------
-- Table structure for bookinfo_zerobasis
-- ----------------------------
DROP TABLE IF EXISTS `bookinfo_zerobasis`;
CREATE TABLE `bookinfo_zerobasis` (
  `ISBN` varchar(50) DEFAULT NULL,
  `BookName` varchar(50) DEFAULT NULL,
  `Type` varchar(50) DEFAULT NULL,
  `publisher` varchar(50) DEFAULT NULL,
  `Writer` varchar(50) DEFAULT NULL,
  `Introduce` text,
  `Price` decimal(19,4) DEFAULT NULL,
  `pDate` varchar(50) DEFAULT NULL,
  `INTime` timestamp(6) NULL DEFAULT NULL,
  `newbook` int(10) DEFAULT NULL,
  `commend` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of bookinfo_zerobasis
-- ----------------------------
BEGIN;
INSERT INTO `bookinfo_zerobasis` VALUES ('7-110-12073-1', '零基础学Java', '零基础系列', '吉林大学出版社', '明日科技', '全彩版 附光盘 小白实战手册', 69.8000, '2017年8月', '2017-10-25 11:25:17.190000', 1, 1);
INSERT INTO `bookinfo_zerobasis` VALUES ('7-110-12073-2', '零基础学Android', '零基础系列', '吉林大学出版社', '明日科技', '全彩版 附光盘 小白实战手册', 89.8000, '2017年9月', '2017-10-25 11:27:26.190000', 1, 1);
INSERT INTO `bookinfo_zerobasis` VALUES ('7-110-12073-3', '零基础学C语言', '零基础系列', '吉林大学出版社', '明日科技', '全彩版 附光盘 小白实战手册', 69.8000, '2017年9月', '2017-10-25 11:33:10.220000', 1, 1);
INSERT INTO `bookinfo_zerobasis` VALUES ('7-110-12073-4', '零基础学PHP', '零基础系列', '吉林大学出版社', '明日科技', '全彩版 附光盘 小白实战手册', 79.8000, '2017年9月', '2017-10-25 11:32:17.453000', 1, 1);
INSERT INTO `bookinfo_zerobasis` VALUES ('7-110-12073-5', '零基础学C#', '零基础系列', '吉林大学出版社', '明日科技', '全彩版 附光盘 小白实战手册', 79.8000, '2017年10月', '2018-03-17 11:35:13.530000', 1, 1);
INSERT INTO `bookinfo_zerobasis` VALUES ('7-110-12073-6', '零基础学JavaScript', '零基础系列', '吉林大学出版社', '明日科技', '全彩版 附光盘 小白实战手册', 79.8000, '2017年10月', '2018-03-17 11:37:35.467000', 1, 1);
INSERT INTO `bookinfo_zerobasis` VALUES ('7-110-12073-7', '零基础学HTML5+CSS3', '零基础系列', '吉林大学出版社', '明日科技', '全彩版 附光盘 小白实战手册', 79.8000, '2017年12月', '2018-03-17 11:40:13.167000', NULL, NULL);
INSERT INTO `bookinfo_zerobasis` VALUES ('7-110-12073-8', '零基础学Oracle', '零基础系列', '吉林大学出版社', '明日科技', '全彩版 附光盘 小白实战手册', 79.8000, '2018年1月', '2018-01-23 10:05:53.543000', NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for bookpub
-- ----------------------------
DROP TABLE IF EXISTS `bookpub`;
CREATE TABLE `bookpub` (
  `书号` int(10) NOT NULL,
  `书名` varchar(50) DEFAULT NULL,
  `作者` varchar(50) DEFAULT NULL,
  `售价` float DEFAULT NULL,
  `出版日期` timestamp(6) NULL DEFAULT NULL,
  `下一次出版日期` timestamp(6) NULL DEFAULT NULL,
  PRIMARY KEY (`书号`),
  UNIQUE KEY `PK_bookpub` (`书号`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of bookpub
-- ----------------------------
BEGIN;
INSERT INTO `bookpub` VALUES (1, 'ASP.NET项目开发全程实录', '张领等', 59, '2017-12-01 00:00:00.000000', '2018-03-18 00:00:00.000000');
INSERT INTO `bookpub` VALUES (2, 'ASP.NET程序开发范例宝典第版', '贯伟红等', 89, '2017-11-12 00:00:00.000000', '2018-05-01 00:00:00.000000');
INSERT INTO `bookpub` VALUES (3, 'ASP.NET网络开发实例自学手册', '房大伟等', 86, '2017-01-25 00:00:00.000000', '2018-04-10 00:00:00.000000');
INSERT INTO `bookpub` VALUES (4, 'ASP.NET2.0网络编程自学手册', '苏宇等', 78, '2017-06-05 00:00:00.000000', '2018-10-01 00:00:00.000000');
INSERT INTO `bookpub` VALUES (5, 'ASP.NET技术方案宝典', '王小科等', 75, '2017-03-05 00:00:00.000000', '2018-08-07 00:00:00.000000');
INSERT INTO `bookpub` VALUES (6, 'ASP.NET网络编程标准教程', '丁红等', 88, '2017-04-06 00:00:00.000000', '2018-08-08 00:00:00.000000');
INSERT INTO `bookpub` VALUES (7, 'SQL应用与开发范例宝典', '房大伟等', 89, '2017-11-03 00:00:00.000000', '2018-11-11 00:00:00.000000');
COMMIT;

-- ----------------------------
-- Table structure for brand
-- ----------------------------
DROP TABLE IF EXISTS `brand`;
CREATE TABLE `brand` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL DEFAULT '',
  `logo` varchar(80) NOT NULL DEFAULT '',
  `describe` text NOT NULL,
  `url` varchar(255) NOT NULL DEFAULT '',
  `sort` int(10) NOT NULL,
  `cat_name` varchar(128) DEFAULT '',
  `parent_cat_id` int(10) DEFAULT NULL,
  `cat_id` int(10) DEFAULT NULL,
  `is_hot` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `PK__brand__3213E83F1F63A897` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=349 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of brand
-- ----------------------------
BEGIN;
INSERT INTO `brand` VALUES (1, '华为/HUAWEI', '/Public/upload/brand/2016/04-01/1584936.jpg', '1111111111', '', 50, '手机、数码、配件', 1, 12, 0);
INSERT INTO `brand` VALUES (4, '索尼/SONY', '/Public/upload/brand/2016/04-01/4178854.jpg', '', '', 50, '手机、数码、配件', 1, 104, 0);
INSERT INTO `brand` VALUES (5, '诺基亚/NOKIA', '/Public/upload/brand/2016/04-01/5498254.jpg', '', '', 50, '手机、数码、配件', 1, 1, 0);
INSERT INTO `brand` VALUES (6, 'TCL', '/Public/upload/brand/2016/04-01/6592544.jpg', '', '', 50, '手机、数码、配件', 1, 1, 0);
INSERT INTO `brand` VALUES (7, '飞利浦/PHILIPS', '/Public/upload/brand/2016/04-01/7956109.jpg', '', '', 50, '手机、数码、配件', 1, 1, 0);
INSERT INTO `brand` VALUES (8, 'OPPO', '/Public/upload/brand/2016/04-01/8351889.jpg', '', '', 50, '手机、数码、配件', 1, 1, 0);
INSERT INTO `brand` VALUES (9, '苹果/Apple', '/Public/upload/brand/2016/04-01/9515283.jpg', '', '', 50, '手机、数码、配件', 1, 1, 0);
INSERT INTO `brand` VALUES (14, '海尔/Haier', '/Public/upload/brand/2016/04-01/14393692.jpg', '', '', 50, '手机、数码、配件', 2, 0, 0);
INSERT INTO `brand` VALUES (15, '三星/SAMSUNG', '/Public/upload/brand/2016/04-01/15993682.jpg', '', '', 50, '手机、数码、配件', 2, 0, 0);
INSERT INTO `brand` VALUES (19, '海信/Hisense', '/Public/upload/brand/2016/04-01/19907879.jpg', '', '', 50, '手机、数码、配件', 2, 0, 0);
INSERT INTO `brand` VALUES (20, '喜之郎/STRONG', '/Public/upload/brand/2016/04-01/20438571.jpg', '', '', 50, '零食特产、粮油', 0, 0, 0);
INSERT INTO `brand` VALUES (21, '阿尔卑斯/Alpenliebe', '/Public/upload/brand/2016/04-01/21232385.jpg', '', '', 50, '零食特产、粮油', 3, 0, 0);
INSERT INTO `brand` VALUES (22, '春光/chun guang', '/Public/upload/brand/2016/04-01/22637808.jpg', '', '', 50, '零食特产、粮油', 3, 0, 0);
INSERT INTO `brand` VALUES (23, '潘高寿', '/Public/upload/brand/2016/04-01/23714849.jpg', '', '', 50, '零食特产、粮油', 3, 0, 0);
INSERT INTO `brand` VALUES (24, '皇冠/Danisa', '/Public/upload/brand/2016/04-01/24379574.jpg', '', '', 50, '零食特产、粮油', 3, 0, 0);
INSERT INTO `brand` VALUES (25, '波力/PO-LI', '/Public/upload/brand/2016/04-01/25158007.jpg', '', '', 50, '零食特产、粮油', 3, 0, 0);
INSERT INTO `brand` VALUES (26, '张二嘎', '/Public/upload/brand/2016/04-01/26461917.jpg', '', '', 50, '零食特产、粮油', 3, 0, 0);
INSERT INTO `brand` VALUES (27, '怡达/yida', '/Public/upload/brand/2016/04-01/27948968.jpg', '', '', 50, '零食特产、粮油', 3, 0, 0);
INSERT INTO `brand` VALUES (28, '母亲', '/Public/upload/brand/2016/04-01/28979757.jpg', '', '', 50, '零食特产、粮油', 3, 0, 0);
INSERT INTO `brand` VALUES (29, '品客/Pringles', '/Public/upload/brand/2016/04-01/29834216.jpg', '', '', 50, '零食特产、粮油', 3, 0, 0);
INSERT INTO `brand` VALUES (30, '乐事/Lay s', '/Public/upload/brand/2016/04-01/30199893.jpg', '', '', 50, '零食特产、粮油', 0, 0, 0);
INSERT INTO `brand` VALUES (31, '多力多滋/Doritos', '/Public/upload/brand/2016/04-01/31794610.jpg', '', '', 50, '零食特产、粮油', 0, 0, 0);
INSERT INTO `brand` VALUES (32, '康师傅/Master Kong', '/Public/upload/brand/2016/04-01/32635995.jpg', '', '', 50, '零食特产、粮油', 0, 0, 0);
INSERT INTO `brand` VALUES (33, '百味林', '/Public/upload/brand/2016/04-01/33320385.jpg', '', '', 50, '零食特产、粮油', 0, 0, 0);
INSERT INTO `brand` VALUES (34, '绿帝/green king', '/Public/upload/brand/2016/04-01/34723611.jpg', '', '', 50, '零食特产、粮油', 0, 0, 0);
INSERT INTO `brand` VALUES (35, '上好佳/Oishi', '/Public/upload/brand/2016/04-01/35786151.jpg', '', '', 50, '零食特产、粮油', 0, 0, 0);
INSERT INTO `brand` VALUES (36, '立丰/lifefun', '/Public/upload/brand/2016/04-01/36895162.jpg', '', '', 50, '零食特产、粮油', 0, 0, 0);
INSERT INTO `brand` VALUES (37, '华味亨', '/Public/upload/brand/2016/04-01/37725891.jpg', '', '', 50, '零食特产、粮油', 0, 0, 0);
INSERT INTO `brand` VALUES (38, '桂格/QUAKER', '/Public/upload/brand/2016/04-01/38654946.jpg', '', '', 50, '茶冲乳品、酒水、饮料', 0, 0, 0);
INSERT INTO `brand` VALUES (39, '卡夫/KRAFT', '/Public/upload/brand/2016/04-01/39107965.jpg', '', '', 50, '茶冲乳品、酒水、饮料', 0, 0, 0);
INSERT INTO `brand` VALUES (40, '维维', '/Public/upload/brand/2016/04-01/40154135.jpg', '', '', 50, '茶冲乳品、酒水、饮料', 0, 0, 0);
INSERT INTO `brand` VALUES (41, '阿华田/Ovaltine', '/Public/upload/brand/2016/04-01/41110107.jpg', '', '', 50, '茶冲乳品、酒水、饮料', 0, 0, 0);
INSERT INTO `brand` VALUES (42, '晨光/MG', '/Public/upload/brand/2016/04-01/42865774.jpg', '', '', 50, '茶冲乳品、酒水、饮料', 0, 0, 0);
INSERT INTO `brand` VALUES (43, '伊利', '/Public/upload/brand/2016/04-01/43194427.jpg', '', '', 50, '茶冲乳品、酒水、饮料', 0, 0, 0);
INSERT INTO `brand` VALUES (44, '顶好/Soyfresh', '/Public/upload/brand/2016/04-01/44859786.jpg', '', '', 50, '茶冲乳品、酒水、饮料', 0, 0, 0);
INSERT INTO `brand` VALUES (45, '银鹭', '/Public/upload/brand/2016/04-01/45582409.jpg', '', '', 50, '茶冲乳品、酒水、饮料', 0, 0, 0);
INSERT INTO `brand` VALUES (46, '李子园', '/Public/upload/brand/2016/04-01/46877969.jpg', '', '', 50, '茶冲乳品、酒水、饮料', 0, 0, 0);
INSERT INTO `brand` VALUES (47, '田园/COUNTRY GOODNESS', '/Public/upload/brand/2016/04-01/47229913.jpg', '', '', 50, '茶冲乳品、酒水、饮料', 0, 0, 0);
INSERT INTO `brand` VALUES (48, '生机谷/LIVING PLANET', '/Public/upload/brand/2016/04-01/48508993.jpg', '', '', 50, '茶冲乳品、酒水、饮料', 0, 0, 0);
INSERT INTO `brand` VALUES (49, '帕斯卡/PASCUAL', '/Public/upload/brand/2016/04-01/49202172.jpg', '', '', 50, '茶冲乳品、酒水、饮料', 0, 0, 0);
INSERT INTO `brand` VALUES (50, '喜乐', '/Public/upload/brand/2016/04-01/50663406.jpg', '', '', 50, '茶冲乳品、酒水、饮料', 0, 0, 0);
INSERT INTO `brand` VALUES (51, '欧德堡/OLDENBURGER', '/Public/upload/brand/2016/04-01/51748797.jpg', '', '', 50, '茶冲乳品、酒水、饮料', 0, 0, 0);
INSERT INTO `brand` VALUES (52, '德运/Devondale', '/Public/upload/brand/2016/04-01/52648629.jpg', '', '', 50, '茶冲乳品、酒水、饮料', 0, 0, 0);
INSERT INTO `brand` VALUES (53, '天香', '/Public/upload/brand/2016/04-01/53178771.jpg', '', '', 50, '茶冲乳品、酒水、饮料', 0, 0, 0);
INSERT INTO `brand` VALUES (54, '风行', '/Public/upload/brand/2016/04-01/54643960.jpg', '', '', 50, '茶冲乳品、酒水、饮料', 0, 0, 0);
INSERT INTO `brand` VALUES (55, '雀巢/Nestle', '/Public/upload/brand/2016/04-01/55935455.jpg', '', '', 50, '茶冲乳品、酒水、饮料', 0, 0, 0);
INSERT INTO `brand` VALUES (56, '顶好/Soyfresh', '/Public/upload/brand/2016/04-01/56575570.jpg', '', '', 50, '进口食品、进口牛奶', 0, 0, 0);
INSERT INTO `brand` VALUES (57, '三得利/SUNTORY', '/Public/upload/brand/2016/04-01/57371582.jpg', '', '', 50, '进口食品、进口牛奶', 0, 0, 0);
INSERT INTO `brand` VALUES (58, '田园/COUNTRY GOODNESS', '/Public/upload/brand/2016/04-01/58791506.jpg', '', '', 50, '进口食品、进口牛奶', 0, 0, 0);
INSERT INTO `brand` VALUES (59, '生机谷/LIVING PLANET', '/Public/upload/brand/2016/04-01/59424261.jpg', '', '', 50, '进口食品、进口牛奶', 0, 0, 0);
INSERT INTO `brand` VALUES (60, '帕斯卡/PASCUAL', '/Public/upload/brand/2016/04-01/60936691.jpg', '', '', 50, '进口食品、进口牛奶', 0, 0, 0);
INSERT INTO `brand` VALUES (61, '葛兰纳诺/GRANAROLO', '/Public/upload/brand/2016/04-01/61189978.jpg', '', '', 50, '进口食品、进口牛奶', 0, 0, 0);
INSERT INTO `brand` VALUES (62, '南阳', '/Public/upload/brand/2016/04-01/62627920.jpg', '', '', 50, '进口食品、进口牛奶', 0, 0, 0);
INSERT INTO `brand` VALUES (63, '纽瑞滋/Nouriz', '/Public/upload/brand/2016/04-01/63199591.jpg', '', '', 50, '进口食品、进口牛奶', 0, 0, 0);
INSERT INTO `brand` VALUES (64, '安佳/Anchor', '/Public/upload/brand/2016/04-01/64128866.jpg', '', '', 50, '进口食品、进口牛奶', 0, 0, 0);
INSERT INTO `brand` VALUES (65, '欧德堡/OLDENBURGER', '/Public/upload/brand/2016/04-01/65393334.jpg', '', '', 50, '进口食品、进口牛奶', 0, 0, 0);
INSERT INTO `brand` VALUES (66, '德运/Devondale', '/Public/upload/brand/2016/04-01/66125076.jpg', '', '', 50, '进口食品、进口牛奶', 0, 0, 0);
INSERT INTO `brand` VALUES (67, '康维多/Primavita', '/Public/upload/brand/2016/04-01/67795819.jpg', '', '', 50, '进口食品、进口牛奶', 0, 0, 0);
INSERT INTO `brand` VALUES (68, '多美鲜/Suki', '/Public/upload/brand/2016/04-01/68598971.jpg', '', '', 50, '进口食品、进口牛奶', 0, 0, 0);
INSERT INTO `brand` VALUES (69, '深蓝健康/DEEP BLUE HEALTH', '/Public/upload/brand/2016/04-01/69391027.jpg', '', '', 50, '进口食品、进口牛奶', 0, 0, 0);
INSERT INTO `brand` VALUES (70, '贝尔/BEIER', '/Public/upload/brand/2016/04-01/70604849.jpg', '', '', 50, '进口食品、进口牛奶', 0, 0, 0);
INSERT INTO `brand` VALUES (71, '兰诺斯/Lemnos', '/Public/upload/brand/2016/04-01/71497320.jpg', '', '', 50, '进口食品、进口牛奶', 0, 0, 0);
INSERT INTO `brand` VALUES (72, '瑞慕/swiss mooh', '/Public/upload/brand/2016/04-01/72743881.jpg', '', '', 50, '进口食品、进口牛奶', 0, 0, 0);
INSERT INTO `brand` VALUES (73, '艾美/Emmi', '/Public/upload/brand/2016/04-01/73942431.jpg', '', '', 50, '进口食品、进口牛奶', 0, 0, 0);
INSERT INTO `brand` VALUES (74, '卡姿兰/CARSLAN', '/Public/upload/brand/2016/04-01/74239114.jpg', '', '', 50, '美容护理、洗发、沐浴', 0, 6, 0);
INSERT INTO `brand` VALUES (75, '老中医', '/Public/upload/brand/2016/04-01/75738470.jpg', '', '', 50, '美容护理、洗发、沐浴', 0, 6, 0);
INSERT INTO `brand` VALUES (76, '大宝/Dabao', '/Public/upload/brand/2016/04-01/76310470.jpg', '', '', 50, '美容护理、洗发、沐浴', 0, 6, 0);
INSERT INTO `brand` VALUES (77, '相宜本草/INOHERB', '/Public/upload/brand/2016/04-01/77556921.jpg', '', '', 50, '美容护理、洗发、沐浴', 0, 6, 0);
INSERT INTO `brand` VALUES (78, '兰蔻/LANCOME', '/Public/upload/brand/2016/04-01/78349746.jpg', '', '', 50, '美容护理、洗发、沐浴', 0, 6, 0);
INSERT INTO `brand` VALUES (79, '碧欧泉/BIOTHERM', '/Public/upload/brand/2016/04-01/79703643.jpg', '', '', 50, '美容护理、洗发、沐浴', 0, 6, 0);
INSERT INTO `brand` VALUES (80, '倩碧/CLINIQUE', '/Public/upload/brand/2016/04-01/80395614.jpg', '', '', 50, '美容护理、洗发、沐浴', 0, 6, 0);
INSERT INTO `brand` VALUES (81, '芳珂/Fancl', '/Public/upload/brand/2016/04-01/81893872.jpg', '', '', 50, '美容护理、洗发、沐浴', 0, 6, 0);
INSERT INTO `brand` VALUES (82, '兰芝/LANEIGE', '/Public/upload/brand/2016/04-01/82908621.jpg', '', '', 50, '美容护理、洗发、沐浴', 0, 6, 0);
INSERT INTO `brand` VALUES (83, '泊美/PUREMILD', '/Public/upload/brand/2016/04-01/83927215.jpg', '', '', 50, '美容护理、洗发、沐浴', 0, 6, 0);
INSERT INTO `brand` VALUES (84, '近江蔓莎', '/Public/upload/brand/2016/04-01/84746188.jpg', '', '', 50, '美容护理、洗发、沐浴', 0, 6, 0);
INSERT INTO `brand` VALUES (85, '丹姿/DANZ', '/Public/upload/brand/2016/04-01/85462658.jpg', '', '', 50, '美容护理、洗发、沐浴', 0, 6, 0);
INSERT INTO `brand` VALUES (86, '郁美净', '/Public/upload/brand/2016/04-01/86537612.jpg', '', '', 50, '美容护理、洗发、沐浴', 0, 6, 0);
INSERT INTO `brand` VALUES (87, '昭贵', '/Public/upload/brand/2016/04-01/87593560.jpg', '', '', 50, '美容护理、洗发、沐浴', 0, 6, 0);
INSERT INTO `brand` VALUES (88, '欧莱雅/L OREAL', '/Public/upload/brand/2016/04-01/88659066.jpg', '', '', 50, '美容护理、洗发、沐浴', 0, 6, 0);
INSERT INTO `brand` VALUES (89, '京润珍珠', '/Public/upload/brand/2016/04-01/89922656.jpg', '', '', 50, '美容护理、洗发、沐浴', 0, 6, 0);
INSERT INTO `brand` VALUES (90, '隆力奇/LONGLIQI', '/Public/upload/brand/2016/04-01/90108596.jpg', '', '', 50, '美容护理、洗发、沐浴', 0, 6, 0);
INSERT INTO `brand` VALUES (91, '娇兰/Guerlain', '/Public/upload/brand/2016/04-01/91237054.jpg', '', '', 50, '美容护理、洗发、沐浴', 0, 6, 0);
INSERT INTO `brand` VALUES (92, '多美滋/Dumex', '/Public/upload/brand/2016/04-01/92781124.jpg', '', '', 50, '母婴用品、玩具', 0, 10, 0);
INSERT INTO `brand` VALUES (93, '惠氏/Wyeth', '/Public/upload/brand/2016/04-01/93783239.jpg', '', '', 50, '母婴用品、玩具', 0, 10, 0);
INSERT INTO `brand` VALUES (94, '伊利', '/Public/upload/brand/2016/04-01/94943447.jpg', '', '', 50, '母婴用品、玩具', 0, 10, 0);
INSERT INTO `brand` VALUES (95, '雅士利/YASHILY', '/Public/upload/brand/2016/04-01/95842071.jpg', '', '', 50, '母婴用品、玩具', 0, 10, 0);
INSERT INTO `brand` VALUES (96, '贝因美/BEINGMATE', '/Public/upload/brand/2016/04-01/96409237.jpg', '', '', 50, '母婴用品、玩具', 0, 10, 0);
INSERT INTO `brand` VALUES (97, '益力健', '/Public/upload/brand/2016/04-01/97803784.jpg', '', '', 50, '母婴用品、玩具', 0, 10, 0);
INSERT INTO `brand` VALUES (98, '林贝儿/IMPERIAL.XO', '/Public/upload/brand/2016/04-01/98314041.jpg', '', '', 50, '母婴用品、玩具', 0, 10, 0);
INSERT INTO `brand` VALUES (99, '三元', '/Public/upload/brand/2016/04-01/99242987.jpg', '', '', 50, '母婴用品、玩具', 0, 10, 0);
INSERT INTO `brand` VALUES (100, '纽瑞滋/Nouriz', '/Public/upload/brand/2016/04-01/100190280.jpg', '', '', 50, '母婴用品、玩具', 0, 10, 0);
INSERT INTO `brand` VALUES (101, '高培/GlodMax', '/Public/upload/brand/2016/04-01/101393664.jpg', '', '', 50, '母婴用品、玩具', 0, 10, 0);
INSERT INTO `brand` VALUES (102, '德运/Devondale', '/Public/upload/brand/2016/04-01/102442251.jpg', '', '', 50, '母婴用品、玩具', 0, 10, 0);
INSERT INTO `brand` VALUES (103, '康维多/Primavita', '/Public/upload/brand/2016/04-01/103324176.jpg', '', '', 50, '母婴用品、玩具', 0, 10, 0);
INSERT INTO `brand` VALUES (104, '可瑞康/Karicare', '/Public/upload/brand/2016/04-01/104321127.jpg', '', '', 50, '母婴用品、玩具', 0, 10, 0);
INSERT INTO `brand` VALUES (105, '特福芬/Topfer', '/Public/upload/brand/2016/04-01/105312255.jpg', '', '', 50, '母婴用品、玩具', 0, 10, 0);
INSERT INTO `brand` VALUES (106, '明一/wissun', '/Public/upload/brand/2016/04-01/106399954.jpg', '', '', 50, '母婴用品、玩具', 0, 10, 0);
INSERT INTO `brand` VALUES (107, '牛奶客/Neolac', '/Public/upload/brand/2016/04-01/107720013.jpg', '', '', 50, '母婴用品、玩具', 0, 10, 0);
INSERT INTO `brand` VALUES (108, '卡瑞特兹/Karivita', '/Public/upload/brand/2016/04-01/108548654.jpg', '', '', 50, '母婴用品、玩具', 0, 10, 0);
INSERT INTO `brand` VALUES (109, '绝对宝贝/JUST BABY', '/Public/upload/brand/2016/04-01/109868933.jpg', '', '', 50, '母婴用品、玩具', 0, 10, 0);
INSERT INTO `brand` VALUES (110, '娇妍/JOLLY', '/Public/upload/brand/2016/04-01/110609024.jpg', '', '', 50, '厨卫清洁、纸、清洁剂', 0, 4, 0);
INSERT INTO `brand` VALUES (111, '威露士/Walch', '/Public/upload/brand/2016/04-01/111614874.jpg', '', '', 50, '厨卫清洁、纸、清洁剂', 0, 4, 0);
INSERT INTO `brand` VALUES (112, '滴露/Dettol', '/Public/upload/brand/2016/04-01/112169735.jpg', '', '', 50, '厨卫清洁、纸、清洁剂', 0, 4, 0);
INSERT INTO `brand` VALUES (113, '妙管家/MAGIC AMAH', '/Public/upload/brand/2016/04-01/113123071.jpg', '', '', 50, '厨卫清洁、纸、清洁剂', 0, 4, 0);
INSERT INTO `brand` VALUES (114, '威洁士/Walex', '/Public/upload/brand/2016/04-01/114141336.jpg', '', '', 50, '厨卫清洁、纸、清洁剂', 0, 4, 0);
INSERT INTO `brand` VALUES (115, '雕牌', '/Public/upload/brand/2016/04-01/115543133.jpg', '', '', 50, '厨卫清洁、纸、清洁剂', 0, 4, 0);
INSERT INTO `brand` VALUES (116, '开米/Kami', '/Public/upload/brand/2016/04-01/116731246.jpg', '', '', 50, '厨卫清洁、纸、清洁剂', 0, 4, 0);
INSERT INTO `brand` VALUES (117, '正章', '/Public/upload/brand/2016/04-01/117184045.jpg', '', '', 50, '厨卫清洁、纸、清洁剂', 0, 4, 0);
INSERT INTO `brand` VALUES (118, '榄菊', '/Public/upload/brand/2016/04-01/118318765.jpg', '', '', 50, '厨卫清洁、纸、清洁剂', 0, 4, 0);
INSERT INTO `brand` VALUES (119, '立白/Liby', '/Public/upload/brand/2016/04-01/119589166.jpg', '', '', 50, '厨卫清洁、纸、清洁剂', 0, 4, 0);
INSERT INTO `brand` VALUES (120, '狮王/LION', '/Public/upload/brand/2016/04-01/120630062.jpg', '', '', 50, '厨卫清洁、纸、清洁剂', 0, 4, 0);
INSERT INTO `brand` VALUES (121, '超能', '/Public/upload/brand/2016/04-01/121911230.jpg', '', '', 50, '厨卫清洁、纸、清洁剂', 0, 4, 0);
INSERT INTO `brand` VALUES (122, '扇牌', '/Public/upload/brand/2016/04-01/122213186.jpg', '', '', 50, '厨卫清洁、纸、清洁剂', 0, 4, 0);
INSERT INTO `brand` VALUES (123, '蓝月亮', '/Public/upload/brand/2016/04-01/123387347.jpg', '', '', 50, '厨卫清洁、纸、清洁剂', 0, 4, 0);
INSERT INTO `brand` VALUES (124, '绿伞/EVER GREEN', '/Public/upload/brand/2016/04-01/124513058.jpg', '', '', 50, '厨卫清洁、纸、清洁剂', 0, 4, 0);
INSERT INTO `brand` VALUES (125, '裕华', '/Public/upload/brand/2016/04-01/125814001.jpg', '', '', 50, '厨卫清洁、纸、清洁剂', 0, 4, 0);
INSERT INTO `brand` VALUES (126, '洁霸/Attack', '/Public/upload/brand/2016/04-01/126246475.jpg', '', '', 50, '厨卫清洁、纸、清洁剂', 0, 4, 0);
INSERT INTO `brand` VALUES (127, '小林', '/Public/upload/brand/2016/04-01/127922052.jpg', '', '', 50, '厨卫清洁、纸、清洁剂', 0, 4, 0);
INSERT INTO `brand` VALUES (128, '新雅/sunya', '/Public/upload/brand/2016/04-01/128577108.jpg', '', '', 50, '生鲜食品', 0, 0, 0);
INSERT INTO `brand` VALUES (129, '光明', '/Public/upload/brand/2016/04-01/129651733.jpg', '', '', 50, '生鲜食品', 0, 0, 0);
INSERT INTO `brand` VALUES (130, '双汇/shineway', '/Public/upload/brand/2016/04-01/130390505.jpg', '', '', 50, '生鲜食品', 0, 0, 0);
INSERT INTO `brand` VALUES (131, '鸿福堂/HUNG FOOK TONG', '/Public/upload/brand/2016/04-01/131927655.jpg', '', '', 50, '生鲜食品', 0, 0, 0);
INSERT INTO `brand` VALUES (132, '味千拉面/AJISEN RAMEN', '/Public/upload/brand/2016/04-01/132569088.jpg', '', '', 50, '生鲜食品', 0, 0, 0);
INSERT INTO `brand` VALUES (133, '雨润/Yurun', '/Public/upload/brand/2016/04-01/133733801.jpg', '', '', 50, '生鲜食品', 0, 0, 0);
INSERT INTO `brand` VALUES (134, '思念/SYNEAR', '/Public/upload/brand/2016/04-01/134167153.jpg', '', '', 50, '生鲜食品', 0, 0, 0);
INSERT INTO `brand` VALUES (135, '安佳/Anchor', '/Public/upload/brand/2016/04-01/135488531.jpg', '', '', 50, '生鲜食品', 0, 0, 0);
INSERT INTO `brand` VALUES (136, '欧德堡/OLDENBURGER', '/Public/upload/brand/2016/04-01/136685873.jpg', '', '', 50, '生鲜食品', 0, 0, 0);
INSERT INTO `brand` VALUES (137, '德运/Devondale', '/Public/upload/brand/2016/04-01/137919580.jpg', '', '', 50, '生鲜食品', 0, 0, 0);
INSERT INTO `brand` VALUES (138, '坎诺拉/Canola', '/Public/upload/brand/2016/04-01/138448294.jpg', '', '', 50, '生鲜食品', 0, 0, 0);
INSERT INTO `brand` VALUES (139, 'NPG', '/Public/upload/brand/2016/04-01/139139056.jpg', '', '', 50, '生鲜食品', 0, 0, 0);
INSERT INTO `brand` VALUES (140, '乐芝牛/The Laughing Cow', '/Public/upload/brand/2016/04-01/140674337.jpg', '', '', 50, '生鲜食品', 0, 0, 0);
INSERT INTO `brand` VALUES (141, '科尔沁/KERCHIN', '/Public/upload/brand/2016/04-01/141618444.jpg', '', '', 50, '生鲜食品', 0, 0, 0);
INSERT INTO `brand` VALUES (142, '多美鲜/Suki', '/Public/upload/brand/2016/04-01/142755801.jpg', '', '', 50, '生鲜食品', 0, 0, 0);
INSERT INTO `brand` VALUES (143, '海天下', '/Public/upload/brand/2016/04-01/143863604.jpg', '', '', 50, '生鲜食品', 0, 0, 0);
INSERT INTO `brand` VALUES (144, '湾仔码头', '/Public/upload/brand/2016/04-01/144731356.jpg', '', '', 50, '生鲜食品', 0, 0, 0);
INSERT INTO `brand` VALUES (145, '兰皇', '/Public/upload/brand/2016/04-01/145589770.jpg', '', '', 50, '生鲜食品', 0, 0, 0);
INSERT INTO `brand` VALUES (146, '华乐/huale', '/Public/upload/brand/2016/04-01/146161550.jpg', '', '', 50, '家居家纺、锅具餐具', 0, 4, 0);
INSERT INTO `brand` VALUES (147, '好伴侣/hao ban lv', '/Public/upload/brand/2016/04-01/147496551.jpg', '', '', 50, '家居家纺、锅具餐具', 0, 4, 0);
INSERT INTO `brand` VALUES (148, '养鹅人', '/Public/upload/brand/2016/04-01/148603805.jpg', '', '', 50, '家居家纺、锅具餐具', 0, 4, 0);
INSERT INTO `brand` VALUES (149, '诺伊曼/noyoke', '/Public/upload/brand/2016/04-01/149242932.jpg', '', '', 50, '家居家纺、锅具餐具', 0, 4, 0);
INSERT INTO `brand` VALUES (150, '康尔馨/Canasin', '/Public/upload/brand/2016/04-01/150887417.jpg', '', '', 50, '家居家纺、锅具餐具', 0, 4, 0);
INSERT INTO `brand` VALUES (151, '普拉达/PULADA', '/Public/upload/brand/2016/04-01/151922271.jpg', '', '', 50, '家居家纺、锅具餐具', 0, 4, 0);
INSERT INTO `brand` VALUES (152, '梦特娇/MONTAGUT', '/Public/upload/brand/2016/04-01/152488558.jpg', '', '', 50, '家居家纺、锅具餐具', 0, 4, 0);
INSERT INTO `brand` VALUES (153, '零听', '/Public/upload/brand/2016/04-01/153337304.jpg', '', '', 50, '家居家纺、锅具餐具', 0, 4, 0);
INSERT INTO `brand` VALUES (154, '莱薇/Lavie', '/Public/upload/brand/2016/04-01/154205276.jpg', '', '', 50, '家居家纺、锅具餐具', 0, 4, 0);
INSERT INTO `brand` VALUES (155, '澳西奴', '/Public/upload/brand/2016/04-01/155875140.jpg', '', '', 50, '家居家纺、锅具餐具', 0, 4, 0);
INSERT INTO `brand` VALUES (156, '吾家元素', '/Public/upload/brand/2016/04-01/156132492.jpg', '', '', 50, '家居家纺、锅具餐具', 0, 4, 0);
INSERT INTO `brand` VALUES (157, '来赉', '/Public/upload/brand/2016/04-01/157282263.jpg', '', '', 50, '家居家纺、锅具餐具', 0, 4, 0);
INSERT INTO `brand` VALUES (158, '路途乐', '/Public/upload/brand/2016/04-01/158337002.jpg', '', '', 50, '家居家纺、锅具餐具', 0, 4, 0);
INSERT INTO `brand` VALUES (159, '龙之涵', '/Public/upload/brand/2016/04-01/159439532.jpg', '', '', 50, '家居家纺、锅具餐具', 0, 4, 0);
INSERT INTO `brand` VALUES (160, '日光生活', '/Public/upload/brand/2016/04-01/160632479.jpg', '', '', 50, '家居家纺、锅具餐具', 0, 4, 0);
INSERT INTO `brand` VALUES (161, '图强/TU QIANF TOWEL', '/Public/upload/brand/2016/04-01/161837182.jpg', '', '', 50, '家居家纺、锅具餐具', 0, 4, 0);
INSERT INTO `brand` VALUES (162, '格致诚品', '/Public/upload/brand/2016/04-01/162354470.jpg', '', '', 50, '家居家纺、锅具餐具', 0, 4, 0);
INSERT INTO `brand` VALUES (163, '六朝家居/luc life', '/Public/upload/brand/2016/04-01/163149822.jpg', '', '', 50, '家居家纺、锅具餐具', 0, 4, 0);
INSERT INTO `brand` VALUES (164, '沙宣/VS', '/Public/upload/brand/2016/04-01/164835397.jpg', '', '', 50, '大小家电、厨电、汽车', 0, 2, 0);
INSERT INTO `brand` VALUES (165, '光明', '/Public/upload/brand/2016/04-01/165511437.jpg', '', '', 50, '大小家电、厨电、汽车', 0, 2, 0);
INSERT INTO `brand` VALUES (166, '日立/HITACHI', '/Public/upload/brand/2016/04-01/166679556.jpg', '', '', 50, '大小家电、厨电、汽车', 0, 2, 0);
INSERT INTO `brand` VALUES (167, '倍轻松/bero', '/Public/upload/brand/2016/04-01/167990386.jpg', '', '', 50, '大小家电、厨电、汽车', 0, 2, 0);
INSERT INTO `brand` VALUES (168, '优冠', '/Public/upload/brand/2016/04-01/168938119.jpg', '', '', 50, '大小家电、厨电、汽车', 0, 2, 0);
INSERT INTO `brand` VALUES (169, 'SKG', '/Public/upload/brand/2016/04-01/169964404.jpg', '', '', 50, '大小家电、厨电、汽车', 0, 2, 0);
INSERT INTO `brand` VALUES (170, '易简/Yijan', '/Public/upload/brand/2016/04-01/170384133.jpg', '', '', 50, '大小家电、厨电、汽车', 0, 2, 0);
INSERT INTO `brand` VALUES (171, '北欧欧慕/nathome', '/Public/upload/brand/2016/04-01/171795599.jpg', '', '', 50, '大小家电、厨电、汽车', 0, 2, 0);
INSERT INTO `brand` VALUES (172, '双鸟/twinbird', '/Public/upload/brand/2016/04-01/172687521.jpg', '', '', 50, '大小家电、厨电、汽车', 0, 2, 0);
INSERT INTO `brand` VALUES (173, '春笑', '/Public/upload/brand/2016/04-01/173705456.jpg', '', '', 50, '大小家电、厨电、汽车', 0, 2, 0);
INSERT INTO `brand` VALUES (174, '凯仕乐/KASRROW', '/Public/upload/brand/2016/04-01/174790078.jpg', '', '', 50, '大小家电、厨电、汽车', 0, 2, 0);
INSERT INTO `brand` VALUES (175, '飞利浦/PHILIPS', '/Public/upload/brand/2016/04-01/175549835.jpg', '', '', 50, '大小家电、厨电、汽车', 0, 2, 0);
INSERT INTO `brand` VALUES (176, '德国博朗/BRAUN', '/Public/upload/brand/2016/04-01/176280477.jpg', '', '', 50, '大小家电、厨电、汽车', 0, 2, 0);
INSERT INTO `brand` VALUES (177, '贝尔斯顿/BESTDAY', '/Public/upload/brand/2016/04-01/177493969.jpg', '', '', 50, '大小家电、厨电、汽车', 0, 2, 0);
INSERT INTO `brand` VALUES (178, '美克斯/MKS', '/Public/upload/brand/2016/04-01/178969265.jpg', '', '', 50, '大小家电、厨电、汽车', 0, 2, 0);
INSERT INTO `brand` VALUES (179, '康夫/kangfu', '/Public/upload/brand/2016/04-01/179787469.jpg', '', '', 50, '大小家电、厨电、汽车', 0, 2, 0);
INSERT INTO `brand` VALUES (180, '酷力', '/Public/upload/brand/2016/04-01/180363864.jpg', '', '', 50, '大小家电、厨电、汽车', 0, 2, 0);
INSERT INTO `brand` VALUES (181, '雷瓦/RIWA', '/Public/upload/brand/2016/04-01/181639318.jpg', '', '', 50, '大小家电、厨电、汽车', 0, 2, 0);
INSERT INTO `brand` VALUES (182, '惠普/hp', '/Public/upload/brand/2016/04-01/182443569.jpg', '', '', 50, '电脑、平板、办公设备', 0, 3, 0);
INSERT INTO `brand` VALUES (183, '戴尔/DELL', '/Public/upload/brand/2016/04-01/183692877.jpg', '', '', 50, '电脑、平板、办公设备', 0, 3, 0);
INSERT INTO `brand` VALUES (184, '苹果/Apple', '/Public/upload/brand/2016/04-01/184234555.jpg', '', '', 50, '电脑、平板、办公设备', 0, 3, 0);
INSERT INTO `brand` VALUES (185, '微软/Microsoft', '/Public/upload/brand/2016/04-01/185100878.jpg', '', '', 50, '电脑、平板、办公设备', 0, 3, 0);
INSERT INTO `brand` VALUES (186, '华硕/ASUS', '/Public/upload/brand/2016/04-01/186984866.jpg', '', '', 50, '电脑、平板、办公设备', 0, 3, 0);
INSERT INTO `brand` VALUES (187, 'ThinkPad', '/Public/upload/brand/2016/04-01/187800433.jpg', '', '', 50, '电脑、平板、办公设备', 0, 3, 0);
INSERT INTO `brand` VALUES (188, '清华同方', '/Public/upload/brand/2016/04-01/188539425.jpg', '', '', 50, '电脑、平板、办公设备', 0, 3, 0);
INSERT INTO `brand` VALUES (189, '金士顿/Kingston', '/Public/upload/brand/2016/04-01/189988024.jpg', '', '', 50, '电脑、平板、办公设备', 0, 3, 0);
INSERT INTO `brand` VALUES (190, '微星/MSI', '/Public/upload/brand/2016/04-01/190315029.jpg', '', '', 50, '电脑、平板、办公设备', 0, 3, 0);
INSERT INTO `brand` VALUES (191, '开馨宝/KAI XIN BAO', '/Public/upload/brand/2016/04-01/191294512.jpg', '', '', 50, '电脑、平板、办公设备', 0, 3, 0);
INSERT INTO `brand` VALUES (192, '优派/ViewSonic', '/Public/upload/brand/2016/04-01/192575350.jpg', '', '', 50, '电脑、平板、办公设备', 0, 3, 0);
INSERT INTO `brand` VALUES (193, '联想/Lenovo', '/Public/upload/brand/2016/04-01/193460131.jpg', '', '', 50, '电脑、平板、办公设备', 0, 3, 0);
INSERT INTO `brand` VALUES (194, '宏碁/acer', '/Public/upload/brand/2016/04-01/194205935.jpg', '', '', 50, '电脑、平板、办公设备', 0, 3, 0);
INSERT INTO `brand` VALUES (195, '西部数据/WD', '/Public/upload/brand/2016/04-01/195609490.jpg', '', '', 50, '电脑、平板、办公设备', 0, 3, 0);
INSERT INTO `brand` VALUES (196, '三星/SAMSUNG', '/Public/upload/brand/2016/04-01/196989205.jpg', '', '', 50, '电脑、平板、办公设备', 0, 3, 0);
INSERT INTO `brand` VALUES (197, '索尼/SONY', '/Public/upload/brand/2016/04-01/197626574.jpg', '', '', 50, '电脑、平板、办公设备', 0, 3, 0);
INSERT INTO `brand` VALUES (198, '诺基亚/NOKIA', '/Public/upload/brand/2016/04-01/198179458.jpg', '', '', 50, '电脑、平板、办公设备', 0, 3, 0);
INSERT INTO `brand` VALUES (199, '明基/BenQ', '/Public/upload/brand/2016/04-01/199929742.jpg', '', '', 50, '电脑、平板、办公设备', 0, 3, 0);
INSERT INTO `brand` VALUES (200, '花花公子/PLAYBOY', '/Public/upload/brand/2016/04-01/200177865.jpg', '', '', 50, '服饰内衣、鞋靴童装', 0, 5, 0);
INSERT INTO `brand` VALUES (201, '阿迪达斯/adidas', '/Public/upload/brand/2016/04-01/201446728.jpg', '', '', 50, '服饰内衣、鞋靴童装', 0, 5, 0);
INSERT INTO `brand` VALUES (202, '波司登/Bosideng', '/Public/upload/brand/2016/04-01/202207473.jpg', '', '', 50, '服饰内衣、鞋靴童装', 0, 5, 0);
INSERT INTO `brand` VALUES (203, '唐狮/Tonlion', '/Public/upload/brand/2016/04-01/203889642.jpg', '', '', 50, '服饰内衣、鞋靴童装', 0, 5, 0);
INSERT INTO `brand` VALUES (204, '雅鹿', '/Public/upload/brand/2016/04-01/204588204.jpg', '', '', 50, '服饰内衣、鞋靴童装', 0, 5, 0);
INSERT INTO `brand` VALUES (205, '真维斯/Jeanswest', '/Public/upload/brand/2016/04-01/205229968.jpg', '', '', 50, '服饰内衣、鞋靴童装', 0, 5, 0);
INSERT INTO `brand` VALUES (206, '秋水伊人', '/Public/upload/brand/2016/04-01/206711856.jpg', '', '', 50, '服饰内衣、鞋靴童装', 0, 5, 0);
INSERT INTO `brand` VALUES (207, '安踏/ANTA', '/Public/upload/brand/2016/04-01/207573565.jpg', '', '', 50, '服饰内衣、鞋靴童装', 0, 5, 0);
INSERT INTO `brand` VALUES (208, '宝娜斯', '/Public/upload/brand/2016/04-01/208617098.jpg', '', '', 50, '服饰内衣、鞋靴童装', 0, 5, 0);
INSERT INTO `brand` VALUES (209, 'ONEBUYE', '/Public/upload/brand/2016/04-01/209735668.jpg', '', '', 50, '服饰内衣、鞋靴童装', 0, 5, 0);
INSERT INTO `brand` VALUES (210, '初语/TOYOUTH', '/Public/upload/brand/2016/04-01/210764480.jpg', '', '', 50, '服饰内衣、鞋靴童装', 0, 5, 0);
INSERT INTO `brand` VALUES (211, '雅可希/YAKEXI', '/Public/upload/brand/2016/04-01/211515887.jpg', '', '', 50, '服饰内衣、鞋靴童装', 0, 5, 0);
INSERT INTO `brand` VALUES (212, '幽迷/Youmi', '/Public/upload/brand/2016/04-01/212911422.jpg', '', '', 50, '服饰内衣、鞋靴童装', 0, 5, 0);
INSERT INTO `brand` VALUES (213, '梦娜/MengNa', '/Public/upload/brand/2016/04-01/213473205.jpg', '', '', 50, '服饰内衣、鞋靴童装', 0, 5, 0);
INSERT INTO `brand` VALUES (214, 'A21', '/Public/upload/brand/2016/04-01/214787222.jpg', '', '', 50, '服饰内衣、鞋靴童装', 0, 5, 0);
INSERT INTO `brand` VALUES (215, 'OopsCiah', '/Public/upload/brand/2016/04-01/215800982.jpg', '', '', 50, '服饰内衣、鞋靴童装', 0, 5, 0);
INSERT INTO `brand` VALUES (216, '若美/nomi', '/Public/upload/brand/2016/04-01/216768051.jpg', '', '', 50, '服饰内衣、鞋靴童装', 0, 5, 0);
INSERT INTO `brand` VALUES (217, '森马/Semir', '/Public/upload/brand/2016/04-01/217201953.jpg', '', '', 50, '服饰内衣、鞋靴童装', 0, 5, 0);
INSERT INTO `brand` VALUES (218, '川崎/kawasaki', '/Public/upload/brand/2016/04-01/218751956.jpg', '', '', 50, '运动户外', 0, 8, 0);
INSERT INTO `brand` VALUES (219, '锐步/Reebok', '/Public/upload/brand/2016/04-01/219163226.jpg', '', '', 50, '运动户外', 0, 8, 0);
INSERT INTO `brand` VALUES (220, '耐克/NIKE', '/Public/upload/brand/2016/04-01/220833859.jpg', '', '', 50, '运动户外', 0, 8, 0);
INSERT INTO `brand` VALUES (221, '阿迪达斯/adidas', '/Public/upload/brand/2016/04-01/221231286.jpg', '', '', 50, '运动户外', 0, 8, 0);
INSERT INTO `brand` VALUES (222, '迪士尼/Disney', '/Public/upload/brand/2016/04-01/222180557.jpg', '', '', 50, '运动户外', 0, 8, 0);
INSERT INTO `brand` VALUES (223, '特步/Xtep', '/Public/upload/brand/2016/04-01/223486993.jpg', '', '', 50, '运动户外', 0, 8, 0);
INSERT INTO `brand` VALUES (224, '361°', '/Public/upload/brand/2016/04-01/224405722.jpg', '', '', 50, '运动户外', 0, 8, 0);
INSERT INTO `brand` VALUES (225, '回力/Warrior', '/Public/upload/brand/2016/04-01/225420581.jpg', '', '', 50, '运动户外', 0, 8, 0);
INSERT INTO `brand` VALUES (226, '匡威/Converse', '/Public/upload/brand/2016/04-01/226844900.jpg', '', '', 50, '运动户外', 0, 8, 0);
INSERT INTO `brand` VALUES (227, '骆驼/CAMEL', '/Public/upload/brand/2016/04-01/227506658.jpg', '', '', 50, '运动户外', 0, 8, 0);
INSERT INTO `brand` VALUES (228, '探路者/Toread', '/Public/upload/brand/2016/04-01/228130514.jpg', '', '', 50, '运动户外', 0, 8, 0);
INSERT INTO `brand` VALUES (229, '凯速', '/Public/upload/brand/2016/04-01/229179211.jpg', '', '', 50, '运动户外', 0, 8, 0);
INSERT INTO `brand` VALUES (230, 'NIKKO', '/Public/upload/brand/2016/04-01/230466860.jpg', '', '', 50, '运动户外', 0, 8, 0);
INSERT INTO `brand` VALUES (231, '安踏/ANTA', '/Public/upload/brand/2016/04-01/231306597.jpg', '', '', 50, '运动户外', 0, 8, 0);
INSERT INTO `brand` VALUES (232, '哥伦比亚/Columbia', '/Public/upload/brand/2016/04-01/232205111.jpg', '', '', 50, '运动户外', 0, 8, 0);
INSERT INTO `brand` VALUES (233, '彪马/Puma', '/Public/upload/brand/2016/04-01/233266552.jpg', '', '', 50, '运动户外', 0, 8, 0);
INSERT INTO `brand` VALUES (234, '骆驼牌', '/Public/upload/brand/2016/04-01/234818313.jpg', '', '', 50, '运动户外', 0, 8, 0);
INSERT INTO `brand` VALUES (235, '自由兵/FREE SOLDIER', '/Public/upload/brand/2016/04-01/235421185.jpg', '', '', 50, '运动户外', 0, 8, 0);
INSERT INTO `brand` VALUES (236, '潘高寿', '/Public/upload/brand/2016/04-01/236376388.jpg', '', '', 50, '保健滋补、器械计生', 0, 0, 0);
INSERT INTO `brand` VALUES (237, '昂立/Onlly', '/Public/upload/brand/2016/04-01/237991979.jpg', '', '', 50, '保健滋补、器械计生', 0, 0, 0);
INSERT INTO `brand` VALUES (238, '恒寿堂/HENG SHOU TANG', '/Public/upload/brand/2016/04-01/238521133.jpg', '', '', 50, '保健滋补、器械计生', 0, 0, 0);
INSERT INTO `brand` VALUES (239, '养生堂', '/Public/upload/brand/2016/04-01/239934796.jpg', '', '', 50, '保健滋补、器械计生', 0, 0, 0);
INSERT INTO `brand` VALUES (240, '三叶', '/Public/upload/brand/2016/04-01/240841220.jpg', '', '', 50, '保健滋补、器械计生', 0, 0, 0);
INSERT INTO `brand` VALUES (241, '御生堂', '/Public/upload/brand/2016/04-01/241414868.jpg', '', '', 50, '保健滋补、器械计生', 0, 0, 0);
INSERT INTO `brand` VALUES (242, '泰尔', '/Public/upload/brand/2016/04-01/242447195.jpg', '', '', 50, '保健滋补、器械计生', 0, 0, 0);
INSERT INTO `brand` VALUES (243, '碧生源/Besunyen', '/Public/upload/brand/2016/04-01/243581805.jpg', '', '', 50, '保健滋补、器械计生', 0, 0, 0);
INSERT INTO `brand` VALUES (244, '益力健', '/Public/upload/brand/2016/04-01/244446481.jpg', '', '', 50, '保健滋补、器械计生', 0, 0, 0);
INSERT INTO `brand` VALUES (245, '云南白药/YunnanBaiyao', '/Public/upload/brand/2016/04-01/245644592.jpg', '', '', 50, '保健滋补、器械计生', 0, 0, 0);
INSERT INTO `brand` VALUES (246, '初元', '/Public/upload/brand/2016/04-01/246118374.jpg', '', '', 50, '保健滋补、器械计生', 0, 0, 0);
INSERT INTO `brand` VALUES (247, '红桃K', '/Public/upload/brand/2016/04-01/247346588.jpg', '', '', 50, '保健滋补、器械计生', 0, 0, 0);
INSERT INTO `brand` VALUES (248, '好医生', '/Public/upload/brand/2016/04-01/248289047.jpg', '', '', 50, '保健滋补、器械计生', 0, 0, 0);
INSERT INTO `brand` VALUES (249, '三金', '/Public/upload/brand/2016/04-01/249640527.jpg', '', '', 50, '保健滋补、器械计生', 0, 0, 0);
INSERT INTO `brand` VALUES (250, '纽曼思/Nemans', '/Public/upload/brand/2016/04-01/250406546.jpg', '', '', 50, '保健滋补、器械计生', 0, 0, 0);
INSERT INTO `brand` VALUES (251, '凯镛', '/Public/upload/brand/2016/04-01/251763519.jpg', '', '', 50, '保健滋补、器械计生', 0, 0, 0);
INSERT INTO `brand` VALUES (252, '广元堂', '/Public/upload/brand/2016/04-01/252115792.jpg', '', '', 50, '保健滋补、器械计生', 0, 0, 0);
INSERT INTO `brand` VALUES (253, 'UTU', '/Public/upload/brand/2016/04-01/253712048.jpg', '', '', 50, '保健滋补、器械计生', 0, 0, 0);
INSERT INTO `brand` VALUES (254, 'ELLE', '/Public/upload/brand/2016/04-01/254833584.jpg', '', '', 50, '箱包皮具', 0, 7, 0);
INSERT INTO `brand` VALUES (255, '瑞士军刀/SWISSGEAR', '/Public/upload/brand/2016/04-01/255116973.jpg', '', '', 50, '箱包皮具', 0, 7, 0);
INSERT INTO `brand` VALUES (256, '古驰/Gucci', '/Public/upload/brand/2016/04-01/256123593.jpg', '', '', 50, '箱包皮具', 0, 7, 0);
INSERT INTO `brand` VALUES (257, '宝缇嘉/Bottega Veneta', '/Public/upload/brand/2016/04-01/257718530.jpg', '', '', 50, '箱包皮具', 0, 7, 0);
INSERT INTO `brand` VALUES (258, '缪缪/MIU MIU', '/Public/upload/brand/2016/04-01/258471365.jpg', '', '', 50, '箱包皮具', 0, 7, 0);
INSERT INTO `brand` VALUES (259, '梦特娇/MONTAGUT', '/Public/upload/brand/2016/04-01/259741326.jpg', '', '', 50, '箱包皮具', 0, 7, 0);
INSERT INTO `brand` VALUES (260, '苹果/Apple', '/Public/upload/brand/2016/04-01/260959323.jpg', '', '', 50, '箱包皮具', 0, 7, 0);
INSERT INTO `brand` VALUES (261, '香奈儿/CHANEL', '/Public/upload/brand/2016/04-01/261969348.jpg', '', '', 50, '箱包皮具', 0, 7, 0);
INSERT INTO `brand` VALUES (262, '赛琳/CELINE', '/Public/upload/brand/2016/04-01/262641763.jpg', '', '', 50, '箱包皮具', 0, 7, 0);
INSERT INTO `brand` VALUES (263, '爱华仕/Oiwas', '/Public/upload/brand/2016/04-01/263920953.jpg', '', '', 50, '箱包皮具', 0, 7, 0);
INSERT INTO `brand` VALUES (264, '阿玛尼/EMPORIO ARMANI', '/Public/upload/brand/2016/04-01/264119857.jpg', '', '', 50, '箱包皮具', 0, 7, 0);
INSERT INTO `brand` VALUES (265, '贝尔/BEIER', '/Public/upload/brand/2016/04-01/265423876.jpg', '', '', 50, '箱包皮具', 0, 7, 0);
INSERT INTO `brand` VALUES (266, 'Amii', '/Public/upload/brand/2016/04-01/266416653.jpg', '', '', 50, '箱包皮具', 0, 7, 0);
INSERT INTO `brand` VALUES (267, '波斯丹顿/Bostanten', '/Public/upload/brand/2016/04-01/267290228.jpg', '', '', 50, '箱包皮具', 0, 7, 0);
INSERT INTO `brand` VALUES (268, '阿札/A-ZA', '/Public/upload/brand/2016/04-01/268952072.jpg', '', '', 50, '箱包皮具', 0, 7, 0);
INSERT INTO `brand` VALUES (269, '克路驰/CLUCI', '/Public/upload/brand/2016/04-01/269291491.jpg', '', '', 50, '箱包皮具', 0, 7, 0);
INSERT INTO `brand` VALUES (270, 'DOODOO', '/Public/upload/brand/2016/04-01/270217910.jpg', '', '', 50, '箱包皮具', 0, 7, 0);
INSERT INTO `brand` VALUES (271, '拉菲斯汀/Lafestin', '/Public/upload/brand/2016/04-01/271733526.jpg', '', '', 50, '箱包皮具', 0, 7, 0);
INSERT INTO `brand` VALUES (272, 'ELLE', '/Public/upload/brand/2016/04-01/272952841.jpg', '', '', 50, '珠宝/饰品/手表/眼镜', 0, 7, 0);
INSERT INTO `brand` VALUES (273, '浪琴/Longines', '/Public/upload/brand/2016/04-01/273431567.jpg', '', '', 50, '珠宝/饰品/手表/眼镜', 0, 7, 0);
INSERT INTO `brand` VALUES (274, '巴宝莉/Burberry', '/Public/upload/brand/2016/04-01/274917410.jpg', '', '', 50, '珠宝/饰品/手表/眼镜', 0, 7, 0);
INSERT INTO `brand` VALUES (275, '变形金刚/Transformers', '/Public/upload/brand/2016/04-01/275985223.jpg', '', '', 50, '珠宝/饰品/手表/眼镜', 0, 7, 0);
INSERT INTO `brand` VALUES (276, '哆啦A梦/Doraemon', '/Public/upload/brand/2016/04-01/276769039.jpg', '', '', 50, '珠宝/饰品/手表/眼镜', 0, 7, 0);
INSERT INTO `brand` VALUES (277, '施华洛世奇/Swarovski', '/Public/upload/brand/2016/04-01/277253479.jpg', '', '', 50, '珠宝/饰品/手表/眼镜', 0, 7, 0);
INSERT INTO `brand` VALUES (278, 'GUESS', '/Public/upload/brand/2016/04-01/278237026.jpg', '', '', 50, '珠宝/饰品/手表/眼镜', 0, 7, 0);
INSERT INTO `brand` VALUES (279, '万宝龙/Montblanc', '/Public/upload/brand/2016/04-01/279229693.jpg', '', '', 50, '珠宝/饰品/手表/眼镜', 0, 7, 0);
INSERT INTO `brand` VALUES (280, '蔻驰/COACH', '/Public/upload/brand/2016/04-01/280597543.jpg', '', '', 50, '珠宝/饰品/手表/眼镜', 0, 7, 0);
INSERT INTO `brand` VALUES (281, '海鸥表/Sea-Gull', '/Public/upload/brand/2016/04-01/281516601.jpg', '', '', 50, '珠宝/饰品/手表/眼镜', 0, 7, 0);
INSERT INTO `brand` VALUES (282, '迪士尼/Disney', '/Public/upload/brand/2016/04-01/282848635.jpg', '', '', 50, '珠宝/饰品/手表/眼镜', 0, 7, 0);
INSERT INTO `brand` VALUES (283, '天梭/Tissot', '/Public/upload/brand/2016/04-01/283801312.jpg', '', '', 50, '珠宝/饰品/手表/眼镜', 0, 7, 0);
INSERT INTO `brand` VALUES (284, '天王表/TIAN WANG', '/Public/upload/brand/2016/04-01/284185226.jpg', '', '', 50, '珠宝/饰品/手表/眼镜', 0, 7, 0);
INSERT INTO `brand` VALUES (285, '李维斯/Levi s', '/Public/upload/brand/2016/04-01/285630310.jpg', '', '', 50, '珠宝/饰品/手表/眼镜', 0, 7, 0);
INSERT INTO `brand` VALUES (286, '阿玛尼/EMPORIO ARMANI', '/Public/upload/brand/2016/04-01/286474111.jpg', '', '', 50, '珠宝/饰品/手表/眼镜', 0, 7, 0);
INSERT INTO `brand` VALUES (287, '梅花/Titoni', '/Public/upload/brand/2016/04-01/287984454.jpg', '', '', 50, '珠宝/饰品/手表/眼镜', 0, 7, 0);
INSERT INTO `brand` VALUES (288, '杜嘉班纳/DG', '/Public/upload/brand/2016/04-01/288628964.jpg', '', '', 50, '珠宝/饰品/手表/眼镜', 0, 7, 0);
INSERT INTO `brand` VALUES (289, 'BUREI', '/Public/upload/brand/2016/04-01/289453979.jpg', '', '', 50, '珠宝/饰品/手表/眼镜', 0, 7, 0);
INSERT INTO `brand` VALUES (290, '友邦', '/Public/upload/brand/2016/04-01/290885330.jpg', '', '', 50, '图书杂志', 0, 11, 0);
INSERT INTO `brand` VALUES (291, '一生一信/Infeel.Me', '/Public/upload/brand/2016/04-01/291413494.jpg', '', '', 50, '图书杂志', 0, 11, 0);
INSERT INTO `brand` VALUES (292, '贴贴', '/Public/upload/brand/2016/04-01/292775631.jpg', '', '', 50, '图书杂志', 0, 11, 0);
INSERT INTO `brand` VALUES (293, '伊莱克斯/Electrolux', '/Public/upload/brand/2016/04-01/293296984.jpg', '', '', 50, '创意礼品、礼品卡', 0, 0, 0);
INSERT INTO `brand` VALUES (294, '乐比比/LEBIBI', '/Public/upload/brand/2016/04-01/294704165.jpg', '', '', 50, '创意礼品、礼品卡', 0, 0, 0);
INSERT INTO `brand` VALUES (295, '大富翁/Uncle Wang', '/Public/upload/brand/2016/04-01/295972808.jpg', '', '', 50, '创意礼品、礼品卡', 0, 0, 0);
INSERT INTO `brand` VALUES (296, '秉信', '/Public/upload/brand/2016/04-01/296822103.jpg', '', '', 50, '创意礼品、礼品卡', 0, 0, 0);
INSERT INTO `brand` VALUES (297, '福库/Cuckoo', '/Public/upload/brand/2016/04-01/297918701.jpg', '', '', 50, '创意礼品、礼品卡', 0, 0, 0);
INSERT INTO `brand` VALUES (298, '灿坤/EUPA', '/Public/upload/brand/2016/04-01/298802493.jpg', '', '', 50, '创意礼品、礼品卡', 0, 0, 0);
INSERT INTO `brand` VALUES (299, '利仁/LIVEN', '/Public/upload/brand/2016/04-01/299496771.jpg', '', '', 50, '创意礼品、礼品卡', 0, 0, 0);
INSERT INTO `brand` VALUES (300, '开馨宝/KAI XIN BAO', '/Public/upload/brand/2016/04-01/300515255.jpg', '', '', 50, '创意礼品、礼品卡', 0, 0, 0);
INSERT INTO `brand` VALUES (301, '宝视达', '/Public/upload/brand/2016/04-01/301828503.jpg', '', '', 50, '创意礼品、礼品卡', 0, 0, 0);
INSERT INTO `brand` VALUES (302, '香百年/Carori', '/Public/upload/brand/2016/04-01/302702188.jpg', '', '', 50, '创意礼品、礼品卡', 0, 0, 0);
INSERT INTO `brand` VALUES (303, '内野/UCHINO', '/Public/upload/brand/2016/04-01/303869757.jpg', '', '', 50, '创意礼品、礼品卡', 0, 0, 0);
INSERT INTO `brand` VALUES (304, '悠嘻猴', '/Public/upload/brand/2016/04-01/304951962.jpg', '', '', 50, '创意礼品、礼品卡', 0, 0, 0);
INSERT INTO `brand` VALUES (305, '卓朗/ZoomLand', '/Public/upload/brand/2016/04-01/305785766.jpg', '', '', 50, '创意礼品、礼品卡', 0, 0, 0);
INSERT INTO `brand` VALUES (306, '小熊/Bear', '/Public/upload/brand/2016/04-01/306375125.jpg', '', '', 50, '创意礼品、礼品卡', 0, 0, 0);
INSERT INTO `brand` VALUES (307, '九阳/Joyoung', '/Public/upload/brand/2016/04-01/307826141.jpg', '', '', 50, '创意礼品、礼品卡', 0, 0, 0);
INSERT INTO `brand` VALUES (308, '奥迪双钻/AULDEY', '/Public/upload/brand/2016/04-01/308979098.jpg', '', '', 50, '创意礼品、礼品卡', 0, 0, 0);
INSERT INTO `brand` VALUES (309, '澳贝/auby', '/Public/upload/brand/2016/04-01/309199865.jpg', '', '', 50, '创意礼品、礼品卡', 0, 0, 0);
INSERT INTO `brand` VALUES (310, '斐利比/Philippi', '/Public/upload/brand/2016/04-01/310243179.jpg', '', '', 50, '创意礼品、礼品卡', 0, 0, 0);
INSERT INTO `brand` VALUES (311, '邦迪/BAND-AID', '/Public/upload/brand/2016/04-01/311450299.jpg', '', '', 50, '中西药品、医疗器械', 0, 0, 0);
INSERT INTO `brand` VALUES (312, '云南白药/YunnanBaiyao', '/Public/upload/brand/2016/04-01/312793539.jpg', '', '', 50, '中西药品、医疗器械', 0, 0, 0);
INSERT INTO `brand` VALUES (313, '信乐/SINO', '/Public/upload/brand/2016/04-01/313730175.jpg', '', '', 50, '中西药品、医疗器械', 0, 0, 0);
INSERT INTO `brand` VALUES (314, '海氏海诺/HAINUO', '/Public/upload/brand/2016/04-01/314278225.jpg', '', '', 50, '中西药品、医疗器械', 0, 0, 0);
INSERT INTO `brand` VALUES (315, '兵兵', '/Public/upload/brand/2016/04-01/315276605.jpg', '', '', 50, '中西药品、医疗器械', 0, 0, 0);
INSERT INTO `brand` VALUES (316, '西门子/SIEMENS', '/Public/upload/brand/2016/04-01/316142160.jpg', '', '', 50, '中西药品、医疗器械', 0, 0, 0);
INSERT INTO `brand` VALUES (317, '强生/Johnson', '/Public/upload/brand/2016/04-01/317886071.jpg', '', '', 50, '中西药品、医疗器械', 0, 0, 0);
INSERT INTO `brand` VALUES (318, '零听', '/Public/upload/brand/2016/04-01/318902139.jpg', '', '', 50, '中西药品、医疗器械', 0, 0, 0);
INSERT INTO `brand` VALUES (319, '康扉/KANGFEI', '/Public/upload/brand/2016/04-01/319389434.jpg', '', '', 50, '中西药品、医疗器械', 0, 0, 0);
INSERT INTO `brand` VALUES (320, '仙鹤牌', '/Public/upload/brand/2016/04-01/320121835.jpg', '', '', 50, '中西药品、医疗器械', 0, 0, 0);
INSERT INTO `brand` VALUES (321, '金奥力', '/Public/upload/brand/2016/04-01/321526928.jpg', '', '', 50, '中西药品、医疗器械', 0, 0, 0);
INSERT INTO `brand` VALUES (322, '欧姆龙/Omron', '/Public/upload/brand/2016/04-01/322286795.jpg', '', '', 50, '中西药品、医疗器械', 0, 0, 0);
INSERT INTO `brand` VALUES (323, '鱼跃/yuyue', '/Public/upload/brand/2016/04-01/323423162.jpg', '', '', 50, '中西药品、医疗器械', 0, 0, 0);
INSERT INTO `brand` VALUES (324, '雅培/Abbott', '/Public/upload/brand/2016/04-01/324479440.jpg', '', '', 50, '中西药品、医疗器械', 0, 0, 0);
INSERT INTO `brand` VALUES (325, '龙贝儿/Loboor', '/Public/upload/brand/2016/04-01/325862121.jpg', '', '', 50, '中西药品、医疗器械', 0, 0, 0);
INSERT INTO `brand` VALUES (326, '迈克大夫/microlife', '/Public/upload/brand/2016/04-01/326654067.jpg', '', '', 50, '中西药品、医疗器械', 0, 0, 0);
INSERT INTO `brand` VALUES (327, '爱科来/arkray', '/Public/upload/brand/2016/04-01/327462164.jpg', '', '', 50, '中西药品、医疗器械', 0, 0, 0);
INSERT INTO `brand` VALUES (328, '爱安德/AND', '/Public/upload/brand/2016/04-01/328511849.jpg', '', '', 50, '中西药品、医疗器械', 0, 0, 0);
INSERT INTO `brand` VALUES (329, '星巴克/STARBUCKS', '/Public/upload/brand/2016/04-01/329851025.jpg', '', '', 50, '海购商品', 0, 0, 0);
INSERT INTO `brand` VALUES (330, '卡夫/KRAFT', '/Public/upload/brand/2016/04-01/330175833.jpg', '', '', 50, '海购商品', 0, 0, 0);
INSERT INTO `brand` VALUES (331, '花王/Merries', '/Public/upload/brand/2016/04-01/331140814.jpg', '', '', 50, '海购商品', 0, 0, 0);
INSERT INTO `brand` VALUES (332, '善存/Centrum', '/Public/upload/brand/2016/04-01/332865939.jpg', '', '', 50, '海购商品', 0, 0, 0);
INSERT INTO `brand` VALUES (333, 'LG', '/Public/upload/brand/2016/04-01/333803015.jpg', '', '', 50, '海购商品', 0, 0, 0);
INSERT INTO `brand` VALUES (334, '钙尔奇/Caltrate', '/Public/upload/brand/2016/04-01/334173965.jpg', '', '', 50, '海购商品', 0, 0, 0);
INSERT INTO `brand` VALUES (335, '瑞士莲/Lindt', '/Public/upload/brand/2016/04-01/335443487.jpg', '', '', 50, '海购商品', 0, 0, 0);
INSERT INTO `brand` VALUES (336, '宝氏/Post', '/Public/upload/brand/2016/04-01/336838583.jpg', '', '', 50, '海购商品', 0, 0, 0);
INSERT INTO `brand` VALUES (337, '德运/Devondale', '/Public/upload/brand/2016/04-01/337577465.jpg', '', '', 50, '海购商品', 0, 0, 0);
INSERT INTO `brand` VALUES (338, '大王/GOO.N', '/Public/upload/brand/2016/04-01/338620339.jpg', '', '', 50, '海购商品', 0, 0, 0);
INSERT INTO `brand` VALUES (339, '雀巢/Nestle', '/Public/upload/brand/2016/04-01/339104559.jpg', '', '', 50, '海购商品', 0, 0, 0);
INSERT INTO `brand` VALUES (340, '和光堂/WaKODO', '/Public/upload/brand/2016/04-01/340176657.jpg', '', '', 50, '海购商品', 0, 0, 0);
INSERT INTO `brand` VALUES (341, '可瑞康/Karicare', '/Public/upload/brand/2016/04-01/341483752.jpg', '', '', 50, '海购商品', 0, 0, 0);
INSERT INTO `brand` VALUES (342, '夏依/summer eve', '/Public/upload/brand/2016/04-01/342136831.jpg', '', '', 50, '海购商品', 0, 0, 0);
INSERT INTO `brand` VALUES (343, '亨氏/Heinz', '/Public/upload/brand/2016/04-01/343108404.jpg', '', '', 50, '海购商品', 0, 0, 0);
INSERT INTO `brand` VALUES (344, '谜尚/MISSHA', '/Public/upload/brand/2016/04-01/344877035.jpg', '', '', 50, '海购商品', 0, 0, 0);
INSERT INTO `brand` VALUES (345, '澳佳宝/BLACKMORES', '/Public/upload/brand/2016/04-01/345381250.jpg', '', '', 50, '海购商品', 0, 0, 0);
INSERT INTO `brand` VALUES (346, '诺优能/Nutrilon', '/Public/upload/brand/2016/04-01/346495315.jpg', '', '', 50, '海购商品', 0, 0, 0);
INSERT INTO `brand` VALUES (347, '创维/Skyworth', '/Public/upload/brand/2016/04-01/347586936.jpg', '凝聚健康科技', 'www.Skyworth.com', 50, '手机、数码、配件', 1, 1, 0);
INSERT INTO `brand` VALUES (348, '创维/Skyworth', '/Public/upload/brand/2016/04-01/347586936.jpg', '凝聚健康科技', 'www.Skyworth.com', 50, '手机、数码、配件', 1, 1, 0);
COMMIT;

-- ----------------------------
-- Table structure for brand_new
-- ----------------------------
DROP TABLE IF EXISTS `brand_new`;
CREATE TABLE `brand_new` (
  `id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL DEFAULT '',
  `logo` varchar(80) NOT NULL DEFAULT '',
  `describe` text NOT NULL,
  `url` varchar(255) NOT NULL DEFAULT '',
  `sort` int(11) NOT NULL DEFAULT '50',
  `cat_name` varchar(128) DEFAULT '',
  `parent_cat_id` int(11) DEFAULT '0',
  `cat_id` int(11) DEFAULT '0',
  `is_hot` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of brand_new
-- ----------------------------
BEGIN;
INSERT INTO `brand_new` VALUES (1, '华为/HUAWEI', '/Public/upload/brand/2016/04-01/1584936.jpg', '1111111111', '', 50, '手机、数码、配件', 1, 12, 0);
INSERT INTO `brand_new` VALUES (4, '索尼/SONY', '/Public/upload/brand/2016/04-01/4178854.jpg', '', '', 50, '手机、数码、配件', 1, 104, 0);
INSERT INTO `brand_new` VALUES (5, '诺基亚/NOKIA', '/Public/upload/brand/2016/04-01/5498254.jpg', '', '', 50, '手机、数码、配件', 1, 1, 0);
INSERT INTO `brand_new` VALUES (6, 'TCL', '/Public/upload/brand/2016/04-01/6592544.jpg', '', '', 50, '手机、数码、配件', 1, 1, 0);
INSERT INTO `brand_new` VALUES (7, '飞利浦/PHILIPS', '/Public/upload/brand/2016/04-01/7956109.jpg', '', '', 50, '手机、数码、配件', 1, 1, 0);
INSERT INTO `brand_new` VALUES (8, 'OPPO', '/Public/upload/brand/2016/04-01/8351889.jpg', '', '', 50, '手机、数码、配件', 1, 1, 0);
INSERT INTO `brand_new` VALUES (9, '苹果/Apple', '/Public/upload/brand/2016/04-01/9515283.jpg', '', '', 50, '手机、数码、配件', 1, 1, 0);
INSERT INTO `brand_new` VALUES (14, '海尔/Haier', '/Public/upload/brand/2016/04-01/14393692.jpg', '', '', 50, '手机、数码、配件', 2, 0, 0);
INSERT INTO `brand_new` VALUES (15, '三星/SAMSUNG', '/Public/upload/brand/2016/04-01/15993682.jpg', '', '', 50, '手机、数码、配件', 2, 0, 0);
INSERT INTO `brand_new` VALUES (19, '海信/Hisense', '/Public/upload/brand/2016/04-01/19907879.jpg', '', '', 50, '手机、数码、配件', 2, 0, 0);
INSERT INTO `brand_new` VALUES (347, '创维/Skyworth', '/Public/upload/brand/2016/04-01/347586936.jpg', '凝聚健康科技', 'www.Skyworth.com', 50, '手机、数码、配件', 1, 1, 0);
INSERT INTO `brand_new` VALUES (348, '创维/Skyworth', '/Public/upload/brand/2016/04-01/347586936.jpg', '凝聚健康科技', 'www.Skyworth.com', 50, '手机、数码、配件', 1, 1, 0);
COMMIT;

-- ----------------------------
-- Table structure for dept
-- ----------------------------
DROP TABLE IF EXISTS `dept`;
CREATE TABLE `dept` (
  `DEPTNO` int(10) NOT NULL,
  `DNAME` varchar(50) DEFAULT NULL,
  `LOC` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dept
-- ----------------------------
BEGIN;
INSERT INTO `dept` VALUES (77, '市场拓展部', 'JILIN');
INSERT INTO `dept` VALUES (10, 'ACCOUNTING', 'NEW YORK');
INSERT INTO `dept` VALUES (20, 'ACCOUNTING', 'DALLAS');
INSERT INTO `dept` VALUES (30, 'SALES', 'CHICAGO');
INSERT INTO `dept` VALUES (40, 'OPERATIONS', 'BOSTON');
COMMIT;

-- ----------------------------
-- Table structure for emp
-- ----------------------------
DROP TABLE IF EXISTS `emp`;
CREATE TABLE `emp` (
  `empno` int(10) NOT NULL,
  `ename` varchar(50) DEFAULT NULL,
  `job` varchar(50) DEFAULT NULL,
  `mgr` int(10) DEFAULT NULL,
  `hirdate` varchar(10) DEFAULT NULL,
  `sal` int(10) DEFAULT NULL,
  `comm` int(10) DEFAULT NULL,
  `deptno` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of emp
-- ----------------------------
BEGIN;
INSERT INTO `emp` VALUES (8888, '阿朱', 'CLERK', NULL, '2017-06-01', NULL, NULL, 10);
INSERT INTO `emp` VALUES (9000, '东方', NULL, NULL, NULL, NULL, NULL, 20);
INSERT INTO `emp` VALUES (7369, 'SMITH', 'CLERK', 7902, '1980-12-17', 800, NULL, 20);
INSERT INTO `emp` VALUES (7499, 'ALLEN', 'SALESMAN', 7698, '1981-02-20', 1600, 300, 30);
INSERT INTO `emp` VALUES (7521, 'WARD', 'SALESMAN', 7698, '1981-02-22', 1250, 500, 30);
INSERT INTO `emp` VALUES (7566, 'JONES', 'MANAGER', 7839, '1981-04-02', 2975, NULL, 20);
INSERT INTO `emp` VALUES (7654, 'MARTIN', 'SALESMAN', 7698, '1981-09-28', 1250, 1400, 30);
INSERT INTO `emp` VALUES (7698, 'BLAKE', 'MANAGER', 7839, '1981-05-01', 2850, NULL, 30);
INSERT INTO `emp` VALUES (7782, 'CLARK', 'MANAGER', 7839, '1981-06-09', 2450, NULL, 10);
INSERT INTO `emp` VALUES (7788, 'SCOTT', 'ANALYST', 7566, '1987-04-19', 3000, NULL, 20);
INSERT INTO `emp` VALUES (7844, 'TURNER', 'SALESMAN', 7698, '1981-09-08', 1500, 0, 30);
INSERT INTO `emp` VALUES (7876, 'ADAMS', 'CLERK', 7788, '1987-05-23', 1100, NULL, 20);
INSERT INTO `emp` VALUES (7839, 'KING', 'PERSIDENT', NULL, '1981-11-17', 5000, NULL, 20);
INSERT INTO `emp` VALUES (7900, 'JAMES', 'CKERK', 7698, '1981-12-03', 950, NULL, 30);
INSERT INTO `emp` VALUES (7934, 'MILLER', 'CLERK', 7782, '1982-01-23', 1300, NULL, 30);
COMMIT;

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `goods_id` int(10) NOT NULL,
  `cat_id` int(10) NOT NULL,
  `goods_name` varchar(120) NOT NULL DEFAULT '',
  `click_count` int(10) NOT NULL,
  `brand_id` int(10) NOT NULL,
  `store_count` int(10) NOT NULL,
  `comment_count` int(10) DEFAULT NULL,
  `weight` int(10) NOT NULL,
  `market_price` decimal(10,2) NOT NULL,
  `shop_price` decimal(10,2) NOT NULL,
  `cost_price` decimal(10,2) DEFAULT NULL,
  `is_new` int(10) NOT NULL,
  `goods_type` int(10) NOT NULL,
  `spec_type` int(10) DEFAULT NULL,
  `exchange_integral` int(10) NOT NULL,
  `sales_sum` int(10) DEFAULT NULL,
  PRIMARY KEY (`goods_id`),
  UNIQUE KEY `PK__goods__40BA22391B9317B3` (`goods_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods
-- ----------------------------
BEGIN;
INSERT INTO `goods` VALUES (39, 191, '华为 M2 10.0 平板电脑', 52, 1, 3000, 3, 1000, 2388.00, 2288.00, 1500.00, 0, 15, 15, 100, 0);
INSERT INTO `goods` VALUES (41, 191, '华为 M2 8英寸平板电脑', 42, 1, 3000, 3, 1000, 1688.00, 1588.00, 1200.00, 1, 15, 15, 0, 0);
INSERT INTO `goods` VALUES (49, 123, '荣耀畅玩5X 智能手机', 98, 1, 1000, 3, 639, 1099.00, 999.00, 900.00, 0, 4, 4, 0, 0);
INSERT INTO `goods` VALUES (51, 123, '华为 Mate 8 64GB', 19, 1, 1000, 3, 685, 3799.00, 3699.00, 3500.00, 0, 4, 4, 0, 0);
INSERT INTO `goods` VALUES (56, 130, '三星55M5 智能液晶电视', 58, 15, 598, 3, 14500, 3899.00, 3799.00, 3500.00, 0, 18, 18, 100, 1);
INSERT INTO `goods` VALUES (57, 130, 'TCL D50A710 液晶电视', 60, 6, 590, 4, 14500, 2899.00, 2799.00, 2400.00, 1, 18, 18, 0, 5);
INSERT INTO `goods` VALUES (58, 130, '海信 LED55EC290N 液晶电视', 25, 19, 598, 4, 14500, 3299.00, 3199.00, 2988.00, 0, 18, 18, 0, 1);
INSERT INTO `goods` VALUES (106, 131, '海尔 BCD-572WDPM电冰箱', 27, 14, 1000, 0, 500, 3499.00, 3399.00, 3155.00, 0, 29, 0, 100, 0);
INSERT INTO `goods` VALUES (109, 131, '三星 BCD-535WKZM电冰箱', 17, 15, 1000, 0, 500, 3599.00, 3499.00, 3299.00, 1, 29, 0, 0, 0);
INSERT INTO `goods` VALUES (114, 104, '索尼 D7200单反相机', 15, 4, 1000, 0, 500, 3999.00, 3699.00, 3100.00, 0, 0, 0, 0, 0);
COMMIT;

-- ----------------------------
-- Table structure for goods_category
-- ----------------------------
DROP TABLE IF EXISTS `goods_category`;
CREATE TABLE `goods_category` (
  `id` int(10) NOT NULL,
  `name` varchar(90) NOT NULL DEFAULT '',
  `mobile_name` varchar(64) DEFAULT '',
  `parent_id` int(10) NOT NULL,
  `parent_id_path` varchar(128) DEFAULT '',
  `level` int(10) DEFAULT NULL,
  `sort_order` int(10) NOT NULL,
  `is_show` int(10) NOT NULL,
  `image` text,
  `is_hot` int(10) DEFAULT NULL,
  `cat_group` int(10) DEFAULT NULL,
  `commission_rate` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `PK__goods_ca__3213E83F17C286CF` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods_category
-- ----------------------------
BEGIN;
INSERT INTO `goods_category` VALUES (1, '手机 、 数码 、 通信', '数码产品', 0, '0_1', 1, 255, 1, '/Public/upload/category/2016/04-02/56ffa1252fb1b.jpg', 1, 0, 0);
INSERT INTO `goods_category` VALUES (2, '家用电器', '家用电器', 0, '0_2', 1, 50, 1, '/Public/upload/category/2016/04-22/5719c3c5bc052.jpg', 1, 0, 0);
INSERT INTO `goods_category` VALUES (3, '电脑、办公', '电脑', 0, '0_3', 1, 50, 1, '/Public/upload/category/2016/04-22/5719c40f21341.jpg', 1, 0, 0);
INSERT INTO `goods_category` VALUES (4, '家居、家具、家装、厨具', '家具', 0, '0_4', 1, 50, 0, '/Public/upload/category/2016/04-22/5719c41e70959.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (5, '男装、女装、童装、内衣', '服装', 0, '0_5', 1, 50, 1, '/Public/upload/category/2016/04-22/5719c432da41e.jpg', 1, 0, 0);
INSERT INTO `goods_category` VALUES (6, '个人化妆', '个人化妆', 0, '0_6', 1, 52, 1, '/Public/upload/category/2016/04-22/5719c4a1e3447.jpg', 1, 0, 0);
INSERT INTO `goods_category` VALUES (7, '鞋、箱包、珠宝、手表', '箱包', 0, '0_7', 1, 50, 0, '/Public/upload/category/2016/04-22/5719c445a02ba.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (8, '运动户外', '运动户外', 0, '0_8', 1, 50, 0, '/Public/upload/category/2016/04-22/5719c45078f06.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (9, '汽车用品', '汽车用品', 0, '0_9', 1, 50, 0, '/Public/upload/category/2016/04-22/5719c460687ec.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (10, '母婴用品、儿童玩具', '母婴用品、儿童玩具', 0, '0_10', 1, 50, 0, '/Public/upload/category/2016/04-22/5719c46c0c5ee.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (11, '图书、音像、电子书', '图书、音像、电子书', 0, '0_11', 1, 1, 1, '/Public/upload/category/2016/04-22/5719c49369854.jpg', 1, 0, 0);
INSERT INTO `goods_category` VALUES (12, '手机配件', '手机配件', 1, '0_1_12', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (13, '摄影摄像', '摄影摄像', 1, '0_1_13', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (14, '运营商', '运营商', 1, '0_1_14', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (15, '数码配件', '数码配件', 1, '0_1_15', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (16, '娱乐影视', '娱乐影视', 1, '0_1_16', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (17, '电子教育', '电子教育', 1, '0_1_17', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (18, '手机通讯', '手机通讯', 1, '0_1_18', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (19, '生活电器', '生活电器', 2, '0_2_19', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (20, '大家电', '大家电', 2, '0_2_20', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (21, '厨房电器', '厨房电器', 2, '0_2_21', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (22, '个护健康', '个护健康', 2, '0_2_22', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (23, '五金交电', '五金交电', 2, '0_2_23', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (24, '网络产品', '网络产品', 3, '0_3_24', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (25, '办公设备', '办公设备', 3, '0_3_25', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (26, '文具耗材', '文具耗材', 3, '0_3_26', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (27, '电脑整机', '电脑整机', 3, '0_3_27', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (28, '电脑配件', '电脑配件', 3, '0_3_28', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (29, '外设产品', '外设产品', 3, '0_3_29', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (30, '游戏设备', '游戏设备', 3, '0_3_30', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (31, '生活日用', '生活日用', 4, '0_4_31', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (32, '家装软饰', '家装软饰', 4, '0_4_32', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (33, '宠物生活', '宠物生活', 4, '0_4_33', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (34, '厨具', '厨具', 4, '0_4_34', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (35, '家装建材', '家装建材', 4, '0_4_35', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (36, '家纺', '家纺', 4, '0_4_36', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (37, '家具', '家具', 4, '0_4_37', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (38, '灯具', '灯具', 4, '0_4_38', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (39, '女装', '女装', 5, '0_5_39', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (40, '男装', '男装', 5, '0_5_40', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (41, '内衣', '内衣', 5, '0_5_41', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (42, '身体护肤', '身体护肤', 6, '0_6_42', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (43, '口腔护理', '口腔护理', 6, '0_6_43', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (44, '女性护理', '女性护理', 6, '0_6_44', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (45, '香水彩妆', '香水彩妆', 6, '0_6_45', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (46, '清洁用品', '清洁用品', 6, '0_6_46', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (47, '面部护肤', '面部护肤', 6, '0_6_47', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (48, '洗发护发', '洗发护发', 6, '0_6_48', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (49, '精品男包', '精品男包', 7, '0_7_49', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (50, '功能箱包', '功能箱包', 7, '0_7_50', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (51, '珠宝', '珠宝', 7, '0_7_51', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (52, '钟表', '钟表', 7, '0_7_52', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (53, '时尚女鞋', '时尚女鞋', 7, '0_7_53', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (54, '流行男鞋', '流行男鞋', 7, '0_7_54', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (55, '潮流女包', '潮流女包', 7, '0_7_55', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (56, '体育用品', '体育用品', 8, '0_8_56', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (57, '户外鞋服', '户外鞋服', 8, '0_8_57', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (58, '户外装备', '户外装备', 8, '0_8_58', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (59, '垂钓用品', '垂钓用品', 8, '0_8_59', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (60, '运动鞋包', '运动鞋包', 8, '0_8_60', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (61, '游泳用品', '游泳用品', 8, '0_8_61', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (62, '运动服饰', '运动服饰', 8, '0_8_62', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (63, '健身训练', '健身训练', 8, '0_8_63', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (64, '骑行运动', '骑行运动', 8, '0_8_64', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (65, '车载电器', '车载电器', 9, '0_9_65', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (66, '美容清洗', '美容清洗', 9, '0_9_66', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (67, '汽车装饰', '汽车装饰', 9, '0_9_67', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (68, '安全自驾', '安全自驾', 9, '0_9_68', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (69, '线下服务', '线下服务', 9, '0_9_69', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (70, '汽车车型', '汽车车型', 9, '0_9_70', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (71, '汽车品牌', '汽车品牌', 9, '0_9_71', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (72, '维修保养', '维修保养', 9, '0_9_72', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (73, '洗护用品', '洗护用品', 10, '0_10_73', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (74, '喂养用品', '喂养用品', 10, '0_10_74', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (75, '童车童床', '童车童床', 10, '0_10_75', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (76, '安全座椅', '安全座椅', 10, '0_10_76', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (77, '寝居服饰', '寝居服饰', 10, '0_10_77', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (78, '奶粉', '奶粉', 10, '0_10_78', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (79, '妈妈专区', '妈妈专区', 10, '0_10_79', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (80, '营养辅食', '营养辅食', 10, '0_10_80', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (81, '童装童鞋', '童装童鞋', 10, '0_10_81', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (82, '尿裤湿巾', '尿裤湿巾', 10, '0_10_82', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (83, '玩具乐器', '玩具乐器', 10, '0_10_83', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (84, '音像', '音像', 11, '0_11_84', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (85, '刊/原版', '刊/原版', 11, '0_11_85', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (86, '少儿', '少儿', 11, '0_11_86', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (87, '电子书', '电子书', 11, '0_11_87', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (88, '教育', '教育', 11, '0_11_88', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (89, '数字音乐', '数字音乐', 11, '0_11_89', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (90, '文艺', '文艺', 11, '0_11_90', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (91, '经管励志', '经管励志', 11, '0_11_91', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (92, '人文社科', '人文社科', 11, '0_11_92', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (93, '生活', '生活', 11, '0_11_93', 2, 50, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (94, '科技', '科技', 11, '0_11_94', 2, 10, 1, '/Public/upload/category/2016/04-02/56ffa28b12f4f.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (95, '纸品湿巾', '纸品湿巾', 46, '0_6_46_95', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (96, '衣物清洁', '衣物清洁', 46, '0_6_46_96', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (97, '家庭清洁', '家庭清洁', 46, '0_6_46_97', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (98, '一次性用品', '一次性用品', 46, '0_6_46_98', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (99, '驱虫用品', '驱虫用品', 46, '0_6_46_99', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (100, '电池 电源 充电器', '电池 电源 充电器', 12, '0_1_12_100', 3, 50, 1, '/Public/upload/category/2017/03-07/58be21177c567.jpg', 0, 0, 0);
INSERT INTO `goods_category` VALUES (101, '数据线,耳机', '数据线,耳机', 12, '0_1_12_101', 3, 50, 0, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (102, '贴膜,保护套', '贴膜,保护套', 12, '0_1_12_102', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (103, '数码相机', '数码相机', 13, '0_1_13_103', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (104, '单反相机', '单反相机', 13, '0_1_13_104', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (105, '摄像机', '摄像机', 13, '0_1_13_105', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (106, '镜头', '镜头', 13, '0_1_13_106', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (107, '数码相框', '数码相框', 13, '0_1_13_107', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (108, '选号码', '选号码', 14, '0_1_14_108', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (109, '办套餐', '办套餐', 14, '0_1_14_109', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (110, '合约机', '合约机', 14, '0_1_14_110', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (111, '中国移动', '中国移动', 14, '0_1_14_111', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (112, '充值卡', '充值卡', 15, '0_1_15_112', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (113, '读卡器', '读卡器', 15, '0_1_15_113', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (114, '支架', '支架', 15, '0_1_15_114', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (115, '滤镜', '滤镜', 15, '0_1_15_115', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (116, '音响麦克风', '音响麦克风', 16, '0_1_16_116', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (117, '耳机/耳麦', '耳机/耳麦', 16, '0_1_16_117', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (118, '学生平板', '学生平板', 17, '0_1_17_118', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (119, '点读机', '点读机', 17, '0_1_17_119', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (120, '电纸书', '电纸书', 17, '0_1_17_120', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (121, '电子词典', '电子词典', 17, '0_1_17_121', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (122, '复读机', '复读机', 17, '0_1_17_122', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (123, '手机', '手机', 1, '0_1_123', 2, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (124, '对讲机', '对讲机', 18, '0_1_18_124', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (125, '录音机', '录音机', 19, '0_2_19_125', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (126, '饮水机', '饮水机', 19, '0_2_19_126', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (127, '烫衣机', '烫衣机', 19, '0_2_19_127', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (128, '电风扇', '电风扇', 19, '0_2_19_128', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (129, '电话机', '电话机', 19, '0_2_19_129', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (130, '电视', '电视', 20, '0_2_20_130', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (131, '冰箱', '冰箱', 20, '0_2_20_131', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (132, '空调', '空调', 20, '0_2_20_132', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (133, '洗衣机', '洗衣机', 20, '0_2_20_133', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (134, '热水器', '热水器', 20, '0_2_20_134', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (135, '料理/榨汁机', '料理/榨汁机', 21, '0_2_21_135', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (136, '电饭锅', '电饭锅', 21, '0_2_21_136', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (137, '微波炉', '微波炉', 21, '0_2_21_137', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (138, '豆浆机', '豆浆机', 21, '0_2_21_138', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (139, '剃须刀', '剃须刀', 22, '0_2_22_139', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (140, '吹风机', '吹风机', 22, '0_2_22_140', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (141, '按摩器', '按摩器', 22, '0_2_22_141', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (142, '足浴盆', '足浴盆', 22, '0_2_22_142', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (143, '血压计', '血压计', 22, '0_2_22_143', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (144, '厨卫五金', '厨卫五金', 23, '0_2_23_144', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (145, '门铃门锁', '门铃门锁', 23, '0_2_23_145', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (146, '开关插座', '开关插座', 23, '0_2_23_146', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (147, '电动工具', '电动工具', 23, '0_2_23_147', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (148, '监控安防', '监控安防', 23, '0_2_23_148', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (149, '仪表仪器', '仪表仪器', 23, '0_2_23_149', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (150, '电线线缆', '电线线缆', 23, '0_2_23_150', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (151, '浴霸/排气扇', '浴霸/排气扇', 23, '0_2_23_151', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (152, '灯具', '灯具', 23, '0_2_23_152', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (153, '水龙头', '水龙头', 23, '0_2_23_153', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (154, '网络配件', '网络配件', 24, '0_3_24_154', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (155, '路由器', '路由器', 24, '0_3_24_155', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (156, '网卡', '网卡', 24, '0_3_24_156', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (157, '交换机', '交换机', 24, '0_3_24_157', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (158, '网络存储', '网络存储', 24, '0_3_24_158', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (159, '3G/4G/5G上网', '3G/4G/5G上网', 24, '0_3_24_159', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (160, '网络盒子', '网络盒子', 24, '0_3_24_160', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (161, '复合机', '复合机', 25, '0_3_25_161', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (162, '办公家具', '办公家具', 25, '0_3_25_162', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (163, '摄影机', '摄影机', 25, '0_3_25_163', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (164, '碎纸机', '碎纸机', 25, '0_3_25_164', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (165, '白板', '白板', 25, '0_3_25_165', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (166, '投影配件', '投影配件', 25, '0_3_25_166', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (167, '考勤机', '考勤机', 25, '0_3_25_167', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (168, '多功能一体机', '多功能一体机', 25, '0_3_25_168', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (169, '收款/POS机', '收款/POS机', 25, '0_3_25_169', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (170, '打印机', '打印机', 25, '0_3_25_170', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (171, '会员视频音频', '会员视频音频', 25, '0_3_25_171', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (172, '传真设备', '传真设备', 25, '0_3_25_172', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (173, '保险柜', '保险柜', 25, '0_3_25_173', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (174, '验钞/点钞机', '验钞/点钞机', 25, '0_3_25_174', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (175, '装订/封装机', '装订/封装机', 25, '0_3_25_175', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (176, '扫描设备', '扫描设备', 25, '0_3_25_176', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (177, '安防监控', '安防监控', 25, '0_3_25_177', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (178, '文具管理', '文具管理', 26, '0_3_26_178', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (179, '本册便签', '本册便签', 26, '0_3_26_179', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (180, '硒鼓/墨粉', '硒鼓/墨粉', 26, '0_3_26_180', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (181, '计算器', '计算器', 26, '0_3_26_181', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (182, '墨盒', '墨盒', 26, '0_3_26_182', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (183, '笔类', '笔类', 26, '0_3_26_183', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (184, '色带', '色带', 26, '0_3_26_184', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (185, '画具画材', '画具画材', 26, '0_3_26_185', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (186, '纸类', '纸类', 26, '0_3_26_186', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (187, '财会用品', '财会用品', 26, '0_3_26_187', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (188, '办公文具', '办公文具', 26, '0_3_26_188', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (189, '刻录碟片', '刻录碟片', 26, '0_3_26_189', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (190, '学生文具', '学生文具', 26, '0_3_26_190', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (191, '平板电脑', '平板电脑', 27, '0_3_27_191', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (192, '台式机', '台式机', 27, '0_3_27_192', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (193, '一体机', '一体机', 27, '0_3_27_193', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (194, '笔记本', '笔记本', 27, '0_3_27_194', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (195, '超极本', '超极本', 27, '0_3_27_195', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (196, '内存', '内存', 28, '0_3_28_196', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (197, '组装电脑', '组装电脑', 28, '0_3_28_197', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (198, '机箱', '机箱', 28, '0_3_28_198', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (199, '电源', '电源', 28, '0_3_28_199', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (200, 'CPU', 'CPU', 28, '0_3_28_200', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (201, '显示器', '显示器', 28, '0_3_28_201', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (202, '主板', '主板', 28, '0_3_28_202', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (203, '刻录机/光驱', '刻录机/光驱', 28, '0_3_28_203', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (204, '显卡', '显卡', 28, '0_3_28_204', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (205, '声卡/扩展卡', '声卡/扩展卡', 28, '0_3_28_205', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (206, '硬盘', '硬盘', 28, '0_3_28_206', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (207, '散热器', '散热器', 28, '0_3_28_207', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (208, '固态硬盘', '固态硬盘', 28, '0_3_28_208', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (209, '装机配件', '装机配件', 28, '0_3_28_209', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (210, '线缆', '线缆', 29, '0_3_29_210', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (211, '鼠标', '鼠标', 29, '0_3_29_211', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (212, '手写板', '手写板', 29, '0_3_29_212', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (213, '键盘', '键盘', 29, '0_3_29_213', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (214, '电脑工具', '电脑工具', 29, '0_3_29_214', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (215, '网络仪表仪器', '网络仪表仪器', 29, '0_3_29_215', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (216, 'UPS', 'UPS', 29, '0_3_29_216', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (217, 'U盘', 'U盘', 29, '0_3_29_217', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (218, '插座', '插座', 29, '0_3_29_218', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (219, '移动硬盘', '移动硬盘', 29, '0_3_29_219', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (220, '鼠标垫', '鼠标垫', 29, '0_3_29_220', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (221, '摄像头', '摄像头', 29, '0_3_29_221', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (222, '游戏软件', '游戏软件', 30, '0_3_30_222', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (223, '游戏周边', '游戏周边', 30, '0_3_30_223', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (224, '游戏机', '游戏机', 30, '0_3_30_224', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (225, '游戏耳机', '游戏耳机', 30, '0_3_30_225', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (226, '手柄方向盘', '手柄方向盘', 30, '0_3_30_226', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (227, '清洁工具', '清洁工具', 31, '0_4_31_227', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (228, '收纳用品', '收纳用品', 31, '0_4_31_228', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (229, '雨伞雨具', '雨伞雨具', 31, '0_4_31_229', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (230, '浴室用品', '浴室用品', 31, '0_4_31_230', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (231, '缝纫/针织用品', '缝纫/针织用品', 31, '0_4_31_231', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (232, '洗晒/熨烫', '洗晒/熨烫', 31, '0_4_31_232', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (233, '净化除味', '净化除味', 31, '0_4_31_233', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (234, '节庆饰品', '节庆饰品', 32, '0_4_32_234', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (235, '手工/十字绣', '手工/十字绣', 32, '0_4_32_235', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (236, '桌布/罩件', '桌布/罩件', 32, '0_4_32_236', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (237, '钟饰', '钟饰', 32, '0_4_32_237', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (238, '地毯地垫', '地毯地垫', 32, '0_4_32_238', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (239, '装饰摆件', '装饰摆件', 32, '0_4_32_239', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (240, '沙发垫套/椅垫', '沙发垫套/椅垫', 32, '0_4_32_240', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (241, '花瓶花艺', '花瓶花艺', 32, '0_4_32_241', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (242, '帘艺隔断', '帘艺隔断', 32, '0_4_32_242', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (243, '创意家居', '创意家居', 32, '0_4_32_243', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (244, '相框/照片墙', '相框/照片墙', 32, '0_4_32_244', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (245, '保暖防护', '保暖防护', 32, '0_4_32_245', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (246, '装饰字画', '装饰字画', 32, '0_4_32_246', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (247, '香薰蜡烛', '香薰蜡烛', 32, '0_4_32_247', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (248, '墙贴/装饰贴', '墙贴/装饰贴', 32, '0_4_32_248', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (249, '水族用品', '水族用品', 33, '0_4_33_249', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (250, '宠物玩具', '宠物玩具', 33, '0_4_33_250', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (251, '宠物主粮', '宠物主粮', 33, '0_4_33_251', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (252, '宠物牵引', '宠物牵引', 33, '0_4_33_252', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (253, '宠物零食', '宠物零食', 33, '0_4_33_253', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (254, '宠物驱虫', '宠物驱虫', 33, '0_4_33_254', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (255, '猫砂/尿布', '猫砂/尿布', 33, '0_4_33_255', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (256, '洗护美容', '洗护美容', 33, '0_4_33_256', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (257, '家居日用', '家居日用', 33, '0_4_33_257', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (258, '医疗保健', '医疗保健', 33, '0_4_33_258', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (259, '出行装备', '出行装备', 33, '0_4_33_259', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (260, '剪刀菜饭', '剪刀菜饭', 34, '0_4_34_260', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (261, '厨房配件', '厨房配件', 34, '0_4_34_261', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (262, '水具酒具', '水具酒具', 34, '0_4_34_262', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (263, '餐具', '餐具', 34, '0_4_34_263', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (264, '茶具/咖啡具', '茶具/咖啡具', 34, '0_4_34_264', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (265, '烹饪锅具', '烹饪锅具', 34, '0_4_34_265', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (266, '电工电料', '电工电料', 35, '0_4_35_266', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (267, '墙地材料', '墙地材料', 35, '0_4_35_267', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (268, '装饰材料', '装饰材料', 35, '0_4_35_268', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (269, '装修服务', '装修服务', 35, '0_4_35_269', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (270, '沐浴花洒', '沐浴花洒', 35, '0_4_35_270', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (271, '灯饰照明', '灯饰照明', 35, '0_4_35_271', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (272, '开关插座', '开关插座', 35, '0_4_35_272', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (273, '厨房卫浴', '厨房卫浴', 35, '0_4_35_273', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (274, '油漆涂料', '油漆涂料', 35, '0_4_35_274', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (275, '五金工具', '五金工具', 35, '0_4_35_275', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (276, '龙头', '龙头', 35, '0_4_35_276', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (277, '床品套件', '床品套件', 36, '0_4_36_277', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (278, '抱枕靠垫', '抱枕靠垫', 36, '0_4_36_278', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (279, '被子', '被子', 36, '0_4_36_279', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (280, '布艺软饰', '布艺软饰', 36, '0_4_36_280', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (281, '被芯', '被芯', 36, '0_4_36_281', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (282, '窗帘窗纱', '窗帘窗纱', 36, '0_4_36_282', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (283, '床单被罩', '床单被罩', 36, '0_4_36_283', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (284, '蚊帐', '蚊帐', 36, '0_4_36_284', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (285, '床垫床褥', '床垫床褥', 36, '0_4_36_285', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (286, '凉席', '凉席', 36, '0_4_36_286', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (287, '电地毯', '电地毯', 36, '0_4_36_287', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (288, '毯子', '毯子', 36, '0_4_36_288', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (289, '毛巾浴巾', '毛巾浴巾', 36, '0_4_36_289', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (290, '餐厅家具', '餐厅家具', 37, '0_4_37_290', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (291, '电脑椅', '电脑椅', 37, '0_4_37_291', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (292, '书房家具', '书房家具', 37, '0_4_37_292', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (293, '衣柜', '衣柜', 37, '0_4_37_293', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (294, '储物家具', '储物家具', 37, '0_4_37_294', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (295, '茶几', '茶几', 37, '0_4_37_295', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (296, '阳台/户外', '阳台/户外', 37, '0_4_37_296', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (297, '电视柜', '电视柜', 37, '0_4_37_297', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (298, '商业办公', '商业办公', 37, '0_4_37_298', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (299, '餐桌', '餐桌', 37, '0_4_37_299', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (300, '卧室家具', '卧室家具', 37, '0_4_37_300', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (301, '床', '床', 37, '0_4_37_301', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (302, '电脑桌', '电脑桌', 37, '0_4_37_302', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (303, '客厅家具', '客厅家具', 37, '0_4_37_303', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (304, '床垫', '床垫', 37, '0_4_37_304', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (305, '鞋架/衣帽架', '鞋架/衣帽架', 37, '0_4_37_305', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (306, '客厅家具', '客厅家具', 37, '0_4_37_306', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (307, '沙发', '沙发', 37, '0_4_37_307', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (308, '吸顶灯', '吸顶灯', 38, '0_4_38_308', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (309, '吊灯', '吊灯', 38, '0_4_38_309', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (310, '筒灯射灯', '筒灯射灯', 38, '0_4_38_310', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (311, '氛围照明', '氛围照明', 38, '0_4_38_311', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (312, 'LED灯', 'LED灯', 38, '0_4_38_312', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (313, '节能灯', '节能灯', 38, '0_4_38_313', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (314, '落地灯', '落地灯', 38, '0_4_38_314', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (315, '五金电器', '五金电器', 38, '0_4_38_315', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (316, '应急灯/手电', '应急灯/手电', 38, '0_4_38_316', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (317, '台灯', '台灯', 38, '0_4_38_317', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (318, '装饰灯', '装饰灯', 38, '0_4_38_318', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (319, '短外套', '短外套', 39, '0_5_39_319', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (320, '羊毛衫', '羊毛衫', 39, '0_5_39_320', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (321, '雪纺衫', '雪纺衫', 39, '0_5_39_321', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (322, '礼服', '礼服', 39, '0_5_39_322', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (323, '风衣', '风衣', 39, '0_5_39_323', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (324, '羊绒衫', '羊绒衫', 39, '0_5_39_324', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (325, '牛仔裤', '牛仔裤', 39, '0_5_39_325', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (326, '马甲', '马甲', 39, '0_5_39_326', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (327, '衬衫', '衬衫', 39, '0_5_39_327', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (328, '半身裙', '半身裙', 39, '0_5_39_328', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (329, '休闲裤', '休闲裤', 39, '0_5_39_329', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (330, '吊带/背心', '吊带/背心', 39, '0_5_39_330', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (331, '羽绒服', '羽绒服', 39, '0_5_39_331', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (332, 'T恤', 'T恤', 39, '0_5_39_332', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (333, '大码女装', '大码女装', 39, '0_5_39_333', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (334, '正装裤', '正装裤', 39, '0_5_39_334', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (335, '设计师/潮牌', '设计师/潮牌', 39, '0_5_39_335', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (336, '毛呢大衣', '毛呢大衣', 39, '0_5_39_336', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (337, '小西装', '小西装', 39, '0_5_39_337', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (338, '中老年女装', '中老年女装', 39, '0_5_39_338', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (339, '加绒裤', '加绒裤', 39, '0_5_39_339', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (340, '棉服', '棉服', 39, '0_5_39_340', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (341, '打底衫', '打底衫', 39, '0_5_39_341', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (342, '皮草', '皮草', 39, '0_5_39_342', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (343, '短裤', '短裤', 39, '0_5_39_343', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (344, '连衣裙', '连衣裙', 39, '0_5_39_344', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (345, '打底裤', '打底裤', 39, '0_5_39_345', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (346, '真皮皮衣', '真皮皮衣', 39, '0_5_39_346', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (347, '婚纱', '婚纱', 39, '0_5_39_347', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (348, '卫衣', '卫衣', 39, '0_5_39_348', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (349, '针织衫', '针织衫', 39, '0_5_39_349', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (350, '仿皮皮衣', '仿皮皮衣', 39, '0_5_39_350', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (351, '旗袍/唐装', '旗袍/唐装', 39, '0_5_39_351', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (352, '羊毛衫', '羊毛衫', 40, '0_5_40_352', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (353, '休闲裤', '休闲裤', 40, '0_5_40_353', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (354, 'POLO衫', 'POLO衫', 40, '0_5_40_354', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (355, '加绒裤', '加绒裤', 40, '0_5_40_355', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (356, '衬衫', '衬衫', 40, '0_5_40_356', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (357, '短裤', '短裤', 40, '0_5_40_357', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (358, '真皮皮衣', '真皮皮衣', 40, '0_5_40_358', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (359, '毛呢大衣', '毛呢大衣', 40, '0_5_40_359', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (360, '中老年男装', '中老年男装', 40, '0_5_40_360', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (361, '卫衣', '卫衣', 40, '0_5_40_361', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (362, '风衣', '风衣', 40, '0_5_40_362', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (363, '大码男装', '大码男装', 40, '0_5_40_363', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (364, '羽绒服', '羽绒服', 40, '0_5_40_364', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (365, 'T恤', 'T恤', 40, '0_5_40_365', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (366, '仿皮皮衣', '仿皮皮衣', 40, '0_5_40_366', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (367, '羊绒衫', '羊绒衫', 40, '0_5_40_367', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (368, '棉服', '棉服', 40, '0_5_40_368', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (369, '马甲/背心', '马甲/背心', 40, '0_5_40_369', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (370, '西服', '西服', 40, '0_5_40_370', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (371, '设计师/潮牌', '设计师/潮牌', 40, '0_5_40_371', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (372, '针织衫', '针织衫', 40, '0_5_40_372', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (373, '西服套装', '西服套装', 40, '0_5_40_373', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (374, '西裤', '西裤', 40, '0_5_40_374', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (375, '工装', '工装', 40, '0_5_40_375', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (376, '夹克', '夹克', 40, '0_5_40_376', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (377, '牛仔裤', '牛仔裤', 40, '0_5_40_377', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (378, '卫裤/运动裤', '卫裤/运动裤', 40, '0_5_40_378', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (379, '唐装/中山装', '唐装/中山装', 40, '0_5_40_379', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (380, '保暖内衣', '保暖内衣', 41, '0_5_41_380', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (381, '大码内衣', '大码内衣', 41, '0_5_41_381', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (382, '吊带/背心', '吊带/背心', 41, '0_5_41_382', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (383, '秋衣秋裤', '秋衣秋裤', 41, '0_5_41_383', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (384, '文胸', '文胸', 41, '0_5_41_384', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (385, '内衣配件', '内衣配件', 41, '0_5_41_385', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (386, '睡衣/家居服', '睡衣/家居服', 41, '0_5_41_386', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (387, '男式内裤', '男式内裤', 41, '0_5_41_387', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (388, '泳衣', '泳衣', 41, '0_5_41_388', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (389, '打底裤袜', '打底裤袜', 41, '0_5_41_389', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (390, '女式内裤', '女式内裤', 41, '0_5_41_390', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (391, '塑身美体', '塑身美体', 41, '0_5_41_391', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (392, '休闲棉袜', '休闲棉袜', 41, '0_5_41_392', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (393, '连裤袜/丝袜', '连裤袜/丝袜', 41, '0_5_41_393', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (394, '美腿袜', '美腿袜', 41, '0_5_41_394', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (395, '商务男袜', '商务男袜', 41, '0_5_41_395', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (396, '打底衫', '打底衫', 41, '0_5_41_396', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (397, '情趣内衣', '情趣内衣', 41, '0_5_41_397', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (398, '情侣睡衣', '情侣睡衣', 41, '0_5_41_398', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (399, '少女文胸', '少女文胸', 41, '0_5_41_399', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (400, '文胸套装', '文胸套装', 41, '0_5_41_400', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (401, '抹胸', '抹胸', 41, '0_5_41_401', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (402, '沐浴', '沐浴', 42, '0_6_42_402', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (403, '润肤', '润肤', 42, '0_6_42_403', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (404, '颈部', '颈部', 42, '0_6_42_404', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (405, '手足', '手足', 42, '0_6_42_405', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (406, '纤体塑形', '纤体塑形', 42, '0_6_42_406', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (407, '美胸', '美胸', 42, '0_6_42_407', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (408, '套装', '套装', 42, '0_6_42_408', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (409, '牙膏/牙粉', '牙膏/牙粉', 43, '0_6_43_409', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (410, '牙刷/牙线', '牙刷/牙线', 43, '0_6_43_410', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (411, '漱口水', '漱口水', 43, '0_6_43_411', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (412, '套装', '套装', 43, '0_6_43_412', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (413, '卫生巾', '卫生巾', 44, '0_6_44_413', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (414, '卫生护垫', '卫生护垫', 44, '0_6_44_414', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (415, '私密护理', '私密护理', 44, '0_6_44_415', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (416, '脱毛膏', '脱毛膏', 44, '0_6_44_416', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (417, '唇部', '唇部', 45, '0_6_45_417', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (418, '美甲', '美甲', 45, '0_6_45_418', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (419, '美容工具', '美容工具', 45, '0_6_45_419', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (420, '套装', '套装', 45, '0_6_45_420', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (421, '香水', '香水', 45, '0_6_45_421', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (422, '底妆', '底妆', 45, '0_6_45_422', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (423, '腮红', '腮红', 45, '0_6_45_423', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (424, '眼部', '眼部', 45, '0_6_45_424', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (425, '面膜', '面膜', 47, '0_6_47_425', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (426, '剃须', '剃须', 47, '0_6_47_426', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (427, '套装', '套装', 47, '0_6_47_427', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (428, '清洁', '清洁', 47, '0_6_47_428', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (429, '护肤', '护肤', 47, '0_6_47_429', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (430, '套装', '套装', 48, '0_6_48_430', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (431, '洗发', '洗发', 48, '0_6_48_431', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (432, '护发', '护发', 48, '0_6_48_432', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (433, '染发', '染发', 48, '0_6_48_433', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (434, '造型', '造型', 48, '0_6_48_434', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (435, '假发', '假发', 48, '0_6_48_435', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (436, '商务公文包', '商务公文包', 49, '0_7_49_436', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (437, '单肩/斜挎包', '单肩/斜挎包', 49, '0_7_49_437', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (438, '男士手包', '男士手包', 49, '0_7_49_438', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (439, '双肩包', '双肩包', 49, '0_7_49_439', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (440, '钱包/卡包', '钱包/卡包', 49, '0_7_49_440', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (441, '钥匙包', '钥匙包', 49, '0_7_49_441', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (442, '旅行包', '旅行包', 50, '0_7_50_442', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (443, '妈咪包', '妈咪包', 50, '0_7_50_443', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (444, '电脑包', '电脑包', 50, '0_7_50_444', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (445, '休闲运动包', '休闲运动包', 50, '0_7_50_445', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (446, '相机包', '相机包', 50, '0_7_50_446', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (447, '腰包/胸包', '腰包/胸包', 50, '0_7_50_447', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (448, '登山包', '登山包', 50, '0_7_50_448', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (449, '旅行配件', '旅行配件', 50, '0_7_50_449', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (450, '拉杆箱/拉杆包', '拉杆箱/拉杆包', 50, '0_7_50_450', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (451, '书包', '书包', 50, '0_7_50_451', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (452, '彩宝', '彩宝', 51, '0_7_51_452', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (453, '时尚饰品', '时尚饰品', 51, '0_7_51_453', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (454, '铂金', '铂金', 51, '0_7_51_454', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (455, '钻石', '钻石', 51, '0_7_51_455', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (456, '天然木饰', '天然木饰', 51, '0_7_51_456', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (457, '翡翠玉石', '翡翠玉石', 51, '0_7_51_457', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (458, '珍珠', '珍珠', 51, '0_7_51_458', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (459, '纯金K金饰品', '纯金K金饰品', 51, '0_7_51_459', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (460, '金银投资', '金银投资', 51, '0_7_51_460', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (461, '银饰', '银饰', 51, '0_7_51_461', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (462, '水晶玛瑙', '水晶玛瑙', 51, '0_7_51_462', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (463, '座钟挂钟', '座钟挂钟', 52, '0_7_52_463', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (464, '男表', '男表', 52, '0_7_52_464', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (465, '女表', '女表', 52, '0_7_52_465', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (466, '儿童表', '儿童表', 52, '0_7_52_466', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (467, '智能手表', '智能手表', 52, '0_7_52_467', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (468, '女靴', '女靴', 53, '0_7_53_468', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (469, '布鞋/绣花鞋', '布鞋/绣花鞋', 53, '0_7_53_469', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (470, '鱼嘴鞋', '鱼嘴鞋', 53, '0_7_53_470', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (471, '雪地靴', '雪地靴', 53, '0_7_53_471', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (472, '凉鞋', '凉鞋', 53, '0_7_53_472', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (473, '雨鞋/雨靴', '雨鞋/雨靴', 53, '0_7_53_473', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (474, '单鞋', '单鞋', 53, '0_7_53_474', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (475, '拖鞋/人字拖', '拖鞋/人字拖', 53, '0_7_53_475', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (476, '鞋配件', '鞋配件', 53, '0_7_53_476', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (477, '高跟鞋', '高跟鞋', 53, '0_7_53_477', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (478, '马丁靴', '马丁靴', 53, '0_7_53_478', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (479, '帆布鞋', '帆布鞋', 53, '0_7_53_479', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (480, '休闲鞋', '休闲鞋', 53, '0_7_53_480', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (481, '妈妈鞋', '妈妈鞋', 53, '0_7_53_481', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (482, '踝靴', '踝靴', 53, '0_7_53_482', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (483, '防水台', '防水台', 53, '0_7_53_483', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (484, '内增高', '内增高', 53, '0_7_53_484', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (485, '松糕鞋', '松糕鞋', 53, '0_7_53_485', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (486, '坡跟鞋', '坡跟鞋', 53, '0_7_53_486', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (487, '增高鞋', '增高鞋', 54, '0_7_54_487', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (488, '鞋配件', '鞋配件', 54, '0_7_54_488', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (489, '拖鞋/人字拖', '拖鞋/人字拖', 54, '0_7_54_489', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (490, '凉鞋/沙滩鞋', '凉鞋/沙滩鞋', 54, '0_7_54_490', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (491, '休闲鞋', '休闲鞋', 54, '0_7_54_491', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (492, '雨鞋/雨靴', '雨鞋/雨靴', 54, '0_7_54_492', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (493, '商务休闲鞋', '商务休闲鞋', 54, '0_7_54_493', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (494, '定制鞋', '定制鞋', 54, '0_7_54_494', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (495, '正装鞋', '正装鞋', 54, '0_7_54_495', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (496, '男靴', '男靴', 54, '0_7_54_496', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (497, '帆布鞋', '帆布鞋', 54, '0_7_54_497', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (498, '传统布鞋', '传统布鞋', 54, '0_7_54_498', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (499, '工装鞋', '工装鞋', 54, '0_7_54_499', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (500, '功能鞋', '功能鞋', 54, '0_7_54_500', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (501, '钥匙包', '钥匙包', 55, '0_7_55_501', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (502, '单肩包', '单肩包', 55, '0_7_55_502', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (503, '手提包', '手提包', 55, '0_7_55_503', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (504, '斜挎包', '斜挎包', 55, '0_7_55_504', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (505, '双肩包', '双肩包', 55, '0_7_55_505', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (506, '钱包', '钱包', 55, '0_7_55_506', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (507, '手拿包/晚宴包', '手拿包/晚宴包', 55, '0_7_55_507', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (508, '卡包/零钱包', '卡包/零钱包', 55, '0_7_55_508', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (509, '轮滑滑板', '轮滑滑板', 56, '0_8_56_509', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (510, '网球', '网球', 56, '0_8_56_510', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (511, '高尔夫', '高尔夫', 56, '0_8_56_511', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (512, '台球', '台球', 56, '0_8_56_512', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (513, '乒乓球', '乒乓球', 56, '0_8_56_513', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (514, '排球', '排球', 56, '0_8_56_514', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (515, '羽毛球', '羽毛球', 56, '0_8_56_515', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (516, '棋牌麻将', '棋牌麻将', 56, '0_8_56_516', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (517, '篮球', '篮球', 56, '0_8_56_517', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (518, '其它', '其它', 56, '0_8_56_518', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (519, '足球', '足球', 56, '0_8_56_519', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (520, '速干衣裤', '速干衣裤', 57, '0_8_57_520', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (521, '功能内衣', '功能内衣', 57, '0_8_57_521', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (522, '溯溪鞋', '溯溪鞋', 57, '0_8_57_522', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (523, '滑雪服', '滑雪服', 57, '0_8_57_523', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (524, '军迷服饰', '军迷服饰', 57, '0_8_57_524', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (525, '沙滩/凉拖', '沙滩/凉拖', 57, '0_8_57_525', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (526, '羽绒服/棉服', '羽绒服/棉服', 57, '0_8_57_526', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (527, '登山鞋', '登山鞋', 57, '0_8_57_527', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (528, '户外袜', '户外袜', 57, '0_8_57_528', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (529, '休闲衣裤', '休闲衣裤', 57, '0_8_57_529', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (530, '徒步鞋', '徒步鞋', 57, '0_8_57_530', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (531, '抓绒衣裤', '抓绒衣裤', 57, '0_8_57_531', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (532, '越野跑鞋', '越野跑鞋', 57, '0_8_57_532', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (533, '软壳衣裤', '软壳衣裤', 57, '0_8_57_533', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (534, '休闲鞋', '休闲鞋', 57, '0_8_57_534', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (535, 'T恤', 'T恤', 57, '0_8_57_535', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (536, '雪地靴', '雪地靴', 57, '0_8_57_536', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (537, '冲锋衣裤', '冲锋衣裤', 57, '0_8_57_537', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (538, '户外风衣', '户外风衣', 57, '0_8_57_538', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (539, '工装鞋', '工装鞋', 57, '0_8_57_539', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (540, '野餐烧烤', '野餐烧烤', 58, '0_8_58_540', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (541, '滑雪装备', '滑雪装备', 58, '0_8_58_541', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (542, '便携桌椅床', '便携桌椅床', 58, '0_8_58_542', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (543, '极限户外', '极限户外', 58, '0_8_58_543', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (544, '户外工具', '户外工具', 58, '0_8_58_544', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (545, '冲浪潜水', '冲浪潜水', 58, '0_8_58_545', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (546, '背包', '背包', 58, '0_8_58_546', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (547, '望远镜', '望远镜', 58, '0_8_58_547', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (548, '户外配饰', '户外配饰', 58, '0_8_58_548', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (549, '帐篷/垫子', '帐篷/垫子', 58, '0_8_58_549', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (550, '户外仪表', '户外仪表', 58, '0_8_58_550', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (551, '睡袋/吊床', '睡袋/吊床', 58, '0_8_58_551', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (552, '旅游用品', '旅游用品', 58, '0_8_58_552', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (553, '登山攀岩', '登山攀岩', 58, '0_8_58_553', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (554, '军迷用品', '军迷用品', 58, '0_8_58_554', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (555, '户外照明', '户外照明', 58, '0_8_58_555', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (556, '救援装备', '救援装备', 58, '0_8_58_556', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (557, '钓箱鱼包', '钓箱鱼包', 59, '0_8_59_557', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (558, '其它', '其它', 59, '0_8_59_558', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (559, '鱼竿鱼线', '鱼竿鱼线', 59, '0_8_59_559', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (560, '浮漂鱼饵', '浮漂鱼饵', 59, '0_8_59_560', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (561, '钓鱼桌椅', '钓鱼桌椅', 59, '0_8_59_561', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (562, '钓鱼配件', '钓鱼配件', 59, '0_8_59_562', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (563, '帆布鞋', '帆布鞋', 60, '0_8_60_563', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (564, '乒羽网鞋', '乒羽网鞋', 60, '0_8_60_564', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (565, '跑步鞋', '跑步鞋', 60, '0_8_60_565', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (566, '训练鞋', '训练鞋', 60, '0_8_60_566', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (567, '休闲鞋', '休闲鞋', 60, '0_8_60_567', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (568, '专项运动鞋', '专项运动鞋', 60, '0_8_60_568', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (569, '篮球鞋', '篮球鞋', 60, '0_8_60_569', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (570, '拖鞋', '拖鞋', 60, '0_8_60_570', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (571, '板鞋', '板鞋', 60, '0_8_60_571', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (572, '运动包', '运动包', 60, '0_8_60_572', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (573, '足球鞋', '足球鞋', 60, '0_8_60_573', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (574, '其它', '其它', 61, '0_8_61_574', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (575, '泳镜', '泳镜', 61, '0_8_61_575', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (576, '泳帽', '泳帽', 61, '0_8_61_576', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (577, '游泳包防水包', '游泳包防水包', 61, '0_8_61_577', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (578, '男士泳衣', '男士泳衣', 61, '0_8_61_578', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (579, '女士泳衣', '女士泳衣', 61, '0_8_61_579', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (580, '比基尼', '比基尼', 61, '0_8_61_580', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (581, 'T恤', 'T恤', 62, '0_8_62_581', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (582, '棉服', '棉服', 62, '0_8_62_582', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (583, '运动裤', '运动裤', 62, '0_8_62_583', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (584, '夹克/风衣', '夹克/风衣', 62, '0_8_62_584', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (585, '运动配饰', '运动配饰', 62, '0_8_62_585', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (586, '运动背心', '运动背心', 62, '0_8_62_586', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (587, '乒羽网服', '乒羽网服', 62, '0_8_62_587', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (588, '运动套装', '运动套装', 62, '0_8_62_588', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (589, '训练服', '训练服', 62, '0_8_62_589', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (590, '羽绒服', '羽绒服', 62, '0_8_62_590', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (591, '毛衫/线衫', '毛衫/线衫', 62, '0_8_62_591', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (592, '卫衣/套头衫', '卫衣/套头衫', 62, '0_8_62_592', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (593, '瑜伽舞蹈', '瑜伽舞蹈', 63, '0_8_63_593', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (594, '跑步机', '跑步机', 63, '0_8_63_594', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (595, '武术搏击', '武术搏击', 63, '0_8_63_595', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (596, '健身车/动感单车', '健身车/动感单车', 63, '0_8_63_596', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (597, '综合训练器', '综合训练器', 63, '0_8_63_597', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (598, '哑铃', '哑铃', 63, '0_8_63_598', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (599, '其他大型器械', '其他大型器械', 63, '0_8_63_599', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (600, '仰卧板/收腹机', '仰卧板/收腹机', 63, '0_8_63_600', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (601, '其他中小型器材', '其他中小型器材', 63, '0_8_63_601', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (602, '甩脂机', '甩脂机', 63, '0_8_63_602', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (603, '踏步机', '踏步机', 63, '0_8_63_603', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (604, '运动护具', '运动护具', 63, '0_8_63_604', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (605, '平衡车', '平衡车', 64, '0_8_64_605', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (606, '其他整车', '其他整车', 64, '0_8_64_606', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (607, '骑行装备', '骑行装备', 64, '0_8_64_607', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (608, '骑行服', '骑行服', 64, '0_8_64_608', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (609, '山地车/公路车', '山地车/公路车', 64, '0_8_64_609', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (610, '折叠车', '折叠车', 64, '0_8_64_610', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (611, '电动车', '电动车', 64, '0_8_64_611', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (612, '电源', '电源', 65, '0_9_65_612', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (613, '导航仪', '导航仪', 65, '0_9_65_613', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (614, '智能驾驶', '智能驾驶', 65, '0_9_65_614', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (615, '安全预警仪', '安全预警仪', 65, '0_9_65_615', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (616, '车载电台', '车载电台', 65, '0_9_65_616', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (617, '行车记录仪', '行车记录仪', 65, '0_9_65_617', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (618, '吸尘器', '吸尘器', 65, '0_9_65_618', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (619, '倒车雷达', '倒车雷达', 65, '0_9_65_619', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (620, '冰箱', '冰箱', 65, '0_9_65_620', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (621, '蓝牙设备', '蓝牙设备', 65, '0_9_65_621', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (622, '时尚影音', '时尚影音', 65, '0_9_65_622', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (623, '净化器', '净化器', 65, '0_9_65_623', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (624, '清洁剂', '清洁剂', 66, '0_9_66_624', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (625, '洗车工具', '洗车工具', 66, '0_9_66_625', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (626, '洗车配件', '洗车配件', 66, '0_9_66_626', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (627, '车蜡', '车蜡', 66, '0_9_66_627', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (628, '补漆笔', '补漆笔', 66, '0_9_66_628', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (629, '玻璃水', '玻璃水', 66, '0_9_66_629', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (630, '香水', '香水', 67, '0_9_67_630', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (631, '空气净化', '空气净化', 67, '0_9_67_631', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (632, '车内饰品', '车内饰品', 67, '0_9_67_632', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (633, '脚垫', '脚垫', 67, '0_9_67_633', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (634, '功能小件', '功能小件', 67, '0_9_67_634', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (635, '座垫', '座垫', 67, '0_9_67_635', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (636, '车身装饰件', '车身装饰件', 67, '0_9_67_636', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (637, '座套', '座套', 67, '0_9_67_637', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (638, '车衣', '车衣', 67, '0_9_67_638', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (639, '后备箱垫', '后备箱垫', 67, '0_9_67_639', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (640, '头枕腰靠', '头枕腰靠', 67, '0_9_67_640', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (641, '充气泵', '充气泵', 68, '0_9_68_641', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (642, '防盗设备', '防盗设备', 68, '0_9_68_642', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (643, '应急救援', '应急救援', 68, '0_9_68_643', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (644, '保温箱', '保温箱', 68, '0_9_68_644', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (645, '储物箱', '储物箱', 68, '0_9_68_645', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (646, '自驾野营', '自驾野营', 68, '0_9_68_646', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (647, '安全座椅', '安全座椅', 68, '0_9_68_647', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (648, '摩托车装备', '摩托车装备', 68, '0_9_68_648', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (649, '胎压监测', '胎压监测', 68, '0_9_68_649', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (650, '功能升级服务', '功能升级服务', 69, '0_9_69_650', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (651, '保养维修服务', '保养维修服务', 69, '0_9_69_651', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (652, '清洗美容服务', '清洗美容服务', 69, '0_9_69_652', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (653, '跑车', '跑车', 70, '0_9_70_653', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (654, '微型车', '微型车', 70, '0_9_70_654', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (655, '小型车', '小型车', 70, '0_9_70_655', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (656, '紧凑型车', '紧凑型车', 70, '0_9_70_656', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (657, '中型车', '中型车', 70, '0_9_70_657', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (658, '中大型车', '中大型车', 70, '0_9_70_658', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (659, '豪华车', '豪华车', 70, '0_9_70_659', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (660, 'MPV', 'MPV', 70, '0_9_70_660', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (661, 'SUV', 'SUV', 70, '0_9_70_661', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (662, '上海大众', '上海大众', 71, '0_9_71_662', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (663, '斯柯达', '斯柯达', 71, '0_9_71_663', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (664, '东风雪铁龙', '东风雪铁龙', 71, '0_9_71_664', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (665, '一汽奔腾', '一汽奔腾', 71, '0_9_71_665', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (666, '北汽新能源', '北汽新能源', 71, '0_9_71_666', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (667, '陆风', '陆风', 71, '0_9_71_667', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (668, '海马', '海马', 71, '0_9_71_668', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (669, '润滑油', '润滑油', 72, '0_9_72_669', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (670, '轮胎', '轮胎', 72, '0_9_72_670', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (671, '改装配件', '改装配件', 72, '0_9_72_671', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (672, '添加剂', '添加剂', 72, '0_9_72_672', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (673, '轮毂', '轮毂', 72, '0_9_72_673', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (674, '防冻液', '防冻液', 72, '0_9_72_674', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (675, '刹车片/盘', '刹车片/盘', 72, '0_9_72_675', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (676, '滤清器', '滤清器', 72, '0_9_72_676', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (677, '维修配件', '维修配件', 72, '0_9_72_677', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (678, '火花塞', '火花塞', 72, '0_9_72_678', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (679, '蓄电池', '蓄电池', 72, '0_9_72_679', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (680, '雨刷', '雨刷', 72, '0_9_72_680', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (681, '底盘装甲/护板', '底盘装甲/护板', 72, '0_9_72_681', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (682, '车灯', '车灯', 72, '0_9_72_682', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (683, '贴膜', '贴膜', 72, '0_9_72_683', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (684, '后视镜', '后视镜', 72, '0_9_72_684', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (685, '汽修工具', '汽修工具', 72, '0_9_72_685', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (686, '宝宝护肤', '宝宝护肤', 73, '0_10_73_686', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (687, '宝宝洗浴', '宝宝洗浴', 73, '0_10_73_687', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (688, '理发器', '理发器', 73, '0_10_73_688', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (689, '洗衣液/皂', '洗衣液/皂', 73, '0_10_73_689', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (690, '奶瓶清洗', '奶瓶清洗', 73, '0_10_73_690', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (691, '日常护理', '日常护理', 73, '0_10_73_691', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (692, '座便器', '座便器', 73, '0_10_73_692', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (693, '驱蚊防蚊', '驱蚊防蚊', 73, '0_10_73_693', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (694, '奶瓶奶嘴', '奶瓶奶嘴', 74, '0_10_74_694', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (695, '吸奶器', '吸奶器', 74, '0_10_74_695', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (696, '牙胶安抚', '牙胶安抚', 74, '0_10_74_696', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (697, '暖奶消毒', '暖奶消毒', 74, '0_10_74_697', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (698, '辅食料理机', '辅食料理机', 74, '0_10_74_698', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (699, '碗盘叉勺', '碗盘叉勺', 74, '0_10_74_699', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (700, '水壶/水杯', '水壶/水杯', 74, '0_10_74_700', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (701, '婴儿推车', '婴儿推车', 75, '0_10_75_701', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (702, '餐椅摇椅', '餐椅摇椅', 75, '0_10_75_702', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (703, '学步车', '学步车', 75, '0_10_75_703', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (704, '三轮车', '三轮车', 75, '0_10_75_704', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (705, '自行车', '自行车', 75, '0_10_75_705', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (706, '扭扭车', '扭扭车', 75, '0_10_75_706', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (707, '滑板车', '滑板车', 75, '0_10_75_707', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (708, '婴儿床', '婴儿床', 75, '0_10_75_708', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (709, '电动车', '电动车', 75, '0_10_75_709', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (710, '提篮式', '提篮式', 76, '0_10_76_710', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (711, '安全座椅', '安全座椅', 76, '0_10_76_711', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (712, '增高垫', '增高垫', 76, '0_10_76_712', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (713, '安全防护', '安全防护', 77, '0_10_77_713', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (714, '婴儿外出服', '婴儿外出服', 77, '0_10_77_714', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (715, '婴儿内衣', '婴儿内衣', 77, '0_10_77_715', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (716, '婴儿礼盒', '婴儿礼盒', 77, '0_10_77_716', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (717, '婴儿鞋帽袜', '婴儿鞋帽袜', 77, '0_10_77_717', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (718, '家居床品', '家居床品', 77, '0_10_77_718', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (719, '婴幼奶粉', '婴幼奶粉', 78, '0_10_78_719', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (720, '成人奶粉', '成人奶粉', 78, '0_10_78_720', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (721, '待产/新生', '待产/新生', 79, '0_10_79_721', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (722, '孕妇装', '孕妇装', 79, '0_10_79_722', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (723, '孕期营养', '孕期营养', 79, '0_10_79_723', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (724, '防辐射服', '防辐射服', 79, '0_10_79_724', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (725, '妈咪包/背婴带', '妈咪包/背婴带', 79, '0_10_79_725', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (726, '产后塑身', '产后塑身', 79, '0_10_79_726', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (727, '孕妈美容', '孕妈美容', 79, '0_10_79_727', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (728, '文胸/内裤', '文胸/内裤', 79, '0_10_79_728', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (729, '月子装', '月子装', 79, '0_10_79_729', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (730, '米粉/菜粉', '米粉/菜粉', 80, '0_10_80_730', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (731, '果泥/果汁', '果泥/果汁', 80, '0_10_80_731', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (732, '面条/粥', '面条/粥', 80, '0_10_80_732', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (733, '宝宝零食', '宝宝零食', 80, '0_10_80_733', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (734, 'DHA', 'DHA', 80, '0_10_80_734', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (735, '钙铁锌/维生素', '钙铁锌/维生素', 80, '0_10_80_735', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (736, '益生菌/初乳', '益生菌/初乳', 80, '0_10_80_736', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (737, '清火/开胃', '清火/开胃', 80, '0_10_80_737', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (738, '配饰', '配饰', 81, '0_10_81_738', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (739, '亲子装', '亲子装', 81, '0_10_81_739', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (740, '羽绒服/棉服', '羽绒服/棉服', 81, '0_10_81_740', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (741, '套装', '套装', 81, '0_10_81_741', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (742, '运动服', '运动服', 81, '0_10_81_742', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (743, '上衣', '上衣', 81, '0_10_81_743', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (744, '靴子', '靴子', 81, '0_10_81_744', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (745, '运动鞋', '运动鞋', 81, '0_10_81_745', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (746, '演出服', '演出服', 81, '0_10_81_746', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (747, '裙子', '裙子', 81, '0_10_81_747', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (748, '裤子', '裤子', 81, '0_10_81_748', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (749, '功能鞋', '功能鞋', 81, '0_10_81_749', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (750, '内衣', '内衣', 81, '0_10_81_750', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (751, '凉鞋', '凉鞋', 81, '0_10_81_751', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (752, '皮鞋/帆布鞋', '皮鞋/帆布鞋', 81, '0_10_81_752', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (753, '婴儿尿裤', '婴儿尿裤', 82, '0_10_82_753', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (754, '拉拉裤', '拉拉裤', 82, '0_10_82_754', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (755, '成人尿裤', '成人尿裤', 82, '0_10_82_755', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (756, '湿巾', '湿巾', 82, '0_10_82_756', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (757, '健身玩具', '健身玩具', 83, '0_10_83_757', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (758, '适用年龄', '适用年龄', 83, '0_10_83_758', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (759, '娃娃玩具', '娃娃玩具', 83, '0_10_83_759', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (760, '遥控/电动', '遥控/电动', 83, '0_10_83_760', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (761, 'DIY玩具', 'DIY玩具', 83, '0_10_83_761', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (762, '益智玩具', '益智玩具', 83, '0_10_83_762', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (763, '创意减压', '创意减压', 83, '0_10_83_763', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (764, '积木拼插', '积木拼插', 83, '0_10_83_764', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (765, '乐器相关', '乐器相关', 83, '0_10_83_765', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (766, '动漫玩具', '动漫玩具', 83, '0_10_83_766', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (767, '毛绒布艺', '毛绒布艺', 83, '0_10_83_767', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (768, '模型玩具', '模型玩具', 83, '0_10_83_768', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (769, '游戏', '游戏', 84, '0_11_84_769', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (770, '影视/动漫周边', '影视/动漫周边', 84, '0_11_84_770', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (771, '音乐', '音乐', 84, '0_11_84_771', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (772, '影视', '影视', 84, '0_11_84_772', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (773, '教育音像', '教育音像', 84, '0_11_84_773', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (774, '港台图书', '港台图书', 85, '0_11_85_774', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (775, '杂志/期刊', '杂志/期刊', 85, '0_11_85_775', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (777, '科普', '科普', 86, '0_11_86_777', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (778, '幼儿启蒙', '幼儿启蒙', 86, '0_11_86_778', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (779, '0-2岁', '0-2岁', 86, '0_11_86_779', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (780, '手工游戏', '手工游戏', 86, '0_11_86_780', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (781, '3-6岁', '3-6岁', 86, '0_11_86_781', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (782, '智力开发', '智力开发', 86, '0_11_86_782', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (783, '7-10岁', '7-10岁', 86, '0_11_86_783', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (784, '11-14岁', '11-14岁', 86, '0_11_86_784', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (785, '儿童文学', '儿童文学', 86, '0_11_86_785', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (786, '绘本', '绘本', 86, '0_11_86_786', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (787, '外文原版', '外文原版', 87, '0_11_87_787', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (788, '畅读VIP', '畅读VIP', 87, '0_11_87_788', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (789, '免费', '免费', 87, '0_11_87_789', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (790, '小说', '小说', 87, '0_11_87_790', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (791, '励志与成功', '励志与成功', 87, '0_11_87_791', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (792, '经济金融', '经济金融', 87, '0_11_87_792', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (793, '文学', '文学', 87, '0_11_87_793', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (794, '社科', '社科', 87, '0_11_87_794', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (795, '婚恋两性', '婚恋两性', 87, '0_11_87_795', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (796, '字典词典', '字典词典', 88, '0_11_88_796', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (797, '教材', '教材', 88, '0_11_88_797', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (798, '中小学教辅', '中小学教辅', 88, '0_11_88_798', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (799, '考试', '考试', 88, '0_11_88_799', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (800, '外语学习', '外语学习', 88, '0_11_88_800', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (801, '通俗流行', '通俗流行', 89, '0_11_89_801', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (802, '古典音乐', '古典音乐', 89, '0_11_89_802', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (803, '摇滚说唱', '摇滚说唱', 89, '0_11_89_803', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (804, '爵士蓝调', '爵士蓝调', 89, '0_11_89_804', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (805, '乡村民谣', '乡村民谣', 89, '0_11_89_805', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (806, '有声读物', '有声读物', 89, '0_11_89_806', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (807, '小说', '小说', 90, '0_11_90_807', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (808, '文学', '文学', 90, '0_11_90_808', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (809, '青春文学', '青春文学', 90, '0_11_90_809', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (810, '传记', '传记', 90, '0_11_90_810', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (811, '动漫', '动漫', 90, '0_11_90_811', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (812, '艺术', '艺术', 90, '0_11_90_812', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (813, '摄影', '摄影', 90, '0_11_90_813', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (814, '管理', '管理', 91, '0_11_91_814', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (815, '金融与投资', '金融与投资', 91, '0_11_91_815', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (816, '经济', '经济', 91, '0_11_91_816', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (817, '励志与成功', '励志与成功', 91, '0_11_91_817', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (818, '哲学/宗教', '哲学/宗教', 92, '0_11_92_818', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (819, '社会科学', '社会科学', 92, '0_11_92_819', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (820, '法律', '法律', 92, '0_11_92_820', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (821, '文化', '文化', 92, '0_11_92_821', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (822, '历史', '历史', 92, '0_11_92_822', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (823, '心理学', '心理学', 92, '0_11_92_823', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (824, '政治/军事', '政治/军事', 92, '0_11_92_824', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (825, '国学/古籍', '国学/古籍', 92, '0_11_92_825', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (826, '美食', '美食', 93, '0_11_93_826', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (827, '时尚美妆', '时尚美妆', 93, '0_11_93_827', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (828, '家居', '家居', 93, '0_11_93_828', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (829, '手工DIY', '手工DIY', 93, '0_11_93_829', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (830, '家教与育儿', '家教与育儿', 93, '0_11_93_830', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (831, '两性', '两性', 93, '0_11_93_831', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (832, '孕产', '孕产', 93, '0_11_93_832', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (833, '体育', '体育', 93, '0_11_93_833', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (834, '健身保健', '健身保健', 93, '0_11_93_834', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (835, '旅游/地图', '旅游/地图', 93, '0_11_93_835', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (836, '建筑', '建筑', 94, '0_11_94_836', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (837, '工业技术', '工业技术', 94, '0_11_94_837', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (838, '电子/通信', '电子/通信', 94, '0_11_94_838', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (839, '医学', '医学', 94, '0_11_94_839', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (840, '科学与自然', '科学与自然', 94, '0_11_94_840', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (841, '农林', '农林', 94, '0_11_94_841', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (842, '计算机与互联网', '计算机与互联网', 94, '0_11_94_842', 3, 1, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (843, '科普', '科普', 94, '0_11_94_843', 3, 50, 1, '', 0, 0, 0);
INSERT INTO `goods_category` VALUES (845, '测试', '', 12, '0_1_12_845', 3, 11, 0, '', 0, 0, 0);
COMMIT;

-- ----------------------------
-- Table structure for goods_type
-- ----------------------------
DROP TABLE IF EXISTS `goods_type`;
CREATE TABLE `goods_type` (
  `id` int(10) NOT NULL,
  `name` varchar(60) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `PK__goods_ty__3213E83F13F1F5EB` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods_type
-- ----------------------------
BEGIN;
INSERT INTO `goods_type` VALUES (4, '手机');
INSERT INTO `goods_type` VALUES (8, '化妆品');
INSERT INTO `goods_type` VALUES (15, '平板电脑');
INSERT INTO `goods_type` VALUES (16, '路由器');
INSERT INTO `goods_type` VALUES (18, '电视');
INSERT INTO `goods_type` VALUES (29, '冰箱');
INSERT INTO `goods_type` VALUES (34, '雪地鞋');
INSERT INTO `goods_type` VALUES (35, '护手霜');
INSERT INTO `goods_type` VALUES (36, '薯片');
COMMIT;

-- ----------------------------
-- Table structure for newbrand
-- ----------------------------
DROP TABLE IF EXISTS `newbrand`;
CREATE TABLE `newbrand` (
  `id` int(10) NOT NULL DEFAULT '0',
  `name` varchar(60) NOT NULL DEFAULT '',
  `cat_name` varchar(128) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of newbrand
-- ----------------------------
BEGIN;
INSERT INTO `newbrand` VALUES (1, '华为/HUAWEI', '手机、数码、配件');
INSERT INTO `newbrand` VALUES (4, '索尼/SONY', '手机、数码、配件');
INSERT INTO `newbrand` VALUES (5, '诺基亚/NOKIA', '手机、数码、配件');
INSERT INTO `newbrand` VALUES (6, 'TCL', '手机、数码、配件');
INSERT INTO `newbrand` VALUES (7, '飞利浦/PHILIPS', '手机、数码、配件');
INSERT INTO `newbrand` VALUES (8, 'OPPO', '手机、数码、配件');
INSERT INTO `newbrand` VALUES (9, '苹果/Apple', '手机、数码、配件');
INSERT INTO `newbrand` VALUES (14, '海尔/Haier', '手机、数码、配件');
INSERT INTO `newbrand` VALUES (15, '三星/SAMSUNG', '手机、数码、配件');
INSERT INTO `newbrand` VALUES (19, '海信/Hisense', '手机、数码、配件');
INSERT INTO `newbrand` VALUES (347, '创维/Skyworth', '手机、数码、配件');
INSERT INTO `newbrand` VALUES (348, '创维/Skyworth', '手机、数码、配件');
COMMIT;

-- ----------------------------
-- Table structure for orderform
-- ----------------------------
DROP TABLE IF EXISTS `orderform`;
CREATE TABLE `orderform` (
  `order_id` int(10) NOT NULL,
  `order_sn` varchar(20) NOT NULL DEFAULT '',
  `user_id` int(10) NOT NULL,
  `order_status` int(10) NOT NULL,
  `shipping_status` int(10) NOT NULL,
  `pay_status` int(10) NOT NULL,
  `consignee` varchar(60) NOT NULL DEFAULT '',
  `country` varchar(50) NOT NULL DEFAULT '0',
  `province` int(10) NOT NULL,
  `city` int(10) NOT NULL,
  `district` int(10) NOT NULL,
  `twon` int(10) DEFAULT NULL,
  `address` varchar(255) NOT NULL DEFAULT '',
  `zipcode` varchar(60) NOT NULL DEFAULT '',
  `mobile` varchar(60) NOT NULL DEFAULT '',
  `email` varchar(60) NOT NULL DEFAULT '',
  `pay_code` varchar(32) NOT NULL DEFAULT '',
  `pay_name` varchar(120) NOT NULL DEFAULT '',
  `goods_price` decimal(10,2) NOT NULL,
  `order_amount` decimal(10,2) NOT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `add_time` int(10) NOT NULL,
  `shipping_time` int(10) DEFAULT NULL,
  `confirm_time` int(10) DEFAULT NULL,
  `pay_time` int(10) NOT NULL,
  `discount` decimal(10,2) NOT NULL,
  `user_note` varchar(255) NOT NULL DEFAULT '',
  `admin_note` varchar(255) DEFAULT '',
  PRIMARY KEY (`order_id`),
  UNIQUE KEY `PK__orderfor__4659622910216507` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of orderform
-- ----------------------------
BEGIN;
INSERT INTO `orderform` VALUES (826, '201706081729418431', 2589, 4, 1, 1, '小明', '日本', 7531, 7532, 0, 7710, '深圳东门深南东路4003号世界金融中心B座4楼', '12323', '18910441212', '', '', '', 399.00, 399.00, 399.00, 1483203600, 0, 1496914220, 1496914187, 0.00, '', '');
INSERT INTO `orderform` VALUES (827, '201706081732158111', 2589, 4, 1, 1, '小明', '日本', 7531, 7532, 0, 7710, '深圳东门深南东路4003号世界金融中心B座4楼', '12323', '18910441212', '', '', '', 2000.00, 2000.00, 2000.00, 1488474000, 0, 1496914366, 1496914341, 0.00, '', '');
INSERT INTO `orderform` VALUES (828, '201706090846205237', 2589, 4, 1, 1, '小明', '日本', 7531, 7532, 0, 7710, '深圳东门深南东路4003号世界金融中心B座4楼', '12323', '18910441212', '', '', '', 1999.00, 1999.00, 1999.00, 1488474000, 0, 1496969232, 1496969187, 0.00, '', '');
INSERT INTO `orderform` VALUES (829, '201706090849505219', 2589, 4, 1, 1, '小明', '日本', 7531, 7532, 0, 7710, '深圳东门深南东路4003号世界金融中心B座4楼', '12323', '18910441212', '', '', '', 1399.00, 1399.00, 1399.00, 1491152400, 0, 1496969417, 1496969396, 0.00, '', '');
INSERT INTO `orderform` VALUES (830, '201706191623342538', 2589, 1, 0, 1, '小明', '日本', 7531, 7532, 0, 7710, '深圳东门深南东路4003号世界金融中心B座4楼', '12323', '18910441212', '', '', '', 48.00, 48.00, 48.00, 1493744400, 0, 0, 0, 0.00, '', '');
INSERT INTO `orderform` VALUES (831, '201706191706011466', 2589, 1, 0, 1, '明日科技', '中国', 7531, 7532, 7533, 0, '北京朝阳北路104号楼4层402室', '131200', '13578982158', '', '', '', 96.00, 96.00, 96.00, 1493744400, 0, 0, 0, 0.00, '', '');
INSERT INTO `orderform` VALUES (832, '201706191721157693', 2589, 2, 1, 1, '明日科技', '中国', 7531, 7532, 7533, 0, '北京朝阳北路104号楼4层402室', '131200', '13578982158', '', '', '', 96.00, 96.00, 96.00, 1497864075, 0, 1506494083, 1497865238, 0.00, '', '');
INSERT INTO `orderform` VALUES (833, '201706201658329117', 2589, 4, 1, 1, '明日科技', '中国', 7531, 7532, 7533, 0, '北京朝阳北路104号楼4层402室', '131200', '13578982158', '', '', '', 1999.00, 1999.00, 1999.00, 1497949112, 0, 1506491492, 1497949119, 0.00, '', '');
INSERT INTO `orderform` VALUES (835, '201709271519568300', 2589, 0, 0, 1, 'andy', '美国', 7531, 7532, 7534, 7535, '上海海淀西三环北路21号', '', '13211111111', '', '', '', 48.00, 48.00, 48.00, 1506496796, 0, 0, 1506496804, 0.00, '', '');
INSERT INTO `orderform` VALUES (836, '201709271605249732', 2589, 4, 1, 1, 'andy', '美国', 7531, 7532, 7534, 7535, '上海海淀西三环北路21号', '', '13211111111', '', '', '', 18000.00, 18000.00, 18000.00, 1506499524, 0, 1506499958, 1506499531, 0.00, '', '');
COMMIT;

-- ----------------------------
-- Table structure for tb_book
-- ----------------------------
DROP TABLE IF EXISTS `tb_book`;
CREATE TABLE `tb_book` (
  `tb_book_id` int(10) NOT NULL AUTO_INCREMENT,
  `book_name` varchar(50) DEFAULT NULL,
  `book_sort` varchar(50) DEFAULT NULL,
  `book_number` varchar(50) DEFAULT NULL,
  `book_price` decimal(19,4) DEFAULT NULL,
  `tb_book_author` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`tb_book_id`),
  UNIQUE KEY `PK_tb_book09` (`tb_book_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_book
-- ----------------------------
BEGIN;
INSERT INTO `tb_book` VALUES (1, 'PHP函数参考大全', 'PHP', '1001-100-102', 89.0000, '潘一');
INSERT INTO `tb_book` VALUES (2, 'PHP范例宝典', 'PHP', '1001-100-103', 78.0000, '刘一');
INSERT INTO `tb_book` VALUES (3, 'ASP经验技巧宝典', 'ASP', '1001-101-101', 79.0000, '王一');
INSERT INTO `tb_book` VALUES (4, 'SQL server开发技术大全', 'SQL数据库', '1001-102-100', 69.0000, '李一');
INSERT INTO `tb_book` VALUES (5, 'PHP网络编程自学手册', 'PHP', '1001-100-104', 52.0000, '潘一');
INSERT INTO `tb_book` VALUES (6, 'Visual C++从入门到精通', 'VC', '1001-101-101', 89.0000, '郭一');
COMMIT;

-- ----------------------------
-- Table structure for tb_book_author
-- ----------------------------
DROP TABLE IF EXISTS `tb_book_author`;
CREATE TABLE `tb_book_author` (
  `tb_book_author` varchar(50) DEFAULT NULL,
  `tb_author_department` varchar(50) DEFAULT NULL,
  `tb_author_resume` varchar(100) DEFAULT NULL,
  `tb_book_author_id` int(10) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`tb_book_author_id`),
  UNIQUE KEY `PK_tb_book_author09` (`tb_book_author_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_book_author
-- ----------------------------
BEGIN;
INSERT INTO `tb_book_author` VALUES ('潘一', 'PHP', '程序设计', 1);
INSERT INTO `tb_book_author` VALUES ('刘一', 'PHP', '程序设计', 2);
INSERT INTO `tb_book_author` VALUES ('郭一', 'VC', '应用程序开发', 3);
INSERT INTO `tb_book_author` VALUES ('王一', 'VC', '应用程序开发', 4);
COMMIT;

-- ----------------------------
-- Table structure for tb_name
-- ----------------------------
DROP TABLE IF EXISTS `tb_name`;
CREATE TABLE `tb_name` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_name
-- ----------------------------
BEGIN;
INSERT INTO `tb_name` VALUES (1, '丁三');
INSERT INTO `tb_name` VALUES (2, '李四');
INSERT INTO `tb_name` VALUES (3, '王五');
INSERT INTO `tb_name` VALUES (4, '赵六');
INSERT INTO `tb_name` VALUES (5, '钱七');
INSERT INTO `tb_name` VALUES (10, '哈哈哈');
INSERT INTO `tb_name` VALUES (11, '哈哈哈');
INSERT INTO `tb_name` VALUES (12, '哈哈哈');
COMMIT;

-- ----------------------------
-- Table structure for tb_user
-- ----------------------------
DROP TABLE IF EXISTS `tb_user`;
CREATE TABLE `tb_user` (
  `id` int(10) DEFAULT NULL,
  `name` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for user_address
-- ----------------------------
DROP TABLE IF EXISTS `user_address`;
CREATE TABLE `user_address` (
  `address_id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `consignee` varchar(60) NOT NULL DEFAULT '',
  `email` varchar(60) NOT NULL DEFAULT '',
  `country` varchar(50) NOT NULL DEFAULT '0',
  `province` int(10) NOT NULL,
  `city` int(10) NOT NULL,
  `district` int(10) NOT NULL,
  `twon` int(10) DEFAULT NULL,
  `address` varchar(120) NOT NULL DEFAULT '',
  `zipcode` varchar(60) NOT NULL DEFAULT '',
  `mobile` varchar(60) NOT NULL DEFAULT '',
  `is_default` int(10) DEFAULT NULL,
  `is_pickup` int(10) DEFAULT NULL,
  PRIMARY KEY (`address_id`),
  UNIQUE KEY `PK__user_add__CAA247C80C50D423` (`address_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_address
-- ----------------------------
BEGIN;
INSERT INTO `user_address` VALUES (8, 20, '   张乐乐', '', '中国', 19, 241, 2370, 0, '北京西城西四环中路130号', '', '13554754891', 0, 0);
INSERT INTO `user_address` VALUES (9, 20, '大漠孤鹰', '', '法国', 1, 36, 397, 0, '北京东城祈年大街8号', '', '13554745866', 1, 0);
INSERT INTO `user_address` VALUES (10, 21, '          赵四', '', '印度', 2, 37, 401, 0, '长春市朝阳区开运街56号', '518116', '13800138000', 1, 0);
INSERT INTO `user_address` VALUES (11, 23, '陈家洛', '', '中国', 1, 2, 3, 0, '上海静安寺南京西路1618号', '', '13012345678', 0, 0);
INSERT INTO `user_address` VALUES (13, 24, '      令狐冲', '', '中国', 636, 1291, 1319, 1320, '深圳市中福华三路36号', '123456', '13554754711', 1, 0);
INSERT INTO `user_address` VALUES (14, 24, '  独孤求败', '', '越南', 338, 339, 361, 362, '广州天河北路侨怡一街18号', '123456', '13554754132', 0, 0);
INSERT INTO `user_address` VALUES (15, 24, '杨过', '', '中国', 338, 569, 586, 587, '深圳市中福华三路26号', '123456', '13554754711', 1, 0);
INSERT INTO `user_address` VALUES (16, 40, '石中玉', '', '美国', 10808, 10809, 10811, 10812, '北京东城崇文门外大街40号', '', '18988888888', 1, 0);
COMMIT;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `user_id` int(10) NOT NULL,
  `email` varchar(60) NOT NULL DEFAULT '',
  `password` varchar(32) NOT NULL DEFAULT '',
  `sex` int(10) NOT NULL,
  `birthday` timestamp(6) NOT NULL DEFAULT '0000-00-00 00:00:00.000000',
  `pay_points` int(10) NOT NULL,
  `address_id` int(10) NOT NULL,
  `reg_time` timestamp(6) NOT NULL DEFAULT '0000-00-00 00:00:00.000000',
  `last_login` timestamp(6) NOT NULL DEFAULT '0000-00-00 00:00:00.000000',
  `last_ip` varchar(15) NOT NULL DEFAULT '',
  `qq` varchar(20) NOT NULL,
  `mobile` varchar(20) NOT NULL,
  `mobile_validated` int(10) NOT NULL,
  `oauth` varchar(10) DEFAULT '',
  `openid` varchar(100) DEFAULT 'L',
  `head_pic` varchar(255) DEFAULT 'L',
  `province` int(10) DEFAULT NULL,
  `city` int(10) DEFAULT NULL,
  `district` int(10) DEFAULT NULL,
  `email_validated` int(10) NOT NULL,
  `nickname` varchar(50) DEFAULT 'L',
  `level` int(10) DEFAULT NULL,
  `discount` decimal(10,2) DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `is_lock` int(10) DEFAULT NULL,
  `token` varchar(64) DEFAULT '',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `PK__users__B9BE370F300424B4` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
BEGIN;
INSERT INTO `users` VALUES (1, '240874144@qq.com', '1234567', 1, '1986-03-04 00:00:00.000000', 1, 1, '2017-02-19 00:00:00.000000', '2017-11-11 00:00:00.000000', '0.0.0.0', '511482696', '13800138006', 1, '', NULL, '', 5827, 6542, 6563, 1, 'Andy', 4, 0.92, 63136.04, 0, '00a1c0366b96e5c3bfff8bd1d85fa557');
INSERT INTO `users` VALUES (2, 'vip@dsads.com', '1234567', 0, '1987-06-15 01:00:00.000000', 0, 0, '2017-06-22 00:00:00.000000', '2017-11-11 00:00:00.000000', '', '', '', 0, '', NULL, NULL, 0, 0, 0, 0, NULL, 1, 1.00, 5663.56, 0, '');
INSERT INTO `users` VALUES (5, 'zuanshi@qqh.com', '1234567', 1, '1990-07-13 01:00:00.000000', 5281, 3, '2016-03-04 00:00:00.000000', '2016-12-05 00:00:00.000000', '127.0.0.1', '398145057', '13800138070', 0, '', NULL, NULL, 0, 0, 0, 0, NULL, 1, 1.00, 965.63, 0, '');
INSERT INTO `users` VALUES (13, 'abc@sohu.com', '1234567', 0, '1989-11-17 00:00:00.000000', 0, 0, '2015-08-07 00:00:00.000000', '2017-07-18 00:00:00.000000', '', '', '', 0, 'alipay', '2088502287689843', NULL, 0, 0, 0, 0, '支付宝用户', 1, 1.00, 1666.26, 0, '');
INSERT INTO `users` VALUES (14, '3665696@qq.com', '1234567', 0, '1984-01-28 00:00:00.000000', 0, 0, '2017-11-07 00:00:00.000000', '2017-08-29 00:00:00.000000', '', '', '', 0, 'alipay', '2088702176714764', NULL, 0, 0, 0, 0, '支付宝用户', 1, 1.00, 3996.88, 0, '');
INSERT INTO `users` VALUES (17, '569696326@qq.com', '1234567', 2, '1976-07-21 00:00:00.000000', 10, 0, '2016-12-12 00:00:00.000000', '2017-11-11 00:00:00.000000', '', '', '15889560679', 0, '', NULL, NULL, 0, 0, 0, 0, '微信用户', 1, 1.00, 13266.36, 0, '');
INSERT INTO `users` VALUES (23, '_xor@163.com', '1234567', 0, '0000-00-00 00:00:00.000000', 0, 0, '2017-05-27 00:00:00.000000', '2017-07-28 00:00:00.000000', '', '', '', 0, 'qq', '7EDE8DFC152E4775A9C2364F6AF8EE0F', NULL, 0, 0, 0, 0, 'QQ用户', 1, 1.00, 0.00, 0, '');
INSERT INTO `users` VALUES (40, 'ab_cd@sina.com', '1234567', 0, '1972-10-17 00:00:00.000000', 0, 0, '2016-08-20 00:00:00.000000', '2017-04-12 00:00:00.000000', '', '', '', 0, 'qq', 'FCC5C85BED6E6ABC35419FE368A00727', NULL, 0, 0, 0, 0, 'QQ用户', 1, 1.00, 0.00, 0, '');
COMMIT;

-- ----------------------------
-- View structure for goodsbrandtype
-- ----------------------------
DROP VIEW IF EXISTS `goodsbrandtype`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `goodsbrandtype` AS select `goods`.`goods_id` AS `goods_id`,`goods`.`goods_name` AS `goods_name`,`brand`.`name` AS `brand`,`goods_type`.`name` AS `type` from ((`goods` join `brand`) join `goods_type`) where ((`goods`.`brand_id` = `brand`.`id`) and (`goods`.`goods_type` = `goods_type`.`id`));

-- ----------------------------
-- View structure for goodsprice
-- ----------------------------
DROP VIEW IF EXISTS `goodsprice`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `goodsprice` AS select `goods`.`goods_id` AS `goods_id`,`goods`.`goods_name` AS `goods_name`,`goods`.`shop_price` AS `shop_price` from `goods`;

-- ----------------------------
-- Procedure structure for NewProc
-- ----------------------------
DROP PROCEDURE IF EXISTS `NewProc`;
delimiter ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `NewProc`(OUT param1 INT)
BEGIN
  #Routine body goes here...
  SELECT COUNT(*) INTO param1 FROM goods;
END;
;;
delimiter ;

-- ----------------------------
-- Procedure structure for newTable
-- ----------------------------
DROP PROCEDURE IF EXISTS `newTable`;
delimiter ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `newTable`(OUT param1 INT)
BEGIN
  SELECT COUNT(*) INTO param1 FROM goods;
END;
;;
delimiter ;

-- ----------------------------
-- Procedure structure for proc
-- ----------------------------
DROP PROCEDURE IF EXISTS `proc`;
delimiter ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `proc`(OUT param1 INT)
BEGIN
  #Routine body goes here...
  SELECT COUNT(*) INTO param1 FROM goods;
END;
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
