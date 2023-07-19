# linux 常见操作

## 端口占用的问题处理 server got error: bind EADDRINUSE null:7001, code: EADDRINUS / node Error: bind EADDRINUSE null

端口被占用，换成别的端口。

```bash
lsof -i:7001

=>tcp6       0      0 :::7001                 :::*                    LISTEN      6152/node

kill -9 PID
kill -9 6152
```
