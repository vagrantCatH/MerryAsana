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
    url: "/v1/public/userinfo",
    data: { id: partner }, //23
    dataType: "json",
    success: function(str) {
      console.log(str);
      $.ajax({
        type: "post",
        url: "/v1/circle/condiary/slimrecord",
        data: { conId: partner, diary_id: "0", replace_type: "old" }, //10
        dataType: "json",
        success: function(info) {
          console.log(info);

          var data = info.data;

          var startArr = [];

          var endArr = [];

          var day = [];
          data.map(function(d) {
            //循环里面了

            var start = timestampToTime(d.CreateTime);
            var end = timestampToTime1(d.CreateTime);
            var dayo = timestampToTime2(d.CreateTime);
            //push到数组中
            startArr.push(start);
            endArr.push(end);
            day.push(dayo);
          });
          //each放到外面来。。。。
          $(data).each(function(i, o) {
            data[i].start = startArr[i];
            data[i].end = endArr[i];
            data[i].day = day[i];
          });

          str.data.abc = info;
          console.log(str);
          $("#model").html(str.data);
          var html = template("tmpo", str);
          //                顺序很重要
          document.querySelector("body").innerHTML = html;

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

          var a = str.data.Sex;
          if (a == "女") {
            $("#abc").css("display", "none");
          } else {
            $("#cba").hide();
          }
          var b = str.data.ConsumerRoleType;
          if (b == 1) {
            $("#hg").show();
          } else {
            $("#hg").hide();
          }
        }
      });
    }
  });
});

function timestampToTime(timestamp) {
  var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  Y = date.getFullYear();
  M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "/";
  D = date.getDate() + " ";
  h = date.getHours() + ":00";
  m = date.getMinutes();
  s = date.getSeconds();
  return Y;
}
function timestampToTime1(timestamp) {
  var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  Y = date.getFullYear() + "-";
  M =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  D = date.getDate() + " ";
  h = date.getHours() + ":00";
  m = date.getMinutes();
  s = date.getSeconds();
  return M;
}

function timestampToTime2(timestamp) {
  var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  Y = date.getFullYear() + "-";
  M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "/";
  D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  h = date.getHours() + ":00";
  m = date.getMinutes();
  s = date.getSeconds();
  return D;
}
