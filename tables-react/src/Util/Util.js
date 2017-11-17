const Util = {
    distance: function(point1, point2) {
        let a = Math.abs(point1.x - point2.x);
        let b = Math.abs(point1.y - point2.y);
        return Math.sqrt(a*a + b*b);
    },
    getMaxMin: function(start, end) {
        return {
            minX: Math.min(start.x, end.x),
            maxX: Math.max(start.x, end.x),
            minY: Math.min(start.y, end.y),
            maxY: Math.max(start.y, end.y)
        }
    },
    drawEllipse: function (ctx, x, y, a, b, fillStyle, strokeStyle){
        ctx.save();
        // 选择a、b中的较大者作为arc方法的半径参数
        var r = (a > b) ? a : b;
        var ratioX = a / r; // 横轴缩放比率
        var ratioY = b / r; // 纵轴缩放比率
        ctx.scale(ratioX, ratioY); // 进行缩放（均匀压缩）
        ctx.beginPath();
        // 从椭圆的左端点开始逆时针绘制
        ctx.moveTo((x + a) / ratioX, y / ratioY);
        ctx.arc(x / ratioX, y / ratioY, r, 0, 2 * Math.PI);
        if (fillStyle) {
            ctx.fillStyle = fillStyle;
            ctx.fill();
        }
        ctx.closePath();
        if (strokeStyle) ctx.strokeStyle = strokeStyle;
        ctx.stroke();
        ctx.restore();
    },
    drawArrow: function(ctx, fromX, fromY, toX, toY, color, theta, headlen, width) { 
        theta = typeof (theta) !== 'undefined' ? theta : 30;
        headlen = typeof (headlen) !== 'undefined' ? headlen : 10;
        width = typeof (width) !== 'undefined' ? width : 1;
        color = typeof (color) !== 'color' ? color : '#000';
        // 计算各角度和对应的P2,P3坐标
        var angle = Math.atan2(fromY - toY, fromX - toX) * 180 / Math.PI,
        angle1 = (angle + theta) * Math.PI / 180,
        angle2 = (angle - theta) * Math.PI / 180,
        topX = headlen * Math.cos(angle1),
        topY = headlen * Math.sin(angle1),
        botX = headlen * Math.cos(angle2),
        botY = headlen * Math.sin(angle2);
        ctx.save();
        ctx.beginPath();
        var arrowX = fromX - topX,
        arrowY = fromY - topY;
        ctx.moveTo(arrowX, arrowY);
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        arrowX = toX + topX;
        arrowY = toY + topY;
        ctx.moveTo(arrowX, arrowY);
        ctx.lineTo(toX, toY);
        arrowX = toX + botX;
        arrowY = toY + botY;
        ctx.lineTo(arrowX, arrowY);
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.stroke();
        ctx.restore();
    },
    fontHeightCache: {},
    fontWidthCache: {},
    getFontHeight(font) {
        if (this.fontHeightCache[font]) return this.fontHeightCache[font];
        let div = document.createElement('div');
        div.style.height = '1px';
        div.style.width = '10000px';
        div.style.font = font;
        div.style.overflow = 'hidden';
        div.innerHTML = '字体高度';
        document.body.appendChild(div);
        this.fontHeightCache[font] = div.scrollHeight;
        div.parentNode.removeChild(div);
        return this.fontHeightCache[font];
    },
    getFontWidth(font) {
        // 当前先采用默认无值
    }
};

export default Util;
