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
console.log('path', learnPath, targetPath);
// md文件依赖的img存放地址目录
const imgsPath = resolve(__dirname, '../hexo-website/source/imgs');
console.log('path', learnPath, targetPath, imgsPath);

const files = [], // 检索出来的所有BLOG-文件
  types = []; // 分类
let index = 1; // 图片索引

// 拿到绝对路径，切分出来文件类型
// 返回文件类型
const parsePath = (pathResolve) => {
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
const copyLearnFile = (folderPath, excludesList) => {
  // 读取文件夹中的文件夹或者文件
  const paths = readdirSync(folderPath);
  // console.log('paths', folderPath, paths);
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
      // console.log('####matchRes', pathResolve, matchRes);
      const type = matchRes[1];
      const name = matchRes[3];
      // 添加类型
      addTypes(type);
      // 复制文件
      fixPathAndMoveFile({ targetPath, type, name, pathResolve });
      // 复制文件依赖的图片资源
      // moveImgs({ targetPath, type, name, pathResolve });
    } else if (st.isDirectory()) {
      // 如果是目录则递归调用自身
      copyLearnFile(pathResolve, excludesList);
    }
  });
};

// 添加到types
function addTypes(type, matchRes) {
  if (!types.includes(type)) {
    types.push(matchRes);
  }
}

function mkdirSubSync(type) {
  const typePath = resolve(targetPath, type);
  if (!existsSync(typePath)) {
    mkdirSync(typePath);
  }
}

function fixPathAndMoveFile({ targetPath, type, name, pathResolve }) {
  mkdirSubSync(type);
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
    const imgNewName = `${type}-${p5}-${index++}${p6}`;
    console.log('$$$img$$$', imgNewName);
    writeFileSync(resolve(imgsPath, imgNewName), readFileSync(resolve(pathResolve, '../imgs', p4)));
    return `${p1}${p3}${imgNewName})\n`;
  });
  console.log('###md###', resolve(targetPath, type, name));
  writeFileSync(resolve(targetPath, type, name), fileStr);
}
// 读取所有文件夹，复制md文件，修改md文件，复制imgs
copyLearnFile(learnPath, excludesList);
