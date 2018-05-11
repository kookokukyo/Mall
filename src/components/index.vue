<template>
  <div class="introduction">
    <!-- 头部搜索 -->
    <div class="top">
      <div class="search" @click="$router.push('/search')">
        <img class="search_icon" src="~@/common/images/sousuo@2x.png" alt="">
        搜索商品，共4411款好物
      </div>
    </div>
    <div class="wrapper">
      <div class="content">
         <!-- 轮播 -->
        <div class="swipe">
          <mt-swipe :auto="4000">
            <mt-swipe-item v-for='item in res.items'><img :src=item.picAddr :id="item.id" :advertorialId="item.advertorialId"  alt=""></mt-swipe-item>
          </mt-swipe>
        </div>
        <!-- 菜单 -->
        <div class="list">
          <div>
            <ul>
              <li><div><img src="~@/common/images/tubiao_1@2x.png"></div>公司实力</li>
              <li><div><img src="~@/common/images/tubiao_2@2x.png"></div>睡眠系统</li>
              <li><div><img src="~@/common/images/tubiao_3@2x.png"></div>项目案例</li>
              <li><div><img src="~@/common/images/tubiao_4@2x.png"></div>明星产品</li>
              <li><div><img src="~@/common/images/tubiao_5@2x.png"></div>合作品牌</li>
            </ul>
            <div class="clear"></div>
          </div>
        </div>
        <div class="mid">
          <div :class="'mid0'+item.id" v-for='item in recommend.items'><div class="_title"><p>{{item.title}}</p><p>{{item.subTitle}}</p></div><img :src="item.picAddr" alt=""></div>
        </div>
        <div class="clear"></div>  
      </div>
    </div>
   
   
    <!-- 底部导航 -->
    <Tab></Tab>
  </div>
</template>

<script>
import Tab from "./base/tab";
import { Swipe, SwipeItem } from "mint-ui";
import BScroll from "better-scroll";


export default {
  data() {
    return {
      midscroll: "",
      res:{},
      recommend:{},
    };
  },
  components: {
    Tab
  },
  mounted() {
    this.midscroll = new BScroll(".wrapper", {
      click: true,
      scrollY: true
    });
  },
  created(){
    
  },
  activated() {
    window.sessionStorage.setItem("labindex", "0");
    this.postData('banner').then(data => {
      this.res = data
    })
    this.postData('recommend').then(data => {
      this.recommend = data
    })
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/common';

.clear {
  clear: both;
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
}

.top .search {
  width: 95%;
  margin: 0 auto;
  height: cp(50);
  line-height: cp(50);
  border-radius: cp(25);
  border: 0;
  outline: 0;
  background: white;
  margin-top: cp(15);
  color: #a1a1a1;
  font-size: cp(28);
  position: relative;
}

.search_icon {
  position: absolute;
  width: cp(30);
  left: cp(160);
  top: cp(10);
}

.wrapper {
  overflow: hidden;
  height: calc(100vh - 40px - 55px);
  margin-top: cp(80);
}

.swipe {
  height: cp(400);
}

.swipe img {
  width: 100%;
}

.list {
  width: 100%;
  background: white;
}

.list li {
  float: left;
  list-style: none;
  width: 20%;
  padding: cp(30) 0;
  font-size: cp(24);
}

.list li img {
  width: cp(80);
  height: cp(80);
  display: inline;
  margin-bottom: cp(20);
}

.mid {
  margin-top: cp(20);
  width: 100%;
  background: white;
  padding: 1% 0;
}

.mid ._title{
  position:absolute;
  left:10%;
  top: 15%;
}

.mid ._title :nth-child(1){
  font-size:18px;
  color:rgb(64,64,63)
}
.mid ._title :nth-child(2){
  margin-top:4px;
  font-size:14px;
  color:#ccc;
  text-align:left
}

.mid>div {
  float: left;
  position:relative;
}

.mid img {
  width: 100%;
}

.mid .mid01 {
  width: 50%;
  margin-right: 1%;
}

.mid .mid02 {
  width: 49%;
}

.mid .mid03 {
  width: 49%;
}
</style>
