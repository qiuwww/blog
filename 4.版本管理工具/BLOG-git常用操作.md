---
title: git常用操作
date: 2020-3-5
tags:
  - git
---

回滚 -> revert
重置、撤销、丢弃 -> reset

[官方网站](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E6%89%93%E6%A0%87%E7%AD%BE)

## 常用命令

## 创建仓库

### 初始化一个仓库 [git-init](https://git-scm.com/docs/git-init)

创建目录 -> 进入目录，然后初始化[git init] -> 完成一次提交

`mkdir -p /Users/qww/Documents/learn/blog/4.版本管理工具/git-test-folder/init-test`

`cd /Users/qww/Documents/learn/blog/4.版本管理工具/git-test-folder/init-test && git init`

`touch READMD.md && git add * && git commit -m "init"`

### 克隆单个仓库 [git-clone](https://git-scm.com/docs/git-clone)

`git clone [远程地址] [本地目录]`

`git clone https://gitlab.eazytec-cloud.com/tng-open/react-pc-materials/projects/ecoder-basis-template-eui.git /Users/qww/Documents/learn/blog/4.版本管理工具/git-test-folder/default-template`

## 添加多个远端仓库 git remote add，这个时候提交就需要添加远端仓库说明了

`git remote add origin2 http://git.17byh.com/17MOX/mxhy.git`

### 查看远端仓库

`git remote`

### 删除远端仓库

`git remote remove origin2`

## 查看当前的 git 仓库状态 [git-status](https://git-scm.com/docs/git-status)

`git status`

工作目录下面的所有文件都不外乎这两种状态：

- 已跟踪、
- 未跟踪（untracked）。

**已跟踪**的文件是指已经被纳入版本控制管理的文件，目前它们的状态可能是:

- 未更新（unmodified，查看文件状态时默认是不显示出来的），
- 已修改（modified）
- 或者已放入暂存区（staged）。

未跟踪文件（untracked）**一般是新建的**，它们并没有出现在前面的版本中，也不在当前的暂存区域。初次克隆某个仓库时，工作目录中的所有文件都属于已跟踪文件，且状态为未修改。

![git-status](./imgs/git-status.png)

## 提交修改，放入暂存区 [git add](https://git-scm.com/docs/git-add)

`git add filename | filepath | .`

## git 查看与对比历史提交记录（git show; git log; git diff）

### git-show，查看历史提交信息

- git show [commit_id]       查看某次历史提交信息的完整信息
- git show HEAD 查看 HEAD 标签当前指向的提交的完整信息
- git show master  查看 master 分支最新一次提交的完整信息
- git show master^或 git show master~  查看 master 分支最新一次提交的父提交的完整信息
- git show master^2 查看 master 分支最新一次提交的第二个父提交（也就是父提交的父提交）的完整信息

### git-log，查看完整的历史提交（commit）信息

- git log，可以按键盘空格/字母 b 键将信息向下/向上翻页，也可以按键盘向上/向下箭头向上/向下按行滚动
- git log –p 输出每一个 commit 之间的差异信息
- git log --stat 输出每一个 commit 之间的差异统计信息
- git log--oneline 输出历史 commit 的简短信息

### 查看文件变动，在拉取文件之后，或者本地修改 [git-diff](https://git-scm.com/docs/git-diff)

diff 差异比较。

在本地修改了代码，**准备将代码提交到服务器之前**，一般我们需要对修改的代码进行下检查。如果修改点比较多，直接看代码检查时，往往容易遗漏，而且不够直观。这个场景下使用 Git 差异比较工具再合适不过了，**差异比较工具会对比修改前后的文件**，将差异点显示出来。

`git diff`

`git diff branchName`

使用 `git diff --stat` 只显示摘要。

暂存区与版本库的比较 `git diff --cached` 或者 `git diff --staged`。

已缓存的与未缓存的所有改动，`git diff HEAD` 显示已缓存的与未缓存的所有改动，相当于同时执行了 `git diff 和 git diff --cached`。

**Q**退出。

#### git diff 的最全最详细的[4 大主流用法](https://blog.csdn.net/wq6ylg08/article/details/88798254)

git diff 用来比较文件之间的不同。

1. git diff
2. git diff HEAD
3. git ditt --cached | git diff --staged
4. git diff branch1 branch2 --stat

## 提交更新 [git commit](https://git-scm.com/docs/git-commit)

`git commit -m '这里写该版本的说明'`

## 删除文件 [git rm](https://git-scm.com/docs/git-commit)

`git rm -f filename`，强制删除 filename。

## 查看提交记录 [git log](https://git-scm.com/docs/git-log)

## 一次基本的提交

```bash
git branch 新分支名，切换到需要修改的分支
git pull，保证当前分支代码最新，然后再开始修改
git status
git add ...
git commit ...
git fetch -> git pull，可能别人也进行了修改，需要合并，或者解决冲突
git push
```

需要**先检查是否线上有更新**，如果有冲突，还需要解决冲突。

## branch

### 查看分支

查看本地分支列表：`git branch`
查看远端分支列表：`git branch -r`
查看所有的分支列表：`git branch -a`

### 新建分支

`git branch 新分支名`，

`git checkout -b 新分支名`，**开分支和切换分支合并到一个命令**，创建完成(**根据当前所在的分支状态**)并切换到新分支。

`git checkout -b dev(本地分支名称) origin/dev(远程分支名称)，在本地创建分支 dev 并切换到该分支，关联线上的分支。

### 拉取远端的分支到本地

这里首先要创建本地分支，然后拉取远端分支到当前分支。

`git checkout -b 本地分支名 && git pull origin dev(远程分支名称)`，拉取**远端分支到本地**。

`git checkout -b 本地分支名 origin/远程分支名`

`git checkout -b feature/ft_qww_20190920_windows origin/feature/ft_qww_20190920_windows`

### 切换分支

`git checkout 分支名`，切换到某个分支。

### 合并分支

`git merge 需要合并的分支名 -m "合并的原因，也要说明"`，将需要合并的分支，合并到当前分支。

`git merge 需要合并的分支名 --no-commit`，无提交的合并。

`git merge --abort`合并冲突中断。
`git merge --continue`合并冲突继续。

从远程仓库获取信息并同步至本地仓库，并且自动执行合并（merge）操作，即 pull=fetch+merge。

### 删除本地分支

`git branch 分支名称 -d`

## fetch，更新分支列表信息

`git fetch -p`

## push，推送，git push origin 新分支名

`git push origin local_branch:remote_branch`

### 向远程提交本地新开的分支

`git push origin 新分支名`

### 删除远程分支

`git push origin :远程分支名`

## git [撤销](http://www.ruanyifeng.com/blog/2019/12/git-undo.html)

### git reset，丢弃提交，也就是重置，删除commit及add

--mixed

意思是：**不删除工作空间改动代码**，撤销 commit，并且撤销 git add . 操作
这个为默认参数,git reset --mixed HEAD^ 和 git reset HEAD^ 效果是一样的。

--soft

不删除工作空间改动代码，撤销 commit，不撤销 git add .

--hard

**删除工作空间改动代码，撤销 commit，撤销 git add .**

### git revert HEAD，撤销提交，撤销push

一种常见的场景是，提交代码以后，你突然意识到这个提交有问题，应该撤销掉，这时执行下面的命令就可以了。

`$ git revert HEAD`

上面命令的原理是，在当前提交后面，新增一次提交，**抵消掉上一次提交导致的所有变化**。**它不会改变过去的历史，所以是首选方式，没有任何丢失代码的风险**。

git revert 命令只能抵消上一个提交，如果想抵消多个提交，必须在命令行依次指定这些提交。

### git commit 命令的--amend 参数，替换上一次提交

`$ git commit --amend -m "Fixes bug #42"`

提交以后，发现提交信息写错了，这时可以使用 git commit 命令的--amend 参数，可以修改上一次的提交信息。

它的原理是产生一个新的提交对象，替换掉上一次提交产生的提交对象。

### git 撤销 add

1. 一、针对**没有缓存(commit)的文件**的，回退代码到修改之前的状态，对应操作工具就是**丢弃文件**。
   1. `git status` 查看 git 文件的状态；
   2. `git checkout -- <filename(path)>`，注意中间的"--"不能丢了。
2. 二、已经**缓存了的代码(add 了，已经)**放弃修改的内容，对应 sourceTree 的**已暂存文件取消**。

`git reset HEAD filepathname`

此命令用来**清除 git 对于文件修改的缓存**。相当于撤销 git add 命令所在的工作。在使用本命令后，**本地的修改并不会消失，而是回到了如（一）所示的状态**。继续用（一）中的操作，就可以放弃本地的修改。

3. 三、可以使用 `git reset --hard HEAD^` 来回退到上一次 commit 的状态。

此命令**可以用来回退到任意版本**：`git reset --hard commitid`

你可以**使用 git log 命令来查看 git 的提交历史**。

git log 的输出如下,之一这里可以看到第一行就是 **commitid**。

### git 撤销 commit

`git reset --soft HEAD^`，这样退回到前面的暂存区，这样就可以执行撤销 add 的操作了。
`git reset HEAD filepathname`

## git 撤销 merge，git merge 撤销 同时清除 merge 的本地文件

Git 如何撤销 merge 操作。当 merge 以后还有别的操作和改动时，用 **git revert(回滚)：该命令就是为撤销某次提交而存在的；**

也就是要找到**合并前的 id(git log)**，然后 reset 到当前的 id。`git reset --hard merge前的版本号`

```bash
git log
git reset --hard merge前的版本号
```

或者这样，`git reset --merge merge前的任何一次提交的hash串`

### 使用 sourceTree 来操作撤销 merge

选中合并前的那次提交，然后选择**将(分支名)重置到这次提交**，然后选择**强行合并**。

### git 撤销 push，与 merge 是一致的

push 代码：`git push [remote-name] [branch-name]`

`git reset --soft commitId`，回退到 commit 之后。
`git reset --hard commitId`，直接回退到未修改的状态。

`git reset --soft HEAD^`
`git reset --hard HEAD^`

^的个数表示回退几个版本。

## resevrt 回滚，通过 git revert 是用一次新的 commit 来回滚之前的 commit

- git log # 得到你需要回退一次提交的 commit id
- git revert <commit_id> # **撤销指定的版本，撤销也会作为一次提交进行保存**

revert，提交一次修改，让代码回滚到前一次的提交。但是之前的记录也是会保存的。

### git revert 和 git reset 的区别

- `git revert` 是用一次新的 commit 来回滚之前的 commit，此次提交之前的 commit 都会被保留；
- `git reset` 是**回到某次提交（代码到修改，未 add）**，提交及之前的 commit 都会被保留，但是**此 commit id 之后的修改都会被删除**。

## 打标签 [git tag](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E6%89%93%E6%A0%87%E7%AD%BE)

作为一个版本的标记。

`git tag` 列出 tag
`git tag v1.0` 添加 tag
`git show tagName` 查看 tag 信息
`git tag -d v0.1.2` 删除 tag
`git push origin v1.0` 提交 tag，到远端

### tag 名称规则

版本处在里程碑节点的测试阶段。如功能测试、性能测试，会打 tag。

tag 名称规则为：`预发布版本号*test|prod*构建的日期和时间`

## 暂存，保存工作现场 [git stash](https://git-scm.com/docs/git-stash)

stash 命令可用于临时保存和回复修改，可跨分支。

`git stash save [save message]`保存，save 为可选项，message 为本次保存的注释。
`git stash list`所有保存的记录列表。
`git stash pop stash@{num}`恢复，num 是可选项，通过 git stash list 可查看具体值。只能恢复一次。
`git stash apply stash@{num}`恢复，num 是可选项，通过 git stash list 可查看具体值。可回复多次。
`git stash drop stash@{num}`删除某个保存，num 是可选项，通过 git stash list 可查看具体值。
`git stash clear`删除所有保存。

## 用户相关 git config

### git config user.name "setname"

如果有 setname 就是设置，否则就是查看

### git config user.email "setemail"

如果有 setemail 就是设置，否则就是查看

## 变基 [git rebase](https://www.jianshu.com/p/f7ed3dd0d2d8)

git rebase 能够将分叉的分支重新合并。

将当前的变更**变基到当前所在的分支**：`git rebase`。

### 使用场景

#### git rebase 场景一：本地与远端**同一分支提交历史不一致**

典型样式：在一个分支上，**同时需要 pull 和 push 的时候**，一上一下。

在同一个分支上，多个人都提交，这个时候，提交先后顺序不好控制，就可能出现本地修改后，提交的时候，发现线上版本已更新，这个时候就会产生一个 merge 节点，为了避免分叉。就可以使用 rebase 替代 merge。

操作方式 1:

```bash
git pull
git add
git commit
git pull # 这个时候有新的提交的时候，需要填写提交信息
git rebase # 将线上的变更合并到本地的时候，会合并，这时候，会产生两个分支。
git push
```

操作方式 2: 这个方式，每次在 sourceTree pull 的时候，选中“使用变基替代合并”，默认还在一个分支上。

```bash
git pull
git add
git commit
git pull --rebase # 变基提交，sourceTree的pull，就有一个用变基代替合并的选项
git push
```

#### git rebase 使用场景二：不同分支之间的合并

开一个新的分支，开发功能，完成的时候，需要合并到主分支，如果不想产生很多的合并操作，可以将这个分支的变更，变基到当前主分支，这个时候，就不会产生分叉了。

通常会使用，合并修改的分支到主分支，在其下就有变基到当前分支（将当前变更，变基到\*\*分支）。

在 **master 分支上执行**: `git rebase 变更的分支，需要合并到master`

这句命令的意识是：**以 master 为基础，将 feature 分支上的修改增加到 master 分支上，并生成新的版本。**

**如果 rebase 的时候出现了冲突**，之前的 rebase 其实只是完成了一半，由于出现冲突而终止，现在冲突解决，可以通过`git rebase —continue`继续完成之前的 rebase 操作。

## HEAD 是什么

HEAD 也是一个引用或者指针，不同于分支，HEAD 代表的是当前工作区，它的存在形式是文件.git/HEAD。

```bash
cat .git/HEAD # 查看HEAD的指向
```

### HEAD 的作用

**HEAD 就是当前活跃分支的游标**。

形象的记忆就是：你现在在哪儿，HEAD 就指向哪儿，所以 Git 才知道你在那儿！

当你用 git checkout 切换分支的时候，HEAD 修订版本重新指向新的分支。

有的时候 HEAD **会指向一个没有分支名字的修订版本**，这种情况叫”detached HEAD“

### HEAD 与 head

head(小写)是 commit 对象的引用，每个 head 都有一个名字（分支名字或者标签名字等等），但是默认情况下，每个叫 master 的 repository 都会有一个 head, 一个 repository 可以包含任意数量的 head。在任何时候，只要这个 head 被选择成为”current head“，那么这个 head 就成了 HEAD,总是大写。

也就是说，不回去主动使用 head，只用于 git 来控制流程。

## 冲突解决

```bash
git merge
git diff # 查看当前的冲突文件
# 修改解决冲突。
vim # 编辑保存
# 提交
```

## git cherry-pick

`git cherry-pick <commit ID>` // 拣选一次提交应用于当前 HEAD
