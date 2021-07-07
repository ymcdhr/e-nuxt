<template>
  <div>
    <div
      class="article-preview"
      v-for="article in articles"
      :key="article.slug"
    >
      <div class="article-meta">
        <nuxt-link
          :to="{
            name: 'profile',
            params: {
              username: article.author.username,
            },
          }"
          ><img :src="article.author.image"
        /></nuxt-link>
        <div class="author">
          <nuxt-link
            :to="{
              name: 'profile',
              params: {
                username: article.author.username,
              },
            }"
            >{{ article.author.username }}</nuxt-link
          >
          <span class="date">{{
            article.createdAt | date("MMM DD,YYYY")
          }}</span>
        </div>
        <button
          @click="onFavorite(article)"
          :disabled="article.favoriteDisabled"
          :class="{
            active: article.favorited,
          }"
          class="btn btn-outline-primary btn-sm pull-xs-right"
        >
          <i class="ion-heart"></i> {{ article.favoritesCount }}
        </button>
      </div>
      <nuxt-link
        :to="{
          name: 'article',
          params: {
            slug: article.slug,
          },
        }"
        class="preview-link"
      >
        <h1>{{ article.title }}</h1>
        <p>{{ article.description }}</p>
        <span>Read more...</span>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { addFavorite, deleteFavorite } from '@/api/article.js'

export default {
    props: {
        articles: {
            type: Array,
            required: true
        }
    },
    methods: {
        async onFavorite(article) {
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
    },
};
</script>

<style>
</style>