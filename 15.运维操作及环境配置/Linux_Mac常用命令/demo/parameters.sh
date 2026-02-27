#!/bin/bash

echo "###########需要传递参数查看效果，如 ./parameters.sh 1 2 3 #######"

echo "Shell 传递参数实例！"
echo "执行的文件名：$0"
echo "第一个参数为：$1"
echo "第二个参数为：$2"
echo "第三个参数为：$3"

echo "脚本运行的当前进程ID号：$$"
echo "传递到脚本的参数个数：$#"
echo "传递的参数作为一个字符串显示：$*"

echo '########$* 与 $@ 区别########'

echo "-- \$* 演示 ---"
for i in "$*"; do
  echo $i
done

echo "-- \$@ 演示 ---"
for i in "$@"; do
  echo $i
done
