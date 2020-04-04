/*
 Navicat MySQL Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 50723
 Source Host           : localhost:3306
 Source Schema         : jdbc_demo

 Target Server Type    : MySQL
 Target Server Version : 50723
 File Encoding         : 65001

 Date: 14/03/2020 22:39:28
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for goddess
-- ----------------------------
DROP TABLE IF EXISTS `goddess`;
CREATE TABLE `goddess` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `user_name` char(200) COLLATE utf8_bin DEFAULT NULL,
  `age` int(40) DEFAULT NULL,
  `sex` int(10) DEFAULT NULL,
  `birthday` char(200) COLLATE utf8_bin DEFAULT NULL,
  `email` char(200) COLLATE utf8_bin DEFAULT NULL,
  `mobile` mediumtext COLLATE utf8_bin,
  `create_user` char(200) COLLATE utf8_bin DEFAULT NULL,
  `isDel` char(20) COLLATE utf8_bin DEFAULT NULL,
  `update_date` date DEFAULT NULL,
  `create_date` date DEFAULT NULL,
  `update_user` char(200) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of goddess
-- ----------------------------
BEGIN;
INSERT INTO `goddess` VALUES (2, 'lili', 20, 1, '2019-12-23', '2222@22.com', '1234567', 'zhang', '0', '2019-12-23', '2019-12-23', 'wang');
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` char(20) COLLATE utf8_bin NOT NULL,
  `age` int(10) DEFAULT NULL,
  `create_date` char(240) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES (9, 'gagaga', 0, '2019-12-23');
INSERT INTO `user` VALUES (10, 'gagaga', 20, '2019-12-23');
INSERT INTO `user` VALUES (23, 'gagaga', 20, '2019-12-23');
INSERT INTO `user` VALUES (25, 'gagaga', 20, '2019-12-23');
INSERT INTO `user` VALUES (27, 'gagaga', 20, '2019-12-23');
INSERT INTO `user` VALUES (29, 'gagaga', 20, '2019-12-23');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
