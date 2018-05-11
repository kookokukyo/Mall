<template>
<div class="address">
  <Header :title="'添加地址'" :noback="true" :right="false"></Header>
  <div class="mid">
    <div class="content">
      <ul>
        <li class="item_one" @click="focusFix('name')">
          <span>收货人</span>
          <input type="text" v-model="name" ref="name">
        </li>
        <li class="item_one" @click="focusFix('phone')">
          <span>联系电话</span>
          <input type="text" v-model="phone" ref="phone">
        </li>
        <li @click="slotshow=true">
          <mt-cell title="所在地区" is-link>
            <span>{{area ? area : '请选择'}}</span>
          </mt-cell>
        </li>
        <li class="text" @click="focusFix('text')">
          <textarea ref="text" placeholder="详细地址" v-model="text"></textarea>
        </li>
      </ul>
    </div>
  </div>
<div>
<transition name="fade">
  <div class="mask" v-if="slotshow" @click="slotshow = false"></div>
</transition>
<!--弹出层 start-->
<transition name="fade">
  <div class="option" v-if="slotshow">
    <div class="cancle" style="color:#333">选择所在地区</div>
    <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
    <div style="display:flex">
      <div class="cancle" @click="slotshow = false" style="flex:1;color:#333">取消</div>
      <div class="cancle" @click="handleConfirm()" style="flex:1;color:#333">确定</div>
    </div>
  </div>
</transition>
<!--弹出层 end-->
</div>
<div class="bottom">
  <button @click="save()">添加地址</button>
</div>
</div>
</template>
<script>
import Header from "../base/header";
import BScroll from "better-scroll";
import { Cell } from "mint-ui";
import { Picker } from "mint-ui";
import myaddress from "../../common/json/address.json";

export default {
  data() {
    return {
      midscroll: "",
      slotshow: false,
      Slot: "aa",
      area: "",
      area1: "",
      slots: [
        {
          flex: 1,
          values: Object.keys(myaddress),
          className: "slot1",
          textAlign: "center"
        },
        {
          divider: true,
          content: "-",
          className: "slot2"
        },
        {
          flex: 1,
          values: ["北京"],
          className: "slot3",
          textAlign: "center"
        }
      ],
      name: "",
      phone: "",
      text: ""
    };
  },
  components: {
    Header
  },
  methods: {
    save() {
      this.validate.isEmpty(this.name, "联系人不能为空").then(r => {
        this.validate.isEmpty(this.phone, "联系电话不能为空").then(r => {
          this.validate.isEmpty(this.area, "所在地区不能为空").then(r => {
            this.validate.isEmpty(this.text, "详细地址不能为空").then(r => {
              this.toast("地址添加成功")
              this.$router.back();
            });
          });
        });
      });
    },
    onValuesChange(picker, values) {
      if (myaddress[values[0]]) {
        picker.setSlotValues(1, myaddress[values[0]]);
        this.area1 = values.join(" - ");
      }
    },
    handleConfirm() {
      this.area = this.area1;
      this.slotshow = false;
    }
  },
  mounted() {
    this.midscroll = new BScroll(".mid", {
      click: true,
      scrollY: true
    });
  },
  activated() {
    this.$nextTick(() => {
      this.slots[0].defaultIndex = 0;
    });
  },
  deactivated() {
    this.area = "请选择";
    this.name = "";
    this.phone = "";
    this.text = "";
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/animation';
@import '~@/common/stylus/common';

.address {
  width: 100%;
  height: 100vh;
  background: #ececec;

  .mid {
    height: calc(100vh - 40px - 40px);
    overflow: hidden;

    .mint-cell-wrapper {
      padding-left: 0;
      padding-right: cp(30);
      font-size: cp(30);
    }

    .mint-cell-allow-right::after {
      margin-right: cp(30);
    }

    .mint-cell-value {
      font-size: cp(30);
      margin-right: cp(80);
    }

    .item_one {
      input {
        margin-left: cp(20);
        margin-top: cp(20);
        width: cp(550);
        margin-right: cp(50);
        float: right;
        height: cp(60);
      }
    }

    .text {
      height: cp(200);
      line-height: cp(200);

      textarea {
        font-size: cp(30);
        width: 90%;
        margin: 0 auto;
        margin-top: cp(20);
        font-size: cp(30);
        height: cp(140);
        outline: none;
        border: 0;
        resize: none;
      }

      textarea::-webkit-input-placeholder {
        color: #D6D0CA !important;
        font-size: cp(30);
      }

      textarea:-moz-placeholder {
        color: #D6D0CA !important;
        font-size: cp(30);
      }

      textarea::-moz-placeholder {
        color: #D6D0CA !important;
        font-size: cp(30);
      }

      textarea:-ms-input-placeholder {
        color: #D6D0CA !important;
        font-size: cp(30);
      }
    }

    li {
      padding-left: cp(30);
      font-size: cp(30);
      height: cp(100);
      line-height: cp(100);
      text-align: left;
      background: white;
      width: 100%;
      border-bottom: 1pt #f4f4f4 solid;
    }
  }

  .bottom {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 1;

    button {
      width: 100%;
      background: #f60;
      color: white;
      border: 0;
      height: cp(80);
      line-height: cp(80);
      font-size: cp(32);
    }
  }
}

.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1000;
}

.picker {
  padding: cp(30) 0;
  font-size: cp(32) !important;
}

.option {
  position: fixed;
  z-index: 1001;
  width: 100%;
  bottom: 0;
  background: #fff;

  .cancle {
    font-size: cp(30);
    line-height: cp(80);
    border: 1pt solid #eee;
  }
}
</style>
