

## HEAD的作用
**HEAD就是当前活跃分支的游标**。
形象的记忆就是：你现在在哪儿，HEAD就指向哪儿，所以Git才知道你在那儿！

当你用git checkout切换分支的时候，HEAD 修订版本重新指向新的分支。

有的时候HEAD会指向一个没有分支名字的修订版本，这种情况叫”detached HEAD“

## HEAD与head
head(小写)是commit对象的引用，每个head都有一个名字（分支名字或者标签名字等等），但是默认情况下，每个叫master的repository都会有一个head, 一个repository可以包含任意数量的head。在任何时候，只要这个head被选择成为”current head“，那么这个head就成了HEAD,总是大写。

也就是说，不回去主动使用head，只用于git来控制流程。
