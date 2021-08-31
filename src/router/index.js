import { createRouter, createWebHistory } from '@ionic/vue-router';
import Tabs from '../views/Tabs.vue'
import Login from '../views/Login.vue'
import { user, initialised } from "../firebase/auth";
import { watch } from 'vue'

const routes = [
  {
    path: '/',
    redirect: '/tabs/shopping'
  },
  {
    path: '/login',
    name: "Login",
    component: Login,
    meta: {
      public: true
    }
  },
  {
    path: '/tabs/',
    component: Tabs,
    children: [
      {
        path: '',
        name: "Tab1",
        redirect: '/tabs/shopping'
      },
      {
        path: 'shopping',
        component: () => import('@/views/Tab1.vue')
      },
      {
        path: 'tab2',
        component: () => import('@/views/Tab2.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, _, next) => {
  if (initialised.value) {
    if (!to.matched.some(record => record.meta.public) && !user.value) {
      return next("/login");
    }
    next();
  } else {
    watch(
      () => initialised.value,
      newVal => {
        if (newVal) {
          if (!to.matched.some(record => record.meta.public) && !user.value) {
            return next("/login");
          }
          next();
        }
      }
    );
  }
});

export default router
