import { IUserFormValues } from "@/models/IUser";
import api from "./api";

const URLS = {
  users: "users/",
};

export const addUser = (body: IUserFormValues) => {
  return api
    .post(URLS.users + `new`, {
      username: body.username,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      is_staff: body.is_staff,
      passwd: body.passwd,
    })
    .catch((error) => {
      console.log("add User >> ", error);
    });
};

export const getUsers = () => {
    
  return new Promise((resolve, reject) => {
    api
      .get(URLS.users, {})
      .then((response: any) => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject();
        }
      })
      .catch((error) => {
        console.log("get Users >> ", error);
      });
  });
};
