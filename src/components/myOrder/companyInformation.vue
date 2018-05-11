<template>
<div class="companyInformation">
  <Header :title="'公司资料下载'" :noback="true" :right="false"></Header>  
  <div class="mid">
    <div class="list">
      <div class="item" v-for="(item, index) in company" @click="download(item.title)">
        <p>{{item.title}}<span class="iconfont">&#xe612;</span></p>
      </div>
    </div>
  </div>
</div>
  
</template>
<script>
import Header from "../base/header";
import BScroll from "better-scroll";
import { Cell } from "mint-ui";

export default {
  data() {
    return {
      company: [
        { title: "公司营业执照下载" },
        { title: "公司客户信息下载" },
        { title: "公司资料下载" }
      ],
      midscroll: null
    };
  },
  components: {
    Header
  },
  methods: {
    download(a) {
      let aLink = document.createElement('a');
      aLink.href = 'http://119.23.254.35:8081/MattressMall/doc.docx';
      aLink.setAttribute('style', 'display:none')
      aLink.setAttribute('id', 'download')
      aLink.setAttribute('download', a)
      document.body.appendChild(aLink)
      let aLinked = document.getElementById("download")
      aLinked.click()
      document.body.removeChild(aLinked)
    }
  },
  mounted() {
    this.midscroll = new BScroll(".mid", {
      click: true,
      scrollY: true
    });
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/common';

.companyInformation {
  width: 100%;
  background: #ececec;
  height: 100vh;

  .mid {
    text-align: left;
    overflow: hidden;
    height: calc(100vh - 40px);

    .item {
      background: white;
      border-bottom: 1pt #ececec solid;

      p {
        font-size: cp(34);
        padding: 0 cp(20);
        height: cp(100);
        line-height: cp(100);

        span {
          float: right;
          display: inline-block;
          margin-top: cp(25);
        }
      }
    }
  }
}
</style>
