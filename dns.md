# dns

## 查询域名的 ip

```bash
$ dig @1.1.1.1 es6.ruanyifeng.com
$ dig @1.1.1.1 baidu.com
$ dig @1.1.1.1 app.ymkjgc.com
$ dig @1.1.1.1 gm.ymkjgc.com
$ dig @1.1.1.1 img.ymkjgc.com => 119.37.199.165

# 我们选择192.33.4.12，向它发出查询，询问es6.ruanyifeng.com的 TLD 服务器的 IP 地址。
$ dig @192.33.4.12 es6.ruanyifeng.com

# 有了 TLD 服务器的 IP 地址以后，我们再选一台接着查询。
$ dig @192.41.162.30 es6.ruanyifeng.com
```

## 参考

1. [DNS 查询原理详解](https://mp.weixin.qq.com/s/Kur84cigXkiTs3vimS3wQA)
