<template>
  <div class="personal">
    <div class="wrapper">
      <div class="content">
        <div class="top" v-show="isLogin">
          <img @click="to('/myPersonal')" :src="uesrNamePhoto.managerPic || 'http://www.qqzhi.com/uploadpic/2014-09-23/000247589.jpg'" alt="">
          <p>{{uesrNamePhoto.managerName}}<span @click="logout()">退出登录</span></p>
          <div class="clear"></div>
        </div>
        <div class="top notlogin" v-show="!isLogin">
          <span class="iconfont">&#xe62c;</span>
          <p>您还未登录<span @click="login()">立即登录</span></p>
          <div class="clear"></div>
        </div>
        <div class="myorder">
           <div class="item" @click="to('/myOrder')">
            <mt-cell class="mt-cell" title="我的订单" is-link></mt-cell>
          </div>
          <div class="order_mid">
            <ul>
              <li @click="cut(1)">
                <img src="~@/common/images/nopay@2x.png" alt="">
                <p>待付款</p>
              </li>
              <li @click="cut(2)">
                <img src="~@/common/images/noupload@2x.png" alt="">
                <p>待上传</p>
              </li>
              <li @click="cut(3)">
                <img src="~@/common/images/noaudit@2x.png" alt="">
                <p>待审核</p>
              </li>
              <li @click="cut(4)">
                <img src="~@/common/images/noproduction@2x.png" alt="">
                <p>待生产</p>
              </li>
              <li @click="cut(5)">
                <img src="~@/common/images/nodelivery@2x.png" alt="">
                <p>待发货</p>
              </li>
              <li @click="cut(6)">
                <img src="~@/common/images/nogoods@2x.png" alt="">
                <p>待收货</p>
              </li>
            </ul>
            <div class="clear"></div>
          </div>
        </div>
        <div class="mylist">
          <div class="item" @click="to('/abnormalOrder')">
            <mt-cell class="mt-cell01" title="提交订单异常"  is-link>
              <span slot="icon" class="iconfont">&#xe6d6;</span>
            </mt-cell>
          </div>
          <div class="item" @click="to('/myCommission')">
            <mt-cell class="mt-cell01" title="我的佣金"  is-link>
              <span slot="icon" class="iconfont">&#xe6d7;</span>
            </mt-cell>
          </div>
          <div class="item" @click="to('/myPersonal')">
            <mt-cell class="mt-cell01" title="我的个人资料"  is-link>
              <span slot="icon" class="iconfont">&#xe6b6;</span>
            </mt-cell>
          </div>
        </div>
        <div class="mylist mylist_mt">
          <div class="item" @click="to('/companyInformation')">
            <mt-cell class="mt-cell" title="公司资料下载"  is-link>
              <span slot="icon" class="iconfont">&#xe6cd;</span>
            </mt-cell>
          </div>
          <div class="item" @click="to('/service')">
            <mt-cell class="mt-cell" title="公司客服信息"  is-link>
              <span slot="icon" class="iconfont">&#xe6d8;</span>
            </mt-cell>
          </div>
          <div class="item" @click="to('/feedback')">
            <mt-cell class="mt-cell" title="意见反馈"  is-link>
              <span slot="icon" class="iconfont">&#xe6d9;</span>
            </mt-cell>
          </div>
        </div>
      </div>
    </div>
    <Tab></Tab>
  </div>
</template>

<script>
import Tab from "./base/tab";
import { Cell } from "mint-ui";
import BScroll from "better-scroll";

export default {
  data() {
    return {
      midscroll: null,
      isLogin: false,
      userInfo: {},
      uesrNamePhoto:{}
    };
  },
  components: {
    Tab
  },
  methods: {
    cut(index) {
      if (this.isLogin) {
        this.$router.push({
          path: "/myOrder",
          query: {
            option: index
          }
        });
      } else {
        this.toast("您还未登录");
      }
    },
    scroll() {
      this.midscroll.scrollTo(0, 0, 200);
      this.midscroll.refresh();
    },
    to(path) {
      if (this.isLogin) {
        this.$router.push(path);
      } else {
        this.toast("您还未登录");
      }
    },
    login() {
      window.localStorage.setItem("loginFrom", this.$route.name);
      this.$router.push("/login");
    },
    logout(){
      window.localStorage.setItem("userInfo", "");
      window.location.reload()
    }
  },
  mounted() {
    this.midscroll = new BScroll(".wrapper", {
      click: true,
      scrollY: true
    });
  },
  activated() {
    window.sessionStorage.setItem("labindex", "0");
    this.scroll();
    this.isLogin = false;
    this.checkLogin()
      .then(r => {
        this.isLogin = true;
        this.userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
        this.postData('PersonalInit',{token:this.userInfo.userid}).then(data => {
        if (data.result=='success') {
          this.uesrNamePhoto = data.items[0]
        }
      })
      })
      .catch(r => {});
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/common';

.personal {
  background: #f7f7f7;

  .clear {
    clear: both;
  }

  .wrapper {
    height: calc(100vh - 55px);
    overflow: hidden;
  }

  .top {
    text-align: left;
    padding: cp(50);
    background: #f60;
  }
  .notlogin{
    .iconfont{
      float left
      width: cp(100);
      height: cp(100);
      font-size cp(100)
      line-height cp(100)
      margin-right: cp(30);
      color #fff
    }
  }
  .top img {
    width: cp(100);
    height: cp(100);
    border-radius: 50%;
    float: left;
    margin-right: cp(30);
  }

  .top p {
    color: white;
    font-size: cp(30);
    height: cp(100);
    line-height: cp(100);
    span{
      border 1pt solid #fff
      line-height cp(50)
      display inline-block
      padding 0 cp(20)
      border-radius cp(10)
      float right
      margin-top cp(25)
      font-size cp(28)
      margin-left cp(10)
    }
  }

  .myorder {
    width: 95%;
    margin: cp(20) auto;
  }

  .item {
    background: white;
    border-top: 1pt solid #d9d9d9;

    .mint-cell-text {
      font-size: cp(32) !important;
      margin-left: cp(16);
    }
  }

  .item:first-child {
    border-top: none;
  }

  .order_mid {
    background: white;
    padding-bottom: cp(30);
  }

  .order_mid ul {
    width: 90%;
    margin: 0 auto;
  }

  .order_mid li {
    float: left;
    width: 33.33%;
    text-align: center;
    margin-bottom: cp(20);
  }

  .order_mid img {
    width: cp(50);
    height: cp(50);
    display: inline-block;
  }

  .order_mid p {
    font-size: cp(28);
    margin-top: cp(10);
  }

  .bg {
    width: 100%;
    height: cp(20);
    background: #ebebeb;
  }

  .mylist {
    .iconfont {
      width: 25px;
      height: 25px;
      line-height: 25px;
      font-size: 22px;
      color: #f60;
    }
  }

  .mylist_mt {
    margin-top: cp(20);
  }
}
</style>
