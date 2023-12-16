import { reactive, watch } from "vue";
import { ILocalStorage } from "@/models/ILocalStorage";
import { ILoginData } from "@/models/ILoginData";
import dlv from 'dlv';

const store = reactive<ILocalStorage>({
    logged: null,
});

export const authorize = (key: string, callback: Function) => {
    console.log(' authorize ');
    watch(
      // @ts-ignore
      () => store[key],
      (keyValue) => {
        callback(keyValue);
      }
    );
  };

export const save = (key: string, update: ILoginData) =>
  new Promise((resolve:Function): void => {
    
    localStorage.setItem(key, JSON.stringify({ [key]: update }));
    // console.log(' store after', store);
    //@ts-ignore
    // store[key] = { ...store[key], ...update };
    set(key, update);
    resolve();
  });

  export const get = (path: string) => dlv(store, path);


// export const get = (path: string) => {
//     console.log('in get ------------------ >', dlv(store, path));
//     console.log('in get store------------------ >', store);
//     dlv(store, path);
//   }

// @ts-ignore
export const load = (key: string) =>
  new Promise((resolve) => {
    try {
      const value = JSON.parse(localStorage.getItem(key)!)[key];
      set(key, value);
    //   console.log('key', key);
    //   console.log('value', value);
      
      resolve(get(key));
    } catch (e) {
      resolve(get(key));
    }
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

