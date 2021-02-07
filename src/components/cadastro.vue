<template>
  <div>
     <v-toolbar color= "pink" dark>  
        <v-toolbar-title>Cadastrar</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
  <v-container>
  <form>
    <v-text-field
      v-model="cliente.nome"
      label="Nome"
      prepend-icon="face"
      required
    ></v-text-field>
    <v-text-field
      v-model="cliente.email"
      label="E-mail"
      prepend-icon="mail"
      required
    ></v-text-field>
    <v-text-field
      v-model="cliente.telefone"
      label="Telefone"
      prepend-icon="call"
      required
    ></v-text-field>
    <v-btn raised class = "pink" dark @click="onPickFile"> Avatar</v-btn>
    <input 
      type="file" 
      style="display:none" 
      ref="fileInput" 
      acept = "image/*"
      @change = "onFiledPicked">
    <v-btn raised class = "pink" dark @click="onPickFile2"> Imagem</v-btn>
    <input 
      type="file" 
      style="display:none" 
      ref="fileInput2" 
      acept = "image/*"
      @change = "onFiledPicked2">
    <v-btn @click="submit()">Enviar</v-btn>
  </form>
  <v-progress-circular
      :size="60"
      :width="6"
      color="pink"
      indeterminate
      v-if="getLoading"
    ></v-progress-circular>
  </v-container>
  </div>
</template>

<script>

  export default {

    data: () => {
      return {
        cliente: {},
        success: false,
        dirty: false
      }
    },
    computed: {
      getLoading() {
        return this.$store.getters.getLoading
      },
    },
    watch: {
      cliente:
      {
        handler(newVal, oldVal)
        {
          this.dirty = true;
        },
        deep: true
      }

    },
    methods: {
      submit () {
        const cliente = {
          nome:this.cliente.nome, 
          email: this.cliente.email, 
          telefone:this.cliente.telefone, 
          image:this.cliente.image,
          image2:this.cliente.image2
        };
        if (this.dirty) {
          this.dirty = false
          this.$store.dispatch("addcliente", cliente)
          .then(() => {
            this.cliente = {};
            this.success = true
          })
        } else {
          return alert ('Por favor preencher o formulario!')
        }
      },
      onPickFile(){
        this.$refs.fileInput.click()
      },
      
      onPickFile2(){
        this.$refs.fileInput2.click()
      },
      onFiledPicked(event){
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
        this.cliente.image = files[0]
      },
      onFiledPicked2(event){
        const files = event.target.files
        let filename = files[0].name;
        if(filename.lastIndexOf('.') <=0){
          return alert ('Por favor coloque um arquivo valido!')
        }
        const fileReader = new FileReader()
        fileReader.addEventListener('load',() =>{
          this.cardUrl = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.cliente.image2 = files[0]
      }
  }
}
</script>