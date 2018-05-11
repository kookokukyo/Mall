<template>
  <div class="cart">
    <Header :title="'购物车'" :noback="false" :right="false"></Header>
    <div v-show="isLogin">
    <div class="bg"></div>
    <div class="mid">
      <div class="list" v-if="list.length">
        <div class="item" v-for="(v, index) in list">
          <div class="title">产品型号：{{v.name}}</div>
          <div class="info">
            <img src="~@/common/images/timg2.jpg" alt="">
            <h6><span>床型：{{v.shapename}}</span><span>尺寸：{{v.sizename}}</span></h6>
            <div class="count"><span @click="minusNum(index)" class="iconfont">&#xe6af;</span><kbd><input type="number" v-model="v.num" @change="check(index)"/></kbd><span @click="plusNum(index)" class="iconfont">&#xe6b3;</span></div>
            <div class="parts">
              <img v-for="(vv, index) in v.data" src="~@/common/images/timg2.jpg" alt="" v-if="index < 4">
              <span class="iconfont" @click="more($event, index)">{{v.isMore ? '&#xe62e;' : '&#xe62f;'}}</span>
            </div>
          </div>
          <div class="detail">
            <div class="item" v-for="(vv, index) in v.data">
              <img src="~@/common/images/timg2.jpg" alt=""> <p v-for="vvv in vv">{{vvv}}</p>
            </div>
          </div>
          <div class="action">
            <span class="btn" @click="more($event, index)">{{v.isMore ? '收起' : '详情'}}</span>
            <span class="btn" @click="del(index)">删除</span>
            <span class="btn" @click="edit(index)">编辑</span>
          </div>
        </div>
      </div>
      <div class="nogoods" v-else>购物车暂无产品<span @click="$router.replace('/catagory')">立即定制</span></div>
    </div>
    <div class="btnTwo flex" v-if="list.length">
      <div class="flex-item" style="background:#f60" @click="$router.replace('/catagory')">继续购物</div>
      <div class="flex-item" style="background:#FF3000" @click="$router.push('/confirmOrder')">下一步</div>
    </div>
    </div>
    <Login v-show="!isLogin"></Login>
    <Tab></Tab>
  </div>
</template>

<script>
import Tab from "./base/tab";
import Header from "./base/header";
import Login from "./base/login";
import { Swipe, SwipeItem } from "mint-ui";
import BScroll from "better-scroll";
import { MessageBox } from "mint-ui";

export default {
  data() {
    return {
      list: [],
      isLogin: false
    };
  },
  components: {
    Tab,
    Header,
    Login
  },
  methods: {
    del(index) {
      MessageBox.confirm("确定要删除吗？").then(action => {
        this.list.splice(index, 1);
        window.localStorage.setItem("cart", JSON.stringify(this.list));
      });
    },
    more(e, index) {
      if (
        $(e.srcElement)
          .parents(".item")
          .find(".detail")
          .css("display") == "none"
      ) {
        $(e.srcElement)
          .parents(".item")
          .siblings()
          .find(".detail")
          .slideUp();
        $(e.srcElement)
          .parents(".item")
          .find(".detail")
          .slideDown();
        for (let i = 0; i < this.list.length; i++) {
          this.list[i].isMore = false;
        }
        this.list[index].isMore = true;
      } else {
        $(e.srcElement)
          .parents(".item")
          .find(".detail")
          .slideUp();
        this.list[index].isMore = false;
      }
    },
    edit(index) {
      window.localStorage.setItem("editCart", JSON.stringify(this.list[index]));
      window.localStorage.setItem("editIndex", index);
      window.localStorage.setItem("catagory", this.list[index].name);
      this.$router.replace("/catagory");
    },
    plusNum(index) {
      this.list[index].num++;
      window.localStorage.setItem("cart", JSON.stringify(this.list));
    },
    minusNum(index) {
      if (this.list[index].num > 1) {
        this.list[index].num--;
        window.localStorage.setItem("cart", JSON.stringify(this.list));
      } else {
        this.toast("不能再少了");
      }
    },
    check(index) {
      this.list[index].num = parseInt(this.list[index].num);
      if (isNaN(this.list[index].num)) {
        this.list[index].num = 1;
        this.toast("请输入正确的数量");
      }
      window.localStorage.setItem("cart", JSON.stringify(this.list));
    }
  },
  mounted() {
    this.midscroll = new BScroll(".mid", {
      click: true,
      tap: true,
      scrollY: true,
      bounceTime: 400
    });
  },
  activated() {
    window.sessionStorage.setItem("labindex", "0");
    this.checkLogin()
      .then(r => {
        this.isLogin = true;
        let list = window.localStorage.getItem("cart")
          ? JSON.parse(window.localStorage.getItem("cart"))
          : [];
        for (let i = 0; i < list.length; i++) {
          list[i].isMore = false;
        }
        $(".detail").hide();
        this.list = list;
      })
      .catch(r => {
        this.isLogin = false;
      });
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/common';

.bg {
  width: 100vw;
  height: 100vh;
  background: #eee;
  position: fixed;
  z-index: -1;
  top: 0;
  left: 0;
}

.mid {
  width: 100%;
  height: calc(100vh - 40px - 55px - 40px);
  overflow: hidden;

  .nogoods {
    top: 0;
    bottom: 0;
    position: absolute;
    margin: auto;
    height: 200px;
    width: 100%;
    font-size: cp(32);
    text-align: center;
    color: #666;
    line-height: cp(120);

    span {
      display: block;
      width: cp(180);
      font-size: cp(28);
      line-height: cp(60);
      border-radius: cp(20);
      color: #f60;
      border: 1pt solid #f60;
      margin: auto;
    }
  }

  .list {
    .item {
      background: #fff;
      margin-bottom: cp(20);
      text-align: left;

      .title {
        font-size: cp(28);
        line-height: cp(60);
        padding: 0 cp(30);
        border-bottom: 1px solid #eee;
      }

      .info {
        padding: cp(30);
        height: cp(130);

        img {
          float: left;
          width: cp(130);
          height: cp(130);
          margin-right: cp(18);
        }

        h6 {
          font-size: cp(32);
          line-height: cp(70);

          span {
            margin-right: cp(20);
          }
        }

        .parts {
          float: left;

          img {
            margin-right: cp(10);
            width: cp(50);
            height: cp(50);
          }

          span.iconfont {
            float: left;
            border: 1pt solid #ccc;
            width: cp(46);
            height: cp(46);
            line-height: cp(46);
            color: #666;
            font-size: cp(30);
          }
        }

        .count {
          float: right;
          line-height: cp(46);
          height: cp(46);
          background: #ffffff;
          display: block;
          width: cp(210);
          border: 1pt solid #ccc;
          border-radius: cp(10);

          span {
            color: #999;
            vertical-align: top;
            line-height: cp(46);
            width: cp(50);
            height: cp(46);
            font-size: cp(36);
          }

          kbd {
            display: inline-block;
            font-size: cp(32);
            height: cp(46);
            line-height: cp(46);
            width: cp(100);
            text-align: center;
            border-left: 1pt solid #ccc;
            border-right: 1pt solid #ccc;
            vertical-align: top;
            color: #666;

            input {
              display: block;
              text-align: center;
            }
          }
        }
      }

      .action {
        border-top: 1pt solid #eee;
        height: cp(70);
        padding: 0 cp(30);

        .btn {
          font-size: cp(26);
          float: right;
          height: cp(46);
          border: 1pt solid #f60;
          color: #f60;
          line-height: cp(50);
          padding: 0 cp(20);
          margin-top: cp(10);
          vertical-align: top;
          border-radius: cp(10);
          margin-left: cp(20);
        }
      }

      .detail {
        width: 100%;
        display: none;

        &:after {
          content: '';
          display: block;
          clear: both;
        }

        .item {
          padding: 0 cp(30);
          height: cp(80);
          width: 50%;
          float: left;
          box-sizing: border-box;
          font-size: cp(28);
          line-height: cp(80);

          img {
            float: left;
            margin-right: cp(20);
            width: cp(80);
            height: cp(80);
          }
        }
      }
    }
  }
}

.btnTwo {
  position: fixed;
  bottom: cp(110);
  height: cp(80);
  line-height: cp(80);
  width: 100%;
  color: #fff;
  font-size: cp(32);
  display: flex;

  .flex-item {
    flex: 1;
  }
}
</style>