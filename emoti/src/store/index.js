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
              title: "Qual é o meu nome?",
              level: "Fácil",
              questions: [{
                img:'1234',
                correctAnswer:'',
                answers:[],
                points:0
              }],
              caseIMG:'https://github.com/mmalta24/images/blob/main/Imagem%202.png?raw=true',
              description:'',
              category:'Quiz',
              author:"admin",
            },         
          ],
      classes: localStorage.classes
        ? JSON.parse(localStorage.classes)
        : [
            {
              name: "teste",
              teacher: "prof",
              requests:[],
              students: [],
            },
              
          ],

      badges: localStorage.badges
        ? JSON.parse(localStorage.badges)
        : [
            {
              badgeName: "teste",
              badgeIMG: "img teste",
              pointsNedded:20,
              badgeEmotion: "Feliz",
            },          
          ],
     
      loggedUser: sessionStorage.loggedUser ? JSON.parse(sessionStorage.loggedUser) : null,
      emotions: localStorage.emotions ? JSON.parse(localStorage.emotions) : ['Feliz','Triste','Envergonhado','Preocupado'],
      
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

    getActivity:(state)=>(title)=>state.activities.find((activitiy)=>activitiy.title==title),

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

    getTeamStudents: (state) => (teamName) => state.classes.find((team)=>team.name == teamName && team.teacher== state.loggedUser.username).students ,
    
    CheckInTeams: (state) => (variable) => state.classes.find((team) => team.teacher === state.loggedUser.username && (team.students.find((student)=> student.usernameStudent === variable) || team.requests.find((request) => request.usernameStudent === variable))),

    getAprovedStudents: (state) => state.classes.filter((team)=>team.teacher === state.loggedUser.username).filter((t)=>t.students),

    getStudentData: (state) => (variable) => state.users.find((user)=>user.username==variable).points,

    getChildTeams: (state) => state.classes.filter((team)=>team.students.find((student)=>student.usernameStudent==state.loggedUser.child)),

    getEmotions: (state) => state.emotions,

    checkInEmotions: (state) => (variable) => state.emotions.some((emotion)=>emotion.toLowerCase()==variable.toLowerCase()),

    getActivities: (state) => state.activities,

    getActivitiesAdmin: (state) => state.activities.filter((activity)=>activity.category=="Quiz"||activity.category=="Reconhecimento"),

    getActivitiesPers: (state) => state.activities.filter((activity)=>activity.author==state.loggedUser.username),

    checkInActivities: (state) => (variable) => state.activities.find((activity)=>activity.title.toLowerCase()==variable.toLowerCase()), 
  
    getBagdes: (state)=> state.badges,

    checkBadges: (state)=>(variable) => state.badges.find((badge)=>badge.badgeName.toLowerCase()==variable.toLowerCase()),

    checkUserBadges: (state)=>(variable) =>  state.loggedUser.badgesId.find((badge)=> badge == variable),

    checkSugestions: (state) => (variable) => state.users.find((user)=> user.username == state.loggedUser.child).activitiesSugest[0].activities.find((sugestion)=> sugestion == variable),
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
      state.users.find((user)=>user.username==variable.tutorStudent).classRequests.push({teacherName: state.loggedUser.username, className:variable.teamName})
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
    },

    SET_REMOVE_REQUEST(state,variable){
      let ativeRequests = state.classes.find((team)=>team.teacher==variable.teacherName && team.name==variable.className).requests
      state.classes.find((team)=>team.teacher==variable.teacherName && team.name==variable.className).requests = ativeRequests.filter((request)=> request.usernameStudent != state.loggedUser.child)
      localStorage.classes = JSON.stringify(state.classes)

      let tutorRequests = state.users.find((user)=>user.username==state.loggedUser.username).classRequests
      state.users.find((user)=>user.username==state.loggedUser.username).classRequests = tutorRequests.filter((request)=> request.teacherName!=variable.teacherName && request.className!=variable.className)
      localStorage.users = JSON.stringify(state.users)

      state.loggedUser.classRequests=tutorRequests.filter((request)=> request.teacherName!=variable.teacherName && request.className!=variable.className)
      sessionStorage.loggedUser = JSON.stringify(state.loggedUser)
    },

    SET_ACCEPT_REQUEST(state,variable){
      let studentsList = state.classes.find((team)=>team.teacher==variable.teacherName && team.name==variable.className).requests
      let newStudent = studentsList.find((student)=> student.usernameStudent == state.loggedUser.child)
      state.classes.find((team)=>team.teacher==variable.teacherName && team.name==variable.className).students.push(newStudent)
      localStorage.classes = JSON.stringify(state.classes)
    },

    SET_REMOVE_KID_FROM_CLASS(state,variable){
      let teamStudents = state.classes.find((team) => team.teacher === variable.teacher && team.students.find((student)=> student.usernameStudent === state.loggedUser.child)).students
      state.classes.find((team) => team.teacher === variable.teacher && team.students.find((student)=> student.usernameStudent === state.loggedUser.child)).students = teamStudents.filter((student)=> student.usernameStudent != state.loggedUser.child)
      localStorage.classes = JSON.stringify(state.classes)
    },

    SET_ALTER_IMG(state,variable){
      state.loggedUser.imageProfile = variable
      sessionStorage.loggedUser = JSON.stringify(state.loggedUser)

      state.users.find((user)=> user.username == state.loggedUser.username).imageProfile = variable
      localStorage.users = JSON.stringify(state.users)
    },

    SET_REMOVE_EMOTION(state,variable){
      state.emotions=state.emotions.filter((emotion)=>emotion!=variable)
      localStorage.emotions = JSON.stringify(state.emotions)

    },

    SET_NEW_EMOTION(state,variable){
      state.emotions.push(variable)
      localStorage.emotions = JSON.stringify(state.emotions)

    },

    SET_NEW_ACTIVITY(state,variable){
      state.activities.push(variable)
      localStorage.activities = JSON.stringify(state.activities)
    },

    SET_REMOVE_ACTIVITY(state,variable){
      state.activities=state.activities.filter((activity)=>activity.title!=variable)
      localStorage.activities = JSON.stringify(state.activities)

    },

    SET_ADD_TO_HISTORY(state,variable){
      state.loggedUser.history.push(variable)
      sessionStorage.loggedUser = JSON.stringify(state.loggedUser)

      state.users.find((user)=> user.username == state.loggedUser.username).history = state.loggedUser.history
      localStorage.users = JSON.stringify(state.users)
    },

    SET_ADD_TO_QUESTIONSDONE(state,variable){
      state.loggedUser.questionsDone=state.loggedUser.questionsDone.concat(variable.results)
      sessionStorage.loggedUser = JSON.stringify(state.loggedUser)

      state.users.find((user)=> user.username == state.loggedUser.username).questionsDone.concat(variable.results)
      localStorage.users = JSON.stringify(state.users)
    },

    SET_TOTAL_POINTS(state,variable){
      state.loggedUser.points = state.loggedUser.points + variable
      sessionStorage.loggedUser = JSON.stringify(state.loggedUser)

      state.users.find((user)=> user.username == state.loggedUser.username).points = state.loggedUser.points
      localStorage.users = JSON.stringify(state.users)
    },

    SET_NEW_BADGE(state,variable){
      state.badges.push(variable)
      localStorage.badges = JSON.stringify(state.badges)
    },

    SET_NEW_BADGE_TO_USER(state,variable){
      state.loggedUser.badgesId.push(variable)
      sessionStorage.loggedUser = JSON.stringify(state.loggedUser)

      state.users.find((user)=> user.username == state.loggedUser.username).badgesId.push(variable) 
      localStorage.users = JSON.stringify(state.users)     
    },

    SET_ADD_ACTIVITY_TO_KID(state,variable){
      state.users.find((user) => user.username === state.loggedUser.child).activitiesPers[0].activities.push(variable.title);
      localStorage.users = JSON.stringify(state.users)
    },
    
    SET_REMOVE_ACTIVITY_FROM_KID(state,variable){
      state.users.find((user) => user.username === state.loggedUser.child).activitiesPers[0].activities = state.users.find((user) => user.username === state.loggedUser.child).activitiesPers[0].activities.filter((activity)=>activity!=variable);
      localStorage.users = JSON.stringify(state.users)
    },

    SET_ADD_ACTIVITY_TO_CLASS(state,variable){
      state.users.find((user) => user.username === variable.studentName).activitiesPers[1].activities.push(variable.activity);
      localStorage.users = JSON.stringify(state.users)
    },
    
    SET_REMOVE_ACTIVITY_FROM_CLASS(state,variable){
      state.users.find((user) => user.username==variable.studentName).activitiesPers[1].activities = state.users.find((user) => user.username==variable.studentName).activitiesPers[1].activities.filter((activity)=>activity!=variable.activity),
      localStorage.users = JSON.stringify(state.users)
    },

    SET_SUGESTION_TO_KID(state,variable){
      state.users.find((user) => user.username === state.loggedUser.child).activitiesSugest[0].activities.push(variable);
      localStorage.users = JSON.stringify(state.users)
    },

    SET_SUGESTION_TO_STUDENTS(state,variable){
      state.users.find((user) => user.username === variable.studentName).activitiesSugest[1].activities.push(variable.activity);
      localStorage.users = JSON.stringify(state.users)
    },

    SET_REMOVE_SUGESTION_FROM_STUDENTS(state,variable){
      state.users.find((user) => user.username==variable.studentName).activitiesSugest[1].activities = state.users.find((user) => user.username==variable.studentName).activitiesSugest[1].activities.filter((activity)=>activity!=variable.activity),
      localStorage.users = JSON.stringify(state.users)
    },
    

  },

  modules: {},
});