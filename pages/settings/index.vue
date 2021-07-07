<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="user.image"
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="user.username"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  required
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="user.bio"
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  required
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  required
                />
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right" >
                Update Settings
              </button>
            </fieldset>
          </form>
          <hr />
          <button class="btn btn-outline-danger" @click="logout()">
            Or click here to logout.
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { updateProfile } from '@/api/user.js'
const Cookie = require('js-cookie')

export default {
  middleware: ['authenticated'],
  name: "settings",

  data(){
    let { user } = this.$store.state
    return {
      user: {
        ...user
      }
    }
  },

  methods: {
    async onSubmit() {
      const { data } = await updateProfile({
        "user":{
          "username": this.user.username,
          "Password": this.user.Password,
          "email": this.user.email,
          "bio": this.user.bio,
          "image": this.user.image
        }
      })

      // 客户端运行：把数据存到store中
      this.$store.commit('setUser', data.user)

      // 将数据存到cookie中，为了防止刷新页面数据丢失，我们需要把数据持久化 
      Cookie.set('user', data.user)
      this.$router.push(`/profile/${data.user.username}`)
    },
    logout() {
      this.$store.commit('logout')
      this.$router.push('/login')
    }
  }
};
</script>

<style>
</style>