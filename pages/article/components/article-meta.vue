<template>
  <div class="article-meta">
    <nuxt-link :to="{
      name: 'profile',
      params: {
        username: article.author.username
      }
    }">
      <img :src="article.author.image" />
    </nuxt-link>
    <div class="info">
      <nuxt-link class="author" :to="{
        name: 'profile',
        params: {
          username: article.author.username
        }
      }">
        {{ article.author.username }}
      </nuxt-link>
      <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
    </div>
    <button
      @click="onFollow(article.author)"
      class="btn btn-sm btn-outline-secondary"
      :class="{
        active: article.author.following
      }"
    >
      <i class="ion-plus-round"></i>
      &nbsp;
      {{ btnText }}
    </button>
    &nbsp;&nbsp;
    <button
      v-if="!myself"
      @click="onFavorite"
      class="btn btn-sm btn-outline-primary"
      :class="{
        active: article.favorited
      }"
    >
      <i class="ion-heart"></i>
      &nbsp;
      Favorite Post <span class="counter">({{article.favoritesCount}})</span>
    </button>
    <button
      v-if="myself"
      @click="onDelete"
      class="btn btn-outline-danger btn-sm"
      :class="{
        active: article.favorited
      }"
    >
      <i class="ion-trash-a"></i>
      &nbsp;
      Delete Article
    </button>
  </div>
</template>

<script>
import { addFollow, deleteFollow } from '@/api/user.js'
import { addFavorite, deleteFavorite, deleteArticle } from '@/api/article.js'

export default {
  name: 'ArticleMeta',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data(){
    return {
      myself: this.$store.state.user && this.article.author.username === this.$store.state.user.username
    }
  },
  computed: {
    btnText() {
      const { 
        following,
        username
      } = this.article.author

      if(this.myself){
        return `Edit Article`
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
      if(this.myself)
        this.$router.push('/editor/'+this.article.slug)

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

    async onDelete() {
      await deleteArticle(this.article.slug)
      this.$router.push('/')
    },

    async onFavorite() {
      let article = this.article

      article.favoriteDisabled = true
      if(article.favorited){
          await deleteFavorite(article.slug)
          article.favorited = false
          article.favoritesCount += -1
      }
      else{
          await addFavorite(article.slug, this.$router)
          article.favorited = true
          article.favoritesCount += 1
      }
      article.favoriteDisabled = false
    }
  }
}
</script>

<style>

</style>
