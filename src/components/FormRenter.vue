<template>
  <v-container>
    <v-form class="formData-form" @submit.prevent="submitForm">
      <v-text-field v-model="formData.name" label="Adı" required></v-text-field>
      <v-text-field v-model="formData.contact.phone" label="Telefon" required></v-text-field>
      <v-text-field v-model="formData.contact.email" label="E-posta" required></v-text-field>
      <v-text-field v-model="formData.contact.address" label="Adres" required></v-text-field>
      <v-select v-model="formData.type" :items="types" label="Tür" required></v-select>
      <v-btn type="submit" color="primary">Kaydet</v-btn>
    </v-form>

    <NewComponent :successDialog="successDialog" :closeDialog="closeDialog" />

  </v-container>
</template>

<script>
import axios from 'axios';
import NewComponent from './NewComponent.vue'

export default {
  data() {
    return {
      formData: {
        name: '',
        contact: {
          phone: '',
          email: '',
          address: ''
        },
        type: ''
      },
      successDialog: false,
      types: ['Bireysel', 'Şirket']
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post('http://localhost:3000/renter', this.formData);
        
        if (response.status === 200) {
          console.log('Veri başarıyla gönderildi!');
          this.successDialog = true;
          this.resetForm();
        } else {
          console.error('Veri gönderilirken bir hata oluştu.');
        }
      } catch (error) {
        console.error('Bir hata oluştu:', error);
      }
    },
    resetForm() {
      this.formData = {
        name: '',
        contact: {
          phone: '',
          email: '',
          address: ''
        },
        type: ''
      };
    },
    closeDialog() {
      this.successDialog = false; 
    }
  },
  components: { NewComponent }
};
</script>

<style scoped>
.formData-form {
  max-width: 400px;
  margin: auto;
  padding: 5%;
}

.v-text-field, .v-select {
  width: 100%;
  margin-bottom: 20px;
}

.v-btn {
  width: 100%;
}
</style>
