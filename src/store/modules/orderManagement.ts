import { Commit } from "vuex";

import { loadOrders } from "@/api/reporting";
import { IPaginationDetailedInfo } from "@/models/IUtilModels";

import { GlobalState } from "@/store/types";
import { IOrder } from "@/models/IOrder";

export default {
  namespaced: true,

  mutations: {
    SET_ORDERS(state: GlobalState, context: any) {
      // console.log('debugging mutations______________... ', context);
      state.orders = context;
      // console.log('debugging state.orders... ', state.orders);

      state.pages = context.number_of_pages;
      state.pageNumber = context.page;
      state.count = context.count;
      // add in sorting lesson
      state.orderBy = context.order_by
    },
    SET_ORDER_DETAILS(state: GlobalState, context: IOrder) {
      // console.log("context is >> ", context);
      state.orderDetails = context;
    },

    SET_PAGE_NUMBER(state: GlobalState, contex: any) {
      // console.log('SET_PAGE_NUMBER', contex);
      state.pageNumber = contex;
    },

    SET_NUMBER_OF_PAGES(state: GlobalState, contex: any) {
      // console.log('SET_NUMBER_OF_PAGES', contex);
      state.numberOfPages = contex;
      // console.log('SET_NUMBER_OF_PAGES', state.numberOfPages);
    },

    SET_COUNT(state: GlobalState, contex: any) {
      // console.log('SET_COUNT', contex);

      state.count = contex;
    },

    // SET_PER_PAGE(state: GlobalState, contex: any) {
    //   // console.log('SET_COUNT', contex);

    //   state.perPage = contex;
    // },
    SET_SORTING(state: GlobalState, contex: any) {
      state.orderBy = contex;
    },
    SET_PAGINATION_DISTANCE(
      state: GlobalState,
      paginationDetailedInfo: IPaginationDetailedInfo
    ) {
      // console.log('SET_PAGINATION_DISTANCE', paginationDetailedInfo);

      state.paginationDetailedInfo = paginationDetailedInfo;
    },
    // SET_INITIAL_RIGHT_DISTANCE(
    //   state: GlobalState,
    //   contex: any
    // ) {
    //   console.log('SET_INITIAL_RIGHT_DISTANCE', contex);

    //   // state.paginationDetailedInfo = paginationDetailedInfo;
    // },
  },

  //   SET_SERVICE_KEYS(state: GlobalState, context: any) {
  //     state.serviceKeys = context.results;
  //   },

  //   SET_RELOADED_ACTION_LIST_DETAILS(state: GlobalState, context: any) {
  //     state.actionListDetails = context;
  //   },
  // },

  actions: {
    async setOrders({ commit }: { commit: Commit }, payload: any) {

      // console.log("payload in actions ____________________", payload);
      
      let data: any = await loadOrders(
        payload.filteredCountry,
        payload.filteredCity,
        payload.search,
        payload.page,
        payload.per_page,

        // add in sorting lesson
        payload.order_by
      );

      // let pageNumber = data.page
      // let number_of_pages = data.number_of_pages
      // let count = data.count
      // console.log('orders set now pagenumber', pageNumber);
      // console.log('orders set now number_of_pages', data.number_of_pages);
      // console.log('orders set now count', count);
      let paginationDetailedInfo: IPaginationDetailedInfo = {
        leftDistance: 0,
        righDistance: data.number_of_pages - 1
      }
      // console.log('paginationDetailedInfo', paginationDetailedInfo);
      // console.log('setting Orders >>>>>');
      
      commit("SET_ORDERS", data.results);
      commit("SET_PAGE_NUMBER", data.page);
      commit("SET_COUNT", data.count);
      commit("SET_NUMBER_OF_PAGES", data.number_of_pages);
      commit("SET_PAGINATION_DISTANCE", paginationDetailedInfo);

      
      // commit("SET_SORTING", 'id');
      //
      // console.log(' Orders set >>>>>');
      // console.log(' data.number_of_pages >>>>>', data.number_of_pages);
      return data.results;
    },

    async setOrderDetails({ commit }: { commit: Commit }, payload: IOrder) {
      commit("SET_ORDER_DETAILS", payload);
    },
    // async setPageNumber({ commit }: { commit: Commit }, payload: number) {
    //   commit('SET_PAGE_NUMBER', payload);
    // },

    // async setPerPage ({commit}: {commit: Commit}, payload: boolean) {
    //   commit("SET_PER_PAGE", true);
    // },

    async setSorting ({commit}: {commit: Commit}, payload: string) {
      commit("SET_SORTING", payload);
    },

    async setNumberOfPages ({commit}: {commit: Commit}, payload: boolean) {
      commit("SET_NUMBER_OF_PAGES", payload);
    },

    async setPaginationDistance(
      { commit }: { commit: Commit },
      payload: IPaginationDetailedInfo
    ) {
      // console.log('distance in store: ', payload);
      
      commit("SET_PAGINATION_DISTANCE", payload);
    },
  },

  getters: {
    getOrders(state: GlobalState) {
      // console.log(" getOrders debugging getters... ", state.orders);
      return state.orders;
    },

    // getCustomers(state: GlobalState) {
    //   return state.customers;
    // },
    // getProducts(state: GlobalState) {
    //   return state.products;
    // },

    getNumberOfPages(state: GlobalState) {
      // console.log("getNumberOfPages in pagination *********************", state.numberOfPages);
      return state.numberOfPages;
    },

    getPageNumber(state: GlobalState) {
      return state.pageNumber;
    },

    getCount(state: GlobalState) {
      // console.log('getCount in VUEX>> ', state.count);

      return state.count;
    },

    getPaginationDistance(state: GlobalState) {
      // console.log(
      //   "getPaginationDistance in VUEX>> ",
      //   state.paginationDetailedInfo
      // );
      return state.paginationDetailedInfo;
    },

    getOrderDetails(state: GlobalState) {
      // console.log(" getOrderDetails debugging getters... ", state.orderDetails);
      return state.orderDetails;
    },

    
    // getPerPage(state: GlobalState) {
    //   // console.log(" getPerPage ... ", state.perPage);
    //   return state.perPage;
    // },
    
    getSorting(state: GlobalState) {
      return state.orderBy;
    },
  },
};

