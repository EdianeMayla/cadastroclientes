import Vue from 'vue'
import App from './App.vue'
import * as firebase from 'firebase'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import EditarExcluirDialog from './components/EditarExcluirDialog.vue'
import agendar from './components/agendar'
import vueResponsive from 'vue-responsive'




Vue.use(Vuetify)
Vue.config.productionTip = false
Vue.component('app-editar-excluir-dialog',EditarExcluirDialog)
Vue.component('agendar', agendar);
Vue.directive('responsive', vueResponsive)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created (){
    firebase.initializeApp({  
          apiKey: "AIzaSyCoJAACDNspzF2NTJIKubPMKLnrg8chjW4",
          authDomain: "studio-kacia.firebaseapp.com",
          databaseURL: "https://studio-kacia.firebaseio.com",
          projectId: "studio-kacia",
          storageBucket: "gs://studio-kacia.appspot.com",
    })
  }
})



.$mount('#app')

