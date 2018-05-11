<template>
  <div class="sidebar">
    <transition name="slidR">
      <ul class="sidebarlist" v-show="!animate">
        <li v-show="sidebarnum" class="back" @click="backSidebar()"><span><i class="iconfont" style="margin-right:5px;margin-top: 4px;">&#xe6e7;</i>返回</span></li>
        <li v-if="!v.subname" v-for="(v, index) in sidebar" :class="(!v.subcol && v.name==sidebarendname) || (!v.subcol && !sidebarendname && index==0) ? 'select' : ''" :key="v.name" @click="changeSidebar(index, v.subcol, undefined, v.name)">{{v.name}}</li>
        <li v-if="v.subname" v-for="(v, index) in sidebar" class="hasSubname" :key="v.name" @click="sidebarname = v.name">{{v.name}}
          <ul style="display:none">
            <li style="background:#eee" v-for="(vv, vindex) in v.subname" :key="vv.name" @click="changeSidebar(index, vv.subcol, vindex, vv.name)" >{{vv.name}}</li>
          </ul>
        </li>
      </ul>
    </transition>
    <transition name="slidR">
    <div class="history" v-show="!animate">
      <div class="historybtn" @click="$router.push('/recentOrder')">最近订单</div>
    </div>
    </transition>
  </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
  data() {
    let subcol1 = [
      { name: "正面面料" },
      { name: "舒适层" },
      { name: "垫层" },
      { name: "内胆" },
      { name: "垫层2" },
      { name: "舒适层2" },
      { name: "反面面料" },
      { name: "边布面料" },
      { name: "高度" },
      { name: "软硬度" },
      { name: "款式" }
    ];
    let subcol2 = [
      { name: "正面面料" },
      { name: "舒适层" },
      { name: "垫层" },
      { name: "内胆" },
      { name: "垫层2" },
      { name: "反面面料" },
      { name: "边布面料" },
      { name: "高度" },
      { name: "软硬度" },
      { name: "款式" }
    ];
    let subcol3 = [
      { name: "正面面料" },
      { name: "舒适层" },
      { name: "内胆" },
      { name: "反面面料" },
      { name: "边布面料" },
      { name: "高度" },
      { name: "软硬度" },
      { name: "款式" }
    ];
    let subcol4 = [
      { name: "正面面料" },
      { name: "内胆" },
      { name: "反面面料" },
      { name: "边布面料" },
      { name: "高度" },
      { name: "软硬度" },
      { name: "款式" }
    ];
    return {
      sidebardata: [
        {
          name: "床垫",
          subcol: [
            {
              name: "五星级酒店",
              subcol: subcol1
            },
            {
              name: "四星级酒店",
              subcol: subcol1
            },
            {
              name: "三星级酒店",
              subcol: subcol2
            },
            {
              name: "经济型酒店",
              subname: [
                {
                  name: "经济型A类",
                  subcol: subcol2
                },
                {
                  name: "经济型B类",
                  subcol: subcol2
                }
              ]
            },
            {
              name: "薄垫",
              subname: [
                {
                  name: "薄垫A类",
                  subcol: subcol3
                },
                {
                  name: "薄垫B类",
                  subcol: subcol4
                }
              ]
            }
          ]
        },
        {
          name: "床架",
          subcol: [
            { name: "多层板15高" },
            { name: "多层板20高" },
            { name: "全木框15高" }
          ]
        }
      ],
      animate: false,
      sidebar: [],
      sidebarindex: [],
      sidebarnum: 0,
      sidebarname: "",
      sidebarscroll: null
    };
  },
  props: {
    sidebarendname: String
  },
  methods: {
    changeSidebar(index, subcol, vindex, name) {
      if (subcol) {
        this.animate = true;
        if (!subcol[0].subcol) {
          setTimeout(() => {
            this.sidebarscroll.refresh();
          }, 10);
          setTimeout(() => {
            $(".sidebar").css(
              "height",
              "calc(100vh - 1.066667rem - 1.466667rem - 1.066667rem)"
            );
          }, 300);
          if (name) {
            window.localStorage.setItem("catagory", name);
          }
          this.$emit("change", true, subcol);
        } else {
          setTimeout(() => {
            this.sidebarscroll.refresh();
          }, 10);
          setTimeout(() => {
            $(".sidebar").css(
              "height",
              "calc(100vh - 1.066667rem - 1.466667rem)"
            );
          }, 300);
        }
        let that = this;
        setTimeout(() => {
          that.sidebarnum++;
          that.sidebarindex.push(index);
          that.sidebar = subcol;
          that.animate = false;
        }, 300);
      } else {
        let that = this;
        setTimeout(() => {
          that.$emit("change", true, name, index);
        }, 10);
      }
    },
    backSidebar(fromH) {
      this.animate = true;
      if (!fromH) {
        this.$emit("change", false);
      }
      let that = this;
      setTimeout(() => {
        $(".sidebar").css("height", "calc(100vh - 1.066667rem - 1.466667rem)");
        if (that.sidebarnum == 2) {
          that.sidebar = that.sidebardata[that.sidebarindex[0]]["subcol"];
        } else {
          that.sidebar = that.sidebardata;
        }
        that.sidebarnum--;
        that.sidebarindex.pop();
        that.animate = false;
      }, 300);
    },
    clear(){
      for (let i = 0; i < this.sidebarindex.length; i++) {
        this.backSidebar(true);
      }
    }
  },
  mounted() {
    this.sidebar = this.sidebardata;
    $(document).on("click", ".hasSubname", function() {
      $(this)
        .siblings()
        .children("ul")
        .slideUp();
      $(this)
        .children("ul")
        .slideDown();
    });
    this.sidebarscroll = new BScroll(".sidebar", {
      click: true,
      scrollY: true,
      bounceTime: 400
    });
  },
  activated() {
    if (window.localStorage.getItem("fromHistoryOrder") == "true") {
      for (let i = 0; i < this.sidebarindex.length; i++) {
        this.backSidebar(true);
      }
      this.changeSidebar(0, this.sidebardata[0].subcol);
      this.changeSidebar(1, this.sidebardata[0].subcol[1].subcol);
    } else if (window.localStorage.getItem("editCart")) {
      for (let i = 0; i < this.sidebarindex.length; i++) {
        this.backSidebar(true);
      }
      let editCart = JSON.parse(window.localStorage.getItem("editCart"));
      for (let i = 0; i < this.sidebardata.length; i++) {
        if (editCart.name == this.sidebardata[i].name) {
          this.changeSidebar(i, this.sidebardata[i].subcol);
        } else {
          for (let j = 0; j < this.sidebardata[i].subcol.length; j++) {
            if (editCart.name == this.sidebardata[i].subcol[j].name) {
              this.changeSidebar(i, this.sidebardata[i].subcol);
              this.changeSidebar(j, this.sidebardata[i].subcol[j].subcol);
            } else if (this.sidebardata[i].subcol[j].subname) {
              for (
                let k = 0;
                k < this.sidebardata[i].subcol[j].subname.length;
                k++
              ) {
                if (
                  editCart.name == this.sidebardata[i].subcol[j].subname[k].name
                ) {
                  this.changeSidebar(i, this.sidebardata[i].subcol);
                  this.changeSidebar(
                    j,
                    this.sidebardata[i].subcol[j].subname[k].subcol,
                    k
                  );
                }
              }
            }
          }
        }
      }
    }
  },
  deactivated() {}
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/animation';
@import '~@/common/stylus/common';

.sidebar {
  position: fixed;
  top: cp(80);
  left: 0;
  width: cp(180);
  height: calc(100vh - 40px - 55px);
  overflow: hidden;

  ul {
    padding-bottom: cp(180);

    li {
      font-size: cp(28);
      line-height: cp(100);
      border-bottom: 1pt solid #eee;

      ul {
        padding: 0;
      }

      li {
        line-height: cp(80);
      }
    }

    li.select {
      font-size: cp(32);
      background: #f3f3f3;
      color: #f60;
    }

    li.back {
      line-height: cp(45);
      padding: cp(20) 0;
      color: #999;

      span {
        display: inline-block;
        padding: 0 cp(20) 0 cp(10);
        border-radius: cp(25);
        font-size: cp(24);
        border: 1pt solid #999;
      }
    }
  }

  .history {
    position: absolute;
    bottom: 0;
    width: cp(180);
    height: cp(180);
    border: none;
    background: #fff;

    .historybtn {
      width: cp(138);
      height: cp(30);
      line-height: cp(30);
      padding: cp(84) 0 cp(24);
      margin: cp(20);
      border-radius: 50%;
      border: 1pt solid #f60;
      font-size: cp(24);
      background: url('~@/common/images/recentorder@2x.png') no-repeat center 10px;
      background-size: 30%;
    }
  }
}
</style>
