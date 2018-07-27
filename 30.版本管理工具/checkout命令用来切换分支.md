

## git checkout命令用于切换分支或恢复工作树文件。

git checkout是git最常用的命令之一，

同时也是一个很危险的命令，因为这条命令会重写工作区。

使用语法

git checkout [-q] [-f] [-m] [<branch>]
git checkout [-q] [-f] [-m] --detach [<branch>]
git checkout [-q] [-f] [-m] [--detach] <commit>
git checkout [-q] [-f] [-m] [[-b|-B|--orphan] <new_branch>] [<start_point>]
git checkout [-f|--ours|--theirs|-m|--conflict=<style>] [<tree-ish>] [--] <paths>…​
git checkout [-p|--patch] [<tree-ish>] [--] [<paths>…]
