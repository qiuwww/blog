#!/bin/bash

echo "###########字符串的拼接#######"

your_name="qiu"
# 使用双引号拼接
greeting="hello, "$your_name" !"
greeting_1="hello, ${your_name} !"
echo $greeting $greeting_1
# 使用单引号拼接，直接输出
greeting_2='hello, '$your_name' !'
greeting_3='hello, ${your_name} !'
echo $greeting_2 $greeting_3

string="qiuww.site is a great site"

echo "###########字符串的长度#######"
echo ${#string} #输出 4

echo "###########提取子字符串#######"
echo ${string:1:5}

echo "###########查找子字符串#######"
echo "###这里一致提示语法错误？#######"

echo $(expr index "$string" ww)

echo "###注意如下的表达式的区别#######"

expr 5+6
expr 5 + 6
