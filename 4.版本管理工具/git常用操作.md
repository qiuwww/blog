## 每次提交都要输入密码的问题

git bash 进入你的项目目录，输入：
git config --global credential.helper store
然后你会在你本地生成一个文本，上边记录你的账号和密码。当然这些你可以不用关心。
然后你使用上述的命令配置好之后，再操作一次 git pull，然后它会提示你输入账号密码，这一次之后就不需要再次输入密码了。

## git 撤销 add

1. 一、针对没有缓存的文件的，回退代码到修改之前的状态
   对应操作工具就是丢弃文件。

1. git status 查看 git 文件的状态；
1. git checkout -- <filename(+path)>

1. 二、已经缓存了的代码放弃修改的内容

git reset HEAD filepathname

此命令用来清除 git 对于文件修改的缓存。相当于撤销 git add 命令所在的工作。在使用本命令后，本地的修改并不会消失，而是回到了如（一）所示的状态。继续用（一）中的操作，就可以放弃本地的修改。

3. 三、可以使用 git reset --hard HEAD^ 来回退到上一次 commit 的状态。

此命令可以用来回退到任意版本：git reset --hard commitid

你可以使用 git log 命令来查看 git 的提交历史。git log 的输出如下,之一这里可以看到第一行就是 commitid：

## git 撤销 commit

## git 撤销 push

## 一般的常用操作

### pull

### fetch

### status

### add

### commit

```bash
git commit -m "备注"
```

### push

### marge

```bash
git merge 分支名
```

### 冲突

有冲突的话，通过 IDE 解决冲突；
