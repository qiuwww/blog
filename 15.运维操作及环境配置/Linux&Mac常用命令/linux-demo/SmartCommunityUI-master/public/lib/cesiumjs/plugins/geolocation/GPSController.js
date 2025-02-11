
/**
 * 
 * GPS Geolocation with device orientation in real-time
 */ 
(function () {

    var key = 'qObioeG8HeeQVrOVAGScPVhDzlmv6rL9';

    //window.BMap_loadScriptTime = (new Date).getTime();
    //document.write('<script type="text/javascript" src="http://api.map.baidu.com/getscript?v=2.0&ak=' + key + '&services=&t=' + window.BMap_loadScriptTime + '"></script>');

    document.write('<script type="text/javascript" src="http://api.map.baidu.com/getscript?v=2.0&ak=' + key + '&services="></script>');


    /**constructor function**/
    function GPSController(viewer,okCalback) {
        this.viewer = viewer;
        this.okCalback = okCalback;

        this._liveTrackingActivated = false;
        this._timer = undefined;
        this._timerMiliseconds = 350; // duration between clicks in ms
        this._savedAlpha = undefined;
        this._firstActivated = false;
        this._watchPos = false;
        this._touchHoldDuration = 500; // touch press duration in ms
        this._longPress = false;
        this.createGPSButton();
    }

    Object.defineProperties(GPSController.prototype, {
        liveTrackingActivated: {
            get: function () {
                return this._liveTrackingActivated;
            },
            set: function (value) {
                this._liveTrackingActivated = value;
            }
        },
        timer: {
            get: function () {
                return this._timer;
            },
            set: function (value) {
                this._timer = value;
            }
        },
        timerMiliseconds: {
            get: function () {
                return this._timerMiliseconds;
            },
            set: function (value) {
                this._timerMiliseconds = value;
            }
        },
        savedAlpha: {
            get: function () {
                return this._savedAlpha;
            },
            set: function (value) {
                this._savedAlpha = value;
            }
        },
        firstActivated: {
            get: function () {
                return this._firstActivated;
            },
            set: function (value) {
                this._firstActivated = value;
            }
        },
        watchPos: {
            get: function () {
                return this._watchPos;
            },
            set: function (value) {
                this._watchPos = value;
            }
        },
        touchHoldDuration: {
            get: function () {
                return this._touchHoldDuration;
            },
            set: function (value) {
                this._touchHoldDuration = value;
            }
        },
        longPress: {
            get: function () {
                return this._longPress;
            },
            set: function (value) {
                this._longPress = value;
            }
        },
        isMobile: {
            get: function () {
                return this._isMobile;
            },
            set: function (value) {
                this._isMobile = value;
            }
        }
    });

    GPSController.prototype.createGPSButton = function () {
        var scope = this;

 
        var button = document.createElement('div');
        button.id = 'gpsButton';
        button.className = "cesium-button cesium-toolbar-button tracking-deactivated";
        button.title = "查看GPS位置(单击：一次，双击：实时)";

        // 
        var customCesiumViewerToolbar = document.getElementsByClassName("cesium-viewer-toolbar")[0];
        var customGlobeButton = customCesiumViewerToolbar.getElementsByClassName("cesium-sceneModePicker-wrapper cesium-toolbar-button")[0];
        customCesiumViewerToolbar.appendChild(button, customGlobeButton);
 
        // --------------------------MOUSE HELD EVENT--------------------------
        var holdStart = 0;
        var holdTime = 0;
        if (scope._isMobile) {
            button.addEventListener("touchstart", function (evt) {
                holdStart = Date.now();
            }, false);
            button.addEventListener("touchend", function (evt) {
                holdTime = Date.now() - holdStart;
                scope._longPress = holdTime >= scope._touchHoldDuration;
            }, false);
        } else {
            button.addEventListener("mousedown", function (evt) {
                holdStart = Date.now();
            }, false);
            window.addEventListener("mouseup", function (evt) {
                holdTime = Date.now() - holdStart;
                scope._longPress = holdTime >= scope._touchHoldDuration;
            }, false);
        }

        // --------------------------MOUSE CLICK EVENT-------------------------
        button.onclick = function () {
            
            if (scope._liveTrackingActivated) {
                scope._liveTrackingActivated = false;
                scope.stopTracking();
            }

            if (!scope._longPress) {
                var object = document.getElementById("gpsButton");
                // distinguish between double-click and single-click
                // https://stackoverflow.com/questions/5497073/how-to-differentiate-single-click-event-and-double-click-event#answer-16033129
                if (object.getAttribute("data-double-click") == null) {
                    object.setAttribute("data-double-click", 1);
                    setTimeout(function () {
                        if (object.getAttribute("data-double-click") == 1) {
                            scope.handleClick();
                        }
                        object.removeAttribute("data-double-click");
                    }, 500);
                } else if (object.getAttribute("data-triple-click") == null) {
                    object.setAttribute("data-triple-click", 1);
                    setTimeout(function () {
                        if (object.getAttribute("data-triple-click") == 1) {
                            scope.handleDclick();
                        }
                        object.removeAttribute("data-double-click");
                        object.removeAttribute("data-triple-click");
                    }, 500);
                } else {
                    object.removeAttribute("data-double-click");
                    object.removeAttribute("data-triple-click");
                    scope.handleTclick();
                }
            } else {
                var restartView = function (_callback) {
                    scope._firstActivated = false;
                    scope.viewer.camera.cancelFlight();
                    _callback();
                };

                restartView(function () {
                    scope.viewer.camera.flyTo({
                        destination: Cesium.Cartesian3.fromRadians(
                            scope.viewer.camera.positionCartographic.longitude,
                            scope.viewer.camera.positionCartographic.latitude,
                            250),
                        orientation: {
                            heading: scope.viewer.camera.heading,
                            pitch: Cesium.Math.toRadians(-75),
                            roll: 0
                        }
                    });
                });
            }
        }
    }

    // Handle single-click
    GPSController.prototype.handleClick = function () {
        var scope = this;

        if (scope._liveTrackingActivated) {
            scope._liveTrackingActivated = false;
            scope.stopTracking();
        } else {
            var button = document.getElementById("gpsButton");
            button.classList.remove("tracking-ori-activated");
            button.classList.remove("tracking-pos-ori-activated");
            button.classList.add("tracking-deactivated");

            // one time tracking
            scope.startTracking();
        }
    }

    // Handle double-click
    GPSController.prototype.handleDclick = function () {
        var scope = this;

        if (scope._liveTrackingActivated) {
            scope._liveTrackingActivated = false;
            scope.stopTracking();
        } else {
            scope._liveTrackingActivated = true;
            scope._watchPos = false;

            var button = document.getElementById("gpsButton");
            button.classList.remove("tracking-deactivated");
            button.classList.remove("tracking-ori-deactivated");
            button.classList.add("tracking-ori-activated");

            // tracking in intervals of miliseconds
            scope.startTracking();
        }
    }

    // Handle triple-click
    GPSController.prototype.handleTclick = function () {
        var scope = this;

        if (scope._liveTrackingActivated) {
            scope._liveTrackingActivated = false;
            scope.stopTracking();
        } else {
            scope._liveTrackingActivated = true;
            scope._watchPos = true;

            var button = document.getElementById("gpsButton");
            button.classList.remove("tracking-deactivated");
            button.classList.remove("tracking-pos-ori-deactivated");
            button.classList.add("tracking-pos-ori-activated");

            // tracking in intervals of miliseconds
            scope.startTracking();
        }
    }

    var geolocation;

    GPSController.prototype.startTracking = function () {
        var scope = this;

        if (!geolocation)
            geolocation = new BMap.Geolocation();

        geolocation.getCurrentPosition(function (r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                var wgsPoint = mars3d.pointconvert.bd2wgs([r.point.lng, r.point.lat]);
                scope.flyToLocation({ x: wgsPoint[0], y: wgsPoint[1]});
            }
            else {
	            //关于状态码
	            //BMAP_STATUS_SUCCESS	检索成功。对应数值“0”。
	            //BMAP_STATUS_CITY_LIST	城市列表。对应数值“1”。
	            //BMAP_STATUS_UNKNOWN_LOCATION	位置结果未知。对应数值“2”。
	            //BMAP_STATUS_UNKNOWN_ROUTE	导航结果未知。对应数值“3”。
	            //BMAP_STATUS_INVALID_KEY	非法密钥。对应数值“4”。
	            //BMAP_STATUS_INVALID_REQUEST	非法请求。对应数值“5”。
	            //BMAP_STATUS_PERMISSION_DENIED	没有权限。对应数值“6”。(自 1.1 新增)
	            //BMAP_STATUS_SERVICE_UNAVAILABLE	服务不可用。对应数值“7”。(自 1.1 新增)
	            //BMAP_STATUS_TIMEOUT	超时。对应数值“8”。(自 1.1 新增) 
                haoutil.msg(this.getStatus(), "定位失败");
            }
        }, { enableHighAccuracy: true });

    }

    var locationPoint;
    function clearLocationPoint() {
        if (locationPoint) { 
            locationPoint.destroy();
            locationPoint = null;
        }
    }

    GPSController.prototype.flyToLocation = function (position) {
        var scope = this;

        if (this.okCalback) {
            this.okCalback(position);
        }

        clearLocationPoint();     

        locationPoint = new mars3d.DivPoint(this.viewer, {
            html: '<div class="mars3d-animation-point" style="color:#00ff00;"><p></p></div>',
            position: Cesium.Cartesian3.fromDegrees(position.x, position.y),
            tooltip: '我的位置：'+position.x+","+position.y,
            // click: function (e) {//单击后的回调 
            // }
        });

        setTimeout(function () {
            clearLocationPoint();
        },20000);


        this.viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(position.x, position.y,4000),
            orientation: {
                heading: 0,
                pitch: Cesium.Math.toRadians(-90),
                roll: 0
            },
            complete: function () {
                scope._firstActivated = true;
                if (scope._liveTrackingActivated) {
                    if (!scope._longPress) {
                        // real-time tracking
                        scope._timer = setTimeout(function () {
                            if (scope._watchPos) {
                                // also check position in real-time 
                                scope.startTracking();
                            } else {
                                // only check orientation in real-time
                                showPosition(position);
                            }
                        }, scope._timerMiliseconds);
                    }
                }
            }
        });
    }


    GPSController.prototype.stopTracking = function () {
        var scope = this;

        scope._watchPos = false;

        var button = document.getElementById("gpsButton");
        button.classList.remove("tracking-activated");
        button.classList.add("tracking-deactivated");

        clearTimeout(scope._timer);
        clearLocationPoint();
    }

    mars3d.GPSController = GPSController;
})();
