import { Commit } from "vuex";

import { loadProducts } from "@/api/reporting";

import { GlobalState } from "@/store/types";

export default {
  namespaced: true,

  mutations: {
    SET_PRODUCTS(state: GlobalState, context: any) {
      state.products = context;
    },
  },
    actions: {
      async setProducts({ commit }: { commit: Commit }) {
        let data: any = await loadProducts();

        commit("SET_PRODUCTS", data.results);
        return data.results;
      },
    },

    getters: {
      getProducts(state: GlobalState) {
        return state.products;
      },
    },
};
