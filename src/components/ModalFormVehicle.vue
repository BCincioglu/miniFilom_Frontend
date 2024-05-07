<template>
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
</template>

<script setup lang="ts">
defineProps<{ 
	submitForm: () => Promise<void>;
	formData: { plateNumber: string; brand: string; model: string; productionYear: string; color: string; type: string; status: string; price: string; };
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

  .vehicle-form {
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

  .display-1 {
    margin-bottom: 2%;
  }

  .text-right {
    text-align: right;
    margin-left: 65%;
  }
  .title{
    text-align: center;
    padding-top: 6%;
  }
</style>
