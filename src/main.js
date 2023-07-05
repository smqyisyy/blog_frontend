import { createApp } from 'vue'
import './reset.css'
import './common.css'
import 'animate.css';
import App from './App.vue'
import router from './router';
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import library from "./plugins/font"
createApp(App)
    .component("font-awesome-icon", FontAwesomeIcon)
    .use(router)
    .mount('#app')
