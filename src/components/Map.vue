<template>
  <GoogleMap
    api-key="AIzaSyAmktjR2Gpb8j8yV7mi6d2MOTI9wL1omko"
    style="width: 100%; height: 100%"
    :center="center"
    :zoom="5.85"
    :options="mapOptions"
  >
    <Marker :options="{ position: center }" />
  </GoogleMap>
</template>

<script setup>
import { GoogleMap, Marker } from 'vue3-google-map'

const center = { lat: 39.9334, lng: 32.8597 }

const bounds = {
  north: 42,
  south: 36,
  west: 26,
  east: 45
}

const mapOptions = {
  restriction: {
    latLngBounds: bounds,
    strictBounds: true
  }
}
</script>
