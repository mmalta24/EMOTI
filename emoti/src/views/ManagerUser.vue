<template>
   <div id="backgroundManagerUser">
     <b-container class="col-11 pt-4">
         <div class="col-12" :style="{color:'#e87461',fontFamily:'EAmbit SemiBold'}"><h2>Gerir</h2></div>

         <div class="col-12 mt-4">
              <b-form inline >
                  <label class="mr-sm-2" for="filterTitle">Nome: </label>
                  <b-form-input id="filterTitle" class="mb-2 mr-sm-5 mb-sm-0 col-3" :style="{'background-color':'#fdfdf3'}" v-model="formFilter.name"></b-form-input>

                  <label class="mr-sm-2" for="filterLevel">Tipo: </label>
                  <b-form-select id="filterLevel" class="mb-2 mr-sm-0 mb-sm-0 col-2"  :style="{'background-color':'#fdfdf3'}" v-model="formFilter.typeUser">
                    <b-form-select-option value="">Qualquer</b-form-select-option>
                    <b-form-select-option :value="type" v-for="(type,index) in typeUsers" :key="index">{{type}}</b-form-select-option>
                  </b-form-select>
             </b-form>
         </div>

         <div class="col-12 d-flex flex-row justify-content-end mt-4">
             <b-button :style="{color:'#fdfdf3','background-color':'#e87461',border:'none'}" v-b-modal.modalManagerUser @click="modalUserDo='adduser'">Adicionar</b-button>
         </div>

         <div class="col-12 mt-2">
              <table class="col-12 text-center">
                  <tr :style="{'background-color':'#e87461',color:'#fbfbf3'}">
                      <th class="p-1">Username</th>
                      <th>Nome</th>
                      <th>Password</th>
                      <th>Tipo de Utilizador</th>
                      <th>Ações</th>
                  </tr>
                  <tr :style="{'border-bottom':'2px solid #707070'}" v-for="(user, index) in filterUsers" :key="index">
                      <td class="p-4">{{user.username}}</td>
                      <td>{{user.name}}</td>
                      <td>{{user.password}}</td>
                      <td>{{user.typeUser}}</td>
                      <td><b-button style="border:none" variant="secondary" class=" ml-2 mr-1" v-b-modal.modalManagerUser @click="giveInfo(user)"><b-icon icon="info-circle-fill"></b-icon></b-button>
                      <b-button style="border:none" variant="primary" class=" ml-2 mr-1" v-if="user.blocked==false" @click="CHANGE_STATE_USER({username:user.username,logic:true})"><b-icon icon="lock-fill"></b-icon></b-button>
                      <b-button style="border:none" variant="primary" class=" ml-2 mr-1" v-if="user.blocked==true" @click="CHANGE_STATE_USER({username:user.username,logic:false})"><b-icon icon="unlock-fill"></b-icon></b-button>
                      <b-button style="border:none" variant="danger" class=" ml-2 mr-1" v-if="user.typeUser!='Administrador'" @click="removeUser(user)"><b-icon icon="trash-fill"></b-icon></b-button>
                      
                      </td>
                  </tr>
             </table>
         </div>
     </b-container>

      <b-modal id="modalManagerUser" centered hide-footer header-border-variant="0" header-class="color" body-class="color">
        <div :style="{fontFamily:'EAmbit SemiBold'}" class="text-center"  v-if=" modalUserDo=='adduser'">
          <h4 :style="{color:'#e87461'}">Adicionar utilizador</h4>

          <b-form @submit.prevent="addAdmin">
             <b-input-group class="mb-4 mt-4">
              <b-input-group-prepend is-text>
                <span class="material-icons-round">badge</span>
              </b-input-group-prepend>
              <b-form-input  placeholder="Username" style="background-color: #fdfdf3" v-model="formRegister.username" required></b-form-input>
            </b-input-group>

            <b-input-group class="mb-4">
              <b-input-group-prepend is-text>
                <span class="material-icons-round">lock</span>
              </b-input-group-prepend>
              <b-form-input type="password"  placeholder="Password" style="background-color: #fdfdf3"  v-model="formRegister.password" required></b-form-input>
            </b-input-group>

            <b-input-group class="mb-4">
              <b-input-group-prepend is-text>
                <span class="material-icons-round">lock</span>
              </b-input-group-prepend>
              <b-form-input type="password"  placeholder="Confirmar Password" style="background-color: #fdfdf3" v-model="conf_password" required></b-form-input>
            </b-input-group>

            <b-input-group class="mb-4">
              <b-input-group-prepend is-text>
                <span class="material-icons-round">person</span>
              </b-input-group-prepend>
              <b-form-input  placeholder="Nome" style="background-color: #fdfdf3"  v-model="formRegister.name" required></b-form-input>
            </b-input-group>

            <b-input-group class="mb-4">
              <b-input-group-prepend is-text>
                <span class="material-icons-round">send</span>
              </b-input-group-prepend>
              <b-form-input type="email"  placeholder="Email" style="background-color: #fdfdf3"  v-model="formRegister.email" required></b-form-input>
            </b-input-group>

            <b-input-group class="mb-5">
              <b-input-group-prepend is-text>
                <span class="material-icons-round">person_search</span>
              </b-input-group-prepend>
              <b-form-select required style="background-color: #fdfdf3"  v-model="formRegister.typeUser">
                <b-form-select-option :value="formRegister.typeUser" >Administrador</b-form-select-option>
              </b-form-select>
            </b-input-group>

            <div class="d-flex flex-row justify-content-end">
              <b-button type="submit" style="background-color: #e87461; color: #fdfdf3; border: none" class="mb-2 w-25">Adicionar</b-button>
            </div>

            <div v-if="warning!=''" :style="{'background-color':'#C82333',color:'#fdfdf3','border-radius':'4px'}">
              <p>{{warning}}</p>
            </div>

          </b-form>
     
        </div>

        <div :style="{fontFamily:'EAmbit SemiBold'}" class="text-center" v-if=" modalUserDo=='edituser'">
          <h4 :style="{color:'#e87461'}">Informações</h4>

          <b-form>
             <b-input-group class="mb-4 mt-4">
              <b-input-group-prepend is-text>
                <span class="material-icons-round">badge</span>
              </b-input-group-prepend>
              <b-form-input  placeholder="Username" style="background-color: #fdfdf3" v-model="formInfo.username" disabled required></b-form-input>
            </b-input-group>

            <b-input-group class="mb-4">
              <b-input-group-prepend is-text>
                <span class="material-icons-round">lock</span>
              </b-input-group-prepend>
              <b-form-input type="text"  placeholder="Password" style="background-color: #fdfdf3" v-model="formInfo.password" disabled required></b-form-input>
            </b-input-group>


            <b-input-group class="mb-4">
              <b-input-group-prepend is-text>
                <span class="material-icons-round">person</span>
              </b-input-group-prepend>
              <b-form-input  placeholder="Nome" style="background-color: #fdfdf3" v-model="formInfo.name" required disabled></b-form-input>
            </b-input-group>

            <b-input-group class="mb-4">
              <b-input-group-prepend is-text>
                <span class="material-icons-round">send</span>
              </b-input-group-prepend>
              <b-form-input type="email"  placeholder="Email" style="background-color: #fdfdf3" v-model="formInfo.email" required disabled></b-form-input>
            </b-input-group>

            <b-input-group class="mb-5">
              <b-input-group-prepend is-text>
                <span class="material-icons-round">person_search</span>
              </b-input-group-prepend>
               <b-form-input type="text"  placeholder="TypeUser" style="background-color: #fdfdf3" v-model="formInfo.typeUser" required disabled></b-form-input>
            </b-input-group>

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
      modalUserDo: '',
      userAction: '',
     formRegister:{
       username:'',
       password:'',
       name:'',
       email:'',
       typeUser:'Administrador',
       blocked:false
     },
     warning:'',
     conf_password:'',
     formInfo:'',
     formFilter:{
       name:'',
       typeUser:''
     },
     typeUsers:["Criança", "Tutor", "Professor","Administrador"],
     usersData:''
      
    };
  },

  computed: {
    ...mapGetters(["getUsers","isUsernameAvailable"]),

    filterUsers(){
      return this.usersData.filter((user)=>(user.name==this.formFilter.name || this.formFilter.name=='') && (user.typeUser==this.formFilter.typeUser || this.formFilter.typeUser==''))
    }
  },

  methods: {
    ...mapMutations(["SET_NEW_USER","SET_REMOVE_USER","CHANGE_STATE_USER","REMOVE_TEAMS_TEACHER","SET_REMOVE_RELATION_TUTOR_ADMIN","SET_REMOVE_RELATION_CHILD_ADMIN"]),

    addAdmin(){
      if(this.isUsernameAvailable(this.formRegister.username)){
        if(this.formRegister.password==this.conf_password){
          this.SET_NEW_USER(this.formRegister)
          this.warning=''
          location.reload()
        }
        else{
          this.warning='Aviso! Passwords não coincidem!'
        }
      }
      else{
        this.warning='Aviso! Username já existe!'
      }
    },

    removeUser(user){
       if(confirm('Deseja remover o utilizador?')){
         if(user.typeUser=='Professor'){
            this.REMOVE_TEAMS_TEACHER(user.username)
         }
         else if(user.typeUser=='Tutor'){
            if(user.child!=null){
              this. SET_REMOVE_RELATION_TUTOR_ADMIN(user.child)
            }
         }
         else if(user.typeUser=='Criança'){
            if(user.tutor!=null){
              this. SET_REMOVE_RELATION_CHILD_ADMIN(user.tutor)
            }
         }
         this.SET_REMOVE_USER(user.username)
         location.reload()
       }
     
    },

    giveInfo(user){
      this.modalUserDo='edituser'
      this.formInfo=user
    }
  },
  created () {
    this.usersData=this.getUsers;
  },
  
}

</script>



<style>
  #backgroundManagerUser {
  width: 100%;
  min-height: 100vh;
  background: url("../assets/Grupo 6.svg");
  background-size: 1525px auto;
}
</style>