<template>
  <v-layout row justify-center>
    <v-dialog v-model="show" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
        
          <v-card>
            <v-img
              :src="cliente.cardUrl"
              center
            >
              <v-layout
                column
                fill-height
              >
                <v-card-title>
                
                  <v-btn color="pink" dark icon @click="close_dialog()">
                    <v-icon>chevron_left</v-icon>
                  </v-btn>
                  <v-spacer></v-spacer>
                  <EditarExcluirDialog :cliente="cliente"/>
                  
                </v-card-title>

                <v-spacer></v-spacer>

              </v-layout>
            </v-img>

            <v-list two-line>

              <v-list-tile >
                <v-list-tile-action>
                  <v-icon color="pink">account_circler</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                  <v-list-tile-title>{{cliente.nome}}</v-list-tile-title>
                  <v-list-tile-sub-title>Nome</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-divider inset></v-divider>

              <v-list-tile >
                <v-list-tile-action>
                  <v-icon color="pink">phone</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                  <v-list-tile-title>{{cliente.telefone}}</v-list-tile-title>
                  <v-list-tile-sub-title>Telefone</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>


              <v-divider inset></v-divider>

              <v-list-tile>
                <v-list-tile-action>
                  <v-icon color="pink">mail</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                  <v-list-tile-title>{{cliente.email}}</v-list-tile-title>
                  <v-list-tile-sub-title>Email</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-divider inset></v-divider>

              <v-list-tile >
                <v-list-tile-action>
                  <agendar :cliente="cliente"/>
                </v-list-tile-action>

                <v-list-tile-content>
                  <v-list-tile-title>{{ formatDate(cliente.data)}}</v-list-tile-title>
                  <v-list-tile-sub-title>Data Marcada</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
      </v-layout>
    </v-dialog>
  </v-layout>
</template>

<script>
import EditarExcluirDialog from './EditarExcluirDialog';
import agendar from './agendar';

  export default {
    components: {
      EditarExcluirDialog,
      agendar
    },
    props: {
      show: { type: Boolean, default: false },
      cliente: {type: Object, default: Object},
    },
    methods:{
      close_dialog: function (){
        this.$emit('close_dialog')
      },
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${day}/${month}/${year}`
      }
    },
    data () {
      return {
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false
      }
    }
  }
</script>