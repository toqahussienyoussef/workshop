import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import NotFoundLayout from "../layouts/NotFoundLayout.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "public",
      component: DefaultLayout,
      children: [
        {
          path: "",
          name: "foodMenu",
          component: () => import("../views/menuSection.vue"),
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      name: "404",
      component: NotFoundLayout,
      children: [
        {
          path: "",
          component: () => import("../views/404.vue"),
        },
      ],
    },
  ],
});

export default router;
