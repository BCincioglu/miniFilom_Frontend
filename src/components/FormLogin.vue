<template>
    <v-container class="login-container" v-if="!loggedIn">
      <v-card>
        <v-card-title class="headline">Giriş Yap</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="login" class="login-form">
            <v-text-field v-model="username" label="Kullanıcı Adı"></v-text-field>
            <v-text-field v-model="password" label="Şifre" type="password"></v-text-field>
            <v-alert v-if="errorMessage" type="error">{{ errorMessage }}</v-alert>
            <v-card-actions class="text-right">
              <v-btn class="btn" type="submit" color="primary">Giriş Yap</v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';

  export let routePass = false;

  export const setRoutePass = (value) => {
  routePass = value;
};
  
  export default {
    name: 'Login',
    data() {
      return {
        username: '',
        password: '',
        errorMessage: '',
        loggedIn: false,
        token: ''
      };
    },
    methods: {
      async login() {
        try {
          const response = await axios.post('http://localhost:3000/auth/login', {
            username: this.username,
            password: this.password
          });
          const token = response.data.token;
          localStorage.setItem('token', token);
          this.$emit('basarili');
          setRoutePass(true);
          axios.defaults.headers.common['Authorization'] = `${token}`;
          this.$router.push('/')
        } catch (error) {
          this.errorMessage = 'Giriş başarısız. Lütfen kullanıcı adı ve şifrenizi kontrol ediniz.';
          console.error('Giriş başarısız:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .login-container {
    max-width: 55%;
    margin: auto;
    padding-top: 50px;
  }
  .headline {
    text-align: center;
  }
  .text-right {
    text-align: right;
  }
  .btn {
    width: 100%;
  }
  </style>