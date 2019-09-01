#!/bin/bash
if [ 1 −gt 90]
then
    echo "Good,1"
elif [ 1 −gt 70]
then
    echo "OK,1"
else
    echo "Bad, $1"
fi
exit 0
