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
    url: "/v1/school/schoolinfo",
    headers: {
      token: "anonymous"
    },
    data: { id: id },
    dataType: "json",
    success: function(str) {
      //      动态请求
      $.ajax({
        type: "post",
        url: "/v1/school/lessonlist",
        headers: {
          token: "anonymous"
        },
        data: { id: "0", shop: id, ver: "shop" },
        dataType: "json",
        success: function(info) {
          $.ajax({
            type: "post",
            headers: {
              token: "anonymous"
            },
            url: "/v1/center/albumlist",
            data: { yrtid: "3", userid: id },
            dataType: "json",
            success: function(list) {
              str.info = info;
              str.list = list;
              $("#model").html(str.data);

              console.log(str);

              var html = template("tmp", str);
              //                顺序很重要
              document.querySelector("body").innerHTML = html;
              $("#xiazai,#xiazai1,#xiazai2").click(function() {
                var u = navigator.userAgent;
                var isAndroid =
                  u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
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

              $(".catalog").click(function() {
                var id = $(this).attr("data-id");
                window.location.href =
                  "/static/share/view/courseInfo.html?id=" + id;
              });

              console.log(str);
              var a = str.data.sex;
              var c = str.info.data;

              //          判断性别
              if (a == "女") {
                $("#abc").css("display", "none");
              } else {
                $("#cba").hide();
              }
              //   		判断皇冠
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
    }
  });
});
