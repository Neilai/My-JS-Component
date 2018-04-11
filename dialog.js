/**
 * createElementd by Neil
 * 2018-04-11 13:03
 */
(function () {
    var widget= {
        init: function (ele) {
            this.$this = ele;
            var defaults = {
                size:1,
            };
            opts = JSON.parse(this.$this.getAttribute("data-param"));
            this.opts = opts || {};
            for (var w in defaults) {
                if ("undefined" == typeof this.opts[w]) {
                    this.opts[w] = defaults[w];
                }
            }
            this.$content=this.$this.querySelector(".scrollup-content");
            this.$title=this.$this.querySelector(".dialog-title");
            this.$close;
            this.$buttons;
            this.$button;
            this.$overlay;
        },
        renderDom:function () {
            this.$close=document.createElement("div");
            this.$close.innerHTML="X";
            this.$close.className="dialog-close";
            this.$buttons=document.createElement("div");
            this.$buttons.className="dialog-buttons";
            this.$button=document.createElement("button");
            this.$button.innerHTML="确定";
            this.$buttons.append(this.$button);
            this.$this.append(this.$buttons);
            this.$this.append(this.$close);
            this.$overlay=document.createElement("div");
            this.$overlay.className="dialog-overlay";
            body=document.getElementsByTagName("body")[0]
            body.append(this.$overlay);
        },
        setEvent:function(){
            self=this;
            self.$close.addEventListener('click', function() {
                self.$this.style.display="none";
                self.$overlay.style.display="none";
            }, false);
            // self.$overlay.addEventListener('click', function() {
            //     self.$this.style.display="none";
            //     self.$overlay.style.display="none";
            // }, false);
            self.$button.addEventListener('click', function() {
                self.$this.style.display="none";
                self.$overlay.style.display="none";
            }, false)
        },
        setStyle:function () {
            var style=document.createElement("style")
            style.type="text/css"
            text=document.createTextNode(" .dialog{background:#fff;z-index: 110;width: 320px;height: 200px;position: fixed;margin:auto;left:0;top:0;right:0;bottom: 0;}" +
                ".dialog-title{height:40px;padding-left:8px;background:#cee1ee;line-height:40px;}" +
                ".dialog-content{height:100px;padding:10px;line-height:100px;text-align:center;}" +
                ".dialog-buttons{height:40px;padding:0 20px;line-height:40px;text-align:right;}" +
                ".dialog-buttons button{width:80px;height:22px;border:none;line-height:22px;background:#cee1ee;outline:none;cursor:pointer;}" +
                ".dialog-close{position:absolute;top:0;right:0;width:40px;height:40px;line-height:40px;text-align:center;cursor:pointer;}" +
                ".dialog-overlay{position:fixed;width: 100%;height:100%;top:0;right:0;z-index: 100;background: rgba(0,0,0,0.3);bottom: 0;left: 0;}");
            style.appendChild(text);
            var head=document.getElementsByTagName("head")[0];
            head.appendChild(style);
        },
    };
    ele=document.querySelector(".dialog");
    var dialog=Object.create(widget);
    dialog.setup=function(){
        this.init(ele);
        this.renderDom();
        this.setEvent();
        this.setStyle();
    };
    dialog.setup();
})()