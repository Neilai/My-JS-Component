/**
 * Created by Neil
 * 2019-01-28 14:44
 */
class Countdown{
    constructor(selector,arg={'format': 'hh:mm:ss', 'interval': 1000, 'startTime': '11:50:00', 'endTime': 0}){
        this.$ele=document.querySelector(selector)
        this.start=arg["startTime"]
        this.end=arg["endTime"]
        this.format=arg["format"]
        this.interval=arg["interval"]
        this.timer = null;
        this.isTimestamp = isNaN(this.start) || isNaN(this.end);
        if (this.isTimestamp) {
            this.start = this.start ? this.getTimestamp(this.start) : (+new Date());
            this.end = this.getTimestamp(this.end);
        } else {
            console.log("this.end");
            this.start = this.start * 1e3;
            this.end = this.end* 1e3;
        }
        console.log(this.start);
        this.$ele.innerHTML=this.renderTime(this.start)["format"];
        this.count()
    }
    renderDom() {
        this.$ele.innerHTML=this.renderTime(this.start)["format"];
    }
    getTimestamp(str){
        return +new Date(str)||+new Date('1970/1/1 '+str);
    }
    timeFormat(fmt,timestamp){
        let date = new Date(timestamp);
        let o = {
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
        for(let k in o){
            if(new RegExp("("+ k +")").test(fmt)){
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
            }
        }
        return fmt;
    }
    renderTime(timestamp) {
        let date = new Date(timestamp);
        let format ;
        if (this.isTimestamp) {
            format = this.timeFormat(this.format, timestamp);
        } else {
            format = timestamp / 1e3;
        }
        return {
            'format': format
        }
    }
    count(){
        this.timer = setInterval(()=>{
            this.start-=this.interval;
            this.renderDom();
            if(this.start<=this.end){
                clearInterval(this.timer);
            }
        },this.interval);
    }
}
window.Countdown=Countdown