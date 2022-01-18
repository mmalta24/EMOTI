<template>
   <div id="backgroundClass">
     <b-container class="col-11 pt-4">
       <div class="col-12 row">

         <div class="col-7" style="border-right:2px solid #BFBFBF">
           <div class="col-12 d-flex flex-row justify-content-between align-items-center">
              <h4 :style="{color:'#e87461',fontFamily:'EAmbit SemiBold'}">Alunos</h4>
              <b-button :style="{color:'#fdfdf3','background-color':'#e87461',border:'none'}" v-b-modal.modal-class @click="modalClassDo='addstudent'">Adicionar</b-button>
           </div>

           <div class="col-12 mt-5">
             <b-form inline>
                  <label class="mr-sm-2" for="filterTitle">Nome: </label>
                  <b-form-input id="filterTitle" class="mb-2 mr-sm-5 mb-sm-0 col-5" :style="{'background-color':'#fdfdf3'}"></b-form-input>

                  <label class="mr-sm-2" for="filterLevel">Turma: </label>
                  <b-form-select id="filterLevel" class="mb-2 mr-sm-0 mb-sm-0 col-3"  :style="{'background-color':'#fdfdf3'}"></b-form-select>
             </b-form>
           </div>

           <div class="col-12 mt-5">
                <table class="col-12 text-center">
                  <tr :style="{'background-color':'#e87461',color:'#fbfbf3'}">
                      <th class="p-1">Username</th>
                      <th>Nome</th>
                      <th>Turma</th>
                      <th>Ações</th>
                  </tr>
                  <tbody v-for="(team,index) in getTeacherClasses" :key="index">
                    <tr :style="{'border-bottom':'2px solid #707070'}" v-for="(student,index) in team.students" :key="index">
                      <td class="p-4">{{student.usernameStudent}}</td>
                      <td>{{student.nameStudent}}</td>
                      <td>{{team.name}}</td>
                      <td><b-button style="border:none" class=" ml-2 mr-1" v-b-modal.modal-class @click="openEditor(student,team.name)"><b-icon icon="pencil-fill"></b-icon></b-button><b-button style="border:none" variant="danger" class=" ml-2 mr-1" @click="removeStudent(student.usernameStudent)"><b-icon icon="trash-fill"></b-icon></b-button></td>
                    </tr>
                  </tbody>
                </table>
           </div>

         </div>
         <div class="col-5">
           <div class="col-12 d-flex flex-row justify-content-between align-items-center">
              <h4 :style="{color:'#e87461',fontFamily:'EAmbit SemiBold'}">Turmas</h4>
              <b-button :style="{color:'#fdfdf3','background-color':'#e87461',border:'none'}" v-b-modal.modal-class @click="modalClassDo='addclass'">Adicionar</b-button>
           </div>

           <div class="col-12 mt-5">
              <table class="col-12 text-center">
                  <tr :style="{'background-color':'#e87461',color:'#fbfbf3'}">
                      <th class="p-1">ID</th>
                      <th>Nome</th>
                      <th>Ações</th>
                  </tr>
                  <tr :style="{'border-bottom':'2px solid #707070'}" v-for="(team, index) in getTeacherClasses" :key="index">
                      <td class="p-4">{{index+1}}</td>
                      <td>{{team.name}}</td>
                      <td><b-button style="border:none" variant="danger" class=" ml-2 mr-1" @click="removeClass(team.name)"><b-icon icon="trash-fill"></b-icon></b-button></td>
                  </tr>
                </table>
           </div>
         </div>
       </div>
     </b-container>

      <b-modal id="modal-class" centered hide-footer header-border-variant="0" header-class="color" body-class="color" scrollable>
        <div :style="{fontFamily:'EAmbit SemiBold'}" class="text-center" v-if="modalClassDo=='addstudent'">
          <h4 :style="{color:'#e87461'}">Novo Aluno</h4>

          <b-form @submit="addStudent()">
             <b-form-group label-cols="3" label-cols-lg="3" label-size="sm" label-align-sm="left" label="Username:" label-for="input-sm" class="mt-4 mb-4">
                    <b-form-input id="input-sm" v-model="studentUsername" required @change="getStudentInfo()"></b-form-input>
             </b-form-group>

             <b-form-group label-cols="3" label-cols-lg="3" label-size="sm" label-align-sm="left" label="Nome:" label-for="input-sm" class="mt-4 mb-4">
                    <b-form-input id="input-sm" required disabled v-model="studentName"></b-form-input>
             </b-form-group>

             <b-form-group label-cols="3" label-cols-lg="3" label-size="sm" label-align-sm="left" label="Tutor:" label-for="input-sm" class="mt-4 mb-4">
                    <b-form-input id="input-sm" disabled v-model="studentTutor"></b-form-input>
             </b-form-group>

             <b-form-group label-cols="3" label-cols-lg="3" label-size="sm" label-align-sm="left" label="Turma:" label-for="input-sm" class="mt-4 mb-4">
                    <b-form-select id="input-sm" required v-model="teamToAdd" >
                      <b-form-select-option v-for="(team,index) in getTeacherClasses" :key="index" :value="team.name">
                        {{team.name}}
                      </b-form-select-option>
                    </b-form-select>
             </b-form-group>
             <div class="d-flex flex-row justify-content-end"><b-button type="submit" :style="{color:'#fdfdf3','background-color':'#e87461',border:'none'}">Adicionar</b-button></div>
          </b-form>

          
     
        </div>

        <!--Editar Aluno-->
        <div :style="{fontFamily:'EAmbit SemiBold'}" class="text-center" v-if="modalClassDo=='editstudent'">
          <h4 :style="{color:'#e87461'}">Editar Aluno</h4>

          <b-form @submit="makeChanges()">
             <b-form-group label-cols="3" label-cols-lg="3" label-size="sm" label-align-sm="left" label="Username:" label-for="input-sm" class="mt-4 mb-4">
                    <b-form-input id="input-sm" required disabled v-model="studentInfo.usernameStudent"></b-form-input>
             </b-form-group>

             <b-form-group label-cols="3" label-cols-lg="3" label-size="sm" label-align-sm="left" label="Nome:" label-for="input-sm" class="mt-4 mb-4">
                    <b-form-input id="input-sm" required disabled v-model="studentInfo.nameStudent"></b-form-input>
             </b-form-group>

             <b-form-group label-cols="3" label-cols-lg="3" label-size="sm" label-align-sm="left" label="Tutor:" label-for="input-sm" class="mt-4 mb-4">
                    <b-form-input id="input-sm" required disabled v-model="studentInfo.tutorStudent"></b-form-input>
             </b-form-group>

             <b-form-group label-cols="3" label-cols-lg="3" label-size="sm" label-align-sm="left" label="Turma:" label-for="input-sm" class="mt-4 mb-4">
                    <b-form-select id="input-sm" required v-model="studentInfo.team"  >  
                      <b-form-select-option v-for="(team,index) in getTeacherClasses" :key="index" :value="team.name">
                        {{team.name}}
                      </b-form-select-option>
                    </b-form-select>
             </b-form-group>

            <div class="d-flex flex-row justify-content-end"><b-button type="submit" :style="{color:'#fdfdf3','background-color':'#e87461',border:'none'}">Alterar</b-button></div>
          </b-form>

        </div>

        <!--Adicionar turma-->
        <div :style="{fontFamily:'EAmbit SemiBold'}" class="text-center" v-if="modalClassDo=='addclass'">
           <h4 :style="{color:'#e87461'}">Adicionar Turma</h4>

           <b-form @submit="addClass()">
             <b-form-group label-cols="3" label-cols-lg="3" label-size="sm" label-align-sm="left" label="Nome:" label-for="input-sm" class="mt-4 mb-4">
                    <b-form-input id="input-sm" v-model="className" required ></b-form-input>
             </b-form-group>

             <div class="d-flex flex-row justify-content-end"><b-button type="submit" :style="{color:'#fdfdf3','background-color':'#e87461',border:'none'}">Adicionar</b-button></div>
          
           </b-form>
        </div>
      </b-modal>
  </div>
</template>

<script>



import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      modalClassDo: '',
      classForm:{},
      className: '',
      studentUsername: '',
      studentName: '',
      studentTutor: null,
      teamToAdd:'',
      student: {},
      studentInfo: {},
      
    };
  },

  computed: {
    ...mapGetters(["getLoggedUser","getClassInfo","isClassOccupied","getTeacherClasses","getStudent","CheckInTeams","getAprovedStudents"]),

  },

  methods: {
    ...mapMutations(["SET_NEW_CLASS","SET_REMOVE_CLASS","SET_NEW_STUDENT","ALTER_STUDENT_INFO","REMOVE_STUDENT_CLASS","ALTER_STUDENT_CLASS"]),

    addClass(){
      if (!this.isClassOccupied(this.className)) {
        this.classForm={
          name: this.className,
          teacher: this.getLoggedUser.username,
          requests:[],
          students: []
        }
        this.SET_NEW_CLASS(this.classForm)
      } else {
        alert("Este nome já pertence a uma das suas turmas!")
      }
      
    },

    removeClass(teamName){
      if (confirm("Pretende mesmo eliminar esta turma? Esta ação não pode ser desfeita!")) {
        this.SET_REMOVE_CLASS(teamName)
      }
    },

    getStudentInfo(){
      if (!this.getStudent(this.studentUsername)) {
        alert("O utilizador não pode ser encontrado!")
        this.studentName=""
        this.studentTutor=null
      }else{
        let result = this.getStudent(this.studentUsername)
        this.studentName=result.name
        this.studentTutor=result.tutor
        if (this.studentTutor=="null") {
          this.studentTutor=null
        }
      }
      
    },

    addStudent(){
      if (this.studentTutor === null) {
        alert("A criança não pode ser associada!")
      } else {
        if (this.CheckInTeams(this.studentUsername)) {
          alert("Esta criança já pertence a uma das suas turmas!")
        } else {
          this.student={
            teamName: this.teamToAdd,
            username: this.studentUsername,
            tutorStudent: this.studentTutor,
            name: this.studentName,
          }
          this.SET_NEW_STUDENT(this.student)
        }
      }    
    },

    openEditor(student,teamName){
      this.modalClassDo='editstudent'
      this.studentInfo={
        usernameStudent: student.usernameStudent,
        nameStudent: student.nameStudent,
        tutorStudent: student.tutorStudent,
        team: teamName
      }
    },

    makeChanges(){
      this.ALTER_STUDENT_CLASS(this.studentInfo);
    },

    removeStudent(username){
      if (confirm("Deseja mesmo eliminar este aluno?")) {
        this.REMOVE_STUDENT_CLASS(username)
      }
      
    },






  },

  
}
</script>

<style>
  #backgroundClass {
  width: 100%;
  min-height: 100vh;
  background: url("../assets/Grupo 6.svg");
  background-size: 1525px auto;
}
</style>