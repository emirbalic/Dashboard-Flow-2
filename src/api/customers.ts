import api from '@/api/api';

import {  AxiosResponse, AxiosError } from 'axios';

const URLS = {
    customers: 'customers/',
  };

export const loadCustomers = () => {

    
    return new Promise((resolve, reject) => {
      api
        .get(URLS.customers, {})//, {}
        .then((response: AxiosResponse) => {
            
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