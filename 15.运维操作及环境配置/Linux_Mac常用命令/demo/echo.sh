#!/bin/bash

echo "###########echo#######"

echo "###########显示转义字符####"
echo "\"It is a test\""

echo "###########换行输出#######"
echo -e "OK! \n" # -e 开启转义
echo "It is a test"

echo "###########显示变量#######"
# read 命令从标准输入中读取一行,并把输入行的每个字段的值指定给 shell 变量
echo "请输入你的名字，将通过read来读取："
read name
echo "It is a test $name"

echo "###########显示结果定向至文件#######"
echo "It is a test $name" > ./out/echoFile.txt
echo "It is a test $name, ./out/echoFile.txt"

echo "###########原样输出字符串，不进行转义或取变量(用单引号)#######"
echo '$name\"'

echo "###########显示执行结果#######"
echo `date`
