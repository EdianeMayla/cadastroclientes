<template>
  <v-dialog width="500px" persistent v-model="editDialog">
    <v-btn color="pink" icon dark class="mr-3"  slot="activator">
      <v-icon>edit</v-icon>
    </v-btn>
    <v-card>
    <v-toolbar dark color="pink">
          <v-toolbar-title>Editar Dados</v-toolbar-title>
    </v-toolbar>
      <v-container>
        <v-layout row wrap>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                label="Nome"
                v-model="editedNome"
                required></v-text-field>
              <v-text-field
                label="Telefone"
                v-model="editedTelefone"
                required></v-text-field>
            </v-card-text>
            <v-btn color="pink" icon dark class="mr-3"  slot="activator" @click="onPickFile3"><v-icon>camera_alt</v-icon></v-btn>
                  <input 
                    type="file" 
                    style="display:none" 
                    ref="fileInput2" 
                    acept = "image/*"
                    @change = "onFiledPicked3"
                  >
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
                <v-btn  color="pink" dark @click="editDialog = false">Fechar</v-btn>
                <v-btn text color="pink" dark @click="onSaveChanges">Salvar</v-btn>
                
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    created() {
      console.log(this.cliente);
    },
    props: {
      cliente: {type: Object, default: null}
    },
    data () {
      return {
        editDialog: false,
        editedNome: this.cliente.nome,
        editedTelefone: this.cliente.telefone,
        imageCard: null
      }
    },
    methods: {
      onSaveChanges () {
        if (this.editedNome.trim() === '' || this.editedTelefone.trim() === '' ) {
          return
        }
        this.editDialog = false
        this.$store.dispatch('updateCliente', {
          id: this.cliente.id,
          nome: this.editedNome,
          telefone: this.editedTelefone,
          imageCard: this.imageCard
        })
      },
      onPickFile3(){
        this.$refs.fileInput2.click()
      },
      onFiledPicked3(event){
        const files = event.target.files  
        let filename = files[0].name;
        if(filename.lastIndexOf('.') <=0){
          return alert ('Por favor coloque um arquivo valido!')
        }
        const fileReader = new FileReader()
        fileReader.addEventListener('load',() =>{
          this.avatarUrl = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.imageCard = files[0]
    }
  }
}

</script>