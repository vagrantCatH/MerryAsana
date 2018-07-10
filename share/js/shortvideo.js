function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg); //匹配目标参数
  if (r != null) return unescape(r[2]);
  return null; //返回参数值
}
var videoId = getUrlParam("videoId")
var model = 2;               //修改参数
function cardurl() {
  var str = "http://test.wojiayujia.cn";
  var abc = "http://back2.wojiayujia.cn";
    return model == 1 ? str : abc;
}

$(document).ready(function () {
  $.ajax({
    type: 'get',
    url: cardurl() + '/v1/vod/aliyun/auth',
    data: {},
    dataType: 'json',
    success: function (info) {
      var str = JSON.parse(info.data)
      console.log(str)
      var AccessKeySecret = str.Credentials.AccessKeySecret;
      var AccessKeyId = str.Credentials.AccessKeyId;
      var SecurityToken = str.Credentials.SecurityToken;
      console.log(AccessKeySecret)


      $.ajax({
        type: "post",
        url: cardurl() + '/v1/vod/vodmanage/getVideoInfo',
        header: {
          token: "abc"
        },
        data: { videoid: videoId },
        dataType: 'json',
        success: function (info) {
          console.log(info)
          var id = info.data.YogaVod.Id

          $.ajax({
            type: "post",
            url: cardurl() + '/v1/vod/vodmanage/getVideoInfo',
            header: {
              token: "abc"
            },
            data: { vodid: id },
            dataType: 'json',
            success: function (info) {


              console.log(info)
              if (info.data.VodCommentInfo != null) {
                var ed = info.data.VodCommentInfo
                var startArr = []

                ed.map(function (d) {
                  //循环里面了
                  var ova = timeAgo(d.Createdtime * 1000)
                  //push到数组中
                  startArr.push(ova);
                });
                // each放到外面来。。。。
                $(ed).each(function (i, o) {
                  ed[i].VodComment.start = startArr[i];
                });
              }



              var html = template("tmp", info);
              //                顺序很重要
              document.querySelector(".baog").innerHTML = html;

              $("#xiazai,#gengduo1").click(function () {
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

              $(".shipinxx").css("height", "")

              var url = info.data.UserPhoto
              if (url == "?x-oss-process=style/head") {
                $(".left1").attr("src", "../img/touxiang_icon@2x.png")
              } else {
                $(".left1").attr("src", url)
              }

              var name = info.data.UserName
              console.log(name)
              $(".sname").html(name)

              var time = info.data.YogaVod.Createdtime
              var date = new Date(time); //时间对象
              var str = date.getTime();
              var list = timeAgo(str)
              $(".time").html(list)
              console.log(list)
              var content = info.data.YogaVod.Content
              if (content == "") {
                $(".message").css("display", "none");
              }
              var VodUrl = info.data.YogaVod.VodUrl
              console.log(VodUrl)

              var height =  window.screen.height;
              var str = (height - 150)+"px";
              console.log(str)
              var player = new Aliplayer({
                id: 'J_prismPlayer',
                height:str,
                x5_video_position: "top",
                cover: VodUrl,
                x5_type: true,
                autoplay: false,
                playsinline: true,
                preload: false,
                rePlay: true,
                //播放方式四：使用STS方式播放
                vid: videoId,    //videoId
                accessKeyId: AccessKeyId,
                securityToken: SecurityToken,
                accessKeySecret: AccessKeySecret,
              }, function (player) {
                console.log('播放器创建好了。')
              });


            }
          })
        }
      })
    }
  });
});
function timeAgo(o) {
  var n = new Date().getTime();
  var f = n - o;
  var bs = (f >= 0 ? '前' : '后');//判断时间点是在当前时间的 之前 还是 之后
  f = Math.abs(f);
  if (f < 6e4) { return '刚刚' }//小于60秒,刚刚
  if (f < 36e5) { return parseInt(f / 6e4) + '分钟' + bs }//小于1小时,按分钟
  if (f < 864e5) { return parseInt(f / 36e5) + '小时' + bs }//小于1天按小时
  if (f < 2592e6) { return parseInt(f / 864e5) + '天' + bs }//小于1个月(30天),按天数
  if (f < 31536e6) { return parseInt(f / 2592e6) + '个月' + bs }//小于1年(365天),按月数
  return parseInt(f / 31536e6) + '年' + bs;//大于365天,按年算
}
