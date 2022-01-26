<template>
   <div id="backgroundActivitiesP">
     <b-container class="col-11 pt-4">
         <h2 :style="{color:'#e87461',fontFamily:'EAmbit SemiBold'}">Atividades Personalizadas</h2>

         <div class="row col-12 pt-3">

             <div class="col-9 mt-4">
               <b-form inline>
                  <label class="mr-sm-2" for="filterTitle">Título: </label>
                  <b-form-input id="filterTitle" v-model="filter.title" class="mb-2 mr-sm-5 mb-sm-0 col-3" :style="{'background-color':'#fdfdf3'}"></b-form-input>

                  <label class="mr-sm-2" for="filterLevel">Grau de Dificuldade: </label>
                  <b-form-select id="filterLevel" v-model="filter.level" class="mb-2 mr-sm-0 mb-sm-0 col-3"  :style="{'background-color':'#fdfdf3'}">
                     <b-form-select-option value="Fácil">Fácil</b-form-select-option>
                     <b-form-select-option value="Médio">Médio</b-form-select-option>
                     <b-form-select-option value="Dificil">Dificil</b-form-select-option>
                  </b-form-select>
               </b-form>
             </div>

             <div class="col-3 mt-4 d-flex flex-row justify-content-end">
                <b-button :style="{color:'#fdfdf3','background-color':'#e87461',border:'none'}"  v-b-modal.modal-myactivities @click="modalDo='addgame'">Adicionar</b-button>
             </div>

             <div class="col-12 mt-5">
                <table class="col-12 text-center">
                  <tr :style="{'background-color':'#e87461',color:'#fbfbf3'}">
                      <th class="p-1">Título</th>
                      <th>Grau de Dificuldade</th>
                      <th>Imagem (Capa)</th>
                      <th>Ações</th>
                  </tr>
                  <tr :style="{'border-bottom':'2px solid #707070'}" v-for="(activity,index) in filterActivitiesPers" :key="index">
                      <td class="p-4">{{activity.title}}</td>
                      <td>{{activity.level}}</td>
                      <td>{{activity.caseIMG}}</td>
                      <td><b-button v-if="getLoggedUser.typeUser == 'Professor'" style="background-color:#4DA1A9;border:none" class=" ml-2 mr-1" @click="openModal(activity.title)"  v-b-modal.modal-myactivities><b-icon icon="eye-fill" ></b-icon></b-button><b-button style="border:none" variant="secondary" class=" ml-2 mr-1" v-b-modal.modal-myactivities @click="modalEditOpen(activity)"><b-icon icon="pencil-fill"></b-icon></b-button><b-button style="border:none" variant="danger" class=" ml-2 mr-1"><b-icon icon="trash-fill" @click="removeActivity(activity.title)"></b-icon></b-button></td>
                  </tr>
                </table>
             </div>
          
         </div>

          <b-modal id="modal-myactivities" size="lg" centered hide-footer header-border-variant="0" header-class="color" body-class="color" scrollable>
            <div :style="{fontFamily:'EAmbit SemiBold'}" class="text-center" v-if="modalDo=='addgame'">
              <h4 :style="{color:'#e87461'}">Adicionar Atividade Personalizada</h4>

              <b-form @submit.prevent="addActivity()">
                 <b-form-group label-cols="3" label-cols-lg="3" label-size="sm" label-align-sm="left" label="Título:" label-for="input-sm" class="mt-4 mb-4">
                    <b-form-input id="input-sm" v-model="newActivity.title" required></b-form-input>
                 </b-form-group>

                 <b-form-group label-cols="3" label-cols-lg="3" label-size="sm" label-align-sm="left" label="Dificuldade:" label-for="input-sm" class="mt-4 mb-4">
                    <b-form-select id="input-sm" v-model="newActivity.level" required>
                       <b-form-select-option value="Fácil">Fácil</b-form-select-option>
                       <b-form-select-option value="Médio">Médio</b-form-select-option>
                       <b-form-select-option value="Dificil">Dificil</b-form-select-option>
                    </b-form-select>
                 </b-form-group>

                 <b-form-group label-cols="3" label-cols-lg="3" label-size="sm" label-align-sm="left" label="Questão:" label-for="input-sm" class="mt-4 mb-4" v-for="(question,index) in newActivity.questions" :key="index">
                    <div class="row">
                       <b-form-select id="input-sm" class="col-3 ml-3" v-model="question.correctAnswer" :disabled="index+1 != newActivity.questions.length">
                          <b-form-select-option v-for="(emotion,index) in getEmotions" :key="index" :value="emotion">{{emotion}}</b-form-select-option>
                       </b-form-select>
                       <b-form-input id="input-sm" class="col-4 ml-2" placeholder="Imagem" v-model="question.img" :disabled="index+1 != newActivity.questions.length"></b-form-input>
                       <b-form-input id="input-sm" type="number" class="col-2 ml-2" placeholder="Pontos" min="0"  v-model.number="question.points" :disabled="index+1 != newActivity.questions.length"></b-form-input>
                       <b-button class="col-1 ml-2" @click="addNewQuestion(index)" :disabled="index+1 != newActivity.questions.length"><b-icon icon="plus-circle-fill"></b-icon></b-button>
                    </div>
                 </b-form-group>

                 <b-form-group label-cols="3" label-cols-lg="3" label-size="sm" label-align-sm="left" label="Capa (IMG):" label-for="input-sm" class="mt-4 mb-4">
                    <b-form-input type="url" id="input-sm" v-model="newActivity.caseIMG" required></b-form-input>
                 </b-form-group>
                 
                 <b-form-group label-cols="3" label-cols-lg="3" label-size="sm" label-align-sm="left" label="Descrição:" label-for="input-sm" class="mt-4 mb-4">
                    <b-form-textarea v-model="newActivity.description" placeholder="Enter something..." rows="3" max-rows="6"></b-form-textarea>
                 </b-form-group>
                  <div class="d-flex flex-row justify-content-end"><b-button type="submit" class="text-end" :style="{color:'#fdfdf3','background-color':'#e87461',border:'none'}">Adicionar</b-button></div>
                  <div v-if="warning!=''" :style="{'background-color':'#C82333',color:'#fdfdf3','border-radius':'4px'}">
                   <p>{{warning}}</p>
                 </div>
              </b-form>        
            </div>

            <!--Editar Atividade-->

          <div :style="{fontFamily:'EAmbit SemiBold'}" class="text-center" v-if="modalActivityDo=='editactivity'">
              <h4 :style="{color:'#e87461'}">Editar Atividade Personalizada</h4>

              <b-form @submit="applyChangesActivity()">
                 <b-form-group label-cols="3" label-cols-lg="3" label-size="sm" label-align-sm="left" label="Título:" label-for="input-sm" class="mt-4 mb-4">
                    <b-form-input id="input-sm" v-model="editActivity.title" disabled required></b-form-input>
                 </b-form-group>

                 <b-form-group label-cols="3" label-cols-lg="3" label-size="sm" label-align-sm="left" label="Dificuldade:" label-for="input-sm" class="mt-4 mb-4">
                    <b-form-select id="input-sm" v-model="editActivity.level" required>
                       <b-form-select-option value="Fácil">Fácil</b-form-select-option>
                       <b-form-select-option value="Médio">Médio</b-form-select-option>
                       <b-form-select-option value="Dificil">Dificil</b-form-select-option>
                    </b-form-select>
                 </b-form-group>

                 <b-form-group label-cols="3" label-cols-lg="3" label-size="sm" label-align-sm="left" label="Categoria:" label-for="input-sm" class="mt-4 mb-4">
                    <b-form-select id="input-sm" v-model="editActivity.category" disabled required>
                       <b-form-select-option value="Quiz">Quiz</b-form-select-option>
                    </b-form-select>
                 </b-form-group>

                 <b-form-group label-cols="3" label-cols-lg="3" label-size="sm" label-align-sm="left" label="Questão:" label-for="input-sm" class="mt-4 mb-4" v-for="(question,index) in editActivity.questions" :key="index">
                    <div class="row">
                       <b-form-select id="input-sm" class="col-3 ml-3" v-model="question.correctAnswer" disabled>
                          <b-form-select-option v-for="(emotion,index) in getEmotions" :key="index" :value="emotion">{{emotion}}</b-form-select-option>
                       </b-form-select>
                       <b-form-input id="input-sm" class="col-4 ml-2" placeholder="Imagem" v-model="question.img"></b-form-input>
                       <b-form-input id="input-sm" type="number" class="col-2 ml-2" placeholder="Pontos" min="0"  v-model.number="question.points"></b-form-input>
                    </div>
                 </b-form-group>

                 <b-form-group label-cols="3" label-cols-lg="3" label-size="sm" label-align-sm="left" label="Capa (IMG):" label-for="input-sm" class="mt-4 mb-4">
                    <b-form-input type="url" id="input-sm" v-model="editActivity.caseIMG" required></b-form-input>
                 </b-form-group>
                 
                 <b-form-group label-cols="3" label-cols-lg="3" label-size="sm" label-align-sm="left" label="Descrição:" label-for="input-sm" class="mt-4 mb-4">
                    <b-form-textarea v-model="editActivity.description" placeholder="Enter something..." rows="3" max-rows="6"></b-form-textarea>
                 </b-form-group>
                  <div class="d-flex flex-row justify-content-end"><b-button type="submit" class="text-end" :style="{color:'#fdfdf3','background-color':'#e87461',border:'none'}">Editar</b-button></div>
              </b-form>


          </div>

            <!--Visibilidade da Atividade-->
            <div :style="{fontFamily:'EAmbit SemiBold'}" class="text-center" v-if="modalDo=='viewgame'">
               <h4 :style="{color:'#e87461'}">Visibilidade</h4>

               <b-form @submit="defineVisibility()">
                  <b-form-group label-cols="3" label-cols-lg="3" label-size="sm" label-align-sm="left" label="Título:" label-for="input-sm" class="mt-4 mb-4">
                    <b-form-input id="input-sm" v-model="activityName" required disabled></b-form-input>
                 </b-form-group>

                 <b-form-group label-cols="3" label-cols-lg="3" label-size="sm" label-align-sm="left" label="Atribuir a:" label-for="input-sm" class="mt-4 mb-4">
                    <div class="row" v-for="(teamView,index) in classesView" :key="index">
                       <b-form-select id="input-sm" class="col-8 ml-3" :disabled="index+1 != classesView.length" v-model="classesView[index]">
                          <b-form-select-option disabled value="">---Turmas---</b-form-select-option>
                          <b-form-select-option v-for="(team,index) in getTeacherClasses" :key="index" :value="team.name">{{team.name}}</b-form-select-option>
                       </b-form-select>
                       <b-button class="col-1 ml-2" @click="newClassView()" :disabled="index+1 != classesView.length"><b-icon icon="plus-circle-fill"></b-icon></b-button>
                    </div>
                 </b-form-group>
                  <div class=" d-flex flex-row justify-content-end"><b-button type="submit" class="text-end" :style="{color:'#fdfdf3','background-color':'#e87461',border:'none'}">Definir</b-button></div>
               </b-form>

               
            </div>

          </b-modal>


     </b-container>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
   data() {
      return {
         warning:'',
         modalActivityDo:"",
         modalDo: '',
         activityName: "",
         classesView:[""],
         newActivity:{
            title: "",
            level: "",
            questions: [{
               img:'',
               correctAnswer:'',
               answers:[],
               points:0
            }],
            caseIMG:'',
            description:'',
            category:'' ,
            author:''
         },
         editActivity:{
            title:"",
            level: "",
            questions: [{}],
            caseIMG:'',
            description:'',
            category:'' ,
            author:""

         },
         data:{
            student1:"",
            activity:""
         },
         filter:{
            title:'',
            level:''
         },
         listActivitiesPers:''
      }
   },
   
   computed: {
      ...mapGetters(["getLoggedUser","getEmotions","getActivitiesPers","checkInActivities","getTeacherClasses","getTeamStudents"]),

      filterActivitiesPers(){
      return this.listActivitiesPers.filter((activity)=>(activity.title==this.filter.title || this.filter.title=='') && (activity.level==this.filter.level || this.filter.level==''))
    }
   },
   created () {
      this.listActivitiesPers=this.getActivitiesPers;
   },

   methods: {
      ...mapMutations(["SET_REMOVE_ACTIVITY","SET_NEW_ACTIVITY","SET_ADD_ACTIVITY_TO_KID","SET_REMOVE_ACTIVITY_FROM_KID","SET_REMOVE_ACTIVITY_FROM_CLASS","SET_ADD_ACTIVITY_TO_CLASS","SET_EDIT_ACTIVITY"]),

      addNewQuestion(index){
         let wrongEmotions=[]
         let emotionId = ''
         let validation=false
         let validation1=false

         for (let i = 0; i <3; i++) {
            while(validation==false){
               emotionId=Math.floor(Math.random()*this.getEmotions.length)
               validation1=wrongEmotions.some((wrong)=>wrong==this.getEmotions[emotionId])
               if(this.getEmotions[emotionId] != this.newActivity.questions[index].correctAnswer && validation1==false){
                  wrongEmotions.push(this.getEmotions[emotionId])
                  validation=true
               }
            }
            validation=false
         }
         
         wrongEmotions.push(this.newActivity.questions[index].correctAnswer)
         this.newActivity.questions[index].answers=wrongEmotions
         wrongEmotions.sort(()=> Math.random() - 0.5)

         this.newActivity.questions.push({
            img:'',
            correctAnswer:'',
            answers:[],
            points:0
         })
      },


      addActivity(){
         if (!this.checkInActivities(this.newActivity.title)) {
            this.newActivity.questions.pop()
            if (this.getLoggedUser.typeUser=="Tutor") {
               this.newActivity.category="Atividades Personalizadas (Tutor)"
               this.newActivity.author=this.getLoggedUser.username
               this.SET_NEW_ACTIVITY(this.newActivity)
               this.SET_ADD_ACTIVITY_TO_KID(this.newActivity)
               location.reload()
            }else{
               this.newActivity.category="Atividades Personalizadas (Professor)"
               this.newActivity.author=this.getLoggedUser.username
               this.SET_NEW_ACTIVITY(this.newActivity)
               location.reload()
            }
         } else {
            this.warning="Já existe uma atividade com esse nome!"
         }
      },

      removeActivity(variable){
         if (confirm("Tem a certeza que pretende remover esta atividade?")) {
            if (this.getLoggedUser.typeUser=="Tutor") {
               this.SET_REMOVE_ACTIVITY(variable)
               this.SET_REMOVE_ACTIVITY_FROM_KID(variable)
            } else {
               this.SET_REMOVE_ACTIVITY(variable)
               this.resetActivitiesInStudents(variable)
            }
         }
      },

      modalEditOpen(variable){
         this.modalActivityDo='editactivity'
         this.editActivity=variable
      },

      applyChangesActivity(){
         this.editActivity.author=this.getLoggedUser.username
         this.SET_EDIT_ACTIVITY(this.editActivity)
      },
      
      openModal(variable){
         this.modalDo="viewgame"
         this.activityName = variable
      },

      newClassView(){
         this.classesView.push("")
      },

      defineVisibility(){
         if (this.classesView.lenght>1) {
            this.classesView.pop()
         }
         
         this.resetActivitiesInStudents(this.activityName)
         for (let i = 0; i < this.classesView.length; i++) {
            let team = this.classesView[i];
            for (let a = 0; a < this.getTeamStudents(team).length; a++) {
               let student1 = this.getTeamStudents(team)[a].usernameStudent
               this.data= {studentName:student1,activity:this.activityName}
               this.SET_ADD_ACTIVITY_TO_CLASS(this.data)
            }
         }   
         
         
      },

      resetActivitiesInStudents(variable){
         for (let i = 0; i < this.getTeacherClasses.length; i++) {
            let team = this.getTeacherClasses[i].name
            for (let a = 0; a < this.getTeamStudents(team).length; a++) {
               let student1 = this.getTeamStudents(team)[a].usernameStudent
               let data2= {studentName:student1,activity:variable}
               this.SET_REMOVE_ACTIVITY_FROM_CLASS(data2)
               
            }
         }
      },

   },
};
</script>

<style>
  #backgroundActivitiesP {
  width: 100%;
  min-height: 100vh;
  background: url("../assets/Grupo 6.svg");
  background-size: 1525px auto;
}
</style>