// 读取blog下的所有文件，查找文件名为BLOG-开头的，然后输出为一个json文件
const { join, resolve, basename, extname, relative } = require('path');
const { mkdirSync, readdirSync, statSync, writeFileSync, readFileSync, existsSync } = require('fs');
const child_process = require('child_process');
// 排除的文件夹，不检索
const excludesList = ['AndroidAppProject', 'hexo-website', 'node_modules', 'gitbook'];
// 源文件目录
const learnPath = resolve(__dirname, '../../../');
// md文件存放地址目录
const targetPath = resolve(__dirname, '../hexo-website/source/_posts');
// md文件依赖的img存放地址目录
const imgsPath = resolve(__dirname, '../hexo-website/source/imgs');
console.log('\x1B[32m%s\x1B[39m', '^^^path', learnPath, targetPath, imgsPath);

// 记录值
const files = [], // 检索出来的所有BLOG-文件
  types = {}; // 分类

// 拿到绝对路径，切分出来文件类型
// 返回文件类型
const parsePath = (pathResolve) => {
  // 当前目录结构，所有项目都放在learn下
  const regexp = /^[\s\S]+\/learn\/([^/]+)([\s\S]+)?\/BLOG-((.+).md)$/;
  const found = pathResolve.match(regexp);
  files.push(found);
  if (!found) {
    console.log('未匹配', pathResolve);
    return;
  }
  return found;
};

// 添加到types
function addTypes(type, matchRes) {
  if (types[type]) {
    types[type].push(matchRes);
  } else {
    types[type] = [matchRes];
  }
}

// 创建下级文件目录
function mkdirSubSync(targetPath, type) {
  const typePath = resolve(targetPath, type);
  if (!existsSync(typePath)) {
    mkdirSync(typePath);
  }
}

// 需要循环遍历文件夹
const copyLearnFile = (folderPath, excludesList) => {
  // 读取文件夹中的子文件夹或者文件
  const paths = readdirSync(folderPath);
  paths.forEach(function (path) {
    if (excludesList.includes(path)) {
      return;
    }
    const pathResolve = resolve(folderPath, path);
    // 判断是文件还是文件夹
    const st = statSync(pathResolve);
    // 判断是否为文件
    if (st.isFile()) {
      // 文件解析
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
      const name2 = matchRes[4];
      // 添加类型
      addTypes(type, matchRes);
      // 复制文件及其下边的图片
      fixPathAndMoveFile({ targetPath, type, name, pathResolve, name2 });
      // 复制文件依赖的图片资源
    } else if (st.isDirectory()) {
      // 如果是目录则递归调用自身
      copyLearnFile(pathResolve, excludesList);
    }
  });
};

function fixPathAndMoveFile({ targetPath, type, name, pathResolve, name2 }) {
  // 创建type目录
  mkdirSubSync(targetPath, type);
  let fileStr = readFileSync(pathResolve).toString();
  // 处理图片的地址问题
  fileStr = fileStr.replace(/(!\[[\S\s]+?\]\()(\.)(\/imgs\/)(([^.]+)(\.[\s\S]+?))\)\n/gm, function (
    match,
    p1,
    p2,
    p3,
    p4,
    p5,
    p6,
    offset,
    string,
  ) {
    const imgNewName = `${type}_${name2}-${p5}${p6}`;
    console.log('\x1b[36m%s\x1b[0m', '$$$复制图片：', imgNewName);
    writeFileSync(resolve(imgsPath, imgNewName), readFileSync(resolve(pathResolve, '../imgs', p4)));
    return `${p1}${p3}${imgNewName})\n`;
  });
  console.log('\x1b[33m%s\x1b[0m', '$$$复制md：', resolve(targetPath, type, name));
  writeFileSync(resolve(targetPath, type, name), fileStr);
}

// 读取所有文件夹，复制md文件，修改md文件，复制imgs
copyLearnFile(learnPath, excludesList);

writeFileSync(resolve(__dirname, './blog.json'), JSON.stringify(types, null, 2));
