#!/bin/bash

# array声明 array_name=(value0 value1 value2 value3)

my_array=(A B "C" D)

echo "###########数组元素输出#######"

echo "第一个元素为: ${my_array[0]}"
echo "第二个元素为: ${my_array[1]}"
echo "第三个元素为: ${my_array[2]}"
echo "第四个元素为: ${my_array[3]}"

echo "###########数组元素输出，所有#######"

echo "数组的元素为: ${my_array[*]}"
echo "数组的元素为: ${my_array[@]}"

echo "#################数组元素长度######"

echo "数组元素个数为: ${#my_array[*]}"
echo "数组元素个数为: ${#my_array[@]}"
