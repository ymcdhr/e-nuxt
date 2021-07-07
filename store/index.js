const cookieparser = process.server ? require('cookieparser') : undefined
const Cookie = require('js-cookie')

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
  },

  logout (state) {
    state.user = null
    Cookie.remove('user')
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
