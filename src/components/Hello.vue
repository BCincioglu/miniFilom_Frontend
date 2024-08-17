<template>
  <v-container class="container">
    <v-layout align-center justify-center class="welcome-content">
      <v-flex xs12>
        <v-btn variant="text" class="Merhaba" @click="goToLogin">HOŞ GELDİNİZ!</v-btn>
        <p class="body-1 text-center">Bu uygulama, araç kiralama işlemlerini yönetebilmeniz için tasarlanmıştır.</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Hello',
  methods: {
    goToLogin() {
      this.$router.push('/login');
    }
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

.Merhaba {
  text-align: center;
  font-size: 2.25rem;
  padding-bottom: 15%;
}

.container {
  max-width: 75%;
}
</style>
