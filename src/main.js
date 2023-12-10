import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import axios from 'axios'
loadFonts()

const app = createApp(App)

app.use(router)
app.use(store)
app.use(vuetify)

app.config.globalProperties.$filter = {
    formatYear(value) {
        var date = new Date(value);
        var year = date.getFullYear();

        return year
    },
    formatDate(value) {
        var date = new Date(value);
        var month = date.getMonth() + 1;
        var day = date.getDate();

        if (month < 10)
            month = '0' + month

        if (day < 10)
            day = '0' + day

        return month + '-' + day;
    },
    formatTime(value) {
        var date = new Date(value);
        var hour = date.getHours();
        var min = date.getMinutes();

        if (hour < 10)
            hour = '0' + hour

        if (min < 10)
            min = '0' + min

        return hour + ":" + min ;
    }
}

app.config.globalProperties.$axios = axios;
app.mount('#app')