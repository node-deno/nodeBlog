#!/usr/bin/env sh
cd 指定文件夹
cp access.log $(date +%Y-%m-%d).access.log #拷贝access.log文件，并将拷贝的文件命名为 当日日期.access.log
echo "" >access.log                        #将“”输入到access.log--也就是将access.log清空
