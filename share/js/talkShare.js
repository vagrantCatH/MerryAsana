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
    url: "/v1/circle/topic/show", //     修改处   http://test.wojiayujia.cn
    data: { topic_id: "4", topic_id: partner, replace_type: "old" },
    dataType: "json",
    success: function(info) {
      console.log(info);
      var data = info.data.DynamicInfo;
      var startArr = [];

      data.map(function(d) {
        //循环里面了 

        var start = timestampToTime(d.CreateTime);
        //push到数组中
        startArr.push(start);
        //   		console.log(info)
      });
      //each放到外面来。。。。
      $(data).each(function(i, o) {
        data[i].start = startArr[i];
      });
      console.log(data);
      var html = template("tmp", info);
      //       顺序很重要
      document.querySelector("body").innerHTML = html;
      $("#xiazai,#xiazai1,#xiazai2").click(function() {
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
