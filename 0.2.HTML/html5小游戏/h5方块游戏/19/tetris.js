/*
 * 本游戏基于HTML 5、JavaScript来完成。
 * 本游戏主要使用了canvas组件来绘制游戏界面，
 * 使用了Local Storage记录游戏状态
 *
 */
var TETRIS_ROWS = 20;
var TETRIS_COLS = 14;
var CELL_SIZE = 24;
// 没方块是0
var NO_BLOCK = 0;
var tetris_canvas;
var tetris_ctx;
// 记录当前积分
var curScore = 0;
// 记录当前速度
var curSpeed = 1;
// 记录曾经的最高积分
var maxScore = 0;
var curScoreEle , curSpeedEle , maxScoreEle;
var curTimer;
// 记录当前是否游戏中的旗标
var isPlaying = true;
// 记录正在下掉的四个方块
var currentFall;
// 该数组用于记录底下已经固定下来的方块。
var tetris_status = [];
for (var i = 0; i < TETRIS_ROWS ; i++ )
{
	tetris_status[i] = [];
	for (var j = 0; j < TETRIS_COLS ; j++ )
	{
		tetris_status[i][j] = NO_BLOCK;
	}
}
// 定义方块的颜色
colors = ["#fff", "#f00" , "#0f0" , "#00f"
	, "#c60" , "#f0f" , "#0ff" , "#609"];
// 定义几种可能出现的方块组合
var blockArr = [
	// 代表第一种可能出现的方块组合：Z
	[
		{x: TETRIS_COLS / 2 - 1 , y:0 , color:1},
		{x: TETRIS_COLS / 2 , y:0 ,color:1},
		{x: TETRIS_COLS / 2 , y:1 ,color:1},
		{x: TETRIS_COLS / 2 + 1 , y:1 , color:1}
	],
	// 代表第二种可能出现的方块组合：反Z
	[
		{x: TETRIS_COLS / 2 + 1 , y:0 , color:2},
		{x: TETRIS_COLS / 2 , y:0 , color:2},
		{x: TETRIS_COLS / 2 , y:1 , color:2},
		{x: TETRIS_COLS / 2 - 1 , y:1 , color:2}
	],
	// 代表第三种可能出现的方块组合： 田
	[
		{x: TETRIS_COLS / 2 - 1 , y:0 , color:3},
		{x: TETRIS_COLS / 2 , y:0 ,  color:3},
		{x: TETRIS_COLS / 2 - 1 , y:1 , color:3},
		{x: TETRIS_COLS / 2 , y:1 , color:3}
	],
	// 代表第四种可能出现的方块组合：L
	[
		{x: TETRIS_COLS / 2 - 1 , y:0 , color:4},
		{x: TETRIS_COLS / 2 - 1, y:1 , color:4},
		{x: TETRIS_COLS / 2 - 1 , y:2 , color:4},
		{x: TETRIS_COLS / 2 , y:2 , color:4}
	],
	// 代表第五种可能出现的方块组合：J
	[
		{x: TETRIS_COLS / 2  , y:0 , color:5},
		{x: TETRIS_COLS / 2 , y:1, color:5},
		{x: TETRIS_COLS / 2  , y:2, color:5},
		{x: TETRIS_COLS / 2 - 1, y:2, color:5}
	],
	// 代表第六种可能出现的方块组合 : 条
	[
		{x: TETRIS_COLS / 2 , y:0 , color:6},
		{x: TETRIS_COLS / 2 , y:1 , color:6},
		{x: TETRIS_COLS / 2 , y:2 , color:6},
		{x: TETRIS_COLS / 2 , y:3 , color:6}
	],
	// 代表第七种可能出现的方块组合 : ┵
	[
		{x: TETRIS_COLS / 2 , y:0 , color:7},
		{x: TETRIS_COLS / 2 - 1 , y:1 , color:7},
		{x: TETRIS_COLS / 2 , y:1 , color:7},
		{x: TETRIS_COLS / 2 + 1, y:1 , color:7}
	]
];
// 定义初始化正在下掉的方块
var initBlock = function()
{
	var rand = Math.floor(Math.random() * blockArr.length);
	// 随机生成正在下掉的方块
	currentFall = [
		{x: blockArr[rand][0].x , y: blockArr[rand][0].y
			, color: blockArr[rand][0].color},
		{x: blockArr[rand][1].x , y: blockArr[rand][1].y
			, color: blockArr[rand][1].color},
		{x: blockArr[rand][2].x , y: blockArr[rand][2].y
			, color: blockArr[rand][2].color},
		{x: blockArr[rand][3].x , y: blockArr[rand][3].y 
			, color: blockArr[rand][3].color}
	];
};
// 定义一个创建canvas组件的函数
var createCanvas = function(rows , cols , cellWidth, cellHeight)
{
	tetris_canvas = document.createElement("canvas");
	// 设置canvas组件的高度、宽度
	tetris_canvas.width = cols * cellWidth;
	tetris_canvas.height = rows * cellHeight;
	// 设置canvas组件的边框
	tetris_canvas.style.border = "1px solid black";
	// 获取canvas上的绘图API
	tetris_ctx = tetris_canvas.getContext('2d');
	// 开始创建路径  
	tetris_ctx.beginPath();
	// 绘制横向网络对应的路径
	for (var i = 1 ; i < TETRIS_ROWS ; i++)
	{
		tetris_ctx.moveTo(0 , i * CELL_SIZE);
		tetris_ctx.lineTo(TETRIS_COLS * CELL_SIZE , i * CELL_SIZE);
	}
	// 绘制竖向网络对应的路径
	for (var i = 1 ; i < TETRIS_COLS ; i++)
	{
		tetris_ctx.moveTo(i * CELL_SIZE , 0);
		tetris_ctx.lineTo(i * CELL_SIZE , TETRIS_ROWS * CELL_SIZE);
	}
	tetris_ctx.closePath(); 
	// 设置笔触颜色
	tetris_ctx.strokeStyle = "#aaa";
	// 设置线条粗细
	tetris_ctx.lineWidth = 0.3;
	// 绘制线条
	tetris_ctx.stroke();
}
// 绘制俄罗斯方块的状态
var drawBlock = function()
{
	for (var i = 0; i < TETRIS_ROWS ; i++ )
	{
		for (var j = 0; j < TETRIS_COLS ; j++ )
		{
			// 有方块的地方绘制颜色
			if(tetris_status[i][j] != NO_BLOCK)
			{
				// 设置填充颜色
				tetris_ctx.fillStyle = colors[tetris_status[i][j]];
				// 绘制矩形
				tetris_ctx.fillRect(j * CELL_SIZE + 1 
					, i * CELL_SIZE + 1, CELL_SIZE - 2 , CELL_SIZE - 2);
			}
			// 没有方块的地方绘制白色
			else
			{
				// 设置填充颜色
				tetris_ctx.fillStyle = 'white';
				// 绘制矩形
				tetris_ctx.fillRect(j * CELL_SIZE + 1 
					, i * CELL_SIZE + 1 , CELL_SIZE - 2 , CELL_SIZE - 2);
			}
		}
	}
}
// 当页面加载完成时，执行该函数里的代码。
window.onload = function()
{
	// 创建canvas组件
	createCanvas(TETRIS_ROWS , TETRIS_COLS , CELL_SIZE , CELL_SIZE);
	document.body.appendChild(tetris_canvas);
	curScoreEle = document.getElementById("curScoreEle");
	curSpeedEle = document.getElementById("curSpeedEle");
	maxScoreEle = document.getElementById("maxScoreEle");
	// 读取Local Storage里的tetris_status记录
	var tmpStatus = localStorage.getItem("tetris_status");
	tetris_status = tmpStatus == null ? tetris_status : JSON.parse(tmpStatus);
	// 把方块状态绘制出来
	drawBlock();
	// 读取Local Storage里的curScore记录
	curScore = localStorage.getItem("curScore");
	curScore = curScore == null ? 0 : parseInt(curScore);
	curScoreEle.innerHTML = curScore;
	// 读取Local Storage里的maxScore记录
	maxScore = localStorage.getItem("maxScore");
	maxScore = maxScore == null ? 0 : parseInt(maxScore);
	maxScoreEle.innerHTML = maxScore;
	// 读取Local Storage里的curSpeed记录
	curSpeed = localStorage.getItem("curSpeed");
	curSpeed = curSpeed == null ? 1 : parseInt(curSpeed);
	curSpeedEle.innerHTML = curSpeed;
	// 初始化正在下掉的方块
	initBlock();
	// 控制每隔固定时间执行一次向下”掉“
	curTimer = setInterval("moveDown();" ,  500 / curSpeed);
}
// 判断是否有一行已满
var lineFull = function()
{
	// 依次遍历每一行
	for (var i = 0; i < TETRIS_ROWS ; i++ )
	{
		var flag = true;
		// 遍历当前行的每个单元格
		for (var j = 0 ; j < TETRIS_COLS ; j++ )
		{
			if(tetris_status[i][j] == NO_BLOCK)
			{
				flag = false;
				break;
			}
		}
		// 如果当前行已全部有方块了
		if(flag)
		{
			// 将当前积分增加100
			curScoreEle.innerHTML = curScore+= 100;
			// 记录当前积分
			localStorage.setItem("curScore" , curScore);
			// 如果当前积分达到升级极限。
			if( curScore >= curSpeed * curSpeed * 500)
			{
				curSpeedEle.innerHTML = curSpeed += 1;
				// 使用Local Storage记录curSpeed。
				localStorage.setItem("curSpeed" , curSpeed);
				clearInterval(curTimer);
				curTimer = setInterval("moveDown();" ,  500 / curSpeed);
			}
			// 把当前行的所有方块下移一行。
			for (var k = i ; k > 0 ; k--)
			{
				for (var l = 0; l < TETRIS_COLS ; l++ )
				{
					tetris_status[k][l] =tetris_status[k-1][l];
				}
			}
			// 消除方块后，重新绘制一遍方块
			drawBlock();      //②
		}
	}
}
// 控制方块向下掉。
var moveDown = function()
{
	// 定义能否下掉的旗标
	var canDown = true;    //①
	// 遍历每个方块，判断是否能向下掉
	for (var i = 0 ; i < currentFall.length ; i++)
	{
		// 判断是否已经到“最底下”
		if(currentFall[i].y >= TETRIS_ROWS - 1)
		{
			canDown = false;
			break;
		}
		// 判断下一格是否“有方块”, 如果下一格有方块，不能向下掉
		if(tetris_status[currentFall[i].y + 1][currentFall[i].x] != NO_BLOCK)
		{
			canDown = false;
			break;
		}
	}
	// 如果能向下“掉”
	if(canDown)
	{
		// 将下移前的每个方块的背景色涂成白色
		for (var i = 0 ; i < currentFall.length ; i++)
		{
			var cur = currentFall[i];
			// 设置填充颜色
			tetris_ctx.fillStyle = 'white';
			// 绘制矩形
			tetris_ctx.fillRect(cur.x * CELL_SIZE + 1 
				, cur.y * CELL_SIZE + 1 , CELL_SIZE - 2 , CELL_SIZE - 2);
		}
		// 遍历每个方块, 控制每个方块的y坐标加1。
		// 也就是控制方块都下掉一格
		for (var i = 0 ; i < currentFall.length ; i++)
		{
			var cur = currentFall[i];
			cur.y ++;
		}
		// 将下移后的每个方块的背景色涂成该方块的颜色值
		for (var i = 0 ; i < currentFall.length ; i++)
		{
			var cur = currentFall[i];
			// 设置填充颜色
			tetris_ctx.fillStyle = colors[cur.color];
			// 绘制矩形
			tetris_ctx.fillRect(cur.x * CELL_SIZE + 1 
				, cur.y * CELL_SIZE + 1 , CELL_SIZE - 2 , CELL_SIZE - 2);
		}
	}
	// 不能向下掉
	else
	{
		// 遍历每个方块, 把每个方块的值记录到tetris_status数组中
		for (var i = 0 ; i < currentFall.length ; i++)
		{
			var cur = currentFall[i];
			// 如果有方块已经到最上面了，表明输了
			if(cur.y < 2)
			{
				// 清空Local Storage中的当前积分值、游戏状态、当前速度
				localStorage.removeItem("curScore");
				localStorage.removeItem("tetris_status");
				localStorage.removeItem("curSpeed");
				if(confirm("您已经输了！是否参数排名？"))
				{
					// 读取Local Storage里的maxScore记录
					maxScore = localStorage.getItem("maxScore");
					maxScore = maxScore == null ? 0 : maxScore ;
					// 如果当前积分大于localStorage中记录的最高积分
					if(curScore >= maxScore)
					{
						// 记录最高积分
						localStorage.setItem("maxScore" , curScore);
					}
				}
				// 游戏结束
				isPlaying = false;
				// 清除计时器
				clearInterval(curTimer);
				return;
			}
			// 把每个方块当前所在位置赋为当前方块的颜色值
			tetris_status[cur.y][cur.x] = cur.color;
		}
		// 判断是否有“可消除”的行
		lineFull();
		// 使用Local Storage记录俄罗斯方块的游戏状态
		localStorage.setItem("tetris_status" , JSON.stringify(tetris_status));
		// 开始一组新的方块。
		initBlock();
	}
}
// 定义左移方块的函数
var moveLeft = function()
{
	// 定义能否左移的旗标
	var canLeft = true;
	for (var i = 0 ; i < currentFall.length ; i++)
	{
		// 如果已经到了最左边，不能左移
		if(currentFall[i].x <= 0)
		{
			canLeft = false;
			break;
		}
		// 或左边的位置已有方块，不能左移
		if (tetris_status[currentFall[i].y][currentFall[i].x - 1] != NO_BLOCK)
		{
			canLeft = false;
			break;
		}
	}
	// 如果能左移
	if(canLeft)
	{
		// 将左移前的每个方块的背景色涂成白色
		for (var i = 0 ; i < currentFall.length ; i++)
		{
			var cur = currentFall[i];
			// 设置填充颜色
			tetris_ctx.fillStyle = 'white';
			// 绘制矩形
			tetris_ctx.fillRect(cur.x * CELL_SIZE +1 
				, cur.y * CELL_SIZE + 1 , CELL_SIZE - 2, CELL_SIZE - 2);
		}
		// 左移所有正在下掉的方块
		for (var i = 0 ; i < currentFall.length ; i++)
		{
			var cur = currentFall[i];
			cur.x --;
		}
		// 将左移后的每个方块的背景色涂成方块对应的颜色
		for (var i = 0 ; i < currentFall.length ; i++)
		{
			var cur = currentFall[i];
			// 设置填充颜色
			tetris_ctx.fillStyle = colors[cur.color];
			// 绘制矩形
			tetris_ctx.fillRect(cur.x * CELL_SIZE + 1  
				, cur.y * CELL_SIZE + 1, CELL_SIZE - 2 , CELL_SIZE - 2);
		}
	}
}
// 定义右移方块的函数
var moveRight = function()
{
	// 定义能否右移的旗标
	var canRight = true;
	for (var i = 0 ; i < currentFall.length ; i++)
	{
		// 如果已到了最右边，不能右移
		if(currentFall[i].x >= TETRIS_COLS - 1)
		{
			canRight = false;
			break;
		}
		// 如果右边的位置已有方块，不能右移
		if (tetris_status[currentFall[i].y][currentFall[i].x + 1] != NO_BLOCK)
		{
			canRight = false;
			break;
		}
	}
	// 如果能右移
	if(canRight)
	{		
		// 将右移前的每个方块的背景色涂成白色
		for (var i = 0 ; i < currentFall.length ; i++)
		{
			var cur = currentFall[i];
			// 设置填充颜色
			tetris_ctx.fillStyle = 'white';
			// 绘制矩形
			tetris_ctx.fillRect(cur.x * CELL_SIZE + 1  
				, cur.y * CELL_SIZE + 1 , CELL_SIZE - 2 , CELL_SIZE - 2);
		}
		// 右移所有正在下掉的方块
		for (var i = 0 ; i < currentFall.length ; i++)
		{
			var cur = currentFall[i];
			cur.x ++;
		}
		// 将右移后的每个方块的背景色涂成各方块对应的颜色
		for (var i = 0 ; i < currentFall.length ; i++)
		{
			var cur = currentFall[i];
			// 设置填充颜色
			tetris_ctx.fillStyle = colors[cur.color];
			// 绘制矩形
			tetris_ctx.fillRect(cur.x * CELL_SIZE + 1 
				, cur.y * CELL_SIZE + 1 , CELL_SIZE - 2, CELL_SIZE -2);
		}
	}
}
// 定义旋转方块的函数
var rotate = function()
{
	// 定义记录能否旋转的旗标
	var canRotate = true;
	for (var i = 0 ; i < currentFall.length ; i++)
	{
		var preX = currentFall[i].x;
		var preY = currentFall[i].y;
		// 始终以第三个方块作为旋转的中心,
		// i == 2时，说明是旋转的中心
		if(i != 2)
		{
			// 计算方块旋转后的x、y坐标
			var afterRotateX = currentFall[2].x + preY - currentFall[2].y;
			var afterRotateY = currentFall[2].y + currentFall[2].x - preX;
			// 如果旋转后所在位置已有方块，表明不能旋转
			if(tetris_status[afterRotateY][afterRotateX + 1] != NO_BLOCK)
			{
				canRotate = false;
				break;
			}
			// 如果旋转后的坐标已经超出了最左边边界
			if(afterRotateX < 0 || tetris_status[afterRotateY - 1][afterRotateX] != NO_BLOCK)
			{
				moveRight();
				afterRotateX = currentFall[2].x + preY - currentFall[2].y;
				afterRotateY = currentFall[2].y + currentFall[2].x - preX;
				break;
			}
			if(afterRotateX < 0 || tetris_status[afterRotateY-1][afterRotateX] != NO_BLOCK)
			{
				moveRight();
				break;
			}
			// 如果旋转后的坐标已经超出了最右边边界
			if(afterRotateX >= TETRIS_COLS - 1 || 
				tetris_status[afterRotateY][afterRotateX+1] != NO_BLOCK)
			{
				moveLeft();
				afterRotateX = currentFall[2].x + preY - currentFall[2].y;
				afterRotateY = currentFall[2].y + currentFall[2].x - preX;
				break;
			}
			if(afterRotateX >= TETRIS_COLS - 1 || 
				tetris_status[afterRotateY][afterRotateX+1] != NO_BLOCK)
			{
				moveLeft();
				break;
			}
		}
	}
	// 如果能旋转
	if(canRotate)
	{
		// 将旋转移前的每个方块的背景色涂成白色
		for (var i = 0 ; i < currentFall.length ; i++)
		{
			var cur = currentFall[i];
			// 设置填充颜色
			tetris_ctx.fillStyle = 'white';
			// 绘制矩形
			tetris_ctx.fillRect(cur.x * CELL_SIZE + 1  
				, cur.y * CELL_SIZE + 1 , CELL_SIZE - 2, CELL_SIZE - 2);
		}
		for (var i = 0 ; i < currentFall.length ; i++)
		{
			var preX = currentFall[i].x;
			var preY = currentFall[i].y;
			// 始终以第三个方块作为旋转的中心,
			// i == 2时，说明是旋转的中心
			if(i != 2)
			{
				currentFall[i].x = currentFall[2].x + 
					preY - currentFall[2].y;
				currentFall[i].y = currentFall[2].y + 
					currentFall[2].x - preX;
			}
		}
		// 将旋转后的每个方块的背景色涂成各方块对应的颜色
		for (var i = 0 ; i < currentFall.length ; i++)
		{
			var cur = currentFall[i];
			// 设置填充颜色
			tetris_ctx.fillStyle = colors[cur.color];
			// 绘制矩形
			tetris_ctx.fillRect(cur.x * CELL_SIZE + 1 
				, cur.y * CELL_SIZE + 1 , CELL_SIZE - 2, CELL_SIZE - 2);
		}
	}
}
window.focus();
// 为窗口的按键事件绑定事件监听器
window.onkeydown = function(evt)
{
	switch(evt.keyCode)
	{
		// 按下了“向下”箭头
		case 40:
			if(!isPlaying)
				return;
			moveDown();
			break;
		// 按下了“向左”箭头
		case 37:
			if(!isPlaying)
				return;
			moveLeft();
			break;
		// 按下了“向右”箭头
		case 39:
			if(!isPlaying)
				return;
			moveRight();
			break;
		// 按下了“向上”箭头
		case 38:
			if(!isPlaying)
				return;
			rotate();
			break;
	}
}