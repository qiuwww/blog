---
title: Gitflow工作流
date: 2020-3-7
tags:
  - gitflow
categories:
  - [git, gitflow]
---

Gitflow 工作流定义了一个围绕项目发布的严格分支模型。虽然比功能分支工作流复杂几分，但提供了用于一个健壮的用于管理大型项目的框架。

## 安装 git-flow

`$ brew install git-flow-avh`

## 初始化

`git flow init`

主要分支：

- master: 永远处在即将发布(production-ready)状态；
- develop: 最新的开发状态；
- bugfix/\*: develop 上的 bug 修复；
- feature/\*: 开发新功能的分支, **基于 develop, 完成后 merge 回 develop**；
- release/\*: **准备要发布版本的分支, 用来修复 bug(测试版本)**. 基于 develop, 完成后 **merge 回 develop 和 master**；
- hotfix/\*: **修复 master 上的问题**, 等不及 release 版本就必须马上上线. 基于 master, **完成后 merge 回 master 和 develop**；
- support/\*

## 新功能开发流程

任何功能开发都必须从 develop 开始。

从 develop 切除一个分支，开发完成后合并到 develop，不能变基，完成后上传远端，finish 后，自动合并到 develop，并删除分支。

```bash
git checkout branch
git flow feature start ft_1_qw_date
git add && git commit
git flow feature publish ft_1_qw_date | git push origin feature/ft_1_qw_date # 提交到远端
git flow feature finish ft_1_qw_date # 完成后自动合并到develop，并删除
```

线上记录会保存，本地分支被删除。

## 测试功能分支

## 发布流程，发布上线，代号 0.1

```bash
git flow release start 0.1 # 从develop拉取发布分支，设置版本号
git flow release finish 0.1 # 这里会让输入tag信息
```

git-flow 从 develop 分支创建一个新的分支 release/0.1，并切换到该分支下，**接下来要做的就是修改版本号等发布操作**。

git-flow 会依次**切换到 master develop 下合并 release/0.1 里的修改**，然后用 git tag 的给当次发布打上 tag 0.1，可以通过 git tag 查看所有 tag。

## 线上 bug 修改流程，紧急 bug 修正，代号 bug1

```bash
git flow hotfix start bug1
# 代码修改，并提交到当前分支
git flow hotfix finish 'bug1'
```

git-flow 从 master 分支创建一个新的分支 hotfix/bug1，并切换到该分支下。接下来要做的就是修复 bug，完成后 finish。

git-flow 会依次**切换到 master develop 分支下合并 hotfix/bug1**，然后删掉 hotfix/bug1。到此，hotfix 完成。

git-flow 的 **feature release 都是从 develop 分支创建**，**hotfix support 都是从 master 分支创建**。
