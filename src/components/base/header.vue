<template>
  <mt-header :title="title">
  <mt-button slot="left" v-if="noback" icon="back" @click="$router.back()"></mt-button>
  <mt-button icon="more" v-if="right" slot="right"></mt-button>
</mt-header>
</template>
<script>
import { Header } from 'mint-ui';

export default {
  data() {
    return{
      
    }
  },
  props: {
    title: String,
    right: Boolean,
    noback: Boolean
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/common'
.mint-header
  background #f60 !important
  color #fff !important
  height cp(80) !important
.mint-button-icon
  padding cp(20) !important
  margin cp(-20) !important
.mint-header-title
  font-size cp(32) !important
  color #fff !important
</style>

