<template>
  <div class="confirmOrder">
    <Header :title="'成品订单确认'" :noback="true" :right="false"></Header>
    <div class="mid">
      <div class="content">
        <div class="place">
        <div @click="$router.push('/addressList')">
          <mt-cell title="" is-link>
            <span v-if="place">{{place}}</span>
            <span v-else class="choose">选择配送地址</span>
            <img slot="icon" src="~@/common/images/place@2x.png" width="16">
          </mt-cell>
        </div>
          
          <div class="line">
            <img src="~@/common/images/line.png" alt="">
          </div>
        </div>
        <div class="product">
          <p class="title">产品型号：曼泽纳007</p>
          <p class="style"><span class="shape">床型</span> <span>长方形</span> <span class="size">尺寸 </span> <span>1</span> <span class="num">数量 </span> <span>1</span></p>
        </div>
        <div class="project">
          <ul>
            <li @click="focusFix('projectName')">项目名称<input type="text" v-model="projectName" ref="projectName"></li>
            <li @click="focusFix('hotelName')">酒店名称<input type="text" v-model="hotelName" ref="hotelName"></li>
            <li  @click="sheetVisible01=true">
              <mt-cell title="物流" is-link>
                <span v-if="invoice01">自取</span>
                <span v-else>物流配送</span>
              </mt-cell>
            </li>
          </ul>
        </div>
        <div class="invoice">
          <div class="title" @click="sheetVisible=true">
            <mt-cell title="需要发票" is-link>
              <span v-if="invoice">是</span>
              <span v-else>否</span>
            </mt-cell>
          </div>
          <ul v-if="invoice">
            <li @click="focusFix('invoiceTitle')">发票抬头<input type="text" v-model="invoiceTitle" ref="invoiceTitle"></li>
            <li @click="focusFix('creditCode')">社会信用代码<input type="text" v-model="creditCode" ref="creditCode"></li>
          </ul>
        </div>
      </div>
    </div>
    
    <div class="bottom">
      <p>总价：<span>￥{{price}}.00</span></p>
      <button @click="save()">暂存订单</button>
      <button class="submit" @click="submit()">提交订单</button>
    </div>
    <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
    <mt-actionsheet :actions="actions01" v-model="sheetVisible01"></mt-actionsheet>
  </div>
</template>
<script>
import Header from "../base/header";
import BScroll from "better-scroll";
import { Cell } from "mint-ui";
import { Actionsheet } from "mint-ui";

export default {
  data() {
    return {
      num: 1,
      price: 10000,
      invoice: true,
      invoice01: true,
      actions: [],
      actions01: [],
      sheetVisible01: false,
      sheetVisible: false,
      midscroll: "",
      projectName: "",
      hotelName: "",
      invoiceTitle: "",
      creditCode: "",
      place: ""
    };
  },
  components: {
    Header
  },
  methods: {
    subtract() {
      if (this.num > 0) {
        this.num--;
        this.price = 10000 * this.num;
      }
    },
    add() {
      this.num++;
      this.price = 10000 * this.num;
    },
    submit() {
      this.validate.isEmpty(this.place, "地址不能为空").then(r => {
        this.validate.isEmpty(this.projectName, "项目名称不能为空").then(r => {
          this.validate.isEmpty(this.hotelName, "酒店名称不能为空").then(r => {
            if (this.invoice == true) {
              this.validate
                .isEmpty(this.invoiceTitle, "发票抬头不能为空")
                .then(r => {
                  this.validate
                    .isEmpty(this.creditCode, "社会信用代码不能为空")
                    .then(r => {
                      window.localStorage.setItem("cart", "");
                      this.$router.replace("/submitSuccess");
                    });
                });
            } else {
              window.localStorage.setItem("cart", "");
              this.$router.replace("/submitSuccess");
            }
          });
        });
      });
    },
    save() {
      window.localStorage.setItem("cart", "");
      this.toast("订单已保存");
      this.$router.back();
    }
  },
  mounted() {
    this.midscroll = new BScroll(".mid", {
      click: true,
      scrollY: true
    });
  },
  activated() {
    this.place = window.sessionStorage.getItem("place");

    let that = this;
    this.actions = [
      {
        name: "是",
        method: function() {
          that.invoice = true;
        }
      },
      {
        name: "否",
        method: function() {
          that.invoice = false;
        }
      }
    ];
    this.actions01 = [
      {
        name: "自取",
        method: function() {
          that.invoice01 = true;
        }
      },
      {
        name: "物流配送",
        method: function() {
          that.invoice01 = false;
        }
      }
    ];
  },
  deactivated() {
    this.projectName = "";
    this.hotelName = "";
    this.invoiceTitle = "";
    this.creditCode = "";
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/common';

.confirmOrder {
  width: 100%;
  background: #ececec;
  height: 100vh;

  .mint-header {
    z-index: 1;
  }

  .mid {
    width: 100%;
    height: calc(100vh - 40px - 40px);
  }

  .place {
    padding: cp(20) 0;
    background: white;

    .mint-cell-value {
      padding-left: cp(30);
      font-size: cp(28);
      color: #999999;
      text-align: left;
    }
  }

  .mint-cell-value {
    font-size: cp(28);
    color: #999999;
  }

  .mint-cell-allow-right::after {
    width: cp(20);
    height: cp(20);
  }

  .line {
    margin-top: cp(-30);

    img {
      width: 100%;
      height: cp(10);
    }
  }

  .product {
    background: white;
    text-align: left;

    .title {
      font-size: cp(36);
      padding: cp(20) cp(20);
    }

    .style {
      color: #909090;
      font-size: cp(28);
      padding: cp(20) cp(20);

      span {
        display: inline-block;
        text-align: center;
        height: cp(60);
        line-height: cp(60);
        margin-left: cp(10);
      }

      .shape {
        margin-left: 0;
      }

      .size {
        margin-left: cp(70);
      }

      .num {
        margin-left: cp(70);
      }
    }
  }

  .project {
    margin-top: cp(20);
    width: 100%;
    background: white;
    text-align: left;

    li {
      padding-left: cp(20);
      height: cp(100);
      line-height: cp(100);
      font-size: cp(30);
      border-bottom: 1pt #f0f0f0 solid;

      input {
        width: cp(550);
        // float: right;
        height: cp(80);
        margin-top: cp(10);
        margin-left: cp(20);
      }

      .mint-cell-wrapper {
        padding-left: 0;
        font-size: cp(30);
      }

      .mint-cell-value {
        font-size: cp(30);
      }
    }
  }

  .invoice {
    margin-top: cp(20);
    width: 100%;
    background: white;
    text-align: left;

    .title {
      border-bottom: 1pt #f0f0f0 solid;
    }

    li {
      padding-left: cp(20);
      height: cp(100);
      line-height: cp(100);
      font-size: cp(30);
      border-bottom: 1pt #f0f0f0 solid;

      input {
        width: cp(500);
        // float: right;
        margin-left: cp(20);
        height: cp(80);
        margin-top: cp(10);
      }

      .mint-cell-wrapper {
        padding-left: 0;
        font-size: cp(30);
      }

      .mint-cell-value {
        font-size: cp(30);
      }
    }
  }

  .bottom {
    position: fixed;
    left: 0;
    bottom: 0;
    text-align: left;
    display: flex;
    width: 100%;

    p {
      padding-left: cp(20);
      font-size: cp(30);
      display: inline-block;
      background: white;
      width: cp(400);
      height: cp(80);
      line-height: cp(80);
      flex: 2;

      span {
        font-size: cp(40);
        color: #f60;
      }
    }

    button {
      width: cp(200);
      height: cp(80);
      line-height: cp(80);
      font-size: cp(32);
      border: 0;
      color: white;
      background: #f60;
    }

    .submit {
      background: #ff3000;
    }
  }

  .mint-actionsheet-listitem {
    font-size: cp(32);
  }

  .mint-actionsheet-button {
    font-size: cp(32);
  }
}
</style>
