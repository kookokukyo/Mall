<template>
<div class="myCommission">
  <div class="fixed">
    <Header :title="'我的佣金'" :noback="true" :right="false"></Header>
    <div class="top">
      <img src="~@/common/images/commission@2x.png" alt="">
      <p>{{price}}<span>元</span></p>
      <div class="clear"></div>
    </div>
    <p class="title">佣金明细</p>
  </div>
  <div class="list">
    <div class="content">
      <div class="item" v-for="(item,index) in list">
        <div class="left">
          <p>{{item.name}}</p>
          <p>{{item.time}}</p>
        </div>
        <div class="middle">
          <p>{{item.title}}</p>
        </div>
        <div class="right">
          <p>+{{item.price}}</p>
        </div>
      </div>
    </div>  
  </div>
</div>
</template>
<script>
import Header from "../base/header";
import BScroll from "better-scroll";

export default {
  data() {
    return {
      midscroll: "",
      price: "1000.00",
      list: [
        {
          name: "周五",
          time: "11 - 8",
          title: "棉阻燃布+MJD25",
          price: "900.00"
        },
        {
          name: "周晶",
          time: "11 - 8",
          title: "棉阻燃布+MJD25",
          price: "900.00"
        },
        {
          name: "周五",
          time: "11 - 8",
          title: "棉阻燃布+MJD25",
          price: "900.00"
        },
        {
          name: "周晶",
          time: "11 - 8",
          title: "棉阻燃布+MJD25",
          price: "900.00"
        },
        {
          name: "周晶",
          time: "11 - 8",
          title: "棉阻燃布+MJD25",
          price: "900.00"
        },
        {
          name: "周晶",
          time: "11 - 8",
          title: "棉阻燃布+MJD25",
          price: "900.00"
        },
        {
          name: "周晶",
          time: "11 - 8",
          title: "棉阻燃布+MJD25",
          price: "900.00"
        },
        {
          name: "周晶",
          time: "11 - 8",
          title: "棉阻燃布+MJD25",
          price: "900.00"
        },
        {
          name: "周晶",
          time: "11 - 8",
          title: "棉阻燃布+MJD25",
          price: "900.00"
        },
        {
          name: "周晶",
          time: "11 - 8",
          title: "棉阻燃布+MJD25",
          price: "900.00"
        },
        {
          name: "周晶",
          time: "11 - 8",
          title: "棉阻燃布+MJD25",
          price: "900.00"
        }
      ]
    };
  },
  components: {
    Header
  },
  mounted() {
    this.midscroll = new BScroll(".list", {
      click: true,
      scrollY: true
    });
  },
  activated() {}
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/common';

.clear {
  clear: both;
}

.myCommission {
  width: 100%;
  background: #ececec;
  height: 100vh;

  .fixed {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
  }

  .top {
    background: #f60;
    width: 100%;
    height: cp(320);
    line-height: cp(320);

    img {
      float: left;
      width: cp(200);
      margin: cp(50) cp(30) 0 cp(80);
    }

    p {
      color: white;
      font-size: cp(80);
      text-align: left;

      span {
        font-size: cp(24);
      }
    }
  }

  .title {
    text-align: left;
    font-size: cp(32);
    height: cp(70);
    line-height: cp(70);
    padding-left: cp(30);
    background: #ececec;
  }

  .list {
    margin-top: cp(470);
    width: 100%;
    height: calc(100vh - 40px - 160px - 35px);

    .item {
      display: flex;
      width: 100%;
      height: cp(140);
      border-bottom: 1pt #f6f6f6 solid;
      background: white;

      .left {
        flex: 1;
        font-size: cp(30);
        color: #cccccc;
        align-self: center;
        text-align: center;
        line-height: cp(50);
      }

      .middle {
        flex: 2;
        align-self: center;
        font-size: cp(36);
      }

      .right {
        flex: 1;
        align-self: center;
        font-size: cp(30);
        color: #f60;
        text-align: right;
        padding-right: cp(30);
      }
    }
  }
}
</style>
