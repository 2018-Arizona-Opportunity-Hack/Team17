import Vue from 'vue';
import Router from 'vue-router';
import Events from '@/views/Events'
import EventInfo from '@/views/EventInfo'

import db from './components/firebaseInit';
import firebase from 'firebase';
Vue.use(Router)

const uuidv1 = require('uuid/v1');

let router = new Router({
  mode: 'history',
  routes: [
    {
      path:'/',
      name: 'Home',
      component: () => import('./views/Home.vue'),
    },
    {
      path:'/import',
      name: 'Import',
      component: () => import('./views/Import.vue')
    },
    {
      path:'/events',
      name: 'Events',
      component: () => import('./views/Events.vue'),
    },
    {
      path:'/events/:event_id',
      name: 'EventInfo',
      component: () => import('./views/EventInfo.vue'),
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
  } else if (to.matched.some(record => record.meta.requiresAdmin)) {
    // {
    //   email
    //   admin
    //   address
    //   zipcodeW
    //   showedup
    //   signedup
    //   endorsements
    // }

    // {
    //   name
    //   description
    //   address
    //   zipcode
    //   volNeeded
    //   waitList
    //   list
    // }

    if (firebase.auth().currentUser) {
      db.collection('users').where('email', '==', firebase.auth().currentUser.email).get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          if(doc.data().admin == true) {
            next({
              path: '/admin',
              query: {
                redirect: to.fullPath
              }
            });
          } else {
            next({
              path: '/',
              query: {
                redirect: to.fullPath
              }
            });
          }
        })
      })
      db.collection('volunteers').add({
        volunteer_id: uuidv1(),
        email: firebase.auth().currentUser.email
      })
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
