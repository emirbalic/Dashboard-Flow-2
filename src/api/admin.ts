import { IUser, IUserFormValues } from "@/models/IUser";
import api from "./api";
import { IUpdatePassword } from "@/models/IUtilModels";

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

  export const updateUserPassword = (params: IUpdatePassword) => {
    return api.post(
      URLS.users + 'admin-reset-password',
      {
        new_passwd: params.new_passwd,
        target_user: params.target_user,
      }
    );
  };

  export const updateUserActivityStatus = (params: Partial<IUser>) => {
    return api.post(
      URLS.users + 'update-activity',
      {
        username: params.username,
        activity: params.is_active,
      }
    );
  };

  export const resetOwnPassword = (params: IUpdatePassword) => {
    console.log("params >>>> .... ", params);
    
    return api.post(
      URLS.users + 'user-reset-password',
      {
        new_passwd: params.new_passwd,
        confirm_passwd: params.new_passwd,
        // target_user: params.target_user,
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
