import axios, { Axios, AxiosResponse } from "axios"; //AxiosError,

import { authorize } from "@/localStorage";
import { ILoginData } from "@/models/ILoginData";

axios.defaults.headers.common["Content-Type"] = "application/json";

const axiosInstance = axios.create();

const baseUrl = process.env.VUE_APP_API_URL;

const api = (axios: Axios) => {
  // === add in UX part
  const controller = new AbortController();

  authorize("logged", (loginData: ILoginData) => {
    if (loginData) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + loginData.access_token;
      axios.defaults.baseURL = baseUrl + "/api/";
    }
  });

  axios.interceptors.response.use(
    function (response: AxiosResponse) {
      return response;
    }

    //   function (error: AxiosError) {

    //     if (error.message === 'Network Error' && !error.response) {
    //       showNotice({
    //         props: {
    //           type: 'error',
    //           duration: 5000,
    //           message: 'Network error - API not responsive',
    //         },
    //       });
    //     } else

    //     if (error.response!.status === 401) {

    //       handleUnauthorizedServerResponse();

    //     } else if (error.response!.status === 400) {

    //       reject()

    //     } else if (error.response!.status === 406) {
    //       /**
    //        * Not bloody likely to happen but to be kept here temporarily
    //        * (In case malicious user sends corrupt/incomplete file for bulk
    //        * upload server returns 406 - Not Acceptable)
    //        */
    //       window.location.reload();
    //     }
    //     return Promise.reject(error);
    //   }
  );

  // const cancelRequests = () => {
  //     console.log("Canceling API requests");
  //     controller.abort();
  // }

  const sleep = (milliseconds: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>((resolve) =>
    setTimeout(() => resolve(response), milliseconds)
  );

  return {
    get: <T>(url: string, config: any) => axios.get<T>(url, { ...config }).then(sleep(500)),
    post: <T>(
      url: string,
      body: object //, config: any
    ) => axios.post<T>(url, body).then(sleep(1000)), //, { signal: controller.signal, ...config }
    put: <T>(
      url: string,
      body: object //, config: any
    ) => axios.put<T>(url, body)
    .then(sleep(1000))
    , //, { signal: controller.signal, ...config }
    patch: (
      url: string,
      body: object //, config: any
    ) => axios.patch(url, body).then(sleep(1000)), //, { signal: controller.signal, ...config }
    delete: <T>(
      url: string //, config: any
    ) => axios.delete<T>(url).then(sleep(1000)), //, { signal: controller.signal, ...config }
    // cancel:() => cancelRequests(),
  };
};

export default api(axiosInstance);

// get: <T>(url: string ) =>//, config: any
// axios.get<T>(url),//, { signal: controller.signal, ...config }
