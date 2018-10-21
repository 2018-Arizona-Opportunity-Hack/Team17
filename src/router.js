import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase';
Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path:'/',
      name: 'Home',
      component: () => import('./views/Home.vue'),
    },
    {
      path:'/events',
      name: 'Events',
      component: () => import('./views/Events.vue'),
    },
    {
      path:'/signup',
      name: 'Signup',
      component: () => import('./views/Signup.vue'),
      meta: {
        requiresGuest: true
      }
    },
    {
      path:'/login',
      name: 'Login',
      component: () => import('./views/Login.vue'),
      meta: {
        requiresGuest: true
      }
    },
    {
      path:'/admin',
      name:'Admin',
      component: () => import('./views/Admin.vue'),
      meta: {
        requiresAdmin: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!firebase.auth().currentUser) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (firebase.auth().currentUser) {
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
