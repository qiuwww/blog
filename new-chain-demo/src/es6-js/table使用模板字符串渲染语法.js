// table使用模板字符串渲染语法.js
const tmpl = addrs => `
    <table>
    ${addrs.map(addr => `
        <tr><td>${addr.first}</td></tr>
        <tr><td>${addr.last}</td></tr>
    `).join("")}
    </table>
`;

const data = [
    { first: "<Jane>", last: "Bond" },
    { first: "Lars", last: "<Croft>" },
];
console.log(tmpl(data));
// Output:
// <table>
//
// <tr><td><Jane></td></tr>
// <tr><td>Bond</td></tr>
//
// <tr><td>Lars</td></tr>
// <tr><td><Croft></td></tr>
//
// </table>