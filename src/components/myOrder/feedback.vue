<template>
  <div class="feedback">
    <Header :title="'意见反馈'" :noback="true" :right="false"></Header>
    <div class="mid">
      <div class="content"> 
        <div class="text" @click="focusFix('text')">
          <textarea placeholder="请输入您要咨询的问题" v-model="text" ref="text"></textarea>
        </div>
        <div class="upload">
          <li v-for="(v, index) in imgList"><img :src="v" alt=""><span class="iconfont" @click="del(index)">&#xe62b;</span></li>
          <li class="iconfont" @click="upload()">&#xe602;</li>
        </div>
        <div class="contact">
          <p @click="focusFix('contact')">联系方式<input type="text" v-model="contact" placeholder="请输入您的联系方式" ref="contact"></p>
        </div>
      </div>
    </div>
    <div class="btns">
      <div class="btn" @click="submit()">提交</div>
    </div>
    <input class="input-upload" ref="inputUpload" style="display:none" type="file" accept="image/*" @change="picChange($event)" multiple> 
  </div>  
</template>
<script>
import Header from "../base/header";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      text: "",
      contact: "",
      midscroll: "",
      imgList: []
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
      this.validate.isEmpty(this.text, "问题不能为空").then(r => {
        this.validate.isEmpty(this.contact, "联系方式不能为空").then(r => {
          this.toast("提交成功");
          this.$router.back();
        });
      });
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
    this.text = "";
    this.contact = "";
    this.imgList = []
  }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/common';

.feedback {
  width: 100%;
  height: 100vh;
  background: #ececec;

  .mid {
    overflow: hidden;
    height: calc(100vh - 40px - 40px);

    .text {
      width: 100%;
      background: white;
      height: cp(400);
      padding: cp(20) 0;

      textarea {
        border: 0;
        outline: 0;
        width: 90%;
        margin: 0 auto;
        resize: none;
        height: cp(400);
        font-size: cp(28);
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

    .contact {
      text-align: left;
      font-size: cp(30);
      background: white;
      margin-top: cp(30);
      height: cp(100);
      line-height: cp(100);

      p {
        padding: 0 cp(20);
      }

      input {
        width: cp(500);
        margin-left: cp(20);
      }
    }
  }

  .btns {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;

    .btn {
      background: #f60;
      color: white;
      width: 100%;
      font-size: cp(32);
      height: cp(80);
      line-height: cp(80);
    }
  }
}
</style>
