<template>
<div class="orderDetail">
  <Header :title="'提交异常'" :noback="true" :right="false"></Header>
  <div class="mid">
    <div class="content">
      <div class="place">
        <img src="~@/common/images/place@2x.png" alt="">
        <p>上海市XX区XX路123号万豪酒店</p>
        <p>郭达<span class="phone">15699889699</span></p>
        <div class="clear"></div>
        <div class="line">
          <img src="~@/common/images/line.png" alt="">
        </div>
      </div>
      <div class="information">
        <p>床品型号：{{information.name}}</p>
        <p class="parameter">床型 <span>长方形</span> 尺寸 <span>1.8米</span> 数量 <span>{{information.num}}</span></p>
      </div>
      <div class="project">
        <p>项目名称<span>某某某项目</span></p>
        <p>酒店名称<span>万豪酒店</span></p>
        <p>物流<span>自费</span></p>
        <p>需要发票<span>是</span></p>
        <p>发票抬头<span>个人</span></p>
        <p>社会信用代码<span>TBB236164656</span></p>
      </div>
      <div class="state">
        <div class="title">订单状态</div>
        <ul class="list">
          <li class="item"><img src="~@/common/images/stateOn@2x.png" alt=""><p>工作人员生产完毕</p><p>2018-11-15 22:52:52</p></li>
          <li class="item"><img src="~@/common/images/stateNo@2x.png" alt=""><p>合同分配工厂</p><p>2018-11-15 22:52:52</p></li>
          <li class="item"><img src="~@/common/images/stateNo@2x.png" alt=""><p>付款成功</p><p>2018-11-15 22:52:52</p></li>
        </ul>
      </div>
      <div class="report">
        <div class="title">异常报告</div>
        <div class="report_content" @click="focusFix('txt')">
          <textarea ref="txt" v-model="txt" placeholder="请输入订单异常情况"></textarea>
        </div>
      </div>
    </div>
  </div>
  <div class="btns">
    <button @click="submit()">提交异常</button>
  </div>
</div>
  
</template>
<script>
import Header from "../base/header";
import BScroll from "better-scroll";

export default {
  data() {
    return {
      option: "1",
      information: {
        name: "曼泽纳007",
        num: "1"
      },
      midscroll: null,
      txt: ""
    };
  },
  components: {
    Header
  },
  methods: {
    submit() {
      if (this.txt) {
        this.$router.replace("/abnormalSuccess");
      } else {
        this.toast("请输入订单异常内容");
      }
    },
     scroll(){
      this.midscroll.scrollTo(0, 0, 0);
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

.clear {
  clear: both;
}

.orderDetail {
  background: #ececec;
  width: 100%;
  height: 100vh;

  .mid {
    text-align: left;
    height: calc(100vh - 40px - 40px);
    overflow: hidden;

    .place {
      padding: cp(30) 0;
      background: white;

      img {
        float: left;
        display: inline-block;
        width: cp(40);
        margin: 0 cp(20);
        margin-top: cp(40);
      }

      p {
        font-size: cp(30);
        color: #bebebe;
        line-height: cp(40);
        margin-top: cp(20);
      }

      .phone {
        margin-left: cp(80);
      }

      .line {
        img {
          width: 100%;
          height: cp(10);
        }
      }
    }

    .information {
      padding: cp(50) cp(20);
      background: white;

      p {
        font-size: cp(32);
        line-height: cp(40);
      }

      .parameter {
        font-size: cp(30);
        line-height: cp(40);
        margin-top: cp(30);
        color: #bebebe;

        span {
          display: inline-block;
          // width: cp(80);
          margin-left: cp(20);
          margin-right: cp(60);
          text-align: center;
          font-size: cp(40);
        }
      }
    }

    .project {
      margin-top: cp(20);
      background: white;
      padding: cp(20);

      p {
        font-size: cp(32);
        line-height: cp(80);

        span {
          float: right;
          width: cp(450);
          color: #bebebe;
        }
      }
    }

    .state {
      background: white;
      margin-top: cp(20);
      padding-bottom: cp(20);

      .title {
        font-size: cp(35);
        padding: cp(30) cp(20);
        border-bottom: 1pt #f9f9f9 solid;
        margin-bottom: cp(20);
      }

      .list {
        padding: cp(20) 0;
        border-left: 1pt #dbdada solid;
        margin-left: cp(50);

        .item {
          margin-left: cp(20);
          font-size: cp(26);
          color: #b9b9b9;
          position: relative;

          img {
            position: absolute;
            left: cp(-32);
            top: cp(16);
            width: cp(20);
          }

          p {
            line-height: cp(60);
          }
        }
      }
    }

    .report {
      background: white;
      margin-top: cp(20);

      .title {
        font-size: cp(35);
        padding: cp(30) cp(20);
        border-bottom: 1pt #f9f9f9 solid;
        margin-bottom: cp(20);
      }

      .report_content {
        width: 100%;
        height: cp(250);
        background: white;
        text-align: center;

        textarea {
          width: 90%;
          height: cp(200);
          border: 0;
          resize: none;
          outline: 0;
          font-size: cp(28);
        }
      }
    }
  }
}

.btns {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;

  button {
    width: 100%;
    color: white;
    background: #f60;
    height: cp(80);
    line-height: cp(80);
    font-size: cp(32);
    border: 0;
    outline: 0;
  }
}
</style>
