
# win7 常用快捷键
### https://jingyan.baidu.com/article/eb9f7b6da41ccb869364e839.html

`
  Ctrl+C 复制 Ctrl+X 剪切 Ctrl+V 粘贴

  Ctrl+A 全选
  Ctrl+S 保存

  Ctrl+N 新建
  Ctrl+O 打开

  Ctrl+Z 撤销 

  Ctrl+W 关闭程序    Ctrl+Shift+T 打开刚才关闭的标签页 
  Ctrl+Tab    窗口切换
  Shift+Delete彻底删除
  `

  `
   Win+L    锁定系统
   Win+M     最小化所有窗口当按下后当前所有窗口全都最小化。再次按下这个组合键没反应(用WIN + Shift + M 还原刚才最小化的窗口)。外号“老板键”，老板来了，赶快使用。Win+D也可以，当按下后当前所有窗口全都最小化。再次按下这个组合键恢复刚才最小化的窗口。
   win +Tab     3D效果显示切换窗口
   Win+E     打开资源管理器
   ctrl+alt+Esc    任务管理器
   Alt+F4     关闭当前窗口
   Win+R      打开运行命令框

   `



#控制台命令窗口中一些技巧

**复制内容**：右键弹出快捷菜单，选择“标记(K)”，然后选中所需复制的内容，然后**右键即可**;

**粘贴内容**：右键弹出快捷菜单，选择“粘贴(P)”





##2. 文件/目录

**cd   **切换目录

例：cd   // 显示当前目录

**例：cd ..   // 进入父目录**

例：cd /d d:   // 进入上次d盘所在的目录（或在直接输入：d:）

例：cd /d d:\   // 进入d盘根目录

例：cd d: // 显示上次d盘所在的目录

例：cd /d d:\src // 进入d:\src目录

例：cd prj\src\view  // 进入当前目录下的prj\src\view文件夹

**pushd  popd**  使用栈来维护当前目录

md d:\mp3 // 在C:\建立mp3文件夹
md d:\mp4 // 在D:\建立mp4文件夹
cd /d d:\mp4 // 更改当前目录为d:\mp4
pushd c:\mp3 // 将当前目录d:\mp4入栈，并切换当前目录为c:\mp3
popd  // 将刚才保存的d:\mp4弹栈，并设置为当前目录

**dir**  显示目录中的内容

**例：dir   // 显示当前目录中的子文件夹与文件**

例：dir /b  // 只显示当前目录中的子文件夹与文件的文件名

例：dir /p  // 分页显示当前目录中的子文件夹与文件

例：dir /ad  // 显示当前目录中的子文件夹

例：dir /a-d  // 显示当前目录中的文件

例：dir c:\test   // 显示c:\test目录中的内容

例：dir keys.txt  // 显示当前目录中keys.txt的信息

例：dir /S   // 递归显示当前目录中的内容

例：dir key*  // 显示当前目录下以key开头的文件和文件夹的信息

例：dir /AH /OS  // 只显示当前目录中隐藏的文件和目录，并按照文件大小从小到大排序

**tree** 显示目录结构

**例：tree d:\myfiles  // 显示d:\myfiles目录结构**

**ren**  文件或目录重命名

**例：ren rec.txt rec.ini  // 将当前目录下的rec.txt文件重命名为rec.ini**

**例：ren c:\test test_01  // 将c盘下的test文件夹重命名为test_01**

例：ren Logs.txt Logs-%date:~0,4%%date:~5,2%%date:~8,2%_%time:~0,2%%time:~3,2%.txt  // 将当前目录下的Logs.txt文件重命名为Logs-20150114_2135.txt或Logs-20150114_ 812.txt（注意：小时只有个位数时会多一个空格，可以使用字符串替换：将空格替换成0）

**md**  创建目录

**例：md movie music  // 在当前目录中创建名为movie和music的文件夹**

**例：md d:\test\movie  // 创建d:\test\movie目录**

**rd**  删除目录

**例：rd movie // 删除当前目录下的movie空文件夹**

例：rd /s /q d:\test  // 使用安静模式删除d:\test（除目录本身外，还将删除指定目录下的所有子目录和文件）

**copy** 拷贝文件

**例：copy key.txt c:\doc  // 将当前目录下的key.txt拷贝到c:\doc下（若doc中也存在一个key.txt文件，会询问是否覆盖）**

例：copy jobs c:\doc  // 将当前目录下jobs文件夹中文件（不递归子目录）拷贝到c:\doc下（若doc中也存在相应的文件，会询问是否覆盖）

例：copy key.txt c:\doc\key_bak.txt  // 将当前目录下的key.txt拷贝到c:\doc下，并重命名为key_bak.txt（若doc中也存在一个key_bak.txt文件，会询问是否覆盖）

例：copy /Y key.txt c:\doc  // 将当前目录下的key.txt拷贝到c:\doc下（不询问，直接覆盖写）

例：copy key.txt +  // 复制文件到自己，实际上是修改了文件日期

例：copy /Y key1.txt + key2.txt key.txt  // 将当前目录下的key1.txt与key2.txt的内容合并写入key.txt中（不询问，直接覆盖写）

例：copy /B art_2.7z.* art_2.7z    // 将当前目录下的art_2.7z.开头的所有文件（按照名称升序排序）依次合并生成art_2.7z

例：copy /B art_2.7z.001+art_2.7z.002 art_2.7z    // 将当前目录下的art_2.7z.001、art_2.7z.002文件合并生成art_2.7z

**xcopy**  更强大的复制命令

例：xcopy c:\bat\hai d:\hello\ /y /h /e /f /c    // 将c:\bat\hai中的所有内容拷贝到d:\hello中  注意：需要在hello后加上\  表示hello为一个目录，否则xcopy会询问hello是F，还是D

例：xcopy c:\bat\hai d:\hello\ /d:12-29-2010  // 将c:\bat\hai中的2010年12月29日后更改的文件拷贝到d:\hello中

**move** 移动文件

**例：move *.png test  // 将当前目录下的png图片移动到当前目录下test文件夹中 （若test中也存在同名的png图片，会询问是否覆盖）**

例：move /Y *.png test  // 将当前目录下的png图片移动到当前目录下test文件夹中 （不询问，直接覆盖写）

例：move 1.png d:\test\2.png  // 将当前目录下的1.png移动到d盘test文件夹中，并重命名为2.png （若test中也存在同名的png图片，会询问是否覆盖）

例：move test d:\new  // 若d盘中存在new文件夹，将当前目录下的test文件夹移动到d盘new文件夹中；若不存在，将当前目录下的test文件夹移动到d盘，并重命名为new

**del** 删除文件   注意：目录及子目录都不会删除

**例：del test  // 删除当前目录下的test文件夹中的所有非只读文件（子目录下的文件不删除；删除前会进行确认；等价于del test\*）**

例：del /f test  // 删除当前目录下的test文件夹中的所有文件（含只读文件；子目录下的文件不删除；删除前会进行确认；等价于del /f test\*）

例：del /f /s /q test d:\test2\*.doc  // 删除当前目录下的test文件夹中所有文件及d:\test2中所有doc文件（含只读文件；递归子目录下的文件；删除前不确认）

++++++++++++++++++++++

/ar、/ah、/as、/aa 分别表示删除只读、隐藏、系统、存档文件
/a-r、/a-h、/a-s、/a-a 分别表示删除除只读、隐藏、系统、存档以外的文件

++++++++++++++++++++++

例：del /ar *.* // 删除当前目录下所有只读文件

例：del /a-s *.* // 删除当前目录下除系统文件以外的所有文件

**replace** 替换文件【即使这个文件在使用，仍然可以替换成功】

例：replace d:\love.mp3 d:\mp3   // 使用d盘下的love.mp3强制替换d盘mp3目录中的love.mp3文件

**mklink**  创建符号链接（win7引入）；创建的符号链接文件上会有一个类似快捷方式的箭头

win7下的mklink命令通过指定参数可以建立出不同形式的文件或目录链接，分为硬链接(hard link)、符号链接(symbolic link)和目录联接(junction)三种。

(1) 符号链接(symbolic link)

　建立一个软链接相当于建立一个文件（或目录），这个文件（或目录）用于指向别的文件（或目录），和win的快捷方式有些类似。

  删除这个链接，对原来的文件（或目录）没有影像没有任何影响；而当你删除原文件（或目录）时，再打开链接则会提示“位置不可用”。

(2) 目录联接(junction)

　作用基本和符号链接类似。区别在于，目录联接在建立时会自动引用原目录的绝对路径，而符号链接允许相对路径的引用。

(3) 硬链接(hard link)

　建立一个硬链接相当于给文件建立了一个别名，例如对1.txt创建了名字为2.txt的硬链接；

  若使用记事本对1.txt进行修改，则2.txt也同时被修改，若删除1.txt，则2.txt依然存在，且内容与1.txt一样。

建立链接请注意：
a、建立文件或目录链接限于 NTFS 文件系统；符号链接（目录联接）的建立可以跨分区（如：在d盘可以建立c盘文件或目录的链接），硬链接只能建立同一分区内的文件指向
b、硬链接只能用于文件，不能用于目录；目录联接只能用于目录；符号链接则均可以；
c、硬链接不允许对空文件建立链接，符号（软）链接可以。

+++++++++++++++++++++++++++++++++

mklink [[/d] | [/h] | [/j]] Link Target

/d　　 创建目录符号链接。黙认为文件符号链接。
/h　　 创建硬链接，而不是符号链接。
/j　　　创建目录联接。
Link　　指定新的符号链接名称。
Target　指定新链接引用的路径(相对或绝对)。

+++++++++++++++++++++++++++++++++

例：mklink /j "C:\Users" "D:\Users"   // 创建D盘Users目录联接到C盘，并命名为Users

**attrib**  查看或修改文件或目录的属性  【A：存档  R：只读  S：系统  H：隐藏】

例：attrib 1.txt   // 查看当前目录下1.txt的属性

例：attrib -R 1.txt  // 去掉1.txt的只读属性

例：attrib +H movie  // 隐藏movie文件夹

**assoc** 设置'文件扩展名'关联到的'文件类型'

例：assoc // 显示所有'文件扩展名'关联

例：assoc .txt // 显示.txt代表的'文件类型'，结果显示.txt=txtfile

例：assoc .doc // 显示.doc代表的'文件类型'，结果显示.doc=Word.Document.8

例：assoc .exe // 显示.exe代表的'文件类型'，结果显示.exe=exefile

例：assoc .txt=txtfile  // 恢复.txt的正确关联

**ftype** 设置'文件类型'关联到的'执行程序和参数'

例：ftype // 显示所有'文件类型'关联

例：ftype exefile // 显示exefile类型关联的命令行，结果显示 exefile="%1" %*

例：ftype txtfile=C:\Windows\notepad.exe %1 // 设置txtfile类型关联的命令行为：C:\Windows\notepad.exe %1

当双击一个.txt文件时，windows并不是根据.txt直接判断用notepad.exe打开
而是先判断.txt属于txtfile'文件类型'；再调用txtfile关联的命令行：txtfile=%SystemRoot%\system32\NOTEPAD.EXE %1

**forfiles **递归目录执行命令

例：forfiles /p . /m .svn /s /c "cmd /c svn up -r12005" // 在当前目录下查找含有.svn的文件或目录（递归子目录），并对该目录执行指定版本号svn更新

例：forfiles /p c:\myfiles /m .svn /s /c "cmd /c svn up -r12005" // 在c:\myfiles目录下查找含有.svn的文件或目录（递归子目录），并对该目录执行指定版本号svn更新



##3. 文件查看

**type** 显示文本文件内容

**例：type c:\11.txt   // 显示c盘中11.txt的文本内容**

例：type conf.ini  // 显示当前目录下conf.ini的文本内容

例：type c:\11.txt | more  // 分页显示c盘中11.txt的文本内容

**more** 逐屏的显示文本文件内容

例：more conf.ini  //  逐屏的显示当前目录下conf.ini的文本内容   【空格：下一屏 q：退出 】



##5.@#@

**&  顺序执行多条命令，而不管命令是否执行成功**

例：cd /d d:\src&work.exe /o c:\result.txt  // 先将当前工作目录切换到d:\src下，然后执行work.exe /o c:\result.txt命令

**&&  顺序执行多条命令，当碰到执行出错的命令后将不执行后面的命令**

例：find "ok" c:\test.txt && echo 成功 // 如果找到了"ok"字样，就显示"成功"，找不到就不显示

**||   顺序执行多条命令，当碰到执行正确的命令后将不执行后面的命令**

例：find "ok" c:\test.txt || echo 不成功   // 如果找不到"ok"字样，就显示"不成功"，找到了就不显示

**|    管道命令**

例：dir *.* /s/a | find /c ".exe"   // 先执行dir命令，然后对输出结果（stdout）执行find命令（输出当前文件夹及所有子文件夹里的.exe文件的个数）

例：dir *.* /s/a 2>&1 | find /c ".exe"   // 先执行dir命令，然后对输出结果（stdout）和错误信息（stderr）执行find命令（输出当前文件夹及所有子文件夹里的.exe文件的个数）



## echo

**echo.   **// 输出一个"回车换行"，空白行

**echo off**   // 后续所有命令在执行前，不打印出命令的内容

**echo on**   // 后续所有命令在执行前，打印出命令的内容

**echo 123**   // 输出123到终端屏幕

**echo "Hello World!!!"**   // 输出Hello World!!!到终端屏幕

**echo %errorlevel%**   // 每个命令运行结束，可以用这个命令行格式查看返回码；默认值为0，一般命令执行出错会设errorlevel为1

**echo test > p1.txt**  // 输出test的字符串到当前目录中的p1.txt文件中（以覆盖的方式）

**set**  // 显示当前用户所有的环境变量

**set path** // 查看path的环境变量值（准确的说是查看以path开头的环境变量）

**set path=**    // 清空path变量

**set path=d:\execute**  // 将path变量设置为d:\execute（注：修改的path只会影响当前回话，也不会存储到系统配置中去；当前cmd窗口关闭，新设置的path也就不存在了）

**set path=%path%;d:\execute**   // 在path变量中添加d:\execute（注：修改的path只会影响当前回话，也不会存储到系统配置中去；当前cmd窗口关闭，新设置的path也就不存在了）

**path** // 显示当前path变量的值

**path ;** // 清除所有搜索路径设置并指示cmd.exe只在当前目录中搜索

**path d:\xxx;%PATH%**  // 将d:\xxx路径添加到path中

\---------------------------------------------------

**set p=aa1bb1aa2bb2** // 设置变量p，并赋值为aa1bb1aa2bb2

**echo %p%** // 显示变量p代表的字符串，即aa1bb1aa2bb2

**echo %p:~6%** // 显示变量p中第6个字符以后的所有字符，即aa2bb2

**echo %p:~6,3%** // 显示第6个字符以后的3个字符，即aa2

**echo %p:~0,3%** // 显示前3个字符，即aa1

**echo %p:~-2%** // 显示最后面的2个字符，即b2

**echo %p:~0,-2%** // 显示除了最后2个字符以外的其它字符，即aa1bb1aa2b

**echo %p:aa=c%** // 用c替换变量p中所有的aa，即显示c1bb1c2bb2

**echo %p:aa=%** // 将变量p中的所有aa字符串置换为空，即显示1bb12bb2

**echo %p:\*bb=c%** // 第一个bb及其之前的所有字符被替换为c，即显示c1aa2bb2

**set p=%p:\*bb=c%** // 设置变量p，赋值为 %p:*bb=c% ，即c1aa2bb2

**set /a p=39** // 设置p为数值型变量，值为39

**set /a p=39/10** // 支持运算符，有小数时用去尾法，39/10=3.9，去尾得3，p=3

**set /a p=p/10** // 用 /a 参数时，在 = 后面的变量可以不加%直接引用

**set /a p="1&0"** // &运算要加引号。其它支持的运算符参见set/?





##  ## 常用查看

**cls**  清除屏幕

**ver**  显示当前windows系统的版本号

**winver**  弹框显示当前windows系统信息

**vol**  显示当前分区的卷标

**label**  显示当前分区的卷标，同时提示输入新卷标

**label c:system**  设置c盘的卷标为system

**time**  显示或设置当前时间

例：time /t  // 显示当前时间

例：time   // 设置新的当前时间（格式：hh:mm:ss），直接回车则表示放弃设置

**date**  显示或设置当前日期

例：date /t  // 显示当前日期

例：date   // 设置新的当前日期（格式：YYYY/MM/DD），直接回车则表示放弃设置

**title** 正在做命令行测试  // 修改当前cmd窗口的标题栏文字为正在做命令行测试

**prompt orz:**   // 将命令提示符修改为orz:

**print 1.txt**  // 使用设置好的打印机来打印1.txt文本文件

**call ff.bat**   // 调用执行ff.bat脚本（ff.bat脚本执行完原脚本才会往下执行）

**start**  运行某程序或命令

例：start /max notepad.exe  // 最大化的方式启动记事本

例：start /min calc.exe   // 最小化的方式启动计算器

例：start /min "" d:\Proxifier.exe   // 最小化的方式启动Proxifier代理工具

例：start  tasklist  // 启动一个cmd实例窗口，并运行tasklist

例：start explorer f:\  // 调用资源管理器打开f盘

例：strat iexplore "www.qq.com"  // 启动ie并打开www.qq.com网址

例：start ff.bat  // 启动开始执行ff.bat（启动ff.bat脚本后，原脚本继续执行，不会等ff.bat脚本执行完）

**exit**  退出当前cmd窗口实例

例：exit 0  // 退出当前cmd窗口实例，并将过程退出代码设置为0（0表示成功，非0表示失败）

例：exit /B 1  // 退出当前bat脚本，并将ERRORLEVEL系统变量设置为1

**pause**   暂停批处理程序，并显示出：请按任意键继续....

**color**  设置当前cmd窗口背景色和前景色（前景色即为字体的颜色）

例：color  // 恢复到缺省设置

例：color 02 // 将背景色设为黑色，将字体设为绿色

**date**  显示或设置当前日期

例：date /t  // 显示当前日期

例：date   // 设置新的当前日期（格式：YYYY/MM/DD），直接回车则表示放弃设置

**title** 正在做命令行测试  // 修改当前cmd窗口的标题栏文字为正在做命令行测试

**prompt orz:**   // 将命令提示符修改为orz:

**print 1.txt**  // 使用设置好的打印机来打印1.txt文本文件

**call ff.bat**   // 调用执行ff.bat脚本（ff.bat脚本执行完原脚本才会往下执行）

**start**  运行某程序或命令

例：start /max notepad.exe  // 最大化的方式启动记事本

例：start /min calc.exe   // 最小化的方式启动计算器

例：start /min "" d:\Proxifier.exe   // 最小化的方式启动Proxifier代理工具

例：start  tasklist  // 启动一个cmd实例窗口，并运行tasklist

例：start explorer f:\  // 调用资源管理器打开f盘

例：strat iexplore "www.qq.com"  // 启动ie并打开www.qq.com网址

例：start ff.bat  // 启动开始执行ff.bat（启动ff.bat脚本后，原脚本继续执行，不会等ff.bat脚本执行完）

**exit**  退出当前cmd窗口实例

例：exit 0  // 退出当前cmd窗口实例，并将过程退出代码设置为0（0表示成功，非0表示失败）

例：exit /B 1  // 退出当前bat脚本，并将ERRORLEVEL系统变量设置为1

**pause**   暂停批处理程序，并显示出：请按任意键继续....

color  设置当前cmd窗口背景色和前景色（前景色即为字体的颜色）**



**systeminfo**  查看当前计算机的综合信息

**systeminfo | findstr /i "初始安装日期 系统启动时间"**   只查看当前计算机的初始安装日期和系统启动时间

**wmic** 查看硬件的信息   -- C:\Windows\System32\wbem\WMIC.exe

例：wmic logicaldisk   // 查看计算机上各个盘的相关信息

例：wmic LogicalDisk where "Caption='C:'" get FreeSpace,Size /value   // 获取C盘的剩余空间大小与总大小（单位：Byte）

例：wmic os get Caption,InstallDate,OSArchitecture /value  // 获取当前os的Caption、安装日期以及系统架构信息

**wmic** 查看进程信息

例：wmic process where Caption="buyticket.exe" get commandline,ExecutablePath,ProcessId,ThreadCount /value // 查看名为"buyticket.exe"所有进程命令行，exe全路径，PID及线程数

例：wmic process where Caption="buyticket.exe" get ExecutablePath,HandleCount /value   // 查看名为"buyticket.exe"所有进程的exe全路径及当前打开的句柄数

例：wmic process where Caption="buyticket.exe" get ExecutablePath,VirtualSize,WorkingSetSize /value   // 查看名为"buyticket.exe"所有进程的exe全路径、当前虚拟地址空间占用及物理内存工作集

**logoff**  注销当前用户

**shutdown**  关闭、重启、注销、休眠计算机

例：shutdown /s  // 关闭计算机

例：shutdown /s /t 3600  // 一小时后，关闭本地计算机

例：shutdown /a  // 终止系统关闭

例：shutdown /r  // 关闭并重启本地计算机

例：shutdown /m 192.168.1.166 /r  // 关闭并重启ip为192.168.1.166的计算机



##8.网络操作

**ping**  // 用于检测网络是否通畅，以及网络时延情况（工作在ICMP协议上）

**例：ping baidu.com   //  测试与baidu服务器的连接情况**

例：ping chen-pc0   // 测试机器名为chen-pc0的连接情况

例：ping 220.181.111.86   // 测试与ip为220.181.111.86的连接情况

例：ping -l 65500 -n 10 qq.com   // 向qq.com发送10次65500字节的ping

例：ping -n 6 127.0.0.1 // 对当前主机执行6次ping操作（花费时间为5s）

例：ping -t baidu.com   // 不断地测试baidu服务器的连接情况   【Ctrl+Pause Break：查看ping的统计信息；Ctrl+C：终止当前任务】

a. 首先查本地arp cache信息，看是否有对方的mac地址和IP地址映射条目记录 
b. 如果没有，则发起一个arp请求广播包，等待对方告知具体的mac地址 
c. 收到arp响应包之后，获得某个IP对应的具体mac地址，有了物理地址之后才可以开始通信了,同时对ip-mac地址做一个本地cache 
d. 发出icmp echo request包，收到icmp echo reply包

**ipconfig /all  // 查看本地ip地址等详细信息**

**ipconfig /displaydns**  // 显示本地dns缓存的内容

**ipconfig /flushdns**  // 清除本地dns缓存的内容

**nslookup www.cnblogs.com**  // 获取www.cnblogs.com的域名解析

服务器: gm-captiva.tencent.com//DNS服务器的主机名
Address: 10.6.18.41//DNS服务器IP

非权威应答:
名称: www.cnblogs.com//解析的域名URL
Address: 42.121.252.58//解析回的IP

**nslookup -d www.cnblogs.com  **// 打印出www.cnblogs.com的域名解析所有记录

**netstat -a**   // 查看开启了哪些端口

**netstat -n**  // 查看端口的网络连接情况

**netstat -v**   // 查看正在进行的工作

**netstat -p tcp**  // 查看tcp协议的使用情况

**tracert 182.140.167.44**  // 查看本机到达182.140.167.44的路由路径

**route print**  // 显示出IP路由

**telnet 182.140.167.44 8000**   // 探测182.140.167.44是否使用TCP协议监听8000端口（注意：telnet命令不支持UDP端口检测）

说明：如果端口关闭或者无法连接，则显示不能打开到主机的链接，链接失败；端口打开的情况下，链接成功，则进入telnet页面（全黑的），证明端口可用。

用于探测指定IP的端口号，只是telnet的一个基本功能；

远程登录到网络中的计算机，并以命令行的方式远程管理计算机才是telnet命令的强大之处。



##9. 文本处理 

**edit config.ini**  // 编辑config.ini文件（会进入edit字符编辑器；按alt，可以选择对应的菜单） win7 x64下没有该命令

**find**  文件中搜索字符串