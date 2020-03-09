# Vim 使用

## 编辑文件，并保存

1. 打开 filename 文件；
   \$ vim filename
2. 进入编辑模式；
   输入 i，进入 insert 模式
3. 编辑结束，保存文件内容；
   退出命令是，按 ESC 键 跳到命令模式，然后输入:q（不保存）或者:wq（保存） 退出。

```bash
vim package.json
i # 进入编辑
esc
:wq  # 保存并推出
```
