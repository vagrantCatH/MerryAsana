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
var type = getUrlParam("type");

var checkFlag = true;

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
        check: 8888
      },
      list: [],
      isDisable: false
    },
    mounted: function() {
      //  在created中  可以开始就执行axios  获取数据
      this.getInfo();
      // this.grtInfoa()
    },
    methods: {
      submit() {
		    var self = this;
        self.isDisable = true;
        setTimeout(() => {
		    self.isDisable = false;
          console.log(1);
        }, 1000);
	  },
	  show(){
	       var obj = $(".mask");
            if (obj.css("display") == "none") {
                obj.css("display", "block");
             }
	  },
	  showo(){
			var obj = $(".mask1");
             if (obj.css("display") == "none") {
                 obj.css("display", "block");
              }
	  },
	  hide(){
        $(".mask").css("display", "none");
	  },
	  hide1(){
        $(".mask1").css("display", "none");
	  },
      /**
       * 获取验证码
       * @param {Object} ele：当前点击元素，为this
       */
      getRandCode: function(ele) {
        var phone = this.registerForm.phone;

        var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;

        if (!phone) {
          layer.open({
            title: "提示",
            content: "手机号不能为空",
            btn: "确定"
          });
          return;
        }
        if (!phoneReg.test(phone)) {
          layer.open({
            content: "输入正确手机号",
            btn: "确定"
          });
          return;
        }
        if (checkFlag == false) {
          return;
		}
    // 验证码倒计时
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
          url: "/v1/public/activity/get/smscode", //  修改处    验证码
          method: "post",
          params: {
            type: "CHECK",
            model:0,
            phone: phone,
            partner: partner //用户id  partner
          }
        }).then(function(response) {
          console.log(response);
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
        var check = 8888;
        var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;

        if (!phone) {
          layer.open({
            title: "提示",
            content: "手机号不能为空",
            btn: "确定"
          });
          return;
        }
        if (!phoneReg.test(phone)) {
          layer.open({
            title: "提示",
            content: "输入正确手机号",
            btn: "确定"
          });
          return;
        }
        if (!code) {
          layer.open({
            title: "提示",
            content: "请输入正确的验证码",
            btn: "确定"
          });
          return;
        }
        if (code.length < 4) {
          layer.open({
            title: "提示",
            content: "验证码不能少于4位字符",
            btn: "确定"
          });
          return;
        }

        var data = {
          phone: phone,
          randCode: code
        };
        axios({
          url: "/v1/public/partner/bind/user", //修改处    提交表单
          method: "post",
          params: {
            phone: phone,
            code: code,
            check: 8888,
            partner: partner      
          }
        }).then(function(response) {
          var res = response.data;
          var rescode = res.code;
          console.log(rescode);
          if (res.code == res.code) {
            layer.open({
              title: "提示",
              content: res.message,
              btn: "确定"
            });
          }
        });
      },
      getInfo: function() {
        //				var r = window.location.search;
        var self = this;
        axios({
          method: "post",
          url: "/v1/public/userinfo", //修改处        用户信息
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
      }
      //  grtInfoa:function(){
      // 	var that = this
      // 	axios({
      // 		method: 'post',
      // 		url: '/v1/shop/partner/card/list',
      // 		params: {
      // 			id:partner
      // 			//  14809  partner    分享卡内容
      // 		},
      // 	})
      // 	.then(function (response) {
      // 		that.list = response.data.data.List
      // 	});
      //  }
    }
  });
}
