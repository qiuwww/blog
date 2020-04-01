// 读取blog下的所有文件，查找文件名为BLOG-开头的，然后输出为一个json文件

const { join, resolve, basename, extname, relative } = require('path');
const { readdirSync, statSync, writeFileSync } = require('fs');

const blogPath = resolve(__dirname, '../');
const outputFilePath = resolve(__dirname, 'outputFile');
// console.log('blogPath', blogPath);

const files = [],
  mdFiles = [],
  types = [];

// 需要循环遍历文件夹
const readFolder = (folderPath, excludes = ['node_modules']) => {
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
      // 筛选文件
      if (!basename(pathResolve).includes('BLOG-')) {
        return;
      }
      // 是一个文件，就记录下来
      files.push({
        basename: basename(pathResolve),
        pathResolve,
        extname: extname(pathResolve),
        ctime: st.ctime,
      });
    } else if (st.isDirectory()) {
      // 如果是目录则递归调用自身
      readFolder(pathResolve);
    }
  });
};

readFolder(blogPath);

// 输出json文件
// writeFileSync(resolve(outputFilePath, 'blog.json'), JSON.stringify(files, null, 2));

// 输出MD文档

const outputMdFile = (outputFilePath, filename) => {
  files.filter((item, index) => {
    const { pathResolve, extname, basename, ctime } = item;
    const pathRelative = relative(outputFilePath, pathResolve);
    const regexp = /^(\.\.\/){2}([^/]+)[\s\S]+BLOG-(.+).md$/;
    const found = pathRelative.match(regexp);
    if (!found) {
      console.log('未匹配', pathRelative, pathResolve);
      return;
    }
    const type = found[2];
    const name = found[3];
    if (!types.includes(type)) {
      mdFiles.push(`## ${type}`);
      types.push(type);
    }
    mdFiles.push(`### ${index + 1} [${name}](${pathRelative})`);
  });

  // 添加头信息
  const mdFileHeader = `---
title: blog
date: ${new Date()}
tag:
  - blog索引
---

blog主要总结的索引

`;

  writeFileSync(resolve(outputFilePath, filename), mdFileHeader + mdFiles.join('\n\n'));
};

outputMdFile(resolve(outputFilePath), 'blog.md');
