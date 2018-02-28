# 盘古框架前端开发文档
## 一、环境安装
### 1、Node.js安装
1. 下载对应版本——地址：https://nodejs.org/en/download/
2. 运行下载后的安装包，跟随安装过程并完成安装
3. 验证是否安装成功，在命令提示符中输入`node -v`查看安装版本，若果正确显示则安装成功，如果没有显示版本，请检查环境变量中是否已加入node.js。
####补充：Node.js环境变量设置
1. 右键我的电脑-属性-高级系统设置-高级-环境变量，打开环境变量设置窗口
![](http://img.blog.csdn.net/20170322225344460?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXE0NTEzNTQ=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast) 
2. 在下面的系统变量中找到Path，点击编辑，在后面加入nodejs的安装目录，例如D:\software\dev\nodeJS\
3. 然后打开cmd，输入node -v回车显示node版本，输入npm -v回车，显示npm版本，则表示node安装成功
4. 在用户变量Path中，修改默认配置为刚刚设置的prefix路径
###2、NPM安装完成VUE
PS：在用 Vue.js 构建大型应用时推荐使用 NPM 安装。
1. 升级 npm
`npm install npm -g`
2. 安装VUE
`npm install vue`
###3、命令行工具  
PS：Vue.js 提供一个官方命令行工具，可用于快速搭建大型单页应用。
1. 全局安装 vue-cli `npm install --global vue-cli`
2. 创建一个基于 webpack 模板的新项目 `vue init webpack my-project`
3. 这里需要进行一些配置，默认回车即可
<pre><code>
This will install Vue 2.x version of the template.

For Vue 1.x use: vue init webpack#1.0 my-project

? Project name my-project
? Project description A Vue.js project
? Author runoob <test@runoob.com>
? Vue build standalone
? Use ESLint to lint your code? Yes
? Pick an ESLint preset Standard
? Setup unit tests with Karma + Mocha? Yes
? Setup e2e tests with Nightwatch? Yes

   vue-cli · Generated "my-project".

   To get started:
   
     cd my-project
     npm install
     npm run dev
   
   Documentation can be found at https://vuejs-templates.github.io/webpack
</code></pre>
4. 进入项目，安装并运行。
    1. `cd my-project`
    2. `npm install`
    3. `npm run dev`
5. 成功执行以上命令后访问 http://localhost:8080/，输出结果如下所示：
![](http://www.runoob.com/wp-content/uploads/2017/01/56219E04-D156-43EC-AC59-BFE7E38A62C3.jpg)
##二、Vue.js 目录结构
上一章节中我们使用了 npm 安装项目，我们在 IDE（Eclipse、Atom等）中打开该目录，结构如下所示：

![](http://www.runoob.com/wp-content/uploads/2017/01/B6E593E3-F284-4C58-A610-94C6ACDAD485.jpg)
###1、目录解析
| 目录/文件 | 说明 |
| :---- | :---- | 
| build | 项目构建(webpack)相关代码 |
| config | 配置目录，包括端口号等。我们初学可以使用默认的。 |
| node_modules | npm 加载的项目依赖模块 |
| src | 这里是我们要开发的目录，基本上要做的事情都在这个目录里。里面包含了几个目录及文件：<ul><li>assets: 放置一些图片，如logo等。</li><li>components: 目录里面放了一个组件文件，可以不用。</li><li>App.vue: 项目入口文件，我们也可以直接将组件写这里，而不使用 components 目录。</li><li>main.js: 项目的核心文件。</li></ul>|
| static | 静态资源目录，如图片、字体等。|
| test | 初始测试目录，可删除 |
| .xxxx文件 | 这些是一些配置文件，包括语法配置，git配置等。 |
| index.html | 首页入口文件，你可以添加一些 meta 信息或统计代码啥的。 |
| package.json | 项目配置文件。|
| README.md | 项目的说明文档，markdown 格式 |
###2、assets和static文件夹的区别
1. assets目录中的文件会被webpack处理解析为模块依赖，只支持相对路径形式。例如，在`<img src="./logo.png">` 和 `background: url(./logo.png)`中，”./logo.png”是相对的资源路径，将由Webpack解析为模块依赖。
2. static/ 目录下的文件并不会被Webpack处理：它们会直接被复制到最终的打包目录（默认是dist/static）下。必须使用绝对路径引用这些文件，这是通过在`config.js`文件中的`build.assetsPublicPath`和`build.assetsSubDirectory`连接来确定的。任何放在`static/`中文件需要以绝对路径的形式引用：`/static/[filename]`。
3. 总的来说：static放不会变动的文件 assets放可能会变动的文件。
##三、安装相关插件
###1、Element-ui
1. Element，一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的桌面端组件库
2. 本项目element-ui版本为1.4.13，官方文档地址：http://element-cn.eleme.io/#/zh-CN/component/installation
3. vue+element搭建后台管理页面参考案例：https://www.cnblogs.com/taylorchen/p/6083099.html
###2、vue-router
####介绍
1. vue-router是Vue.js官方的路由插件，它和vue.js是深度集成的，适合用于构建单页面应用。**个人理解：Vue中的路由相当于pc里面的锚点超链接，如果点击了页面转向哪，也有点像ajax。**
2. 本项目中使用版本为`2.8.1`，`./src/routes.js`为路由文件。
3. 官方参考文档：https://router.vuejs.org/zh-cn/essentials/getting-started.html
4. 相关资料：http://blog.csdn.net/heliumlau/article/details/61649491
###3、Axios
####介绍
1. Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。
2. 本项目中使用版本为`0.15.3`
3. 官方文档：https://www.kancloud.cn/yunye/axios/234845
###4、vue-crpopper
####介绍
1. 一个优雅的图片裁剪插件
2. 项目地址：https://github.com/xyxiao001/vue-cropper
3. 预览地址：http://xyxiao.cn/vue-cropper/example/
##四、项目解析
###1、项目介绍
1. 简介
<br>本项目为盘古框架前后端分离项目V1.0版本，主要实现功能有：跨域请求、登录、数据展现、分页、表单验证及提交、上传剪切头像等。
2. 项目结构图
![结构图](http://on-img.com/chart_image/5a94ccb0e4b09a29d50c4c3c.png)
###2、项目说明
1. routes.js-路由设置相关说明
    1. 什么是路由？
        <p>vue-router是Vue.js官方的路由插件，它和vue.js是深度集成的，适合用于构建单页面应用。vue的单页面应用是基于路由和组件的，路由用于设定访问路径，并将路径和组件映射起来。传统的页面应用，是用一些超链接来实现页面切换和跳转的。在vue-router单页面应用中，则是路径之间的切换，也就是组件的切换。</p>
    2. 官方文档：https://router.vuejs.org/zh-cn/
    3. routes.js简介
        1. 引入对应模块，相当于引入页面，告诉路由你都有哪些页面，通俗的说就是你可以在这个网站走到哪。<br>
        例：`import Login from './views/Login.vue'`<br>
        其中`Login`为Login.vue默认的组件名，from后面加的相对路径
        2. 创建路由对象，例：
        <pre>let routes = [
          {
            path: '/login',
            component: Login,
            name: '',
            hidden: true
          },
          {
            path: '/404',
            component: NotFound,
            name: '',
            hidden: true
          }
        ];</pre>
        3. 参数说明：
            > path：当前路由对象的路径（url）  
            component：当前路由对象的组件  
            name：当前路由对象需要显示的名称  
            hidden：可以通过这个参数来控制登录后侧边栏是否显示当前路由对象
2. 登录功能说明
    1. api.js与Axios
        > 在了解登录之前，首先要接触的就是vue下与后台接口交互的组件Axios。  
        Axios介绍
        >> Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中，个人理解就是我们之前用到的类似ajax的这么一个组件。  
        参考文档：https://www.kancloud.cn/yunye/axios/234845
        
        > api.js的作用为封装所有与后台接口交互的方法，统一管理与后台接口交互的规则，便于维护与扩展。
    2. 登录页面介绍
        1. 登录功能流程图  
        ![登录功能流程图](http://on-img.com/chart_image/5a9610bce4b01965e72e5353.png)
        2. 功能介绍
            1. 数据，验证规则绑定，写在data()里
            <pre>
            loginForm: {
              account: 'zhuangyan',
              checkPass: '12345678'
            },
            rules2: {
              account: [
                { required: true, message: '请输入账号', trigger: 'blur' }
              ],
              checkPass: [
                { required: true, message: '请输入密码', trigger: 'blur' }
              ]
            },
            </pre>
            2. 登录
                1. 参数获取
                2. 调取api.js中的交互方法发送数据，根据返回结果进行操作
                3. 登录成功，把返回的用户信息，存储到session中
                4. 登录失败，则给予对应提示。
                5. 异常捕获，防止页面假死。
                代码参考：`/src/views/Login.vue`
            3. api.js相关接口设置
                1. 利用axios的interceptors拦截方法，判断是否可读取到session中的用户数据，如果有则放到请求头中一起发送。
                2. 设置统一的接口访问地址，便于后期统一他调整。
                3. 为所有请求设置timeout值，这里设置为6s，超过6s则抛出超时异常。
    3. 用户列表页面介绍
    