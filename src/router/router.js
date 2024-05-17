import { createRouter, createWebHistory } from 'vue-router';
import FormRental from '@/components/FormRental.vue';
import FormRenter from '@/components/FormRenter.vue';
import FormVehicle from '@/components/FormVehicle.vue';
import Hello from '@/components/Hello.vue';
import TableRental from '@/components/TableRental.vue';
import TableRenter from '@/components/TableRenter.vue';
import TableVehicle from '@/components/TableVehicle.vue';
import FormLogin from '@/components/FormLogin.vue';

const routes = [
  { path: '/', component: Hello },
  { path: '/rental', component: FormRental },
  { path: '/renter', component: FormRenter },
  { path: '/vehicle', component: FormVehicle },
  { path: '/rentals', component: TableRental },
  { path: '/renters', component: TableRenter },
  { path: '/vehicles', component: TableVehicle },
  { path: '/login', component: FormLogin },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


// router.beforeEach((to, from, next) => {
//   if (!routePass && to.path !== '/' && to.path !== '/login') {
//     next('/login'); 
//   } else {
//     next();
//   }
// });

export default router;
