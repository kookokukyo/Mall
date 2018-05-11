<template>
  <div class="myresume">
    <div class="top">
      <mt-header title="我的简历">
        <mt-button slot="left" icon="back" @click="$router.back()"></mt-button>
        <mt-button slot="right" v-show="!editor && userInfo.info" @click="editorchoose(true)">编辑</mt-button>
        <mt-button slot="right" v-show="editor" @click="editorchoose(false)">取消</mt-button>
      </mt-header>
    </div>
    <div class="mid">
      <div class="content">
        <div class="text" v-if="!editor && userInfo.info">
          <p>{{userInfo.info}}</p>
        </div>
        <div class="textarea" v-else @click="focusFix('content')">
          <textarea placeholder="请填写简历" v-model="content" ref="content"></textarea>
        </div>
      </div>
    </div>
    <div class="bottom" v-if="editor || !userInfo.info">
      <button @click="submit()">保存简历</button>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
  data() {
    return {
      editor: false,
      midscroll: null,
      content: "",
      userInfo: {}
    };
  },
  methods: {
    editorchoose(flag) {
      if (flag) {
        this.editor = true;
        $(".mid").css("height", "calc(100vh - 1.066667rem - 1.066667rem)");
      } else {
        this.editor = false;
        $(".mid").css("height", "calc(100vh - 1.066667rem)");
      }
    },
    submit() {
      this.userInfo.info = this.content;
      this.save()
    },
    save() {
      window.localStorage.setItem("userInfo", JSON.stringify(this.userInfo));
    },
  },
  mounted() {
    this.midscroll = new BScroll(".mid", {
      click: true,
      scrollY: true
    });
  },
  activated() {
    this.checkLogin()
      .then(r => {
        this.userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
        this.name = this.userInfo.name;
        this.code = this.userInfo.idcardno;
      })
      .catch(r => {
        this.$router.back();
      });
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/common';

.myresume {
  width: 100%;
  height: 100vh;
  background: #ebebeb;

  .top {
    .mint-header {
      background: #f60 !important;
      color: #fff !important;
      height: cp(80) !important;
    }

    .mint-button-icon {
      padding: cp(20) !important;
      margin: cp(-20) !important;
    }

    .mint-header-title {
      font-size: cp(32) !important;
      color: #fff !important;
    }
  }

  .mid {
    text-align: left;
    overflow: hidden;
    height: calc(100vh - 40px);

    .content {
      background: white;
      font-size: cp(30);
      padding: cp(20);

      .text {
        height: cp(300);
      }

      .textarea {
        height: cp(300);

        textarea {
          width: 100%;
          height: cp(300);
          border: 0;
          outline: 0;
          resize: none;
          font-size: cp(30);
        }
      }
    }
  }

  .bottom {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;

    button {
      background: #ff6600;
      width: 100%;
      height: cp(80);
      line-height: cp(80);
      border: 0;
      outline: 0;
      color: white;
      font-size: cp(32);
    }
  }
}
</style>
