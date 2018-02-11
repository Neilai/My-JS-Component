/**
 * Created by Neil
 * 2018-02-11 14:10
 */
(function(){
    var widget={
        init: function (ele) {
            this.$this=ele;
            var defaults = {
                size:2,
                isRange:true,              //是否选择范围
                limitRange:[],              //有效选择区域的范围
            };
            opts=JSON.parse(this.$this.getAttribute("data-param"))
            this.opts = opts || {};
            for (var w in defaults) {
                if ("undefined" == typeof this.opts[w]) {
                    this.opts[w] = defaults[w];
                }
            }
            console.log(this.opts.limitRange);
            this.$this.innerHTML='<table>\
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
            this.$tbody = this.$this.querySelector('tbody');
            this.$prevYear = this.$this.querySelector(".prevYear");
            this.$prevMonth = this.$this.querySelector(".prevMonth");
            this.$title = this.$this.querySelector(".title");
            this.$nextMonth = this.$this.querySelector(".nextMonth");
            this.$nextYear = this.$this.querySelector(".nextYear");
            this.$back = this.$this.querySelector(".back");
            this._today;         //当天
            this._data;          //日期数据
            this._day;          //日历状态
            this._range=[];
            this._today=this.getDateObj();
            this._day = {
                'year':this._today['year'],
                'month':this._today['month']
            };
            this._data=this.getData()
            this.render(this._data);
        },
        getMonthDays: function(obj) {
            var day = new Date(obj.year, obj.month, 0);
            return day.getDate();
        },
        getData: function(obj) {
            if (typeof obj == 'undefined') {
                obj = this._today;
            }
            this._day = this.getDateObj(obj['year'], obj['month'], 1);  //当月第一天
            var days = this.getMonthDays(this._day); //当月天数
            var data = []; //日历信息
            var obj = {};
            //上月日期
            for (var i = this._day['week']; i > 0; i--) {
                obj = this.getDateObj(this._day['year'], this._day['month'],this._day['day'] - i);
                var info = this.getDateInfo(obj);
//            if (!this.opts.limitRange.length) {
//                info['status'] = 'disabled';
//            }
                info['status'] = 'disabled';
                data.push(info);
            }
            //当月日期
            for (var i = 0; i < days; i++) {
                obj = {
                    'year': this._day['year'],
                    'month': this._day['month'],
                    'day': this._day['day'] + i,
                    'week': (this._day['week'] + i) % 7
                };
                obj['code'] = '' + obj['year'] + (obj['month'] > 9 ? obj['month'] : '0' + obj['month']) + (obj['day'] > 9 ? obj['day'] : '0' + obj['day']);
                var info = this.getDateInfo(obj);
                data.push(info);
            }
            //下月日期
            var last = obj;
            for (var i = 1; last['week'] + i < 7; i++) {
                obj = this.getDateObj(last['year'], last['month'], last['day'] + i);
                var info = this.getDateInfo(obj);
//            if (!this.opts.limitRange.length) {
//                info['status'] = 'disabled';
//            }
                info['status'] = 'disabled';
                data.push(info);
            }
            return data;
        },
        getDateObj: function(year, month, day) {
            var date = arguments.length && year ? new Date(year, month - 1, day) : new Date();
            var obj  = {
                'year': date.getFullYear(),
                'month': date.getMonth() + 1,
                'day': date.getDate(),
                'week': date.getDay()
            };
            obj['code'] = '' + obj['year'] +
                (obj['month'] > 9 ? obj['month'] : '0' + obj['month'])
                + (obj['day'] > 9 ? obj['day'] : '0' + obj['day']);
            return obj;
        },
        getDateInfo: function(obj) {
            if (this.opts.limitRange.length) {
                obj['status'] = 'disabled';
                for (var i = 0; i < this.opts.limitRange.length; i++) {
                    var start = this.opts.limitRange[0];
                    var end = this.opts.limitRange[1];

                    if (start == 'today') {
                        start = this._today['code'];
                    }
                    if (end == 'today') {
                        end = this._today['code'];
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
            if (obj['code'] == this._today['code']) {
                obj['sign'].push('today');
            }
            return obj;
        },
        render: function(data) {
            for (var i = 0; i < data.length; i++) {
                var d = data[i];
                if (d['status'] == 'active') {
                    d['status'] = '';
                }
            }
            if (this._range.length == 2) {
                var start = this._range[0]['code'];
                var end = this._range[1]['code'];
                for (var i = 0; i < data.length; i++) {
                    var d = data[i];
                    if (d['code'] >= start && d['code'] <= end) {
                        if (d['status'] !== 'disabled') {
                            d['status'] = 'active';
                        }
                    }
                }
            } else if (this._range.length == 1) {
                for (var i = 0; i < data.length; i++) {
                    var d = data[i];
                    if (d['code'] == this._range[0]['code']&&d['status'] !== 'disabled') {
                        d['status'] = 'active';
                    }
                }
            }
            var html = '<tr>';
            for (var i = 0, len = data.length; i < len; i++) {
                var day = data[i];
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
            this.$title.innerHTML=this._day['year'] + '年' + this._day['month'] + '月';
            this.$tbody.innerHTML=html;
            this.setValue(this._range);
        },
        setEvent:function(){
            self=this;
            this.$prevMonth.addEventListener("click", function() {
                self._day['month']--;
                self._data = self.getData(self._day);
                self.render(self._data);
            }, false);
            this.$nextMonth.addEventListener("click", function() {
                self._day['month']++;
                self._data = self.getData(self._day);
                self.render(self._data);
            }, false);

            this.$prevYear.addEventListener("click", function() {
                self._day['year']--;
                self._data = self.getData(self._day);
                self.render(self._data);
            }, false);
            this.$nextYear.addEventListener("click", function() {
                self._day['year']++;
                self._data = self.getData(self._day);
                self.render(self._data);
            }, false);
            this.$back.addEventListener("click", function() {
                self._data = self.getData();
                self.render(self._data);
            }, false);
            this.$this.addEventListener("click", function(e) {
                e = e||window.event;
                var oSrc = e.srcElement || e.target;
                if(oSrc.tagName.toUpperCase()=="TD"||oSrc.parentNode.tagName.toUpperCase()=="TD"){
                    var $self=oSrc.parentNode.tagName.toUpperCase()=="TD"?oSrc.parentNode:oSrc;
                    var index = $self.getAttribute('data-id');
                    var day = self._data[parseInt(index)];
                    if (day['status'] != 'disabled') {
                        if (self.opts.isRange) {
                            if (self._range.length != 1) {
                                self._range = [day];
                                self.render(self._data);
                            } else {
                                self._range.push(day);
                                self._range.sort(function(a, b) {
                                    return a['code'] > b['code'];
                                });
                                self.render(self._data);
                            }
                        } else {
                            self._range = [day];
                            self.render(self._data);

                        }
                    }
                }
            }, false);

        },
        setStyle:function () {
            var style=document.createElement("style")
            style.type="text/css"
            text=document.createTextNode(".calendar{font-size: "+16*this.opts.size+"px; border: solid "+2*this.opts.size+"px deepskyblue;margin: auto auto;width :"+350*this.opts.size+"px;}" +
                ".calendar caption{line-height: "+30*this.opts.size+"px;text-align: center;border-bottom: 1px solid #ebebeb;margin-bottom: "+5*this.opts.size+"px;}" +
                ".calendar td span{display: block;width: "+30*this.opts.size+"px;margin: 0 auto;cursor: pointer;}" +
                ".calendar caption a{color:#666;margin:0 "+5*this.opts.size+"px;text-decoration: none;}" +
                ".calendar table{width:100%;}" +
                ".calendar td,.calendar th{height: "+30*this.opts.size+"px;line-height: "+30*this.opts.size+"px;text-align: center;}" +
                ".calendar .back{float: right;}" +
                ".calendar .calendar-today span{font-weight: bold;}" +
                ".calendar .calendar-disabled span{color:#999;}" +
                ".calendar .calendar-active span{background: #39c;color:#fff;border-radius: "+30*this.opts.size+"px;}")
            style.appendChild(text);
            var head=document.getElementsByTagName("head")[0];
            head.appendChild(style);
        },
        setValue:function(value){
            this.$this.setAttribute("data-value",value)
        }
    };
    var ele=document.querySelector(".calendar")
    var calendar=Object.create(widget);
    calendar.setup=function () {
        this.init(ele);
        this.setEvent();
        this.setStyle();
    };
    calendar.setup();
})();
