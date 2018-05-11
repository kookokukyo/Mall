<template>
<div class="uploadContract">
  <Header :title="'上传合同'" :noback="true" :right="false"></Header>
  <div class="bg"></div>
  <div class="mid">
    <div>
      <div class="info">
        <img src="~@/common/images/timg2.jpg" alt=""> 
        <h6>四星级酒店</h6> 
        <p><span><span>正面面料2</span></span><span><span> + </span><span>舒适层4</span></span><span><span> + </span><span>垫层1</span></span><span><span> + </span><span>内胆4</span></span><span><span> + </span><span>垫层20</span></span><span><span> + </span><span>舒适层24</span></span><span><span> + </span><span>反面面料1</span></span><span><span> + </span><span>边布面料0</span></span><span><span> + </span><span>高度2</span></span><span><span> + </span><span>软硬度4</span></span><span><span> + </span><span>款式4</span></span></p>
      </div>
      <div class="upload">
        <li v-for="(v, index) in imgList"><img :src="v" alt=""><span class="iconfont" @click="del(index)">&#xe62b;</span></li>
        <li class="iconfont" @click="upload()">&#xe602;</li>
      </div>
    </div>
    <input class="input-upload" ref="inputUpload" style="display:none" type="file" accept="image/*" @change="picChange($event)" multiple> 
  </div>
  <div class="btn" @click="submit()">提交合同</div>
</div>
 
</template>
<script>
import Header from "../base/header";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      imgList: [],
      scroll: null
    };
  },
  components: {
    Header
  },
  methods: {
    upload() {
      this.$refs.inputUpload.click();
    },
    picChange(e) {
      let files = e.target.files;
      let that = this;
      if (files && files.length) {
        for (let i = 0; i < files.length; i++) {
          let reader = new FileReader();
          reader.onload = function(ev) {
            that.imgList.push(ev.target.result);
          };
          reader.readAsDataURL(files[i]);
        }
      }
    },
    del(index) {
      this.imgList.splice(index, 1);
    },
    submit() {
      if(this.imgList.length){
        this.$router.replace("/contractSuccess")
      }else{
        this.toast("请上传合同图片")
      }
    }
  },
  mounted() {
    this.scroll = new BScroll(".mid", {
      click: true,
      scrollY: true,
      bounceTime: 400
    });
  },
  deactivated() {
    this.imgList = []
  }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/common';

.uploadContract {
  background: #eee;

  .mid {
    text-align: left;
    height: calc(100vh - 40px - 40px);

    .info {
      padding: cp(30);
      height: cp(130);
      background: #fff;
      margin-bottom: cp(20);

      img {
        float: left;
        width: cp(130);
        height: cp(130);
        margin-right: cp(18);
      }

      h6 {
        font-size: cp(32);
        line-height: cp(60);
      }

      p {
        font-size: cp(24);
        line-height: cp(36);
        color: #999;
        height: cp(72);
        overflow: hidden;
      }
    }

    .upload {
      background: #fff;
      padding: cp(12);

      &:after {
        content: '';
        display: block;
        clear: both;
      }

      li {
        width: cp(216);
        height: cp(216);
        border: 1pt solid #ccc;
        margin: cp(10);
        float: left;
        line-height: cp(216);
        font-size: cp(108);
        color: #bbb;
        position: relative;

        img {
          width: 100%;
          height: 100%;
        }

        span {
          position: absolute;
          top: cp(8);
          right: cp(8);
          color: #f00;
        }
      }
    }
  }
  .btn{
    position fixed
    bottom 0
    width 100%
    background #f60
    color #fff
    font-size cp(32)
    line-height cp(80)
    height cp(80)
  }
}
</style>
