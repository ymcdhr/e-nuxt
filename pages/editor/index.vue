<template>
  <div class="editor-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-10 offset-md-1 col-xs-12">
        <form @submit.prevent="onSubmit">
          <fieldset>
            <fieldset class="form-group">
                <input required v-model="article.title" type="text" class="form-control form-control-lg" placeholder="Article Title">
            </fieldset>
            <fieldset class="form-group">
                <input required v-model="article.description" type="text" class="form-control" placeholder="What's this article about?">
            </fieldset>
            <fieldset class="form-group">
                <textarea required v-model="article.body" class="form-control" rows="8" placeholder="Write your article (in markdown)"></textarea>
            </fieldset>
            <fieldset class="form-group">
                <input @keydown="onEnterTags" v-model="tag" type="text" class="form-control" placeholder="Enter tags">
                <div class="tag-list">
                <span v-for="(tag, index) in article.tagList" :key="index" class="tag-default tag-pill">
                  <i class="ion-close-round" @click="removeTag(tag)"></i>
                  {{ tag }}
                </span>
                </div>
            </fieldset>
            <button type="submit" class="btn btn-lg pull-xs-right btn-primary">
                Publish Article
            </button>
          </fieldset>
        </form>
      </div>

    </div>
  </div>
</div>
</template>

<script>
import { submitArticle, updateArticle, getArticle } from '@/api/article.js'

export default {
  name: 'editor',
  // 在路由匹配组件之前先执行中间件
  // 数组可以添加多个中间件，authenticated为中间件js文件名
  middleware: ['authenticated'], 
  data (){
    return {
      tag: '',
      article: {
        "title": "",
        "description": "",
        "body": "",
        "tagList": []
      }
    }
  },

  methods: {
    onEnterTags(e) {
      // 兼容FF和IE和Opera
      const theEvent = window.event || e;
      const code = theEvent.keyCode || theEvent.which || theEvent.charCode;

      if (code == 13) {
        const { tagList } = this.article
        const { value } = e.target
        if(!tagList.find(tag=>tag===value)){
          tagList.push(value)
        }
        this.tag = ''
        e.preventDefault()
      }
    },

    removeTag(tag){
      const { tagList } = this.article
      this.article.tagList = tagList.filter(item=>item!==tag)
    },

    async onSubmit() {
      try{
        const slug = this.$route.params.slug
        if(slug){
          await updateArticle(slug, {
            article: this.article
          })
          this.$router.push('/article/'+slug)
        }
        else{
          await submitArticle({
            article: this.article
          })
          this.$router.push('/')
        }
      }
      catch(e){
        console.log(e)
      }
    }
  },
  async asyncData({ params }) {
    if(params.slug){
      const { data } = await getArticle(params.slug)
      const { article } = data
      return {
        article
      }
    }
  }
}
</script>

<style>

</style>