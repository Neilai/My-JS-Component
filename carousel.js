/**
 * Created by Neil
 * 2018-02-11 14:47
 */
(function(){
    var widget= {
        init: function (ele) {
            this.$this = ele;
            this.renderWrapper();
            var defaults = {
                speeds: 30,
                autoPlay: true,
                times: 3000,
                size:1
            }
            opts = JSON.parse(this.$this.getAttribute("data-param"))
            this.opts = opts || {};
            for (var w in defaults) {
                if ("undefined" == typeof this.opts[w]) {
                    this.opts[w] = defaults[w];
                }
            }
            this.setStyle();
            this.$slider = this.$this.querySelector(".carousel-wrapper");
            this.$prevBtn;
            this.$nextBtn;
            this.$bullet;
            this.imgW = this.$slider.children[0].offsetWidth;
            this.len = this.$slider.children.length;
            this.sliding = false;
            this.num = 1;
            this.timer = null;
            this.timers = null;
            this.setValue(this.num);
            this.clone();
            this.renderBtn();
            this.renderCircle();
            if(this.opts.autoPlay){
                this.plays();
            }
        },
        clone: function() {
            var fir = this.$slider.children[0].cloneNode(true);
            var last = this.$slider.children[this.len - 1].cloneNode(true);
            this.$slider.appendChild(fir);
            this.$slider.insertBefore(last, this.$slider.children[0]);
            this.len = this.$slider.children.length;
            this.$slider.style.left = -this.imgW + 'px';
        },
        setValue:function(value){
            this.$this.setAttribute("data-value",value)
        },
        setStyle:function () {
            var style=document.createElement("style")
            style.type="text/css"
            text=document.createTextNode(".carousel{width:"+800*this.opts.size+"px;height: "+300*this.opts.size+"px;margin: "+20*this.opts.size+"px auto;overflow: hidden;position: relative;}" +
                ".carousel-wrapper{width: 100%;height: 100%;position: absolute;display: -webkit-box;display: box;}"+
                ".carousel-slide{background: #ccc;list-style: none;width: 100%;height: 100%;text-align: center;font-size: "+18*this.opts.size+"px;display: -webkit-box;display: -ms-flexbox;display: -webkit-flex;display: flex; -webkit-box-pack: center; -ms-flex-pack: center; -webkit-justify-content: center;justify-content: center; -webkit-box-align: center; -ms-flex-align: center; -webkit-align-items: center;align-items: center;}" +
                ".carousel-pagination{position: absolute;text-align: center;z-index: 10;bottom: "+10*this.opts.size+"px;left: 0;width: 100%;}" +
                ".carousel-pagination-bullet{width: "+8*this.opts.size+"px;height: "+8*this.opts.size+"px;display: inline-block;border-radius: 100%;background: #fff;opacity: .5;margin: 0 "+4*this.opts.size+"px;}" +
                ".carousel-pagination-bullet-active{opacity: 1;background: #ff0;}" +
                ".carousel-button{width: "+100*this.opts.size+"px;height: 100%;position: absolute;top: 0;background-color: #333;z-index: 1;cursor: pointer;filter: alpha(opacity:20);opacity: 0.2; -webkit-transition: all .2s ease-in; -moz-transition: all .2s ease-in; -ms-transition: all .2s ease-in; -o-transition: all .2s ease-in;transition: all .2s ease-in;}" +
                ".carousel-button.active{filter: alpha(opacity:60);opacity: 0.6;}" +
                ".carousel-button-prev{left:0;}" +
                ".carousel-button-next{right:0;}");
            style.appendChild(text);
            var head=document.getElementsByTagName("head")[0];
            head.appendChild(style);
        },
        setEvent:function () {
            self=this;
            if(this.opts.autoPlay) {
                self.$this.addEventListener('mouseover', function (e) {
                    self.stops();
                }, false);
                self.$this.addEventListener('mouseout', function (e) {
                    self.plays();
                }, false);
            }

            this.$prevBtn.addEventListener('click', function(e) {
                self.go(self.imgW);
                self.showBtn();
            }, false);
            this.$nextBtn.addEventListener('click', function(e) {
                self.go(-self.imgW);
                self.showBtn();
            }, false);

            this.$prevBtn.addEventListener('mouseover', function(e) {
                this.classList.add("active");
                this.addEventListener('mouseout', function(e) {
                    this.classList.remove("active");
                }, false);
            }, false);
            this.$nextBtn.addEventListener('mouseover', function(e) {
                this.classList.add("active");
                this.addEventListener('mouseout', function(e) {
                    this.classList.remove("active");
                }, false);
            }, false);
            for (var i = 0; i < this.$bullet.length; i++) {
                ! function(i) {
                    self.$bullet[i].addEventListener('click', function(e) {
                        if (self.sliding) {
                            return;
                        }
                        if (this.className.indexOf('carousel-pagination-bullet-active') > -1) {
                            return;
                        }
                        var myIndex = i - (self.num - 1);
                        var offset = -self.imgW * myIndex;
                        self.go(offset);
                        self.num = i + 1;
                        self.showBtn();
                    }, false);
                }(i);
            }
        },
        renderBtn: function() {
            self=this;
            prevBtn=document.createElement("div");
            nextBtn=document.createElement("div");
            prevBtn.className="carousel-button"+" "+"carousel-button-prev"
            nextBtn.className="carousel-button"+" "+"carousel-button-next"
            this.$this.append(prevBtn);
            this.$this.append(nextBtn);
            this.$prevBtn=this.$this.querySelector(".carousel-button-prev")
            this.$nextBtn=this.$this.querySelector(".carousel-button-next")
        },
        renderCircle: function() {
            var pagination = document.createElement("div");
            pagination.className = "carousel-pagination";
            for (var i = 0; i < this.len - 2; i++) {
                var btnspan = document.createElement("span");
                btnspan.className = "carousel-pagination-bullet";
                pagination.appendChild(btnspan);
            }
            this.$this.appendChild(pagination);
            this.$bullet = this.$this.querySelectorAll(".carousel-pagination-bullet");
            this.$bullet[0].classList.add("carousel-pagination-bullet-active");
        },
        renderWrapper:function () {
            div=document.createElement("div");
            this.$this.appendChild(div);
            div.className="carousel-wrapper";
            imgs=this.$this.querySelectorAll("img");
            for(var i=0;i<imgs.length;i++)
                div.appendChild(imgs[i]);
        },
        plays: function() {
            self=this;
            this.timers = setInterval(function() {
                self.go(-self.imgW);
                self.showBtn();
            }, self.opts.times);
        },
        stops: function() {
            clearInterval(this.timers)
        },
        go: function(offset) {
            if (!this.sliding) {
                this.sliding = true;
                if (offset < 0) {
                    this.num++;
                    if (this.num > this.len - 2) {
                        this.num = 1;
                    }
                }
                if (offset > 0) {
                    this.num--;
                    if (this.num <= 0) {
                        this.num = this.len - 2
                    }
                }
                self=this;
                var dest = parseInt(this.$slider.style.left) + offset;
                if (parseInt(this.$slider.style.left) < dest || parseInt(this.$slider.style.left) > dest) {
                    self.timer = setInterval(function() {
                        var cur = parseInt(self.$slider.style.left);
                        var speed = (dest - cur) / 10;
                        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                        self.$slider.style.left = parseInt(self.$slider.style.left) + speed + 'px';
                        if (parseInt(self.$slider.style.left) == dest) {
                            clearInterval(self.timer);
                            self.$slider.style.left = dest + 'px';
                            if (dest > -self.imgW) {
                                self.$slider.style.left = -self.imgW * (self.len - 2) + 'px';
                            }
                            if (dest < -self.imgW * (self.len - 2)) {
                                self.$slider.style.left = -self.imgW + 'px';
                            }
                            self.setValue(self.num);
                            self.sliding = false;
                        }
                    }, self.opts.speeds)
                }
            }
        },
        showBtn: function() {
            var num = this.num - 1;
            for (var i = 0; i < this.$bullet.length; i++) {
                this.$bullet[i].classList.remove("carousel-pagination-bullet-active");
            }
            this.$bullet[num].classList.add("carousel-pagination-bullet-active");
        },
    };
    carousel=Object.create(widget)
    ele=document.querySelector(".carousel")
    carousel.setup=function () {
        this.init(ele);
        this.setEvent();
    };
    carousel.setup();
})();