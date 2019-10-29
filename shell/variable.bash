
#!/bin/bash
# give the initialize value to STR
STR="Hello World"
PLUS="追加信息"
echo $STR $PLUS sdsdfsdf
echo STR


x=1999
let "x = x+1"
echo $x

# if [$x -eq 2000]
# x="olympic'"x
# echo $x

HELLO=Hello
function hello {
    local HELLO=World
    echo $HELLO
}
echo $HELLO
hello
echo $HELLO
