import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import ContactInfoView from "../views/ContactInfoView.vue";
import BookingView from "../views/BookingView.vue";
import UserView from "../views/UserView.vue";
import UserManagementView from "../views/UserManagementView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "home", component: HomeView },
    { path: "/login", name: "login", component: LoginView },
    { path: "/contact", name: "contact", component: ContactInfoView },
    { path: "/booking", name: "booking", component: BookingView },
    { path: "/user", name: "user", component: UserView },
    { path: "/user/management", name: "user-management", component: UserManagementView },
  ],
});

export default router;