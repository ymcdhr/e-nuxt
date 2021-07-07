<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>

        <article-meta :article="article" />

      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
         <div class="col-md-12" v-html="article.body"></div>
         <ul class="tag-list">
           <li class="tag-default tag-pill tag-outline" v-for="tag in article.tagList" :key="tag">
            {{ tag }}
          </li>
        </ul>
      </div>

      <hr />

      <div class="article-actions">

        <article-meta :article="article" />

      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">

          <article-comments :article="article" />

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticle } from '@/api/article'
import MarkdownIt from 'markdown-it'

// 导入组件
import ArticleMeta from './components/article-meta'
import ArticleComments from './components/article-comments'

export default {
    name: 'artical',
    components: {
      ArticleMeta,
      ArticleComments
    },
    async asyncData({ params }) {
      const { data } = await getArticle(params.slug)
      console.log(data)      
      const { article } = data
      // 将markdown转换成html并渲染
      const md = new MarkdownIt()
      article.body = md.render(article.body)
      return {
        article
      }
    },
    // 优化SEO，添加title和meta
    head () {
      return {
        title: `${this.article.title} - RealWorld`,
        meta: [
          { hid: 'description', name: 'description', content: this.article.description }
        ]
      }
    }
};
</script>

<style>
</style>