<template>
  <div class="login">
    <span class="iconfont">&#xe62c;</span>
    <p>您还未登录，请登录后查看</p>
    <button @click="login()">立即登录</button>
  </div>
</template>
<script>
import { Tabbar, TabItem } from "mint-ui";

export default {
  data() {
    return {};
  },
  methods: {
    login() {
      window.localStorage.setItem("loginFrom", this.$route.name);
      this.$router.push("/login");
    }
  },
  activated() {}
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/common';

.login {
  background: #f0f0f0;
  height: calc(100vh - 40px - 55px);
  box-sizing: border-box;
  padding-top: cp(200);

  .iconfont {
    width: cp(300);
    height: cp(300);
    font-size: cp(256);
    line-height: cp(300);
    color: #aaa;
  }

  p {
    font-size: cp(32);
    line-height: cp(60);
    color: #666;
  }

  button {
    display: block;
    width: cp(220);
    margin: 0 auto;
    background: none;
    border: 1pt solid #f60;
    color: #f60;
    margin-top: cp(40);
    font-size: cp(32);
    line-height: cp(70);
    border-radius: cp(12);
    outline: 0;
  }
}
</style>