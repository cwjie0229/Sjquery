/**
 * Created by cuiwjie on 2017/7/28.
 */
(function (window) {
    window.SJquery = window.$ = function (selector,obj) {
        return new SJquery(selector,obj);
    };
    var core_version = '1.0.0';
    SJquery = function(selector,obj){
        var obj=obj||document;
        this.elements = [];//创建一个空数组，用来存放节点对象
        if(!selector){
            return;
        }
        if (typeof selector == 'string') {
            switch (selector.charAt(0)) {
                case '#' :
                    this.elements.push(this.getId(selector.substring(1)));
                    break;
                case '.' :
                    this.elements = this.getClass(selector.substring(1));
                    break;
                default :
                    this.elements = this.getTag(selector);
            }
        }else if(typeof selector=="object"){
            if (selector != undefined) {
                this.elements[0] = selector;
            }
        } else if (typeof selector == 'function') {
            this.ready(selector);
        }
    };

    SJquery.fn = SJquery.prototype = {
        SJquery: core_version,
        ready: function (fn) {
            if (fn == null) {
                fn = document;
            }
            var load = window.onload;
            if (typeof window.onload != 'function') {
                window.onload = fn;
            } else {
                window.onload = function () {
                    load();
                    fn();
                };
            }
        },
        trim: function (str, type) {
            var type = type || "b";
            /*判断需要去除空格的情况*/
            if (type == "l") {
                return str.replace(/^\s*/g, "");//去除左边的空格
            } else if (type == "r") {
                return str.replace(/\s*$/g, "");//去除右边的空格
            } else if (type == "b") {
                return str.replace(/^\s*|\s*$/g, "");//去除左右边的空格
            } else if (type == "all") {
                return str.replace(/\s*/g, "");//去除全部空格
            }
        },
        eq: function (num) {
            var eles = this.elements[num];
            this.elements = [];
            this.elements[0] = eles;
            return this;
        },
        getFirst: function () {
            return this.elements[0];//没有实现连缀
        },
        getLast: function () {
            return this.elements[this.elements.length - 1];//没有实现连缀
        },
        get: function (index) {
            return index === undefined ? slice.call(this) : this[index >= 0 ? index : index + this.length];
        },
        each: function (callback) {
            emptyArray.every.call(this, function (el, idx) {
                return callback.call(el, idx, el) !== false
            });
            return this
        },
        length: function () {
            return this.elements.length;
        },
        index: function () {
            var children = this.elements[0].parentNode.children;
            for (var i = 0; i < children.length; i++) {
                if (this.elements[0] == children[i]) return i;
            }
        },
        getId: function (id) {
            return (typeof id !== 'string') ? id : document.getElementById(id);
        },
        getClass: function (className, parentNode) {
            var node = null, temps = [];
            if (parentNode != undefined) {
                node = parentNode;
            } else {
                node = document;
            }
            var nodes = node.getElementsByTagName('*');
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i].className == className) {
                    temps.push(nodes[i]);
                }
            }
            return temps;
        },
        getTag: function (tag, parentNode) {
            var node = null, temps = [];
            if (parentNode != undefined) {//parentNode与undefined同是对象，数据类型要一致
                node = parentNode;
            } else {
                node = document;
            }
            var tags = node.getElementsByTagName(tag);
            for (var i = 0; i < tags.length; i++) {
                temps.push(tags[i]);
            }
            return temps;
        },
        html: function (str) {
            for (var i = 0; i < this.elements.length; i++) {
                this.elements[i].innerHTML = str;
            }
            return this;
        },
        click: function (fn) {
            for (var i = 0; i < this.elements.length; i++) {
                this.elements[i].onclick = fn;
            }
        },
        opacity: function (num) {
            for (var i = 0; i < this.elements.length; i++) {
                this.elements[i].style.opacity = num / 100;
                this.elements[i].style.filter = 'alpha(opacity=' + num + ')';
            }
            return this;
        },
        getWindow: function () {
            if (typeof window.innerWidth != 'undefined') {
                return {
                    width: window.innerWidth,
                    height: window.innerHeight
                }
            } else {
                return {
                    width: document.documentElement.clientWidth,
                    height: document.documentElement.clientHeight
                }
            }
        },
        getScrPos: function () {
            return {
                top: document.documentElement.scrollTop || document.body.scrollTop,
                left: document.documentElement.scrollLeft || document.body.scrollLeft
            }
        },
        //hide 方法
        hide: function () {
            for (var i = 0; i < this.elements.length; i++) {
                this.elements[i].style.display = 'none'
            }
            return this;
        },
        //show方法
        show: function () {
            for (var i = 0; i < this.elements.length; i++) {
                this.elements[i].style.display = 'block'
            }
            return this;
        },
        //获取节点attr属性
        attr: function (attr, value) {
            for (var i = 0; i < this.elements.length; i++) {
                if (arguments.length == 1) {
                    return this.elements[i].getAttribute(attr);
                } else if (arguments.length == 2) {
                    this.elements[i].setAttribute(attr, value)
                }
            }
            return this;
        },
        addEvent: function (element, type, handler) {
            if (element.addEventListener) {
                element.addEventListener(type, handler, false);
            } else if (element.attachEvent) {
                element.attachEvent('on' + type, function () {
                    handler.call(element)
                })
            } else {
                element['on' + type] = handler;
            }
        },
        removeEvent: function (element, type, handler) {
            if (element.removeEventListener) {
                element.removeEventListener(type, handler, false);
            } else if (element.datachEvent) {
                element.datachEvent('on' + type, hanlder)
            } else {
                element['on' + type] = null;
            }
        },
        //阻止事件冒泡
        stopPropagation: function (ev) {
            if (ev.stopPropagation) {
                ev.stopPropagation();
            } else {
                ev.canelBubble = true;
            }
        },
        //取消事件的默认行为
        preventDefault: function (ev) {
            if (ev.preventDefault) {
                ev.preventDefault();
            } else {
                ev.returnValue = false;
            }
        },
        gettarget: function (ev) {
            return ev.targer || ev.srcElement;
        },
        getEvent: function (ev) {
            var ev = ev || window.event;
            if (!ev) {
                var c = this.getEvent.caller;
                while (c) {
                    if (ev && Event == ev.constructor) {
                        break;
                    }
                    c = c.callerl
                }
            }
            return ev;
        },
        //hover事件
        hover: function (fn1, fn2) {
            for (var i = 0; i < this.elements.length; i++) {
                this.addEvent(this.elements[i], 'mouseover', fn1);
                this.addEvent(this.elements[i], 'mouseout', fn2);
            }
            return this;
        },
        bind: function (type, fn) {
            for (var i = 0; i < this.elements.length; i++) {
                this.addEvent(this.elements[i], type, fn);
            }
            return this;
        },
        //获取包含Class
        getClass: function (elem) {
            return elem.getAttribute && elem.getAttribute("class") || "";
        },
        //添加Class
        addClass: function (value) {
            var classes;
            if (typeof value === "string" && value) {
                classes = value.match(rnothtmlwhite) || [];
                for (var i = 0; i < this.elements.length; i++) {
                    if (!hasClass(this.elements[i], classes)) {
                        this.elements[i].className += ' ' + classes;
                    }
                }
            }
            return this;
        },
        //移除Class
        removeClass: function (value) {
            var classes;
            if (!arguments.length) {
                return this.attr("class", "");
            }
            if (typeof value === "string" && value) {
                classes = value.match(rnothtmlwhite) || [];
                for (var i = 0; i < this.elements.length; i++) {
                    if (hasClass(this.elements[i], classes)) {
                        this.elements[i].className = this.elements[i].className.replace(classes, "");
                    }
                }
            }
            return this;
        },
        //固定定位
        setFixed: function (left, top) {
            var that = this;
            if (window.ActiveXObject && !window.XMLHttpRequest) {
                that.style.position = "absolute";
                timer = setInterval(function () {
                    lefts = document.documentElement.scrollLeft;
                    tops = document.documentElement.scrollTop;
                    for (var i = 0; i < this.elements.length; i++) {
                        this.elements[i].style.left = left + lefts + "px";
                        this.elements[i].style.top = top + tops + "px";
                    }
                }, 50);
            } else {
                for (var i = 0; i < this.elements.length; i++) {
                    this.elements[i].style.position = "fixed";
                    this.elements[i].style.left = left + "px";
                    this.elements[i].style.top = top + "px";
                }

            }
        }
    }
    //插件入口
    SJquery.prototype.extend = function (name,fn) {
        SJquery.prototype[name] = fn;
    };
    var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );
    function stripAndCollapse( value ) {
        var tokens = value.match( rnothtmlwhite ) || [];
        return tokens.join( " " );
    }
    function  getStyle(obj,attr){
        if(obj.currentStyle)
        {
            return obj.currentStyle[attr];
        }else{
            return window.getComputedStyle(obj,null)[attr];
        }
    }
    function hasClass(element, className) {
        return element.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
    }
})(window);
