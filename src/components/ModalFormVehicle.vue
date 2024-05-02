<template>
    <v-container>
        <v-dialog v-model="editModal" max-width="500">
      <v-card>
        <v-card-title class="title">
          Aracı Düzenle
        </v-card-title>
        <v-card-text>
          <v-form ref="form" @submit.prevent="submitForm" class="vehicle-form">
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
            <v-card-actions class="text-right">
              <v-btn type="submit" color="primary">Kaydet</v-btn>
              <v-btn @click="editModal = false" color="error">İptal</v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="successDialog" max-width="300">
      <v-card>
        <v-card-title class="headline">İşlem Başarılı!</v-card-title>
        <v-card-text>
          Veri başarıyla gönderildi.
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="closeDialog">Tamam</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-container>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            headers: [
        { text: 'Plaka Numarası', value: 'plateNumber' },
        { text: 'Marka', value: 'brand' },
        { text: 'Model', value: 'model' },
        { text: 'Üretim Yılı', value: 'productionYear' },
        { text: 'Renk', value: 'color' },
        { text: 'Tür', value: 'type' },
        { text: 'Durum', value: 'status' },
        { text: 'Fiyat', value: 'price' }
      ],
      formData: {
        plateNumber:'',
        brand:'',
        model:'',
        productionYear:'',
        color:'',
        type:'',
        status:'',
        price:'',
      },
      editModal: false,
      successDialog: false,
     };
    },

    methods: {
        async submitForm() {
        console.log('Gönderilen Araç:', this.formData);
        try {
            const response = await axios.post(`http://localhost:3000/vehicle/${this.formData._id}`, this.formData);

            if (response.status === 200) {
            this.successDialog = true;
            this.resetForm();
            this.getAllVehicles();
            console.log('Veri başarıyla gönderildi!');
            } else {
            console.error('Veri gönderilirken bir hata oluştu.');
            }
            this.editModal = false;
        } catch (error) {
            console.error('Araç güncellenirken bir hata oluştu:', error);
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
    }
};
</script>

