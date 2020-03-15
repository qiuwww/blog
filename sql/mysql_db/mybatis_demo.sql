/*
 Navicat MySQL Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 50723
 Source Host           : localhost:3306
 Source Schema         : mybatis_demo

 Target Server Type    : MySQL
 Target Server Version : 50723
 File Encoding         : 65001

 Date: 14/03/2020 22:39:56
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `name` char(20) COLLATE utf8_danish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_danish_ci COMMENT='用户表\n';

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES (1, 'user1');
INSERT INTO `user` VALUES (2, 'user2');
INSERT INTO `user` VALUES (7, 'userNameUpdated');
INSERT INTO `user` VALUES (8, 'userNameUpdated');
INSERT INTO `user` VALUES (9, 'userNameUpdated');
INSERT INTO `user` VALUES (10, 'userNameUpdated');
INSERT INTO `user` VALUES (11, 'userNameUpdated');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
