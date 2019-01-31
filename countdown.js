/**
 * Created by Neil
 * 2018-02-13 21:26
 */
(function () {
    var widget={
        init: function (ele) {
            this.$this = ele;
            var defaults = {
                'format': 'hh:mm:ss',
                'interval': 1000,
                'starttime': '11:50:00',
                'endtime': ''
            };
            opts = JSON.parse(this.$this.getAttribute("data-param"))
            this.opts = opts || {};
            for (var w in defaults) {
                if ("undefined" == typeof this.opts[w]) {
                    this.opts[w] = defaults[w];
                }
            }
            this.$this.innerHTML=this.opts.starttime
            this.timer = null;
            this.isTimestamp = isNaN(this.opts.starttime) || isNaN(this.opts.endtime);
            if (this.isTimestamp) {
                this.start = this.opts.starttime ? this.getTimestamp(this.opts.starttime) : (+new Date());
                this.end = this.getTimestamp(this.opts.endtime);
            } else {
                this.start = this.opts.starttime * 1e3;
                this.end = this.opts.endtime * 1e3;
            }
            this.setValue(this.start);
        },
        count:function(){
            var self = this;
            this.timer = setInterval(function(){
                self.start-=self.opts.interval;
                self.renderDom();
                self.setValue(self.start);
                if(self.start<=self.end){
                    clearInterval(self.timer);
                }
            },self.opts.interval);
        },
        renderDom:function () {
            this.$this.innerHTML=this.renderTime(this.start)["format"];
        },
        getTimestamp:function(str){
            return +new Date(str)||+new Date('1970/1/1 '+str);
        },
        timeFormat:function(fmt,timestamp){
            var date = new Date(timestamp);
            var o = {
                "M+" : date.getMonth()+1,                 //月份
                "d+" : date.getDate(),                    //日
                "h+" : date.getHours(),                   //小时
                "m+" : date.getMinutes(),                 //分
                "s+" : date.getSeconds(),                 //秒
                "q+" : Math.floor((date.getMonth()+3)/3), //季度
                "S"  : date.getMilliseconds()             //毫秒
            };
            if(/(y+)/.test(fmt)){
                fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
            }
            for(var k in o){
                if(new RegExp("("+ k +")").test(fmt)){
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
                }
            }
            return fmt;
        },
        renderTime: function(timestamp) {
            var self = this;
            var date, format;
            format = self.timeFormat(self.opts.format, timestamp);
            return {
                'format': format
            };
        },
        setValue:function(value){
            this.$this.setAttribute("data-value",value)
        }
    };
    var countdown=Object.create(widget);
    ele=document.querySelector(".countdown");
    countdown.setup=function () {
        this.init(ele);
        this.count();
    };
    countdown.setup();
})()