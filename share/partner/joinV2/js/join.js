$(function() {
  getUserBaseInfo();
});
/** * 接收地址栏中传递的参数并渲染用户的详细信息
 */

function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg); //匹配目标参数
  if (r != null) return unescape(r[2]);
  return null; //返回参数值
}
var partner = getUrlParam("id");
// var type = getUrlParam("type");
var checkC = getUrlParam("check");
var checkFlag = true;
var model = 1;

function cardurl() {
  var str = "http://test.wojiayujia.cn";
  var abc = "http://back2.wojiayujia.cn";
  return model == 1 ? str : abc;
}

function distCode(){
  $.post(cardurl() +"/v1/shop/partner/share/distCode",{check:checkC},function(result){
    console.log(result)
  });

}
function checkRandom(){
  $.post(cardurl() +"/v1/shop/partner/share/checkRandom",{check:checkC},function(result){
   return result.data.data
  });

}
function laye(data){
  layer.open({
    title: "提示",
    content: data,
    btn: "确定"
  });
}

function getUserBaseInfo() {
  var vm = new Vue({
    el: "#model",
    data: {
      bgUrl: "",
      userName: "",
      level: "",
      sex: "",
      Label: "",
      res: "rescode",
      getPost: {
        tel: "", // 用户的电话
        password: "" // 用户的密码
      }, // 存储获取到的数据and对象
      registerForm: {
        phone: "",
        code: "",
        password: "",
      },
      list: [],
      isDisable: false
    },
    mounted: function() {
      //  在created中  可以开始就执行axios  获取数据
      this.getInfo();
      this.grtInfoa();
      this.getUser();
    },
    methods: {
      submit() {
        var self = this;
        this.isDisable = true;
        setTimeout(() => {
          self.isDisable = false;
        }, 1000);
      },

      hide() {
        $(".mask").css("display", "none");
      },
      /**
       * 获取验证码
       * @param {Object} ele：当前点击元素，为this
       */
      getRandCode: function(ele) {
        var phone = this.registerForm.phone;

        var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;

        if (!phone) {
          laye("手机号不能为空");
          return;
        }
        if (!phoneReg.test(phone)) {
          laye("输入正确手机号");
          return;
        }
        if (checkFlag == false) {
          return;
        }
        var num = 100;
        ele.innerText = num + "s重新获取";
        checkFlag = false;
        var timer = setInterval(function() {
          --num;
          ele.innerText = num + "s重新获取";
          if (num <= 0) {
            ele.innerText = "获取验证码";
            checkFlag = true;
            clearInterval(timer);
          }
        }, 1000);

              axios({
                url: cardurl() + "/v1/public/activity/get/smscode", //  修改处    验证码
                method: "post",
                params: {
                  type: "CHECK",
                  model: 0,
                  phone: phone,
                  partner: partner //用户id  partner
                }
              }).then(function(response) {
                console.log(response);
                distCode()
              });

        console.log(phone);
      },
      /**
       *
       * 表单提交
       */
      doForm: function() {
        var phone = this.registerForm.phone;
        var code = this.registerForm.code;
        var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;

        if (!phone) {
          laye("手机号不能为空");
          return;
        }
        if (!phoneReg.test(phone)) {
          laye("输入正确手机号");
          return;
        }
        if (!code) {
          laye("请输入正确的验证码");
          return;
        }
        if (code.length < 4) {
          laye("验证码不能少于4位字符");
          return;
        }
        var data = {
          phone: phone,
          randCode: code
        };

        axios({
          url: cardurl() + "/v1/public/partner/bind/user", //修改处    提交表单
          method: "post",
          params: {
            phone: phone,
            code: code,
            check: 8888,
            partner: partner //参数
          }
        }).then(function(response) {
          var res = response.data;
          var rescode = res.code;
          if (res.code == res.code) {
            layer.open({
              title: "提示",
              content: res.message,
              btn: "确定"
            });
            axios({
              method: "post",
              url: cardurl() + "/v1/shop/partner/share/distCode",
              params: {
               check:checkC
              }
            }).then(function(response){
              console.log(response)
            })
          }
        });

      },
      getInfo: function() {
        //				var r = window.location.search;
        var self = this;
        axios({
          method: "post",
          url: cardurl() + "/v1/public/userinfo", //修改处        用户信息
          params: {
            id: partner
            //  14809  14128  partner
          }
        }).then(function(response) {
          console.log(response);
          var data = response.data.data;
          self.userName = data.Name;
          self.sex = data.Sex == " " ? 0 : 1;
          self.bgUrl =
            "url(" + data.HeadURL + ")" === "url(?x-oss-process=style/head)"
              ? "url(../img/touxiang_icon@2x.png )"
              : "url(" + data.HeadURL + ")";
          self.level = data.Mlevel;
          self.getPost = data;
          self.Label = data.Label;
        });
      },
      grtInfoa: function() {
        var that = this;
        axios({
          method: "post",
          url: cardurl() + "/v1/shop/partner/card/list",
          params: {
            id: partner
            //  14809  partner    分享卡内容
          }
        }).then(function(response) {
          that.list = response.data.data.List;
        });
      },
      getUser:function(){
        var slfe = checkC
        console.log(slfe)
        axios({
          method: "post",
          url: cardurl() + "/v1/shop/partner/share/checkRandom",
          params: {
           check:checkC
          }
        }).then(function(response) {
         var data = response.data.data
         console.log(data)
         if(data == true){
        
         }else{
          $(".mask").css("display", "none");
          layer.open({
            title: "提示",
            content: "分享卡已使用，请向小馆主重新获取链接",
            btn: "确定"
          });
          $(".bottom-btn").css("display", "none");
         }
        });
      }
      



    }
  });
}
