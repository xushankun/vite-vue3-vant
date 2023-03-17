import { createApp } from 'vue'
import App from './App.vue'
import 'vant/lib/index.css'
import router from './router'
import store from '@/store'
const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
