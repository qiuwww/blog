HTML元素的属性顺序
HTML 属性应当按照以下给出的顺序依次排列，确保代码的易读性。

class
id, name
data-*
src, for, type, href
title, alt
aria-*, role
class 用于标识高度可复用组件，因此应该排在首位。id 用于标识具体组件，应当谨慎使用（例如，页面内的书签），因此排在第二位。