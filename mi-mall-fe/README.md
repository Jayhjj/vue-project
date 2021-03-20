1. 首先把各种软件安装配置好 node git vue-cli
2. 项目目录的搭建  
   - 解决跨域问题 用jsonp 或者 cros 进行跨域
   - 对接口进行一个梳理
   - 进行路由封装  跳转到各个界面
   - 进行storage封装
   - 错误接口拦截  在main.js中 通过axios 进行错误的拦截
   - 接口环境的设置 在env.js中实现对接口环境的配置
   - 对Mock进行设置  用mockjs 实现对登入数据的模拟实现
3. 制作页面
   - 首页   对navheader和navfooter进行组件化封装  编写servicebar组件  modal组件和交互

   - 登入   登入交互和拉取用户信息  通过axios进行输入用户信息的验证 在web服务器端是否已经保存了信息，如果有，直接从cookie里面返回

   - vuex集成 对状态的管理  出现多个视图组件依赖同一个状态，来自不同视图的行为需要变更同一个状态，它能把组件的共享状态抽取出来，当做一个全局单例模式进行管理。这样不管你在何处改变状态，都会通知使用该状态的组件做出相应修改。 
     mutations就是存放如何更改状态
     actions就是mutation的加强版，它可以通过commit mutations中的方法来改变状态，最重要的是它可以进行异步操作。

   - 产品站 ，组件吸顶(productparam.vue)  slide 动画实现
   - 商品详情页面
   - 购物车
   - element-ui 解构出message组件，实现弹窗的提醒效果
   
4. 上线部署
   - 保留分页器
   - vueconfig配置  之后进行npm run bulid 打包项目文件
   - 路由按需加载方案
   - 服务器部署，用到阿里云  dns解析域名 找到服务器对应的ip地址 本地与web服务器 三次握手进行http连接 服务器返回页面的标签，拿到请求内容后，浏览器会进行网页的绘制和渲染 ，对DOM树进行模板解析 
   - nginx 代理上线 用到ssr获取密钥路径 和nginx一些基本命令  下载安装包 yum用于运作rpm包
   - vhosts进行对配置的查看  主要定义server_name






