#!/bin/bash

echo "###########ifelse#######"

a=10
b=20
echo "a: $a   b: $b"

if [ $a == $b ]; then
  echo "a 等于 b"
elif [ $a -gt $b ]; then
  echo "a 大于 b"
elif [ $a -lt $b ]; then
  echo "a 小于 b"
else
  echo "没有符合的条件"
fi

echo "###########for#######"

for loop in 1 2 3 4 5; do
  echo "The value is: $loop"
done

for str in 'This is a string'; do
  echo $str
done

echo "###########while do#######"

int=1
while (($int <= 5)); do
  echo $int
  let "int++"
done

echo "###########until#######"

a=0
until [ ! $a -lt 10 ]; do
  echo $a
  a=$(expr $a + 1)
done

echo "###########case#######"
echo '输入 1 到 4 之间的数字:'
echo '你输入的数字为:'
read aNum
case $aNum in
1)
  echo '你选择了 1'
  ;;
2)
  echo '你选择了 2'
  ;;
3)
  echo '你选择了 3'
  ;;
4)
  echo '你选择了 4'
  ;;
*)
  echo '你没有输入 1 到 4 之间的数字'
  ;;
esac

echo "###########break，跳出循环#######"
while :; do
  echo -n "输入 1 到 5 之间的数字:"
  read aNum
  case $aNum in
  1 | 2 | 3 | 4 | 5)
    echo "你输入的数字为 $aNum!"
    ;;
  *)
    echo "你输入的数字不是 1 到 5 之间的! 游戏结束"
    break
    ;;
  esac
done

echo "###########continue，跳出本次循环#######"

# while :; do
#   echo -n "输入 1 到 5 之间的数字: "
#   read aNum
#   case $aNum in
#   1 | 2 | 3 | 4 | 5)
#     echo "你输入的数字为 $aNum!"
#     ;;
#   *)
#     echo "你输入的数字不是 1 到 5 之间的!"
#     continue
#     echo "游戏结束"
#     ;;
#   esac
# done

echo "###########case ... esac，类似switch case#######"

site="qiu"

case "$site" in
"qiu")
  echo "qiuww.site"
  ;;
"google")
  echo "Google 搜索"
  ;;
"taobao")
  echo "淘宝网"
  ;;
esac
