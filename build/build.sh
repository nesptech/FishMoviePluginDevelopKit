### 
# @Descripttion: 
 # @version: 
 # @Author: 靳兆鲁[1756404649@qq.com]
 # @Date: 2019-10-26 19:20:07
 # @LastEditors: 靳兆鲁[1756404649@qq.com]
 # @LastEditTime: 2019-10-26 19:21:25
 ###
#!/bin/bash
LOCAL_PATH=$(cd `dirname $0`; pwd)
cd $LOCAL_PATH

./node/node-v12.13.0-linux-x64/bin/node  ./bin/pluginCompile.js $1


