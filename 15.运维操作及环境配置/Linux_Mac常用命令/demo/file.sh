#!/bin/bash

echo "###########使用 > 命令，输出到文件内，覆盖#######"
echo "###########执行下面的 who 命令，它将命令的完整的输出重定向在用户文件中(users):#######"

who >./out/users.txt

echo "###########使用 >> 命令，输出到文件内，追加#######"

echo "qiu" >>./out/users.txt

echo "###########使用 cat 命令查看文件内容#######"

cat ./out/users.txt

# 和输出重定向一样，Unix 命令也可以从文件获取输入
echo "###########< 将输入重定向到 file。#######"

wc -l ./out/users.txt

echo "###########Shell执行命令并把结果写入文件#######"

cmd=$(ps -e -o 'pid,comm,args,pcpu,vsz,stime,user,uid')
datetime=$(date '+%Y-%m-%d %H:%M:%S')
aaa=${cmd}
FILE="./out/"$(date '+%Y-%m-%d')"_log.txt"
echo $datetime >>$FILE
echo "$aaa" >>$FILE
echo "---------------------" >>$FILE

# ps是执行的命令 使用 ` 符号扩起来, Esc下面那个.
# FILE.txt 是写入的文件. 没有规定目录会创建文件到当前目录
# echo "$aaa" 是输出到文件的时候保持格式. echo $aaa 则内容为一行
