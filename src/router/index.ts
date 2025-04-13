import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "../layouts/DefaultLayout.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Public",
      component: DefaultLayout,
      redirect: "/",
      children: [
        {
          path: "/",
          name: "menu",
          component: () => import("../views/menuSection.vue"),
        },
      ],
    },
  ],
});

export default router;
