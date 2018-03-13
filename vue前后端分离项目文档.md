# 盘古框架前端开发文档
## 一、环境安装
### 1、Node.js安装
1. 下载对应版本——地址：https://nodejs.org/en/download/
2. 运行下载后的安装包，跟随安装过程并完成安装
3. 验证是否安装成功，在命令提示符中输入`node -v`查看安装版本，若果正确显示则安装成功，如果没有显示版本，请检查环境变量中是否已加入node.js。
#### 补充：Node.js环境变量设置
1. 右键我的电脑-属性-高级系统设置-高级-环境变量，打开环境变量设置窗口
![](http://img.blog.csdn.net/20170322225344460?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXE0NTEzNTQ=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast) 
2. 在下面的系统变量中找到Path，点击编辑，在后面加入nodejs的安装目录，例如D:\software\dev\nodeJS\
3. 然后打开cmd，输入node -v回车显示node版本，输入npm -v回车，显示npm版本，则表示node安装成功
4. 在用户变量Path中，修改默认配置为刚刚设置的prefix路径
### 2、NPM安装完成VUE
PS：在用 Vue.js 构建大型应用时推荐使用 NPM 安装。
1. 升级 npm
`npm install npm -g`
2. 安装VUE
`npm install vue`
### 3、命令行工具  
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
## 二、Vue.js 目录结构
上一章节中我们使用了 npm 安装项目，我们在 IDE（Eclipse、Atom等）中打开该目录，结构如下所示：

![](http://www.runoob.com/wp-content/uploads/2017/01/B6E593E3-F284-4C58-A610-94C6ACDAD485.jpg)
### 1、目录解析
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
### 2、assets和static文件夹的区别
1. assets目录中的文件会被webpack处理解析为模块依赖，只支持相对路径形式。例如，在`<img src="./logo.png">` 和 `background: url(./logo.png)`中，”./logo.png”是相对的资源路径，将由Webpack解析为模块依赖。
2. static/ 目录下的文件并不会被Webpack处理：它们会直接被复制到最终的打包目录（默认是dist/static）下。必须使用绝对路径引用这些文件，这是通过在`config.js`文件中的`build.assetsPublicPath`和`build.assetsSubDirectory`连接来确定的。任何放在`static/`中文件需要以绝对路径的形式引用：`/static/[filename]`。
3. 总的来说：static放不会变动的文件 assets放可能会变动的文件。
## 三、安装相关插件
### 1、Element-ui
1. Element，一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的桌面端组件库
2. 本项目element-ui版本为1.4.13，官方文档地址：http://element-cn.eleme.io/#/zh-CN/component/installation
3. vue+element搭建后台管理页面参考案例：https://www.cnblogs.com/taylorchen/p/6083099.html
### 2、vue-router
#### 介绍
1. vue-router是Vue.js官方的路由插件，它和vue.js是深度集成的，适合用于构建单页面应用。**个人理解：Vue中的路由相当于pc里面的锚点超链接，如果点击了页面转向哪，也有点像ajax。**
2. 本项目中使用版本为`2.8.1`，`./src/routes.js`为路由文件。
3. 官方参考文档：https://router.vuejs.org/zh-cn/essentials/getting-started.html
4. 相关资料：http://blog.csdn.net/heliumlau/article/details/61649491
### 3、Axios
#### 介绍
1. Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。
2. 本项目中使用版本为`0.15.3`
3. 官方文档：https://www.kancloud.cn/yunye/axios/234845
### 4、vue-crpopper
#### 介绍
1. 一个优雅的图片裁剪插件
2. 项目地址：https://github.com/xyxiao001/vue-cropper
3. 预览地址：http://xyxiao.cn/vue-cropper/example/
## 四、项目解析
### 1、项目介绍
1. 简介
<br>本项目为盘古框架前后端分离项目V1.0版本，主要实现功能有：跨域请求、登录、数据展现、分页、表单验证及提交、上传剪切头像等。
2. 项目结构图
![结构图](http://on-img.com/chart_image/5a94ccb0e4b09a29d50c4c3c.png)
### 2、项目说明
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
                + 参数获取
                + 调取api.js中的交互方法发送数据，根据返回结果进行操作
                + 登录成功，把返回的用户信息，存储到session中
                + 登录失败，则给予对应提示。
                + 异常捕获，防止页面假死。
                代码参考：`/src/views/Login.vue`
            3. api.js相关接口设置
                + 利用axios的interceptors拦截方法，判断是否可读取到session中的用户数据，如果有则放到请求头中一起发送。
                + 设置统一的接口访问地址，便于后期统一他调整。
                + 为所有请求设置timeout值，这里设置为6s，超过6s则抛出超时异常。
3. 用户列表功能说明
    > 用户列表由`Main.vue`+`User.vue`组成。
    1. Main.vue
        + 主要用来存放页面的功能模块，包括头部登录信息栏，标题栏，左侧导航栏，面包屑导航等。
        + 主要功能包含左侧导航栏和右上角头像显示以及滑过后的展开一些跳转链接等。
        + 退出登录功能：路由指向登录页`/login`，并清楚用户登录session数据。
    2. User.vue
        + 包含功能：列表显示、根据表头项排序、根据条件筛选数据、分页。
            - 列表显示：
                运用api.js中的`getUserListPage`方法来获取用户列表数据。
                <pre>
                if(this.seachItem == 'account'){
                  para = {
                    offset: (this.page - 1)*10,
                    account:this.filters.name
                  };
                } else{
                  para = {
                    offset: (this.page - 1)*10,
                    name:this.filters.name
                  };
                }
                getUserListPage(para).then((res) => {
                    this.total = res.data.total;
                    this.users = res.data.rows;
                    this.listLoading = false;
                    //NProgress.done();
                })
                </pre>
                > 其中para为参数部分，`offset`为数据偏移量-说白了就是数据从第几条开始，默认一次出10条数据。
            - 分页    
                > 原理同上，根据页数*条数来改变offset的值，从而获取新页的数据。
            - 根据条件筛选数据
                > 根据页面下来选来判断是通过账号查找，还是通过姓名查找，这个根据选项来传递参数是`account`还是`name`。然后与`offset`参数一起发送给接口，返回筛选后的数据。
            - 根据标题项排序
                > 此功能为element-ui 表格自带功能，只需在需要排序的列上加入`sortalbe`属性即可。例如：`<el-table-column prop="phone" label="电话" width="130" sortable></el-table-column>` 
    3. 新增用户介绍
        > 新增用户为当前页面弹出层实现。包含字段：
        
        | 字段名 | 描述 | 数据类型 | 验证规则 |
        | :---- | :---- | :---- | :---- |
        | account | 登录账号 | string | 1.非空 2.唯一 |
        | password | 登录密码 | string | 1.非空 |
        | gender | 性别，1-男，0-女 | string | 1.非空 |
        | phone | 手机号 | string | 1.非空 2.正确手机号 |
        | email | 邮箱 | string | 1.非空 2.正确邮箱 |
        | isadmin | 是否为管理员 0-不是， 1-是 | string | 1.非空 |
        
        + 通过验证后，提交数据，利用api.js中的 `addUser` 方法，参数需要用到qs.stringify()来转换参数形式，以form参数post给后台对应接口。
        + qs官方文档：https://www.npmjs.com/package/qs
    4. 编辑用户介绍    
        > 编辑用户为当前页面弹出层实现。与新增用户相似，包含字段：
        
        | 字段名 | 描述 | 数据类型 | 验证规则 |
        | :---- | :---- | :---- | :---- |
        | password | 登录密码 | string | 1.非空 |
        | gender | 性别，1-男，0-女 | string | 1.非空 |
        | phone | 手机号 | string | 1.非空 2.正确手机号 |
        | email | 邮箱 | string | 1.非空 2.正确邮箱 |
        | isadmin | 是否为管理员 0-不是， 1-是 | string | 1.非空 |
        
        + 获取当前要修改用户的信息，通过api.js中的 `getUserInfo` 方法取得用户信息，渲染到页面上。
        + 修改信息，通过验证后，提交数据，利用api.js中的 `editUser` 方法，参数为用户id+form数据。
    5. 删除用户介绍
        > 删除用户为按钮形式，需要传递的参数为删除用户的id。
        + 利用api.js中的 `batchRemoveUser` 方法，参数为删除的用户id。
    6. 批量删除用户介绍
        > 批量删除用户与删除用户基本相同，区别为传递的参数为多个id与逗号链接的字符串。
    7. 设置用户角色功能说明
        > 设置用户角色为按钮触发弹出层形式，利用element-ui的穿梭框形式来完成功能。
        + 通过 api.js中的 `getRoleList` 方法获取所有角色信息，此处limit参数需要设置为大于角色信息的总条数，如：`limit:999`。
        + 把获取到的所有角色信渲染到穿梭框中。
        + 通过按钮触发设置角色信息的弹出层，并把当前用户包含的角色信息id赋值给穿梭框声明为已拥有此角色状态。
        + 设置好后，通过 api.js中的 `setRole` 方法 ，参数为用户id+rolesId组成的无序列表。这里需要用到qs中的 `{ arrayFormat:'brackets' }` 这个参数来把rolesid数组转化为无序列表。
4. 角色列表功能说明
    > 角色列表由`Main.vue`+`Roles.vue`组成。
    1. 角色列表与用户列表基本一致，包含功能：列表显示、根据表头项排序、根据条件筛选数据、分页。
        + 运用api.js中的 `getRoleList` 方法来获取角色列表数据。传递参数 `offset:偏移量，通过页码计算` 、`keyword:筛选条件（名称/描述）`;
    2. 新增角色介绍
        > 新增用户为当前页面弹出层实现。包含字段：
        
        | 字段名 | 描述 | 数据类型 | 验证规则 |
        | :---- | :---- | :---- | :---- |
        | name | 角色名称 | string | 1.非空 2.20个字符以内 |
        | desc | 角色描述 | string | 1.非空 2.100个字符以内 |
        
        + 通过验证后，提交数据，利用api.js中的 `addRole` 方法，参数需要用到qs.stringify()来转换参数形式，以form参数post给后台对应接口。
    3. 编辑角色介绍
        > 编辑角色为当前页面弹出层实现。与新增角色相似，包含字段：
                
        | 字段名 | 描述 | 数据类型 | 验证规则 |
        | :---- | :---- | :---- | :---- |
        | name | 角色名称 | string | 1.非空 2.20个字符以内 |
        | desc | 角色描述 | string | 1.非空 2.100个字符以内 |
        
        + 获取当前要修改角色的信息，通过api.js中的 `getRole` 方法取得角色信息，渲染到页面上。
        + 修改信息，通过验证后，提交数据，利用api.js中的 `editRole` 方法，参数为角色id+form数据。
    4. 删除角色介绍
        > 删除角色为按钮形式，需要传递的参数为删除角色的id。
        + 利用api.js中的 `batchRemoveRole` 方法，参数为删除的角色id。
    5. 批量删除用户介绍
        > 批量删除角色与删除角色基本相同，区别为传递的参数为多个id与逗号链接的字符串。
5. 个人信息修改功能说明
    1. 登录密码修改
        > 页面由`Main.vue`+`changePwd.vue`组成。包含字段：
        
        | 字段名 | 描述 | 数据类型 | 验证规则 |
        | :---- | :---- | :---- | :---- |
        | oldpwd | 旧密码 | string | 1.非空 |
        | newpwd | 新密码 | string | 1.非空 |
        
        + 修改密码，通过验证后，提交数据，利用api.js中的 `changePwd` 方法，参数新旧密码。
    2. 个人头像修改
        > 页面由`Main.vue`+`changePhoto.vue`组成。
        + 这里用到vue-cropper插件来实现图片的裁剪与上传。[官方文档](https://github.com/xyxiao001/vue-cropper "官方文档")、[预览](http://xyxiao.cn/vue-cropper/example/)
        + 图片插件设置好后，这里裁剪后以 `base64` 格式输出，需要通过 `dataURLtoFile` 这个方法转换为 `file` 类型，最后提交到指定接口
6. 打包与发布说明
    > 本项目由vue-cli脚手架生成，所以自带webpack，打包发布用webpack来完成。
    1. 在项目根目录下打开命令提示符窗口（cmd）运行 `npm run build` 会在项目 `dist` 中生成打包好的文件。运行index.html即可。
        + 如果发现有问题可进行以下修改：
            - 到项目目录下的 `config` 文件夹里的 `index.js` 文件中,将 `build` 对象下的 `assetsPublicPath` 中的 `/` ，改为 `./` 即可，就在前面加个点，如下：
            ![图片](https://images2017.cnblogs.com/blog/1202901/201709/1202901-20170905104525522-142021100.png)
            - 到项目目录下的 `build` 文件夹里的 `webpack.base.conf.js` 文件中，将 `publicPach` 改成 `./` ，如下图：
            ![图片](http://img.bbs.csdn.net/upload/201610/27/1477541987_686403.png)
        + 修改完成后，再次运行 `npm run build` 然后再运行新生成的 `index.html` ，大功告成~！    
        