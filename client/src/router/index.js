import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import Retro from '../views/Retro.vue'
import CreateRetro from '../components/CreateRetro.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/main',
    name: 'Main',
    component: Main
  },
  { 
    path: '/retro',
    name: 'Retro',
    component: Retro
  },
  { 
    path: '/create-retro',
    name: 'CreateRetro',
    component: CreateRetro
  }
]

const router = new VueRouter({
  routes
})

export default router
