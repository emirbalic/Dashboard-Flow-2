import axios from "axios";
import { ILoginCredentials } from "@/models/IUtilModels";

axios.defaults.headers.common["Content-Type"] = "application/json";
let baseUrl = process.env.VUE_APP_API_URL;

export const authenticate = (creds: ILoginCredentials) => {
  return axios
    .post(
      baseUrl + "/api/token/",
      {
        username: creds.username,
        password: creds.password,
      },
      {}
    )
    .then((response) => {
      return response.status === 200
        ? Promise.resolve(response)
        : Promise.reject();
    })
    .catch((error) => {
      if (error.message === "Network Error") return error.message;
      return error.response;
    });
};

export const updateToken = async (refresh: string) => {
  return axios
    .post(
      baseUrl + "/api/token/refresh/",
      {
        refresh
      },
      {}
    )
    .then((response) => {
      return response.status === 200
        ? Promise.resolve(response)
        : Promise.reject();
    })
    .catch((error) => {
      if (error.message === "Network Error") return error.message;
      return error.response;
    });
};
