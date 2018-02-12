/**
 * Created by Neil
 * 2018-02-13 00:18
 */
(function () {
    var widget= {
        init: function (ele) {
            this.$this = ele;
            var defaults = {
                direction: "x",
                expose: 30,
                speed: 30
            };
            opts = JSON.parse(this.$this.getAttribute("data-param"))
            this.opts = opts || {};
            for (var w in defaults) {
                if ("undefined" == typeof this.opts[w]) {
                    this.opts[w] = defaults[w];
                }
            }
            this.$list = this.$this.querySelectorAll(".accordion-list");
            this.exposeSize = this.opts.expose;
            if(this.opts.direction=='x'){
                this.direction='left';
                //offsetwidth= width+border+padding
                //展开长度
                this.listSize=this.$list[0].offsetWidth;
                this.translate=this.listSize-this.exposeSize;
                //translate是转换尺寸，意味着从 隐藏到展开需要增加多少尺寸
            }
            else if(this.opts.direction=='y'){
                this.direction='top';
                this.listSize=this.$list[0].offsetHeight;
                this.translate=this.listSize-this.exposeSize;
            }

            var boxWidth = this.listSize + (this.$list.length - 1) * this.exposeSize;
            var boxHeight=parseInt(this.getStyle(this.$list[0],"height"))
            if(this.opts.direction=='x'){
                console.log(boxHeight);
                this.$this.style.width = boxWidth + 'px';
                this.$this.style.height = boxHeight + 'px';
            }else if(this.opts.direction=='y'){
                this.$this.style.height = boxWidth + 'px';
                this.$this.style.width = boxHeight + 'px';
            }

            for (var i = 1, len = this.$list.length; i < len; i++) {
                this.$list[i].style[this.direction] = this.listSize + this.exposeSize * (i - 1) + 'px';
            }
        },
        setEvent:function(){
            var self = this;
            for (var i = 0; i < this.$list.length; i++) {
                (function(i){
                    self.$list[i].addEventListener('click', function() {
                        for (var j = 0; j <= i; j++) {
                            for (var k = 1, len = self.$list.length; k < len; k++) {
                                self.$list[k].style[self.direction] = self.listSize + self.exposeSize * (k - 1) + 'px';
                            }
                            //左边距减小， 减小translate长度
                            self.startmove(self.$list[j],{[self.direction]:parseInt(self.$list[j].style[self.direction]) - self.translate},self.opts.speed)
                        }
                    } ,false);
                })(i)
            }
        },
        setStyle:function(){
            var style=document.createElement("style")
            style.type="text/css"
            text=document.createTextNode(".accordion {margin: auto;overflow: hidden;position: relative;}" +
                ".accordion-list{position: absolute;left: 0}")
            style.appendChild(text);
            var head=document.getElementsByTagName("head")[0];
            head.appendChild(style);
        },
        startmove:function (obj, json, time) {
            var  times;
            if (arguments[2] == undefined) {
                times = 30;
            } else if (typeof time == "number") {
                times = time;
            }
            clearInterval(obj.zzz);
            self=this;
            obj.zzz = setInterval(function() {
                var flag = true;
                for (var attr in json) {
                    var icur = 0;
                    if (attr == 'opacity') {
                        icur = Math.round(parseFloat(self.getStyle(obj, attr)) * 100);
                    } else {
                        icur = parseInt(self.getStyle(obj, attr));
                    }

                    var speed = (json[attr] - icur) / 8;
                    speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

                    if (icur != json[attr]) {
                        flag = false;
                    }
                    if (attr == 'opacity') {
                        icur += speed;
                        obj.style.filter = 'alpha(opacity:' + icur + ')';
                        obj.style.opacity = icur / 100;
                    } else {
                        obj.style[attr] = icur + speed + 'px';
                        //这一句是关键，重置属性
                    }
                }
                if (flag) {
                    clearInterval(obj.zzz);
                }
            }, times)
        },
        getStyle:function (obj, attr) {
            if (obj.currentStyle) {
                return obj.currentStyle[attr];
            } else {
                return getComputedStyle(obj, false)[attr];
            }
        },
    }
    ele=document.querySelector(".accordion")
    var accordion=Object.create(widget);
    accordion.setup=function () {
        this.init(ele)
        this.setStyle()
        this.setEvent()
    }
    accordion.setup()
})()