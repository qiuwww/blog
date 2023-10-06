# nginx的使用

1. 默认配置文件的地址：
   1. nginx -t
   2. /opt/homebrew/etc/nginx/nginx.conf
2. 启动
   1. nginx
   2. brew services start nginx
3. 重启
   1. nginx -s reload
   2. brew services restart nginx
4. 关闭
   1. nginx -s stop
   2. brew services stop nginx

## 这里需要配置读取，执定类型的配置文件，还要保证在这个配置文件被删除的时候，不会报错

1. 默认有如下的：includes services/*
