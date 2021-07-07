// 单独存放api请求的方法

import { request } from "@/plugins/request";

export const getArticles = (params) => {
    return request({
        method: 'GET',
        url: '/api/articles',
        params
    })
}

export const getFeedArticles = (params) => {
    return request({
        method: 'GET',
        url: '/api/articles/feed',
        params
    })
}

export const getTags = () => {
    return request({
        method: 'GET',
        url: '/api/tags'
    })
}

// 添加点赞
export const addFavorite = (slug, $router)  => {
    return request({
        method: 'POST',
        url: `/api/articles/${slug}/favorite`
    }).catch(function (error) {
        if (error.response) {
          // 请求已发出，但服务器响应的状态码不在 2xx 范围内
          console.log("response:", error.response);
          
          if(error.response.status === 401){
            $router.push('/login')
            return
          }
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
}

// 取消点赞
export const deleteFavorite = slug => {
    return request({
        method: 'DELETE',
        url: `/api/articles/${slug}/favorite`
    })
}


// 获取文章详情
export const getArticle = slug => {
    return request({
        method: 'GET',
        url: `/api/articles/${slug}`
    })
}

// 获取文章评论
export const getComments = slug => {
    return request({
        method: 'GET',
        url: `/api/articles/${slug}/comments`
    })
}

export const setComments = (slug, data) => {
    return request({
        method: 'POST',
        url: `/api/articles/${slug}/comments`,
        data
    })
}

export const submitArticle = data => {
    return request({
        method: 'POST',
        url: `/api/articles`,
        data
    })
}

export const updateArticle = (slug, data) => {
    return request({
        method: 'PUT',
        url: `/api/articles/${slug}`,
        data
    })
}

export const deleteArticle = (slug) => {
    return request({
        method: 'DELETE',
        url: `/api/articles/${slug}`
    })
}
