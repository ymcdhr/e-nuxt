<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="user.image" class="user-img" />
            <h4>{{ user.username }}</h4>
            <p>
              {{ user.bio }}
            </p>
            <button @click="onFollow(user)" :disabled="user.followDisabled" class="btn btn-sm btn-outline-secondary action-btn">
              <i :class="user.myself?`ion-gear-a`:`ion-plus-round`"></i>
              &nbsp; {{ followText }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a 
                  class="nav-link" 
                  :class="tab==='my-articles'?'active':''"
                  @click="changeTab($event, 'my-articles')" 
                  href=""
                >My Articles</a>
              </li>
              <li class="nav-item">
                <a 
                  class="nav-link" 
                  :class="tab==='favorited-articles'?'active':''"
                  @click="changeTab($event, 'favorited-articles')" 
                  href=""
                >Favorited Articles</a>
              </li>
            </ul>
          </div>

          <article-list :articles="articles"></article-list>

          <pagination :totalPage="totalPage" :page="page" :tab="tab" route="profile"></pagination>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticles } from '@/api/article.js'

import { getProfile, addFollow, deleteFollow } from '@/api/user.js'
import ArticleList from '../home/components/list'
import Pagination from '../home/components/pagination'

export default {
  name: "profile",
  watchQuery: ['page','tab'],// 监控url中？查询后面的变更；也可以是true，所有查询参数
  components: {
    ArticleList,
    Pagination
  },
  computed: {
    totalPage() {
      return Math.ceil(this.articlesCount/this.limit)
    },
    followText() {
      const { 
        myself,
        following,
        username
      } = this.user

      if(myself){
        return `Edit Profile Settings`
      }

      if(following){
        return `Unfollow ${username}`
      }
      
      return `Follow ${username}`
    }
  },
  methods: {
    async onFollow(user) {
      user.followDisabled = true
      if(user.myself)
        this.$router.push('/settings')

      if(user.following){
        await deleteFollow(user.username)
        user.following = false
      }
      else{
        await addFollow(user.username, this.$router)
        user.following = true
      }
      user.followDisabled = false
    },

    async changeTab(e, tab){
      e.preventDefault()
      if(this.tab === tab)
        return
      
      this.tab = tab
      this.page = 1
      console.log("this:",this)

      this.$router.push({
        name: 'profile',
        params: { // 页面子路由
          username: this.user.username
        },
        query: {
          tab
        }
      })
    },
  },
  async asyncData({ store, params, query }){
    const limit = 10
    const page = query.page || 1
    const tab = query.tab || 'my-articles'
    const userName = params.username
    const localUser = store.state.user && store.state.user.username
    const options = tab==='my-articles'?{author: userName}:{favorited: userName}


    const [ profileData, articleRes ] = await Promise.all([
      getProfile(userName),
      getArticles({
        limit,   // 每页数据条数
        offset: (page-1)*limit,  // 跳过前n调数据，需要计算
        ...options
      })
    ])
    const user = {
        ...profileData.data.profile,
        myself: localUser && userName === localUser,
        followDisabled: false
    }

    const { articles, articlesCount } = articleRes.data
    articles.map(article => article.favoriteDisabled=false)

    return {
      articles,
      articlesCount,
      limit,
      page,
      tab,
      user
    }
  }
};
</script>

<style>
</style>