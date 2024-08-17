<template>
	<v-dialog v-model="editModal" max-width="500" max-height="750">
	      <v-card>
	        <v-card-title class="title">
	          Kiracı Düzenle
	        </v-card-title>
	        <v-card-text>
	          <v-form ref="form" @submit.prevent="submitForm" class="renter-form">
	              <v-col cols="16" sm="12">      
	                <v-text-field v-model="editFormData.name" label="Adı" required></v-text-field>
	              </v-col>
	              <v-col cols="16" sm="12">
	                <v-text-field v-model="editFormData.contact.phone" label="Telefon" required></v-text-field>
	              </v-col>
	              <v-col cols="16" sm="12">
	                <v-text-field v-model="editFormData.contact.email" label="E-posta" required></v-text-field>
	              </v-col>
	              <v-col cols="16" sm="12">
	                <v-text-field v-model="editFormData.contact.address" label="Adres" required></v-text-field>
	              </v-col>
	              <v-col cols="16" sm="12">
	                <v-select v-model="editFormData.type" :items="types" label="Tür" required></v-select>
	              </v-col>
	              <v-card-actions class="text-right">
	              <v-btn type="submit" color="primary">Kaydet</v-btn>
	              <v-btn @click="editModal = false" color="error">İptal</v-btn>
	             </v-card-actions>
	          </v-form>
	        </v-card-text>
	      </v-card>
	    </v-dialog>
</template>

<script setup lang="ts">
defineProps<{ 
	submitForm: () => Promise<void>;
	editFormData: { name: string; contact: { phone: string; email: string; address: string; }; type: string; vehiclesRented: string; };
	types: string[];
}>()
const editModal = defineModel<boolean>('editModal', { required: true })
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