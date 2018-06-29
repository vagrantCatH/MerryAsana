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
    url: "/v1/yogaaround/wfp/show",
    data: { wfp_id: partner },
    dataType: "json",
    success: function(info) {
      console.log(info);
      var mySwiper = new Swiper("#adv", {
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: true
        },
        pagination: {
          el: ".swiper-pagination"
        }
      });
      var html = template("tmp", info);
      //       顺序很重要
      document.querySelector("body").innerHTML = html;

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

      // function reinitIframe(){
      //   var iframe = document.getElementById("test");
      //   try{
      //   var bHeight = iframe.contentWindow.document.body.scrollHeight;
      //   var dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
      //   var height = Math.max(bHeight, dHeight);
      //   iframe.height = height;
      //   console.log(height);
      //   }catch (ex){}
      //   }
      //   window.setInterval("reinitIframe()", 200);

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
    }
  });
});
