<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{isLogin ? '登录':'注册'}}</h1>
          <p class="text-xs-center">
            <nuxt-link v-if="!isLogin" to="/login">已有账户，跳转到登录?</nuxt-link>
            <nuxt-link v-if="isLogin" to="/register">需要注册账户?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template v-for="(messages, field) in errors">
              <li v-for="(message, index) in messages" :key="index">
                {{ field }} {{ message }}
              </li>
            </template>
          </ul>

          <!-- prevent 用于阻止默认事件-->
          <form @submit.prevent="onSubmit">
            <fieldset v-if="!isLogin" class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="账户名"
                v-model="user.username"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="电子邮箱"
                v-model="user.email"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="密码"
                v-model="user.password"
                required
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{isLogin ? '登录':'注册'}}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { login, register } from '@/api/user.js'
const Cookie = process.client ? require('js-cookie') : undefined

export default {
    name: 'login',
    middleware: ['notAuthenticated'],
    computed: {
        // 用一个计算属性判断是否登录页面
        isLogin () {
            return this.$route.name === 'login'
        }
    },
    data(){
      return {
        user: {
          username: '',
          email: '',
          password: ''
        },
        errors: {}
      }
    },

    methods: {
      // 提交表单
      async onSubmit (){
        try{
          const { data } = this.isLogin ? 
          await login({
              user: this.user
          }) :
          await register({
              user: this.user
          })

          // console.log(data)
          // 客户端运行：把数据存到store中
          this.$store.commit('setUser', data.user)

          // 将数据存到cookie中，为了防止刷新页面数据丢失，我们需要把数据持久化 
          Cookie.set('user', data.user)
          this.$router.push('/')
        }
        catch(e){
          console.log(e)
          try{
            this.errors = e.response.data.errors
          }
          catch(e){
            console.log(e)
          }
        }
      }
    }
};
</script>

<style>
</style>