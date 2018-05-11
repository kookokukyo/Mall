<template>
  <div class="myorder">
    <Header :title="'进行中的订单'" :noback="true" :right="false"></Header>
    <div class="top">
      <div class="search" @click="focusFix('search')">
        <img src="~@/common/images/sousuo@2x.png" alt="" class="search_icon">
        <input ref="search" type="text" placeholder="按订单名称搜索">
      </div>
    </div>
    <div class="mid">
      <div class="mid_list">
        <div class="mid_item" v-for="(item,index) in orderlist">
          <div class="item_top">
            <p class="state">
              <span>待收货</span>
            </p>
            <p class="title">{{item.title}}</p>
            <div class="information">
              <p class="num">共{{item.num}}件</p>
              <p class="time">{{item.time}}</p>
            </div>
          </div>
          <div class="btns">
            <button @click="$router.push('/abnormalDetail')">提交异常</button>
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
      orderscroll: "",
      option: 0,
      orderlist: [
        { title: "棉阻燃布+MJD25", num: 1, time: "2018-11-8 13:00" },
        { title: "棉阻燃布+MJD25", num: 1, time: "2018-11-8 13:00" },
        { title: "棉阻燃布+MJD25", num: 1, time: "2018-11-8 13:00" },
        { title: "棉阻燃布+MJD25", num: 1, time: "2018-11-8 13:00" },
        { title: "棉阻燃布+MJD25", num: 1, time: "2018-11-8 13:00" },
        { title: "棉阻燃布+MJD25", num: 1, time: "2018-11-8 13:00" },
        { title: "棉阻燃布+MJD25", num: 1, time: "2018-11-8 13:00" },
        { title: "棉阻燃布+MJD25", num: 1, time: "2018-11-8 13:00" },
        { title: "棉阻燃布+MJD25", num: 1, time: "2018-11-8 13:00" },
        { title: "棉阻燃布+MJD25", num: 1, time: "2018-11-8 13:00" },
        { title: "棉阻燃布+MJD25", num: 1, time: "2018-11-8 13:00" },
        { title: "棉阻燃布+MJD25", num: 1, time: "2018-11-8 13:00" },
        { title: "棉阻燃布+MJD25", num: 1, time: "2018-11-8 13:00" },
        { title: "棉阻燃布+MJD25", num: 1, time: "2018-11-8 13:00" },
        { title: "棉阻燃布+MJD25", num: 1, time: "2018-11-8 13:00" },
        { title: "棉阻燃布+MJD25", num: 1, time: "2018-11-8 13:00" },
        { title: "棉阻燃布+MJD25", num: 1, time: "2018-11-8 13:00" }
      ]
    };
  },
  components: {
    Header
  },
  methods: {
     scroll(){
      this.midscroll.scrollTo(0, 0, 200);
      this.midscroll.refresh();
    }
  },
  mounted() {
    this.midscroll = new BScroll(".mid", {
      click: true,
      scrollY: true
    });
  },
  activated() {
    this.scroll()
  }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/common';

.top {
  position: fixed;
  z-index: 1;
  width: 100%;
}

.clear {
  clear: both;
}

.myorder {
  background: #ececec;
}

.search {
  display: flex;
  padding: cp(20) 0;
  position: relative;
  background: #ececec;
}

.search_icon {
  position: absolute;
  width: cp(30);
  height: cp(30);
  left: cp(50);
  top: cp(35);
}

input {
  width: cp(630);
  margin: 0 auto;
  height: cp(60);
  line-height: cp(60);
  background: white;
  font-size: cp(24);
  color: #b5b5b5;
  border-radius: cp(30);
  padding-left: cp(60);
}

.list {
  background: white;
  width: 100%;
}

.list .show {
  border-bottom-color: #f60;
  color: #f60;
  font-size: cp(28);
}

.list ul {
  display: flex;
}

.list li {
  flex: 1;
  font-size: cp(24);
  line-height: cp(80);
  border-bottom: 2px white solid;
  text-align: center;
}

.mid {
  margin-top: cp(100);
  height: calc(100vh - 40px - 50px);
  overflow: hidden;
}

.mid_item {
  margin-bottom: cp(20);
}

.mid_list .mid_item .item_top {
  background: white;
  padding: cp(20) cp(30);

  .state {
    font-size: cp(28);
    line-height: cp(40);
    color: #f60;
    text-align: right;
  }

  .title {
    text-align: left;
    font-size: cp(32);
    line-height: cp(50);
    color: #424242;
  }

  .information {
    text-align: left;
    line-height: cp(30);
    font-size: cp(26);
    margin-top: cp(20);
    margin-bottom: cp(20);
    color: #999;

    p {
      display: inline-block;
    }

    .time {
      float: right;
      color: #ccc;
      font-size: cp(24);
    }
  }
}

.btns {
  text-align: right;
  padding: 0 cp(30) cp(20);
  background: white;
  margin-top: cp(2);

  button {
    background: white;
    border: 1pt #f60 solid;
    color: #f60;
    font-size: cp(28);
    line-height: cp(56);
    padding: 0 cp(20);
    border-radius: cp(28);
    outline: none;
  }
}
</style>
