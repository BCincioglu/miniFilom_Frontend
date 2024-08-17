<!-- <script setup>
import { GoogleMap, Marker } from 'vue3-google-map'

const center = { lat: 39.925533, lng: 34.836944 }
const markerOptions = { position: center, label: 'L', title: 'LADY LIBERTY' }

</script> -->

<template>
  <GoogleMap
    api-key="AIzaSyAmktjR2Gpb8j8yV7mi6d2MOTI9wL1omko"
    style="width: 100%; height: 100%;"
    :center="center"
    :zoom="6.15"
  >
  <MarkerCluster>
      <Marker
        v-for="(location, i) in locations"
        :key="i"
        :options="{ position: location }"
      />
    </MarkerCluster>
  </GoogleMap>
</template>


<script>
import { GoogleMap, Marker, MarkerCluster } from 'vue3-google-map';
import { io } from "socket.io-client";

export default {
  components: {
    GoogleMap,
    Marker,
    MarkerCluster,
  },
  data() {
    return {
      token: '',
      locations: [],
      center: { lat: 39.925533, lng: 34.836944 },
      socket: null,
      room: null,
    };
  },
  mounted() {
    this.token = localStorage.getItem('token');
    const SOCKET_URL = `http://localhost:3339?token=${this.token}`;
    this.socket = io(SOCKET_URL);

    this.socket.on("roomInfo", (room) => {
      this.room = room;
      console.log("Oda bilgisi alındı:", room);
      // Konum güncellemelerini dinle
      this.socket.on('locationUpdate', (data) => {
        if (data && data.length > 0) {
          this.locations = data.map(location => ({
            lat: location.lat,
            lng: location.lng
          }));
          console.log('Gelen konum bilgisi->', this.locations);
        }
      });
    });
  },
  beforeUnmount() {
    if (this.socket) {
      this.socket.off('locationUpdate');
    }
  },
};
</script>

