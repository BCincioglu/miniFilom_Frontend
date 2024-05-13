<template>
	<v-dialog v-model="props.successDialog" max-width="300">
	      <v-card>
	        <v-card-title class="headline">İşlem Başarılı!</v-card-title>
	        <v-card-text>
	          Veri başarıyla gönderildi.
	        </v-card-text>
	        <v-card-actions>
	          <v-btn color="primary" @click="props.closeDialog">Tamam</v-btn>
	        </v-card-actions>
	      </v-card>
	    </v-dialog>
</template>

<script setup>

const props=defineProps(['successDialog', 'closeDialog'])

</script>
