import axios , { Axios, AxiosResponse } from 'axios';//AxiosError, 

axios.defaults.headers.common['Content-Type'] = 'application/json';

const axiosInstance = axios.create();

const baseUrl = 'http://localhost:8000'

const api = (axios: Axios) => {
  
    // const controller = new AbortController();
    // subscribe('auth', (auth: IAuth) => {
  
    //   if (auth) {
        //   axios.defaults.headers.common['Authorization'] =
        //   'Bearer ' + auth.access_token;
        //   // this is temporarily going to be changed to /rule_management/ until clear what to do with previus actionlist
        //   // axios.defaults.baseURL = baseUrl + '/rule_management/';
          axios.defaults.baseURL = baseUrl + '/api/';
    //   }
    // });
  
    axios.interceptors.response.use(
      function (response: AxiosResponse)  {
        return response;
      },

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
  
    return {
      get: <T>(url: string , config: any) =>
        axios.get<T>(url, {...config}),
      post: <T>(url: string, body: object) =>//, config: any
        axios.post<T>(url, body),//, { signal: controller.signal, ...config }
      put: <T>(url: string, body: object) =>//, config: any
        axios.put<T>(url, body),//, { signal: controller.signal, ...config }
      patch: (url: string, body: object) =>//, config: any
        axios.patch(url, body),//, { signal: controller.signal, ...config }
      delete: <T>(url: string) =>//, config: any
        axios.delete<T>(url),//, { signal: controller.signal, ...config }
      // cancel:() => cancelRequests(),
    };
  };

  export default api(axiosInstance);


  // get: <T>(url: string ) =>//, config: any
  // axios.get<T>(url),//, { signal: controller.signal, ...config }


 