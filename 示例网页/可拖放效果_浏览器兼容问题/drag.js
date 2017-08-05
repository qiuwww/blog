var drag = function(target, event)
{
	// 定义开始拖动时的鼠标位置（相对window座标）
	var startX = event.clientX;//clientX 设置或获取鼠标指针位置相对于窗口客户区域的 x 坐标，
	                           //其中客户区域不包括窗口自身的控件和滚动条。
	var startY = event.clientY;
	// 定义将要被拖动元素的位置（相对于document座标）
	// 因为该target的position为absolutely，
	// 所以我们认为它的座标系是基于document的
	//obj.offsetTop 指 obj 相对于版面或由 offsetParent 属性指定的父坐标的计算上侧位置，整型，单位像素。
	var origX = target.offsetLeft;
	var origY = target.offsetTop;
	// 因为后面根据event的clientX、clientY来获取鼠标位置时，
	// 只能获取windows座标系的位置，所以需要计算window座标系
	// 和document座标系的偏移。
	// 计算windows座标系和document座标系之间的偏移
	var deltaX = startX - origX;
	var deltaY = startY - origY;


	// 鼠标松开的事件处理器
	var upHandler = function(evt) 
	{
		// 对于IE事件模型，获取事件对象
		if (!evt) 
			evt = window.event; 
		// 取消被拖动对象的鼠标移动（mousemove）和鼠标松开（mouseup）的事件处理器
		if (document.removeEventListener)
		{
			// DOM事件模型
			// 取消在事件捕获阶段的事件处理器
			//true - 在捕获阶段移除事件句柄   false- 默认。在冒泡阶段移除事件句柄
			document.removeEventListener("mouseup", upHandler, true);
			document.removeEventListener("mousemove", moveHandler, true);
		}
		else if (document.detachEvent) 
		{  //detachEvent方法可以在网页内删除一个已注册好的事件．
			target.detachEvent("onlosecapture", upHandler);
			target.detachEvent("onmouseup", upHandler);
			target.detachEvent("onmousemove", moveHandler);
			target.releaseCapture( );
		}
		// 阻止事件传播
		stopProp(evt);
	}
	// 阻止事件传播(该函数可以跨浏览器)
	var stopProp = function(evt)
	{
		// DOM事件模型  不再派发事件。终止事件在传播过程的捕获、目标处理或起泡阶段进一步传播。
		if (evt.stopPropagation)
		{
			evt.stopPropagation( );
		}
		// IE事件模型
		else
		{
			evt.cancelBubble = true;
		}
	}
	// 为被拖动对象的鼠标移动（mousemove）和鼠标松开（mouseup）注册事件处理器
	if (document.addEventListener)
	{
		// DOM事件模型
		// 在事件捕获阶段绑定事件处理器
		document.addEventListener("mousemove", moveHandler, true);
		document.addEventListener("mouseup", upHandler, true);
	}
	else if (document.attachEvent) 
	{
		// IE事件模型
		// 设置该元素直接捕获该事件
		target.setCapture();
		// 为该元素鼠标移动时绑定事件处理器
		target.attachEvent("onmousemove", moveHandler);
		// 为鼠标松开时绑定事件处理器
		target.attachEvent("onmouseup", upHandler);
		// 将失去捕获事件当成鼠标松开处理。
		target.attachEvent("onlosecapture", upHandler);
	}
	// 阻止事件传播
	stopProp(event);
	// 取消事件默认行为
	if (event.preventDefault)
	{
		// DOM事件模型
		event.preventDefault( ); 
	}
	else
	{
		// IE事件模型
		event.returnValue = false;
	}
	
	// 鼠标移动的事件处理器
    function moveHandler(evt)
	{
		// 对于IE事件模型，/*获取事件对象*/
		if (!evt) evt = window.event; 
		// 将被拖动元素的位置移动到当前鼠标位置。
		// 先将window座标系位置转换成document座标系位置，再修改目标对象的CSS位置。
		target.style.left = (evt.clientX - deltaX) + "px";
		target.style.top = (evt.clientY - deltaY) + "px";
		// 阻止事件传播
		stopProp(evt);
	}
}