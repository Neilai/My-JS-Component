/**
 * Created by Neil
 * 2018-03-07 23:27
 */
//同时运动框架
function constantMove(obj, json, time ,fn) {
    clearInterval(obj.timer);//清除定时器，避免重复生成多个定时器
    var speed ={};

    for(var attr in json){
        speed[attr]=(parseInt(json[attr])-parseInt(getStyle(obj,attr)))/20;
    }

    obj.timer = setInterval(function () {
        var flag = true;//假设刚开始时所有运动都已完成
        for (var attr in json) {//遍历json
            var icur = null;
            if (attr == 'opacity') {
                icur = Math.ceil(parseFloat(getStyle(obj, attr)) * 100);
            } else {
                icur = parseInt(getStyle(obj, attr));
            }
            if (attr == 'opacity') {
                obj.style.filter = 'alpha(opacity:' + (icur + speed[attr]) + ')';
                obj.style.opacity = (icur + speed[attr]) / 100;
            } else {
                obj.style[attr] = icur + speed[attr] + 'px';
            }
            if ( ((icur>json[attr])&&speed[attr]<0 ) || ((icur<json[attr])&&speed[attr]>0 )) {
                flag = false;
            }
            else
                obj.style[attr] = json[attr] + 'px';
        }
        if (flag) {//当所有运动都完成时，清除定时器
            clearInterval(obj.timer);
            if (fn) {
                fn();
            }
        }
    }, time);
}