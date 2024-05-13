<template>
  <v-container>
    <v-form @submit.prevent="submitForm" class="vehicle-form">
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field v-model="formData.plateNumber" label="Plaka Numarası" required></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field v-model="formData.brand" label="Marka" required></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field v-model="formData.model" label="Model" required></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field v-model="formData.productionYear" label="Üretim Yılı" type="number" required></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field v-model="formData.color" label="Renk"></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-select v-model="formData.type" label="Tür" :items="['Binek', 'Ticari', 'Kamyon']" required></v-select>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field v-model="formData.status" label="Durum" :items="['Aktif', 'Pasif']" readonly required></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field v-model="formData.price" label="Fiyat" type="number" required></v-text-field> 
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-btn type="submit" color="primary">Kaydet</v-btn>
        </v-col>
      </v-row>
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
        plateNumber: '',
        brand: '',
        model: '',
        productionYear: '',
        color: '',
        type: 'Binek',
        status: 'Pasif',
        price: '',
      },
      successDialog: false
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post('http://localhost:3000/vehicle', this.formData);
        
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
        plateNumber: '',
        brand: '',
        model: '',
        productionYear: '',
        color: '',
        type: 'Binek',
        status: 'Pasif',
        price: ''
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
.vehicle-form {
  max-width: 600px;
  margin: auto;
  padding: 5%;
}

.v-text-field,
.v-select,
.v-btn {
  margin-bottom: auto;
}

.v-row:last-child .v-col {
  text-align: center;
}
</style>
