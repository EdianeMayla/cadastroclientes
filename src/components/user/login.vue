<template>
 <v-app id="inspire" xs>
    <v-content >
      <v-container
        class="fill-height"
        fluid>
        <v-layout row align-center justify-center >
            <v-card class="elevation-14"  >
              <v-toolbar
                color="pink"
                dark
              >
                <v-toolbar-title>Login </v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Mail"
                    name="email"
                    prepend-icon="person"
                    type="email"
                    id="email"
                    v-model="email"
                  />
                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    v-model="password"
                    prepend-icon="lock"
                    type="password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="pink" flat @click="onSignin()">Sign in</v-btn>
              </v-card-actions>
            </v-card>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        email: '',
        password: ''
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      }
    },
    methods: {
      onSignin () {
        this.$store.dispatch('signUserIn', {email: this.email, password: this.password})
      }
    }
  }
</script>

