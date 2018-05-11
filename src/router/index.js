import Vue from 'vue'
import Router from 'vue-router'
import storage from 'good-storage'
Vue.use(Router)
export const index = [
  { path: '/', redirect: '/index' },
  { path: '/index', name: '/index', znName: '首页', component: resolve => { require(['@/components/index'], resolve); } },
  { path: '/search', name: '/search', znName: '搜索', component: resolve => { require(['@/components/search/search'], resolve); } }
];
export const catagory = [
  { path: '/catagory', name: '/catagory', znName: '分类', component: resolve => { require(['@/components/catagory'], resolve); } },
  { path: '/goodsDetail', name: '/goodsDetail', znName: '商品详情', component: resolve => { require(['@/components/goodsDetail/goodsDetail'], resolve); } },
  { path: '/recentOrder', naem: '/recentOrder', znName: '最近订单', component: resolve => { require(['@/components/myOrder/recentOrder'], resolve); } }
];
export const explore = [
  { path: '/explore', name: '/explore', znName: '发现', component: resolve => { require(['@/components/explore'], resolve); } },
  { path: '/exploreDetail', naem: '/exploreDetail', znName: '发现详情', component: resolve => { require(['@/components/exploreDetail/exploreDetail'], resolve); } }
];
export const cart = [
  { path: '/cart', name: '/cart', znName: '购物车', component: resolve => { require(['@/components/cart'], resolve); } },
  { path: '/confirmOrder', name: '/confirmOrder', znName: '成品订单确认', component: resolve => { require(['@/components/myOrder/confirmOrder'], resolve); } },
  { path: '/address', name: '/address', znName: '添加地址', component: resolve => { require(['@/components/myOrder/address'], resolve); } },
];
export const personal = [
  { path: '/personal', name: '/personal', znName: '个人中心', component: resolve => { require(['@/components/personal'], resolve); } },
  { path: '/myOrder', name: '/myOrder', znName: '我的订单', component: resolve => { require(['@/components/myOrder/myOrder'], resolve); } },
  { path: '/orderDetail', name: '/orderDetail', znName: '订单详情', component: resolve => { require(['@/components/myOrder/orderDetail'], resolve); } },
  { path: '/submitSuccess', name: '/submitSuccess', znName: '提交成功', component: resolve => { require(['@/components/result/submitSuccess'], resolve); } },
  { path: '/myCommission', name: '/myCommission', znName: '我的钱包', component: resolve => { require(['@/components/myOrder/myCommission'], resolve); } },
  { path: '/abnormalOrder', name: '/abnormalOrder', znName: '异常订单', component: resolve => { require(['@/components/myOrder/abnormalOrder'], resolve); } },
  { path: '/abnormalDetail', name: '/abnormalDetail', znName: '异常订单详情', component: resolve => { require(['@/components/myOrder/abnormalDetail'], resolve); } },
  { path: '/addressList', name: '/addressList', znName: '地址列表', component: resolve => { require(['@/components/myOrder/addressList'], resolve); } },
  { path: '/abnormalSuccess', name: '/abnormalSuccess', znName: '异常提交成功', component: resolve => { require(['@/components/result/abnormalSuccess'], resolve); } },
  { path: '/contractSuccess', name: '/contractSuccess', znName: '合同提交成功', component: resolve => { require(['@/components/result/contractSuccess'], resolve); } },
  { path: '/uploadContract', name: '/uploadContract', znName: '上传合同', component: resolve => { require(['@/components/myOrder/uploadContract'], resolve); } },
  { path: '/companyInformation', name: '/companyInformation', znName: '公司资料下载', component: resolve => { require(['@/components/myOrder/companyInformation'], resolve); } },
  { path: '/feedback', name: '/feedback', znName: '意见反馈', component: resolve => { require(['@/components/myOrder/feedback'], resolve); } },
  { path: '/service', name: '/service', znName: '公司客服信息', component: resolve => { require(['@/components/myOrder/service'], resolve); } },
  { path: '/login', name: '/login', znName: '登录', component: resolve => { require(['@/components/login'], resolve); } },
  { path: '/reg', name: '/reg', znName: '注册', component: resolve => { require(['@/components/reg'], resolve); } },
  { path: '/myPersonal', name: '/myPersonal', znName: '我的个人资料', component: resolve => { require(['@/components/myOrder/myPersonal'], resolve); } },
  { path: '/idCard', name: '/idCard', znName: '身份证信息', component: resolve => { require(['@/components/myOrder/idCard'], resolve); } },
  { path: '/myresume', name: '/myresume', znName: '我的简历', component: resolve => { require(['@/components/myOrder/myresume'], resolve); } },

];
export const routers = [
  ...index,
  ...catagory,
  ...explore,
  ...cart,
  ...personal,
];

const router = new Router({
  routes: routers
})

export default router