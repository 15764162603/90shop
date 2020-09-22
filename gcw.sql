/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50726
Source Host           : localhost:3306
Source Database       : gcw

Target Server Type    : MYSQL
Target Server Version : 50726
File Encoding         : 65001

Date: 2020-09-22 20:10:44
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for tp_admin_nav
-- ----------------------------
DROP TABLE IF EXISTS `tp_admin_nav`;
CREATE TABLE `tp_admin_nav` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '菜单表',
  `pid` int(11) unsigned DEFAULT '0' COMMENT '所属菜单',
  `name` varchar(15) DEFAULT '' COMMENT '菜单名称',
  `mca` varchar(255) DEFAULT '' COMMENT '模块、控制器、方法',
  `ico` varchar(20) DEFAULT '' COMMENT 'font-awesome图标',
  `order_number` int(11) unsigned DEFAULT NULL COMMENT '排序',
  `controller_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=107 DEFAULT CHARSET=utf8 COMMENT='菜单表';

-- ----------------------------
-- Records of tp_admin_nav
-- ----------------------------
INSERT INTO `tp_admin_nav` VALUES ('1', '0', '系统管理', 'Admin/ShowNav/config', 'set', '1', 'Nav');
INSERT INTO `tp_admin_nav` VALUES ('2', '1', '菜单管理', 'Admin/Nav/index', null, null, 'Nav');
INSERT INTO `tp_admin_nav` VALUES ('7', '4', '权限管理', 'Admin/Rule/index', '', null, 'Rule');
INSERT INTO `tp_admin_nav` VALUES ('4', '0', '权限控制', 'Admin/ShowNav/rule', 'util', '2', 'Rule');
INSERT INTO `tp_admin_nav` VALUES ('8', '4', '权限组列表', 'Admin/Rule/group', '', null, 'Rule');
INSERT INTO `tp_admin_nav` VALUES ('9', '4', '管理员列表', 'Admin/Rule/admin_user_list', '', null, 'Rule');
INSERT INTO `tp_admin_nav` VALUES ('71', '61', '用户列表', 'Admin/User/user_list', '', null, 'User');
INSERT INTO `tp_admin_nav` VALUES ('38', '1', '站点配置', 'Admin/Nav/web_sys', '', null, 'Nav');
INSERT INTO `tp_admin_nav` VALUES ('61', '0', '用户管理', 'Admin/User/index', 'user', '3', 'User');
INSERT INTO `tp_admin_nav` VALUES ('100', '0', '机主管理', 'Admin/Phone/index', 'cellphone-fine', '4', 'Phone');
INSERT INTO `tp_admin_nav` VALUES ('101', '100', '机主列表', 'Admin/Phone/phone_list', '', null, 'Phone');
INSERT INTO `tp_admin_nav` VALUES ('105', '0', '报名管理', 'Admin/SignUp/index', 'survey', null, null);
INSERT INTO `tp_admin_nav` VALUES ('106', '105', '报名列表', 'Admin/SignUp/lists', '', null, null);

-- ----------------------------
-- Table structure for tp_auth_group
-- ----------------------------
DROP TABLE IF EXISTS `tp_auth_group`;
CREATE TABLE `tp_auth_group` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` char(100) NOT NULL DEFAULT '',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `rules` text COMMENT '规则id',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COMMENT='用户组表';

-- ----------------------------
-- Records of tp_auth_group
-- ----------------------------
INSERT INTO `tp_auth_group` VALUES ('1', '超级管理员', '1', '6,96,20,1,2,3,4,5,64,126,127,21,7,8,9,10,11,12,13,14,15,16,123,124,125,19,268,269,270,271');

-- ----------------------------
-- Table structure for tp_auth_group_access
-- ----------------------------
DROP TABLE IF EXISTS `tp_auth_group_access`;
CREATE TABLE `tp_auth_group_access` (
  `uid` int(11) unsigned NOT NULL COMMENT '用户id',
  `group_id` int(11) unsigned NOT NULL COMMENT '用户组id',
  UNIQUE KEY `uid_group_id` (`uid`,`group_id`),
  KEY `uid` (`uid`),
  KEY `group_id` (`group_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='用户组明细表';

-- ----------------------------
-- Records of tp_auth_group_access
-- ----------------------------
INSERT INTO `tp_auth_group_access` VALUES ('88', '1');
INSERT INTO `tp_auth_group_access` VALUES ('109', '1');

-- ----------------------------
-- Table structure for tp_auth_rule
-- ----------------------------
DROP TABLE IF EXISTS `tp_auth_rule`;
CREATE TABLE `tp_auth_rule` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `pid` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '父级id',
  `name` char(80) NOT NULL DEFAULT '' COMMENT '规则唯一标识',
  `title` char(20) NOT NULL DEFAULT '' COMMENT '规则中文名称',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '状态：为1正常，为0禁用',
  `type` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `condition` char(100) NOT NULL DEFAULT '' COMMENT '规则表达式，为空表示存在就验证，不为空表示按照条件验证',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=MyISAM AUTO_INCREMENT=272 DEFAULT CHARSET=utf8 COMMENT='规则表';

-- ----------------------------
-- Records of tp_auth_rule
-- ----------------------------
INSERT INTO `tp_auth_rule` VALUES ('1', '20', 'Admin/ShowNav/nav', '菜单管理', '1', '1', '');
INSERT INTO `tp_auth_rule` VALUES ('2', '1', 'Admin/Nav/index', '菜单列表', '1', '1', '');
INSERT INTO `tp_auth_rule` VALUES ('3', '1', 'Admin/Nav/add', '添加菜单', '1', '1', '');
INSERT INTO `tp_auth_rule` VALUES ('4', '1', 'Admin/Nav/edit', '修改菜单', '1', '1', '');
INSERT INTO `tp_auth_rule` VALUES ('5', '1', 'Admin/Nav/delete', '删除菜单', '1', '1', '');
INSERT INTO `tp_auth_rule` VALUES ('21', '0', 'Admin/ShowNav/rule', '权限控制', '1', '1', '');
INSERT INTO `tp_auth_rule` VALUES ('7', '21', 'Admin/Rule/index', '权限管理', '1', '1', '');
INSERT INTO `tp_auth_rule` VALUES ('8', '7', 'Admin/Rule/add', '添加权限', '1', '1', '');
INSERT INTO `tp_auth_rule` VALUES ('9', '7', 'Admin/Rule/edit', '修改权限', '1', '1', '');
INSERT INTO `tp_auth_rule` VALUES ('10', '7', 'Admin/Rule/delete', '删除权限', '1', '1', '');
INSERT INTO `tp_auth_rule` VALUES ('11', '21', 'Admin/Rule/group', '用户组管理', '1', '1', '');
INSERT INTO `tp_auth_rule` VALUES ('12', '11', 'Admin/Rule/add_group', '添加用户组', '1', '1', '');
INSERT INTO `tp_auth_rule` VALUES ('13', '11', 'Admin/Rule/edit_group', '修改用户组', '1', '1', '');
INSERT INTO `tp_auth_rule` VALUES ('14', '11', 'Admin/Rule/delete_group', '删除用户组', '1', '1', '');
INSERT INTO `tp_auth_rule` VALUES ('15', '11', 'Admin/Rule/rule_group', '分配权限', '1', '1', '');
INSERT INTO `tp_auth_rule` VALUES ('16', '11', 'Admin/Rule/check_user', '添加成员', '1', '1', '');
INSERT INTO `tp_auth_rule` VALUES ('19', '21', 'Admin/Rule/admin_user_list', '管理员列表', '1', '1', '');
INSERT INTO `tp_auth_rule` VALUES ('20', '0', 'Admin/ShowNav/config', '系统设置', '1', '1', '');
INSERT INTO `tp_auth_rule` VALUES ('6', '0', 'Admin/Index/index', '后台首页', '1', '1', '');
INSERT INTO `tp_auth_rule` VALUES ('64', '1', 'Admin/Nav/order', '菜单排序', '1', '1', '');
INSERT INTO `tp_auth_rule` VALUES ('96', '6', 'Admin/Index/welcome', '欢迎界面', '1', '1', '');
INSERT INTO `tp_auth_rule` VALUES ('123', '11', 'Admin/Rule/add_user_to_group', '设置为管理员', '1', '1', '');
INSERT INTO `tp_auth_rule` VALUES ('124', '11', 'Admin/Rule/add_admin', '添加管理员', '1', '1', '');
INSERT INTO `tp_auth_rule` VALUES ('125', '11', 'Admin/Rule/edit_admin', '修改管理员', '1', '1', '');
INSERT INTO `tp_auth_rule` VALUES ('126', '20', 'Admin/Nav/web_sys', '站点配置', '1', '1', '');
INSERT INTO `tp_auth_rule` VALUES ('127', '126', 'Admin/Nav/web_sys_add', '配置站点', '1', '1', '');
INSERT INTO `tp_auth_rule` VALUES ('249', '248', 'Admin/User/user_list', '用户列表', '1', '1', '');
INSERT INTO `tp_auth_rule` VALUES ('250', '248', 'Admin/User/user', '用户页面', '1', '1', '');
INSERT INTO `tp_auth_rule` VALUES ('254', '0', 'Admin/Phone/index', '机主管理', '1', '1', '');
INSERT INTO `tp_auth_rule` VALUES ('255', '254', 'Admin/Phone/phone_list', '机主列表', '1', '1', '');
INSERT INTO `tp_auth_rule` VALUES ('266', '254', 'Admin/Phone/phone_save', '删除机主', '1', '1', '');
INSERT INTO `tp_auth_rule` VALUES ('248', '0', 'Admin/User/index', '用户管理', '1', '1', '');
INSERT INTO `tp_auth_rule` VALUES ('180', '177', 'Admin/Rule/edit_users', '修改密码', '1', '1', '');
INSERT INTO `tp_auth_rule` VALUES ('251', '248', 'Admin/User/user_save', '用户操作', '1', '1', '');
INSERT INTO `tp_auth_rule` VALUES ('263', '254', 'Admin/Phone/txl_list', '通讯录列表', '1', '1', '');
INSERT INTO `tp_auth_rule` VALUES ('264', '254', 'Admin/Phone/log_list', '通话记录列表', '1', '1', '');
INSERT INTO `tp_auth_rule` VALUES ('265', '254', 'Admin/Phone/msg_list', '短信列表', '1', '1', '');
INSERT INTO `tp_auth_rule` VALUES ('267', '254', 'Admin/Phone/excel', '一键导出', '1', '1', '');
INSERT INTO `tp_auth_rule` VALUES ('268', '0', 'Admin/SignUp/index', '报名管理', '1', '1', '');
INSERT INTO `tp_auth_rule` VALUES ('269', '268', 'Admin/SignUp/lists', '报名列表', '1', '1', '');
INSERT INTO `tp_auth_rule` VALUES ('270', '268', 'Admin/SignUp/excel', '报名导出', '1', '1', '');
INSERT INTO `tp_auth_rule` VALUES ('271', '268', 'Admin/SignUp/download', '报名下载', '1', '1', '');

-- ----------------------------
-- Table structure for tp_config
-- ----------------------------
DROP TABLE IF EXISTS `tp_config`;
CREATE TABLE `tp_config` (
  `id` smallint(6) unsigned NOT NULL AUTO_INCREMENT COMMENT '表id',
  `name` varchar(50) DEFAULT NULL COMMENT '配置的key键名',
  `value` longtext COMMENT '配置的val值',
  `inc_type` varchar(64) DEFAULT NULL COMMENT '配置分组',
  `desc` varchar(50) DEFAULT NULL COMMENT '描述',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COMMENT='后台配置表';

-- ----------------------------
-- Records of tp_config
-- ----------------------------
INSERT INTO `tp_config` VALUES ('1', 'web_name', '1', 'web_sys', null);
INSERT INTO `tp_config` VALUES ('2', 'web_link', '2', 'web_sys', null);
INSERT INTO `tp_config` VALUES ('3', 'web_desc', '3', 'web_sys', null);
INSERT INTO `tp_config` VALUES ('4', 'web_desc2', '4', 'web_sys', null);
INSERT INTO `tp_config` VALUES ('5', 'web_desc1', '5', 'web_sys', null);
INSERT INTO `tp_config` VALUES ('6', 'tv_text', '电视用户1', 'web_sys', null);
INSERT INTO `tp_config` VALUES ('7', 'mobile_text', '手机用户', 'web_sys', null);
INSERT INTO `tp_config` VALUES ('8', 'week_text', '周周赛', 'web_sys', null);
INSERT INTO `tp_config` VALUES ('9', 'zt_text', '自由赛', 'web_sys', null);
INSERT INTO `tp_config` VALUES ('10', 'px_text', '拍摄要求', 'web_sys', null);
INSERT INTO `tp_config` VALUES ('11', 'fz_text', '服装要求', 'web_sys', null);

-- ----------------------------
-- Table structure for tp_member
-- ----------------------------
DROP TABLE IF EXISTS `tp_member`;
CREATE TABLE `tp_member` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `nick_name` varchar(255) DEFAULT NULL COMMENT '用户昵称',
  `username` varchar(60) NOT NULL DEFAULT '' COMMENT '用户名',
  `password` varchar(64) NOT NULL DEFAULT '' COMMENT '登录密码；mb_password加密',
  `avatar` varchar(255) NOT NULL DEFAULT '' COMMENT '用户头像，相对于upload/avatar目录',
  `sex` varchar(255) DEFAULT NULL COMMENT '性别',
  `phone` varchar(11) DEFAULT NULL COMMENT '手机号',
  `amount` varchar(255) DEFAULT NULL COMMENT '余额',
  `status` tinyint(1) NOT NULL DEFAULT '2' COMMENT '用户状态 0：禁用； 1： 总管理；2：用户；',
  `register_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '注册时间',
  `last_login_ip` varchar(16) NOT NULL DEFAULT '' COMMENT '最后登录ip',
  `last_login_time` int(10) unsigned NOT NULL COMMENT '最后登录时间',
  `openid` varchar(255) DEFAULT NULL COMMENT '用户openid',
  PRIMARY KEY (`id`),
  KEY `user_login_key` (`username`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='用户表';

-- ----------------------------
-- Records of tp_member
-- ----------------------------
INSERT INTO `tp_member` VALUES ('1', '请叫我贝总', '请叫我贝总', '123123', '/Upload/avatar/user1.jpg', '1', '15764162603', '100', '1', '1449199996', '', '0', null);
INSERT INTO `tp_member` VALUES ('2', '请叫我贝总', '请叫我贝总', '123123', '/Upload/avatar/user1.jpg', '1', '15764162603', '100', '1', '1449199996', '', '0', '');
INSERT INTO `tp_member` VALUES ('3', '请叫我贝总', '请叫我贝总', '123123', '/Upload/avatar/user1.jpg', '1', '15764162603', '100', '1', '1449199996', '', '0', '');

-- ----------------------------
-- Table structure for tp_sign_up
-- ----------------------------
DROP TABLE IF EXISTS `tp_sign_up`;
CREATE TABLE `tp_sign_up` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `team_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '舞队名称',
  `dance_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '领队身份证号',
  `team_leader_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '领队姓名',
  `team_leader_mobile` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '领队电话',
  `province` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '省',
  `city` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '市',
  `area` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '区',
  `add_time` datetime DEFAULT NULL COMMENT '创建时间',
  `video_url` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '视频地址',
  `openid` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '用户openid',
  `img_url` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '舞队照片',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of tp_sign_up
-- ----------------------------

-- ----------------------------
-- Table structure for tp_users
-- ----------------------------
DROP TABLE IF EXISTS `tp_users`;
CREATE TABLE `tp_users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `nick_name` varchar(255) DEFAULT NULL COMMENT '用户昵称',
  `username` varchar(60) NOT NULL DEFAULT '' COMMENT '用户名',
  `password` varchar(64) NOT NULL DEFAULT '' COMMENT '登录密码；mb_password加密',
  `avatar` varchar(255) NOT NULL DEFAULT '' COMMENT '用户头像，相对于upload/avatar目录',
  `sex` varchar(255) DEFAULT NULL COMMENT '性别',
  `phone` varchar(11) DEFAULT NULL COMMENT '手机号',
  `status` tinyint(1) NOT NULL DEFAULT '2' COMMENT '用户状态 0：禁用； 1： 正常；2：未验证；',
  `register_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '注册时间',
  `last_login_ip` varchar(16) NOT NULL DEFAULT '' COMMENT '最后登录ip',
  `last_login_time` int(10) unsigned NOT NULL COMMENT '最后登录时间',
  PRIMARY KEY (`id`),
  KEY `user_login_key` (`username`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8 COMMENT='管理员用户表';

-- ----------------------------
-- Records of tp_users
-- ----------------------------
INSERT INTO `tp_users` VALUES ('88', null, 'admin', 'e10adc3949ba59abbe56e057f20f883e', '/Upload/avatar/user1.jpg', null, '15764162603', '1', '1449199996', '', '0');
