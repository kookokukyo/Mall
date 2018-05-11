<template>
  <div class="myPersonal">
    <Header :title="'我的个人资料'" :noback="true" :right="false"></Header>
    <div class="mid">
      <div class="list">
        <div class="item" @click="changeHead()">
          <mt-cell title="头像" is-link>
            <img class="avatar" :src="userInfo.avatar || 'http://www.qqzhi.com/uploadpic/2014-09-23/000247589.jpg'" alt="">
          </mt-cell>
        </div>
        <div class="item" @click="change('姓名', 'name', userInfo.name, 12)">
          <mt-cell title="姓名" is-link>
            <span>{{userInfo.name}}</span>
          </mt-cell>
        </div>
        <div class="item" @click="sexVisible = true">
          <mt-cell title="性别" is-link>
            <span>{{userInfo.sex === "" ? "未选择" : (userInfo.sex == 1 ? "男" : "女")}}</span>
          </mt-cell>
        </div>
      </div>
      <div class="list">
        <div class="item" @click="locationVisible = true">
          <mt-cell title="所在地区" is-link>
            <span>{{userInfo.location}}</span>
          </mt-cell>
        </div>
        <div class="item" @click="change('地址', 'addr', userInfo.addr, 32)">
          <mt-cell title="地址" is-link>
            <span>{{userInfo.addr}}</span>
          </mt-cell>
        </div>
        <div class="item" @click="areaVisible = true">
          <mt-cell title="所属大区" is-link>
            <span>{{userInfo.area}}</span>
          </mt-cell>
        </div>
      </div>
      <div class="list">
        <div class="item">
          <mt-cell title="我的简历" is-link to='/myresume'>
            <span>{{userInfo.info ? "已填写" : "未填写"}}</span>
          </mt-cell>
        </div>
        <div class="item" v-show="userInfo.idcardvertify">
          <mt-cell title="身份证信息">
            <span>已审核</span>
          </mt-cell>
        </div>
        <div class="item" v-show="!userInfo.idcardvertify" @click="$router.push('/idCard')">
          <mt-cell title="身份证信息" is-link>
            <span>未上传</span>
          </mt-cell>
        </div>
      </div>
    </div>
  <input class="input-upload" ref="inputUpload" style="display:none" type="file" accept="image/*" @change="picChange($event)">
  <mt-actionsheet :actions="sexActions" v-model="sexVisible"></mt-actionsheet>
  <div>
  <transition name="fade">
  <div class="mask" v-if="locationVisible" @click="locationVisible = false"></div>
  </transition>
  <!--弹出层 start-->
  <transition name="slidY">
  <div class="option" v-if="locationVisible">
  <div class="cancle" style="color:#333">选择所属大区</div>
  <mt-picker :slots="locationSlots" @change="locationChange"></mt-picker>
  <div style="display:flex">
  <div class="cancle" @click="locationVisible = false" style="flex:1;color:#333">取消</div>
  <div class="cancle" @click="locationConfirm()" style="flex:1;color:#333">确定</div>
  </div>
  </div>
  </transition>
  <!--弹出层 end-->
  <transition name="fade">
  <div class="mask" v-if="areaVisible" @click="areaVisible = false"></div>
  </transition>
  <!--弹出层 start-->
  <transition name="slidY">
  <div class="option" v-if="areaVisible">
  <div class="cancle" style="color:#333">选择所在地区</div>
  <mt-picker :slots="areaSlots" @change="areaChange"></mt-picker>
  <div style="display:flex">
  <div class="cancle" @click="areaVisible = false" style="flex:1;color:#333">取消</div>
  <div class="cancle" @click="areaConfirm()" style="flex:1;color:#333">确定</div>
  </div>
  </div>
  </transition>
  <!--弹出层 end-->
  </div>
  </div>
</template>
<script>
import { Cell } from "mint-ui";
import BScroll from "better-scroll";
import { MessageBox, Actionsheet, Picker } from "mint-ui";
import Header from "../base/header";
import myaddress from "../../common/json/address2.json";
import addressVue from "./address.vue";
export default {
  data() {
    return {
      userInfo: {},
      sexVisible: false,
      sexActions: [
        {
          name: "男",
          method: () => {
            this.changeSex(1);
          }
        },
        {
          name: "女",
          method: () => {
            this.changeSex(0);
          }
        }
      ],

      locationSlots: [
        {
          flex: 1,
          values: Object.keys(myaddress),
          className: "slot1"
        },
        {
          flex: 1,
          values: Object.keys(myaddress["北京市"]),
          className: "slot2"
        },
        {
          flex: 1,
          values: myaddress["北京市"]["市辖区"],
          className: "slot3"
        }
      ],
      locationVisible: false,
      location1: "",
      location2: "",
      location3: "",
      areaVisible: false,
      areaSlots: [
        {
          flex: 1,
          values: [
            "华东地区",
            "华南地区",
            "华北地区",
            "东北地区",
            "华中地区",
            "西南地区",
            "西北地区"
          ],
          className: "slot1"
        }
      ]
    };
  },
  components: {
    Header
  },
  methods: {
    changeHead() {
      this.$refs.inputUpload.click();
    },
    picChange(e) {
      let files = e.target.files;
      let that = this;
      if (files && files.length) {
        let reader = new FileReader();
        reader.onload = function(ev) {
          that.userInfo.avatar = ev.target.result;
          that.save();
        };
        reader.readAsDataURL(files[0]);
      }
    },
    change(t, k, o, l) {
      let that = this;
      MessageBox.prompt(" ", "修改" + t, {
        inputPlaceholder: "请输入" + t,
        inputValue: o,
        confirmButtonText: "修改",
        inputValidator: val => {
          return !!val && val.length <= 12;
        },
        inputErrorMessage: t + "不得为空，且少于" + l + "字"
      })
        .then(({ value, action }) => {
          if (value) {
            that.userInfo[k] = value;
            that.save();
          }
        })
        .catch(r => {});
    },
    changeSex(sex) {
      this.userInfo.sex = sex;
      this.sexVisible = false;
      this.save();
    },
    save() {
      window.localStorage.setItem("userInfo", JSON.stringify(this.userInfo));
    },
    locationChange(picker, val) {
      picker.setSlotValues(1, Object.keys(myaddress[val[0]]));
      picker.setSlotValues(2, myaddress[val[0]][val[1]]);
      this.location1 = val[0];
      this.location2 = val[1];
      this.location3 = val[2];
    },
    locationConfirm() {
      this.locationVisible = false;
      this.userInfo.location =
        this.location1 + " " + this.location2 + " " + this.location3;
      this.save();
    },
    areaChange(picker, val) {
      this.area = val[0];
    },
    areaConfirm() {
      this.areaVisible = false;
      this.userInfo.area = this.area;
      this.save();
    }
  },
  activated() {
    this.checkLogin()
      .then(r => {
        this.userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
      })
      .catch(r => {
        this.$router.back();
      });
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/common';

.myPersonal {
  width: 100%;
  height: 100vh;
  background: #ececec;

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
    .list {
      margin-bottom: cp(10);

      .item {
        width: 100%;
        background: white;
        border-bottom: 1pt #ececec solid;

        .mint-cell-value {
          .avatar {
            width: cp(70);
            height: cp(70);
            border-radius: 50%;
          }
        }
      }
    }
  }
}

.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.option {
  position: fixed;
  background: #fff;
  bottom: 0;
  width: 100%;
  z-index: 10001;

  .cancle {
    color: #999;
    height: 1.333333rem;
    line-height: 1.333333rem;
    font-size: 0.373333rem;
  }
}

.mint-msgbox-confirm {
  color: #f60 !important;
}
</style>
