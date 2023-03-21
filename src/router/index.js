import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth';
import { useCounterStore } from '../stores/counter';
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }
  ]
});

router.beforeEach(async (to) => {
  const publicViews = ['/login'];
  const authRequired = !publicViews.includes(to.path);
  const auth = useAuthStore();
  if (authRequired && !auth.user) {
    auth.returnUrl = to.fullPath;
    return '/login';
  }
  const counter = useCounterStore();
  if (auth.user && !counter.connected) {
    counter.connect(auth.user.access_token);
  }

})

export default router
