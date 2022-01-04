import Vue from "vue";
import Vuex from "vuex";

import router from '../router/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: localStorage.users
      ? JSON.parse(localStorage.users)
      : [
          {
            username: "admin",
            password: "admin",
            typeUser: "Administrador",
          },
        ],
    activities: localStorage.activities
        ? JSON.parse(localStorage.activities)
        : [
            {
              id:0,
              title: "Qual é o meu nome?",
              level: "Fácil",
              question: [],
              caseIMG:'https://github.com/mmalta24/images/blob/main/Imagem%202.png?raw=true',
              description:'',
              category:'Quiz'
            },
            
          ],
      loggedUser: sessionStorage.loggedUser ? JSON.parse(sessionStorage.loggedUser) : null,
      
  },
  
  getters: {
    isUser: (state) => (username, password) =>
      state.users.some(
        (user) => user.username === username && user.password === password
      ),

    isUsernameAvailable: (state) => (username) =>
      state.users.every((user) => user.username !== username),

    getLoggedUser: (state) => state.loggedUser,

    getFilteredActivities: (state)=>(formFilter)=> state.activities.filter(activity=>(activity.level==formFilter.level || formFilter.level=='') &&
    (activity.category==formFilter.category || formFilter.category=='')),

    getActivity:(state)=>(id)=>state.activities.find((activitiy)=>activitiy.id==id)

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
      router.push({ name: 'LandingPage' });
    },

    SET_NEW_PASSWORD(state, variable){
      state.loggedUser.password = variable
      sessionStorage.loggedUser = JSON.stringify(state.loggedUser);
      state.users.find((user) => user.username === state.loggedUser.username).password = variable;
      localStorage.users = JSON.stringify(state.users)
    },

    SET_REMOVE_USER(state, variable){
      localStorage.removeItem(state.users.find((user) => user.username === variable));
      localStorage.users = JSON.stringify(state.users)
    }
    
  },

  modules: {},
});