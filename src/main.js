import { createApp } from 'vue'
import '@/assets/css/reset.css'
import 'animate.css';
import '@/assets/css/common.css'
import App from './App.vue'
import router from './router';
import { createPinia } from 'pinia'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import library from "./plugins/font"
const pinia = createPinia()
createApp(App)
    .component("font-awesome-icon", FontAwesomeIcon)
    .use(router)
    .use(pinia)
    .mount('#app')
