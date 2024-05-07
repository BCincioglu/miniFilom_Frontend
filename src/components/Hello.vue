<template>

  <v-container class="container">
    <v-layout align-center justify-center class="welcome-content">
      <v-flex xs12>
        <h1 class="display-1 text-center">Hoş Geldiniz!</h1>
        <p class="body-1 text-center">Bu uygulama, araç kiralama işlemlerini yönetebilmeniz için tasarlanmıştır.</p>
      </v-flex>
    </v-layout>
  </v-container>
  

</template>


<script>

export default {
  name: 'Hello'

};
</script>

<style scoped>

.welcome-content {
  position: absolute;
  margin: 20%;
  padding: 15%;
  text-align: center;
}

.container {
  max-width: 75%;
}

</style>


