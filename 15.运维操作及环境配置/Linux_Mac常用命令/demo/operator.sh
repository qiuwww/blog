#!/bin/bash

echo "###########运算符使用#######"

echo "###########加减乘除#######"

a=10
b=20

echo "a: $a   b: $b"

val=$(expr $a + $b)
echo "a + b : $val"

val=$(expr $a - $b)
echo "a - b : $val"

val=$(expr $a \* $b)
echo "a * b : $val"

val=$(expr $b / $a)
echo "b / a : $val"

val=$(expr $b % $a)
echo "b % a : $val"

if [ $a == $b ]; then
  echo "a 等于 b"
fi
if [ $a != $b ]; then
  echo "a 不等于 b"
fi

echo "###########关系运算#######"

if [ $a -eq $b ]; then
  echo "$a -eq $b : a 等于 b"
else
  echo "$a -eq $b: a 不等于 b"
fi
if [ $a -ne $b ]; then
  echo "$a -ne $b: a 不等于 b"
else
  echo "$a -ne $b : a 等于 b"
fi
if [ $a -gt $b ]; then
  echo "$a -gt $b: a 大于 b"
else
  echo "$a -gt $b: a 不大于 b"
fi
if [ $a -lt $b ]; then
  echo "$a -lt $b: a 小于 b"
else
  echo "$a -lt $b: a 不小于 b"
fi
if [ $a -ge $b ]; then
  echo "$a -ge $b: a 大于或等于 b"
else
  echo "$a -ge $b: a 小于 b"
fi
if [ $a -le $b ]; then
  echo "$a -le $b: a 小于或等于 b"
else
  echo "$a -le $b: a 大于 b"
fi

echo "###########布尔运算#######"

if [ $a != $b ]; then
  echo "$a != $b : a 不等于 b"
else
  echo "$a == $b: a 等于 b"
fi
if [ $a -lt 100 -a $b -gt 15 ]; then
  echo "$a 小于 100 且 $b 大于 15 : 返回 true"
else
  echo "$a 小于 100 且 $b 大于 15 : 返回 false"
fi
if [ $a -lt 100 -o $b -gt 100 ]; then
  echo "$a 小于 100 或 $b 大于 100 : 返回 true"
else
  echo "$a 小于 100 或 $b 大于 100 : 返回 false"
fi
if [ $a -lt 5 -o $b -gt 100 ]; then
  echo "$a 小于 5 或 $b 大于 100 : 返回 true"
else
  echo "$a 小于 5 或 $b 大于 100 : 返回 false"
fi

echo "###########逻辑运算#######"

echo '[[ $a -lt 100 && $b -gt 100 ]]'
if [[ $a -lt 100 && $b -gt 100 ]]; then
  echo "返回 true"
else
  echo "返回 false"
fi

echo '[[ $a -lt 100 || $b -gt 100 ]]'
if [[ $a -lt 100 || $b -gt 100 ]]; then
  echo "返回 true"
else
  echo "返回 false"
fi

echo "###########字符串运算#######"

a="abc"
b="efg"

echo "a: $a   b: $b"

if [ $a = $b ]; then
  echo "$a = $b : a 等于 b"
else
  echo "$a = $b: a 不等于 b"
fi
if [ $a != $b ]; then
  echo "$a != $b : a 不等于 b"
else
  echo "$a != $b: a 等于 b"
fi
if [ -z $a ]; then
  echo "-z $a : 字符串长度为 0"
else
  echo "-z $a : 字符串长度不为 0"
fi
if [ -n "$a" ]; then
  echo "-n $a : 字符串长度不为 0"
else
  echo "-n $a : 字符串长度为 0"
fi
if [ $a ]; then
  echo "$a : 字符串不为空"
else
  echo "$a : 字符串为空"
fi

echo "###########文件测试运算符#######"

file="/Users/qww/Documents/learn/blog/shell/demo/operator.sh"
echo filepath $file

if [ -r $file ]; then
  echo "文件可读"
else
  echo "文件不可读"
fi
if [ -w $file ]; then
  echo "文件可写"
else
  echo "文件不可写"
fi
if [ -x $file ]; then
  echo "文件可执行"
else
  echo "文件不可执行"
fi
if [ -f $file ]; then
  echo "文件为普通文件"
else
  echo "文件为特殊文件"
fi
if [ -d $file ]; then
  echo "文件是个目录"
else
  echo "文件不是个目录"
fi
if [ -s $file ]; then
  echo "文件不为空"
else
  echo "文件为空"
fi
if [ -e $file ]; then
  echo "文件存在"
else
  echo "文件不存在"
fi
