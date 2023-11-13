# gitlab 部署

部署在 115.231.27.41 => tool.jima101.com

## 具体操作

1. 需要安装 gitlab 服务；
2. 还要安装邮件服务；
3. 配置 gitlab：
   1. 指定服务器 ip 和自定义端口
   2. 使用命令：vim /etc/gitlab/gitlab.rb
   3. 使 extenal_url 指向自己的 ip：extenal_url=“http://ip:8888”
   4. 修改发邮件的服务；
4. [代理 gitlab](https://zj-git-guide.readthedocs.io/zh_CN/stable/gitlab/[GitLab][nginx]%E5%8F%8D%E5%90%91%E4%BB%A3%E7%90%86.html)；
   1. http://localhost:8888/gitlab/
5. external_url 配置：
   1. external_url 'http://example.org:8138' => 当更改 gitlab.rb 中的 external_url 参数时，会产生副作用（官方文档中没有非常清楚地说明！），nginx 现在将在放置在http://example.org中的端口上运行：8138。
   2. **external_url 的配置直接影响到 gitlab 系统中所有 http 入口的地址，比如 git 仓库的 http 地址，gitlab 访问页面的地址，注册回调的地址，邮件验证的地址等**。
6. 修改配置与重新启动
   1. vi /etc/gitlab/gitlab.rb
   2. gitlab-ctl reconfigure
   3. gitlab-ctl restart
7. 修改 gitlab.ym
   1. 修改 gitlab.yml 的 host 和 port，把它修改的和 gitlab.rb 一致；
   2. vi /opt/gitlab/embedded/service/gitlab-rails/config/gitlab.yml
   3. **不要运行 gitlab-ctl reconfigure 运行了,配置又还原回去了** => 这里可能就是从配置的 external_url 生成的配置；
   4. gitlab-ctl restart
8. [禁用内部 nginx](https://blog.hobairiku.site/2018/02/26/gitlab-setup/#1-%E4%B8%BB%E8%A6%81%E8%BF%90%E8%A1%8C%E7%AB%AF%E5%8F%A3%E5%92%8C%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6)；
   1. 自己的 Nginx 服务器是一个云服务器，而 gitlab 所在的服务器是在家中的一个固定 ip 网络内的主机。
9. 修改邮箱为 smtp：
   1. gitlab-rails console
   2. Notify.test_email('1014913222@qq.com', '邮件标题', '邮件正文').deliver_now

### 总结

1. 修改 external_url，指向想要访问的地址，这个时候服务默认启动到 80 端口；
2. 修改 vi /opt/gitlab/embedded/service/gitlab-rails/config/gitlab.yml 的 port，让服务启动到 8888；
3. [需要配置内部的 nginx，对 8888 的服务映射到](https://learnku.com/articles/53373)； `/var/opt/gitlab/nginx/conf/gitlab-http.conf`

```
# 修改 gitlab nginx 配置
找到 /var/opt/gitlab/nginx/conf/gitlab-http.conf。
它是 gitlab 内置的 nginx 的配置文件，里面可以影响到 nginx 真实监听端口号。要与上面的端口号 1 设置成一样。（位置略靠下）
server {
#listen *:80;
listen *: 8000;
```

4. 但是这里要注意，每次执行`gitlab-ctl reconfigure`的时候，就需要重新去修改，因为会被重新覆盖;
5. https://www.cnblogs.com/ifme/p/12851748.html

## 账户

1. root => jmsd@12345

## 参考

1. <https://blog.csdn.net/smilehappiness/article/details/106353324>
