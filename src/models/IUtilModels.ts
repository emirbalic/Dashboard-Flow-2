export interface IPaginationDetailedInfo {
    leftDistance?: number;
    righDistance?: number;
  }

  export interface ILoginCredentials {
    username: string;
    password: string;
  }

  export interface IUpdatePassword {
    new_passwd: string;
    target_user: string;
  }