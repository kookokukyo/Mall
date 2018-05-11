<template>
  <div class="goodsDetail">
    <div class="top">
          <mt-header title="商品详情">
            <mt-button slot="left" icon="back" @click="$router.back()"></mt-button>
            <mt-button slot="right"></mt-button>
          </mt-header>
      </div>
    <div class="mid">
      <div class="content">
         <!-- 轮播 -->
        <div class="swipe">
          <mt-swipe :auto="4000">
            <mt-swipe-item>
              <img src="~@/common/images/mattress.png" alt="">
            </mt-swipe-item>
            <mt-swipe-item>
              <img src="~@/common/images/mattress.png" alt="">
            </mt-swipe-item>
            <mt-swipe-item>
              <img src="~@/common/images/mattress.png" alt="">
            </mt-swipe-item>
          </mt-swipe>
        </div>
        <!-- 价格信息 -->
        <div class="information">
          <!-- <p class="price">￥{{goods.price}}</p> -->
          <p class="text">{{goods.text}}</p>
          <p class="commitment">商家承诺：购买“送货入户并安装”服务，未履行最高可获30000积分赔付</p>
        </div>
        <!-- 参数选择 -->
        <!-- <div class="list">
          <mt-cell class="mt-cell" title="参数" is-link></mt-cell>
          <mt-cell class="mt-cell" title="规格" is-link></mt-cell>
        </div> -->
        <!-- 商品详情 -->
        <div class="goods_detail">
          <p>商品详情</p>
          <img src="~@/common/images/banner@2x.png" alt="">
          <img src="~@/common/images/banner@2x.png" alt="">
          <img src="~@/common/images/banner@2x.png" alt="">
          <div class="clear"></div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="cart_icon iconfont">&#xe6e6;</div>
      <button @click="add()">加入购物车</button>
    </div>
    
    
  </div>
</template>
<script>
import { Swipe, SwipeItem } from "mint-ui";
import { Cell } from "mint-ui";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      goodsscroll: "",
      goods: {
        price: "1000.00",
        text: "珀兰天然乳胶床垫1.8m独立弹簧椰棕垫1.5"
      }
    };
  },
  methods: {
    add() {
      window.sessionStorage.setItem("index", this.$route.params.index);
      window.sessionStorage.setItem("idx", this.$route.params.idx);
      this.$router.back();
    }
  },
  mounted() {
    this.goodsscroll = new BScroll(".mid", {
      click: true,
      scrollY: true
    });
  },
  activated() {}
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/common';

.goodsDetail {
  overflow: hidden;
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

  .clear {
    clear: both;
  }

  .button {
    border: 0;
    box-shadow: none;
    color: inherit;
    display: flex;
    padding: 0;
    font-size: inherit;
    height: cp(90);
    width: cp(150);
    line-height: cp(90);
  }

  .mintui {
    display: inline-block;
    width: cp(120);
    height: cp(50);
    margin: cp(15);
    color: #fff;
    font-size: cp(28);
    text-align: left;
    line-height: cp(50);

    &:before {
      font-size: cp(32);
      display: inline-block;
      vertical-align: middle;
      margin-bottom: cp(-4);
    }
  }

  .share {
    height: cp(90);
    width: cp(90);
    float: right;
    line-height: cp(90);
    color: #fff;
    font-size: cp(42);
  }

  .mid {
    overflow: hidden;
    position: relative;
    height: calc(100vh - 40px - 40px);
  }

  .swipe {
    height: calc(100vh - 40px - 40px - 100px);
    background: white;
  }

  .swipe img {
    width: 100%;
    height: calc(100vh - 40px - 40px - 100px);
  }

  .information {
    background: white;
    text-align: left;
    height cp(200)
    overflow hidden
    text-align center

    .price {
      font-size: cp(40);
      color: #ff6600;
    }

    .text {
      font-size: cp(30);
      line-height: cp(45);
      margin-top: cp(20);
    }

    .commitment {
      font-size: cp(26);
      line-height: cp(40);
      margin-top: cp(20);
      color: #bebebe;
    }
  }

  .list {
    margin-top: cp(20);
  }

  .goods_detail {
    margin-top: cp(20);
    background: white;

    p {
      font-size: cp(30);
      padding: cp(30) 0;
    }

    img {
      width: 100%;
      margin: 0;
      padding: 0;
      float: left;
    }
  }

  .bottom {
    background: white;
    height: cp(80);
    line-height: cp(80);
    position: fixed;
    z-index: 1;
    bottom: 0;
    width: 100%;
    text-align: left;
    display: flex;

    .cart_icon {
      width: cp(80);
      height: cp(80);
      background: #FF3000;
      color: #fff;
      font-size: cp(48);
      line-height: cp(80);
      display: inline-block;
    }

    button {
      background: #f60;
      height: cp(80);
      width: calc(100vw - 40px);
      border: 0;
      color: white;
      outline: none;
      font-size: cp(30);
    }
  }
}
</style>
