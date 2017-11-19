const ControlResize = {
    "0": function(point) {
        let {minX, minY, maxX, maxY} = this.getPoints(this.prevStart, this.prevEnd);
        let diffX = this.selectedPoint.x - point.x;
        let diffY = this.selectedPoint.y - point.y;
        minX = minX - diffX;
        minY = minY - diffY;
        // if (minX > (maxX - this.minWidth)) minX = maxX - this.minWidth;
        // if (minY > (maxY - this.minHeight)) minY = maxY - this.minHeight;
        return {
            minX: minX,
            minY: minY,
            maxX: maxX,
            maxY: maxY
        }
    },
    "1": function(point) {
        let {minX, minY, maxX, maxY} = this.getPoints(this.prevStart, this.prevEnd);
        let diffY = this.selectedPoint.y - point.y;
        minY = minY - diffY;
        // if (minY > (maxY - this.minHeight)) minY = maxY - this.minHeight;
        return {
            minX: minX,
            minY: minY,
            maxX: maxX,
            maxY: maxY
        }
    },
    "2": function(point) {
        let {minX, minY, maxX, maxY} = this.getPoints(this.prevStart, this.prevEnd);
        let diffX = this.selectedPoint.x - point.x;
        let diffY = this.selectedPoint.y - point.y;
        maxX = maxX - diffX;
        minY = minY - diffY;
        // if (minY > (maxY - this.minHeight)) minY = maxY - this.minHeight;
        return {
            minX: minX,
            minY: minY,
            maxX: maxX,
            maxY: maxY
        }
    },
    "3": function(point) {
        let {minX, minY, maxX, maxY} = this.getPoints(this.prevStart, this.prevEnd);
        let diffX = this.selectedPoint.x - point.x;
        maxX = maxX - diffX;
        return {
            minX: minX,
            minY: minY,
            maxX: maxX,
            maxY: maxY
        }
    },
    "4": function(point) {
        let {minX, minY, maxX, maxY} = this.getPoints(this.prevStart, this.prevEnd);
        let diffX = this.selectedPoint.x - point.x;
        let diffY = this.selectedPoint.y - point.y;
        maxX = maxX - diffX;
        maxY = maxY - diffY;
        return {
            minX: minX,
            minY: minY,
            maxX: maxX,
            maxY: maxY
        }
    },
    "5": function(point) {
        let {minX, minY, maxX, maxY} = this.getPoints(this.prevStart, this.prevEnd);
        let diffY = this.selectedPoint.y - point.y;
        maxY = maxY - diffY;
        return {
            minX: minX,
            minY: minY,
            maxX: maxX,
            maxY: maxY
        }
    },
    "6": function(point) {
        let {minX, minY, maxX, maxY} = this.getPoints(this.prevStart, this.prevEnd);
        let diffX = this.selectedPoint.x - point.x;
        let diffY = this.selectedPoint.y - point.y;
        minX = minX - diffX;
        maxY = maxY - diffY;
        return {
            minX: minX,
            minY: minY,
            maxX: maxX,
            maxY: maxY
        }
    },
    "7": function(point) {
        let {minX, minY, maxX, maxY} = this.getPoints(this.prevStart, this.prevEnd);
        let diffX = this.selectedPoint.x - point.x;
        minX = minX - diffX;
        // if (minX > (maxX - this.minWidth)) minX = maxX - this.minWidth;
        return {
            minX: minX,
            minY: minY,
            maxX: maxX,
            maxY: maxY
        }
    }
};

export default ControlResize;
