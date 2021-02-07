<template>
<v-app > 
  <v-content>
     <div class="headline text-xs-center">
      <router-view/>
     </div>

    <v-bottom-nav
      :active.sync="activeBtn"
      :value="showNav"
      absolute
      color="pink" dark
    >
      <v-btn flat to ="/">
        <span>Home</span>
        <v-icon>home</v-icon>
      </v-btn>

      <v-btn flat to ="/cadastro">
        <span>Novo</span>
        <v-icon>person_add</v-icon>
      </v-btn>

      <v-btn flat to ="/buscar">
        <span>Buscar</span>
        <v-icon>search</v-icon>
      </v-btn>

      <v-btn flat to ="/agenda" >
        <span>Agenda</span>
        <v-icon>calendar_today</v-icon> 
      </v-btn>
    </v-bottom-nav>
  </v-content>
</v-app>
</template>

<script>
  export default {
    created (){
      this.$router.push('/login')

    },
    data () {
      return {
        activeBtn: 1
      }
    },
    computed:{
      showNav(){
        let result = this.$store.getters.user !== null && this.$store.getters.user !== undefined;
        if (result)
          this.$router.push('/')
        return result
      }
    }
  }
</script>


