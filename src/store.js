import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)


function saveImage(image, folder, clienteId ) {
  if (image) {
    const filename2 = image.name
    const ext = filename2.slice(filename2.lastIndexOf('.'))
    return firebase.storage().ref(folder+'/'+ clienteId + ext).put(image)
      .then(snapshot2 => {
        return snapshot2.ref.getDownloadURL()
      })
  } else { 
    return new Promise((resolve, reject) => {
      resolve(undefined)
    })
  }
}

export default new Vuex.Store({
  state: {
    user: null,
    loading: false,
    clientes: [],
    marcacao: []
  },
  getters: {
    user(state) {
      return state.user;
    },
    getclientes(state) {
      return state.clientes
    },
    getmarcacao(state) {
      return state.marcacao
    },
    getLoading(state) {
      return state.loading
    }
  },

  mutations: {
    addcliente(state, payload) {
      state.clientes.push(payload)
    },

    addMarcacao(state, payload) {
      state.marcacao.push(payload)
      const cliente = state.clientes.find(cliente => {
        return cliente.id === payload.clienteMarcado
      });
      
      cliente.data = payload.dataMarcada
    },
    setLoading(state, payload) {
      state.loading = payload
    },
    updateCliente(state, payload) {
      const cliente = state.clientes.find(cliente => {
        return cliente.id === payload.id
      })

      if (payload.nome) {
        cliente.nome = payload.nome
      }
      if (payload.telefone) {
        cliente.telefone = payload.telefone
      }
      // if (payload.telefone) {
      //   cliente.cardUrl = payload.cardUrl
      // }
    },
    updateCardUrl(state, payload) {
      const cliente = state.clientes.find(cliente => {
        return cliente.id === payload.id
      })

      if (payload.card.Url) {
        cliente.cardUrl = payload.cardUrl

      }
    },
    setUser(state, payload) {
      state.user = payload
    },
    setLoadedClientes(state, payload) {
      state.clientes = payload
    },
    setLoadedMarcacao(state, payload) {
      state.marcacao = payload
    },
    setLoadingMarcacao(state, payload) {
      state.loading2 = payload
    },
  },
  actions: {
    addMarcacao({ commit }, payload) {
      console.log(payload)
      const marcacao = {
        dataMarcada: payload.data,
        horaMarcada: payload.time,
        clienteMarcado: payload.cliente.id
      }

      firebase.database().ref('marcacao').push(marcacao)
        .then((data) => {

          firebase.database().ref('clientes').child(payload.cliente.id).update({ data: marcacao.dataMarcada })
            .then(() => {
              commit('addMarcacao', {
                ...marcacao,
                id: data.key
              })
            })

        })
        .catch(err => console.log(err));

    },

    loadMarcacao({ commit }) {
      commit('setLoadingMarcacao', true)
      firebase.database().ref('marcacao').once('value')
        .then((dados) => {
          const marcacao = []
          const obj = dados.val()
          for (let key in obj) {
            marcacao.push({
              id: key,
              dataMarcada: obj[key].dataMarcada,
              horaMarcada: obj[key].horaMarcada,
              clienteMarcado: obj[key].clienteMarcado
            })
          }
          commit('setLoadedMarcacao', marcacao)
          commit('setLoadingMarcacao', false)
        })
    },

    addcliente({ commit }, payload) {
      const cliente = {
        nome: payload.nome,
        email: payload.email,
        telefone: payload.telefone,
        // data: payload.data,
      }

      let avatarUrl
      let key
      let cardUrl

      commit('setLoading', true)
      firebase.database().ref('clientes').push(cliente)
        .then((data) => {
          key = data.key
          return key
        })
        .then(() => {
          return saveImage(payload.image, 'avatar', key)
        })
        .then(url => {
          avatarUrl = url
          return saveImage(payload.image2, 'card', key)
        })
        .then(url => {
          cardUrl = url
          return firebase.database().ref('clientes').child(key).update({ cardUrl: cardUrl, avatarUrl: avatarUrl })
        })
        .then(() => {
          commit('addcliente', {
            ...cliente,
            avatarUrl: avatarUrl,
            cardUrl: cardUrl,
            id: key
          })
          commit('setLoading', false)
        })
        .catch(error => {
          console.log(error);
          commit('setLoading', false)
        })
    },
    loadClientes({ commit }) {
      commit('setLoading', true)
      firebase.database().ref('clientes').once('value')
        .then((dados) => {
          const clientes = []
          const obj = dados.val()
          for (let key in obj) {
            clientes.push({
              id: key,
              nome: obj[key].nome,
              email: obj[key].email,
              telefone: obj[key].telefone,
              // data: obj[key].data,
              avatarUrl: obj[key].avatarUrl,
              cardUrl: obj[key].cardUrl,
            })
          }
          commit('setLoadedClientes', clientes)
          commit('setLoading', false)
        })
    },
    updateCliente({ commit }, payload) {
      commit('setLoading', true)
      const updateObj = {}
      if (payload.nome) {
        updateObj.nome = payload.nome
      }
      if (payload.telefone) {
        updateObj.telefone = payload.telefone
      }
      let cardUrl
      let avatarUrl
      saveImage(payload.imageCard, 'card', payload.id)
      .then(url => {
        cardUrl = url
        return saveImage(payload.imageAvatar, 'avatar', payload.id)
      })
      .then(url => {
        avatarUrl = url
        if (cardUrl) {
          updateObj.cardUrl = cardUrl
        }
        if (avatarUrl) {
          updateObj.avatarUrl = avatarUrl
        }
        return firebase.database().ref('clientes').child(payload.id).update(updateObj)
      })
      .then(() => {
        commit('updateCliente', {
          ...updateObj,
          id: payload
          // avatarUrl: avatarUrl,
          // cardUrl: cardUrl,
          // id: key
        })
        commit('setLoading', false)
      })

      
        .then(() => {
          if (payload.imageCard){
            let cardUrl
            const filename2 = payload.imageCard.name
            const ext = filename2.slice(filename2.lastIndexOf('.'))
            firebase.storage().ref('clientes/' + payload.id + ext).put(payload.imageCard)
            
            .then(() => {
            })
            .catch(error => {
              console.log(error);
              commit('setLoading', false)
            })
          }
          else {
            commit('setLoading', false)
            commit('updateCliente', payload)
          }


        })
    },
    signUserIn({ commit }, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          const newUser = {
            id: user.uid,
          }
          commit('setUser', newUser)
          this.dispatch('loadClientes');
          this.dispatch('loadMarcacao');
        })
    }
  }
})
