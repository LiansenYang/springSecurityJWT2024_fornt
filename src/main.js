// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
// 设置Axios的基础URL

const app = createApp(App)
.use(router);

// 将axios实例绑定到全局属性上，这样在任何组件中都可以使用 this.$http 进行请求
app.config.globalProperties.$http = axios;

// 添加请求拦截器
axios.interceptors.request.use(
    config => {
        // 获取存储在 localStorage 中的 token
        const token = localStorage.getItem('authToken');

        if (token) {
            // 将 token 添加到请求头中
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    error => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);


app.use(axios)

app.mount('#app');

