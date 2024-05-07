<template>
  <v-container>
    <h1 class="display-1 text-center">Kiracı Verileri</h1>
    <v-data-table
      :headers="headers"
      :items="renters"
      :items-per-page="10"
      class="elevation-1"
    >
      <template v-slot:item="{ item }">
        <tr class="custom-row" @dblclick="openEditModal(item)">
          <td>{{ item.name }}</td>
          <td>{{ item.contact.phone }}</td>
          <td>{{ item.contact.email }}</td>
          <td>{{ item.contact.address }}</td>
          <td>{{ item.type }}</td>
          <td>{{ item.vehiclesRented }}</td>
        </tr>
      </template>
    </v-data-table>

    <ModalFormRenter :submitForm="submitForm" :editFormData="editFormData" :types="types" v-model:editModal="editModal" />

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
import ModalFormRenter from './ModalFormRenter.vue'

export default {
    data() {
        return {
            renters: [],
            headers: [
                { text: "Adı", value: "name" },
                { text: "Telefon", value: "contact.phone" },
                { text: "E-posta", value: "contact.email" },
                { text: "Adres", value: "contact.address" },
                { text: "Tür", value: "type" },
                { text: "Kiralanan Araç", value: "vehiclesRented" }
            ],
            editFormData: {
                name: "",
                contact: {
                    phone: "",
                    email: "",
                    address: ""
                },
                type: "",
                vehiclesRented: "",
            },
            successDialog: false,
            editModal: false,
            types: ["Bireysel", "Şirket"]
        };
    },
    mounted() {
        this.fetchRenters();
    },
    methods: {
        async fetchRenters() {
            try { 
                const response = await axios.get("http://localhost:3000/renter");
                this.renters = await Promise.all(response.data.map(async (renter) => {
                if (renter.vehiclesRented) {
                  const vehicleResponse = await axios.get(`http://localhost:3000/vehicle/${renter.vehiclesRented}`);
                  return {
                    ...renter,
                    vehiclesRented: vehicleResponse.data.plateNumber
                  };
                  } else {
                    return renter; 
                  };
                  }));
            } catch (error) {
                console.error("Bir hata oluştu:", error);
            }
        },
        openEditModal(item) {
            this.editFormData = { ...item };
            this.editModal = true;
        },
        async submitForm() {
            console.log("Gönderilen Kişi:", this.editFormData);
            try {
                const response = await axios.post(`http://localhost:3000/renter/${this.editFormData._id}`, this.editFormData);
                if (response.status === 200) {
                    console.log("Veri başarıyla gönderildi!");
                    this.successDialog = true;
                    this.resetForm();
                    this.fetchRenters();
                }
                else {
                    console.error("Veri gönderilirken bir hata oluştu.");
                }
                this.editModal = false;
            }
            catch (error) {
                console.error("Araç güncellenirken bir hata oluştu:", error);
            }
        },
        resetForm() {
            this.editFormData = {
                name: "",
                contact: {
                    phone: "",
                    email: "",
                    address: ""
                },
                type: ""
            };
        },
        closeDialog() {
            this.successDialog = false;
        }
    },
    components: { ModalFormRenter }
};
</script>

<style scoped>
  .custom-row {
    background-color: grey;
  }

  .v-data-table-header th {
    background-color: #1976d2;
    color: grey;
  }

  .custom-row:hover {
    background-color: #e0e0e0;
  }

  .renter-form {
    padding: 3%;
  }

  .v-text-field,
  .v-select,
  .v-btn {
    margin-bottom: auto;
  }

  .v-row:last-child .v-col {
    text-align: center;
  }

  .display-1 {
    margin-bottom: 2%;
  }

  .text-right {
    text-align: right;
    margin-left: 65%;
  }

  .v-card{
    margin-right: 3%;
    margin-left: 3%;
  }
  .title{
    text-align: center;
    padding-top: 6%;
  }

</style>