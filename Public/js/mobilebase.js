/*!
 * common mobile JavaScript Library v1.1.2
 * 2017-11-30
 */
; "use strict";
(function (global, undefined) {
    var util = (function () {
        var cloneDeep = function () {
            var options, name, src, copy, copyIsArray, clone,
                target = arguments[0] || {},
                i = 1,
                length = arguments.length,
                deep = false;
            // Handle a deep copy situation
            if (typeof target === "boolean") {
                deep = target;

                // Skip the boolean and the target
                target = arguments[i] || {};
                i++;
            }
            if (typeof target !== "object" && !isFunction(target)) {
                target = {};
            }        // Extend jQuery itself if only one argument is passed
            if (i === length) {
                target = this;
                i--;
            }
            for (; i < length; i++) {
                // Only deal with non-null/undefined values
                if ((options = arguments[i]) != null) {
                    // Extend the base object
                    for (name in options) {
                        src = target[name];
                        copy = options[name];

                        // Prevent never-ending loop
                        if (target === copy) {
                            continue;
                        }
                        if (deep && copy && (isPlainObject(copy) ||
                            (copyIsArray = Array.isArray(copy)))) {

                            if (copyIsArray) {
                                copyIsArray = false;
                                clone = src && Array.isArray(src) ? src : [];

                            } else {
                                clone = src && isPlainObject(src) ? src : {};
                            }
                            // Never move original objects, clone them
                            target[name] = cloneDeep(deep, clone, copy);
                            // Don't bring in undefined values
                        } else if (copy !== undefined) {
                            target[name] = copy;
                        }
                    }
                }
            }
            // Return the modified object
            return target;
        }
        var isFunction = function (fn) {
            Object.prototype.toString.call(fn) === '[object Function]';
        }
        var isPlainObject = function (obj) {
            var proto, Ctor;
            if (!obj || Object.prototype.toString.call(obj) !== "[object Object]") {
                return false;
            }
            proto = Object.getPrototypeOf(obj);
            if (!proto) {
                return true;
            }
            Ctor = {}.hasOwnProperty.call(proto, "constructor") && proto.constructor;
            return typeof Ctor === "function" && {}.hasOwnProperty.toString.call(Ctor) === {}.hasOwnProperty.toString.call(Object);
        }
        var ready = function (fn) {
            if (document.addEventListener) {
                //标准浏览器  
                document.addEventListener('DOMContentLoaded', function () {
                    //注销事件，避免反复触发  
                    document.removeEventListener('DOMContentLoaded', arguments.callee, false);
                    //执行函数   
                    fn();
                }, false);
            } else if (document.attachEvent) {
                //IE浏览器  
                document.attachEvent('onreadystatechange', function () {
                    if (document.readyState == 'complete') {
                        document.detachEvent('onreadystatechange', arguments.callee);
                        //执行函数   
                        fn();
                    }
                });
            }
        }
        var setFontsize = function () {
            setTimeout(function () {
                var innerWidth = window.innerWidth;
                var deviceWidth = document.documentElement.clientWidth;
                if (deviceWidth > 750) {
                    deviceWidth = 750;
                }
                document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
            }, 10)
        }
        var newGuid = function () {
            function S4() {
                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
            }
            return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4())
        }
        var isUndefinedOrNull = function (value) {
            return value === undefined || value === null
        }
        var isEmpty = function (value) {
            var isValue = isUndefinedOrNull(value);
            if (!isValue) {
                if (value.trim().length > 0) {
                    isValue = false;
                } else {
                    isValue = true
                }
            }
            return isValue;
        }
        var isObject = function (value) {
            var type = typeof value
            return value != null && (type == 'object' || type == 'function')
        }
        var each = function (obj, callback) {
            var length, i = 0;
            if (isArrayLike(obj)) {
                length = obj.length;
                for (; i < length; i++) {
                    if (callback.call(obj[i], i, obj[i]) === false) {
                        break;
                    }
                }
            } else {
                for (var i in obj) {
                    if (callback.call(obj[i], i, obj[i]) === false) {
                        break;
                    }
                }
            }
            return obj;
        }
        var isArrayLike = function (value) {
            return value != null && typeof value != 'function' && (typeof value.length == 'number' && value.length > -1 && value.length % 1 == 0 && value.length <= 9007199254740991)
        }
        var makeArray = function (values) {
            var arr = [];
            if (!isUndefinedOrNull(values)) {
                if (isArrayLike(values)) {
                    arr = Array.prototype.slice.call(values);
                } else {
                    for (var i = 0; i < values.length; i++) {
                        arr.push(values[i]);
                    }
                }
            }
            return arr;
        }
        var chunk = function (array, subGroupLength) {
            if (!isUndefinedOrNull(subGroupLength)) {
                var index = 0;
                var newArray = [];
                while (index < array.length) {
                    newArray.push(array.slice(index, index += subGroupLength));
                }
                return newArray;
            } else {
                return array;
            }
        }
        var baseException = function (message) {
            this.message = message;
        }
        var setOpacity = function (el, value) {//设置透明度
            el.filters ? el.style.filter = 'alpha(opacity=' + value + ')' : el.style.opacity = value / 100;
            return el;
        }
        var anim = {
            flag: null,
            fadeIn: function (el, speed, opacity, val) {
                speed = speed || 20;
                opacity = opacity || 100;
                val = val || 0;
                el.style.display = 'block';
                setOpacity(el, 0);
                var f = setInterval(function () {
                    if (val <= opacity) {
                        setOpacity(el, val);
                        val += 5;
                    } else {
                        clearInterval(f);
                    }
                })
            },
            fadeOut: function (el, speed, opacity, val, isDelete) {
                speed = speed || 20;
                opacity = opacity || 0;
                val = val || 100;
                if (!util.isUndefinedOrNull(this.flag)) {
                    clearInterval(this.flag);
                }
                var f = setInterval(function () {
                    if (val >= opacity) {
                        setOpacity(el, val);
                        val -= 5;
                    } else if (val < 0) {
                        clearInterval(f);
                        if (isDelete) {
                            util.query(el).remove();
                        } else {
                            el.style.display = 'none';
                        }
                    }
                })
            }
        }
        function query(selector, context) {
            return new query.prototype.F(selector, context);
        }
        query.prototype = {
            constructor: query,
            F: function (selector, context) {
                if (isUndefinedOrNull(selector)) {
                    return this;
                }
                if (typeof selector === "string") {
                    var els = (context || document).querySelectorAll(selector);
                    this.length = els.length;
                    for (var i = 0; i < this.length; i += 1) {
                        this[i] = els[i];
                    }
                    return this;
                } else if (selector.nodeType) {
                    this[0] = selector;
                    this.length = 1;
                    return this;
                } else {
                    throw baseException('参数异常');
                }
            },
            each: function (callback) {
                return each(this, callback);
            }
        }
        cloneDeep(query.prototype, {
            parent: function () {
                var parent = this.parentNode;
                return parent && parent.nodeType !== 11 ? parent : null;
            },
            css: function (type, value) {
                this.each(function (k, v) {
                    v.style[type] = value;
                });
                return this;
            },
            hasClass: function (selector) {
                for (var i = 0; i < this.length; i++) {
                    if (this[i].nodeType === 1 && (" " + (this[i].className.match(/[^\x20\t\r\n\f]+/g) || []).join(" ") + " ").indexOf(" " + selector + " ") > -1) {
                        return true;
                    }
                }
                return false;
            },
            addClass: function (selector) {
                for (var i = 0; i < this.length; i++) {
                    if (!query(this[i]).hasClass(selector)) {
                        this[i].className += (this[i].className ? " " : "") + selector;
                    }
                }
                return this;
            },
            removeClass: function (selector) {
                for (var i = 0; i < this.length; i++) {
                    if (query(this[i]).hasClass(selector)) {
                        var reg = new RegExp('(\\s|^)' + selector + '(\\s|$)');
                        this[i].className = this[i].className.replace(reg, ' ');
                    }
                }
                return this;
            },
            toggleClass: function (selector) {
                for (var i = 0; i < this.length; i++) {
                    if (query(this[i]).hasClass(selector)) {
                        query(this[i]).removeClass(selector);
                    } else {
                        query(this[i]).addClass(selector);
                    }
                }
            },
            remove: function () {
                for (var i = 0; i < this.length; i++) {
                    this[i].parentNode.removeChild(this[i]);
                }
                return this;
            },
            siblings: function () {
                var els = [];
                for (var i = 0; i < this.length; i++) {
                    var n = this[i].parentNode.firstChild;
                    for (; n; n = n.nextSibling) {
                        if (n.nodeType === 1 && n !== this[i]) {
                            els.push(n);
                        }
                    }
                }
                return els;
            },
            find: function (selector) {
                if (isEmpty(selector)) {
                    return this;
                }
                for (var i = 0; i < this.length; i++) {
                    return this[i].querySelector(selector);
                }
            },
            findAll: function (selector) {
                if (isEmpty(selector)) {
                    return this;
                }
                var els = [], k = 0;;
                for (var i = 0; i < this.length; i++) {
                    var tels = this[i].querySelectorAll(selector);
                    for (var j = 0; j < tels.length; j++) {
                        els[k] = tels[j];
                        k++;
                    }
                }
                for (var i = 0; i < els.length; i++) {
                    this[i] = els[i];
                }
                this.length = els.length;
                return this;
            },
            setOpacity: function (value) {//设置透明度
                for (var i = 0; i < this.length; i++) {
                    this[i].filters ? this[i].style.filter = 'alpha(opacity=' + value + ')' : this[i].style.opacity = value / 100;
                }
                return this;
            },
            fadeIn: function (speed, opacity, val) {
                for (var i = 0; i < this.length; i++) {
                    anim.fadeIn(this[i], speed, opacity, val);
                }
            },
            fadeOut: function (speed, opacity, val, isDelete) {
                for (var i = 0; i < this.length; i++) {
                    anim.fadeOut(this[i], speed, opacity, val, isDelete);
                }
            },
            hide: function () {
                for (var i = 0; i < this.length; i++) {
                    this[i].style.display = 'none';
                }
                return this;
            },
            show: function () {
                for (var i = 0; i < this.length; i++) {
                    this[i].style.display = 'block';
                }
                return this;
            },
            on: function (type, callback) {
                if (!callback) {
                    throw baseException('参数异常');
                }
                this.each(function (i, v) {
                    v.onclick = (function (v, i) {
                        return function (e) {
                            if (callback) {
                                callback.call(v, e, v, i)
                            }
                        }
                    })(v, i)
                    // v.addEventListener(type, (function (v, i) {
                    //     return function (e) {
                    //         if (callback) {
                    //             callback.call(v, e, v, i)
                    //         }
                    //     }
                    // })(v, i))
                })
            },
            forEach: function (callback) {
                for (var i = 0; i < this.length; i++) {
                    callback.call(callback, i, this[i]);
                }
            },
            click: function (callback) {
                return this.on('click', callback);
            }
        })
        query.prototype.F.prototype = query.prototype;
        return {
            extend: cloneDeep,
            cloneDeep: cloneDeep,
            isFunction: isFunction,
            ready: ready,
            setFontsize: setFontsize,
            isEmpty: isEmpty,
            isObject: isObject,
            isUndefinedOrNull: isUndefinedOrNull,
            newGuid: newGuid,
            each: each,
            fadeOut: anim.fadeOut,
            fadeIn: anim.fadeIn,
            setOpacity: setOpacity,
            query: query,
            makeArray: makeArray,
            chunk: chunk,
            baseException: baseException
        }
    })();
    var toast = (function () {
        function alert(options) {
            var opts = util.cloneDeep({}, { title: '', content: '内容', btnText: '确认', btnCallBack: null }, options);
            var el = document.createElement("div");
            el.className = 'js_dialog';
            var id = util.newGuid();
            el.id = id;
            var htmls = '<div class="weui-mask"></div><div class="weui-dialog bs-dialog">' + (util.isEmpty(opts.title) ? '' : ('<div class="bs-title">' + opts.title + '</div>')) +
                '<div class=" ' + (util.isEmpty(opts.title) ? 'bs-notitle-content' : 'bs-content') + '">' + opts.content + '</div><div class="bs-operation"><a name=' + id +
                ' href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" >' + opts.btnText + '</a></div></div>'
            el.innerHTML = htmls;
            document.body.appendChild(el);
            util.query(document.getElementById(id).querySelector(".weui-dialog__btn")).on("click", function (e, v, i) {
                if (opts.btnCallBack) {
                    opts.btnCallBack()
                }
                document.getElementById(v.name).remove()
            })
        };
        function confirm(options) {
            var opts = util.cloneDeep({}, { title: '', content: '内容', btnText: '确认', btnCallBack: null }, options);
            var el = document.createElement("div");
            el.className = 'js_dialog';
            var id = util.newGuid();
            el.id = id;
            var htmls = '<div class="weui-mask"></div><div class="weui-dialog bs-dialog">' + (util.isEmpty(opts.title) ? '' : ('<div class="bs-title">' + opts.title + '</div>')) +
                '<div class=" ' + (util.isEmpty(opts.title) ? 'bs-notitle-content' : 'bs-content') + '">' + opts.content + '</div><div class="weui-dialog__ft bs-operation"><a id="'
                + id + '1" name=' + id + ' href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default">取消</a><a id="' + id + '2" name=' + id +
                ' href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary">' + opts.btnText + '</a></div></div></div>';
            el.innerHTML = htmls;
            document.body.appendChild(el);
            document.getElementById(id + "1").onclick = function () {
                document.getElementById(this.getAttribute("name")).remove()
            }
            document.getElementById(id + "2").onclick = function () {
                if (opts.btnCallBack) {
                    opts.btnCallBack()
                }
                document.getElementById(this.getAttribute("name")).remove()
            }
        };
        function model(options) {
            var opts = util.cloneDeep({}, { title: '提示', content: '内容', btnText: '确认', mounted: null, btnCallBack: null }, options);
            var el = document.createElement("div");
            el.className = 'js_dialog';
            var id = util.newGuid();
            el.id = id;
            var htmls = '<div class="weui-mask"></div><div class="weui-dialog" style="border-radius: 20px;"><div class="weui-dialog__hd" style="line-height: 60px;height: 60px;padding:0px">';
            htmls += '<strong class="weui-dialog__title" style="font-weight: 500;font-size: 1.2rem;">' + opts.title + '</strong></div>';
            htmls += '<div class="weui-dialog__bd" style="color: black;font-size: 1rem;">' + opts.content + '</div><div class="weui-dialog__ft">';
            htmls += '<a id="' + id + '1" name=' + id + ' href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default" style="color: #007aff;font-weight: 500;">取消</a>';
            htmls += '<a id="' + id + '2" name=' + id + ' href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" style="color: #007aff;font-weight: 500;">'
                + opts.btnText + '</a></div></div></div>';
            el.innerHTML = htmls;
            document.body.appendChild(el);
            if (opts.mounted) {
                opts.mounted()
            }
            document.getElementById(id + "1").onclick = function () {
                document.getElementById(this.getAttribute("name")).remove()
            }
            document.getElementById(id + "2").onclick = function () {
                if (opts.btnCallBack) {
                    opts.btnCallBack(document.getElementById(this.getAttribute("name")))
                }
                document.getElementById(this.getAttribute("name")).remove()
            }
        };
        function preview(options) {
            var opts = util.cloneDeep({}, { url: '', mounted: null }, options);
            var el = document.createElement("div");
            el.className = 'weui-gallery';
            el.style.display = "block";
            el.innerHTML = '<span class="weui-gallery__img" style="background-image: url(' + opts.url + ');"></span>';
            document.body.appendChild(el);
            el.onclick = function () {
                el.remove();
            }
        }
        function info(options) {
            var opts = util.cloneDeep({}, { content: '内容', duration: 3000 }, options);
            var el = document.createElement("div");
            var id = util.newGuid();
            el.id = id;
            el.className = "bs-toast-info";
            el.innerHTML = '<p>' + opts.content + '</p>'
            document.body.appendChild(el);
            util.query(el).fadeIn(20, 70);
            setTimeout(function () {
                util.query(el).fadeOut(20, 0, 70, true);
            }, opts.duration);
        }
        function loading(options) {
            var opts = util.cloneDeep({}, { content: '内容', duration: 0 }, options);
            var el = document.getElementById("toast-loading");
            if (util.isUndefinedOrNull(el)) {
                el = document.createElement("div");
                el.id = "toast-loading"
                el.style.display = "none";
                el.innerHTML = '<div class="weui-mask_transparent"></div><div class="bs-weui-toast">\
                        <i class="weui-loading weui-icon_toast"></i><p class="weui-toast__content">'+ opts.content + '</p></div>'
                document.body.appendChild(el);
            }
            util.query(el).fadeIn();
            if (opts.duration > 0) {
                setTimeout(function () {
                    util.query(el).fadeOut();
                }, opts.duration);
            }
        }
        function unloading() {
            util.query("#toast-loading").fadeOut();
        }
        return {
            alert: alert,
            info: info,
            confirm: confirm,
            model: model,
            preview: preview,
            loading: loading,
            unloading: unloading
        };
    })();
    //基本类型拓展
    (function () {
        if (!Array.prototype.find) {
            Array.prototype.find = function (predicate) {
                if (this == null) {
                    throw new bs.baseException('"this" is null or not defined');
                }
                var o = Object(this);
                var len = o.length >>> 0;
                if (typeof predicate !== 'function') {
                    throw new bs.baseException('predicate must be a function');
                }
                var thisArg = arguments[1];
                var k = 0;
                while (k < len) {
                    var kValue = o[k];
                    if (predicate.call(thisArg, kValue, k, o)) {
                        return kValue;
                    }
                    k++;
                }
                return undefined;
            }
        }
        if (!Array.prototype.findIndex) {
            Array.prototype.findIndex = function (predicate) {
                if (this === null) {
                    throw new TypeError('Array.prototype.findIndex called on null or undefined');
                }
                if (typeof predicate !== 'function') {
                    throw new TypeError('predicate must be a function');
                }
                var list = Object(this);
                var length = list.length >>> 0;
                var thisArg = arguments[1];
                var value;

                for (var i = 0; i < length; i++) {
                    value = list[i];
                    if (predicate.call(thisArg, value, i, list)) {
                        return i;
                    }
                }
                return -1;
            };
        }
        Array.prototype.isExist = function (cloumnName, value) {
            if (this == null) {
                throw new bs.baseException('"this" is null or not defined');
            }
            var obj = this.find(function (o) {
                return o[cloumnName] == value;
            })
            if (bs.isUndefinedOrNull(obj)) {
                return false;
            } else {
                return true;
            }
        }
        Array.prototype.remove = function (predicate) {
            if (this == null) {
                throw new bs.baseException('"this" is null or not defined');
            }
            var o = Object(this);
            var len = o.length >>> 0;
            if (typeof predicate !== 'function') {
                throw new bs.baseException('predicate must be a function');
            }
            var k = 0;
            while (k < len) {
                var kValue = o[k];
                if (predicate.call(this, kValue, k, o)) {
                    this.splice(k, 1);
                    len--;
                } else {
                    k++;
                }
            }
        }
        Object.defineProperties(Array.prototype, {
            "isExist": {
                enumerable: false
            },
            "remove": {
                enumerable: false
            }
        });
        Date.prototype.Format = function (fmt) {
            var o = {
                "M+": this.getMonth() + 1, //月份 
                "d+": this.getDate(), //日 
                "h+": this.getHours(), //小时 
                "m+": this.getMinutes(), //分 
                "s+": this.getSeconds(), //秒 
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
                "S": this.getMilliseconds() //毫秒 
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }
    })();
    //DOM操作
    global.bs = util.cloneDeep(util, toast);
    util.ready(function () {
        util.setFontsize();
        window.onresize = function () {
            util.setFontsize();
        }
    })
})(window);


function bsScroll(el, option) {
    var opts = $.extend({}, {
        el: null,
        pullDown: {
            isEnable: false,
            isNeedAjax: false,
            callback: null,
            ajax: {},
        },
        pullUp: {
            isEnable: false,
            preHeight: 0,
            height: 0,
            isNeedAjax: false,
            callback: null,
            ajax: {},
            status: false,
            updatAjax: null,
        }
    }, option);
    if (bs.isUndefinedOrNull(el)) {
        bs.info({ content: "参数异常" });
        return;
    }
    var element = document.querySelector(el);
    element.style.WebKitOverflowScrolling = "touch";
    var grid = { start: {}, end: {} };
    var length, downloading, offset;
    var pullDown = {
        touchstart: function (event) {
            if (element.scrollTop <= 0) {
                var touch = event.targetTouches[0];
                grid.start = { x: touch.pageX, y: touch.pageY };
                fn.setTransition(0);
                downloading.querySelector("span").innerText = '下拉刷新...';
                registerTouchEvent('touchmove', this.touchmove);
                registerTouchEvent('touchend', this.touchend);
            }
            return false;
        },
        touchmove: function (event) {
            if (element.scrollTop <= 0) {
                var touch = event.targetTouches[0];
                grid.end = { x: touch.pageX, y: touch.pageY };
                if (grid.start.y < grid.end.y) {
                    event.preventDefault();
                    if ((grid.end.y - grid.start.y - offset) / 2 <= 80) {
                        length = (grid.end.y - grid.start.y - offset) / 2;
                        fn.translate(length);
                    }
                    else {
                        length += 0.3;
                        fn.translate(length);
                        downloading.querySelector("span").innerText = '松开刷新...';
                    }
                }
            }
        },
        touchend: function (event) {
            if (grid.end.y - grid.start.y >= offset) {
                fn.setTransition(2);
                downloading.querySelector("span").innerText = '更新中...';
                if (opts.pullDown.isNeedAjax) {
                    $.when($.ajax(opts.pullDown.ajax)).then(function (result) {
                        if (typeof opts.pullDown.callback == "function") {
                            pts.pullDown.callback(result, fn.Initialization);
                        }
                    }, function () {
                        bs.info({ content: "请求异常" });
                        return;
                    })
                } else {
                    pts.pullDown.callback(fn.Initialization);
                }
            } else {
                //返回初始状态
                fn.Initialization();
            }
            element.removeEventListener("touchmove", this.touchmove, false);
            element.removeEventListener("touchend", this.touchend, false);
        }
    }
    function pullUp() {
        fn.upLoading();
        var wScrollY = element.scrollTop;
        var wInnerH = element.offsetHeight;
        var bScrollH = element.scrollHeight;
        if (wScrollY + wInnerH + opts.pullUp.preHeight >= bScrollH) {
            if (opts.pullUp.isNeedAjax) {
                if (!bs.isUndefinedOrNull(opts.pullUp.updatAjax))
                    opts.pullUp.ajax.data = opts.pullUp.updatAjax();
                $.when($.ajax(opts.pullUp.ajax)).then(function (result) {
                    if (typeof opts.pullUp.callback == "function") {
                        opts.pullUp.status = opts.pullUp.callback(result);
                        if (!opts.pullUp.status) {
                            fn.hideUpLoading();
                        }
                    }
                }, function () {
                    bs.info({ content: "请求异常" });
                    return;
                })
            } else {
                if (typeof opts.pullUp.callback == "function") {
                    opts.pullUp.status = opts.pullUp.callback();
                    if (!opts.pullUp.status) {
                        fn.hideUpLoading();
                    }
                }
            }
        }
    }
    function registerTouchEvent(event_name, event_fn) {
        var bindDom = element;
        if (bindDom.addEventListener) {
            bindDom.addEventListener(event_name, event_fn, false);
        } else if (bindDom.attachEvent) {
            bindDom.attachEvent('on' + event_name, event_fn);
        } else {
            bindDom['on' + event_name] = event_fn;
        }
    }
    var fn = {
        translate: function (diff) {
            element.style.webkitTransform = 'translate(0,' + diff + 'px)';
            element.style.transform = 'translate(0,' + diff + 'px)';
        },
        setTransition: function (time) {
            element.style.webkitTransition = 'all ' + time + 's';
            element.style.transition = 'all ' + time + 's';
        },
        Initialization: function () {
            fn.translate(0 - offset);
        },
        animation: function () {
            var htmls = '<div style="text-align: center;height: 70px;line-height: 70px;">' +
                '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAACgCAMAAACsXRuGAAAAt1BMVEX////FxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcU7SVrkAAAAPHRSTlMAAPONxyCMRvCjM2n59gzeD/xssVo52Akwh6sDpeTbckJLZroqfhUnRernVxifG9XDgb2ZzzxjeLThEmBcLCjmAAACDklEQVR4Xu2Y124yQQyFM9sh9BJafgik956/7fs/V4RCwiITbMdjCSGfKy4On7THnuLZ8yGTyRWUr1W54NgNIC4Dbm+VrQ+tbQxoQAMa0IAGnO4vtR44WBquCcBuJadrSslwQucNaBm2qbyHEQ3YqNN4l3fUKpdpMV7Q26ZF4T3S+5AU49OIA8RjvLpxDCAeY/PIcYB4jKf8tTzcxDt2fGBt/D3v19kPgK5fRQLkAt0MCZANdIdIgGxg7WBjgHygO1kTY/NVMla8QeBvJwHCGP84CRDG+PefBAhjrHTlo9n/InDiY9a7XfLazgewd//Jqze8AN15sAiw7Gu87XwAW/7m5ec5b+j8AXsveT6uSYAwxmrf7xNBZ+aYQJPJZDLh+20aRlkWhen8twdgnCyO0SCJfQDjUv6lUuwBmOQFJXJgGhSBQSoGhvmKQnFNo1VgBD3MmmarwAx6WDWFQOhh1RR+MvSwagqLwqw7/ndW3UkfCD2bhJcAephAvJGYn4y3OrMouIfZNriH19i4h7v0cI9ww4ce4ZEEPTt6/uJ+UdS4H28G1C9qV9yPLyjUL1vyuB/dlLh+dNtE/dpA+SdrF0XeNsqNLV96+puDfPvaaukfUvJjVP+gl19F9C9L8uuc/oVTfiXWv7TLxwr9wUc+msmHR/3xVj6A6z8RSBej/jMLp+76T1X6j2m7eP6aTO9STHV4CXebKAAAAABJRU5ErkJggg==" style="vertical-align: middle;width: 0.32rem" />&nbsp;<span style="vertical-align: middle;"></span></div>';
            $(element).prepend(htmls)
            downloading = element.firstElementChild;
            offset = downloading.clientHeight;
        },
        upLoading: function () {
            if ($(element.querySelector(".weui-loading")).length > 0) {
                $(element.querySelector(".weui-loading")).removeClass("none");
            } else {
                var htmls = '<div class="weui-loading"></div>';
                $(element).append(htmls);
            }
        },
        hideUpLoading: function () {
            $(element.querySelector(".weui-loading")).addClass("none");
        }
    }
    function init() {
        if (opts.pullDown.isEnable) {
            fn.animation();
            registerTouchEvent('touchstart', pullDown.touchstart);
            fn.translate(0 - offset);
        }
        if (opts.pullUp.isEnable) {
            element.style.height = opts.pullUp.height + "px";
            registerTouchEvent('scroll', pullUp);
        }
    }
    init();
}
bs.extend({ bsScroll: bsScroll })