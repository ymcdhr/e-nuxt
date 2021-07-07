// Nuxt.js 配置文件，用于自定义路由等
// Nuxt.js 支持自动生成路由，为了更灵活可以自定义配置路由
// CommonJS 规范


module.exports = {
  server: {
    host: '0.0.0.0', // 生产环境上配置0.0.0.0才能对外访问
    port: 80
  }
  // 路由
  router: {
      linkActiveClass: 'active',
      // 自定义路由表规则
      extendRoutes (routes, resolve) {
        // 清除 Nuxt.js 基于 pages 目录默认生成的路由表规则
        routes.splice(0)
  
        routes.push(...[
            {
                path: '/', // 默认路由
                component: resolve(__dirname, 'pages/layout/'),
                children: [
                    {
                      path: '',// 默认子路由
                      name: 'home',
                      component: resolve(__dirname, 'pages/home/'),
                    },
                    {
                      path: '/login',// 登录页面
                      name: 'login',
                      component: resolve(__dirname, 'pages/login/'),
                    },
                    {
                      path: '/register',// 注册页面，也是用的login页面
                      name: 'register',
                      component: resolve(__dirname, 'pages/login/'),
                    },
                    {
                      path: '/profile/:username',
                      name: 'profile',
                      component: resolve(__dirname, 'pages/profile/'),
                    },
                    {
                      path: '/settings',
                      name: 'settings',
                      component: resolve(__dirname, 'pages/settings/'),
                    },
                    {
                      path: '/editor',
                      name: 'editor',
                      component: resolve(__dirname, 'pages/editor/'),
                    },
                    {
                      path: '/editor/:slug',
                      name: 'editor',
                      component: resolve(__dirname, 'pages/editor/'),
                    },
                    {
                      path: '/article/:slug',
                      name: 'article',
                      component: resolve(__dirname, 'pages/article/'),
                    }
                ]
            }
        ])
      }
  },

  // 注册插件
  plugins: [
    '~/plugins/request.js',
    '~/plugins/dayjs.js'
  ]
}

