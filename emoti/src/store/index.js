import Vue from "vue";
import Vuex from "vuex";

import router from '../router/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: localStorage.users
      ? JSON.parse(localStorage.users)
      : [ //Admin
          {
            username: "admin",
            password: "admin",
            email:'administrador@gmail.com',
            typeUser: "Administrador",
            name:'Administrador'
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
      classes: localStorage.classes
        ? JSON.parse(localStorage.classes)
        : [
            {
              name: "teste",
              teacher: "prof",
              requests:[{usernameStudent:'test',nameStudent:"kid test",tutorStudent:"tutorTeste"}],
              students: [],
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

    isUserBlocked: (state) => (username) => state.users.some(
      (user) => user.username === username && user.blocked === true
    ),

    getAssociatedChild:(state) => state.users.find((user) => user.username === state.loggedUser.child),

    getFilteredActivities: (state)=>(formFilter)=> state.activities.filter(activity=>(activity.level==formFilter.level || formFilter.level=='') &&
    (activity.category==formFilter.category || formFilter.category=='')),

    getActivity:(state)=>(id)=>state.activities.find((activitiy)=>activitiy.id==id),

    getTeacherClasses:(state)=>state.classes.filter(team=>team.teacher === state.loggedUser.username),

    isUserChild:(state) => (username, password) =>
      state.users.some(
        (user) => user.username === username && user.password === password && user.typeUser === "Criança"
      ),
    
    isChildFree:(state) => (username) =>
      state.users.some(
        (user) => user.username === username && user.tutor === null
      ),

    isClassOccupied:(state) => (name) => state.classes.some(
      (team) => team.teacher === state.loggedUser.username && team.name === name
    ),

    getUsers: (state)=>state.users,

    getStudent: (state) => (username) => state.users.find((user)=>user.username===username && user.typeUser == "Criança"),
    
    CheckInTeams: (state) => (variable) => state.classes.find((team) => team.teacher === state.loggedUser.username && (team.students.find((student)=> student.usernameStudent === variable) || team.requests.find((request) => request.usernameStudent === variable))),

    getAprovedStudents: (state) => state.classes.filter((team)=>team.teacher === state.loggedUser.username).filter((t)=>t.students)

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
      state.users=state.users.filter((user) => user.username != variable);
      localStorage.users = JSON.stringify(state.users)
    },

    SET_RELATION_TUTOR(state,variable){
      state.loggedUser.child = variable
      sessionStorage.loggedUser = JSON.stringify(state.loggedUser);
      state.users.find((user) => user.username === state.loggedUser.username).child = variable;
      localStorage.users = JSON.stringify(state.users)
    },

    SET_RELATION_CHILD(state,variable){
      state.users.find((user) => user.username === variable).tutor = state.loggedUser.username;
      localStorage.users = JSON.stringify(state.users)
    },

    SET_REMOVE_RELATION_TUTOR(state){
      state.loggedUser.child = null
      sessionStorage.loggedUser = JSON.stringify(state.loggedUser);
      state.users.find((user) => user.username === state.loggedUser.username).child = null;
      localStorage.users = JSON.stringify(state.users)
    },

    SET_REMOVE_RELATION_CHILD(state){
      state.users.find((user) => user.username === state.loggedUser.child).tutor = null;
      localStorage.users = JSON.stringify(state.users)
    },

    SET_NEW_CLASS(state,variable){
      state.classes.push(variable);
      localStorage.classes = JSON.stringify(state.classes);
    },

    SET_REMOVE_CLASS(state,variable){
      let rest = state.classes.filter((team) => team.teacher != state.loggedUser.username)
      let edit = state.classes.filter((team) => team.teacher === state.loggedUser.username && team.name != variable)
      state.classes = rest.concat(edit)
      localStorage.classes = JSON.stringify(state.classes)
    },

    CHANGE_STATE_USER(state,variable){
      state.users.find((user) => user.username === variable.username).blocked = variable.logic;
      localStorage.users = JSON.stringify(state.users)
    },

    REMOVE_TEAMS_TEACHER(state,variable){
      state.classes=state.classes.filter((team)=>team.teacher!=variable)
      localStorage.classes = JSON.stringify(state.classes)
    },

    SET_REMOVE_RELATION_TUTOR_ADMIN(state,variable){
      state.users.find((user) => user.username === variable).tutor = null;
      localStorage.users = JSON.stringify(state.users)
    },

    SET_REMOVE_RELATION_CHILD_ADMIN(state,variable){
      state.users.find((user) => user.username === variable).child = null;
      localStorage.users = JSON.stringify(state.users)
    },

    SET_NEW_STUDENT(state,variable){
      state.classes.find((team)=>team.teacher === state.loggedUser.username && team.name===variable.teamName).requests.push({usernameStudent: variable.username, nameStudent: variable.name, tutorStudent: variable.tutorStudent})
      localStorage.classes = JSON.stringify(state.classes)
      state.users.find((user)=>user.username==variable.tutorStudent).classResquests.push({teacherName: state.loggedUser.username, className:variable.teamName})
      localStorage.users = JSON.stringify(state.users)
    },

    REMOVE_STUDENT_CLASS(state,variable){
      let teamStudents = state.classes.find((team) => team.teacher === state.loggedUser.username && team.students.find((student)=> student.usernameStudent === variable)).students
      state.classes.find((team) => team.teacher === state.loggedUser.username && team.students.find((student)=> student.usernameStudent === variable)).students = teamStudents.filter((student)=> student.usernameStudent != variable)
      localStorage.classes = JSON.stringify(state.classes)
    },

    ALTER_STUDENT_CLASS(state,variable){
      let teamStudents = state.classes.find((team) => team.teacher === state.loggedUser.username && team.students.find((student)=> student.usernameStudent === variable.usernameStudent)).students
      state.classes.find((team) => team.teacher === state.loggedUser.username && team.students.find((student)=> student.usernameStudent === variable.usernameStudent)).students = teamStudents.filter((student)=> student.usernameStudent != variable.usernameStudent)
      state.classes.find((team)=>team.teacher === state.loggedUser.username && team.name===variable.team).students.push({usernameStudent: variable.usernameStudent, nameStudent: variable.nameStudent, tutorStudent: variable.tutorStudent,aproved:true})
      localStorage.classes = JSON.stringify(state.classes)
    }

    
    

  },

  modules: {},
});