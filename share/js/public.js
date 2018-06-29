/**
 * 公共基础服务类
 */
var localService = {
  /**
   * 表单序列化
   * @param {Object} id：表单id
   */
  parseForm: function(id) {
    if (!jQuery) {
      console.log("请引入jQuery后继续使用");
      return;
    }
    var serializeObj = {};
    var array = $("#" + id).serializeArray();
    var str = $("#" + id).serialize();
    $(array).each(function() {
      if (serializeObj[this.name]) {
        if ($.isArray(serializeObj[this.name])) {
          serializeObj[this.name].push(this.value);
        } else {
          serializeObj[this.name] = [serializeObj[this.name], this.value];
        }
      } else {
        serializeObj[this.name] = this.value;
      }
    });
    return serializeObj;
  },
  /**
   * 接收地址栏中传递的数据
   * @param {Object} name：参数名称
   */
  getQueryString: function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }
};
//app下载地址
$("#xiazai").click(function() {
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
