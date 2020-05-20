// https://markmap.js.org/usage

const { transform } = require('markmap-lib/dist/transform.common');
const { markmap } = require('markmap-lib/dist/view.common');

const md = `
# hello

- This is my Markdown.
`;

const data = transform(md);
markmap('#mindmap', data);


// 需要研究一下，如何使用markdown直接导出目录图表
