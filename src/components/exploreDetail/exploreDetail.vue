<template>
  <div class="exploreDetail">
    <Header :title="'资讯详情'" :noback="true" :right="false"></Header>
    <div class="video" v-if="type=='1'">
      <video style="object-fit: fill;" x5-video-player-type = "h5"  x5-video-player-fullscreen="portrait" webkit-playsinline="true" playsinline="true" controls id="my-video" :src="exploreDetail.videoAddr">
        您的浏览器不支持。
        </video>
    </div>
    <div class="mid">
      <div class="content">
         <h1 class="title">{{exploreDetail.title}}</h1>
        <p>{{exploreDetail.subTitle}}</p>
        <img :src="exploreDetail.picAddr" alt="" class="pic" v-if="type=='0'">
        <p>{{exploreDetail.content}}</p>
        <div class="btn" @click="giveLike(exploreDetail.id)"><span v-if="!like" class="iconfont">&#xe795;</span><span v-else class="iconfont">&#xe796;</span>{{num}}</div>
      </div>
    </div>
    
  </div>
</template>
<script>
import Header from "../base/header";
import { Toast } from "mint-ui";
import BScroll from "better-scroll";

export default {
  data() {
    return {
      type:'',
      num: undefined,
      like: false,
      midscroll: "",
      id:'',
      exploreDetail: {},
      userInfo: {}
    };
  },
  components: {
    Header
  },
  methods: {
    giveLike() {
      if (this.like) {
        this.postData('cancel',{ad_id:this.id,token:this.userInfo.userid}).then(data => {
          if (data.result=='success') {
            this.like = false; 
            Toast("取消点赞成功"); 
            this.num--;
          } else{ Toast("取消点赞失败"); }
        })
      } else {
        this.postData('thumb',{ad_id:this.id,token:this.userInfo.userid}).then(data => {
          if (data.result=='success') {
            this.num++;
            Toast("点赞成功");
            this.like = true;
          }else{
            Toast("点赞失败");
          }
        }) 
      }
    },
    scroll() {
      this.midscroll.scrollTo(0, 0, 200);
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

    this.type=this.$route.query.type
    this.id=this.$route.query.id

     

    if (window.localStorage.getItem("userInfo")) {
      this.userInfo =JSON.parse(window.localStorage.getItem("userInfo"))
    }



    this.postData('view',{ad_id:this.id,token:''}).then(data => {})

    //需要token参数传入
    this.postData('check',{ad_id:this.id,token:this.userInfo.userid}).then(data => {
      if (data.result=='failure') { this.like = true } else { this.like = false }
    })

    this.postData('detail',{id:this.id}).then(data => {
      this.exploreDetail = data.items[0]
      this.num = this.exploreDetail.thumbUpNum
    })

    this.scroll();
     if (this.type=='0') {
        $(".mid").css("height", "calc(100vh - 1.066667rem )");
      } else {
        $(".mid").css("height", "calc(100vh - 1.066667rem - 6rem)");
      }
  },
  deactivated() {
    this.num = undefined;
    this.like = false;
  }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/common';

.iconfont {
  font-size: cp(40);
  margin-right: cp(10);
}

.video {
  height: cp(450);
  overflow: hidden;

  video {
    width: 100%;
    height: cp(450);
    background: #bebebe;
    display: inline-block;
  }
}
.mid {
  text-align: left;
  overflow: hidden;
  height: calc(100vh - 40px);
}

.content {
  padding: cp(20) cp(20) cp(30) cp(20);
}

.title {
  font-size: cp(50);
  font-weight: bold;
}

.mid p {
  font-size: cp(30);
  letter-spacing: 1.5;
  margin: cp(30) 0;
  line-height: cp(40);
}

.mid .pic {
  width: 100%;
  height: cp(400);
  background: #bebebe;
  display: inline-block;
}

.mid .video {
  height: cp(400);
  overflow: hidden;

  video {
    width: 100%;
    background: #bebebe;
    display: inline-block;
  }

 
}

.btn {
  width: 40%;
  margin: 0 auto;
  border: 1pt #fa201f solid;
  height: cp(80);
  line-height: cp(80);
  border-radius: cp(40);
  color: #fa201f;
  font-size: cp(40);
  text-align: center;
  font-weight: bold;
}
</style>
