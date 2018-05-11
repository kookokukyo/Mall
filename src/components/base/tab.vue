<template>
<mt-tabbar v-model="selected" fixed>
  <mt-tab-item id="index"><img v-if="selected=='index'" slot="icon" src="~@/common/images/icon_1@2x.png"><img v-else slot="icon" src="~@/common/images/icon_1wei@2x.png">首页</mt-tab-item>
  <mt-tab-item id="explore"><img v-if="selected=='explore'" slot="icon" src="~@/common/images/icon_2@2x.png"><img v-else slot="icon" src="~@/common/images/icon_2_wei@2x.png">发现</mt-tab-item>
  <mt-tab-item id="catagory"><img v-if="selected=='catagory'" slot="icon" src="~@/common/images/icon_3@2x.png"><img v-else slot="icon" src="~@/common/images/icon_3_wei@2x.png">定制中心</mt-tab-item>
  <mt-tab-item id="cart"><img v-if="selected=='cart'" slot="icon" src="~@/common/images/icon_4@2x.png"><img v-else slot="icon" src="~@/common/images/icon_4_wei@2x.png">购物车</mt-tab-item>
  <mt-tab-item id="personal"><img v-if="selected=='personal'" slot="icon" src="~@/common/images/icon_5@2x.png"><img v-else slot="icon" src="~@/common/images/icon_5_wei@2x.png">个人</mt-tab-item>
</mt-tabbar>
</template>
<script>
import { Tabbar, TabItem } from "mint-ui";

export default {
  data() {
    return {
      selected: "index"
    };
  },
  watch: {
    selected: function(val, oldVal) {
      this.$router.replace("/" + val);
    }
  },
  activated() {
    this.selected = this.$route.name.slice(1);
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/common';

.mint-tabbar {
  height cp(110) !important
  .mint-tab-item{
    padding cp(14) 0
    .mint-tab-item-icon{
      width cp(48) !important
      height auto !important
      img{
        vertical-align top
      }
    }
  }
  .mint-tab-item.is-selected {
    background: #fafafa !important;
    color #ec6517
  }
  .mint-tab-item-label {
    font-size cp(24)
  }
}
</style>