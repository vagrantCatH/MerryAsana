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
    url: "/v1/enjoy/article/list",
    data: { firstCateId: id, art_id: 0, replace_type: "old" },
    dataType: "json",
    success: function(info) {
      console.log(info);
      var html = template("tmp", info);
      //console.log(html);
      document.querySelector("body").innerHTML = html; 
      $(".top_container").click(function() {
        var id = $(this).attr("data-id");
        window.location.href =
          "http://back2.wojiayujia.cn/static/share/view/article.html";
      });
    }
  });
});
