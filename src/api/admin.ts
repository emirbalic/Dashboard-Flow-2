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
      console.error("add User >> ", error);
    });
};

export const deleteUser = (id: string) => {
    return api.post(
      URLS.users + `delete`,
      {
        user_id: id,
      }
    ) .catch((error) => {
      console.error('delete User >> ', error);
    });;
  };

  export const unblockUser = (username: string) => {    
    return api.post(
      URLS.users + 'admin-reset-login-attempts',
      {
        target_user: username,
      }
    );
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
        console.error("get Users >> ", error);
      });
  });
};
