
# Builtin values
references:
    - references.md
    - abbreviations.md
    - footnotes.md

destination: destination.html

# Meta Data
title: Test Page
author:
    - John Doe
    - Jane Doe

# Settings overrides
settings:
    enabled_extensions:
    - extra
    - github
    - toc
    - headerid
    - smarty(smart_quotes=False) # smart quotes interferes with attr_list
    - meta
    - wikilinks
    - admonition
    - codehilite(guess_lang=False,pygments_style=github)
```
四、编辑
按Ctrl + N 新建一个文档
按Ctrl + Shift + P
使用Markdown语法编辑文档
语法高亮，输入ssm 后回车(Set Syntax: Markdown)

五、在浏览器预览Markdown文档
按Ctrl + Shift + P
输入mp 后回车(Markdown Preview: current file in browser)
此时就可以在浏览器里看到刚才编辑的文档了
```