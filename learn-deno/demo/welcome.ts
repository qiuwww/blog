// welcome.ts
// 从 URL 上导入 server.ts 模块，并提取（ES6 解构赋值）出 serve 对象
import { serve } from 'https://deno.land/std/http/server.ts';
// 实例化一个 serve 对象
const s = serve({ port: 8000 });
// 在终端上打印程序监听的端口地址
console.log('http://localhost:8000/');
// 使用 ES9 新特性 for await 语法，当访问监听端口时，返回一句“Hello World”
for await (const req of s) {
  req.respond({ body: 'Hello World\n' });
}

// deno-tutorial git:(master) deno run --allow-net demos/welcome.ts
