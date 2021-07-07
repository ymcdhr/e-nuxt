# 一、项目介绍
1. 本项目功能：实现一个最基本的博客网站，使用了RealWorld的模板和API
2. 本项目使用：Vue + VueX + Nuxt 服务端渲染的方式
3. 本项目使用：Nodejs + GitHub Action 自动化部署 

# 二、项目使用

#### 1、下载项目
```
> git clone https://github.com/ymcdhr/e-nuxt.git
```

#### 2、安装项目
```
> cd e-nuxt
> npm install
```

#### 3、本地调试
```
> npm run dev    // 方案1：浏览器直接调试，不生成本地文件

> npm run build  // 方案2：先打包构建，再运行本地文件
> npm run start  // 方案2：启动 nuxt
```

#### 4、自动化部署
1. 本项目使用 Github Action 自动部署到 Linux 服务器上；
- 修改项目代码后，提交标签到仓库会触发自动构建；注意标签名称必须是v开头，例如：v0.0.1；
```
> git tag -a v0.0.1    // 创建标签
> git commit -am ''    // 提交到本地仓库
> git push             // 推送到远端仓库
```
- Github Action 会自动构建项目，然后部署到指定的 Linux 主机上：106.75.93.71；
- 当前本项目的 Git 仓库地址为：https://github.com/ymcdhr/e-nuxt.git；

2. 本项目配置的 Linux 主机使用的 UCloud 云服务
```
- UCloud 控制台地址：https://console.ucloud.cn/
- 用户名：252332076@qq.com
- 密码：Y*********7
- Linux 主机 IP：106.75.93.71
- 账号：root
- 密码：Y*********7
```

#### 5、RealWorld 接口文档
- 页面模板：https://github.com/gothinkster/realworld-starter-kit
- 接口文档：https://github.com/gothinkster/realworld/tree/master/api

#### 6、目录结构

![输入图片说明](https://images.gitee.com/uploads/images/2021/0707/155300_48b4aa66_9130428.png "屏幕截图.png")


# 三、Nuxt 基本特点

#### 1、Nuxt 官方文档：
- 使用文档：https://zh.nuxtjs.org/docs/2.x/get-started/installation
- 中文介绍：https://www.nuxtjs.cn/guide

#### 2、Nuxt 的特点：
- nuxt能够同时在服务端渲染和客户端渲染页面
- nuxt集成了vue、vue-router、vuex等框架
- nuxt也能开发spa，但不是它的强项
- nuxt更多特点参考官方文档

#### 3、Nuxt 静态化页面的应用

# 四、Nuxt 基本使用
#### 1、Nuxt 使用场景
1. 初始项目：直接使用
2. 已有的Nodejs服务端项目：可以把Nuxt当做一个中间件集成到Node Web Server中
3. 现有的Vue.js项目：来处理首屏渲染或者SEO问题
- 需要非常熟悉Nuxt
- 至少10%的代码改动量

#### 2、Nuxt 最简单的DEMO
1. 安装nuxt
```bash
> npm init -y
> npm i nuxt
```

2. 修改npm scripts
```json
  "scripts": {
    "dev": "nuxt"
  },
```

3. 创建入口文件：index.vue
```html
<template>
  <div>{{ title }}</div>
</template>

<script>
export default {
    name: "vue",
    data () {
        return {
            title: 'vue index'
        }
    }
}
</script>

<style>

</style>
```

4. 启动页面，打开浏览器：localhost:3000；nuxt会根据项目文件生成源码在目录中：.nuxt
```
> npm run dev
```

#### 3、Nuxt 的路由

1. 使用方法基本和vue-router一样；其中：<nuxt /> 替代 <router-view />、<nuxt-link /> 替代 <router-link />
- nuxt：https://www.nuxtjs.cn/guide/routing
- vue-router：https://router.vuejs.org/zh/installation.html

2. Nuxt.js 依据 pages 目录结构自动生成 vue-router 模块的路由配置。例如：pages里面有index.vue、about.vue两个文件，那路由就对应localhost:3000/、localhost:3000/about；也可以自定义路由配置，放到 nuxt.config.js 中（参考项目示例代码）。
3. 几种导航
- a 链接，刷新页面，走服务端渲染；
- nuxt-link 导航链接，直接客户端加载路由页面，走客户端渲染；nuxt-link 和 router-link 使用一模一样。
```html
<!-- <nuxt-link>标签中动态绑定to地址 -->
<nuxt-link :to="{
  name: 'profile', // 页面路由
  params: { // 页面子路由
    username: article.author.username
  }
}"
  ><img src="article.author.image"
/></nuxt-link>


<nuxt-link
  class="nav-link"
  :class="{
    active: tab === 'tag'
  }"
  exact
  :to="{
    name: 'home', // 页面路由地址，home页面
    query: {// url中?后面的查询内容
      tab: 'tag',
      tag
    }
  }"
>#{{ tag }}</nuxt-link>
```
- 编程式导航，走客户端渲染；也和 vue-router 一样使用，在事件方法中执行代码：
```
this.$router.push('/')
```

4. 动态路由，和 vue-router 一样也使用 $route.params 获取参数。

5. 嵌套路由，和 vue-router 一样使用；但是自动生成前，需要创建一个和父组件同名的目录；然后在父组件(.vue文件) 内增加 <nuxt-child/> 用于显示子视图内容（类似于子路由的 router-view）。

6. 路由的自定义配置：
- https://www.nuxtjs.cn/api/configuration-router
- 根路径的配置
- 中间件
- ...


#### 4、Nuxt 的视图，入口页面和布局
1. 官方文档：https://www.nuxtjs.cn/guide/views
2. 固定的 layout 目录作为入口页面，其页面类似嵌套组件；在 default.vue 里面定义页面结构，嵌套子路由等。如果定义了 layout，pages 目录里面的页面会按照路由放到 <nuxt /> 的位置。（default.vue 是 layout 默认的页面入口）
3. 如果没有使用固定的 layout 入口，也可以自定义路由指定路径。

```
<template>
    <div>
        <h2>layout</h2>
        <nuxt-link to="/">Index</nuxt-link>
        <nuxt-link to="/about">About</nuxt-link>
        <nuxt />
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
```

![输入图片说明](https://images.gitee.com/uploads/images/2021/0707/155930_9878b827_9130428.png "屏幕截图.png")

#### 5、Nuxt 异步数据 asyncData（需要服务端渲染、SEO优化才使用）
1. 基本用法：
- asyncData 返回的数据合并到组件 data() 方法一并给组件使用，相当于混淆到了动态数据上；
- asyncData 在服务端渲染的时候执行，在客户端路由更新之前也会执行。

2. 注意事项：
- asyncData 是在页面组件中（必须是要pages目录下的页面）的固定用法，不能在其它自定义组件中使用；
- asyncData 里面没有this，因为它是在组件初始化之前被调用的；但是可以使用上下文context获取数据。

```js
export default {
  name: 'HomePage',
  components: {
    Foo
  },

  // 当你想要动态页面内容有利于 SEO 或者是提升首屏渲染速度的时候，就在 asyncData 中发请求拿数据
  async asyncData () {
    console.log('asyncData')
    console.log(this)
    const res = await axios({
      method: 'GET',
      url: 'http://localhost:3000/data.json'
    })
    return res.data
  },

  // 如果是非异步数据或者普通数据，则正常的初始化到 data 中即可
  data () {
    return {
      foo: 'bar'
    }
  }
}
```

3. 上下文对象：
- 使用参数context代替this的使用；
```
export default {
  name: 'ArticlePage',
  async asyncData (context) {
    console.log(context)
    const { data } = await axios({
      method: 'GET',
      url: 'http://localhost:3000/data.json'
    })
    const id = Number.parseInt(context.params.id)
    return {
      article: data.posts.find(item => item.id === id)
    }
  }
}
```

![输入图片说明](https://images.gitee.com/uploads/images/2021/0706/124720_2aea3089_9130428.png "屏幕截图.png")

4. 监听url中查询数据query参数的改变
- 使用场景：默认情况下，url中的query改变不会调用asyncData方法。
- 打开配置：在页面中加入参数 watchQuery
```
watchQuery: ['page'],// 也可以是true，监听所有查询参数
```



#### 6、Nuxt 自定义路由配置
```
module.exports = {
    router: {
        linkActiveClass: 'active',
        // 自定义路由表规则
        extendRoutes (routes, resolve) {
          // 清除 Nuxt.js 基于 pages 目录默认生成的路由表规则
          routes.splice(0)
    
          routes.push(...[
              {
                  path: '/',
                  component: resolve(__dirname, 'pages/layout/')
              }
          ])
        }
    }
}
```



#### 7、Nuxt 中登录状态的缓存
1. 要考虑服务端和客户端渲染的时候都能拿到状态
2. 使用JWT方案，客户端的处理：
- 保存用户的登录状态，存储到vuex容器$store中（nuxt默认支持vuex）；
- 为了防止刷新页面数据丢失，我们需要把数据持久化，存储到cookie中；然后刷新页面时，浏览器自动携带cookie给服务器，服务端再使用cookie调用commit更新数据到$store中；
- 服务端和客户端使用同一段vuex的代码，共用state、mutations的定义。
```
<script>
import { login, register } from '@/api/user'

// 仅在客户端加载 js-cookie 包
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  middleware: 'notAuthenticated',
  name: 'LoginIndex',
  computed: {
    isLogin () {
      return this.$route.name === 'login'
    }
  },
  data () {
    return {
      user: {
        username: '',
        email: '',
        password: ''
      },
      errors: {} // 错误信息
    }
  },

  methods: {
    async onSubmit () {
      try {
        // 提交表单请求登录
        const { data } = this.isLogin
          ? await login({
              user: this.user
            })
          : await register({
            user: this.user
          })

        // console.log(data)
        // TODO: 保存用户的登录状态
        this.$store.commit('setUser', data.user)

        // 为了防止刷新页面数据丢失，我们需要把数据持久化
        Cookie.set('user', data.user)

        // 跳转到首页
        this.$router.push('/')
      } catch (err) {
        // console.log('请求失败', err)
        this.errors = err.response.data.errors
      }
    }
  }
}
</script>
```
3. 使用JWT方案，服务端的处理：
- Nuxt已经集成vuex，需要创建一个名为：store的目录；
- 以下代码中的state、mutations服务端和客户端共用；
- 以下代码中的nuxtServerInit会在服务端渲染期间自动调用，客户端不调用。
```
const cookieparser = process.server ? require('cookieparser') : undefined

// state、mutations 在服务端渲染和客户端渲染的时候共用
// 在服务端渲染期间运行都是同一个实例
// 为了防止数据冲突，务必要把 state 定义成一个函数，返回数据对象
export const state = () => {
  return {
    // 当前登录用户的登录状态
    user: null
  }
}

// mutations为对象
// 定义setUser，使用commit调用
export const mutations = {
  setUser (state, data) {
    state.user = data
  }
}


export const actions = {
  // nuxtServerInit 是一个特殊的 action 方法
  // 这个 action 会在服务端渲染期间自动调用，客户端不调用；所以以下为服务端代码；
  // 作用：初始化容器数据，传递数据给客户端使用
  // { commit }, { req }参数可参考nuxt文档
  nuxtServerInit ({ commit }, { req }) {
    let user = null

    // 如果请求头中有 Cookie 
    // 客户端请求服务端时，会自动携带 Cookie；服务端可以处理该 Cookie
    if (req.headers.cookie) {
      // 使用 cookieparser 把 cookie 字符串转为 JavaScript 对象
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        user = JSON.parse(parsed.user)
      } catch (err) {
        // No valid cookie found
      }
    }

    // 提交 mutation 修改 state 状态
    commit('setUser', user)
  }
}

```

#### 8、Nuxt中使用中间件，处理页面权限
1. 没有登录的时候是不允许访问某些页面的，如果用户直接输入url应该跳转。

2. 客户端的 spa 中是怎么处理权限的？使用路由拦截、或者解析接口后跳转。

3. Nuxt中如何处理页面权限？
- 路由中间件文档：https://www.nuxtjs.cn/guide/routing#%E4%B8%AD%E9%97%B4%E4%BB%B6
- 定义中间件：middleware/authenticated.js，目录名称必须为：middleware，authenticated.js文件名使用时也必须一致。
```
/**
 * 验证是否登录的中间件
 */
 export default function ({ store, redirect }) {
    // If the user is not authenticated
    if (!store.state.user) {
      return redirect('/login')
    }
  }
  
```
- 在页面中调用中间件：
```
export default {
  // 在路由匹配组件之前先执行中间件
  middleware: ['authenticated'], //数组可以添加多个中间件，authenticated为中间件js文件名
  name: 'editor'
}
```

#### 9、Nuxt 的插件使用方法
1. 插件的作用：在 Nuxt 中使用常用的插件，例如：axios；我们还能在插件中拿到上下文 context 数据。

2. 注册插件：nuxt.config.js
```
module.exports = {
    // 路由
    router: {
        // ...
    },

    // 注册插件
    plugins: [
      '~/plugins/request.js',
    ]
}

```
3. 插件 axios 的使用示例
- axios 进行请求的时候，使用interceptors进行拦截；
- 通过插件机制获取到上下文对象（query、params、req、res、app、store...）
- 插件导出函数必须作为 export default 成员，只能有一个
```
/**
 * 基于 axios 封装的请求模块
 */
 import axios from 'axios'

 // 创建请求对象
 export const request = axios.create({
   baseURL: 'https://conduit.productionready.io'
 })
 
 // 通过插件机制获取到上下文对象（query、params、req、res、app、store...）
 // 插件导出函数必须作为 export default 成员，只能有一个
 export default (context) => {

    const { store } = context
 
   // 请求拦截器
   // Add a request interceptor
   // 任何请求都要经过请求拦截器
   // 我们可以在请求拦截器中做一些公共的业务处理,例如统一设置 token
   request.interceptors.request.use(function (config) {
     // Do something before request is sent
     // 请求就会经过这里
     const { user } = store.state
 
     if (user && user.token) {
       config.headers.Authorization = `Token ${user.token}`
     }
 
     // 返回 config 请求配置对象
     return config
   }, function (error) {
     // 如果请求失败(此时请求还没有发出去)就会进入这里
     // Do something with request error
     return Promise.reject(error)
   })
 }
```

4. 使用插件封装nuxt全局过滤器
- 创建vue filter，定义插件：dayjs.js
```
// 插件定义dayjs.js
import Vue from 'vue'
import dayjs from 'dayjs'

// {{ 表达式 | 过滤器 }}
Vue.filter('date', (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(value).format(format)
})

```

- 注册插件，在：nuxt.config.js
```
module.exports = {
    // 路由
    router: {
        // ...
    },

    // 注册插件
    plugins: [
      '~/plugins/request.js',
      '~/plugins/dayjs.js'
    ]
}
```

- 使用插件，在vue模板中调用
```
<span class="date">{{ article.createdAt | date('MM DD,YYYY') }}</span>
```

#### 10、Nuxt 优化SEO
1. 优化title
2. 优化meta标签，参考官方文档

```
    // 优化SEO，添加title和meta
    head () {
      return {
        title: `${this.article.title} - RealWorld`,
        meta: [
          { hid: 'description', name: 'description', content: this.article.description }
        ]
      }
    }
```

# 六、Nuxt 怎么调试？
1. 如何定位错误？
2. 本地开发的时候，怎么配代理？是否可以使用类似于webpack-dev-server的东西？

# 七、Nuxt 应用手动部署
#### 1、准备工作
1. nuxt官方文档：https://www.nuxtjs.cn/guide/commands
2. 购买/配置主机：https://gitee.com/lagoufed/fed-e-questions/tree/master/part3/%E7%AC%94%E8%AE%B01-%E6%9C%8D%E5%8A%A1%E5%99%A8%E8%B4%AD%E4%B9%B0%E4%B8%8E%E5%88%9D%E5%A7%8B%E5%8C%96#4%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F
3. 服务器上需要安装git、nodejs、pm2等工具
- 安装 git、nodejs 需要下载官方linux下的安装包（wget 安装包，解压，安装/有些软件只需要挪一下文件位置到：usr/local/bin）

```
> ssh root@106.75.93.71        // 远程登录 主机

> wget https://nodejs.org/dist/v14.17.3/node-v14.17.3-linux-x64.tar.xz // 下载 nodejs
> xz -d node-v14.17.3-linux-x64.tar.xz   // 解压安装包
> tar -xvf node-v14.17.3-linux-x64.tar.xz
> mv node-v14.17.3-linux-x64 nodejs // 修改目录名称

// 查看目录中是否有bin目录，如果有直接移动到系统/usr/local/bin/目录；或者建立软连接即可：
> ls -l
total 632
drwxr-xr-x 2 1001 1001     40 Jul  5 21:57 bin
-rw-r--r-- 1 1001 1001 529425 Jul  5 21:57 CHANGELOG.md
drwxr-xr-x 3 1001 1001     18 Jul  5 21:57 include
drwxr-xr-x 3 1001 1001     26 Jul  5 21:57 lib
-rw-r--r-- 1 1001 1001  80135 Jul  5 21:57 LICENSE
-rw-r--r-- 1 1001 1001  30902 Jul  5 21:57 README.md
drwxr-xr-x 5 1001 1001     45 Jul  5 21:57 share

// 建立软连接
> ln -s /home/nodejs/bin/npm /usr/local/bin/ 
> ln -s /home/nodejs/bin/node /usr/local/bin/
```

- 然后 npm 安装 pm2
```
> npm install --global pm2
```


#### 2、项目打包，现在开发环境构建，然后将其上传到服务器
1. npm run build 打包构建到.nuxt/dist
2. npm run start 启动网页，读取的.nuxt/dist里面的本地文件

#### 3、上传打包文件到服务器
1. 需要传哪些文件？
```
- .nuxt/dist目录     => 打包文件目录
- static             => 静态文件目录
- nuxt.config.js     => nuxt配置文件
- package.json       => 在服务端安装资源
- package.lock.json 
- pm2.config.js      => pm2配置文件
```

![输入图片说明](https://images.gitee.com/uploads/images/2021/0707/162958_b6ea8006_9130428.png "屏幕截图.png")

2. 上传文件到服务器(以 Linux 主机为例)
- 可以先将所有文件压缩成 tar 文件，上传压缩包到服务器之后再解压
- 使用git bash、putty、xshell等工具执行scp命令都行：
```
scp 路径/文件 root@ip:/路径
ls -a 查看linux目录所有文件
```

3. 如果上传文件比较麻烦，可以在服务器上git clone，直接在本地构建
```
> git clone https://github.com/ymcdhr/e-nuxt.git
> cd e-nuxt
> npm install
> npm run build
> npm run start // 启动 node 服务
> pm2 start npm --start  // 或者使用 pm2 启动，替代 npm run start
```

4. pm2 常用命令
- pm2 list 查看列表
- pm2 start
- pm2 stop
- pm2 reload
- pm2 restart
- pm2 delete

# 八、Nuxt 应用自动化部署
#### 1、流程
![输入图片说明](https://images.gitee.com/uploads/images/2021/0706/221818_b9e43595_9130428.png "屏幕截图.png")

#### 2、CI/CD 有哪些工具
- Jenkins
- Gitlab CI
- GitHub Actions
- Travis CI
- Circle CI

#### 3、使用GitHub Actions 实现自动化部署；这里写了一个执行shell脚本，执行可在linux上自动安装nodejs、pm2；在linux服务器上执行项目中的脚本：install-nodejs.sh
```bash
#!/bin/bash

# 命令1 && 命令2   命令1执行完成后，再执行命令2
nver='v14.16.1'                 #定义版本变量 nver
ndir="node-${nver}-linux-x64"   #定义目录变量 ndir
nfile="${ndir}.tar.xz"          #定义压缩文件名变量 nfile

cd /usr/local                   #切换目录
wget https://nodejs.org/dist/$nver/$nfile  $下载文件
tar xvf $nfile    #文件拆包解压
mv $ndir nodejs   #对目录重命名
rm -rf $nfile     #删除压缩包文件

cd nodejs/bin     #进入目录

# 获取真实路径, 软链接到 /usr/bin 中, 使命令全局可用. -f为强制创建，会覆盖
ln -sf `readlink -f node` /usr/bin/node
ln -sf `readlink -f npm`  /usr/bin/npm
ln -sf `readlink -f npx`  /usr/bin/npx


# 配置镜像
npm config set registry http://registry.npm.taobao.org
# 全局安装pm2
npm i pm2 -g
# 建立软链接. 使pm2全局使用
ln -sf `readlink -f pm2`  /usr/bin/pm2
# 返回家目录
cd

```

#### 4、配置Github Action 的秘钥 token
1. Github个人设置：Settings => Developer settings => Personal access tokens => New

![输入图片说明](https://images.gitee.com/uploads/images/2021/0707/131309_d88f243a_9130428.png "屏幕截图.png")

2. 赋予token仓库操作权限，生成token，并复制下来

![输入图片说明](https://images.gitee.com/uploads/images/2021/0707/131509_18c53f89_9130428.png "屏幕截图.png")

3. 转到e-nuxt仓库：Settings => Secrets => New Secret 创建Secret，输入token

![输入图片说明](https://images.gitee.com/uploads/images/2021/0707/132013_851c789d_9130428.png "屏幕截图.png")

#### 5、配置Github Action 的 yml 文件，制定自动化构建流程
1. 在项目中创建main.yml文件，并存放到目录.github/workflows；该文件定义了github action的一系列动作。
2. main.yml文件定义流程：https://github.com/ymcdhr/e-nuxt/blob/master/.github/workflows/main.yml
- 打包构建 => 
- 发布 Release => 
- 上传构建结果到 Release => 
- 部署到服务器
3. yaml文件语法：https://www.ruanyifeng.com/blog/2016/07/yaml.html

![输入图片说明](https://images.gitee.com/uploads/images/2021/0707/132149_4b5e0d9e_9130428.png "屏幕截图.png")

4. yaml中定义的触发构建的条件：提交tag版本以v开头，例如v0.0.1

![输入图片说明](https://images.gitee.com/uploads/images/2021/0707/135135_36d63c49_9130428.png "屏幕截图.png")

5. 将以下几个参数都添加到git的Secret中

![输入图片说明](https://images.gitee.com/uploads/images/2021/0707/133116_a39612ca_9130428.png "屏幕截图.png")

- host => 部署的主机IP
- username => 登录主机的账号，一般为root
- password => 登录主机的密码
- port => 部署的主机ssh端口，默认为22

![输入图片说明](https://images.gitee.com/uploads/images/2021/0707/133524_b99f8e1c_9130428.png "屏幕截图.png")

6. 注意：生成的release包的地址要修改为自己的git地址：

https://github.com/lipengzhou/realworld-nuxtjs/releases/latest/download/release.tgz<br>
==><br>
https://github.com/ymcdhr/e-nuxt/releases/latest/download/release.tgz


![输入图片说明](https://images.gitee.com/uploads/images/2021/0707/133823_7a8d99a0_9130428.png "屏幕截图.png")

7. 注意：pm2.config.js配置文件为：
```
{
  "apps": [
    {
      "name": "nuxt-realworld-demo",
      "script": "npm",
      "args": "start"
    }
  ]
}

```

#### 6、触发构建，然后提交tag，到git仓库action中去查看构建的结果

![输入图片说明](https://images.gitee.com/uploads/images/2021/0707/140704_bf84c5c1_9130428.png "屏幕截图.png")

