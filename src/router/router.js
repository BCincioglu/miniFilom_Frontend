import { createRouter, createWebHistory } from 'vue-router';
import FormRental from '@/components/FormRental.vue';
import FormRenter from '@/components/FormRenter.vue';
import FormVehicle from '@/components/FormVehicle.vue';
import Hello from '@/components/Hello.vue';
import TableRental from '@/components/TableRental.vue';
import TableRenter from '@/components/TableRenter.vue';
import TableVehicle from '@/components/TableVehicle.vue';

const routes = [
  { path: '/rental', component: FormRental },
  { path: '/renter', component: FormRenter },
  { path: '/vehicle', component: FormVehicle },
  { path: '/', component: Hello },
  { path: '/rentals', component: TableRental },
  { path: '/renters', component: TableRenter },
  { path: '/vehicles', component: TableVehicle },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
