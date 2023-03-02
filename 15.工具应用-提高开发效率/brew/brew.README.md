# brew

Homebrew 通过简单的一条指令，就可以实现包管理，不需要关心各种依赖和文件路径的情况。

## Homebrew 的两个术语

1. Formulae：软件包，包括了这个软件的依赖、源码位置及编译方法等；
2. Casks：已经编译好的应用包，如图形界面程序等。

## Homebrw 相关的几个文件夹用途

1. bin：用于存放所安装程序的启动链接（相当于快捷方式）
2. etc：brew 安装程序的配置文件默认存放路径
3. Library：Homebrew 系统自身文件夹
4. Cellar：通过 brew 安装的程序将以 [程序名/版本号] 存放于本目下

## 常用的 brew 命令

1. 查看 brew 版本：brew -v
2. 更新 brew 版本：brew update
3. 本地软件库列表：brew list
4. 查看软件库版本：brew list --versions
5. 查找软件包：brew search xxx （xxx 为要查找软件的关键词）
6. 安装软件包：brew install xxx （xxx 为软件包名称）
7. 卸载软件包：brew uninstall xxx
8. 安装软件：brew cask install xxx（xxx 为软件名称）
9. 卸载软件：brew cask uninstall xxx
10. 查找软件安装位置：which xxx （xxx 为软件名 2）
11. brew doctor `brew doctor --list-checks | grep -v stray_headers`

## cask

brew install 用来安装一些不带界面的命令行工具和第三方库。
brew cask install 用来安装一些带界面的应用软件。
