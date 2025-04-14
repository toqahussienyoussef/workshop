import { createApp } from "vue";
import "./assets/sass/style.scss";

import { createHead } from "@vueuse/head";
import Vue3Toasity from "vue3-toastify";
import App from "./App.vue";
import axios from "axios";
import router from "./router";

const app = createApp(App);
app.config.globalProperties.axios = axios;
const head = createHead();
app.use(router);
app.use(head);

app.use(Vue3Toasity, {
  containerClassName: "custom-container-class",
});
app.mount("#app");
