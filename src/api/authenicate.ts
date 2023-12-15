import axios from "axios";
import { ILoginCredentials } from "@/models/IUtilModels";

export const authenticate = (creds: ILoginCredentials) => {
  axios.defaults.headers.common["Content-Type"] = "application/json";
  let baseUrl = process.env.VUE_APP_API_URL;
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
