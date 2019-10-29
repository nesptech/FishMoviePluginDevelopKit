#!/bin/bash
LOCAL_PATH=$(cd `dirname $0`; pwd)
cd $LOCAL_PATH

$1/build.sh $LOCAL_PATH

cd $LOCAL_PATH

