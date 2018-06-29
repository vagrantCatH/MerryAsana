function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg);  //匹配目标参数
  if (r != null) return unescape(r[2]); return null; //返回参数值
}
var partner= getUrlParam('id')

document.getElementById("mainiframe").src="/v1/enjoy/article/detail/"+partner;

function changeFrameHeight(){
  var ifm= document.getElementById("mainiframe");
  ifm.height=document.documentElement.clientHeight-56;
  }
  window.onresize=function(){ changeFrameHeight();}
  $(function(){changeFrameHeight();});
  

$("#xiazai").click(function() {
  var u = navigator.userAgent;
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  console.log(isiOS);
  if(isiOS != true){
      window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=cn.org.rar.iwantyoga"       	 
  }else{
      window.location.href =  "https://itunes.apple.com/cn/app/id1025617296"
  }
});


 