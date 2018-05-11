<template>
  <div class="service">
    <Header :title="'公司客服信息'" :noback="true" :right="false"></Header>
    <div class="mid">
      <div class="list">
        <div class="item">
          <p>客服微信<span>1212121212</span></p>
        </div>
        <div class="item">
          <p>客服邮箱<span>113151111@qq.com</span></p>
        </div>
        <div class="item">
          <p>客服电话<span><a href="tel://10086">18205000333</a></span></p>
        </div>
        <div class="time">
          <p>客服工作时间：9:00 ~ 21:00</p>
        </div>
      </div>
      
    </div>
    <div class="bottom">
      <p>&copy; 阿斯顿订单大叔大叔的都是对的</p>
    </div>
  </div>
</template>
<script>
import Header from "../base/header";
import BScroll from "better-scroll";

export default {
  data() {
    return {
      midsrcoll: ""
    };
  },
  components: {
    Header
  },
  mounted(){
    this.midscroll = new BScroll(".mid", {
      click: true,
      scrollY: true
    });
  },
  activated() {
    
  }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/common';

.service {
  background: #ececec;
  width: 100%;
  height: 100vh;

  .mid {
    text-align: left;
    font-size: cp(32);
    height: calc(100vh - 40px - 40px);
    overflow: hidden;

    .item {
      background: white;
      height: cp(100);
      line-height: cp(100);
      border-bottom: 1pt #ececec solid;

      p {
        padding: 0 cp(20);

        span {
          float: right;
        }
      }
    }

    .time {
      text-align: right;
      height: cp(100);
      line-height: cp(100);
      padding-right: cp(20);
      color: #bebebe;
    }
  }

  .bottom {
    font-size: cp(28);
    width: 100%;
    height: cp(80);
    line-height: cp(80);
    position: fixed;
    bottom: 0;
    left: 0;
    color #bfbfbf
  }
}
</style>
