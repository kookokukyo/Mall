<template>
  <div class="catagory" style="">
    <Header :title="'定制中心'" :noback="false" :right="false"></Header>
    <div v-show="isLogin">
      <Sidebar @change="change" ref="sidebar" :sidebarendname="endname"></Sidebar>
      <transition name="fade">
      <div class="mid" v-show="notCatagory">
        <div class="notCatagory">
          <img src="~@/common/images/timg.png" alt="">
          <img src="~@/common/images/timg.png" alt="">
          <img src="~@/common/images/timg.png" alt="">
        </div>
      </div>
      </transition>
      <transition name="fade">
      <div class="mid2" v-show="isCatagory">
        <div class="isCatagory" v-show="isCatagory">
          <div class="catagory" v-for="(v, index) in catagory" :key="v.name">
            <div class="title"><span>{{v.name}}</span></div>
            <ul>
              <li v-for="(vv, idx) in v.catagory" :key="vv.name">
                <img @click="go2detail(index, idx)" src="~@/common/images/timg2.jpg" alt="">
                <p class="name">{{vv.name}}</p>
                <p :class="vv.num ? 'hasnum num' : 'num'"><span style="width:0;opacity:0;overflow:hidden" @click="changeNum('minus', index, idx, vv.num, $event)" class="iconfont">&#xe6af;</span><kbd style="width:0;opacity:0;overflow:hidden;display:none;">{{vv.num}}</kbd><span @click="changeNum('plus', index, idx, vv.num, $event)" class="iconfont">&#xe6b3;</span></p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      </transition>
      <div class="toolbar flex" v-show="isCatagory">
        <div class="choosenum">未选：<span>{{ catagory.length - selectedNum}}</span></div>
        <div class="flex-item" @click="preview()" :style="isAllSelected ? 'background:#f60' : 'background:#999'">查看成品图</div>
        <div class="flex-item" @click="go2cart()" :style="isAllSelected ? 'background:#FF3000' : 'background:#666'">{{ isEdit ? '确认修改' : '加入购物车' }}</div>
      </div>
    </div>
    <Login v-show="!isLogin"></Login>
    <Tab></Tab>
    <mt-popup v-model="popupVisible" popup-transition="popup-fade"><img src="~@/common/images/timg.png" style="width:100vw" alt=""></mt-popup>
    <Addcart :visible.sync="visible" :name="catagoryname" @clear="clear" :data="selectedData"></Addcart>
  </div>
</template>

<script>
import Tab from "./base/tab";
import Header from "./base/header";
import Login from "./base/login";
import Sidebar from "./base/catagory/sidebar";
import Addcart from "./base/catagory/addcart";
import BScroll from "better-scroll";
import { Popup } from "mint-ui";
export default {
  data() {
    return {
      isCatagory: false,
      notCatagory: true,
      catagory: [],
      endname: "",
      endindex: 0,
      isAllSelected: false,
      selectedNum: 0,
      popupVisible: false,
      selectedData: [],
      visible: false,
      catagoryname: window.localStorage.getItem("catagory"),
      isLogin: false,
      isEdit: false
    };
  },
  components: {
    Tab,
    Header,
    Sidebar,
    Addcart,
    Login
  },
  methods: {
    change(flag, sidebar, index) {
      this.catagoryname = window.localStorage.getItem("catagory");
      if (flag) {
        this.notCatagory = !flag;
        setTimeout(() => {
          if (this.isCatagory != flag) {
            this.mid2scroll.scrollTo(0, 0, 0);
            this.isCatagory = flag;
          }
        }, 300);
        setTimeout(() => {
          this.mid2scroll.refresh();
        }, 600);
        if (sidebar instanceof Array) {
          this.catagory = [];
          for (let i = 0; i < sidebar.length; i++) {
            let tmpCat = [];
            for (let j = 0; j < 6; j++) {
              tmpCat.push({
                num: 0,
                name: sidebar[i].name + j
              });
            }
            this.catagory.push({
              name: sidebar[i].name,
              catagory: tmpCat
            });
          }
        } else {
          this.endname = sidebar;
          this.isScrolling = true;
          setTimeout(() => {
            this.mid2scroll.scrollTo(0, index * innerWidth * -0.864, 500);
          }, 10);
          setTimeout(() => {
            this.isScrolling = false;
          }, 510);
        }
      } else {
        this.isCatagory = flag;
        this.catagory = [];
        setTimeout(() => {
          this.notCatagory = !flag;
          this.endname = "";
          this.isAllSelected = false;
          this.selectedNum = 0;
          this.selectedData = [];
        }, 300);
        window.localStorage.setItem("editIndex", "");
        this.isEdit = false;
      }
    },
    changeNum(method, index, idx, num, e) {
      let hasselected = true;
      for (let i = 0; i < this.catagory[index].catagory.length; i++) {
        if (this.catagory[index].catagory[i].num) {
          hasselected = false;
        }
      }
      if (method == "plus" && num == 0 && hasselected) {
        $(e.srcElement)
          .siblings("span")
          .animate(
            {
              width: "0.48rem",
              opacity: 1
            },
            200
          );
        $(e.srcElement)
          .siblings("kbd")
          .show(0)
          .animate(
            {
              width: "0.6rem",
              opacity: 1
            },
            200
          );
        this.catagory[index].catagory[idx].num++;
      } else if (method == "minus" && num == 1) {
        $(e.srcElement).animate(
          {
            width: 0,
            opacity: 0
          },
          200
        );
        $(e.srcElement)
          .siblings("kbd")
          .animate(
            {
              width: 0,
              opacity: 0
            },
            200
          )
          .hide(0);
        this.catagory[index].catagory[idx].num--;
      }
      let tmpNum = 0;
      this.isAllSelected = true;
      this.selectedData = [];
      for (let i = 0; i < this.catagory.length; i++) {
        let tmpNum2 = 0;
        for (let j = 0; j < this.catagory[i].catagory.length; j++) {
          if (this.catagory[i].catagory[j].num) {
            tmpNum++;
            tmpNum2++;
            this.selectedData.push({
              [this.catagory[i].name]: this.catagory[i].catagory[j].name
            });
          }
        }
        if (tmpNum2 !== 1) {
          this.isAllSelected = false;
          this.selectedData = [];
        }
      }
      this.selectedNum = tmpNum;
    },
    preview() {
      if (this.isAllSelected) {
        this.popupVisible = true;
      }
    },
    go2detail(index, idx) {
      this.$router.push({
        name: "/goodsDetail",
        params: {
          index: index,
          idx: idx
        }
      });
    },
    go2cart() {
      if (this.isAllSelected) {
        this.visible = true;
      }
    },
    clear() {
      this.change(false);
      this.$refs.sidebar.clear();
    }
  },
  mounted() {
    this.midscroll = new BScroll(".mid", {
      click: true,
      tap: true,
      scrollY: true,
      bounceTime: 400
    });
    this.mid2scroll = new BScroll(".mid2", {
      click: true,
      tap: true,
      scrollY: true,
      bounceTime: 400,
      probeType: 3
    });
    this.mid2scroll.on("scroll", pos => {
      if (
        parseInt((pos.y - 160) / (innerWidth * -0.864)) != this.endindex &&
        !this.isScrolling
      ) {
        this.endindex = parseInt((pos.y - 160) / (innerWidth * -0.864));
        this.endname = this.catagory[this.endindex].name;
      }
    });
  },
  activated() {
    window.sessionStorage.setItem("labindex", "0");
    this.checkLogin()
      .then(r => {
        this.isLogin = true;
        if (window.sessionStorage.getItem("index")) {
          let index = parseInt(window.sessionStorage.getItem("index"));
          let idx = parseInt(window.sessionStorage.getItem("idx"));
          this.changeNum(
            "plus",
            index,
            idx,
            this.catagory[index].catagory[idx].num,
            {
              srcElement: $(".catagory .catagory")
                .eq(index)
                .find("li")
                .eq(idx)
                .find("span:last")
            }
          );
          window.sessionStorage.setItem("index", "");
          window.sessionStorage.setItem("idx", "");
        }
        let that = this;
        if (window.localStorage.getItem("fromHistoryOrder") == "true") {
          $(".num")
            .find("span:first-child, kbd")
            .hide(0);
        }
        setTimeout(function() {
          if (window.localStorage.getItem("fromHistoryOrder") == "true") {
            for (let i = 0; i < 11; i++) {
              let rand = Math.floor(Math.random() * 6);
              that.changeNum("plus", i, rand, 0, {
                srcElement: $(".catagory .catagory")
                  .eq(i)
                  .find("li")
                  .eq(rand)
                  .find("span:last")
              });
            }
            window.localStorage.setItem("fromHistoryOrder", "");
          } else if (window.localStorage.getItem("editCart")) {
            let editCart = JSON.parse(window.localStorage.getItem("editCart"));
            for (let i = 0; i < $(".catagory .catagory").length; i++) {
              for (let j in editCart.data[i]) {
                let num = editCart.data[i][j].slice(
                  editCart.data[i][j].length - 1
                );
                that.changeNum("plus", i, num, 0, {
                  srcElement: $(".catagory .catagory")
                    .eq(i)
                    .find("li")
                    .eq(num)
                    .find("span:last")
                });
              }
            }
            that.isEdit = true;
            window.localStorage.setItem("editCart", "");
          }
        }, 300);
      })
      .catch(r => {
        this.isLogin = false;
      });
  },
  deactivated() {
    this.isEdit = false;
    window.localStorage.setItem("editIndex", "");
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/common';

.mid {
  margin-left: cp(180);
  height: calc(100vh - 40px - 55px);
  overflow: hidden;
  background: #f3f3f3;

  .notCatagory {
    padding: cp(10);

    img {
      display: block;
      width: calc(100% - 10px);
      padding: cp(10);
    }
  }
}

.mid2 {
  margin-left: cp(180);
  height: calc(100vh - 40px - 55px - 40px);
  overflow: hidden;
  background: #f3f3f3;

  .title {
    font-size: cp(32);
    line-height: cp(80);
    height: cp(40);
    display: inline-block;
    padding: 0 cp(40);
    margin-bottom: cp(40);
    border-bottom: 1pt solid #d9d9d9;
    overflow: visible;

    span {
      background: #f3f3f3;
      padding: 0 cp(20);
    }
  }

  ul {
    padding: 0 cp(20) cp(20);

    &:after {
      content: '';
      display: block;
      clear: both;
    }

    li {
      float: left;
      width: 33.3%;
      padding: 0 cp(10) cp(30);
      box-sizing: border-box;
      font-size: cp(40);

      img {
        width: 90%;
        border-radius: cp(20);
      }

      .name {
        font-size: cp(24);
        line-height: cp(50);
      }

      .num {
        line-height: cp(36);
        height: cp(36);
        background: #ffffff;
        display: inline-block;
        border: 1pt solid #dcdcdc;
        border-radius: cp(10);

        span {
          color: #ccc;
          vertical-align: top;
          line-height: cp(36);
          width: cp(36);
          height: cp(36);
          font-size: cp(32);
        }

        span.disable {
          border: 2px solid #d9d9d9;
          color: #999;
        }

        kbd {
          display: inline-block;
          font-size: cp(28);
          height: cp(36);
          line-height: cp(36);
          border-left: 1pt solid #dcdcdc;
          border-right: 1pt solid #dcdcdc;
          vertical-align: top;
          color: #999;
        }
      }

      .hasnum {
        border-color: #f60;

        span, kbd {
          color: #f60;
          border-color: #f60;
        }
      }
    }
  }
}

.toolbar {
  font-size: cp(28);
  text-align: center;
  line-height: cp(80);
  height: cp(80);
  border-top: 1pt solid #dcdcdc;
  color: #fff;

  .choosenum {
    width: cp(200);
    text-align: left;
    padding-left: cp(20);
    color: #333;
    font-size: cp(26);

    span {
      color: #f60;
      font-size: cp(40);
    }
  }
}
</style>
