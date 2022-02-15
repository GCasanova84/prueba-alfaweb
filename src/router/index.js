import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: { name: 'Login' }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/registro',
    name: 'Registro',
    component: () => import('../views/Registro.vue')
  },
  {
    path: '/home',
    name: 'Home',
    meta: {
      requiresAuth: true
    },
    component: () => import('../views/Home.vue')
  },
  {
    path: '/administracion',
    name: 'Administracion',
    meta: {
      requiresAuth: true
    },
    component: () => import('../views/Administracion.vue')
  },
  {
    path: '/edicion/:id',
    name: 'Edicion',
    meta: {
      requiresAuth: true
    },
    props: true,
    component: () => import('../views/Edicion.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0)
  let user = JSON.parse(sessionStorage.getItem('user'));
  let authRequired = to.matched.some(record => record.meta.requiresAuth);
  if (!user && authRequired) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else if (user && !authRequired) {
    next({
      path: '/home',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
})

export default router
