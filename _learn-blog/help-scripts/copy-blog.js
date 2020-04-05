// 读取blog下的所有文件，查找文件名为BLOG-开头的，然后输出为一个json文件

const { join, resolve, basename, extname, relative } = require('path');
const { mkdirSync, readdirSync, statSync, writeFileSync, readFileSync, existsSync } = require('fs');

const learnPath = resolve(__dirname, '../../../');
const targetPath = resolve(__dirname, '../hexo-website/source/_posts');
console.log('path', learnPath, targetPath);

// 排除的文件夹，不检索
const excludesList = ['AndroidAppProject', 'hexo-website', 'node_modules', 'gitbook'];

const files = [], // 检索出来的所有BLOG-文件
  types = []; // 分类

// 拿到绝对路径，切分出来文件类型
// 返回文件类型
const parsePath = pathResolve => {
  const regexp = /^[\s\S]+\/learn\/([^/]+)([\s\S]+)?\/BLOG-((.+).md)$/;
  const found = pathResolve.match(regexp);
  files.push(found);
  if (!found) {
    console.log('未匹配', pathResolve);
    return;
  }
  return found;
};

// 需要循环遍历文件夹
const copyBlog = (folderPath, excludes = excludesList) => {
  // 读取文件夹中的文件夹或者文件
  const paths = readdirSync(folderPath);
  // console.log('paths', folderPath, paths);
  paths.forEach(function(path) {
    if (excludes.includes(path)) {
      return;
    }
    const pathResolve = resolve(folderPath, path);
    // 判断是文件还是文件夹
    const st = statSync(pathResolve);
    // 判断是否为文件
    if (st.isFile()) {
      const base_name = basename(pathResolve);
      const ext_name = extname(pathResolve);
      // 筛选文件
      if (!base_name.includes('BLOG-') || ext_name !== '.md') {
        return;
      }
      // 复制文件到目标文件夹下
      const matchRes = parsePath(pathResolve);
      const type = matchRes[1];
      const name = matchRes[3];
      console.log('$$$$$$$$', type, name);
      if (!types.includes(type)) {
        types.push(matchRes);
      }
      // 文件夹不存在的情况
      const typePath = resolve(targetPath, type);
      if (!existsSync(typePath)) {
        mkdirSync(typePath);
      }
      writeFileSync(resolve(targetPath, type, name), readFileSync(pathResolve));
    } else if (st.isDirectory()) {
      // 如果是目录则递归调用自身
      copyBlog(pathResolve);
    }
  });
};

// 读取所有文件夹
copyBlog(learnPath, excludesList);

// writeFileSync(resolve('./', 'blog.json'), JSON.stringify(types, null, 2));

// // 复制文档到hexo-website/source/_posts

// const outputMdFile = (outputFilePath, filename) => {
//   files.filter((item, index) => {
//     const { pathResolve, extname, basename, ctime } = item;
//     const pathRelative = relative(outputFilePath, pathResolve);
//     const regexp = /^(\.\.\/){2,3}(([^/]+)[\s\S]+)?BLOG-(.+).md$/;
//     const found = pathRelative.match(regexp);
//     console.log('found', found);
//     if (!found) {
//       console.log('未匹配', pathRelative, pathResolve);
//       return;
//     }
//     const type = found[3] || 'notype';
//     const name = found[4];
//     if (!types.includes(type)) {
//       mdFiles.push(`## ${type}`);
//       types.push(type);
//     }
//     mdFiles.push(`### ${index + 1} [${name}](${pathRelative})`);
//   });
// };

// outputMdFile(resolve(outputFilePath), 'blog.md');
