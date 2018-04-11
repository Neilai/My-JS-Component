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
        }
    };
    ele=document.querySelector(".dialog");
    var dialog=Object.create(widget);
    dialog.setup=function(){
        this.init(ele);
        this.renderDom();
        this.setEvent();
    };
    dialog.setup();
})()