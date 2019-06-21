

## 目前阶段的使用总结

区分直接对于同一份代码新建的分支与fork操作。

### develop与master本质上对应的是同一份代码

### hotfix会从master上fork一份代码，然后修改之后合并到master，完成线上问题修复，修复之后，合并进开发分支develop，然后删除。

### release分支，从develop上fork，修改发布之后，分别合并进master与develop分支。

### feature分支，从develop分支fork，开发完成后合并到develop中，完成之后可以选择删除

### 各个分支的文件版本不一致，在源文件里边的表现也不一致的，这个要明确，与feature/test这样的目录都是一致的。

### 代码如果有commit，就没法切换到别的分支，除非放弃当前修改。

### 一次修改之后的文件，如果各个分支都是一样的代码，就可以随意切换，随意提交到任意分支。

## 操作

### 创建develop分支

为master分支配套一个develop分支。简单来做可以本地创建一个空的develop分支，push到服务器上


## 我们为git定下一种分支模型，在这种模型中，分支有两类，五种

永久性分支
master branch：主分支
develop branch：开发分支
临时性分支
feature branch：功能分支
release branch：预发布分支
hotfix branch：bug修复分支


## 基于develop分支创建新功能分支：（这里会创建一个文件夹）

git checkout -b feature/demo develop
推送到远程仓库，共享：


## 主要的目标

本地开发 **(add)->** 本地暂存区 **(commit)->** 本地仓库 **(push)->** 远程仓库
