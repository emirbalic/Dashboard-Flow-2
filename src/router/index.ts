import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

// needed for skeleton
import MainView from '@/views/MainView.vue'
import Default from '@/components/default/Default.vue'
import OrdersView from '@/views/reporting/screens/OrdersView.vue'
import OrderDetails from '@/views/reporting/details/OrderDetails.vue'
import SuppliersView from '@/views/reporting/screens/SuppliersView.vue'
import ProductsView from '@/views/reporting/screens/ProductsView.vue'
import CustomersView from '@/views/customers/screens/CustomersView.vue';

const routes: Array<RouteRecordRaw> = [
  
  {
    path: '/',
    component: MainView,
    name: 'mainview',
    redirect: '/default',
    children: [
      {
        path: '/default',
        name: 'default',
        component: Default,
        props: {},
        // meta: { product: 'dashboard' },
        // beforeEnter: (to: any, from: any, next: any) => {
        //   const isAdmin = getFromStore('auth.isAdmin');
        //   if (isAdmin) {
        //     next();
        //   } else {
        //   }
        // },
      },
      {
        path: '/orders',
        name: 'orders',
        component: OrdersView,
        props: {},
        // meta: { product: 'dashboard' },
        // beforeEnter: (to: any, from: any, next: any) => {
        //   const isAdmin = getFromStore('auth.isAdmin');
        //   if (isAdmin) {
        //     next();
        //   } else {
        //   }
        // },
      },
      {
        path: '/order-details/:id?',//:option?/  /:type? !!!say that you can add more and you sometimes need to
        name: 'order-details',
        component: OrderDetails,
        // meta: { product: 'admin-data' },
        // beforeEnter: (to: any, from: any, next: any) => {
        //   const isAdmin = getFromStore('auth.isAdmin');
        //   if (isAdmin) {
        //     next();
        //   } else {
        //   }
        // },
      },
      {
        path: '/products',
        name: 'products',
        component: ProductsView,
        props: {},
       
      },
      {
        path: '/suppliers',
        name: 'suppliers',
        component: SuppliersView,
        props: {},
       
      },
      {
        path: '/customers',
        name: 'customers',
        component: CustomersView,
        props: {},
       
      },
    ],
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
