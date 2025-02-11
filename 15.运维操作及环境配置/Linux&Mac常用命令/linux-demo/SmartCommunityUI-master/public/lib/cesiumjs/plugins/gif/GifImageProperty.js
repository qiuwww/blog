(function (window) {

    /**
     * 使用示例：
       var position = Cesium.Cartesian3.fromDegrees(
            116.39140 + Math.random(), 39.9031 + Math.random(), 0
        );
        viewer.entities.add({
            position: position,
            billboard: {
                image: new mars3d.GifImageProperty({
                    url: 'img/marker/emergency.gif'
                }),
            }
        });
     */
    function GifImageProperty(options) {
        this._url = null;
        this._lastFrameTime = null;
        this._frames = null;

        this._gifCanvas = document.createElement('canvas');
        this._gifCanvas.width = 1;
        this._gifCanvas.height = 1;
        this._gifCtx = null;
        this._frameIndex = -1;
        this._gif = null;

        if (options.url) {
            this.url = options.url;
        }
    }
    Object.defineProperties(GifImageProperty.prototype, {
        url: {
            get: function () {
                return this._url;
            },
            set: function (val) {
                this._url = val;
                if (this._url) {
                    var that = this;
                    Cesium.Resource.fetchArrayBuffer({ url: this._url }).then(function (buff) {
                        that._gif = new gifuct(buff);//通过gifuct-js库去读取gif文件
                        that._frames = that._gif.decompressFrames(true);
                        that._frameIndex = -1;
                        that._lastFrameTime = null;
                        if (!that._gifCanvas) {
                            that._gifCanvas = document.createElement('canvas');
                        }
                        that._gifCanvas.width = that._frames[0].dims.width;
                        that._gifCanvas.height = that._frames[0].dims.height;
                        that._gifCtx = that._gifCanvas.getContext('2d');
                        that._gifCtx.clearRect(0, 0, that._gifCanvas.width, that._gifCanvas.height);
                    })
                } else {
                    this._frames = null;
                    this._gif = null;
                }
            }
        }
    })
    /**
     *
     */
    GifImageProperty.prototype.destroy = function () {
        this._frames = null;
        this._gif = null;
    }
    /**
     *
     * @param {any} frame
     * @private
     */
    GifImageProperty.prototype.renderFrame = function (frame) {
        if (frame.canvas) {
            this._gifCanvas = frame.canvas;
            return;
        }
        frame.canvas = document.createElement("canvas");
        var x = Cesium.defaultValue(frame.dims.left, 0),
            y = Cesium.defaultValue(frame.dims.top, 0);
        var w = Cesium.defaultValue(frame.dims.width, this._gifCanvas.width),
            h = Cesium.defaultValue(frame.dims.height, this._gifCanvas.height);
        frame.canvas.width = w;
        frame.canvas.height = h;
        if (x == 0 && y == 0 && w == this._gifCanvas.width
            && h == this._gifCanvas.height) {
            var imgData = this._gifCtx.getImageData(0, 0, w, h)
            imgData.data.set(frame.patch);
            this._gifCtx.putImageData(imgData, 0, 0);
        } else {
            var tempCv;
            if (this._tempCv) {
                tempCv = this._tempCv;
            } else {
                tempCv = document.createElement("canvas");
            }
            tempCv.width = w;
            tempCv.height = h;
            var tempCtx = tempCv.getContext('2d');
            var tempImgData = tempCtx.createImageData(w, h);
            tempImgData.data.set(frame.patch);
            tempCtx.putImageData(tempImgData, 0, 0);
            this._gifCtx.drawImage(tempCv, x, y, w, h);

        }

        var currCtx = frame.canvas.getContext("2d")
        var currImgData = currCtx.createImageData(w, h);
        currImgData.data.set(
            this._gifCtx.getImageData(0, 0, w, h).data
        );
        currCtx.putImageData(currImgData, 0, 0);
        this._gifCanvas = frame.canvas;
    }
    /**
     *
     * @param {any} time
     */
    GifImageProperty.prototype.getValue = function (time) {
        if (!this._frames || !this._frames.length) {
            return this._gifCanvas;
        }
        this._currentTime = new Date();
        if (!this._lastFrameTime) {
            this._lastFrameTime = new Date();
        }
        var deltTime = this._currentTime - this._lastFrameTime;

        if (this._frameIndex >= 0) {

            if (this._frameIndex < this._frames.length) {

                if (this._frames[this._frameIndex].delay <= deltTime) {

                    this.renderFrame(this._frames[this._frameIndex]);
                    this._lastFrameTime = this._currentTime;
                    this._frameIndex++;
                }
            } else {
                this._frameIndex = 0;
            }
        } else {
            this._lastFrameTime = this._currentTime
            this._frameIndex = 0;
        }

        return this._gifCanvas;
    }

    mars3d.GifImageProperty = GifImageProperty;

})(window)
