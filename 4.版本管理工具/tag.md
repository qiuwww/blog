
## tag
Git也能使用标签tag,作为一个版本的标记，如0.6.3, v1.2.1,ver_4.5.2 
在系统开发到一个阶段后，需要打个标签，发布一个版本。 
**与commit不同，commit被鼓励多commit，一个地方修改就应该做一次commit，而tag是commit足够多次（视需求的进度而定）才进行打标签的。** 
### 示例： 
注意：下面说的版本号即为标签名 
查看当前分支： git tag 
添加本地标签：git tag -a 版本号 
删除本地标签: git tag -d 版本号 
推送某标签至远程：git push origin 版本号 
推送全部标签至远程：git push origin –tags 提交所有tag至远程，使用git push origin 不会提交本地标签 
删除远程标签： git push origin :refs/tags/版本号
