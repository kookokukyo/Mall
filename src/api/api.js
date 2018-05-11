import axios from 'axios'
import { delData } from './config'
import { index } from './index'
import { explore } from './explore'
import { login } from './login'
import { personal } from './personal'
import qs from 'qs'
import { Toast } from 'mint-ui'
import { mapMutations } from 'vuex'
import { Indicator } from 'mint-ui'
var loadFlag = true
var load = {
  open(flag, str) {
    if (flag == 1) {
      loadFlag = false
    }
    if (str) {
      Indicator.open({
        text: str,
        spinnerType: 'fading-circle'
      });
    } else {
      Indicator.open()
    }
  },
  close(flag) {
    if (flag == 1) {
      loadFlag = true
    }
    if (loadFlag) {
      Indicator.close()
    }
  }
};
const urlData = {
  ...index,
  ...explore,
  ...login,
  ...personal
}

const host = process.env.API_ROOT

const debug = process.env.NODE_ENV !== 'production'

var postData = function(name, m, n) {
  let url = host + urlData[name];
  if (name.substring(0, 4) == 'http') {
    url = name
  }
  return delData(m).then(data => {
    let qsdata = qs.stringify(data)
    return axios.post(url, qsdata)
      .then(r => {
        load.close()
        if (r.data.code == '200') {
          return Promise.resolve(r.data)
        } else {
          Toast({
            message: r.data.msg || '网络异常',
            position: 'bottom',
            duration: 2000
          })
          return Promise.reject(r.data)
        }
      })
      .catch(e => {
        load.close();
        return Promise.reject(false)
      })
  })
};
var getData = function(name, m, n, cb) {
  let url = host + urlData[name];
  if (name.substring(0, 4) == 'http') {
    url = name
  }
  return delData(m).then(data => {
    return axios.get(url, { params: m })
      .then(r => {
        load.close();
        if (r.data.code == '200') {
          return Promise.resolve(r.data)
        } else {
          Toast({
            message: r.data.msg || '网络异常',
            position: 'bottom',
            duration: 2000
          })
          return Promise.reject(r.data)
        }
      })
      .catch(e => {
        console.log(name + '===' + e)
        load.close();
        Toast({
          message: '网络异常',
          position: 'bottom',
          duration: 2000
        })
        return Promise.reject(false)
      })


  })
};

var toast = function(m) {
  Toast({
    message: m || '',
    position: 'bottom',
    duration: 2000
  })
};
let hostUrl = process.env.API_ROOT;
let picUrl = function(url) {
  if (url.substring(0, 4) == 'http') {
    return url
  } else {
    return (hostUrl + url)
  }
}
let focusFix = function(ref) {
  this.$refs[ref].focus()
}
let checkLogin = function() {
  let that = this
  var r = new Promise(function(resolve, reject) {
    if (window.localStorage.getItem("userInfo")) {
      resolve("已登录")
    } else {
      reject("未登录")
    }
  })
  return r
}

export default {
  postData,
  getData,
  load,
  toast,
  hostUrl,
  picUrl,
  focusFix,
  checkLogin,
  install(Vue, options) {
    Vue.prototype.postData = postData;
    Vue.prototype.getData = getData;
    Vue.prototype.host = host;
    Vue.prototype.load = load;
    Vue.prototype.toast = toast;
    Vue.prototype.picUrl = picUrl;
    Vue.prototype.focusFix = focusFix
    Vue.prototype.checkLogin = checkLogin
  }
}