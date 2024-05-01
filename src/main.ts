import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import axios from "axios";
const app = createApp(App)

axios.interceptors.request.use(
    // config：请求报文信息
    function (config) {
        // 在发送请求之前做些什么
        // 如果有token,就在请求头中添加token
        if (localStorage.getItem('authorization') != null && localStorage.getItem('authorization') != ''){
            config.headers.authorization = localStorage.getItem('authorization')
        }
        return config
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error)
    }
)
app.use(ElementPlus)
app.use(createPinia())
app.use(router)

app.mount('#app')
