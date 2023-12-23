import {
    addUser,
    getUsers
 
  } from '@/api/admin';
  import { IUser, IUserFormValues } from '@/models/IUser';
  import { GlobalState } from '@/store/types';
  
  import { Commit } from 'vuex';


  export default {
    namespaced: true,
    state: {
      users: [],
    },
    mutations: {
      SET_USERS(state: GlobalState, context: IUser[]) {
        state.users = context;
      },

      ADD_USER(state: GlobalState, user: IUser) {
        user.is_blocked = false;
        user.is_active = true;
        state.users.push(user);
      },
    },
  
    actions: {

      setUsers({ commit }: { commit: Commit }) {
        
        
        getUsers()
          .then((data) => {
            
            
            commit('SET_USERS', data);
          })
          .catch(() => {
            return false;
          });
      },


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

    getters: {
      getUsers(state: GlobalState) {
       
        return state.users;
      },
    },
  
   
  };
  