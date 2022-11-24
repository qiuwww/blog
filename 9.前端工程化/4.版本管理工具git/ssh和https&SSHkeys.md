# ssh 和 https

[参考文档](https://blog.csdn.net/sltylzx/article/details/89161181)

## clone 项目的两种方式的对比

在管理 Git 项目上，很多时候都是直接使用 https url 克隆到本地，当然也有有些人使用 SSH url 克隆到本地。

这两种方式的主要区别在于：

1. 使用 https url 克隆对初学者来说会比较方便，复制 https url 然后到 git Bash 里面直接用 clone 命令克隆到本地就好了，但是每次 fetch 和 push 代码都需要输入账号和密码，这也是 https 方式的麻烦之处。
2. 而使用 SSH url 克隆却需要**在克隆之前先配置和添加好 SSH key**，因此，如果你想要使用 SSH url 克隆的话，**你必须是这个项目的拥有者**。否则你是无法添加 SSH key 的，另外 ssh 默认是每次 fetch 和 push **代码都不需要输入账号和密码**，如果你想要每次都输入账号密码才能进行 fetch 和 push 也可以另外进行设置。

## 配置 SSH

查看本地的 sshkeys: `ls -al ~/.ssh`

创建一个 SSH Key: `ssh-keygen -t rsa -C "你的email地址"`

生成第一个 key
ssh-keygen -t rsa -C "1014913222@qq.com"

生成第二个 key

ssh-keygen -t rsa -C "qiuww@eazytec.com" -b 4096

.ssh/id_rsa_gitlab

配置 sourcetree

### 生成新 SSH 密钥并添加到 ssh-agent 需要如下的步骤：

1. 生成密钥，`ssh-keygen -t rsa -b 4096 -C "your_email@example.com"`
2. 本地将 SSH 密钥添加到 ssh-agent，`ssh-add -K ~/.ssh/id_rsa`
3. github 仓库`setting -> new ssh key`