<template>
<div class="submit">
   <Header :title="'提交成功'" :noback="true" :right="false"></Header>
   <div class="bg"></div>
   <div class="mid">
     <img src="~@/common/images/success@2x.png" alt="">
     <p>订单异常已提交成功</p>
     <div class="btns">
       <button @click="$router.back()">返回上一页</button>
     </div>
   </div>
</div>
 
</template>
<script>
import Header from "../base/header";
export default {
  data() {
    return {};
  },
  components: {
    Header
  }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/common';

.bg {
  width: 100%;
  height: calc(100vh - 40px);
  background: #ececec;
  position: absolute;
  z-index: -1;
}

.mid {
  margin-top: cp(100);
  text-align: center;

  img{
    width cp(200)
  }

  p{
    font-size cp(30)
    margin-top cp(30)
  }
}
.btns{
    button{
      border 1pt #f60 solid
      background white
      color #f60
      width cp(300)
      height cp(80)
      line-height cp(80)
      margin-top cp(50)
      border-radius cp(50)
      outline none
      font-size cp(28)
    }
  }
</style>
