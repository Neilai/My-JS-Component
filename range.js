/**
 * Created by Neil
 * 2018-02-12 22:31
 */
(function () {
    var widget={
        init: function (ele) {
            this.$this = ele;
            var defaults = {
//                color: blue, //滚动鼠标中轴的单位
                min: 0, //变化范围的最小值
                max: 100, //变化范围的最大值
                value: 1, //默认显示的值
                size:1,
            };
            opts = JSON.parse(this.$this.getAttribute("data-param"))
            this.opts = opts || {};
            for (var w in defaults) {
                if ("undefined" == typeof this.opts[w]) {
                    this.opts[w] = defaults[w];
                }
            }
            this.$value;
            this.$handle;
            this.$window = window;
            this.$document = document;
            this.$body = document.body;
            this._value = this.opts.value;
            this._handle_width;
            this._offset = 0;
            this._width;
            this._length;
            this._cursor_position;
            this.isMouseDown = false;

            this.setStyle();
            this.render();

        },
        render:function(){
            this.$value = document.createElement("div");
            this.$value.className ="value";
            this.$handle = document.createElement("div");
            this.$handle.className = "handle";
            this.$this.appendChild(this.$value);
            this.$this.appendChild(this.$handle);
            this._handle_width = this.$handle.offsetWidth;
            this._width = this.$this.offsetWidth;
            this._length = this._width / (this.opts.max - this.opts.min); //单元宽度

            var move=this._value*this._length
            this.$value.style.width = move + "px";
            this.$handle.style.left = move + "px";
            this._cursor_position = this.offset(this.$this).left; //鼠标位置
            this.isMouseDown = false;

        },
        setStyle:function(){
            var style=document.createElement("style")
            style.type="text/css"
            text=document.createTextNode(" .range{width:"+240*this.opts.size+"px;height:"+4*this.opts.size+"px;margin-bottom:"+15*this.opts.size+"px;border:"+1*this.opts.size+"px solid #e2e2e2;position:relative;}" +
                ".range .value{height:100%;background:#0064cd;}" +
                ".range .handle{position:absolute;display:block;top:"+-3*this.opts.size+"px;width:"+8*this.opts.size+"px;height:"+8*this.opts.size+"px;margin-left:"+-5*this.opts.size+"px;border:"+1*this.opts.size+"px solid #e2e2e2;background:#fff;cursor:default;outline:0;}")
            style.appendChild(text);
            var head=document.getElementsByTagName("head")[0];
            head.appendChild(style);
        },
        setEvent:function() {
            self = this
            this.$this.addEventListener('mousedown', function (e) {
                self.isMouseDown = true;
                self._offset = self.offset(self.$this).left;
                self._cursor_position = e.pageX - self._offset - self.$handle.offsetLeft;
            }, false);
            this.$document.addEventListener('mousemove', function (e) {
                if (self.isMouseDown) {
                    var move = e.pageX - self._offset;
                    if (self._cursor_position > 0 && self._cursor_position < self._handle_width) { //鼠标在手柄中位置，对值的修正
                        move -= self._cursor_position;
                    }
                    move = Math.max(0, move);
                    move = Math.min(move, self._width);
                    self.$value.style.width = move + "px";
                    self.$handle.style.left = move + "px";
                    self._value = Math.round(move / (self._length )) + self.opts.min;
                    self.setValue(self._value)
                }
            }, false);
            this.$document.addEventListener('mouseup', function(e) {
                if (self.isMouseDown) {
                    self.isMouseDown = false;
                }
            }, false);
        },
        offset:function (curEle) {
            var totalLeft = null,
                totalTop = null,
                par = curEle.offsetParent;
            //首先把自己本身的进行累加
            totalLeft += curEle.offsetLeft;
            totalTop += curEle.offsetTop;

            //只要没有找到body，我们就把父级参照物的边框和偏移量累加
            while (par) {
                if (navigator.userAgent.indexOf("MSIE 8.0") === -1) {
                    //不是标准的ie8浏览器，才进行边框累加
                    //累加父级参照物边框
                    totalLeft += par.clientLeft;
                    totalTop += par.clientTop;
                }
                //累加父级参照物本身的偏移
                totalLeft += par.offsetLeft;
                totalTop += par.offsetTop;
                par = par.offsetParent;
            }
            return {
                left: totalLeft,
                top: totalTop
            };
        },
        setValue:function(value){
            this.$this.setAttribute("data-value",value)
        }

    };
    var range=Object.create(widget);
    ele=document.querySelector(".range")
    range.setup=function () {
        this.init(ele);
        this.setEvent();
    }
    range.setup()
})()