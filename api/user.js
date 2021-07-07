// 单独存放api请求的方法

import { request } from "@/plugins/request";

export const login = (data) => {
    return request({
        method: 'POST',
        url: '/api/users/login',
        data
    })
}

export const register = (data) => {
    return request({
        method: 'POST',
        url: '/api/users',
        data
    })
}


export const getProfile = (username) => {
    return request({
        method: 'GET',
        url: `/api/profiles/${username}`
    })
}

// 添加点赞
export const addFollow = (username, $router) => {
    return request({
        method: 'POST',
        url: `/api/profiles/${username}/follow`
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
export const deleteFollow = username => {
    return request({
        method: 'DELETE',
        url: `/api/profiles/${username}/follow`
    })
}

// 更新用户资料
export const updateProfile = data => {
    return request({
        method: 'PUT',
        url: '/api/user',
        data
    }).catch(function (error) {
        if (error.response) {
          // 请求已发出，但服务器响应的状态码不在 2xx 范围内
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
    });
}