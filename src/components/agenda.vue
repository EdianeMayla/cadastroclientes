<template>
  <v-layout wrap>
      <v-flex
      sm100px
      class="text-sm-left"
    >
      <v-btn @click="$refs.calendar.prev()" sm4>
        <v-icon
          left
        >
          keyboard_arrow_left
        </v-icon>
      Anterior
      </v-btn>
       <v-btn @click="$refs.calendar.next()" sm4>
       Proximo
        <v-icon
          right
        >
          keyboard_arrow_right
        </v-icon>
      </v-btn>
    </v-flex>
    
    
    <v-flex
      sm4
      class="text-sm-center"
    >
      <v-select
        v-model="type"
        :items="typeOptions"
       
      ></v-select>
    </v-flex>
    <v-flex
      sm4
      xs11
      class="text-sm-right"
    >
     
    </v-flex>
    <v-flex
      sm4
      class="mb-3"
    >
      <v-sheet height="390">
        <v-calendar
          sm4
          ref="calendar"
          v-model="start"
          :type="type"
          color="pink"
          locale="pt-br"
        >
        <template v-slot:dayHeader="{ date }" sm4>
            <template v-for="event in eventsMap[date]"sm4>
              <!-- all day events don't have time -->
              <div
                sm4
                v-if="!event.clienteMarcado"
                :key="event.id"
                class="my-event"
                @click="open(event)"
                v-html="getNome(event)"
              ></div>
            </template>
          </template>
          <template v-slot:dayBody="{ date, timeToY, minutesToPixels }"sm4>
            <template v-for="event in eventsMap[date]" sm4>
              <!-- timed events -->
              <div
                sm4
                :key="event.id"
                :style="{ top: timeToY(event.horaMarcada) + 'px', height: minutesToPixels(60) + 'px' }"
                class="my-event with-time"
                @click="open(event)"
                v-html="getNome(event)"
              ></div>
            </template>
          </template>


          <template v-slot:day="{ date }"sm4>
          
            <template v-for="event in eventsMap[date]"sm4>
              <v-menu
                sm4
                :key="event.id"
                v-model="event.open"
                full-width
                offset-x
              >
                <template v-slot:activator="{ on }"sm4>
                  <div
                    sm4
                    v-if="event.horaMarcada"
                    v-ripple
                    class="my-event"
                    v-on="on"
                    v-html="getNome(event)"
                  ></div>
                </template>
                <v-card
                  sm4
                  color="grey lighten-4"
                  min-width="350px"
                  flat
                >
                  <v-toolbar
                    sm4
                    color="pink"
                    dark
                  >
                    <v-toolbar-title>Editar Horario</v-toolbar-title sm4>
                    <agendar white :marcacao="marcacaoSelecionada" @click="remarcar(event)"/ sm4>

                   
                    <v-toolbar-title v-html="event.title"></v-toolbar-title sm4>
                    <v-spacer></v-spacer>
                  </v-toolbar sm4>
                  <v-card-title primary-title
                      v-html="dadosMarcacao(event)" sm4>
                    <span v-html="event.details" sm4></span>
                  </v-card-title>
                  <v-card-actions sm4>
                    <v-btn
                      sm4
                      flat
                      color="secondary"
                    >
                      Cancelar Alteração
                    </v-btn>
                    <v-btn
                      sm4
                      flat
                      color="secondary"
                    >
                      Excluir Marcação
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-menu>
            </template>
          </template>
        

        </v-calendar>
      </v-sheet>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
      marcacaoSelecionada: null,
      type: 'month',
      start: (new Date()).toISOString(),//'2019-01-01',
      typeOptions: [
        { text: 'Dia', value: 'day' size: 10},
        { text: 'Semana', value: 'week' },
        { text: 'Mês', value: 'month' },
      ],
      events: [
        {
          title: 'Vacation',
          date: '2020-06-28',
          open: false
        },
      ]
    }),
    computed: {
      // convert the list of events into a map of lists keyed by date
      eventsMap () {
        const map = []
        this.marcacoes.forEach(marcacao => 
            (map[marcacao.dataMarcada] = map[marcacao.dataMarcada] || []).push(marcacao)
        );
        console.log(map)
        return map
      },
      marcacoes () {
        return this.$store.getters.getmarcacao
      }
    },
    methods: {
      remarcar(marcacao) {  
        this.marcacaoSelecionada = marcacao;
        console.log(marcacao);
      },
      dadosMarcacao(marcacao) {
        return this.getNome(marcacao) + " "  + marcacao.horaMarcada
        
      },
      getCliente(marcacao) {
        return this.$store.getters.getclientes.find(c => c.id == marcacao.clienteMarcado)
      },

      getNome(marcacao) {
        return this.getCliente(marcacao).nome
      },

      open (event) {
        alert(event.title)
      }
    }
  }
</script>

<style lang="css" scoped>
 
  .my-event {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 2px;
    background-color: #c018a4;
    color: #ffffff;
    border: 1px solid #c018a4;
    font-size: 8px;
    padding: 3px;
    cursor: pointer;
    margin-bottom: 1px;
    left: 4px;
    margin-right: 8px;
    position: relative;
  
    }
    .with-time {
      position: absolute;
      right: 4px;
      margin-right: 0px;
    }
  
</style>
