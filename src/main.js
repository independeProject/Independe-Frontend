import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import axios from 'axios'
import filter from './filter'
loadFonts()

const app = createApp(App)

app.use(router)
app.use(store)
app.use(vuetify)
app.use(axios)

app.config.globalProperties.$axios = axios;
app.config.globalProperties.$filter = filter;

app.mount('#app')