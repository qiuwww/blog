# 一个小公司的技术开发心酸事

## 背景

长话短说，就是在2022年6月的时候加入了一家很小创业公司。老板不太懂技术，也不太懂管理，靠着一腔热血加上对实体运输行业的了解，加上盲目的自信，贸然开始创业，后期经营困难，最终散伙。

自己当时也是不察，贸然加入，后边公司经营困难，连最后几个月的工资都没给发。

当时老板的要求就是尽力降低人力成本，尽快的开发出来App(Android+IOS)，老板需要尽快的运营起来。

## 初期的技术选型

当时就自己加上一个刚毕业的纯前端开发以及一个前面招聘的ui，连个人事、测试都没有。

结合公司的需求与自己的技术经验(主要是前端和nodejs的经验)，选择使用如下的方案：

1. 使用`uni-app`进行`App`的开发，兼容多端，也可以为以后开发小程序什么的做方案预留，主要考虑到的点是比较快，先要解决有和无的问题；
2. 使用`egg.js` + `MySQL`来开发后端，开发速度会快一点，行业比较小众，不太可能会遇到一些较大的性能问题，暂时看也是够用了的，后期过渡到`midway.js`也方便；
3. 使用`antd-vue`开发运营后台，主要考虑到与`uni-app`技术栈的统一，节省转换成本；

也就是初期选择使用`egg.js` + `MySQL` + `uni-app` + `antd-vue`，来开发两个App和一个运营后台，快速解决0到1的问题。

### 关于App开发技术方案的选择

App的开发方案有很多，比如纯原生、flutter、uniapp、react-native/taro等，这里就当是的情况做一下选择。

1. IOS与Android纯原生开发方案，需要新招人，两端同时开发，两端分别测试，这个资金及时间成本老板是不能接受的；
2. flutter，这个要么自己从头开始学习，要么招人，相对于纯原生的方案好一点，但是也不是最好的选择；
3. react-native/taro与uni-app是比较类似的选择，不过考虑到熟练程度、难易程度以及开发效率，最终还是选择了uni-app。

### 为什么选择egg.js做后端

很多时候方案的选择并不能只从技术方面考虑，当是只能选择成本最低的，当时的情况是`egg.js`完全能满足。

1. 使用一些成熟的后端开发方案，如Java、、php、go之类的应该是比较好的技术方案，但对于老板来说不是好的经济方案；
2. `egg.js`开发比较简单、快捷，个人也比较熟悉，对于新成员的学习成本也很低，对于JS有一定水平的也能很快掌握`egg.js后端的开发`。

## 中间的各种折腾

前期开发还算顺利，在规定的时间内，完成了开发、测试、上线。但是，老板并没有如前面说的，很快运营，很快就盈利，运营的开展非常缓慢。中间还经历了各种折腾的事情。

1. 老板运营遇到困难，就到处找一些专家（基本跟我们这事情没半毛钱关系的专家），不断的提一些业务和ui上的意见，不断的修改；
2. 期间新来的产品还要全部推翻原有设计，重新开发；
3. 还有个兼职的领导非要说要招聘原生开发和Java开发重新进行开发，问为什么，也说不出什么所以然，也是道听途说。

反正就是不断提出要修改产品、设计、和代码。中间经过不断的讨论，摆出自己的意见，好在最终技术方案没修改，前期的工作成果还在。后边加了一些新的需求：系统升级1.1、ui升级2.0、开发小程序版本、开发新的配套系统(小程序版本)以及开发相关的后台、添加即时通信服务、以及各种小的功能开发与升级；

中间老板要加快进度了就让招人，然后又无缘无故的要开人，就让人很无奈。最大的运营问题，始终没什么进展，明显的问题并不在产品这块，但是在这里不断的折腾这群开发，也真是难受。

明明你已经很努力的协调各种事情、站在公司的角度考虑、努力写代码，却仍然无济于事。

### 后期技术方案的调整

1. 后期调整了App的打包方案；
2. 在新的配套系统中，使用`midway.js`来开发新的业务，这都是基于前面的`egg.js`的团队掌握程度，为了后续的开发规范，做此升级；
3. 内网管理公用npm包，开发业务组件库；
4. 规范代码、规范开发流程；

## 人员招聘，团队的管理

### 人员招聘

如下是对于当时的人员招聘的一些感受：

1. 小公司的人员招聘是相对比较难的，特别是还给不了多少钱的；
2. 好在我们选择的技术方案，只要对于JS掌握的比较好就可以了，前后端都要开发一点，也方便人员工作调整，避免开发资源的浪费；

### 团队管理

对于小团队的管理的一些个人理解：

1. 小公司刚起步，就应该实事求是，以业务为导向；
2. 小公司最好采取全栈的开发方式，避免任务的不协调，造成开发资源的浪费；
3. 设置推荐的代码规范，参照大家日常的代码习惯来制定，目标就是让大家的代码相对规范；
4. 要求按照规范的流程设计与开发、避免一些流程的问题造成管理的混乱和公司的损失；
   1. 如按照常规的业务开发流程，产品评估 => 任务分配 => 技术评估 => 开发 => 测试 => cr => 上线 => 线上问题跟踪处理；
5. 行之有效可量化的考核规范，如开发任务的截止日期完成、核心流程开发文档的书写、是否有线上bug、严谨手动修改数据库等；
6. 鼓励分享，相互学习，一段工作经历总要有所提升，有所收获才是有意义的；
7. 及时沟通反馈、团队成员的个人想法、掌握开发进度、工作难点等；

## 最后总结及选择创业公司避坑建议!important

1. 选择创业公司，一定要确认老板是一个靠谱的人，别是一个总是画饼的油腻老司机，或者一个优柔寡断，没有主见的人，这样的情况下，大概率事情是干不成的；
   1. 老板靠谱，即使当前的项目搞不成，也可能未来在别的地方做出一番事情；
2. 初了上边这个，最核心的就是，怎么样赚钱，现在这种融资环境，如果自己不能赚钱，大概率是活不下去的@自己；
3. 抓住核心矛盾，解决主要问题，业务永远是最重要的。至于说选择的开发技术、代码规范等等这些都可以往后放；
4. 对上要及时反馈自己的工作进度，保持好沟通，老板总是站在更高一层考虑问题，肯定会有一些不一样的想法，别总自以为什么什么的；
5. 每段经历最好都能有所收获，人生的每一步都有意义；

以上只是个人见解，请指教，[个人blog](https://github.com/qiuwww/blog)。
