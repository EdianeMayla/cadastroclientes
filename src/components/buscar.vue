
<template>
  <v-layout row>
    <v-flex xs0 >
        <v-toolbar color= "pink" dark > 
          <v-text-field
            v-model="search"
            label = "Buscar"
            color="pink">
            </v-text-field>
          <v-btn
                icon @click="cadastrar()"
              >
              <v-icon>add</v-icon>
          </v-btn> 
<perfil :show="show_dialog" :cliente="cliente_selecionado" @close_dialog="close_dialog"/>
          <v-btn icon @click="">
            <v-icon>search</v-icon>
          </v-btn>
        </v-toolbar>
        <v-list>
          <v-list-tile
            v-for="cliente in filteredClientes "
            :key="cliente.id"
            avatar
            @click="open_dialog(cliente)"
          >
            <v-list-tile-content>
              <v-list-tile-title v-text="cliente.nome"></v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-avatar>
              <img :src="cliente.avatarUrl">
            </v-list-tile-avatar>
          </v-list-tile>
        </v-list> 
    </v-flex>
  </v-layout>
</template>

<script>
import perfil from "./perfil.vue";

  export default {
      components:{
        perfil
      },
      methods:{
        cadastrar: function(){
          this.$router.push('/cadastro') 
          },

          open_dialog: function(cliente){
            this.cliente_selecionado = cliente
            this.show_dialog =true
          },
          close_dialog: function(){
              this.show_dialog =false;
          }
      },
      computed:{
        clientes(){
            return this.$store.getters.getclientes
        },
        filteredClientes() {

          return this.clientes.filter(cliente=> {
            return cliente.nome.toLowerCase().indexOf(this.search.toLowerCase()) > -1
          })
        }
      },
    data () {
      return {
          search: '',
          cliente_selecionado: {},
          show_dialog: false,

      }
    }
  }
</script>

