"use strict";

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
if (typeof Object.assign != 'function') {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, "assign", {
        value: function assign(target, varArgs) {
            // .length of function is 2
            'use strict';

            if (target == null) {
                // TypeError if undefined or null
                throw new TypeError('Cannot convert undefined or null to object');
            }

            var to = Object(target);

            for (var index = 1; index < arguments.length; index++) {
                var nextSource = arguments[index];

                if (nextSource != null) {
                    // Skip over if undefined or null
                    for (var nextKey in nextSource) {
                        // Avoid bugs when hasOwnProperty is shadowed
                        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
            }
            return to;
        },
        writable: true,
        configurable: true
    });
}



function _detect(e) {
    var t = this.os = {},
        n = e.match(/(Android);?[\s\/]+([\d.]+)?/);
    n && (t.android = !0, t.version = n[2]);
}
function Schedule(e, t, n) {
    this._dates = e[0], this._months = e[1], this._days = e[2], this._start = t, this._end = n, this._pointer = t;
}
function Result(e) {
    this.label = e.label, this.value = e.value;
}
function picker() {
    function e(t) {
        e = bala.noop, u.find(".weui-mask").addClass("weui-animate-fade-out"), u.find(".weui-picker").addClass("weui-animate-slide-down").on("animationend webkitAnimationEnd", function () {
            u.remove(), _sington = !1, t && t();
        });
    }
    function t(t) {
        e(t);
    }
    function n(e, t) {
        if (void 0 === c[t] && o.defaultValue && void 0 !== o.defaultValue[t]) {
            for (var i = o.defaultValue[t], a = 0, r = e.length; a < r && i != e[a].value; ++a) { }
            a < r ? c[t] = a : console.warn("Picker has not match defaultValue: " + i);
        }
        u.find(".weui-picker__group").eq(t).scroll({
            items: e,
            temp: c[t],
            onChange: function onChange(e, i) {
                if (l[t] = e ? new Result(e) : null, c[t] = i, s) o.onChange(l); else if (e.children && e.children.length > 0) u.find(".weui-picker__group").eq(t + 1).show(), !s && n(e.children, t + 1); else {
                    var a = u.find(".weui-picker__group");
                    a.forEach(function (e, n) {
                        n > t && bala(e).hide();
                    }), l.splice(t + 1), o.onChange(l);
                }
            },
            onConfirm: o.onConfirm
        });
    }
    if (_sington) return _sington;
    var i,
        a = arguments[arguments.length - 1],
        o = bala.extend({
            id: "default",
            className: "",
            container: "body",
            onChange: bala.noop,
            onConfirm: bala.noop,
            title: ""
        }, a),
        s = !1;
    if (arguments.length > 2) {
        var r = 0;
        for (i = []; r < arguments.length - 1;) {
            i.push(arguments[r++]);
        } s = !0;
    } else i = arguments[0];
    temp[o.id] = temp[o.id] || [];
    for (var l = [], c = temp[o.id], u = bala(bala.render('<div class="<%= className %>">\n                                <div class="weui-mask"></div>\n                                <div class="weui-picker">\n                                    <div class="weui-picker__hd" style="background-color:#F7F7F7">\n                                        <a href="javascript:;" data-action="cancel" class="weui-picker__action" style="color:#007aff">取消</a>\n                                        <a href="javascript:;" data-action="cancel" class="weui-picker__action" style="color:#333333"><%= title %></a>\n                                        <a href="javascript:;" data-action="select" class="weui-picker__action" style="color:#007aff" id="weui-picker-confirm">确定</a>\n                                    </div>\n                                    <div class="weui-picker__bd"></div>\n                                </div>\n                            </div>', o)), f = a.depth || (s ? i.length : depthOf(i[0])), h = ""; f--;) {
        h += '<div class="weui-picker__group">\n                    <div class="weui-picker__mask"></div>\n                    <div class="weui-picker__indicator"></div>\n                    <div class="weui-picker__content"></div>\n                </div>';
    }
    try {


        //debugger;
        // u = u || $(u);
        var kk = u.find(".weui-picker__bd").html(h);
        //var kk = document.getElementsByClassName("weui-picker__bd").innerHTML = h;
        return kk, function () {
            bala(o.container).append(u), bala.getStyle(u[0], "transform"), u.find(".weui-mask").addClass("weui-animate-fade-in"), u.find(".weui-picker").addClass("weui-animate-slide-up");
        }(), s ? i.forEach(function (e, t) {
            n(e, t);
        }) : n(i, 0), u.on("click", ".weui-mask", function () {
            t();
        }).on("click", ".weui-picker__action", function () {
            t();
        }).on("click", "#weui-picker-confirm", function () {
            o.onConfirm(l);
        }), _sington = u[0], _sington.hide = t, _sington;

    } catch (e) {

        console.log(e.message);
    }


}
function mutilPicker(e) {
    for (var t = bala.extend({}, {
        title: "提示",
        key: "key",
        selectMax: 0,
        value: "value",
        list: [],
        callback: null,
        selectList: []
    }, e), n = document.createElement("div"), i = '<div class="weui-mask" id="iosMask" style="transition:opacity 0.2s linear 0s"></div>\n                    <div class="weui-actionsheet" id="iosActionsheet"><div class="weui-actionsheet-mutil__title">\n                    <a class="weui-actionsheet-operation operation-left">取消</a>\n                    <p class="weui-actionsheet-mutil__title-text">' + t.title + '\n                    </p><a class="weui-actionsheet-operation operation-right">确定</a></div>\n                    ' + (t.selectMax > 0 ? '<div style="padding-left:1.1rem;font-size: 17px;background-color:#fff;color: #888;padding-top:0.5rem;font-family:"微软雅黑"">最多只能选择' + t.selectMax + "个</div>" : "") + '\n                    <div class="weui-actionsheet-mutil__menu" id="actionsheet-items">', a = 0; a < t.list.length; a++) {
        for (var o = "weui-actionsheet-mutil__cell", s = 0; s < t.selectList.length; s++) {
            if (t.list[a][t.key] == t.selectList[s][t.key]) {
                o = "weui-actionsheet-mutil__cell actionsheet-mutil__cell-select";
                break;
            }
        } i += '<div class="' + o + '" id="' + t.list[a][t.key] + '">' + t.list[a][t.value] + "</div>";
    }
    i += "</div></div></div></div>", n.innerHTML = i, document.body.appendChild(n);
    var r = n.querySelector("#iosActionsheet"),
        l = n.querySelector("#iosMask");
    setTimeout(function () {
        r.className = "weui-actionsheet weui-actionsheet_toggle";
    }, 1), n.querySelector("#actionsheet-items").onclick = function (e) {
        if (e.target.className == "weui-actionsheet-mutil__menu") return;
        if (-1 == e.target.className.lastIndexOf("actionsheet-mutil__cell-select")) {
            if (t.selectList.length >= t.selectMax) return void toast.info({
                title: "提示",
                content: "最多只能选择" + t.selectMax + "个"
            });
            e.target.className = "weui-actionsheet-mutil__cell actionsheet-mutil__cell-select", t.selectList.push({
                key: e.target.id
            });
        } else {
            e.target.className = "weui-actionsheet-mutil__cell";
            for (var n = 0; n < t.selectList.length; n++) {
                t.selectList[n][t.key] == e.target.id && t.selectList.splice(n, 1);
            }
        }
    }, l.onclick = function () {
        r.className = "weui-actionsheet", l.style.display = "none", setTimeout(function () {
            n.remove();
        }, 500);
    }, n.querySelector(".operation-left").onclick = function () {
        r.className = "weui-actionsheet", l.style.display = "none", setTimeout(function () {
            n.remove();
        }, 500);
    }, n.querySelector(".operation-right").onclick = function () {
        if (t.callback) {
            for (var e = [], i = 0; i < t.list.length; i++) {
                for (var a = 0; a < t.selectList.length; a++) {
                    t.list[i][t.key] == t.selectList[a][t.key] && e.push(t.list[i]);
                }
            } t.callback(e);
        }
        r.className = "weui-actionsheet", l.style.display = "none", setTimeout(function () {
            n.remove();
        }, 500);
    };
}
function depthOf(e) {
    var t = 1;
    return e.children && e.children[0] && (t = depthOf(e.children[0]) + 1), t;
}
function datePicker(e) {
    var t = bala.extend({
        id: "datePicker",
        onChange: bala.noop,
        onConfirm: bala.noop,
        start: 2e3,
        end: 2030,
        cron: "* * *"
    }, e);
    "number" == typeof t.start ? t.start = new Date(t.start + "-01-01") : "string" == typeof t.start && (t.start = new Date(t.start)), "number" == typeof t.end ? t.end = new Date(t.end + "-12-31") : "string" == typeof t.end && (t.end = new Date(t.end));
    var n,
        i = function i(e, t, n) {
            for (var i = 0, a = e.length; i < a; i++) {
                var o = e[i];
                if (o[t] == n) return o;
            }
        },
        a = [],
        o = cron.parse(t.cron, t.start, t.end);
    do {
        n = o.next();
        var s = n.value.getFullYear(),
            r = n.value.getMonth() + 1,
            l = n.value.getDate(),
            c = i(a, "value", s);
        c || (c = {
            label: s + "年",
            value: s,
            children: []
        }, a.push(c));
        var u = i(c.children, "value", r);
        u || (u = {
            label: r + "月",
            value: r,
            children: []
        }, c.children.push(u)), u.children.push({
            label: l + "日",
            value: l
        });
    } while (!n.done);
    return picker(a, t);
}
function datePickerNew(e) {
    var t = bala.extend({
        id: "datePicker",
        isInit: true,
        onChange: bala.noop,
        onConfirm: bala.noop,
        start: 2e3,
        end: 2030,
        cron: "* * *"
    }, e);
    var u;
    var that = this;
    var temp = {}
    that.init = function () {
        var d = document.getElementById(t.id);
        if (d != null)
            return console.error("id已经存在");
        "number" == typeof t.start ? t.start = new Date(t.start + "-01-01") : "string" == typeof t.start && (t.start = new Date(t.start)), "number" == typeof t.end ? t.end = new Date(t.end + "-12-31") : "string" == typeof t.end && (t.end = new Date(t.end));
        var n,
            i = function i(e, t, n) {
                for (var i = 0, a = e.length; i < a; i++) {
                    var o = e[i];
                    if (o[t] == n) return o;
                }
            },
            a = [],
            o = cron.parse(t.cron, t.start, t.end);
        do {
            n = o.next();
            var s = n.value.getFullYear(),
                r = n.value.getMonth() + 1,
                l = n.value.getDate(),
                c = i(a, "value", s);
            c || (c = {
                label: s + "年",
                value: s,
                children: []
            }, a.push(c));
            var u = i(c.children, "value", r);
            u || (u = {
                label: r + "月",
                value: r,
                children: []
            }, c.children.push(u)), u.children.push({
                label: l + "日",
                value: l
            });
        } while (!n.done);
        return _picker(a, t);
    }
    that.show = function () {
        if (!u) {
            console.error("请先运行init初始化!");
        }
        u.find(".weui-mask").addClass("weui-animate-fade-in"), u.find(".weui-picker").addClass("weui-animate-slide-up");
        u.show();
    }
    function _picker() {
        function e(t) {
            var f = true;
            u.find(".weui-mask").addClass("weui-animate-fade-out"), u.find(".weui-picker").addClass("weui-animate-slide-down").on("animationend webkitAnimationEnd", function () {
                if (f) {
                    u.hide();
                    u.find(".weui-mask").removeClass("weui-animate-fade-out");
                    u.find(".weui-picker").removeClass("weui-animate-slide-down");
                    f = false, t && t();
                }
            });
        }
        function t(t) {
            e(t);
        }
        function n(e, t) {
            if (void 0 === c[t] && o.defaultValue && void 0 !== o.defaultValue[t]) {
                for (var i = o.defaultValue[t], a = 0, r = e.length; a < r && i != e[a].value; ++a) { }
                a < r ? c[t] = a : console.warn("Picker has not match defaultValue: " + i);
            }
            u.find(".weui-picker__group").eq(t).scroll({
                items: e,
                temp: c[t],
                onChange: function onChange(e, i) {
                    if (l[t] = e ? new Result(e) : null, c[t] = i, s) o.onChange(l); else if (e.children && e.children.length > 0) u.find(".weui-picker__group").eq(t + 1).show(), !s && n(e.children, t + 1); else {
                        var a = u.find(".weui-picker__group");
                        a.forEach(function (e, n) {
                            n > t && bala(e).hide();
                        }), l.splice(t + 1), o.onChange(l);
                    }
                },
                onConfirm: o.onConfirm
            });
        }
        var i,
            a = arguments[arguments.length - 1],
            o = bala.extend({
                id: "default",
                className: "",
                container: "body",
                onChange: bala.noop,
                onConfirm: bala.noop,
                title: ""
            }, a),
            s = !1;
        if (arguments.length > 2) {
            var r = 0;
            for (i = []; r < arguments.length - 1;) {
                i.push(arguments[r++]);
            } s = !0;
        } else i = arguments[0];
        u = bala(bala.render('<div id="<%= id %>" class="<%= className %>">\n                                <div class="weui-mask"></div>\n                                <div class="weui-picker">\n                                    <div class="weui-picker__hd" style="background-color:#F7F7F7">\n                                        <a href="javascript:;" data-action="cancel" class="weui-picker__action" style="color:#007aff">取消</a>\n                                        <a href="javascript:;" data-action="cancel" class="weui-picker__action" style="color:#333333"><%= title %></a>\n                                        <a href="javascript:;" data-action="select" class="weui-picker__action" style="color:#007aff" id="weui-picker-confirm">确定</a>\n                                    </div>\n                                    <div class="weui-picker__bd"></div>\n                                </div>\n                            </div>', o))
        temp[o.id] = temp[o.id] || [];
        for (var l = [], c = temp[o.id], f = a.depth || (s ? i.length : depthOf(i[0])), h = ""; f--;) {
            h += '<div class="weui-picker__group">\n                    <div class="weui-picker__mask"></div>\n                    <div class="weui-picker__indicator"></div>\n                    <div class="weui-picker__content"></div>\n                </div>';
        }
        u.hide();
        try {
            //debugger;
            // u = u || $(u);
            var kk = u.find(".weui-picker__bd").html(h);
            //var kk = document.getElementsByClassName("weui-picker__bd").innerHTML = h;
            return kk, function () {
                bala(o.container).append(u), bala.getStyle(u[0], "transform");
            }(), s ? i.forEach(function (e, t) {
                n(e, t);
            }) : n(i, 0), u.on("click", ".weui-mask", function () {
                t();
            }).on("click", ".weui-picker__action", function () {
                t();
            }).on("click", "#weui-picker-confirm", function () {
                o.onConfirm(l);
            });//, _sington = u[0], _sington.hide = t, _sington;

        } catch (e) {
            console.log(e.message);
        }


    }
    if (t.isInit) {
        that.init();
    }
}
function actionsheet(e) {
    for (var t = bala.extend({}, {
        title: "提示",
        value: "value",
        list: [],
        callback: null
    }, e), n = document.createElement("div"), i = '<div class="weui-mask" id="iosMask"></div>\n        <div class="weui-actionsheet" id="iosActionsheet">\n            <div class="weui-actionsheet__menu">', a = 0; a < t.list.length; a++) {
        i += ' <div class="weui-actionsheet__cell" style="font-size:16px;" id=' + a + ">" + t.list[a][t.value] + "</div>";
    } i += ' </div>\n            <div class="weui-actionsheet__action">\n                <div class="weui-actionsheet__cell" id="iosActionsheetCancel" style="font-size:17px;">取消</div>\n            </div>\n        </div>', n.innerHTML = i, document.body.appendChild(n);
    var o = n.querySelector("#iosActionsheet");
    setTimeout(function () {
        o.className = "weui-actionsheet weui-actionsheet_toggle";
    }, 2), n.querySelector("#iosActionsheetCancel").onclick = function (e) {
        o.className = "weui-actionsheet", iosMask.style.display = "none", setTimeout(function () {
            n.remove();
        }, 500);
    }, n.querySelector("#iosMask").onclick = function () {
        o.className = "weui-actionsheet", iosMask.style.display = "none", setTimeout(function () {
            n.remove();
        }, 500);
    }, n.querySelector(".weui-actionsheet__menu").onclick = function (e) {
        t.callback && t.callback(t.list[e.target.id]), o.className = "weui-actionsheet", iosMask.style.display = "none", setTimeout(function () {
            n.remove();
        }, 500);
    };
}
var _typeof = "function" == typeof Symbol && "symbol" == _typeof2(Symbol.iterator) ? function (e) {
    return typeof e === "undefined" ? "undefined" : _typeof2(e);
} : function (e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof2(e);
},
    bala = function (e, t, n) {
        function i(a, o, s) {
            //if (typeof i(o)[0] == undefined) {
            //    return;
            //}
            try {
                return s = Object.create(i.fn),
              a && s.push.apply(s, a[t] ? [a] : "" + a === a ? /</.test(a) ? ((o = e.createElement(o || t)).innerHTML = a,
              o.children) : o ? (o = i(o)[0]) ? o[n](a) : s : e[n](a) : "function" == typeof a ? e.readyState[7] ? a() : e[t]("DOMContentLoaded", a) : a),
              s;
            } catch (e) {
                //console.log((o = i(o)[0]) ? o[n](a) : s);
                //console.log(e.message);
            }

        }
        return i.fn = [], i.one = function (e, t) {
            return i(e, t)[0] || null;
        }, i;
    }(document, "addEventListener", "querySelectorAll");

_detect.call(bala, navigator.userAgent), Object.assign(bala.fn, {
    append: function append(e) {
        return e instanceof HTMLElement || (e = e[0]), this.forEach(function (t) {
            t.appendChild(e);
        }), this;
    },
    remove: function remove() {
        return this.forEach(function (e) {
            e.parentNode.removeChild(e);
        }), this;
    },
    find: function find(e) {
        return bala(e, this);
    },
    addClass: function addClass(e) {
        return this.forEach(function (t) {
            t.classList.add(e);
        }), this;
    },
    removeClass: function removeClass(e) {
        return this.forEach(function (t) {
            t.classList.remove(e);
        }), this;
    },
    eq: function eq(e) {
        return bala(this[e]);
    },
    show: function show() {
        return this.forEach(function (e) {
            e.style.display = "block";
        }), this;
    },
    hide: function hide() {
        return this.forEach(function (e) {
            e.style.display = "none";
        }), this;
    },
    html: function html(e) {
        return this.forEach(function (t) {
            t.innerHTML = e;
        }), this;
    },
    css: function css(e) {
        var t = this;
        return Object.keys(e).forEach(function (n) {
            t.forEach(function (t) {
                t.style[n] = e[n];
            });
        }), this;
    },
    on: function on(e, t, n) {
        var i = "string" == typeof t && "function" == typeof n;
        return i || (n = t), this.forEach(function (a) {
            e.split(" ").forEach(function (e) {
                a.addEventListener(e, function (e) {
                    i ? this.contains(e.target.closest(t)) && n.call(e.target, e) : n.call(this, e);
                });
            });
        }), this;
    },
    off: function off(e, t, n) {
        return "function" == typeof t && (n = t, t = null), this.forEach(function (i) {
            e.split(" ").forEach(function (e) {
                "string" == typeof t ? i.querySelectorAll(t).forEach(function (t) {
                    t.removeEventListener(e, n);
                }) : i.removeEventListener(e, n);
            });
        }), this;
    },
    index: function index() {
        var e = this[0],
            t = e.parentNode;
        return Array.prototype.indexOf.call(t.children, e);
    },
    offAll: function offAll() {
        var e = this;
        return this.forEach(function (t, n) {
            var i = t.cloneNode(!0);
            t.parentNode.replaceChild(i, t), e[n] = i;
        }), this;
    },
    val: function val() {
        var e = arguments;
        return arguments.length ? (this.forEach(function (t) {
            t.value = e[0];
        }), this) : this[0].value;
    },
    attr: function attr() {
        var e = arguments;
        if ("object" == _typeof(arguments[0])) {
            var t = arguments[0],
                n = this;
            return Object.keys(t).forEach(function (e) {
                n.forEach(function (n) {
                    n.setAttribute(e, t[e]);
                });
            }), this;
        }
        return "string" == typeof arguments[0] && arguments.length < 2 ? this[0].getAttribute(arguments[0]) : (this.forEach(function (t) {
            t.setAttribute(e[0], e[1]);
        }), this);
    }
}), Object.assign(bala, {
    extend: Object.assign,
    noop: function noop() { },
    render: function render(e, t) {
        var n = "var p=[];with(this){p.push('" + e.replace(/[\r\t\n]/g, " ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');";
        return new Function(n).apply(t);
    },
    getStyle: function getStyle(e, t) {
        var n,
            i = (e.ownerDocument || document).defaultView;
        return i && i.getComputedStyle ? (t = t.replace(/([A-Z])/g, "-$1").toLowerCase(), i.getComputedStyle(e, null).getPropertyValue(t)) : e.currentStyle ? (t = t.replace(/\-(\w)/g, function (e, t) {
            return t.toUpperCase();
        }), n = e.currentStyle[t], /^\d+(em|pt|%|ex)?$/i.test(n) ? function (t) {
            var n = e.style.left,
                i = e.runtimeStyle.left;
            return e.runtimeStyle.left = e.currentStyle.left, e.style.left = t || 0, t = e.style.pixelLeft + "px", e.style.left = n, e.runtimeStyle.left = i, t;
        }(n) : n) : void 0;
    }
});
var setTransition = function setTransition(e, t) {
    return e.css({
        "-webkit-transition": "all " + t + "s",
        transition: "all " + t + "s"
    });
},
    setTranslate = function setTranslate(e, t) {
        return e.css({
            "-webkit-transform": "translate3d(0, " + t + "px, 0)",
            transform: "translate3d(0, " + t + "px, 0)"
        });
    },
    getDefaultIndex = function getDefaultIndex(e) {
        for (var t = Math.floor(e.length / 2), n = 0; e[t] && e[t].disabled;) {
            if (t = ++t % e.length, ++n > e.length) throw new Error("No selectable item.");
        } return t;
    },
    getDefaultTranslate = function getDefaultTranslate(e, t, n) {
        return (e - getDefaultIndex(n)) * t;
    },
    getMax = function getMax(e, t) {
        return e * t;
    },
    getMin = function getMin(e, t, n) {
        return -t * (n - e - 1);
    };
bala.fn.scroll = function (e) {
    function t(e) {
        c = e, f = +new Date();
    }
    function n(e) {
        u = e;
        var t = u - c;
        setTransition(l, 0), setTranslate(l, h + t), f = +new Date(), d.push({
            time: f,
            y: u
        }), d.length > 40 && d.shift();
    }
    function i(e) {
        if (c) {
            var t = new Date().getTime(),
                n = p - o.bodyHeight / 2;
            if (u = e, t - f > 100) g(Math.abs(u - c) > 10 ? u - c : n - u); else if (Math.abs(u - c) > 10) {
                for (var i = d.length - 1, a = i, s = i; s > 0 && f - d[s].time < 100; s--) {
                    a = s;
                } if (a !== i) {
                    var r = d[i],
                        l = d[a],
                        h = r.time - l.time,
                        v = r.y - l.y,
                        m = v / h,
                        y = 150 * m + (u - c);
                    g(y);
                } else g(0);
            } else g(n - u);
            c = null;
        }
    }
    var a = this,
        o = bala.extend({
            items: [],
            scrollable: ".weui-picker__content",
            offset: 3,
            rowHeight: 34,
            onChange: bala.noop,
            temp: null,
            bodyHeight: 238
        }, e),
        s = o.items.map(function (e) {
            return '<div class="weui-picker__item' + (e.disabled ? " weui-picker__item_disabled" : "") + '">' + e.label + "</div>";
        }).join(""),
        r = bala(this);
    r.find(".weui-picker__content").html(s);
    var l = r.find(o.scrollable),
        c = void 0,
        u = void 0,
        f = void 0,
        h = void 0,
        d = [],
        p = window.innerHeight;
    if (null !== o.temp && o.temp < o.items.length) {
        var v = o.temp;
        o.onChange.call(this, o.items[v], v), h = (o.offset - v) * o.rowHeight;
    } else {
        var m = getDefaultIndex(o.items);
        o.onChange.call(this, o.items[m], m), h = getDefaultTranslate(o.offset, o.rowHeight, o.items);
    }
    setTranslate(l, h);
    var g = function g(e) {
        h += e, h = Math.round(h / o.rowHeight) * o.rowHeight;
        var t = getMax(o.offset, o.rowHeight),
            n = getMin(o.offset, o.rowHeight, o.items.length);
        h > t && (h = t), h < n && (h = n);
        for (var i = o.offset - h / o.rowHeight; o.items[i] && o.items[i].disabled;) {
            e > 0 ? ++i : --i;
        } h = (o.offset - i) * o.rowHeight, setTransition(l, .3), setTranslate(l, h), o.onChange.call(a, o.items[i], i);
    };
    l = r.offAll().on("touchstart", function (e) {
        t(e.changedTouches[0].pageY);
    }).on("touchmove", function (e) {
        n(e.changedTouches[0].pageY), e.preventDefault();
    }).on("touchend", function (e) {
        i(e.changedTouches[0].pageY);
    }).find(o.scrollable), "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch || r.on("mousedown", function (e) {
        t(e.pageY), e.stopPropagation(), e.preventDefault();
    }).on("mousemove", function (e) {
        c && (n(e.pageY), e.stopPropagation(), e.preventDefault());
    }).on("mouseup mouseleave", function (e) {
        i(e.pageY), e.stopPropagation(), e.preventDefault();
    });
};
var regex = /^(\d+)(?:-(\d+))?(?:\/(\d+))?$/g,
    constraints = [[1, 31], [1, 12], [0, 6]];
Schedule.prototype._findNext = function () {
    for (var e; ;) {
        if (this._end.getTime() - this._pointer.getTime() <= 0) throw new Error("out of range, end is " + this._end + ", current is " + this._pointer);
        var t = this._pointer.getMonth(),
            n = this._pointer.getDate(),
            i = this._pointer.getDay();
        if (-1 !== this._months.indexOf(t + 1)) {
            if (-1 !== this._dates.indexOf(n)) {
                if (-1 !== this._days.indexOf(i)) {
                    e = new Date(this._pointer);
                    break;
                }
                this._pointer.setDate(n + 1);
            } else this._pointer.setDate(n + 1);
        } else this._pointer.setMonth(t + 1), this._pointer.setDate(1);
    }
    return e;
}, Schedule.prototype.next = function () {
    var e = this._findNext();
    return this._pointer.setDate(this._pointer.getDate() + 1), {
        value: e,
        done: !this.hasNext()
    };
}, Schedule.prototype.hasNext = function () {
    try {
        return this._findNext(), !0;
    } catch (e) {
        return !1;
    }
};
var cron = {
    parseField: function parseField(e, t) {
        var n,
            i = t[0],
            a = t[1],
            o = [];
        e = e.replace(/\*/g, i + "-" + a);
        for (var s = e.split(","), r = 0, l = s.length; r < l; r++) {
            var c = s[r];
            c.match(regex) && c.replace(regex, function (e, t, s, r) {
                r = parseInt(r) || 1, t = Math.min(Math.max(i, ~~Math.abs(t)), a), s = s ? Math.min(a, ~~Math.abs(s)) : t, n = t;
                do {
                    o.push(n), n += r;
                } while (n <= s);
            });
        }
        return o;
    },
    parse: function parse(e, t, n) {
        var i = this,
            a = e.replace(/^\s\s*|\s\s*$/g, "").split(/\s+/),
            o = [];
        return a.forEach(function (e, t) {
            var n = constraints[t];
            o.push(i.parseField(e, n));
        }), new Schedule(o, t, n);
    }
};
Result.prototype.toString = function () {
    return this.value;
}, Result.prototype.valueOf = function () {
    return this.value;
};
var _sington,
    temp = {};