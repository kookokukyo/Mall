<template>
  <div class="addressList">
     <Header :title="'管理收货地址'" :noback="true" :right="false"></Header>
     <div class="mid">
       <div class="list">
         <div class="item" v-for="(item,index) in address" @click="give(index)">
           <p class="name">{{item.name}}<span>{{item.phone}}</span></p>
           <p class="place">{{item.place}}</p>
           <p></p>
         </div>
       </div>
     </div>
     <div class="bottom">
       <div class="btn" @click="$router.push('/address')">添加新地址</div>
     </div>
  </div>
</template>
<script>
import Header from "../base/header";
import BScroll from "better-scroll";

export default {
  data() {
    return {
      address: [
        {
          name: "呵呵",
          phone: "18205050303",
          place:
            "江苏省无锡市新误区你说的那撒旦撒旦阿斯顿撒大声道实打实的撒打算是大三大四的",
          default: true
        },
        {
          name: "呵呵",
          phone: "18205050303",
          place:
            "江苏省无锡市新误区你说的那撒旦撒旦阿斯顿撒大声道实打实的撒打算是大三大四的1",
          default: false
        },
        {
          name: "呵呵",
          phone: "18205050303",
          place:
            "江苏省无锡市新误区你说的那撒旦撒旦阿斯顿撒大声道实打实的撒打算是大三大四的",
          default: false
        },
        {
          name: "呵呵",
          phone: "18205050303",
          place:
            "江苏省无锡市新误区你说的那撒旦撒旦阿斯顿撒大声道实打实的撒打算是大三大四的",
          default: false
        },
        {
          name: "呵呵",
          phone: "18205050303",
          place:
            "江苏省无锡市新误区你说的那撒旦撒旦阿斯顿撒大声道实打实的撒打算是大三大四的",
          default: false
        },
        {
          name: "呵呵",
          phone: "18205050303",
          place:
            "江苏省无锡市新误区你说的那撒旦撒旦阿斯顿撒大声道实打实的撒打算是大三大四的",
          default: false
        },
        {
          name: "呵呵",
          phone: "18205050303",
          place:
            "江苏省无锡市新误区你说的那撒旦撒旦阿斯顿撒大声道实打实的撒打算是大三大四的",
          default: false
        },
        {
          name: "呵呵",
          phone: "18205050303",
          place:
            "江苏省无锡市新误区你说的那撒旦撒旦阿斯顿撒大声道实打实的撒打算是大三大四的",
          default: false
        }
      ],
      midscroll: null
    };
  },
  components: {
    Header
  },
  methods: {
    give(index) {
      let place = this.address[index].place;
      window.sessionStorage.setItem("place", place);
      this.$router.back();
    }
  },
  mounted() {
    this.midscroll = new BScroll(".mid", {
      click: true,
      scrollY: true
    });
  },
  activated() {
  }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/common';

.addressList {
  background: #ececec;
  width: 100%;
  height: 100vh;

  .mid {
    text-align: left;
    overflow: hidden;
    height: calc(100vh - 40px - 40px);

    .item {
      padding: cp(20);
      background: white;
      border-bottom: 1pt #ececec solid;

      .name {
        font-size: cp(40);
        line-height: cp(80);

        span {
          float: right;
        }
      }

      .place {
        font-size: cp(24);
        line-height: cp(40);

        span {
          color: #f60;
        }
      }
    }
  }

  .bottom {
    height: cp(80);
    line-height: cp(80);
    width: 100%;
    background: white;

    .btn {
      background: #f60;
      color: white;
      font-size: cp(32);
    }
  }
}
</style>
