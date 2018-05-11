<template>
  <div class="explore">
    <Header :title="'发现'" :noback="false" :right="false"></Header>
      <div class="top">
        <ul class="content">
          <li v-for="(item,index) in list"><p :class="index==labindex?'show':''" @click="switchTab(index)">{{item.classifyName}}</p></li>
        </ul>
        <div class="clear"></div>
      </div>

      <div class="mid">
          <div class="list" v-if="labindex=='0'">
            <div class="item" v-for="(item, index) in explore" @click="jump(item.id)">
              <div class="info">
                <img :src="item.publisherPic" alt="">
                <p>{{item.publisherName}}</p>
              </div>
              <div class="pic">
                <img :src="item.picAddr" alt="">
              </div>
              <p class="title">{{item.title}}</p>
              <p class="text">{{item.subTitle}}</p>
              <p class="num"><span class="iconfont">&#xe627;</span>{{item.thumbUpNum}}<span class="iconfont icon02">&#xe667;</span>{{item.viewNum}}</p>
            </div>
          </div>
          <div class="list" v-if="labindex=='1'">
            <div class="item" v-for="(item, index) in explore1" @click="jump(item.id)">
              <div class="info">
                <img :src="item.publisherPic" alt="">
                <p>{{item.publisherName}}</p>
              </div>
              <div class="pic">
                <div class="videoicon"><span class="iconfont">&#xe624;</span></div>
                <img :src="item.videoPicAddr" alt="">
              </div>
              <p class="title">{{item.title}}</p>
              <p class="text">{{item.subTitle}}</p>
              <p class="num"><span class="iconfont">&#xe627;</span>{{item.thumbUpNum}}<span class="iconfont icon02">&#xe667;</span>{{item.viewNum}}</p>
            </div>
          </div>
      </div>
    <Tab></Tab>
  </div>
</template>

<script>
import Tab from "./base/tab";
import Header from "./base/header";
import { Swipe, SwipeItem } from "mint-ui";
import BScroll from "better-scroll";

export default {
  data() {
    return {
      labindex: "0",
      list: [],
      explore: [],
      explore1: [],
      midscroll: ""
    };
  },
  components: {
    Tab,
    Header
  },
  methods: {
    jump(id) {
      this.$router.push({
        path: "/exploreDetail",
        query: {
          type: this.labindex,
          id:id
        }
      });
    },
    scroll() {
      this.midscroll.scrollTo(0, 0, 200);
      this.midscroll.refresh();
    },
    switchTab(index) {
      if (this.labindex != index) {
        this.labindex = index;
        this.scroll();
      } 
    }
  },
  mounted() {
    this.midscroll = new BScroll(".mid", {
      click: true,
      scrollY: true
    });
  },
  created(){
    this.postData('type').then(data => {
      var arr = []
      for (var i = 0; i < data.items.length; i++) {
        if (data.items[i].classifyId==1) {arr[0]=data.items[i]}
        if (data.items[i].classifyId==2) {arr[1]=data.items[i]} 
      }
      this.list = arr
    })
  },
  activated() {
    this.scroll();
    if (window.sessionStorage.getItem("labindex")) {
      this.labindex = window.sessionStorage.getItem("labindex");
    } else {
      this.labindex = 0;
    }
    this.postData('init',{classify_id:1}).then(data => {
      this.explore = data.items
    })
    this.postData('init',{classify_id:2}).then(data => {
      this.explore1 = data.items
    })
  },
  deactivated() {
    window.sessionStorage.setItem("labindex", this.labindex);
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/common';

.clear {
  clear: both;
}

.top {
  position: relative;
  z-index: 2;

  ul {
    width: 100%;

    li {
      float: left;
      width: 50%;
      font-size: cp(30);
      height: cp(80);
      line-height: cp(80);
      border-bottom: 1pt #ccc solid;
    }

    .show {
      color: #ff6600;
      border-bottom: 1pt #ff6600 solid;
    }
  }
}

.mid {
  color: #000;
  text-align: left;
  overflow: hidden;
  height: calc(100vh - 55px - 40px - 40px);
}

.mid .list {
  padding-bottom: cp(20);
}

.mid .item {
  box-shadow: 0 0 cp(10) cp(5) rgba(0, 0, 0, 0.1);
  padding-bottom: cp(20);
  margin-bottom: cp(20);
}

.mid .info {
  font-size: cp(28);
  color: #7a7a7a;
  padding: cp(20) 0 cp(20) cp(30);
}

.mid .info>p {
  line-height: cp(50);
  margin-left: cp(60);
}

.mid .info img {
  width: cp(50);
  height: cp(50);
  border-radius: 50%;
  background: #bebebe;
  display: inline-block;
  float: left;
  vertical-align: middle;
}

.mid .pic {
  width: 100%;
  height: cp(400);
  overflow: hidden;
  background: #bebebe;
  position: relative;
}

.mid .pic .videoicon {
  position: absolute;
  width: 100%;
  height: cp(400);
  text-align: center;
  line-height: cp(400);
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  z-index: 1000;

  span {
    width: 100%;
    height: cp(400);
    line-height: cp(400);
    font-size: cp(150);
    color: white;
  }
}

.mid .pic img {
  width: 100%;
}

.mid .pic video {
  width: 100%;
}

.mid .title {
  font-size: cp(38);
  margin-top: cp(20);
  margin-bottom cp(20)
  height cp(50)
  line-height cp(50)
  overflow hidden
}

.mid .text {
  font-size: cp(28);
  color: #b3b3b3;
  max-height cp(100)
  line-height: cp(50);
  overflow hidden
}
.mid .num{
  font-size cp(20)
}
.mid .num span{
  margin-right cp(10)
}
.mid .num .icon02{
  margin-left cp(30)
}
.item>p {
  margin-left: cp(30);
}
</style>
