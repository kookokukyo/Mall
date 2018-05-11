# 床垫商城

以下资料供参考学习（有的网址访问延迟需要穿墙）：
Vue官网：[https://cn.vuejs.org](https://cn.vuejs.org)
VueRouter中文官网：[https://router.vuejs.org/zh-cn/](https://router.vuejs.org/zh-cn/)
Vuex中文官网：[https://vuex.vuejs.org/zh-cn/](https://vuex.vuejs.org/zh-cn/)
Stylus中文版参考文档：[http://www.zhangxinxu.com/jq/stylus/](http://www.zhangxinxu.com/jq/stylus/)
Axios文档：[https://www.kancloud.cn/yunye/axios/234845](https://www.kancloud.cn/yunye/axios/234845)


### 前端技术栈
* [x] Node（服务器）
* [x] Vue（MVVM框架）
* [x] VueRouter （搭建组件间的路由跳转）
* [x] Vuex （全局引用的变量技术）
* [x] Babel （编译Es6）
* [x] Webpack (打包)
* [x] Stylus（编译CSS的预处理语言）
* [x] Axios（基于 promise 的 HTTP 库）


### 工程目录
``` bash
│
├── README.md                           <=  项目介绍
├── app                                 <=  开发目录
│   ├── dist                            <=  编译打包
│   ├── build                           <=  webpack编译配置
│   ├── config                          <=  项目配置
│   ├── node_modules                    <=  安装的依赖
│   ├── src                             <=  项目源代码
│   │   ├── api                         <=  接口层
│   │   ├── common                      <=  资源层
│   │   ├── base                        <=  组件层
│   │   ├── router                      <=  Vue 路由相关
│   │   ├── store                       <=  Vuex
│   ├── static                          <=  静态资源
├── package.json                        <=  相关依赖
├── index.html                          <=  入口文件