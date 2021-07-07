# 项目介绍


# 项目使用

#### 安装

#### 运行

#### 文档
- 页面模板：https://github.com/gothinkster/realworld-starter-kit
- 接口文档：https://github.com/gothinkster/realworld/tree/master/api



# 1. Nuxt

#### 1. nuxt官方文档：
- 使用文档：https://zh.nuxtjs.org/docs/2.x/get-started/installation
- 中文版介绍：https://www.nuxtjs.cn/guide

#### 2. nuxt的特点：
- 也能开发spa，但不是它的强项

#### 3. nuxt静态化页面的应用

# 2. 基本使用
#### 1. 使用场景
1. 初始项目：直接使用
2. 已有的Nodejs服务端项目：可以把Nuxt当做一个中间件集成到Node Web Server中
3. 现有的Vue.js项目：来处理首屏渲染或者SEO问题
- 需要非常熟悉Nuxt
- 至少10%的代码改动量

#### 2. 最简单的DEMO
1. 安装
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

#### 3. Nuxt的路由

1. 使用方法基本和vue-router一样；<nuxt /> 替代<router-view />
- nuxt：https://www.nuxtjs.cn/guide/routing
- vue-router：https://router.vuejs.org/zh/installation.html

2. Nuxt.js 依据 pages 目录结构自动生成 vue-router 模块的路由配置。例如：pages里面有index.vue、about.vue两个文件，那路由就对应localhost:3000/、localhost:3000/about
3. 几种导航
- a 链接，刷新页面，走服务端渲染；
- nuxt-link 导航链接，加载路由页面；nuxt-link和router-link使用一模一样。
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
- 编程式导航，也和vue一样，在事件方法中执行代码：
```
this.$router.push('/')
```

4. 动态路由，和vue-router一样也使用$route.params获取参数。

5. 嵌套路由，和vue-router一样；但是需要创建一个和父组件同名的目录；然后在父组件(.vue文件) 内增加 <nuxt-child/> 用于显示子视图内容（类似于router-view）。

6. 路由的自定义配置：
- https://www.nuxtjs.cn/api/configuration-router
- 根路径的配置
- 中间件
- ...


#### 4. Nuxt的视图
1. 官方文档：https://www.nuxtjs.cn/guide/views
2. layout，类似嵌套组件；在default.vue里面定义页面结构，嵌套子路由等。如果定义了layout，pages下面的页面会放到<nuxt />的位置。（default.vue是layout默认的页面入口）

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

![输入图片说明](https://images.gitee.com/uploads/images/2021/0703/185330_dc57c83e_9130428.png "屏幕截图.png")

#### 5. 异步数据 asyncData（需要服务端渲染才使用）
1. 基本用法：
- asyncData 返回的数据合并到组件 data 方法一并给组件使用
- asyncData 在服务端渲染的时候执行，在客户端路由更新之前也会执行

2. 注意事项：
- asyncData 是在页面组件中（pages目录下的页面）的固定用法，不能在其它组件中使用；
- asyncData 里面没有this，因为它是在组件初始化之前被调用的

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

4. 监听query参数的改变
- 使用场景：默认情况下，url中的query改变不会调用asyncData方法。
- 打开配置：在页面中加入参数 watchQuery
```
watchQuery: ['page'],// 也可以是true，所有查询参数
```

# Nuxt的目录结构
#### 样式资源怎么处理？



# nuxt.config.js 配置文件
#### 1. 自定义路由配置
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



# Nuxt中登录状态的缓存
1. 要考虑服务端和客户端渲染的时候都能拿到状态
2. 使用JWT方案，客户端处理：
- 保存用户的登录状态，存储到vuex容器$store中（nuxt默认支持vuex）；
- 为了防止刷新页面数据丢失，我们需要把数据持久化，存储到cookie中；然后刷新页面时，浏览器自动携带cookie给服务器，服务端再使用cookie调用commit更新数据到$store中；
- 服务端和客户端使用同一段vuex的代码，state、mutations的定义。
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
3. 使用JWT方案，服务端处理：
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

# Nuxt中处理页面权限
没有登录的时候是不允许访问某些页面的，如果用户直接输入url应该禁止访问。

#### 1. 客户端的 spa 中是怎么处理权限的？

#### 2. Nuxt中如何处理页面权限？
1. 路由中间件：https://www.nuxtjs.cn/guide/routing#%E4%B8%AD%E9%97%B4%E4%BB%B6


2. 使用中间件：
- 定义中间件：middleware/authenticated.js
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

# Nuxt的插件
#### 插件的作用

#### 注册插件：nuxt.config.js
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
#### 使用插件
1. axios 进行请求的时候，使用interceptors进行拦截；
2. 通过插件机制获取到上下文对象（query、params、req、res、app、store...）
3. 插件导出函数必须作为 export default 成员，只能有一个
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

# 使用插件封装nuxt全局过滤器
#### 1. 创建vue filter，定义插件：dayjs.js
```
// 插件定义dayjs.js
import Vue from 'vue'
import dayjs from 'dayjs'

// {{ 表达式 | 过滤器 }}
Vue.filter('date', (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(value).format(format)
})

```

#### 2. 注册插件，在：nuxt.config.js
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

#### 3. 使用插件，在vue模板中调用
```
<span class="date">{{ article.createdAt | date('MM DD,YYYY') }}</span>
```

# Nuxt优化SEO
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

# Nuxt怎么调试？
#### 定位错误？
#### 本地开发的时候，怎么配代理？是否可以使用类似于webpack-dev-server的东西？

# Nuxt应用发布？
#### 官方文档：
https://www.nuxtjs.cn/guide/commands

#### 打包
1. npm run build 打包构建到.nuxt/dist
2. npm run start 启动网页，读取的.nuxt/dist里面的本地文件

#### 上传打包文件到服务器
1. 需要传哪些文件到服务器？
- .nuxt/dist目录 打包文件目录
- static 静态文件目录
- nuxt.config.js nuxt配置文件
- package.json 在服务端安装资源
![输入图片说明](https://images.gitee.com/uploads/images/2021/0706/220235_dcfdbe74_9130428.png "屏幕截图.png")

2. 上传文件到服务器
```
scp 路径/文件 root@ip:/路径
ls -a 查看linux目录所有文件
```
 
3. 访问路径
使用公网ip访问

#### 使用PM2启动node服务
![输入图片说明](https://images.gitee.com/uploads/images/2021/0706/220826_f5753f82_9130428.png "屏幕截图.png")

> pm2 start npm --start

![输入图片说明](https://images.gitee.com/uploads/images/2021/0706/221519_d2483976_9130428.png "屏幕截图.png")

#### 自动化部署
1. 流程
![输入图片说明](https://images.gitee.com/uploads/images/2021/0706/221818_b9e43595_9130428.png "屏幕截图.png")

2. CI/CD 有哪些工具
- Jenkins
- Gitlab CI
- GitHub Actions
- Travis CI
- Circle CI

#### GitHub Actions
1. 环境准备
- 购买主机
- 配置主机：https://gitee.com/lagoufed/fed-e-questions/tree/master/part3/%E7%AC%94%E8%AE%B01-%E6%9C%8D%E5%8A%A1%E5%99%A8%E8%B4%AD%E4%B9%B0%E4%B8%8E%E5%88%9D%E5%A7%8B%E5%8C%96#4%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F

3. 


