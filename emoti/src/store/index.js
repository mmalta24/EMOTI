import Vue from "vue";
import Vuex from "vuex";

import router from '../router/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    
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
     
      
      //new
      loggedUser:localStorage.loggedUser ? JSON.parse(localStorage.loggedUser):{},

      user:{},

      childInfo:"",

      users: [],

      classes: [],

      searchKid:{},

      requests:[],

      classesKid:[],

      students:[],

      emotions:[],

      badges:[],

  },
  
  getters: {
    //new
    getLoggedUser:(state)=> state.loggedUser,

    getUser:(state)=>state.user,

    getChildInfo:(state)=>state.childInfo,

    getUsers: (state)=>state.users,

    getTeacherClasses:(state)=>state.classes,

    getSearchkid:(state)=>state.searchKid,

    getRequests:(state)=>state.requests,

    getClassesKid:(state)=>state.classesKid,

    getStudents:(state)=>state.students,

    getEmotions: (state) => state.emotions,

    getBagdes: (state)=> state.badges,

    //old
    isUser: (state) => (username, password) =>
      state.users.some(
        (user) => user.username === username && user.password === password
      ),

    isUsernameAvailable: (state) => (username) =>
      state.users.every((user) => user.username !== username),

    isUserBlocked: (state) => (username) => state.users.some(
      (user) => user.username === username && user.blocked === true
    ),

    getFilteredActivities: (state)=>(formFilter)=> state.activities.filter(activity=>(activity.level==formFilter.level || formFilter.level=='') &&
    (activity.category==formFilter.category || formFilter.category=='')),

    getActivity:(state)=>(title)=>state.activities.find((activitiy)=>activitiy.title==title),

    getTeamStudents: (state) => (teamName) => state.classes.find((team)=>team.name == teamName && team.teacher== state.loggedUser.username).students ,

    getStudentData: (state) => (variable) => state.users.find((user)=>user.username==variable).points,

    

    checkInEmotions: (state) => (variable) => state.emotions.some((emotion)=>emotion.toLowerCase()==variable.toLowerCase()),

    getActivities: (state) => state.activities,

    getActivitiesAdmin: (state) => state.activities.filter((activity)=>activity.category=="Quiz"||activity.category=="Reconhecimento"),

    getActivitiesPers: (state) => state.activities.filter((activity)=>activity.author==state.loggedUser.username),

    checkInActivities: (state) => (variable) => state.activities.find((activity)=>activity.title.toLowerCase()==variable.toLowerCase()), 
  
    

    checkBadges: (state)=>(variable) => state.badges.find((badge)=>badge.badgeName.toLowerCase()==variable.toLowerCase()),

    checkUserBadges: (state)=>(variable) =>  state.loggedUser.badgesId.find((badge)=> badge == variable),

    checkSugestions: (state) => (variable) => state.users.find((user)=> user.username == state.loggedUser.child).activitiesSugest[0].activities.find((sugestion)=> sugestion == variable),
    //new
   
    

  },
  actions: {
    async login_ap(context,data){
      const response = await fetch("http://127.0.0.1:3000/api/users/login", {
        method: 'POST',
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
      })
      if(response.ok){
        context.commit("SET_TOKEN", await response.json());
      }
      else{
        const err=await response.json()
        throw new Error(err.error)
      }
    },

    async register_ap(context,data){
      const response = await fetch("http://127.0.0.1:3000/api/users", {
        method: 'POST',
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data)
      })
      if(!response.status==201){
        const err=await response.json()
        throw new Error(err.error)
      }
    },

    async find_ap(context,data){
      const response = await fetch(`http://127.0.0.1:3000/api/users/${data}`, {
        method: 'GET',
        headers: {'Authorization': 'Bearer '+this.state.loggedUser.token,}})
      if(response.ok){
        context.commit("SET_USER_INFO", await response.json());
      }
    },

    async updateUser_ap(context,data){
      const response = await fetch(`http://127.0.0.1:3000/api/users/${data[0]}`, {
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin',
        method: 'PATCH',
        headers: {'Authorization': 'Bearer '+this.state.loggedUser.token, 'Content-Type': 'application/json'},
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data[1])
      })
      if(!response.ok){
        const err=await response.json()
        throw new Error(err.error)
      }
    },

    async createRelation_ap(context,data){
      const response = await fetch(`http://127.0.0.1:3000/api/users/${this.state.loggedUser.username}/children`, {
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin',
        method: 'PUT',
        headers: {'Authorization': 'Bearer '+this.state.loggedUser.token, 'Content-Type': 'application/json'},
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
      })
      if(!response.ok){
        const err=await response.json()
        throw new Error(err.error)
      }
    },

    async findRelations_ap(context){
      const response = await fetch(`http://127.0.0.1:3000/api/users/${this.state.loggedUser.username}/children`, {
        method: 'GET',
        headers: {'Authorization': 'Bearer '+this.state.loggedUser.token},
      })
      if(response.ok){
        context.commit("SET_USERNAME_CHILD", await response.json());
      }
    },

    async removeRelation_ap(context,data){
      const response=await fetch(`http://127.0.0.1:3000/api/users/${this.state.loggedUser.username}/children`,{
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin',
        method: 'DELETE',
        headers: {'Authorization': 'Bearer '+this.state.loggedUser.token, 'Content-Type': 'application/json'},
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.error)
      }
    },

    async findAllUsers_ap(context,data){
      const response = await fetch(`http://127.0.0.1:3000/api/users`+data, {
        method: 'GET',
        headers: {'Authorization': 'Bearer '+this.state.loggedUser.token},
      })
      if(response.ok){
        context.commit("SET_USERS", await response.json());
      }
    },

    async createAdmin_ap(context,data){
      const response = await fetch("http://127.0.0.1:3000/api/users/addAdmin", {
        method: 'POST',
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+this.state.loggedUser.token
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data)
      })
      if(!response.status==201){
        const err=await response.json()
        throw new Error(err.error)
      }
    },

    async removeUser_ap(context,data){
      const response=await fetch(`http://127.0.0.1:3000/api/users/${data.username}`,{
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin',
        method: 'DELETE',
        headers: {'Authorization': 'Bearer '+this.state.loggedUser.token, 'Content-Type': 'application/json'},
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
      })
      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.error)
      }

      },

      async findAllClasses_ap(context){
        const response = await fetch(`http://127.0.0.1:3000/api/classes`, {
          method: 'GET',
          headers: {'Authorization': 'Bearer '+this.state.loggedUser.token},
        })
        if(response.ok){
          context.commit("SET_CLASSES", await response.json());
        }
      },

      async createClass_ap(context,data){
        const response = await fetch("http://127.0.0.1:3000/api/classes", {
          method: 'POST',
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+this.state.loggedUser.token
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(data)
        })
        if(!response.status==201){
          const err=await response.json()
          throw new Error(err.error)
        }
      },

      async findChildClasses_ap(context,data){
        const response = await fetch(`http://127.0.0.1:3000/api/classes/requests?usernameChild=${data}`, {
          method: 'GET',
          headers: {'Authorization': 'Bearer '+this.state.loggedUser.token, 'Content-Type': 'application/json'},
        })
        if(response.ok){
          context.commit("SET_SEARCH_KID", await response.json());
        }
        else{
          const err=await response.json()
          throw new Error(err.error)
        }
      },

      async createRequest_ap(context,data){
        const response = await fetch("http://127.0.0.1:3000/api/classes/requests", {
          method: 'POST',
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+this.state.loggedUser.token
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(data)
        })
        if(!response.status==201){
          const err=await response.json()
          throw new Error(err.error)
        }
      },

      async removeClass_ap(context,data){
        const response=await fetch(`http://127.0.0.1:3000/api/classes/${data}`,{
          method: 'DELETE',
          headers: {'Authorization': 'Bearer '+this.state.loggedUser.token}
        })
        console.log(response);
        if (!response.ok) {
          const err = await response.json()
          throw new Error(err.error)
        }
  
      },

      async alterStudent_ap(context,data){
          const response = await fetch(`http://127.0.0.1:3000/api/classes/${data[0]}/children/${data[1]}`, {
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin',
          method: 'PUT',
          headers: {'Authorization': 'Bearer '+this.state.loggedUser.token, 'Content-Type': 'application/json'},
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer',
          body: JSON.stringify(data[2])
        })
        if(!response.ok){
          const err=await response.json()
          throw new Error(err.error)
        }
      },

      async removeStudent_ap(context,data){
        const response=await fetch(`http://127.0.0.1:3000/api/classes/${data[0]}/children/${data[1]}`,{
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin',
          method: 'DELETE',
          headers: {'Authorization': 'Bearer '+this.state.loggedUser.token, 'Content-Type': 'application/json'},
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer',
          body: JSON.stringify(data[2])
        })
        if (!response.ok) {
          const err = await response.json()
          throw new Error(err.error)
        }
      },

      async findRequests_ap(context,data){
        const response = await fetch(`http://127.0.0.1:3000/api/classes/requests/${data}`, {
          method: 'GET',
          headers: {'Authorization': 'Bearer '+this.state.loggedUser.token},
        })
        if(response.ok){
          context.commit("SET_REQUESTS", await response.json());
        }
        else{
          const err=await response.json()
          throw new Error(err.error)
        }
      },

      async acceptRequest_ap(context,data){
        const response = await fetch(`http://127.0.0.1:3000/api/classes/requests/${data[0]}`, {
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin',
          method: 'PUT',
          headers: {'Authorization': 'Bearer '+this.state.loggedUser.token, 'Content-Type': 'application/json'},
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer',
          body: JSON.stringify(data[1])
        })
        if(!response.ok){
          const err=await response.json()
          throw new Error(err.error)
        }
      },

      async deleteRequest_ap(context,data){
        const response = await fetch(`http://127.0.0.1:3000/api/classes/requests/${data[0]}`, {
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin',
          method: 'DELETE',
          headers: {'Authorization': 'Bearer '+this.state.loggedUser.token, 'Content-Type': 'application/json'},
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer',
          body: JSON.stringify(data[1])
        })
        if(!response.ok){
          const err=await response.json()
          throw new Error(err.error)
        }
      },

      async findClasses_ap(context,data){
        const response = await fetch(`http://127.0.0.1:3000/api/classes/children/${data}`, {
          method: 'GET',
          headers: {'Authorization': 'Bearer '+this.state.loggedUser.token,}})
        if(response.ok){
          context.commit("SET_CLASSES_KID", await response.json());
        }
      },

      async findAllStudents_ap(context){
        const response = await fetch(`http://127.0.0.1:3000/api/classes/children`, {
          method: 'GET',
          headers: {'Authorization': 'Bearer '+this.state.loggedUser.token, 'Content-Type': 'application/json'},
        })
        if(response.ok){
          context.commit("SET_STUDENTS", await response.json());
        }
      },

      async findAllEmotions_ap(context){
        const response = await fetch(`http://127.0.0.1:3000/api/emotions`, {
          method: 'GET',
          headers: {'Authorization': 'Bearer '+this.state.loggedUser.token, 'Content-Type': 'application/json'},
        })
        if(response.ok){
          context.commit("SET_EMOTIONS", await response.json());
        }
      },

      async createEmotion_ap(context,data){
        const response = await fetch(`http://127.0.0.1:3000/api/emotions`, {
          method: 'POST',
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+this.state.loggedUser.token
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(data)
        })
        if(!response.status==201){
          const err=await response.json()
          throw new Error(err.error)
        }
      },

      async deleteEmotion_ap(context,data){
        const response = await fetch(`http://127.0.0.1:3000/api/emotions/${data}`, {
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin',
          method: 'DELETE',
          headers: {'Authorization': 'Bearer '+this.state.loggedUser.token, 'Content-Type': 'application/json'},
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer',
        })
        if(!response.ok){
          const err=await response.json()
          throw new Error(err.error)
        }
      },

      async findBadges_ap(context,data){
        const response = await fetch(`http://127.0.0.1:3000/api/badges${data}`, {
          method: 'GET',
          headers: {'Authorization': 'Bearer '+this.state.loggedUser.token},
        })
        if(response.ok){
          context.commit("SET_BADGES", await response.json());
        }
        else{
          const err=await response.json()
          throw new Error(err.error)
        }
      },

      async createBadge_ap(context,data){
        const response = await fetch(`http://127.0.0.1:3000/api/badges`, {
          method: 'POST',
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+this.state.loggedUser.token
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(data)
        })
        if(!response.status==201){
          const err=await response.json()
          throw new Error(err.error)
        }
      },
      async deleteBadge_ap(context,data){
        const response = await fetch(`http://127.0.0.1:3000/api/badges/${data}`, {
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin',
          method: 'DELETE',
          headers: {'Authorization': 'Bearer '+this.state.loggedUser.token, 'Content-Type': 'application/json'},
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer'
        })
        if(!response.ok){
          const err=await response.json()
          throw new Error(err.error)
        }
      },
    

  },

  mutations: {
    //new
    SET_TOKEN(state,variable){
      state.user={}
      state.loggedUser.token=variable.authKey
      state.loggedUser.type=variable.typeUser
      state.loggedUser.username=variable.username
      localStorage.loggedUser=JSON.stringify(state.loggedUser)
    },
    
    SET_USER_INFO(state,variable){
      state.user=variable.user
    },

    SET_LOGOUT(state) {
      state.loggedUser = {}
      state.user={}
      localStorage.loggedUser=JSON.stringify(state.loggedUser);
      router.push({ name: 'LandingPage' });
    },

    SET_USERNAME_CHILD(state,variable){
      if(variable.children.length!=0){
        state.childInfo=variable.children[0]
      }
    },

    SET_USERS(state,variable){
      state.users=variable.users
    },

    SET_CLASSES(state,variable){
      state.classes=variable.classes
    },

    SET_SEARCH_KID(state,variable){
      state.searchKid=variable.child
    },

    SET_REQUESTS(state,variable){
      state.requests=variable.requests
    },

    SET_CLASSES_KID(state,variable){
      state.classesKid=variable.class
    },

    SET_STUDENTS(state,variable){
      state.students=variable.list;
    },

    SET_EMOTIONS(state,variable){
      state.emotions=variable.emotions
    },

    SET_BADGES(state,variable){
      state.badges=variable.data
    },

    //old
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

    SET_EDIT_ACTIVITY(state,variable){
      state.activities.find((activity)=>activity.title == variable.title).level = variable.level
      state.activities.find((activity)=>activity.title == variable.title).description = variable.description
      state.activities.find((activity)=>activity.title == variable.title).questions = variable.questions
      state.activities.find((activity)=>activity.title == variable.title).caseIMG = variable.caseIMG
      localStorage.activities = JSON.stringify(state.activities)
    },

    SET_REMOVE_BADGE(state,variable){
      state.badges=state.badges.filter((badge)=>badge.badgeName!=variable)
      localStorage.badges = JSON.stringify(state.badges)
    }
    

  },

  modules: {},
});