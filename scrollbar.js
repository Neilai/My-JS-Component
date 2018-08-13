/**
 * Created by Neil
 * 2018-02-12 19:18
 */
(function () {
    var widget={
        init: function (ele) {
            this.$this = ele;
            var defaults = {
                steps: 50, //滚动鼠标中轴的单位
                slide: 10 //默认移动的距离
            };
            opts = JSON.parse(this.$this.getAttribute("data-param"))
            this.opts = opts || {};
            for (var w in defaults) {
                if ("undefined" == typeof this.opts[w]) {
                    this.opts[w] = defaults[w];
                }
            }
            this.$body = document.body;
            this.$document = document;
            this.$content = this.$this.querySelector(".content");
            this.$track ;
            this.$thumb;
            this._track_offset = 0;																//滚动条的位置
            this._content_position = 0;															//滑块当前相对于滚动条的位置
            this._cursor_position = 0;															//鼠标的位置
            this.isMouseDown = false;
            this._track_length;
            this._content_length;
            this._box_length;
            this._thumb_length;
            this._distance;
            this._room;
            this.render();
            this.setEvent();
        },
        setStyle:function(){
            var width=this.getStyle(this.$this,"width");
            var height=this.getStyle(this.$this,"height");
            this.$content.style.width=parseInt(width)-10+"px"
            this.$track.style.width=10+"px"
            var style=document.createElement("style")
            style.type="text/css"
            text=document.createTextNode(".scrollbar{position: relative;border: 1px solid #e2e2e2;margin: 0 auto 10px;overflow: hidden;}" +
                ".content {position:absolute;margin:0;}" +
                ".track {position: absolute;top: 0;right: 0;height: 100%;}" +
                ".track div {position: absolute;width: 100%;background: #999;border-radius: 4px;}")
            style.appendChild(text);
            var head=document.getElementsByTagName("head")[0];
            head.appendChild(style);
        },
        setEvent:function () {
            var self = this;
            self.$track.addEventListener('mousedown', function(e) {
                self.isMouseDown=true;
                self._track_offset =  self.offset(self.$track).top ;
                self._cursor_position = e.pageY-self._track_offset-self.$thumb.offsetTop;
            }, false);
            this.$document.addEventListener('mousemove', function(e) {
                if(self.isMouseDown){
                    // console.log(1);
                    var move = e.pageY - self._track_offset;
                    if (self._cursor_position > 0 && self._cursor_position < self._thumb_length) {
                        move -= self._cursor_position;
                    }
                    self.slide(move/self.ratio);
                }
            }, false);
            this.$document.addEventListener('mouseup', function(e) {
                self.isMouseDown=false;
                self._cursor_position=0;
            }, false);
            this.$this.addEventListener('DOMMouseScroll',function(e){
                e = e||window.event;
                self.scroll(e)
            },false);
            this.$this.addEventListener('onmousewheel',function(e) {
                e = e || window.event;
                self.scroll(e);
            },false);
        },
        scroll:function(e){
            var self = this;
            e = e||window.event;
            var delta = -e.wheelDelta/120||e.detail/3;
            var move =-this.$content.offsetTop+delta*this.opts.steps;
            if (move > this._room) {
                move = this._room;
            } else if (move < 0) {
                move = 0;
            }
            this.slide(move);
        },
        render:function(){
            var self = this;
            track=document.createElement("div")
            track.className="track"
            thumb=document.createElement("div")
            track.appendChild(thumb);
            this.$this.appendChild(track);
            this.$track = this.$this.querySelector(".track");
            this.$thumb = this.$track.children[0];
            this.setStyle();
            this._track_length = this.$track.offsetHeight;
            this._content_length = this.$content.offsetHeight;
            this._box_length = this.$this.offsetHeight;
            this._thumb_length = this._box_length/this._content_length*this._track_length;
            this._distance = Math.max(this._track_length-this._thumb_length,0);
            this._room = Math.max(this._content_length-this._box_length,0);
            if(this._content_length>this._box_length){
                this.$thumb.style['height']=this._thumb_length+'px';
            }else{
                this.$thumb.style.display="none";
            }
            this.ratio = this._distance+this._room?this._distance/this._room:0;
            this.slide(0);
        },
        offset:function offset(curEle) {
            var totalLeft = null,
                totalTop = null,
                par = curEle.offsetParent;
            //首先把自己本身的进行累加

            totalLeft += curEle.offsetLeft;
            totalTop += curEle.offsetTop;

            //	console.log(totalTop);
            //只要没有找到body，我们就把父级参照物的边框和偏移量累加
            while (par) {
                if (navigator.userAgent.indexOf("MSIE 8.0") === -1) {
                    //不是标准的ie8浏览器，才进行边框累加
                    //累加父级参照物边框
                    totalLeft += par.clientLeft;
                    totalTop += par.clientTop;
                    //console.log(par,totalTop);
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
        slide:function(move) {
            var self = this;
            if (move > this._room) { //对滚轴移动范围做限制
                move = this._room;
            } else if (move < 0) {
                move = 0;
            }
            if (this._room >= 0) {
                this.$thumb.style['top']=move*this.ratio+"px";
                this.$content.style['top']=-move+"px";
            }
            this.setValue(move/this._room);
        },
        getStyle:function (obj, attr) {
            if (obj.currentStyle) {
                return obj.currentStyle[attr];
            } else {
                return getComputedStyle(obj, false)[attr];
            }
        },
        setValue:function(value){
            this.$this.setAttribute("data-value",value)
        }
    };
    ele=document.querySelector(".scrollbar");
    var scrollbar=Object.create(widget);
    scrollbar.setup=function(){
        this.init(ele);
    }
    scrollbar.setup()
})()