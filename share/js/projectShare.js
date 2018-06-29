function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg); //匹配目标参数
  if (r != null) return unescape(r[2]);
  return null; //返回参数值
}
var id = getUrlParam("id");
var shop = getUrlParam("shop");

$(document).ready(function() {
  $.ajax({
    type: "post",
    headers: {
      token: "anonymous"
    },
    url: "/v1/shop/project/detail",
    data: { id: id, shop: shop },
    dataType: "json",
    success: function(info) {
      console.log(info);

      var html = template("tmp", info);
      //                顺序很重要
      document.querySelector("body").innerHTML = html;

      $("#Details").html(info.data.Project.Detail);

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
