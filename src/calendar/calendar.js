/**
 * Created by Neil
 * 2019-01-29 21:01
 */
class Calendar{
    constructor(selector,arg={isRange:true,limitRange:[]}){
        this.limitRange=arg["limitRange"]
        this.isRange=arg["isRange"]
        this.$ele=document.querySelector(selector)
        this.$ele.innerHTML='<table>\
                <caption>\
                    <a class="prevYear" href="javascript:;">&lt;&lt;</a>\
                    <a class="prevMonth" href="javascript:;">&lt;</a>\
                    <span class="title"></span>\
                    <a class="nextMonth" href="javascript:;">&gt;</a>\
                    <a class="nextYear" href="javascript:;">&gt;&gt;</a>\
                    <a class="back" href="javascript:;">今天</a>\
                </caption>\
                <thead>\
                    <tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr>\
                </thead>\
                <tbody></tbody>\
            </table>';
        this.$tbody = this.$ele.querySelector('tbody');
        this.$prevYear = this.$ele.querySelector(".prevYear");
        this.$prevMonth = this.$ele.querySelector(".prevMonth");
        this.$title = this.$ele.querySelector(".title");
        this.$nextMonth = this.$ele.querySelector(".nextMonth");
        this.$nextYear = this.$ele.querySelector(".nextYear");
        this.$back = this.$ele.querySelector(".back");
        this.range=[];
        this.today=this.getDateObj();
        this.day = {
            'year':this.today['year'],
            'month':this.today['month']
        };
        this.data=this.getData()
        this.render(this.data);
        this.addEvent()
    }
    render(){
        //依据range更新
        for (var i = 0; i < this.data.length; i++) {
            var d =this.data[i];
            if (d['status'] == 'active') {
                d['status'] = '';
            }
        }
        if (this.range.length == 2) {
            var start = this.range[0]['code'];
            var end = this.range[1]['code'];
            for (var i = 0; i < this.data.length; i++) {
                var d = this.data[i];
                if (d['code'] >= start && d['code'] <= end) {
                    if (d['status'] !== 'disabled') {
                        d['status'] = 'active';
                    }
                }
            }
        } else if (this.range.length == 1) {
            for (var i = 0; i < this.data.length; i++) {
                var d = this.data[i];
                if (d['code'] == this.range[0]['code']&&d['status'] !== 'disabled') {
                    d['status'] = 'active';
                }
            }
        }
        var html = '<tr>';
        for (var i = 0, len = this.data.length; i < len; i++) {
            var day = this.data[i];
            var arr = [];
            for (var s = 0; s < day['sign'].length; s++) {
                arr.push("calendar"+ '-' + day['sign'][s]);
            }
            if (day['status']) {
                arr.push("calendar" + '-' + day['status']);
            }
            var className = arr.join(' ');
            html += '<td' + (className ? ' class="' + className + '"' : '') + ' data-id="' + i + '">\
                        '+ '<span>' + day['day'] + '</span>' + '\
                    </td>';
            if (i % 7 == 6 && i < len - 1) {
                html += '</tr><tr>';
            }
        }
        html += '</tr>';
        this.$title.innerHTML=this.day['year'] + '年' + this.day['month'] + '月';
        this.$tbody.innerHTML=html;
    }
    addEvent(){
        this.$prevMonth.addEventListener("click", ()=> {
            this.day['month']--;
            this.data = this.getData(this.day);
            this.render(this.data);
        }, false);
        this.$nextMonth.addEventListener("click",()=> {
            this.day['month']++;
            this.data = this.getData(this.day);
            this.render(this.data);
        }, false);

        this.$prevYear.addEventListener("click",()=> {
            this.day['year']--;
            this.data = this.getData(this.day);
            this.render(this.data);
        }, false);
        this.$nextYear.addEventListener("click", ()=> {
            this.day['year']++;
            this.data = this.getData(this.day);
            this.render(this.data);
        }, false);
        this.$back.addEventListener("click", ()=> {
            this.data = this.getData();
            this.render(this.data);
        }, false);
        this.$ele.addEventListener("click", (e)=> {
            e = e||window.event;
            var oSrc = e.srcElement || e.target;
            if(oSrc.tagName.toUpperCase()=="TD"||oSrc.parentNode.tagName.toUpperCase()=="TD"){
                var $self=oSrc.parentNode.tagName.toUpperCase()=="TD"?oSrc.parentNode:oSrc;
                var index = $self.getAttribute('data-id');
                var day = this.data[parseInt(index)];
                if (day['status'] != 'disabled') {
                    if (this.isRange) {
                        if (this.range.length != 1) {
                            this.range = [day];
                            this.render(this.data);
                        } else {
                            this.range.push(day);
                            this.range.sort(function(a, b) {
                                return a['code'] > b['code'];
                            });
                            this.render(this.data);
                        }
                    } else {
                        this.range = [day];
                        this.render(this.data);
                    }
                }
            }
        }, false);
    }
    getDateObj(year, month, day) {
        var date = arguments.length && year ? new Date(year, month - 1, day) : new Date();
        var obj  = {
            'year': date.getFullYear(),
            'month': date.getMonth() + 1,
            'day': date.getDate(),
            'week': date.getDay()
        };
        obj['code'] = '' + obj['year'] + (obj['month'] > 9 ? obj['month'] : '0' + obj['month']) + (obj['day'] > 9 ? obj['day'] : '0' + obj['day']);
        return obj;
    }
    getDateInfo(obj) {
        if (this.limitRange.length) {
            obj['status'] = 'disabled';
            for (var i = 0; i < this.limitRange.length; i++) {
                var start = this.limitRange[0];
                var end = this.limitRange[1];
                if (start == 'today') {
                    start = this.today['code'];
                }
                if (end == 'today') {
                    end = this.today['code'];
                }
                if (start > end) {
                    start = [end, end = start][0];
                }
                if (obj['code'] >= start && obj['code'] <= end) {
                    obj['status'] = '';
                    break;
                }
            }
        }
        obj['sign'] = [];
        if (obj['code'] == this.today['code']) {
            obj['sign'].push('today');
        }
        return obj;
    }
    getMonthDays(obj) {
        var day = new Date(obj.year, obj.month, 0);
        return day.getDate();
    }
    getData(obj) {
        if (typeof obj == 'undefined') {
            obj = this.today;
        }
        this.day = this.getDateObj(obj['year'], obj['month'], 1);  //当月第一天;
        var days  = this.getMonthDays(this.day); //当月天数
        var data  = []; //日历信息
        var obj   = {};
        //上月日期
        for (var i = this.day['week']; i > 0; i--) {
            obj = this.getDateObj(this.day['year'], this.day['month'],this.day['day'] - i);
            var info = this.getDateInfo(obj);
            info['status'] = 'disabled';
            data.push(info);
        };
        //当月日期
        for (var i = 0; i < days; i++) {
            obj = {
                'year': this.day['year'],
                'month': this.day['month'],
                'day': this.day['day'] + i,
                'week': (this.day['week'] + i) % 7
            };
            obj['code'] = '' + obj['year'] + (obj['month'] > 9 ? obj['month'] : '0' + obj['month']) + (obj['day'] > 9 ? obj['day'] : '0' + obj['day']);
            var info = this.getDateInfo(obj);
            data.push(info);
        }
        //下月日期
        var last = obj;
        for (var i = 1; last['week'] + i < 7||data.length<42; i++) {
            obj = this.getDateObj(last['year'], last['month'], last['day'] + i);
            var info = this.getDateInfo(obj);
            info['status'] = 'disabled';
            data.push(info);
        }

        return data;
    }
    value(){
        return this.range
    }
}
window.Calendar=Calendar