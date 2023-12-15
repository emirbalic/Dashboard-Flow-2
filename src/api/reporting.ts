import api from "@/api/api";
import { IOrder } from "@/models/IOrder";

import { AxiosResponse, AxiosError } from "axios";

const URLS = {
  orders: "orders/",
  products: "products/",
  suppliers: "suppliers/",
};


export const loadOrders = (
  shipped_country: string,
  shipped_city: string,
  search: string,
  page: string,
  page_size: string,
  // add in sorting lesson
  order_by: string
) => {
  // console.log('order_by reporting: ', order_by);
  // console.log('page_size reporting: ', page_size);
  return new Promise((resolve, reject) => {
    api
      .get(URLS.orders, {
        params: {
          shipped_country,
          shipped_city,
          search,
          page,
          page_size,
          // add in sorting lesson
          order_by
          
        },
      })
      .then((response: AxiosResponse) => {
        // console.log(response.data);

        if (response.status === 200) {
          // console.log('ecco ',response.data.number_of_pages);
          resolve(response.data);
          // return  response.data
        } else {
          reject();
          //   return null;
        }
      })
      .catch((error: AxiosError) => {
        console.log("caught error in loadOrders >> ", error);
      });
  });
};
export const getOrderDetails = (orderId: string) => {
  // console.log('orderId ... ', orderId);

  return new Promise((resolve, reject) => {
    api
      .get(URLS.orders + orderId + "/", {}) //, {}
      .then((response: AxiosResponse) => {
        // console.log("response.data >>>", response.data);

        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject();
        }
      })
      .catch((error: AxiosError) => {
        console.log("caught error in orderDetails >> ", error);
      });
  });
};

export const addNewOrder = (newOrderRecord: Partial<IOrder>) => {

  let yesterday = new Date;
  yesterday.setDate(yesterday.getDate() - 10)
  return new Promise((resolve, reject) => {
    api
      .post(
        URLS.orders,
        {
          customer: newOrderRecord.customerId,
          product: newOrderRecord.productId,
          order_date: new Date(),
          required_date: newOrderRecord.requiredDate,
          shipped_name: newOrderRecord.shippedName,
          shipped_address: newOrderRecord.shippedAddress,
          shipped_city: newOrderRecord.shippedCity,
          shipped_postal_code: newOrderRecord.shippedPostalCode,
          shipped_country: newOrderRecord.shippedCountry, 
        }
        // {}
      )
      .then((response: AxiosResponse) => {
        if (response.status === 201) {
          resolve(response.data);
        } else {
          reject();
        }
      })
      .catch((error) => {
        console.log("caught error in addSingleRecordToService >> ", error);
        return reject(error);
      });
  });
};

export const deleteRecordFromOrders = (id: string) => {
  return new Promise((resolve, reject) => {
    api
      .delete(URLS.orders + id + "/")
      .then((response: AxiosResponse) => {
        if (response.status === 204) {
          resolve(response.data);
        } else {
          reject();
        }
      })
      .catch((error) => {
        console.log("caught error in deleteRecordFromServices >> ", error);
        reject(error);
      });
  });
};

export const editRecordInOrders = (id: string, editedOrder: IOrder) => {
  return new Promise((resolve, reject) => {
    api
      .patch(URLS.orders + id + "/", {
        shipped_name: editedOrder.shippedName,
        shipped_address: editedOrder.shippedAddress,
        shipped_city: editedOrder.shippedCity,
        shipped_postal_code: editedOrder.shippedPostalCode,
        shipped_country: editedOrder.shippedCountry,
      }) //, {}
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject();
        }
      })
      .catch((error) => {
        console.log("caught error in editRecordInOrders >> ", error);
      });
  });
};

// == ADD THIS WHEN YOU FINISH WITH STYLE AND ORDERS TABLE ==
export const loadProducts = () => {
  // console.log('loading ... ');

  return new Promise((resolve, reject) => {
    api
      .get(URLS.products, {}) //, {}
      .then((response: AxiosResponse) => {
        // console.log(response.data);

        if (response.status === 200) {
          resolve(response.data);
          // return  response.data
        } else {
          // reject();
          return null;
        }
      })
      .catch((error: AxiosError) => {
        console.log("caught error in loadProducts >> ", error);
      });
  });
};
export const loadSuppliers = () => {
  // console.log('loading ... ');

  return new Promise((resolve, reject) => {
    api
      .get(URLS.suppliers, {}) //, {}
      .then((response: AxiosResponse) => {
        // console.log(response.data);

        if (response.status === 200) {
          resolve(response.data);
          // return  response.data
        } else {
          // reject();
          return null;
        }
      })
      .catch((error: AxiosError) => {
        console.log("caught error in loadProducts >> ", error);
      });
  });
};
