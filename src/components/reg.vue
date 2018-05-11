<template>
  <div class="reg">
    <div class="top">
      <mt-header title="注册">
        <mt-button slot="left" icon="back" @click="$router.back()"></mt-button>
        <mt-button slot="right" @click="$router.replace('/login')">登录</mt-button>
      </mt-header>
    </div>
    <div class="mid">
      <div class="list">
        <div class="item" @click="focusFix('phone')">
          <span class="iconfont">&#xe6ee;</span><input type="phone" v-model="phone" ref="phone" placeholder="请输入手机号码">
        </div>
        <div class="item code">
          <span class="iconfont">&#xe6a0;</span><input type="phone" placeholder="请输入验证码" v-model="code" @click="focusFix('code')" ref="code">
          <button class="btn" @click="getcode()" v-if="!codetime">获取验证码</button>
          <button class="btn disabled" v-else>{{codetext}}</button>
        </div>
        <div class="item" @click="focusFix('password')">
          <span class="iconfont">&#xe62d;</span><input type="password" v-model="password" ref="password" placeholder="请输入密码">
        </div>
        <div class="item reg_btns">
         <button class="reg_btn" @click="reg()">注册</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
let Base64 = require('js-base64').Base64;

export default {
  data() {
    return {
      phone: "",
      password: "",
      code: "",
      codetext: "60秒",
      codetime: false,
      timeout: null
    };
  },
  methods: {
    reg() {
      this.validate.isEmpty(this.phone, "手机号码不能为空").then(r => {
        this.validate.phone(this.phone).then(r => {
          this.validate.isEmpty(this.password, "密码不能为空").then(r => {
            this.validate.isEmpty(this.code, "验证码不能为空").then(r => {

              this.postData('validate',{encodedPhoneNum:Base64.encode(this.phone)}).then(data => {
                if (data.result=='success') {
                  this.toast(data.message);
                  this.$router.replace("/login");
                }else{
                this.postData('register',{encodedPhoneNum:Base64.encode(this.phone),encodedCode:Base64.encode(this.code),encodePassword:Base64.encode(this.password)}).then(data => {
                if (data.result=='success') {
                  this.toast("注册成功");
                  this.$router.replace("/login");
                }else{
                  this.toast("注册失败");
                }
              })
                }
              })

            });
          });
        });
      });
    },
    getcode() {
      this.validate.isEmpty(this.phone, "手机号码不能为空").then(r => {
        this.validate.phone(this.phone).then(r => {

          let phone = Base64.encode(this.phone);
          this.postData('code',{encodedPhoneNum:phone}).then(data => {
            if (data.result=='success') {
              this.toast(data.message);
              this.codetime = true;
              let secode = 60;
              let that = this;
              this.timeout = setInterval(() => {
              if (secode > 0) {
                secode--;
              } else {
              clearInterval(that.timeout);
              this.codetime = false;
              }
              this.codetext = secode + "秒";
              }, 1000);
            }else{
              this.toast("验证码发送失败");
            }
          })
        });
      });
    }
  },
  mounted() {
    this.midscroll = new BScroll(".mid", {
      click: true,
      scrollY: true
    });
  },
  deactivated() {
    this.phone = "";
    this.password = "";
    this.code = "";
    let that = this;
    clearInterval(that.timeout);
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/common';

.reg {
  .top {
    .mint-header {
      background: #f60 !important;
      color: #fff !important;
      height: cp(80) !important;
    }

    .mint-button-icon {
      padding: cp(20) !important;
      margin: cp(-20) !important;
    }

    .mint-header-title {
      font-size: cp(32) !important;
      color: #fff !important;
    }
  }

  .mid {
    width: 100%;
    overflow: hidden;
    height: calc(100vh - 40px);
    background: url('~@/common/images/loginbg@2x.png') no-repeat bottom;
    background-size 100%

    .list {
      padding-top: cp(100);

      .item {
        text-align: left;
        width: 80%;
        border-bottom: 1pt #f5f5f5 solid;
        margin: 0 auto;
        font-size: cp(30);
        margin-top: cp(60);
        height: cp(80);
        line-height: cp(80);

        .iconfont {
          font-size: cp(50);
          margin-right: cp(30);
          margin-left: cp(10);
          color: #999;
        }

        input {
          border: 0;
          outline: 0;
          width: 80%;
          height: cp(80);
          line-height: cp(80);

          &::-webkit-input-placeholder, -moz-input-placeholder, -ms-input-placeholder {
            color: #bebebe;
          }
        }

        .reg_btn {
          width: 100%;
          height: cp(100);
          line-height: cp(100);
          background: white;
          border: 1pt #ff6600 solid;
          color: #ff6600;
          font-size: cp(36);
          border-radius: cp(50);
          outline: 0;
        }
      }

      .reg_btns {
        height: cp(100);
        line-height: cp(100);
      }

      .code {
        input {
          width: 50%;
        }

        .btn {
          float: right;
          height: cp(80);
          line-height: cp(80);
          background: white;
          border: 1pt #ff6600 solid;
          color: #ff6600;
          width: cp(200);
          border-radius: cp(10);
          outline: none;
        }

        .disabled {
          border: 1pt #bebebe solid;
          color: #bebebe;
        }
      }
    }
  }
}
</style>
