 function getUrlParam(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg);  //匹配目标参数
            if (r != null) return unescape(r[2]); return null; //返回参数值
         }
    var   partner = getUrlParam('id')
    var   type = getUrlParam('type')

$(document).ready(function(){
	   $.ajax({
     	type:'post',
     	url:'/v1/user/pk/info',
     	data:{id:partner},
     	dataType:'json',
     	success:function(info){
        console.log(info)
             var  data = info.data
             
          	var startArr = [];
        
     		var endArr = [];
     		
     		data.map(function(d) {
       		startArr.push(d.ConEnergyvalue);
//   		console.log(info)
       });
     		//each放到外面来。。。。
     		$(data).each(function (i,o) {
                if(startArr[i] <= 299){
                	data[i].Experience = 299
                }
                else if(startArr[i] <=1799){ 
                	data[i].Experience = 1799
                }
                else if(startArr[i] <=7799){
                	data[i].Experience = 7799
                }
                else if(startArr[i] <=25799){
                	data[i].Experience = 25799
                }
                else if(startArr[i] <=181799){
                	data[i].Experience = 181799
                }
         })
        //   		    生成页面
             $("#model").html(info.data);
             var html= template('tmp',info);
//          顺序很重要
             document.querySelector('body').innerHTML=html;
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


             
             
             
     	      }
      })
})