/**
 * Created by Neil
 * 2018-03-08 00:38
 */
//同时运动框架
function startMove(obj, json, time,fn) {
    clearInterval(obj.timer);//清除定时器，避免重复生成多个定时器
    obj.timer = setInterval(function () {
        var flag = true;//假设刚开始时所有运动都已完成
        for (var attr in json) {//遍历json
            var icur = null;
//1.判断类型
            if (attr == 'opacity') {
                icur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
            } else {
                icur = parseInt(getStyle(obj, attr));
            }
//2.算速度
            var speed = (json[attr] - icur) / 10;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
//3.检测停止
            if (icur != json[attr]) {
                flag = false;
            }
            if (attr == 'opacity') {
                obj.style.filter = 'alpha(opacity:' + (icur + speed) + ')';
                obj.style.opacity = (icur + speed) / 100;
            } else {
                obj.style[attr] = icur + speed + 'px';
            }
        }
        if (flag) {//当所有运动都完成时，清除定时器
            clearInterval(obj.timer);
            if (fn) {
                fn();
            }
        }
    }, time);
}