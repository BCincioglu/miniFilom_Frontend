<template>
    <v-container class="form-container">
      <v-form @submit.prevent="submitForm" v-model="valid">
        <v-row class="form-item">
          <v-col cols="12" md="5">
            <v-autocomplete 
            v-model="formData.vehicle" 
            label="Kiralanacak Araç" 
            :items="vehicles"
            item-title="plateNumber"
            item-value="_id"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="5">
            <v-autocomplete 
            v-model="formData.renter" 
            label="Kiralayacak Kişi" 
            :items="renters"
            item-title="name"
            item-value="_id" 
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row class="form-item">
          <v-col cols="12" md="6">
            <v-date-picker v-model="formData.startDate" label="Başlangıç Tarihi" :min="minStartDate" :max="maxStartDate"   required></v-date-picker>
          </v-col>
          <v-col cols="12" md="6">
            <v-date-picker v-model="formData.endDate" label="Bitiş Tarihi" :min="minEndDate" :max="maxEndDate" required ></v-date-picker>
          </v-col>
        </v-row>
        <v-btn class="button" type="submit" color="primary" :disabled="!valid">Kaydet</v-btn>
      </v-form>
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
      formData: {
        vehicle: null,
        renter: '',
        startDate: null,
        endDate: null
      },
      vehicles: [],
      renters: [],
      valid: false,
      successDialog: false,
      minStartDate: null,
      maxStartDate: null,
      minEndDate: null,
      maxEndDate: null
    };
  },
  mounted() {
    this.fetchVehiclesAndRenters();
  },
  watch: {
    'formData.vehicle': function(newValue) {
      if(newValue) {
        this.fetchRentalDatesForVehicle(newValue);
      } else {
        this.resetDateConstraints();
      }
    }
  },
  methods: {
    async fetchVehiclesAndRenters() {
      try {
        const response = await axios.get('http://localhost:3000/vehicle');
        this.vehicles = response.data;
        const response1 = await axios.get('http://localhost:3000/renter');
        this.renters = response1.data;
      } catch (error) {
        console.error('Araç ve kiracı verileri alınırken bir hata oluştu:', error);
      }
    },
    async fetchRentalDatesForVehicle(vehicleId) {
      try {
        const response = await axios.get(`http://localhost:3000/rental`);
        const rentals = response.data;

        const vehicleRentals = rentals.filter(rental => rental.vehicle === vehicleId);

        console.log(vehicleRentals);

        const startDateList = vehicleRentals.map(rental => new Date(rental.startDate));
        const endDateList = vehicleRentals.map(rental => new Date(rental.endDate));

        this.minStartDate = new Date(Math.min(...startDateList));
        this.maxStartDate = new Date(Math.max(...endDateList));
        this.minEndDate = new Date(Math.min(...startDateList));
        this.maxEndDate = new Date(Math.max(...endDateList));
        
        console.log(this.minStartDate);
        console.log(this.maxStartDate);
        console.log(this.minEndDate);
        console.log(this.maxEndDate); 
        console.log("oldu");

      } catch (error) {
        console.error('Araç kiralama verileri alınırken bir hata oluştu:', error);
      }
    },
    resetDateConstraints() {
      // Kısıtlamaları sıfırla
      this.minStartDate = null;
      this.maxStartDate = null;
      this.minEndDate = null;
      this.maxEndDate = null;
    },
    async submitForm() {
      console.log('Form verileri:', this.formData);
      try {
        const response = await axios.post('http://localhost:3000/rental', this.formData);

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
        vehicle: null,
        renter: '',
        startDate: null,
        endDate: null
      };
    },
    closeDialog() {
      this.successDialog = false;
    }
  }
};
</script>

<style scoped>
.headline {
  font-size: 24px;
  margin-bottom: 20px;
}
.v-layout {
  margin: 5%;
  padding: 25%;
}

.form-container {
  margin: 5%;
}

.form-item {
  margin-bottom: 10px;
}
.button{
  width: 300px;
}
</style>
