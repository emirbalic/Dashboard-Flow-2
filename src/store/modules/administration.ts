import {
    addUser,
 
  } from '@/api/admin';
  import { IUser, IUserFormValues } from '@/models/IUser';
  import { GlobalState } from '@/store/types';
  
  export default {
    namespaced: true,
    state: {
      users: [],
    },
    mutations: {
     
      ADD_USER(state: GlobalState, user: IUser) {
        user.is_blocked = false;
        user.is_active = true;
        state.users.push(user);
      },
    },
  
    actions: {
    
  
      addUser({ dispatch, commit }: any, user: IUserFormValues) {
        return addUser(user)
          .then(() => {
            commit('ADD_USER', user);
            // dispatch('setUsers', 'users');
            return true;
          })
          .catch(() => {
            return false;
          });
      },
  
    },
  
   
  };
  