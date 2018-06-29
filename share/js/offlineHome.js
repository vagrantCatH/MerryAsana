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
    headers: {
        token: "anonymous"
      },
    url: "/v1/shop/activelist",
    data: { state_type: "History" },
    dataType: "json",
    success: function(info) { 
      console.log(info);
      var data = info.data;

      var startArr = [];

      var endArr = [];

      var day = [];
      data.map(function(d) {
        //循环里面了

        var start = timestampToTime(d.BeginTime);
        var end = timestampToTime(d.EndTime);
        //push到数组中
        startArr.push(start);
        endArr.push(end);
      });
      //each放到外面来。。。。
      $(data).each(function(i, o) {
        data[i].start = startArr[i];
        data[i].end = endArr[i];
      });

      // str.data.abc = info;
      console.log(info);

      var html = template("tmp", info);
      //console.log(html);
      document.querySelector("body").innerHTML = html;
      $(".al").click(function() {
        var id = $(this).attr("data-id");
        window.location.href =
          "http://test.wojiayujia.cn/static/share/view/offlinesharing.html?id=" +id +"&&kind=";
      });
    }
  });
});
function timestampToTime(timestamp) {
  var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  Y = date.getFullYear() + "年";
  M =(date.getMonth() + 1 < 10?  (date.getMonth() + 1) : date.getMonth() + 1) + "月";
  D = (date.getDate() < 10 ? "0" + (date.getDate()) : date.getDate()) + "号";
  h = date.getHours() + ":00";
  m = date.getMinutes() + ":";
  s = date.getSeconds() + ":";
  return  Y + M + D;
}