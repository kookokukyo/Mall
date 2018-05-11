<template>
  <div class="search">
    <div class="top">
      <div class="top_mid">
        <div class="button" @click="$router.back()">
            <i class="mintui mintui-back"></i>
        </div>
        <img class="search_icon" src="~@/common/images/sousuo@2x.png" alt="">
        <input @click="focusFix('search')" ref="search" type="text" placeholder="搜索商品">
        <div class="btn" @click="searchClick()">搜索</div>
      </div>
    </div>
    <div class="mid" v-show="listShow">
      <div class="list">
        <div class="item" v-for="(item,index) in list">
          <img src="~@/common/images/timg2.jpg" alt="">
          <p class="name">{{item.name}}</p>
          <p class="text">{{item.text}}</p>
          <p class="price">{{item.price}}元</p>
          <div class="clear"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";

export default {
  data() {
    return {
      listShow: false,
      midscroll: null,
      list: [
        {
          img: "aa",
          name: "床垫床垫床垫",
          text:
            "床垫床垫床床垫床 垫床垫床垫床垫床垫床垫床垫床垫床垫床垫床垫床垫床垫",
          price: "1555"
        },
        {
          img: "aa",
          name: "床垫床垫床垫",
          text:
            "床垫床垫床床垫床 垫床垫床垫床垫床垫床垫床垫床垫床垫床垫床垫床垫床垫",
          price: "1555"
        },
        {
          img: "aa",
          name: "床垫床垫床垫",
          text:
            "床垫床垫床床垫床 垫床垫床垫床垫床垫床垫床垫床垫床垫床垫床垫床垫床垫",
          price: "1555"
        },
        {
          img: "aa",
          name: "床垫床垫床垫",
          text:
            "床垫床垫床床垫床 垫床垫床垫床垫床垫床垫床垫床垫床垫床垫床垫床垫床垫",
          price: "1555"
        },
        {
          img: "aa",
          name: "床垫床垫床垫",
          text:
            "床垫床垫床床垫床 垫床垫床垫床垫床垫床垫床垫床垫床垫床垫床垫床垫床垫",
          price: "1555"
        },
        {
          img: "aa",
          name: "床垫床垫床垫",
          text:
            "床垫床垫床床垫床 垫床垫床垫床垫床垫床垫床垫床垫床垫床垫床垫床垫床垫",
          price: "1555"
        },
        {
          img: "aa",
          name: "床垫床垫床垫",
          text:
            "床垫床垫床床垫床 垫床垫床垫床垫床垫床垫床垫床垫床垫床垫床垫床垫床垫",
          price: "1555"
        }
      ]
    };
  },
  methods: {
    searchClick() {
      this.listShow = true;
      setTimeout(() => {
        this.midscroll.refresh();
      }, 100);
    }
  },
  mounted() {
    this.midscroll = new BScroll(".mid", {
      click: true,
      scrollY: true
    });
  },
  activated() {},
  deactivated() {
    this.listShow = false;
  }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/common';

.clear {
  clear: both;
}

.search {
  background: #ebebeb;
  overflow: hidden;
}

.button {
  background-color: transparent;
  border: 0;
  box-shadow: none;
  color: inherit;
  display: flex;
  padding: 0;
  font-size: inherit;
  height: cp(80);
  width: cp(80);
  line-height: cp(80);
}

.mintui {
  display: inline-block;
  width: cp(80);
  height: cp(80);
  text-align: center;
}

.top {
  width: 100%;
  height: cp(80);
  background: #ff6902;
  color: white;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1;
  text-align: left;
  display: flex;
}

.top_mid {
  display: flex;
  position: relative;
}

.search_icon {
  width: cp(35);
  height: cp(35);
  position: absolute;
  top: cp(20);
  left: cp(95);
}

input {
  width: cp(550);
  height: cp(60);
  background: white;
  color: black;
  // margin-left: cp(10);
  font-size: cp(28);
  padding-left: cp(60);
  margin-top: cp(10);
  border-radius: cp(30);
}

.btn {
  width: 15%;
  height: cp(60);
  line-height: cp(60);
  float: right;
  font-size: cp(28);
  margin-top: cp(10);
  text-align: center;
}

.mid {
  margin-top: cp(90);
  color: black;
  text-align: left;
  height: calc(100vh - 40px);
  overflow: hidden;
}

.mid .list {
  background: white;
}

.mid .item {
  width: 95%;
  margin: 0 auto;
  border-bottom: 1pt #ebebeb solid;
  padding: cp(30) 0;
}

.mid .item img {
  width: cp(200);
  height: cp(200);
  background: #ebebeb;
  display: inline-block;
  float: left;
  margin-right: cp(20);
}

.mid .item p {
  line-height: cp(40);
  margin-top: cp(10);
}

.mid .item .name {
  font-size: cp(38);
}

.mid .item .text {
  font-size: cp(28);
  color: #9c9c9c;
}

.mid .item .price {
  font-size: cp(38);
  color: #ff6902;
}
</style>
