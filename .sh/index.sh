# bash
# 运行 sh ./help/commit-template.sh
# 脚本用于上传模板的修改，同时更新依赖，切换文件夹

# cd ~/Documents/eazytec/ecoder-basis-template
# yarn run upgrade
# git checkout master
# git add *
# git commit -m "更新依赖"
# git push origin master

cd ~/Documents/eazytec/ECoder

# 这里需要用户的绝地地址，或者相对于当前所在的文件夹的地址
LOGFILE="/Users/qww/Documents/eazytec/ECoder/help/log/commit-log.txt"

function logGenerate() {
  echo $PWD
  echo $(dirname $0)
  echo "-------------------------------" >>$LOGFILE
  echo $1 >>$LOGFILE
  echo $2 >>$LOGFILE
  echo "-------------------------------" >>$LOGFILE
}

function runGitBash() {
  git checkout master
  git add *
  git commit -m "upgrade: 更新依赖"
  git push origin master
}

function upgrade() {
  datetimeStart=$(date '+%Y-%m-%d %H:%M:%S')
  cmd = $(yarn run upgrade)
  log = ${cmd}
  logGenerate $1 $datetimeStart
}

function runTask() {
  cd ~/Documents/eazytec/$1
  git pull
  upgrade $folder
  runGitBash
}

# 函数的参数不通过()传递，通过紧跟的变量传递，通过$N来获取
function templateTask() {
  # 读取文件夹$1，并遍历
  for folder in $(ls $1); do
    # 判断如果folder包含$2就输出
    if [[ $folder =~ $2 ]]; then
      # 输出带颜色的字体
      runTask $folder
      echo "\033[1;35m $folder end \033[0m"
    fi
  done
}
# 定义根节点变量，并传入函数getdir，通过$1接收参数
root_dir="../"
key_word="ecoder-"
templateTask $root_dir $key_word
