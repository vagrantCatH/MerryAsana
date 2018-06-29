function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg); //匹配目标参数
  if (r != null) return unescape(r[2]);
  return null; //返回参数值
}

var partner = getUrlParam("id");

$(document).ready(function() {
  $.ajax({
    type: "post",
    url: "/v1/yogaaround/olactivity/show",
    data: { activity_id: 1, associate_type: "Activity" },
    dataType: "json",
    success: function(info) {
      console.log(info);

      var html = template("tmp", info); 
      //  顺序很重要
      document.querySelector("body").innerHTML = html;
      //时间转换
      var star = timestampToTime(info.data.OlaBeginTime);
      var end = timestampToTime(info.data.OlaFinishTime);
      $(".time").html("活动时间:" + star + "至" + end);
      //下载
      $("#xiazai,#xiazai1").click(function() {
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

      //请求
      function changeFrameHeight() {
        var ifm = document.getElementById("mainiframe");
        ifm.height = document.documentElement.clientHeight - 56;
      }
      window.onresize = function() {
        changeFrameHeight();
      };
      $(function() {
        changeFrameHeight();
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
  D = date.getDate() + " ";
  h = date.getHours() + ":00";
  m = date.getMinutes() + ":";
  s = date.getSeconds() + ":";
  return Y + M + D;
}
