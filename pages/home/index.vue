<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-if="user">
                <!-- <a class="nav-link disabled" href="">Your Feed</a> -->
                <!-- <nuxt-link class="nav-link" to="?your_feed">Your Feed</nuxt-link> -->
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'your_feed'
                  }"
                  exact
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'your_feed'
                    }
                  }"
                >Your Feed</nuxt-link>
              </li>
              <li class="nav-item">
                <!-- <a class="nav-link active" href="">Global Feed</a> -->
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'global_feed'
                  }"
                  exact
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'global_feed'
                    }
                  }"
                >Global Feed</nuxt-link>
              <li class="nav-item" v-if="tag">
                <!-- <a class="nav-link" href="">#{{ tag }}</a> -->
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'tag'
                  }"
                  exact
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'tag',
                      tag
                    }
                  }"
                >#{{ tag }}</nuxt-link>
              </li>
            </ul>
          </div>

          <article-list :articles="articles"></article-list>

          <!-- 分页列表 -->
          <pagination :totalPage="totalPage" :page="page" :tab="tab" :tag="$route.query.tag"></pagination>
          <!-- /分页列表 -->


        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <!-- <a v-for="tag in tags" :key="tag" href="" class="tag-pill tag-default">{{ tag }}</a> -->
              <nuxt-link
                :to="{
                  name: 'home',
                  query: {
                    tab: 'tag',
                    tag: item
                  }
                }"
                class="tag-pill tag-default"
                v-for="item in tags"
                :key="item"
              >{{ item }}</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticles, getFeedArticles, getTags } from '@/api/article.js'
import { mapState } from 'vuex'
import ArticleList from './components/list'
import Pagination from './components/pagination'

export default {
  name: "home",
  watchQuery: ['page','tag','tab'],// 监控url中？查询后面的变更；也可以是true，所有查询参数
  computed: {
    ...mapState(['user']),
    totalPage() {
      return Math.ceil(this.articlesCount/this.limit)
    }
  },
  components: {
    ArticleList,
    Pagination
  },

  // query可以从url中查询参数 
  async asyncData({ query, store }){
    // 从url中查询参数，例如：?page=2
    const page = Number.parseInt(query.page || 1)
    const tag = query.tag
    const tab = query.tab || 'global_feed'
    const limit = 20
   
    //  登陆过且是在tab为your_feed的情况下
    const loadArticles = store.state.user && tab === 'your_feed' ? getFeedArticles : getArticles

    // 两个请求并行执行
    const [ articleRes, tagRes ] = await Promise.all([
      loadArticles({
        limit: limit,   // 每页数据条数
        offset: (page-1)*limit,  // 跳过前n调数据，需要计算
        tag,
      }),
      getTags()
    ])

    const { articles, articlesCount } = articleRes.data
    const { tags } = tagRes.data
    articles.map(article=>article.favoriteDisabled=false)

    return {
      articles,
      articlesCount,
      limit,
      page,
      tags,
      tag,
      tab
    }
  }
};
</script>

<style>
</style>