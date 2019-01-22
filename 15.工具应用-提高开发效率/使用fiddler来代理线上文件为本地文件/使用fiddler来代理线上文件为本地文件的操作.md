

## 问题产生的原因，开发过程中，每次更改线上文件，到服务器自动更新需要很久的时间（5min），每次更改都要等待，严重影响工作效率。尝试把线上文件复制一份在本地，使用fiddler来代理请求。

## 步骤：
1. 在chrome控制台找到资源的请求地址：network->name->headers->Request URL:http://172.20.1.45/static/css/style.css;
2. 打开fillder，刷新页面，右侧AutoResponder。Add Rule->Rule Editor->粘贴Request URL->下边的地址选择框，拉到底，Find a file...->Save