import { createStore } from 'vuex'
import { GlobalState } from "@/store/types";

import state from "@/store/state";

import orderManagement from './modules/orderManagement';
// import pagination from './modules/pagination';
import customerManagement from './modules/customerManagement';
import productManagement from './modules/productManagement';


const store = createStore<GlobalState>({
  state,
  // getters: {
  // },
  // mutations: {
  // },
  // actions: {
  // },

  modules: {
    orderManagement: orderManagement,
    customerManagement: customerManagement,
    productManagement: productManagement,
    // pagination: pagination
  }
  
  
})

export default store;

// customers: customerManagement,
// customerManagement: customers,