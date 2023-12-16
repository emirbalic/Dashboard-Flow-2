import { reactive, watch } from "vue";
import { ILocalStorage } from "@/models/ILocalStorage";
import { ILoginData } from "@/models/ILoginData";

const store = reactive<ILocalStorage>({
    logged: null,
});


export const save = (key: string, update: ILoginData) =>
  new Promise((resolve:Function): void => {
    // console.log(' store before', store);
    localStorage.setItem(key, JSON.stringify({ [key]: update }));
    // console.log(' store after', store);
    //@ts-ignore
    // store[key] = { ...store[key], ...update };
    set(key, update);
    resolve();
  });



  export const remove = (key: string) =>
  new Promise((resolve: Function): void => {
    localStorage.removeItem(key);
    // console.log(' remove before', store);
    // // @ts-ignore
    // store[key] = null;
    unset(key);
    // console.log(' remove after', store);
    resolve();
  });

  export const set = (key: string, update: any) => {
    // console.log(' in set', key);
    // @ts-ignore
    store[key] = { ...store[key], ...update };
  };


  export const unset = (key: string) => {
    // console.log(' in unset', key);
    // @ts-ignore
    store[key] = null;
  };

