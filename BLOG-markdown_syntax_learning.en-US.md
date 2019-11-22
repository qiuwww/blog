# typora grammar learning

## table of Contents

[TOC]

## Quote

> This is a block reference,
>
> should be able to write very long, very long
>
> ### Quoted title
>
> Balabalabala
>
> > This is the second level reference.
> > return shell_exec(`echo $input | $markdown_script`);

## Commonly used simple tags

This is ``u>`underscore`</u>`, but why is there always a hint error here?

---

split line

---

~ This is the strikethrough, but it doesn't work, it seems that ^ and ~ are not available~

`Code style display, you need to look at it here, you can also read other people's documents to learn this grammar.

```html
The code block is like this, yes, that's it.
```

```html
Of course, this can be the case, that's it.
```

Express ** stressed **

Of course, this also means that ** emphasizes **, generally used in the line

Represents _ italic _, one less than the emphasis

Of course this is also _ italic_

## list

### task list

- [x] eating
- [x] Watching a movie, completed
- [ ] reading, not finished yet

### Unordered list

> Use an asterisk, plus or minus sign as a list tag

#### Unordered list 1, of course the official is recommended `-`

- html
- css
- javascript

#### Unordered list 2

- vue
- angularjs
- react

#### Unordered list 3

- vue
- angularjs
- react

### Ordered list

Nodejs

2. angularjs
   React

### List of nested block references

Github has the following main features:

> Code Hosting Platform
> Online operating environment
> Code Quality Monitoring
> Project Management Platform

## Code Block

```js
/**
 * @desc determines if `obj` is empty
 * @param {Object} obj object
 * @return {Boolean}
 */
Export function isEmptyObject(obj) {
  If (!obj || typeof obj !== "object" || Array.isArray(obj)) return false;
  Return !Object.keys(obj).length;
}
```

```bash
#!/bin/bash
Npm install module@latest
```

## link

[embedded link](https://www.google.com)

[embedded link with title](https://www.google.com "Google's homepage")

[arbitrary case-insensitive reference text]

[relatively refer to a library file](../blob/master/LICENSE)

[You can use numbers in referenced link definitions][1]

Or leave nothing to write [link text itself]

The text used to describe the reference link can be placed after it.

[arbitrary case-insensitive reference text]: https://www.mozilla.org
[1]: http://slashdot.org
[link text itself]: http://www.reddit.com

### Automatic link

Of course, the standard url is filled in directly. Eg:www.baidu.com

If you look at it, you will know: <http://www.baidu.com>

[typora grammar learning](https://github.com/moonbreezee/blog/blob/master/typora%E8%AF%AD%E6%B3%95%E5%AD%A6%E4%B9%A0.md)

### In-page navigation

This should be an anchor when it is converted to html.

[insert image] (#insert image)

**[:arrow_up: Back to Contents](#Directory)**

## Form

| Name       | Gender |       Graduation School       | Salary |
| :--------- | :----: | :---------------------------: | -----: |
| Yang Yang  |  Male  | Chongqing Jiaotong University |   3200 |
| Feng Ge    |  Male  |      Guizhou University       |   5000 |
| Hang goods | Female |       Peking University       |   2000 |

The second line of code specifies the alignment, the first is left-aligned, the second and third are centered, and the last is right-aligned.

## Insert image

Local images can be dragged directly: ![gitflow workflow](./4.version management tool/imgs/git-workflow-release-cycle-4maintenance.png), it is best to write the relative address of the current document, otherwise Uploading is not available anywhere else.

### Network picture, so easy, (of course, need to be empty before and after the title)

![img](http://upload-images.jianshu.io/upload_images/1182605-1cbd9bb6f1ed0be4.gif?imageMogr2/auto-orient/strip)

## This is two dividing lines

Split content 1

---

Split content 2

---

Split content 3, of course, the official is recommended `******`, six

## Strikethrough

~~ Inline content to be removed~~

## annotation

Some people have used it before they know [^ comment]

[^comment]: Really, but why is it here?

## Flowchart

The Markdown editor supports drawing flowcharts, timing diagrams, and Gantt charts. Insert the graphics with mermaid and click for more syntax details.

### Flowchart 1

```flow
St=>start: Start
e=>end
Op=>operation: My Operation
Cond=>condition: Yes or No?

St->op->cond
Cond(yes)->e
Cond(no)->op
```

### and timing diagram

```sequence
Alice->Bob: Hello Bob, how are you?
Note right of Bob: Bob thinks
Bob-->Alice: I am good thanks!
```

> **Tip: **For more information, please see **Flowchart ** [Syntax][3] and ** Timing Chart ** [Syntax][4].

## markdown Internal can embed direct html code

```html
<h1 align="center">
  <br />
  <a href="https://github.com/stephentian/33-js-concepts"
    ><img
      src="https://github.com/stephentian/33-js-concepts"
      alt="33 concepts that every JS development should understand"
      width="200"
  /></a>
  <br />
  <br />
  33 concepts that JavaScript developers should understand
  <br />
</h1>
```

## Insert math formula

[Formula Edit](https://www.codecogs.com/latex/eqneditor.php)

### Using a server using Google Chart

<img src="http://chart.googleapis.com/chart?cht=tx&chl=$$\sum_{k=1}^{n}w_k l_k$$" style="border:none;">

<img src="http://chart.googleapis.com/chart?cht=tx&chl=\Large x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}" style="border :none;">

### Using the MathJax engine, previewing in vscode is fine

[Example reference](https://juejin.im/post/5a6721bd518825733201c4a2)

<script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=default"></script>

> \$$ formula $ represents an interline formula, $ formula $ represents an inline formula

$$x_1$$

$$x_1^2$$

$$x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}$$

$$a + b$$

$$\frac{x+y}{2}$$

$$\sqrt{1+\sqrt[^p\!]{1+a^2}}$$

$\int_a^b f(x)dx$

$\sum_{k=1}^n\frac{1}{k}$

$(a + b)$

$(x=\frac{-b\pm\sqrt{b^2-4ac}}{2a})$

Close to $a\!b$
No spaces $ab$
Small space a\,b
Medium space a\;b

$$\int_a^b f(x)\,\mathrm{d}x$$

$$\left(\sum_{k=\frac{1}{2}}^{N^2}\frac{1}{k}\right)$$

$$\begin{Bmatrix}1 & 2\\\\3 &4\end{Bmatrix}$$

## footnote

Text prior to footnote reference.[^2]
[^2]: Comment to include in footnote.

## Currently here, there is a little problem, in the future, how to write others, but also skilled use

Changyangzhe-2016.7.22
Moonbreezee-2018.9.14

## hero Build the configuration header of the article

```yaml
---
Layout: post
Title: title
Date: 2013-7-13 20:46:25
Updated: 2013-7-13 20:46:29
Photos: https://github.com/moonbreezee/treasure-pictures/blob/master/%E4%BA%8C%E5%8D%81%E5%9B%9B%E8%8A%82%E6%B0%94 %E4%B8%8E%E4%BC%A0%E7%BB%9F%E8%8A%82%E6%97%A5/2019%E5%B9%B41%E6%9C%885%E6%97%A5 -%E5%B0%8F%E5%AF%92.jpeg
Tags:
  - JavaScript
  - React
# categories:
# - Programming
Categories:
  - [Linux, Hexo]
  - [Tools, PHP]
Comments: true
---
```
