# html页面生成word文档研究

1. 文字之类的可以使用blob类来处理，图片之类的转化为base64插入页面，也都是可以的
2. 现在要解决的主要问题是定位的问题


思路：
1. 先做好 word 的模板，然后导出 html 格式，然后 replace 需要填写的内容
2. office 是识别 html 的格式的，你直接把 html 格式后缀改成 docx 就可以，这个方法并不完美，其实导出为 xml 格式再 replace 也可以；

随便一个 html 改后缀肯定不行啊，先在 word 里面排好模板，需要填入的地方做标记，然后用 office 导出 html 或者 xml ，推荐 xml ，然后替换标记，其实这不是个好办法，相当于曲线救国，很容易出错，而且有图片什么的很麻烦，当时我也是很苦恼啊，七撞八撞搞得勉强能看，但是并不完美，第三方都找不到， wps 也不是也不能完美支持 office 吗，这样的需求我觉得还是很恶心的，尽量用 pdf 吧


xml->doc 这个思路是对的，但是 xml 的模板必须用 word 生成， word 是可以直接保存为 xml 的，然后这个 word xml 再另存为标准 doc 就 ok ，这个是格式损失最少的 
何况、、、这个 xml 编辑起来也不那么容易，不过能转换就很好了


A file with the DOCX file extension is a Microsoft Word Open XML Format Document file.

DOCX files are XML-based and can contain text, objects, styles, formatting, and images, all of which are stored as separate files and ultimately compacted in a single, ZIP-compressed DOCX file.

Microsoft started using DOCX files in Microsoft Word beginning in Word 2007. Earlier versions of Word use the DOC file extension.

自2007年起，微软开始使用docx这种文件格式，这是通过使用Office Open XML创建的。该格式是一种zip文件，其中包含XML、图形和其他数据格式的文本，可以使用专利保护的二进制格式转换为字节的序列。起初，人们认为这种格式将取代doc，但是这两种格式沿用至今。





关键的问题
1. 确认react导出pdf的问题；
2. 确认table布局相对于完全重写的方式，哪种方式更方便；