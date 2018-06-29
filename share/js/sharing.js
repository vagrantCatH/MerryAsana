function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg); //匹配目标参数
  if (r != null) return unescape(r[2]);
  return null; //返回参数值
}
var partner = getUrlParam("id");
var kind = getUrlParam("kind");

$(document).ready(function() {
  $.ajax({
    type: "post",
    url:"/v1/public/activity/detail", //修改处
    data: { id: partner, kind: kind },
    dataType: "json",
    success: function(info) {
      console.log(info);
      console.log(info.data.recommendHistoryActive);
      if (info.data.recommendHistoryActive !== null) {
        var data = info.data.recommendHistoryActive;
        //在外面定义一个空数组
        var startArr = [];

        var endArr = [];

        data.map(function(d) {
          //循环里面了
          var start = timestampToTime(d.BeginTime);
          //push到数组中
          startArr.push(start);
          var end = timestampToTime1(d.EndTime);
          endArr.push(end);
        });
        //each放到外面来。。。。
        $(data).each(function(i, o) {
          data[i].start = startArr[i];
          data[i].end = endArr[i];
        });
        console.log(data);
      }

      var html = template("tmp", info);
      //                顺序很重要
      document.querySelector("body").innerHTML = html;
      $("#con").html(info.data.activeDetail.Content);
       
      $("#xiazai,#xiazai1").click(function() {
        var u = navigator.userAgent;
        var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        console.log(isiOS);
        if (isiOS != true) {
          window.location.href =
            "http://a.app.qq.com/o/simple.jsp?pkgname=cn.org.rar.iwantyoga";
        } else {
          window.location.href =
            "https://itunes.apple.com/cn/app/id1025617296";
        }
      });

      //      活动介绍
      var obj = $(".content");
      $("#dk").click(function() {
        //给d1绑定一个点击事件;
        if (obj.css("height") == "80px") {
          obj.css("height", "100%");
        } else {
          obj.css("height", "80px");
        }
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
      : date.getMonth() + 1) + "/";
  D = date.getDate() + " ";
  h = date.getHours() + ":00";
  m = date.getMinutes();
  s = date.getSeconds();
  return M + D + h;
}

function timestampToTime1(timestamp) {
  var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  h = date.getHours() + ":00";
  m = date.getMinutes();
  return h;
}
