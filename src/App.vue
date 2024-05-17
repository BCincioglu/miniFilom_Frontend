<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" permanent :width="200">
      <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">
              <router-link to="/">Mini Filom</router-link>
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-divider class="custom-divider"></v-divider>

      <v-list dense>
        <router-link v-for="item in items" :key="item.title" :to="item.path">
          <v-list-tile>
            <v-list-tile-action>
              <v-icon size="18" class="liste">{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              <v-divider class="custom-divider"></v-divider>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>
      </v-list>

      <v-btn @click="logout" block color="grey" dark>
        <v-icon left>mdi-logout</v-icon>
        Logout
      </v-btn>
    </v-navigation-drawer>

    <v-main>
      <router-view @basarili="drawer=true"/>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios';
import FormLogin, { routePass }  from '@/components/FormLogin.vue';


export default {
  data () {
    return {
      drawer: false,
      items: [
        { title: 'Araç Formu', icon: 'mdi-car', path: '/vehicle' },
        { title: 'Araç Tablosu', icon: 'mdi-car-multiple', path: '/vehicles' },
        { title: 'Kiracı Formu', icon: 'mdi-account', path: '/renter' },
        { title: 'Kiracı Tablosu', icon: 'mdi-account-multiple', path: '/renters' },
        { title: 'Kiralama Formu', icon: 'mdi-file', path: '/rental' },
        { title: 'Kiralama Tablosu', icon: 'mdi-file-multiple', path: '/rentals' },
      ],
      right: null,
    }
  },
  methods: {
    logout() {
      delete axios.defaults.headers.common['Authorization'];
      this.drawer= false;
      this.$router.push('/');
      routePass = false;
    }
  },
  components: {
    FormLogin
  }
}
</script>

<style scoped>
.title {
  font-size: 20px;
  margin: 50px;
}

.custom-divider {
  border-color: grey;
}
.liste {
  margin: 10%;
}
.v-list-tile-title {
  color: white;
}
</style>
