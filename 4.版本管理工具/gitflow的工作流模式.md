

## fork区分于一般的功能修改

### base，一般会创建出develop分支用于开发，创建master用于保存历史上线的修改（最好相互review）
相对使用仅有的一个master分支，Gitflow工作流使用2个分支来记录项目的历史。
master分支存储了正式发布的历史，而develop分支作为功能的集成分支。这样也方便master分支上的所有提交分配一个版本号。


### feature 新功能开发
主要用于新功能的开发，拉自于develop分支，完成之后合并到develop分支
代码会被fork复制一份（表现上讲）

### release 发布分支
拉自于develop分支，完成发布之后，分别合并到develop与master上。

### hotfix 修改补丁
拉自于master分支，开发完成之后合并到develop与master
