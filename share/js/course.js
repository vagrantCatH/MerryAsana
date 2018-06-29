
$(document).ready(function(){
    $.ajax({
       type:'post',
       url:'/v1/subject/index/listV2',
       headers: {
        token: "anonymous"
      },
       data:{},
       dataType:'json',
       success:function(info){
           console.log(info);
           var  star = [];
           var star = info.data.StarWorkShopV2
           $.each(star,function(index,value){
            $.each(value.List,function(index,obj){
                star.push(timestampToTime(obj.Startedtime));
                info.star = star
           });
           var abc = {"star":"","end":""}
           var list = info.star
            abc.star = list[1];
            abc.end= list[2];
            info.abc = abc
       });

           var  dz = window.location.host;
           var html= template('tmp',info);
           document.querySelector('body').innerHTML=html;

           $(".jichu").click(function(){
            var id = $(this).attr("data-id");
            console.log(id)
            window.location.href="http://test.wojiayujia.cn/static/share/view/courseShare.html?id="+id    //正式版上线修改地址为back2
         });
         $(".mingxing").click(function(){
            var id = $(this).attr("data-id");
            window.location.href="http://test.wojiayujia.cn/static/share/view/masterCourse.html?id="+id   //正式版上线修改地址为back2
         })
         $(".mingshi").click(function(){
            var id = $(this).attr("data-id");
            window.location.href="http://test.wojiayujia.cn/static/share/view/teacherWork.html?id="+id   //正式版上线修改地址为back2
         })
       }
   })
 })
 function timestampToTime(timestamp) {
    var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    Y = date.getFullYear() + "-";
    M =(date.getMonth() + 1 < 10? "0" + (date.getMonth() + 1): date.getMonth() + 1) + "月";
    D = date.getDate() + "号";
    h = date.getHours() + ":00";
    m = date.getMinutes() + ":";
    s = date.getSeconds() + ":";
    return  M + D;
  }