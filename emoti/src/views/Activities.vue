<template>
   <div id="backgroundActivities">
     <b-container class="col-11 pt-4">
     <div class="col-12 d-flex flex-row justify-content-between">
       <h2 :style="{color:'#e87461',fontFamily:'EAmbit SemiBold'}">Catálogo</h2>
       <b-button  :style="{height:'100%','background-color':'#e87461',border:'none',color:'#fbfbf3'}" v-b-toggle.sidebar-right><b-icon icon="filter"></b-icon> Filtrar</b-button>
     </div>

     <b-sidebar id="sidebar-right" right shadow backdrop body-class="sideFilter" header-class="sideFilter">
      <div class="px-3 py-2 ">
        <h4 :style="{color:'#e87461',fontFamily:'EAmbit SemiBold'}" class="mt-3 mb-3 text-center">Filtrar</h4>

        <b-form>
          <label for="" class="mt-3">Dificuldade: </label>
          <b-form-select v-model="formFilter.level"  size="sm" class="mb-3">
              <b-form-select-option :value="null" disabled>Selecione uma opção</b-form-select-option>
              <b-form-select-option :value="level"  v-for="(level, index) in levels" :key="index">{{level}}</b-form-select-option>
          </b-form-select>

          <label for="" class="mt-3">Categoria: </label>
          <b-form-select v-model="formFilter.category"  size="sm" class="mb-3">
             <b-form-select-option :value="null" disabled>Selecione uma opção</b-form-select-option>
             <b-form-select-option :value="category"  v-for="(category, index) in categories" :key="index">{{category}}</b-form-select-option>
          </b-form-select>

          <label for="" class="mt-3">Sugerido por: </label>
          <b-form-select v-model="formFilter.sugestFrom" size="sm" class="mb-3" disabled>
             <b-form-select-option :value="null" disabled>Selecione uma opção</b-form-select-option>
              <b-form-select-option :value="sugest"  v-for="(sugest, index) in sugestions" :key="index">{{sugest}}</b-form-select-option>
          </b-form-select>

          <label for="" class="mt-3">Número de perguntas: </label>
          <b-form-select v-model="formFilter.nQuestions"  size="sm" class="mb-3" disabled></b-form-select>

          <div class="mt-4 d-flex flex-row justify-content-center">
            <b-button :style="{'background-color':'#fbfbf3',color:'#e87461',border:'1px solid #e87461',width:'40%'}" class="col-12" @click="resetForm()" >Repor</b-button>
          </div>
        </b-form>
      </div>
    </b-sidebar>

      <b-card-group class="row col-12" columns>
        <b-card tag="article" :style="{'max-width': '20vw','background-color':'#fbfbf3',border:'none','padding-left':cardAffect==index?'0px':'10px'}" class="mb-2 mr-2"  v-for="(activity, index) in filterActivities" :key="index" @mouseover="cardAffect=index" @mouseleave="cardAffect=null">
        <b-link><img v-bind:src="activity.caseIMG" alt="" style="width:17rem;height:10rem;border-radius:5px" @click="$router.push({ name: 'Activity', params: { name: activity.title } })"></b-link>
        <div class="d-flex flex-row justify-content-between mt-3" style="width:16.5rem">
          <b-card-sub-title class="mb-2"><span style="color:#e87461">{{activity.category}}</span></b-card-sub-title>
          <div>
            <b-card-sub-title class="mb-2"><b-link @click="activityTitle=activity.title" :style="{color:'#e87461',fontFamily:'EAmbit SemiBold',fontSize:'20px','text-decoration':'none'}" v-b-modal.modalCatalog  v-if="activity.author=='admin' && getLoggedUser.type!='Criança' && getLoggedUser.type!='Administrador'"><span class="material-icons-round" :style="{color:'#87461'}">edit</span></b-link ><span class="material-icons-round" v-if="getLoggedUser.type=='Criança' && getUser.history.find((quiz)=>quiz.activityTitle == activity.title)">done</span><span class="material-icons-round" v-if="getLoggedUser.type=='Criança'  && getUser.activitiesSugest[1].activities.find((quiz)=>quiz==activity.title)">school</span><span class="material-icons-round" style="margin-left:5px" v-if="getLoggedUser.type=='Criança' && getUser.activitiesSugest[0].activities.find((quiz)=>quiz==activity.title)">family_restroom</span></b-card-sub-title>
          </div>
        </div>
           <b-card-title><b-link :style="{color:'#2B4141',fontFamily:'EAmbit SemiBold',fontSize:'20px','text-decoration':'none'}" @click="$router.push({ name: 'Activity', params: { name: activity.title } })">{{activity.title}}</b-link></b-card-title>
        </b-card>  
      </b-card-group>

        
        

     </b-container>

     <b-modal id="modalCatalog" centered hide-footer header-border-variant="0" header-class="color" body-class="color">
        <div :style="{fontFamily:'EAmbit SemiBold'}" class="text-center" v-if="getLoggedUser.type=='Professor'"> <!--Falta v-if -->
               <h4 :style="{color:'#e87461'}">Sugerir Atividade</h4>

               <b-form @submit="sugestToClasses()">
                 <b-form-group label-cols="4" label-cols-lg="4" label-size="sm" label-align-sm="left" label="Atividade:" label-for="input-sm" class="mt-4 mb-4">
                    <b-form-input type="text" id="input-sm" disabled required v-model="activityTitle">{{activityTitle}}</b-form-input>
                 </b-form-group>

                 <b-form-group label-cols="9" label-cols-lg="4" label-size="sm" label-align-sm="left" label="Atribuir a:" label-for="input-sm" class="mt-4 mb-4">
                    <div class="row mt-2" v-for="(teamView,index) in classesView" :key="index">
                       <b-form-select id="input-sm" class="col-8 ml-3" v-model="classesView[index]">
                          <b-form-select-option disabled value="">---Turmas---</b-form-select-option>
                          <b-form-select-option v-for="(team,index) in getTeacherClasses" :key="index" :value="team.name">{{team.name}}</b-form-select-option>
                       </b-form-select>
                       <b-button class="col-2 ml-2" @click="newClassView()" :disabled="index+1 != classesView.length"><b-icon icon="plus-circle-fill"></b-icon></b-button>
                    </div>
                 </b-form-group>

                 <div class="d-flex flex-row justify-content-end">
                  <b-button type="submit" class="text-end" :style="{color:'#fdfdf3','background-color':'#e87461',border:'none'}">Sugerir</b-button>
                  </div>
               </b-form>
        </div>

        <div :style="{fontFamily:'EAmbit SemiBold'}" class="text-center" v-if="getLoggedUser.type=='Tutor'"> <!--Falta v-if -->
               <h4 :style="{color:'#e87461'}">Sugerir Atividade</h4>

               <b-form @submit.prevent="sugestToKid()">
                 <b-form-group label-cols="4" label-cols-lg="4" label-size="sm" label-align-sm="left" label="Atividade:" label-for="input-sm" class="mt-4 mb-4">
                    <b-form-input type="text" id="input-sm" disabled required v-model="activityTitle">{{activityTitle}}</b-form-input>
                 </b-form-group>

                 <b-form-group label-cols="4" label-cols-lg="4" label-size="sm" label-align-sm="left" label="Atribuir a:" label-for="input-sm" class="mt-4 mb-4">
                    <b-form-input type="text" id="input-sm" disabled required v-model="getUser.child">{{getUser.child}}</b-form-input>
                 </b-form-group>


                 <div class="d-flex flex-row justify-content-end">
                  <b-button type="submit" class="text-end" :style="{color:'#fdfdf3','background-color':'#e87461',border:'none'}">Sugerir</b-button>
                  </div>

                 <div v-if="warning!=''" :style="{'background-color':'#C82333',color:'#fdfdf3','border-radius':'4px'}">
                   <p>{{warning}}</p>
                 </div>
               </b-form>
        </div>

     </b-modal>
    
  </div>
</template>

<script>
import { mapGetters, mapMutations,mapActions} from "vuex";

export default {
  data() {
    return {
      warning:'',
      formFilter: {
        level:'',
        category:'',
        sugestFrom:'',
        nQuestions:'',
      },
      levels:['Fácil','Médio','Dificil'],
      categories:['Quiz','Reconhecimento','Atividades Personalizadas (Tutor)','Atividades Personalizadas (Professor)'],
      sugestions:['Tutor','Professor','Ambos'],
      cardAffect:null,
      activitiesCatalog:"",
      activityTitle:"",
      classesView:[""],
    }

  },
methods: {

  ...mapMutations(["SET_SUGESTION_TO_KID","SET_SUGESTION_TO_STUDENTS","SET_REMOVE_SUGESTION_FROM_STUDENTS"]),
  ...mapActions(["find_ap"]),

  resetForm() {
    this.formFilter.level=this.formFilter.category=this.formFilter.sugestFrom=this.formFilter.nQuestions=''
  },

  activitiesForUser(){
    if (this.getLoggedUser.type=="Professor") {
      this.activitiesCatalog=this.activitiesCatalog.filter((activity)=>activity.author=="admin" || activity.author==this.getLoggedUser.username)
    }else if (this.getLoggedUser.type=="Tutor") {
      this.activitiesCatalog=this.activitiesCatalog.filter((activity)=>activity.author=="admin" || activity.author==this.getLoggedUser.username)
    }else if (this.getLoggedUser.type=="Administrador") {
      this.activitiesCatalog=this.activitiesCatalog.filter((activity)=>activity.author=="admin")
    }else{
      this.activitiesCatalog=this.activitiesCatalog.filter((activity)=>activity.author=="admin" || activity.author==this.get.tutor || activity.title==this.checkActivityPersName(activity.title))

    }
    console.log(this.activitiesCatalog);
  },

  checkActivityPersName(variable){
    let result=""
    for (const activity of this.getUser.activitiesPers[1].activities) {
      if (activity == variable) {
        result=variable
      }
    }
    return result
  },

  sugestToKid(){
    if (!this.checkSugestions(this.activityTitle)) {
      this.SET_SUGESTION_TO_KID(this.activityTitle)
      location.reload()
    }else{
      this.warning="Já sugeriu esta atividade!"
    }
    
  },

  sugestToClasses(){
    if (this.classesView.lenght>1) {
      this.classesView.pop()
    }
         
    this.resetActivitiesInStudents(this.activityTitle)
    for (let i = 0; i < this.classesView.length; i++) {
      let team = this.classesView[i];
      for (let a = 0; a < this.getTeamStudents(team).length; a++) {
        let student1 = this.getTeamStudents(team)[a].usernameStudent
        this.data= {studentName:student1,activity:this.activityTitle}
        this.SET_SUGESTION_TO_STUDENTS(this.data)
      }
    }    
  },

  resetActivitiesInStudents(variable){
    for (let i = 0; i < this.getTeacherClasses.length; i++) {
      let team = this.getTeacherClasses[i].name
      for (let a = 0; a < this.getTeamStudents(team).length; a++) {
        let student1 = this.getTeamStudents(team)[a].usernameStudent
        let data2= {studentName:student1,activity:variable}
        this.SET_REMOVE_SUGESTION_FROM_STUDENTS(data2)       
      }
    }
  },

  newClassView(){
    this.classesView.push("")
  },


},

computed: {
    ...mapGetters(["getFilteredActivities","getLoggedUser","checkSugestions","getTeacherClasses","getTeamStudents","getUser"]),
    
    filterActivities(){
      return this.activitiesCatalog.filter((activity)=>(activity.level==this.formFilter.level || this.formFilter.level=='') && (activity.category==this.formFilter.category || this.formFilter.category==''))
    }

  },
watch: {
  formFilter() {
  }
},
created () {
  this.activitiesCatalog=this.getFilteredActivities(this.formFilter)
  this.activitiesForUser()
  this.find_ap(this.getLoggedUser.username)
},

};
</script>

<style>
  #backgroundActivities {
  width: 100%;
  height: 100vh;
  background: url("../assets/Grupo 6.svg");
  background-size: 1525px auto;
  background-repeat: repeat;
}
.sideFilter{
  background-color: #fbfbf3;
}
</style>