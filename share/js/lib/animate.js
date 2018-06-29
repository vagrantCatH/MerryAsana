/**
 * Created by jf on 2016/12/30.
 */


function animate(obj, target) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var leader = obj.offsetLeft;
        var step = 30;
        step = target > leader ? step : -step;
        if (Math.abs(leader - target) >= Math.abs(step)) {
            leader = leader + step;
            obj.style.left = leader + "px";
        } else {
            clearInterval(obj.timer);
            obj.style.left = target + "px";
        }
    }, 15);
}
