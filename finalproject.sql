-- phpMyAdmin SQL Dump
-- version 2.10.3
-- http://www.phpmyadmin.net
-- 
-- 主機: localhost
-- 建立日期: Jun 01, 2013, 02:19 PM
-- 伺服器版本: 5.0.51
-- PHP 版本: 5.2.6

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

-- 
-- 資料庫: `finalproject`
-- 

-- --------------------------------------------------------

-- 
-- 資料表格式： `music`
-- 

CREATE TABLE `music` (
  `id` int(11) NOT NULL auto_increment,
  `Music_data` mediumtext NOT NULL,
  `MusicName` varchar(32) NOT NULL,
  `Creater` varchar(32) NOT NULL,
  `State` int(11) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

-- 
-- 列出以下資料庫的數據： `music`
-- 

INSERT INTO `music` VALUES (7, 'C4q D4q F4q D4q E4q D4q F4q', 'test', 'test', 0);

-- --------------------------------------------------------

-- 
-- 資料表格式： `user`
-- 

CREATE TABLE `user` (
  `index` int(11) NOT NULL auto_increment,
  `UserName` varchar(32) NOT NULL,
  `NickName` varchar(32) NOT NULL,
  `Password` varchar(32) NOT NULL,
  PRIMARY KEY  (`index`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

-- 
-- 列出以下資料庫的數據： `user`
-- 

INSERT INTO `user` VALUES (4, 'test', '123', '202cb962ac59075b964b07152d234b70');
INSERT INTO `user` VALUES (3, 'meow', 'meow', '202cb962ac59075b964b07152d234b70');
