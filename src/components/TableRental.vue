<template>
  <v-row>
    <v-col align-self="auto" cols="12">
      <h1 class="display-1 text-center">Kiralanma Verileri</h1>
      <v-data-table
        :headers="headers"
        :items="rentals"
        :items-per-page="10"
        class="elevation-1 custom-table"
      >
        <template v-slot:item="{ item }">
          <tr class="custom-row">
            <td>{{ item.vehicle }}</td>
            <td>{{ item.renter }}</td>
            <td>{{ formatDate(item.startDate) }}</td>
            <td>{{ formatDate(item.endDate) }}</td>
          </tr>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
  data() {
    return {
      rentals: [],
      headers: [
        { text: 'Araç', value: 'vehicle' },
        { text: 'Kiracı', value: 'renter' },
        { text: 'Başlangıç Tarihi', value: 'startDate' },
        { text: 'Bitiş Tarihi', value: 'endDate' }
      ]
    };
  },
  mounted() {
    this.fetchRentals();
  },
  methods: {
    async fetchRentals() {
      try {
        const response = await axios.get('http://localhost:3000/rental');
        this.rentals = await Promise.all(response.data.map(async (rental) => {
          const vehicleResponse = await axios.get(`http://localhost:3000/vehicle/${rental.vehicle}`);
          const renterResponse = await axios.get(`http://localhost:3000/renter/${rental.renter}`);
          return {
            ...rental,
            vehicle: vehicleResponse.data.plateNumber,
            renter: renterResponse.data.name
          };
      }));
    } catch (error) {
      console.error('Bir hata oluştu:', error);
    }
    },
    formatDate(dateString) {
      return moment(String(dateString)).format('DD/MM/YYYY');
    }
  }
};
</script>

<style scoped>
.v-col{
  padding: 5%;
  margin: auto;
  max-width: 75%;
}
.custom-row {
  background-color: grey;
}

.custom-table .v-data-table-header th {
  background-color: #1976d2;
  color: grey;
}

.custom-row:hover {
  background-color: #e0e0e0;
}
.display-1{
  margin-bottom: 2%;
}
</style>
