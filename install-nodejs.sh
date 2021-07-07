#!/bin/bash

# 改文件用于在linux服务器自动安装nodejs、pm2等工具；并启动node服务
# 命令1 && 命令2   命令1执行完成后，再执行命令2
nver='v14.16.1'                 #定义版本变量 nver
ndir="node-${nver}-linux-x64"   #定义目录变量 ndir
nfile="${ndir}.tar.xz"          #定义压缩文件名变量 nfile

cd /usr/local                   #切换目录
wget https://nodejs.org/dist/$nver/$nfile  $下载文件
tar xvf $nfile    #文件拆包解压
mv $ndir nodejs   #对目录重命名
rm -rf $nfile     #删除压缩包文件

cd nodejs/bin     #进入目录

# 获取真实路径, 软链接到 /usr/bin 中, 使命令全局可用. -f为强制创建，会覆盖
ln -sf `readlink -f node` /usr/bin/node
ln -sf `readlink -f npm`  /usr/bin/npm
ln -sf `readlink -f npx`  /usr/bin/npx


# 配置镜像
npm config set registry http://registry.npm.taobao.org
# 全局安装pm2
npm i pm2 -g
# 建立软链接. 使pm2全局使用
ln -sf `readlink -f pm2`  /usr/bin/pm2
# 返回家目录
cd
