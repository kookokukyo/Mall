<template>
  <div class="idcart">
    <Header :title="'身份证信息'" :noback="true" :right="false"></Header>
    <div class="mid">
      <div class="list">
        <div class="item" @click="focusFix('name')">
          <span>姓名</span><input type="text" placeholder="请填写姓名" v-model="name" ref="name">
        </div>
        <div class="item" @click="focusFix('codes')">
          <span>身份证号</span><input type="text" placeholder="请填写身份证号" v-model="code" ref="codes">
        </div>
        <div class="pic">
          <ul>
            <li v-show="userInfo.idcardf"><img :src="userInfo.idcardf" alt=""><span class="iconfont del" @click="del('f')">&#xe62b;</span></li>
            <li v-show="!userInfo.idcardf" @click="upload('f')"><span class="iconfont">&#xe68d;</span><p>身份证正面</p></li>
            <li v-show="userInfo.idcardb"><img :src="userInfo.idcardb" alt=""><span class="iconfont del" @click="del('b')">&#xe62b;</span></li>
            <li v-show="!userInfo.idcardb" @click="upload('b')"><span class="iconfont">&#xe68e;</span><p>身份证反面</p></li>
            <li v-show="userInfo.idcardh"><img :src="userInfo.idcardh" alt=""><span class="iconfont del" @click="del('h')">&#xe62b;</span></li>
            <li v-show="!userInfo.idcardh" @click="upload('h')"><span class="iconfont">&#xe690;</span><p>手捧身份证</p></li>
          </ul>
          <div class="clear"></div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <button @click="apply()">申请认证</button>
    </div>
    <input class="input-upload" ref="inputUpload" style="display:none" type="file" accept="image/*" @change="picChange($event)">
  </div>
</template>
<script>
import Header from "../base/header";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      name: "",
      code: "",
      midscroll: null,
      userInfo: {},
      sign: ""
    };
  },
  components: {
    Header
  },
  methods: {
    apply() {
      this.validate.isEmpty(this.name, "姓名不能为空").then(r => {
        this.validate.isChinese(this.name, "姓名格式不正确").then(r => {
          this.validate.isEmpty(this.code, "身份证号码不能为空").then(r => {
            this.validate
              .isEmpty(this.userInfo.idcardf, "请上传身份证正面照片")
              .then(r => {
                this.validate
                  .isEmpty(this.userInfo.idcardb, "请上传身份证反面照片")
                  .then(r => {
                    this.validate
                      .isEmpty(this.userInfo.idcardh, "请上传手持身份证照片")
                      .then(r => {
                        let reg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/;
                        if (reg.test(this.code)) {
                          this.userInfo.name = this.name;
                          this.userInfo.idcardno = this.code;
                          this.userInfo.idcardvertify = true
                          this.save()
                          this.toast("提交成功");
                          this.$router.back()
                        } else {
                          this.toast("身份证号码不正确");
                        }
                      });
                  });
              });
          });
        });
      });
    },
    upload(sign) {
      this.sign = sign;
      this.$refs.inputUpload.click();
    },
    picChange(e) {
      let files = e.target.files;
      let that = this;
      if (files && files.length) {
        let reader = new FileReader();
        reader.onload = function(ev) {
          that.userInfo["idcard" + that.sign] = ev.target.result;
          that.save();
        };
        reader.readAsDataURL(files[0]);
      }
    },
    save() {
      window.localStorage.setItem("userInfo", JSON.stringify(this.userInfo));
    },
    del(sign) {
      this.userInfo["idcard" + sign] = "";
      this.save();
    }
  },
  mounted() {
    this.midscroll = new BScroll(".mid", {
      click: true,
      scrollY: true
    });
  },
  activated() {
    this.checkLogin()
      .then(r => {
        this.userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
        this.name = this.userInfo.name;
        this.code = this.userInfo.idcardno;
      })
      .catch(r => {
        this.$router.back();
      });
  }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/common';

.clear {
  clear: both;
}

.idcart {
  width: 100%;
  height: 100vh;
  background: #ececec;

  .mid {
    text-align: left;
    overflow: hidden;
    height: calc(100vh - 40px - 40px);

    .list {
      .item {
        background: white;
        padding: 0 cp(20);
        height: cp(80);
        line-height: cp(80);
        font-size: cp(30);
        border-bottom: 1pt #ececec solid;

        span {
          display: inline-block;
          width: cp(150);
        }

        input {
          width: 70%;
          height: cp(80);
          line-height: cp(80);
          margin-left: cp(20);
        }
      }

      .pic {
        background: white;
        border-bottom: 1pt #ececec solid;
        padding-bottom: cp(40);

        li {
          float: left;
          width: 47%;
          height: cp(240);
          margin: cp(40) 1.5% 0;
          text-align: center;
          border: 1px solid #ccc;
          box-sizing: border-box;
          position: relative;

          img {
            width: 100%;
            height: cp(236);
          }

          .iconfont:first-child {
            display: inline-block;
            width: 100%;
            height: cp(160);
            line-height: cp(180);
            font-size: cp(130);
            color: #999;
          }

          .iconfont.del {
            color: #f00;
            position: absolute;
            top: cp(10);
            right: cp(10);
          }

          p {
            font-size: cp(30);
            line-height: cp(80);
          }
        }
      }
    }
  }

  .bottom {
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;

    button {
      width: 100%;
      background: #ff6600;
      height: cp(80);
      line-height: cp(80);
      color: white;
      border: 0;
      outline: none;
      font-size: cp(30);
    }
  }
}
</style>
