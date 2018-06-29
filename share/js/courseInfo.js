function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg); //匹配目标参数
  if (r != null) return unescape(r[2]);
  return null; //返回参数值
}
var partner = getUrlParam("id");
var type = getUrlParam("type");

$(document).ready(function() {
  $.ajax({
    type: "post",
    url: "/v1/school/lessondetail",
    headers: { token: "anonymous" },
    data: { lesson_id: partner },
    dataType: "json",
    success: function(info) {
      var html = template("tmp", info);
      //                顺序很重要
      document.querySelector("body").innerHTML = html;
      $("#con").html(info.data.Content);

      var time = timestampToTime(info.data.BeginTime);
      var time1 = timestampToTime1(info.data.BeginTime);
      console.log(time, time1);
      $("#time").html(time + "月" + time1 + "日新班开课啦");

      $("#xiazai,#xiazai1,#xiazai2,#xiazai3").click(function() {
        var u = navigator.userAgent;
        var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        console.log(isiOS);
        if (isiOS != true) {
          window.location.href =
            "http://a.app.qq.com/o/simple.jsp?pkgname=cn.org.rar.iwantyoga";
        } else {
          window.location.href = "https://itunes.apple.com/cn/app/id1025617296";
        }
      });
    }
  });
});
function timestampToTime(timestamp) {
  var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  Y = date.getFullYear() + "-";
  M = date.getMonth() + 1;
  D = date.getDate() + " ";
  h = date.getHours() + ":00";
  m = date.getMinutes() + ":";
  s = date.getSeconds() + ":";
  return M;
}
function timestampToTime1(timestamp) {
  var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  Y = date.getFullYear() + "-";
  M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "/";
  D = date.getDate();
  h = date.getHours() + ":00";
  m = date.getMinutes() + ":";
  s = date.getSeconds() + ":";
  return D;
}
