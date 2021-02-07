import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import agenda from './components/agenda.vue'
import cadastro from './components/cadastro.vue'
import buscar from './components/buscar.vue'
import perfil from'./components/perfil.vue'
import login from'./components/user/login.vue'
import EditarExcluirDialog from './components/EditarExcluirDialog.vue'
import dia from'./components/dia.vue'
import agendar from'./components/perfil.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: perfil
    },
    {
      path: '/cadastro',
      name: 'cadastro',
      component: cadastro
    },
    {
      path: '/buscar',
      name: 'buscar',
      component: buscar
    },
    {
      path: '/agenda',
      name: 'agenda',
      component: agenda
    },
    {
    path: '/agendar',
    name: 'agendar',
    component: agendar
    },
    {
      path: '/EditarExcluirDialog',
      name: 'EditarExcluirDialog',
      component: EditarExcluirDialog

    },
    {
      path: '/dia',
      name: 'dia',
      component: dia
    },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  ]
})
