const path = require("path");
const PKG_PATH = path.resolve(__dirname, "../package.json");
const pkgConfig = require(PKG_PATH);
const fs = require("fs");

module.exports = {
  set(key, value) {
    pkgConfig[key] = value;
  },
  get(key) {
    return pkgConfig[key];
  },
  has(key) {
    return !!pkgConfig[key];
  },
  getAll() {
    return pkgConfig;
  },
  save(obj = {}) {
    const newPackageJson = { ...pkgConfig, ...obj };
    fs.writeFileSync(PKG_PATH, JSON.stringify(newPackageJson, null, 2));
  }
};
