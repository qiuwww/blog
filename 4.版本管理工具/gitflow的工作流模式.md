# gitflow 的工作流模式

## fork 区分于一般的功能修改

### base，一般会创建出 develop 分支用于开发，创建 master 用于保存历史上线的修改（最好相互 review）

相对使用仅有的一个 master 分支，Gitflow 工作流使用 2 个分支来记录项目的历史。
master 分支存储了正式发布的历史，而 develop 分支作为功能的集成分支。这样也方便 master 分支上的所有提交分配一个版本号。

### feature 新功能开发

主要用于新功能的开发，拉自于 develop 分支，完成之后合并到 develop 分支
代码会被 fork 复制一份（表现上讲）

### release 发布分支

拉自于 develop 分支，完成发布之后，分别合并到 develop 与 master 上。

### hotfix 修改补丁

拉自于 master 分支，开发完成之后合并到 develop 与 master
