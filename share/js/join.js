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