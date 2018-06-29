function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg); //匹配目标参数
  if (r != null) return unescape(r[2]);
  return null; //返回参数值
}
var partner = getUrlParam("id");
var type = getUrlParam("type");

$(document).ready(function() {
  $.ajax({
    type: "post",
    url: "/v1/subject/course/show", //  修改处       http://test.wojiayujia.cn
    headers: {
      token: "anonymous"
    },
    data: {
      associate_type: "Syllabus",
      syllabus_id: partner,
      comment_id: "1",
      replace_type: "old"
    },
    dataType: "json",
    success: function(info) {
      console.log(info);
      var CourseList = info.data.CourseList;
      $(".courseNum").html(CourseList.length + "课时");


      var html = template("tmp", info);
      //                顺序很重要
      document.querySelector("body").innerHTML = html;

      $(".lu").click(function() {
        var id = $(this).attr("data-id");
        window.location.href =
          "http://test.wojiayujia.cn/static/share/view/courseShare.html?id="+id;    //上线修改地址
      });

      $("#con").html(info.data);

      var obj = $(".intro_content");
      $("#show").click(function() {
        if (obj.css("display") == "block") {
          obj.css("display", "-webkit-box");
        } else {
          obj.css("display", "block");
        }
      });

      $("#xiazai,#gengduo,#gengduo1,#gengduo2").click(function() {
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

      //获取需要的标签
      var video = document.querySelector("video");

      var playBtn = document.querySelector(".switch");

      var currProgress = document.querySelector(".curr-progress");

      var currTime = document.querySelector(".curr-time");

      var totaltime = document.querySelector(".total-time");

      var extend = document.querySelector(".extend");

      var start = document.querySelector("#video_start");

      var img = document.querySelector(".video_img1");

      var controls = document.querySelector(".controls");

      var Ttime = 0;
      //      首先：  通过点击 实现 视频的暂停/播放 改变按钮的样式
      //      然后：　获取视频的总时长，放到totalTime中
      //      然后：  当视频播放的时候， 动态谁知crrTime                              的值，并且改变进度条的样式
      //      最后：  实现全屏效果

      start.onclick = function() {
        start.style.display = "none";
        img.style.background = "";
        controls.style.display = "block";
        video.play();
        playBtn.classList.remove("fa-play");
        playBtn.classList.add("fa-pause");
      };

      playBtn.onclick = function() {
        if (video.paused) {
          video.play();
          this.classList.remove("fa-play");
          this.classList.add("fa-pause");
        } else {
          video.pause();
          this.classList.remove("fa-pause");
          this.classList.add("fa-play");
        }
      };

      video.oncanplay = function() {
        //            获取视频的总时长
        Ttime = video.duration;

        //             转换成十分秒的格式
        var h = Math.floor(Ttime / 3600);

        var m = Math.floor((Ttime % 3600) / 60);

        var s = Math.floor(Ttime % 60);

        h = h > 10 ? h : "0" + h;
        m = m > 10 ? m : "0" + m;
        s = s > 10 ? s : "0" + s;

        totaltime.innerHTML = m + ":" + s;
      };

      video.ontimeupdate = function() {
        var Ctime = video.currentTime;

        //转换成十分秒的格式
        var h = Math.floor(Ctime / 3600);

        var m = Math.floor((Ctime % 3600) / 60);

        var s = Math.floor(Ctime % 60);

        h = h > 10 ? h : "0" + h;
        m = m > 10 ? m : "0" + m;
        s = s > 10 ? s : "0" + s;

        if (m >=  1) {
          video.pause();
          playBtn.classList.remove("fa-pause");
          playBtn.classList.add("fa-play");
          controls.style.display = "none";
          video.style.display = "none";
          layer.open({
            title: "提示",
            content: "请下载app后观看完整视频",
            btn: "确定"
          });

          playBtn.classList.remove("fa-pause");
        }

        currTime.innerHTML = m + ":" + s;

        // 动态改变进度条
        var value = Ctime / Ttime;

        currProgress.style.width = value * 100 + "%";
      };

      //全屏
      extend.onclick = function() {
        video.webkitRequestFullScreen();
      };
    }
  });
});

