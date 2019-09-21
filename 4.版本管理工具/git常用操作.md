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

git reset HEAD filepathname

## git 撤销 push

`git push [remote-name] [branch-name]`

## 一般的常用操作

### pull

#### draft pull requests

draft

- vt. 起草；制定；征募
- vi. 拟稿；绘样；作草图
- adj. 初步画出或（写出）的；（设计、草图、提纲或版本）正在起草中的，**草拟的**；以草稿形式的；草图的

占坑的作用。

### fetch

`$ git fetch [remote-name]`

### status

查看当前分支的状态

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

### branch，查看分支

`git branch` 本地分支
`git branch -a` 远端分支与本地分支

### 冲突

有冲突的话，通过 IDE 解决冲突；

### pr

`pull request`是一种为了开发人员通知 team member 他们已经完成了一个 feature 的机制。一旦他们的 feature branch ready 了，开发人员就通过他们的 github 帐号执行一个 pull request。这将使得每个相干人知晓这个事件，他们需要 review 这个 feature branch 的代码，并且需要决定是否 merge 到 master 分支上去。

### tag

### 克隆（clone）

从远程仓库 URL 加载创建一个与远程仓库一样的本地仓库

### 提交（commit）

将**暂存文件**上传到本地仓库（我们在 Finder 中对本地仓库做修改后一般都得先提交一次，再推送）

### 检出（checkout）

切换不同分支

### 暂存（git stash）

保存工作现场

### 重置（reset）

回到最近添加（add）/提交（commit）状态

### 合并（merge）

将多个同名文件合并为一个文件，该文件包含多个同名文件的所有内容，相同内容抵消

### 抓取（fetch）

从远程仓库获取信息并同步至本地仓库

### 拉取（pull）

从远程仓库获取信息并同步至本地仓库，并且自动执行合并（merge）操作，即 pull=fetch+merge

### 推送（push）

将本地仓库**同步至远程仓库**，一般推送（push）前先拉取（pull）一次，确保一致

### 分支（branch）

创建/修改/删除分枝

### 工作流（Git Flow）

团队工作时，每个人创建属于自己的分枝（branch），确定无误后提交到 master 分支

### 终端（terminal）

可以输入 git 命令行

## 放弃本地修改

### 一、针对没有缓存的文件的，回退代码到修改之前的状态

对应操作工具就是丢弃文件。

1. git status 查看 git 文件的状态；
2. git checkout -- <filename(+path)>

### 二、已经缓存了的代码放弃修改的内容

git reset HEAD filepathname

此命令用来清除 git 对于文件修改的缓存。相当于撤销 git add 命令所在的工作。在使用本命令后，本地的修改并不会消失，而是回到了如（一）所示的状态。继续用（一）中的操作，就可以放弃本地的修改。

### 三、可以使用 git reset --hard HEAD^ 来回退到上一次 commit 的状态。

此命令可以用来回退到任意版本：git reset --hard commitid

你可以使用 git log 命令来查看 git 的提交历史。git log 的输出如下,之一这里可以看到第一行就是 commitid：

## 用户相关

### git config user.name "setname"

如果有 setname 就是设置，否则就是查看

### git config user.email "setemail"

如果有 setemail 就是设置，否则就是查看

## 检出线上分支到本地

checkout 命令用来切换分支

git checkout 是 git 最常用的命令之一，

同时也是一个很危险的命令，因为这条命令会**重写工作区**。

### 使用语法

git checkout [-q][-f] [-m][<branch>]
git checkout [-q][-f] [-m] --detach [<branch>]
git checkout [-q][-f] [-m][--detach] <commit>
git checkout [-q][-f] [-m][-b|-b|--orphan] <new_branch>] [<start_point>]
git checkout [-f|--ours|--theirs|-m|--conflict=<style>][<tree-ish>] [--] <paths>…​
git checkout [-p|--patch][<tree-ish>] [--][<paths>…]

### 检出远端分支到本地

git checkout -b 本地分支名 origin/远程分支名

`git checkout -b feature/ft_qww_20190920_windows origin/feature/ft_qww_20190920_windows`

