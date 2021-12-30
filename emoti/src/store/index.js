import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: localStorage.users
      ? JSON.parse(localStorage.users)
      : [
          {
            username: "admin",
            password: "admin",
            typeUser: "Admin",
          },
        ],
    loggedUser: null,
  },
  
  getters: {
    isUser: (state) => (username, password) =>
      state.users.some(
        (user) => user.username === username && user.password === password
      ),

    isUsernameAvailable: (state) => (username) =>
      state.users.every((user) => user.username !== username),

    getLoggedUser: (state) => state.loggedUser,

  },

  mutations: {
    SET_LOGGED_USER(state, variable) {
      state.loggedUser = state.users.find((user) => user.username === variable);
      sessionStorage.loggedUser = JSON.stringify(state.loggedUser);
    },

    SET_NEW_USER(state, variable) {
      state.users.push(variable);
      localStorage.users = JSON.stringify(state.users);
    },

    SET_LOGOUT(state) {
      state.loggedUser = null;
      sessionStorage.removeItem("loggedUser");
    },

  },

  modules: {},
});