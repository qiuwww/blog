# 添加 tag 信息

Git 也能使用标签 tag,作为一个版本的标记，如 0.6.3, v1.2.1,ver_4.5.2
在系统开发到一个阶段后，需要打个标签，发布一个版本。
**与 commit 不同，commit 被鼓励多 commit，一个地方修改就应该做一次 commit，而 tag 是 commit 足够多次（视需求的进度而定）才进行打标签的。**

### 示例：

注意：下面说的版本号即为标签名
查看当前分支： git tag
添加本地标签：git tag -a 版本号
删除本地标签: git tag -d 版本号
推送某标签至远程：git push origin 版本号
推送全部标签至远程：git push origin –tags 提交所有 tag 至远程，使用 git push origin 不会提交本地标签
删除远程标签： git push origin :refs/tags/版本号

## tag 信息的规范

### 测试阶段

（版本处在里程碑节点的测试阶段。如功能测试、性能测试，会打 tag）

tag 名称规则为：`预发布版本号*test*构建的日期和时间`

如：`V100.001.01._test_20181015`

说明：由 Jenkins 自动进行日构建，并按照 tag 名称规则打 tag，待测试通过后仅保留最后一次 tag，其他 tag 删除。

3.2 发布阶段 （测试通过后，由 CM 给代码打上 released 的标签）

tag 名称规则为：`发布版本号_released`

例子：`V100.001.01_released`
