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
app.use(axios)

app.mount('#app');

