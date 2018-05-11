<template>
  <transition name="fade">
    <div class="addcart" v-show="visible">
      <div class="layout" @click="$emit('update:visible', false)"></div>
      <div class="option">
        <div class="info">
          <img src="~@/common/images/timg2.jpg" alt="">
          <h6>{{name}}</h6>
          <p><span v-for="(v, index) in data"><span v-show="index"> + </span><span v-for="vv in v">{{vv}}</span></span></p>
        </div>
        <div class="select">
          <p>床型</p>
          <div class="item"><li v-for="(v, index) in shape" @click="changeShape(v, index)" :class="v == shapename ? 'selected' : ''">{{v}}</li></div>
        </div>
        <div class="select">
          <p>{{selectshape ? '直径' : '尺寸'}}</p>
          <div class="item"><li v-for="v in size[selectshape]" @click="changeSize(v)" :class="v == sizename ? 'selected' : ''">{{v}}</li></div>
        </div>
        <div class="select">
          <p>数量</p>
          <div class="count"><span @click="minusNum()" class="iconfont">&#xe6af;</span><kbd><input type="number" v-model="num" @change="check()"/></kbd><span @click="plusNum()" class="iconfont">&#xe6b3;</span></div>
        </div>
        <div class="btn" @click="confirm()">确定</div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  data() {
    return {
      shape: ["长方形", "圆形"],
      size: [["1.2米", "1.5米", "1.8米"], ["2.2米", "2.4米"]],
      selectshape: 0,
      shapename: "",
      sizename: "",
      num: 0
    };
  },
  props: {
    visible: Boolean,
    name: String,
    data: Array
  },
  methods: {
    changeShape(name, index) {
      this.shapename = name;
      this.selectshape = index;
      this.sizename = this.size[index][0];
    },
    changeSize(name) {
      this.sizename = name;
    },
    plusNum() {
      this.num++;
    },
    minusNum() {
      if (this.num) {
        this.num--;
      }
    },
    confirm() {
      if (!this.shapename) {
        this.toast("请选择床型");
      } else if (!this.sizename) {
        this.toast("请选择尺寸");
      } else if (!this.num) {
        this.toast("请选择数量");
      } else {
        let cartData = window.localStorage.getItem("cart")
          ? JSON.parse(window.localStorage.getItem("cart"))
          : [];
        if (window.localStorage.getItem("editIndex") == "") {
          cartData.unshift({
            data: this.data,
            name: window.localStorage.getItem("catagory"),
            shapename: this.shapename,
            sizename: this.sizename,
            num: this.num
          });
        } else {
          cartData[window.localStorage.getItem("editIndex")] = {
            data: this.data,
            name: window.localStorage.getItem("catagory"),
            shapename: this.shapename,
            sizename: this.sizename,
            num: this.num
          };
        }
        window.localStorage.setItem("cart", JSON.stringify(cartData));
        this.$emit("update:visible", false);
        this.$emit("clear");
        this.$router.replace("/cart");
      }
    },
    check() {
      this.num = parseInt(this.num);
      if (isNaN(this.num)) {
        this.num = 0;
        this.toast("请输入正确的数量")
      }
    }
  },
  activated() {
    this.shapename = this.shape[0];
    this.sizename = this.size[0][0];
    this.selectshape = 0;
    this.num = 0;
    if (window.localStorage.getItem("fromHistoryOrder") == "true") {
    } else if (window.localStorage.getItem("editCart")) {
      let editCart = JSON.parse(window.localStorage.getItem("editCart"));
      this.shapename = editCart.shapename;
      this.sizename = editCart.sizename;
      this.selectshape = editCart.shapename == "长方形" ? 0 : 1;
      this.num = editCart.num;
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/animation';
@import '~@/common/stylus/common';

.addcart {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 1000;

  .layout {
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
  }

  .option {
    background: #fafafa;
    position: absolute;
    width: 100%;
    z-index: 1001;
    bottom: 0;
    text-align: left;
    padding: cp(30) 0 0;

    .info {
      padding: cp(10) cp(30);
      height: cp(130);

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
        line-height: cp(35);
        color: #999;
        height: cp(70);
        overflow: hidden;
      }
    }

    .select {
      padding: cp(10) cp(30);

      p {
        font-size: cp(30);
        color: #333;
        line-height: cp(70);
      }

      .item {
        height: cp(50);

        li {
          display: inline-block;
          font-size: cp(26);
          line-height: cp(50);
          vertical-align: top;
          padding: 0 cp(16);
          background: #dcdcdc;
          color: #666;
          margin-right: cp(20);
        }

        li.selected {
          background: #f60;
          color: #fff;
        }
      }

      .count {
        line-height: cp(40);
        height: cp(40);
        background: #ffffff;
        display: block;
        width: cp(190);
        border: 1pt solid #ccc;
        border-radius: cp(10);

        span {
          color: #999;
          vertical-align: top;
          line-height: cp(40);
          width: cp(40);
          height: cp(40);
          font-size: cp(32);
        }

        kbd {
          display: inline-block;
          font-size: cp(32);
          height: cp(40);
          line-height: cp(40);
          width: cp(100);
          text-align: center;
          border-left: 1pt solid #ccc;
          border-right: 1pt solid #ccc;
          vertical-align: top;
          color: #666;

          input {
            display: block;
            text-align: center;
          }
        }
      }
    }

    .btn {
      height: cp(80);
      line-height: cp(80);
      color: #fff;
      background: #f60;
      text-align: center;
      font-size: cp(32);
      margin-top: cp(30);
    }
  }
}
</style>
