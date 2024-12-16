import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomePage from "../views/HomePage.vue";
import ProductList from "../views/ProductList.vue";
import CreateProduct from "../views/CreateProduct.vue";
import UserIfno from "../views/UserInfo.vue";
import ApiFetchTest from "../views/ApiFetchTest.vue";
import HomeWork from "../views/HomeWork.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/productList",
    name: "product-list",
    component: ProductList,
  },
  {
    path: "/createProduct",
    name: "create-product",
    component: CreateProduct,
  },
  {
    path: "/userInfo",
    name: "user-info",
    component: UserIfno,
  },
  {
    path: "/Api-Test",
    name: "api-test",
    component: ApiFetchTest,
  },
  {
    path: "/hw",
    name: "hw",
    component: HomeWork,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
