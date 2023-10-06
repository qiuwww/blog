const path = require('path')
const ci = require('miniprogram-ci')
const execSync = require('child_process').execSync
const versionConfig = require('./version.config.json')
const authorName = execSync(`git show -s --format=%an`).toString().trim()
const { APP_ID, ENV } = process.env
const privateKeyPath = path.join(__dirname, './privatekey.key')
const projectPath = path.join(__dirname, '../dist/build/mp-weixin')
console.log(privateKeyPath)
console.log(projectPath)
console.log(authorName, APP_ID, ENV)
const project = new ci.Project({
  appid: APP_ID,
  type: 'miniProgram',
  projectPath,
  miniprogramRoot: privateKeyPath,
  privateKeyPath,
  ignores: [
    'node_modules/**/*',
    'build',
    'dev'
  ]
})
const CI_ROBOT = {
  'qa': 1,
  'pre': 2,
  'master': 3
}
function getDescInfo (version, desc) {
  const descMap = {
    qa: `QA版本更新：${version}，开发者：${authorName}，描述：${desc}`,
    pre: `PRE版本更新：${version}，开发者：${authorName}，描述：${desc}`,
    master: `正式版更新：${version}，${desc}，别点设置为体验版，点了后果自负`,
  }
  return descMap[ENV]
}
async function upload ({ version = '1.0.0', versionDesc = '小程序' }) {
  const option = {
    project,
    version,
    desc: getDescInfo(version, versionDesc),
    setting: {
      es6: true,
      es7: false,
      minify: true,
      autoPrefixWXSS: true
    },
    robot: CI_ROBOT[ENV]
  }
  const res = await ci.upload(option)
  console.log('option', option)
  console.log(res)
}
upload(versionConfig)
