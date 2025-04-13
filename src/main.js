import { createApp } from "vue";
import "./assets/sass/style.scss";

import { createHead } from '@vueuse/head'
import App from "./App.vue";
import axios from 'axios'
import router from "./router";

const app = createApp(App);
app.config.globalProperties.axios = axios
const head = createHead()
app.use(router);
app.use(head)
app.mount("#app");