import api from '@/api/api';

import {  AxiosResponse, AxiosError } from 'axios';

const URLS = {
    categories: 'categories/',
    filterCities: 'city-filters/',
    filterCoutries: 'country-filters/',
   
  };

export const loadCities = () => {    
    return new Promise((resolve, reject) => {
      api
        .get(URLS.filterCities, {})
        .then((response: AxiosResponse) => {
            // console.log(response.data);
            
          if (response.status === 200) {
            resolve(response.data);
            // return  response.data
          } else {
            reject();
            // return null;
          }
        })
        .catch((error: AxiosError) => {
          console.log('caught error in loadOrders >> ', error);
        });
    });
  }

export const loadCountries = () => {

    // console.log('loading ... ');
    
    return new Promise((resolve, reject) => {
      api
        .get(URLS.filterCoutries, {})//, {}
        .then((response: AxiosResponse) => {
            // console.log(response.data);
            
          if (response.status === 200) {
            resolve(response.data);
            // return  response.data
          } else {
            reject();
            // return null;
          }
        })
        .catch((error: AxiosError) => {
          console.log('caught error in loadOrders >> ', error);
        });
    });
  }

export const loadCategories = () => {

    // console.log('loading ... ');
    
    return new Promise((resolve, reject) => {
      api
        .get(URLS.categories, {})//, {}
        .then((response: AxiosResponse) => {
            // console.log(response.data);
            
          if (response.status === 200) {
            resolve(response.data);
            // return  response.data
          } else {
            reject();
            // return null;
          }
        })
        .catch((error: AxiosError) => {
          console.log('caught error in loadOrders >> ', error);
        });
    });
  }