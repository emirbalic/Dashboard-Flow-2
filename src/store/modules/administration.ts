import {
  addUser,
  deleteUser,
  getUsers,
  unblockUser,
  updateUserActivityStatus,
  updateUserPassword,
} from "@/api/admin";
import { IUser, IUserFormValues } from "@/models/IUser";
import { IUpdatePassword } from "@/models/IUtilModels";
import { GlobalState } from "@/store/types";

import { Commit } from "vuex";

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
    DELETE_USER(state: GlobalState, id: string) {
      state.users = state.users.filter((user) => {
        return user.id != Number(id);
      });
    },
    UNBLOCK_USER(state: GlobalState, selectedUsername: string) {
      state.users[
        state.users.findIndex((user) => user.username === selectedUsername)
      ].is_blocked = false;
    },
    UPDATE_ACTIVITY_STATUS(state: GlobalState, payload: any) {
      let index = state.users.findIndex((user) => user.username === payload.username);
      state.users[index].is_active = Boolean(payload.is_active);
    },
  },

  actions: {
    setUsers({ commit }: { commit: Commit }) {
      getUsers()
        .then((data) => {
          commit("SET_USERS", data);
        })
        .catch(() => {
          return false;
        });
    },

    addUser({ dispatch, commit }: any, user: IUserFormValues) {
      return addUser(user)
        .then(() => {
          commit("ADD_USER", user);
          dispatch("setUsers", "users");
          return true;
        })
        .catch(() => {
          return false;
        });
    },

    deleteUser({ dispatch, commit }: any, payload: Partial<IUser>) {
      return deleteUser(String(payload.id))
        .then(() => {
          commit("DELETE_USER", payload.id);
          dispatch("setUsers", "users");
          return true;
        })
        .catch(() => {
          return false;
        });
    },
    unblockUser({ commit }: { commit: Commit }, payload: any) {
      return unblockUser(payload)
        .then(() => {
          commit("UNBLOCK_USER", payload.selectedUser);
          return true;
        })
        .catch(() => {
          return false;
        });
    },
    updateUserPassword(_: any, payload: IUpdatePassword) {
      return updateUserPassword(payload)
        .then(() => {
          return true;
        })
        .catch(() => {
          return false;
        });
    },

    updateUserActivityStatus(
      { commit }: { commit: Commit },
      payload: Partial<IUser>
    ) {
      return updateUserActivityStatus(payload)
        .then(() => {
          commit("UPDATE_ACTIVITY_STATUS", payload);
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
