import { createApp } from 'vue'
import './reset.css'
import './common.css'
import 'animate.css';
import App from './App.vue'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import library from "./plugins"
createApp(App)
.component("font-awesome-icon", FontAwesomeIcon)
.mount('#app')
