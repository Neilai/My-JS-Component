/**
 * Created by Neil
 * 2018-02-13 23:21
 */
(function () {
    var widget= {
        init: function (ele) {
            this.$this = ele;
            var defaults = {
                time:50,
            };
            opts = JSON.parse(this.$this.getAttribute("data-param"))
            this.opts = opts || {};
            for (var w in defaults) {
                if ("undefined" == typeof this.opts[w]) {
                    this.opts[w] = defaults[w];
                }
            }
            this.$content=this.$this.querySelector(".scrollup-content")
            this.$this.style.overflow="hidden";
            this.timer=null;
            this.clone();
            this.setTimer();
        },
        clone:function () {
            var self = this;
            var panel = document.createElement("div");
            panel.className = "scrollup-content";
            panel.innerHTML = this.$content.innerHTML;
            this.$this.appendChild(panel);
        },
        setTimer: function() {
            var self = this;
            this.timer = setInterval(function() {
                self.scrollUp();
            }, self.opts.time);
        },
        scrollUp: function() {
            var self = this;
            if (this.$this.scrollTop >= this.$content.scrollHeight) {
                this.$this.scrollTop =0;
            } else {
                this.$this.scrollTop++;
            }
        },
        setEvent:function(){
            self=this
            self.$this.addEventListener('mouseover', function() {
                clearInterval(self.timer);
            }, false);
            self.$this.addEventListener('mouseout', function() {
                self.setTimer();
            }, false);
        }
    };
    ele=document.querySelector(".scrollup");
    var scrollUp=Object.create(widget);
    scrollUp.setup=function(){
        this.init(ele);
        this.setEvent();
    };
    scrollUp.setup();
})()