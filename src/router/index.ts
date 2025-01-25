import { createRouter, createWebHistory } from 'vue-router'
import TodoView from '../views/TodoView.vue'
import LoginView from '../views/LoginView.vue'
import { useAuthStore } from '@/stores/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Todo',
      component: TodoView,
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
    },
  ],
});

router.beforeEach(async (to) => {
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path);
  const auth = useAuthStore();

  if (authRequired && !auth.user) {
    return '/login';
  }

})

export default router
