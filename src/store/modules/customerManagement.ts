import { Commit } from "vuex";

import { loadCustomers } from "@/api/customers";

import { GlobalState } from "@/store/types";

export default {
  namespaced: true,

  mutations: {
    SET_CUSTOMERS(state: GlobalState, context: any) {
      state.customers = context;
    },
  },

    actions: {
      async setCustomers({ commit }: { commit: Commit }) {
        let data: any = await loadCustomers();

        commit("SET_CUSTOMERS", data.results);
        return data.results;
      },
    },

    getters: {
      getCustomers(state: GlobalState) {
        return state.customers;
      },
    },
  };

