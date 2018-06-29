$(document).ready(function(){
    $.ajax({
       type:'post',
       headers: {
        token: "anonymous"
      },
       url:'/v1/circle/ftopic/list',
       data:{},
       dataType:'json',
       success:function(info){
           console.log(info);
           console.log(info.data) 
           var html= template('tmp',info);
           document.querySelector('body').innerHTML=html;
           $(".hot_container").click(function() {
            var id = $(this).attr("data-id");
            window.location.href =
              "http://test.wojiayujia.cn/static/share/view/talkShare.html?id=" +id;
          }); 
       }
   })
 })
 
 
 