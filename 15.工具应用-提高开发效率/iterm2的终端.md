# iterm2

## 切换使用主题

`chsh -s /bin/zsh`

切换 bash（需要 sudo）`chsh -s /bin/bash`
切换 zsh（不需要 sudo）`chsh -s /bin/zsh`

## 快捷键

- 选中即复制，不需要再`command+c`了；
- 屏幕分隔:
  - command+d :垂直分割；
  - command+shift+d :水平分割；
  - 使用 ⌘ + ]和 ⌘ + [在最近使用的分屏直接切换.而 ⌘ + opt + 方向键切换到指定位置的分屏。
- ⌘ + 数字 :切换标签页，⌘ + 方向键 按方向切换标签页；
- ⌘ + enter :切换全屏；
- ⌘ + t :新的标签页；
- 快速唤出: option+space；
- ⌘ + r :清屏。
- ctrl + u: 清除当前行
- ctrl + l: 清屏
- ctrl + a: 到行首
- ctrl + e: 到行尾
- ctrl + f/b: 前进后退
- ctrl + p: 上一条命令
- ctrl + r: 搜索命令历史
- command + ;: 查看历史命令
- command + shift + h: 查看剪贴板历史
- tab: 可以查看到下边的文件与补全名称

## 在命令行内打开图片

```bash
# 安装imgcat：curl -L https://iterm2.com/shell_integration/install_shell_integration_and_utilities.sh | bash
imgcat /Users/qiuww/code/learn/blog/15.工具应用-提高开发效率/imgs/mac系统快捷键.jpg
```
