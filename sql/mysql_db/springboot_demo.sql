/*
 Navicat MySQL Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 50723
 Source Host           : localhost:3306
 Source Schema         : springboot_demo

 Target Server Type    : MySQL
 Target Server Version : 50723
 File Encoding         : 65001

 Date: 14/03/2020 22:40:25
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `nickname` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '昵称',
  `mobile` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '手机号',
  `password` char(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '密码hash值',
  `role` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT 'user' COMMENT '角色，角色名以逗号分隔',
  PRIMARY KEY (`id`),
  UNIQUE KEY `mobile_UNIQUE` (`mobile`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户表';

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES (1, 'abc1', '13512345678', '123', 'user');
INSERT INTO `user` VALUES (2, 'abc2', '13512345677', '123', 'user');
INSERT INTO `user` VALUES (3, 'abc3', '13512345603', '123', 'user');
INSERT INTO `user` VALUES (4, 'abc4', '13512345604', '123', 'user');
INSERT INTO `user` VALUES (5, 'abc5', '13512345605', '123', 'user');
INSERT INTO `user` VALUES (6, 'abc6', '13512345606', '123', 'user');
INSERT INTO `user` VALUES (7, 'abc7', '13512345607', '123', 'user');
INSERT INTO `user` VALUES (8, 'abc8', '13512345608', '123', 'user');
INSERT INTO `user` VALUES (9, 'abc9', '13512345609', '123', 'user');
INSERT INTO `user` VALUES (10, 'abc10', '13512345610', '123', 'user');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
