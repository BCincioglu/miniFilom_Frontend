<template>

  <v-container class="container">
    <v-layout align-center justify-center class="welcome-content">
      <v-flex xs12>
        <v-btn variant="text" class="Merhaba" @click="openModal">HOŞ GELDİNİZ!</v-btn>
        <p class="body-1 text-center">Bu uygulama, araç kiralama işlemlerini yönetebilmeniz için tasarlanmıştır.</p>
      </v-flex>
    </v-layout>

    <v-dialog v-model="modalOpen" persistent max-width="400px">
    <v-card>
      <v-card-title class="headline">Giriş Yap</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="login" class="login-form">
            <v-text-field v-model="username" label="Kullanıcı Adı"></v-text-field>
            <v-text-field v-model="password" label="Şifre" type="password"></v-text-field>
          <v-card-actions class="text-right">
            <v-btn class="btn" type="submit" color="primary">Giriş Yap</v-btn>
            <v-btn class="btn" @click="closeModal" color="error">İptal</v-btn>
        </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
    </v-dialog>
  </v-container>


</template>

<script>
import axios from 'axios';

export default {

  name: 'Hello',
  data() {
    return {
      modalOpen: false,
      username: '',
      password: ''
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
        console.log(token);
        axios.defaults.headers.common['Authorization'] = `${token}`;
        const readonly = false;
        localStorage.setItem('readonly', readonly)
        this.modalOpen = false;
        this.resetForm();
      } catch (error) {
        console.error('Giriş başarısız:', error);
      }
    },
    openModal() {
      this.modalOpen = true;
    },
    closeModal() {
      this.modalOpen = false;
    },
    resetForm() {
      this.username= '';
      this.password= '';
        },
  }
};
</script>

<style>
.headline {
  align-self: center;
}

.btn {
  align-self: center;
}

.welcome-content {
  position: absolute;
  margin: 20%;
  padding: 15%;
  text-align: center;
}

.Merhaba{
  text-align: center;
  font-size: 2.25rem;
  padding-bottom: 15%;
}

.container {
  max-width: 75%;
}

.text-right {
  text-align: right;
  margin-left: 55%;
}
</style>