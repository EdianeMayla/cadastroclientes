<template>
  <v-dialog width="350px" persistent v-model="show">
    <v-btn icon class="mr-3" slot="activator">
      <v-icon color="pink">date_range</v-icon>
    </v-btn>
    <v-card>
      <v-container>
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="date"
          transition="scale-transition"
          offset-y
          min-width="100px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="computedDateFormatted"
              label="Selecione a Data"
              prepend-icon="event"
              readonly
              color="pink"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="marcacao.data"
            value="DD/MM/YYYY"
            locale="pt-br"
            no-title
            scrollable
          >
            <v-spacer></v-spacer>
            <v-btn text color="pink" dark @click="menu = false">Cancel</v-btn>
            <v-btn text color="pink" dark @click="$refs.menu.save(marcacao.data)">OK</v-btn>
          </v-date-picker>
        </v-menu>
        <v-spacer></v-spacer>
        <v-menu
          ref="menu2"
          v-model="menu2"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="time"
          transition="scale-transition"
          offset-y
          max-width="200px"
          min-width="200px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="marcacao.time"
              label="Escolha a hora"
              prepend-icon="access_time"
              readonly
              color="pink"
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker
            color="pink"
            v-if="menu2"
            v-model="marcacao.time"
            full-width
            @click:minute="$refs.menu2.save(marcacao.time)"
          >
            <v-spacer></v-spacer>
            <v-btn text color="pink" dark @click="modal2 = false">Cancel</v-btn>
            <v-btn text color="pink" dark @click="$refs.dialog.save(marcacao.time)">OK</v-btn>
          </v-time-picker>
        </v-menu>
        <v-card-actions>
          <v-btn color="pink" dark @click="onClose()">Fechar</v-btn>
          <v-btn text color="pink" dark @click="submit()">Salvar</v-btn>
        </v-card-actions>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    cliente: { type: Object, default: Object },
   // marcacao: { type: Object, default: Object }
  },

  data() {
    return {
      show: false,
      editDialog2: false,
      reactive: false,
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      time: null,
      menu2: false,
      modal2: false,
      marcacao: {}
    };
  },

  computed: {
    computedDateFormatted() {
      return this.formatDate(this.marcacao.data);
    }
  },
  methods: {
    onClose() {
      this.show = false;
    },
    submit() {
      this.show = false;
      console.log(this.marcacao.id);
      const marcacao = {
        data: this.marcacao.data,
        time: this.marcacao.time,
        cliente: this.cliente
      };
      this.$store.dispatch("addMarcacao", marcacao);
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    }
  }
};
</script>
