export interface IUser {
    id?:number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    is_active?: boolean;
    is_blocked: boolean;
    is_staff: boolean;
    last_login?: Date;
    password_change_date?: Date;
    required_password_change?: boolean;
    deletable?: boolean
}

export interface IUserFormValues {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    is_staff: string;
    passwd: string;
}