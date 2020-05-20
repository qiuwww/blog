const YAML = require('yamljs');

const yamlString = `
title: 斐波那契数列
date: 2018-6-8
categories:
  - [算法, 斐波那契数列]
`;
// parse YAML string
const nativeObject = YAML.parse(yamlString);

console.log('nativeObject', nativeObject);
// Generate YAML
const yamlString2 = YAML.stringify(nativeObject, 4);

console.log('yamlString2', yamlString2);
