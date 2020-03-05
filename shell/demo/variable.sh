#!/bin/bash

# 变量直接声明，使用$变量名获取。

echo "#############################"
# give the initialize value to STR
STR="Hello World"
PLUS="追加信息"
echo $STR $PLUS sdsdfsdf
echo STR

echo "########### 变量进入计算#######"

x=1999
let "x = x+1"
echo $x

echo "#########函数内使用变量########"

HELLO=Hello

function hello() {
  # 局部变量，修改
  local HELLO=World
  echo $HELLO
}

echo $HELLO
hello
echo $HELLO

echo "############遍历目录并输出#######"

# 表示获取文件夹下的文件目录信息
for file in $(ls /Users/qww/Documents); do
  echo $file
done

echo "############遍历数组并输出#######"

# 可以表示一个数组
for skill in Ada Coffe Action Java; do
  echo "I am good at ${skill}Script"
done

echo "###########只读变量，赋值出错#####"

myUrl="http://www.google.com"
readonly myUrl
# myUrl="http://www.runoob.com"
echo $myUrl

echo "##################删除变量#####"

name="qiu"
unset name
echo my name is $name
