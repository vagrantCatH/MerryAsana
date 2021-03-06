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
    url: "/v1/shop/shopinfo", //修改项
    headers: {
      token: "anonymous"
    },
    data: { id: id }, //修改项
    dataType: "json",
    success: function(str) {
      console.log(str);
      //      动态请求
      $.ajax({
        type: "post",
        url: "/v1/shop/projectlist", //修改项
        headers: {
          token: "anonymous"
        },
        data: { id: "0", shop: id, ver: "shop" }, //修改项
        dataType: "json",
        success: function(info) {
          $.ajax({
            type: "post",
            headers: {
              token: "anonymous"
            },
            url: "/v1/center/albumlist",
            data: { yrtid: "2", userid: id },
            dataType: "json",
            success: function(list) {
              str.info = info;
              str.list = list;
              $("#model").html(str.data);
              var html = template("tmp", str);
              //                顺序很重要
              document.querySelector("body").innerHTML = html;

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
