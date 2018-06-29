function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg); //匹配目标参数
  if (r != null) return unescape(r[2]);
  return null; //返回参数值
}
var id = getUrlParam("id");

$(document).ready(function() {
  $.ajax({
    type: "post",
    url: "/v1/circle/fyaquestion/list",
    headers: {
      token: "anonymous" 
    },
    data: {},
    dataType: "json",
    success: function(info) {
      console.log(info);

      var data = info.data;
      var startArr = []; 
      data.map(function(d) {
        var start = timestampToTime(d.CreateTime);
        startArr.push(start);
      });
      //each放到外面来。。。。
      $(data).each(function(i, o) {
        data[i].time = startArr[i];
      });

      var html = template("tmp", info);
      document.querySelector("body").innerHTML = html;
      $(".title_top").click(function() {
        var id = $(this).attr("data-id");
        window.location.href =
          "http://test.wojiayujia.cn/static/share/view/onlineShare.html?id=" +
          id;
      });
    }
  });
});
function timestampToTime(timestamp) {
  var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  Y = date.getFullYear() + "-";
  M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  D = date.getDate() + "";
  h = date.getHours() + ":00";
  m = date.getMinutes() + ":";
  s = date.getSeconds() + ":";
  return Y + M + D;
}
