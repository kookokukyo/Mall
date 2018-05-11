import { Toast } from 'mint-ui';

var phone = function(tel) {
  var r = new Promise(function(resolve, reject) {
    var myreg = /^(1\d{10})$/;
    if (!myreg.test(tel)) {
      Toast({
        message: '请输入有效的手机号码！',
        position: 'bottom',
        duration: 2000
      })
      reject("手机号码不正确")
    } else {
      resolve('手机号码正确');
    }
  });
  return r;
};
var isArray = function(arr) {
  if (Object.prototype.toString.call(arr) == '[object Array]') {
    if (arr.length > 0) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}
var isTooLong = function(str, len, name) {
  var r = new Promise(function(resolve, reject) {
    if (str.length > len) {
      if (name) {
        Toast({
          message: name + '不得大于' + len + '字',
          position: 'bottom',
          duration: 2000
        })
      }
      reject(name + '不得大于' + len + '字')
    } else {
      resolve("OK")
    }
  })
  return r
}
var isEmpty = function(str, tip) {
  var r = new Promise(function(resolve, reject) {
    if (typeof str == "undefined" || str == null || str == "") {
      if (tip) {
        Toast({
          message: tip,
          position: 'bottom',
          duration: 2000
        })
      }
      reject('字符串为空！')
    } else {
      resolve('字符串不为空！');
    }
  });
  return r;
};

var isChinese = function(name, tip) {
  var r = new Promise(function(resolve, reject) {
    var chineseReg = /^[\u4e00-\u9fa5]{2,}$/
    if (!chineseReg.test(name)) {
      Toast({
        message: tip,
        position: 'bottom',
        duration: 2000
      })
      reject(tip)
    } else {
      resolve('正确');
    }
  })
  return r
}


export default {
  phone,
  isArray,
  isEmpty,
  isChinese,
  install(Vue, options) {
    Vue.prototype.validate = {
      phone: phone,
      isEmpty: isEmpty,
      isArray: isArray,
      isChinese: isChinese,
      isTooLong: isTooLong
    }
  }
}