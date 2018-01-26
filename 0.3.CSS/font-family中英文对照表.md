HTML，CSS，font-family：中文字体的英文名称 （宋体 微软雅黑） In 前端  @2012-09-13 367,198 Vs
宋体	SimSun
黑体	SimHei
微软雅黑	Microsoft YaHei
微软正黑体	Microsoft JhengHei
新宋体	NSimSun
新细明体	PMingLiU
细明体	MingLiU
标楷体	DFKai-SB
仿宋	FangSong
楷体	KaiTi
仿宋_GB2312	FangSong_GB2312
楷体_GB2312	KaiTi_GB2312

宋体：SimSuncss中中文字体（font-family）的英文名称
Mac OS的一些：
华文细黑：STHeiti Light [STXihei]
华文黑体：STHeiti
华文楷体：STKaiti
华文宋体：STSong
华文仿宋：STFangsong
儷黑 Pro：LiHei Pro Medium
儷宋 Pro：LiSong Pro Light
標楷體：BiauKai
蘋果儷中黑：Apple LiGothic Medium
蘋果儷細宋：Apple LiSung Light
Windows的一些：
新細明體：PMingLiU
細明體：MingLiU
標楷體：DFKai-SB
黑体：SimHei
新宋体：NSimSun
仿宋：FangSong
楷体：KaiTi
仿宋_GB2312：FangSong_GB2312
楷体_GB2312：KaiTi_GB2312
微軟正黑體：Microsoft JhengHei
微软雅黑体：Microsoft YaHei
装Office会生出来的一些：
隶书：LiSu
幼圆：YouYuan
华文细黑：STXihei
华文楷体：STKaiti
华文宋体：STSong
华文中宋：STZhongsong
华文仿宋：STFangsong
方正舒体：FZShuTi
方正姚体：FZYaoti
华文彩云：STCaiyun
华文琥珀：STHupo
华文隶书：STLiti
华文行楷：STXingkai
华文新魏：STXinwei
Windows 中的中文字体。
在默认情况下，也就是未自行安装新字体或者 Office 等文字处理软件的情况下，Windows 默认提供下列字体：
Windows 95/98/98SE 宋体、黑体、楷体_GB2312、仿宋_GB2312
Windows XP/2000/2003/ME/NT 宋体/新宋体、黑体、楷体_GB2312、仿宋_GB2312 (Windows XP SP3 宋体-PUA)
Windows Vista/7/2008 宋体/新宋体、黑体、楷体、仿宋、微软雅黑、SimSun-ExtB
那么每种字体能显示那些汉字呢？
Vista 之前的 Windows 中宋体/新宋体、黑体支持 GBK 1.0 字符集，
楷体_GB2312、仿宋_GB2312 支持 GB2312-80 字符集。
（注：Windows 3.X 只能支持 GB2312-80 字符集）
Vista 及之后的 Windows 中宋体/新宋体、黑体、楷体、仿宋、微软雅黑支持 GB18030-2000 字符集，
SimSun-ExtB 只支持 GB18030-2005 字符集扩展 B 部分。
下面对字符集进行简单的介绍：
GB2312-80 < GBK 1.0 < GB18030-2000 < GB18030-2005
GB2312-80 中的字符数量最少，GB18030-2005 字符数量最多。
GB2312-80 是最早的版本，字符数比较少；
GBK 1.0 中的汉字大致与 Unicode 1.1 中的汉字数量相同；
GB18030-2000 中的汉字大致与 Unicode 3.0 中的汉字数量相同，主要增加了扩展 A 部分；
GB18030-2005 中的汉字大致与 Unicode 4.1 中的汉字数量相同，主要增加了扩展 B 部分；
由于 Unicode 5.2 的发布，估计 GB18030 会在近期发布新版本，增加扩展 C 部分。
需要说明的是在 GB18030 中扩展 B 部分并不是强制标准。
如果想查看 GB18030 的标准文本，请访问 http://www.gb168.cn 中的强标阅读。
如果想了解 Unicode 的内容，请访问 http://www.unicode.org。
现在纠正网上普遍的一个错误：
GB18030-2000 和 GB18030-2005 都不支持单字节的欧元符号
与简体中文有关的代吗页如下：
936 gb2312 简体中文(GB2312)————其实是GBK
10008 x-mac-chinesesimp 简体中文(Mac)
20936 x-cp20936 简体中文(GB2312-80)
50227 x-cp50227 简体中文(ISO-2022)
51936 EUC-CN 简体中文(EUC)
52936 hz-gb-2312 简体中文(HZ)
54936 GB18030 简体中文(GB18030)
补充：
使用楷体_GB2312、仿宋_GB2312后，在 Windows 7/Vista/2008 中可能不再显示为对应的字体。
这是因为 Windows 7/Vista/2008 中有楷体、仿宋，默认情况下没有楷体_GB2312、仿宋_GB2312，字体名称相差“_GB2312”。