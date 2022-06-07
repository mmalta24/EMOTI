<template>
   <div id="backgroundProfile">
     <b-container class="col-11 pt-4">
        <h2 :style="{color:'#e87461',fontFamily:'EAmbit SemiBold'}">Dados Pessoais</h2>
        
        <div class="row col-12">
          <div class="col-2 d-flex flex-row justify-content-center align-items-center">
            <b-avatar v-if="getUser.imgProfile==''" :style="{color:'#FDFDED','background-color':'#BFBFBF',width:'230px',height:'190px'}"></b-avatar>
            <img v-else :src="getUser.imgProfile" :style="{width:'220px',height:'220px','border-radius':'100%'}" alt="">
            <b-button style="position:absolute;z-index:1;right:5px;bottom:50px;background-color:#e87461;border:none" pill size="sm" v-b-modal.modal-profile @click="whatModalDo='changePicture'"><span class="material-icons-round" style="display:flex;justify-content:center" >mode_edit</span></b-button>
          </div>
          <div class="col-5">
            <b-form>
              <b-form-group label="Nome:" label-for="nested-street" label-cols-sm="4" label-align-sm="left">
                <b-form-input id="nested-street" v-model="getUser.name" disabled></b-form-input>
              </b-form-group>
              <b-form-group label="Username:" label-for="nested-street" label-cols-sm="4" label-align-sm="left">
                <b-form-input id="nested-street" disabled v-model="getUser.username"></b-form-input>
              </b-form-group>
              <b-form-group label="Password:" label-for="nested-street" label-cols-sm="4" label-align-sm="left">
                <b-form-input id="nested-street" disabled v-model="getUser.password"></b-form-input>
              </b-form-group>
               <b-form-group label="Email:" label-for="nested-street" label-cols-sm="4" label-align-sm="left">
                <b-form-input id="nested-street" disabled v-model="getUser.email"></b-form-input>
              </b-form-group>
              <b-form-group label="Tipo de Utilizador:" label-for="nested-street" label-cols-sm="4" label-align-sm="left">
                <b-form-input id="nested-street" disabled v-model="getUser.typeUser"></b-form-input>
              </b-form-group>
            </b-form>
          </div>
          <div class="col-7 d-flex flex-row justify-content-end" >
            <b-button :style="{color:'#fdfdf3','background-color':'#e87461',border:'none'}" v-b-modal.modal-profile @click="whatModalDo='changekey'">Alterar Passsword</b-button>
          </div>

        </div>

         <b-modal id="modal-profile" centered hide-footer header-border-variant="0" header-class="color" body-class="color">

             <!--Formulário para alterar password-->
             <div :style="{fontFamily:'EAmbit SemiBold'}" class="text-center" v-if="whatModalDo=='changekey'">
               <h4 :style="{color:'#e87461'}">Alterar Password</h4>

               <b-form @submit.prevent="changePassword()">
                 <b-form-group label-cols="4" label-cols-lg="4" label-size="sm" label-align-sm="left" label="Password Atual:" label-for="input-sm" class="mt-4 mb-4">
                    <b-form-input type="password" id="input-sm" v-model="passForm.oldPass" required></b-form-input>
                 </b-form-group>

                 <b-form-group label-cols="4" label-cols-lg="4" label-size="sm" label-align-sm="left" label="Nova Password:" label-for="input-sm" class="mt-4 mb-4">
                    <b-form-input type="password" id="input-sm" v-model="passForm.newPass" required></b-form-input>
                 </b-form-group>

                 <b-form-group label-cols="4" label-cols-lg="4" label-size="sm" label-align-sm="left" label="Conf. Nova Password:" label-for="input-sm" class="mt-4 mb-4">
                    <b-form-input type="password" id="input-sm" v-model="passForm.confPass" required></b-form-input>
                 </b-form-group>
                 <div class="d-flex flex-row justify-content-end">
                  <b-button type="submit" class="text-end" :style="{color:'#fdfdf3','background-color':'#e87461',border:'none'}">Alterar</b-button>
                  </div>
                  <div v-if="warning!=''" :style="{'background-color':'#C82333',color:'#fdfdf3','border-radius':'4px'}">
                    <p>{{warning}}</p>
                  </div>
               </b-form>
             </div>

             <!--Associar Criança-->
              <div :style="{fontFamily:'EAmbit SemiBold'}" class="text-center" v-if="whatModalDo=='addkid'">
                <h4 :style="{color:'#e87461'}">Associar Criança</h4>

                <b-form @submit.prevent="addChild()">
                 <b-form-group label-cols="4" label-cols-lg="4" label-size="sm" label-align-sm="left" label="Username (Criança):" label-for="input-sm" class="mt-4 mb-4">
                    <b-form-input  id="input-sm" v-model="formAdd.childName" required></b-form-input>
                 </b-form-group>

                 <b-form-group label-cols="4" label-cols-lg="4" label-size="sm" label-align-sm="left" label="Password (Criança):" label-for="input-sm" class="mt-4 mb-4">
                    <b-form-input type="password" id="input-sm" v-model="formAdd.childPass" required></b-form-input>
                 </b-form-group>

                 <div class="d-flex flex-row justify-content-end">
                   <b-button type="submit" class="text-end" :style="{color:'#fdfdf3','background-color':'#e87461',border:'none'}">Associar</b-button>
                 </div>
                 <div v-if="warning!=''" :style="{'background-color':'#C82333',color:'#fdfdf3','border-radius':'4px'}">
                   <p>{{warning}}</p>
                 </div>
                </b-form>

                

              </div>

              <!--Pedidos para associar-->
                <div :style="{fontFamily:'EAmbit SemiBold'}" class="text-center d-flex flex-column align-items-center" v-if="whatModalDo=='intoclass'">
                    <h4 :style="{color:'#e87461'}">Pedidos para associar</h4>

                     <table class="col-12 mt-3 ml-4 mr-4 mb-3 text-center">
                        <tr :style="{'background-color':'#e87461',color:'#fbfbf3'}">
                            <th class="p-1">Turma</th>
                            <th>Professor</th>
                            <th>Ações</th>
                        </tr>
                        <tr :style="{'border-bottom':'2px solid #707070'}" v-for="(request,index) in getUser.classRequests" :key="index">
                            <td class="p-4">{{request.className}}</td>
                            <td>{{request.teacherName}}</td>
                            <td><b-button size="sm" style="background-color:#4DA1A9;border:none" class=" ml-2 mr-1" @click="acceptRequest(request)"><span class="material-icons-round">done</span></b-button>
                            <b-button variant="danger" size="sm" style="border:none;" class=" ml-1 mr-2" @click="removeRequest(request)"><span class="material-icons-round">close</span></b-button></td>
                        </tr>
                     </table>
                </div>

              <!--Alterar imagem-->

              <div :style="{fontFamily:'EAmbit SemiBold'}" class="text-center" v-if="whatModalDo=='changePicture'">
                <h4 :style="{color:'#e87461'}">Alterar Foto</h4>

                <b-form @submit="alterImg()">
                 <b-form-group label-cols="4" label-cols-lg="4" label-size="sm" label-align-sm="left" label="Nova Imagem (URL):" label-for="input-sm" class="mt-4 mb-4">
                    <b-form-input  id="input-sm" v-model="newImg" required></b-form-input>
                 </b-form-group>

                 <div class="d-flex flex-row justify-content-end">
                   <b-button type="submit" class="text-end" :style="{color:'#fdfdf3','background-color':'#e87461',border:'none'}">Alterar</b-button>
                 </div>

                </b-form>

              </div>


           </b-modal>

           <!--Parte vivível para os pais-->
          <div class="row col-12 mt-5" v-if="getUser.typeUser == 'Tutor'">
             <div class="col-6"><h2 :style="{color:'#e87461',fontFamily:'EAmbit SemiBold'}">Dados da Criança</h2></div>
             <div class="col-6 d-flex flex-row justify-content-end" v-if="getUsernameChild==''"><b-button class="h-75" :style="{'background-color':'#e87461',border:'none',color:'#fdfdf3'}" @click="whatModalDo='addkid'" v-b-modal.modal-profile>Associar criança</b-button></div>
             <div class="col-6 d-flex flex-row justify-content-end" v-else><b-button class="h-75" :style="{'background-color':'#e87461',border:'none',color:'#fdfdf3'}" @click="removeRelation()">Desassociar criança</b-button></div>

             <div v-if="getUser.child != null" class="col-12 row"> <!-- Div if-->
             <div class="col-2 d-flex flex-row justify-content-center align-items-start mt-5">
                 <b-avatar v-if="getAssociatedChild.imageProfile==''" :style="{color:'#FDFDED','background-color':'#BFBFBF',width:'230px',height:'190px'}"></b-avatar>
                <img v-else :src="getAssociatedChild.imageProfile" :style="{width:'220px',height:'220px','border-radius':'100%'}" alt="">
             </div>
             <div class="col-5 mt-5">
              <b-form>
              <b-form-group label="Nome:" label-for="nested-street" label-cols-sm="4" label-align-sm="left">
                <b-form-input id="nested-street" v-model="getAssociatedChild.name" disabled></b-form-input>
              </b-form-group>
              <b-form-group label="Username:" label-for="nested-street" label-cols-sm="4" label-align-sm="left">
                <b-form-input id="nested-street" disabled v-model="getAssociatedChild.username"></b-form-input>
              </b-form-group>
              <b-form-group label="Password:" label-for="nested-street" label-cols-sm="4" label-align-sm="left">
                <b-form-input id="nested-street" disabled v-model="getAssociatedChild.password"></b-form-input>
              </b-form-group>
               <b-form-group label="Email:" label-for="nested-street" label-cols-sm="4" label-align-sm="left">
                <b-form-input id="nested-street" disabled v-model="getAssociatedChild.email"></b-form-input>
              </b-form-group>
              <b-form-group label="Tipo de Utilizador:" label-for="nested-street" label-cols-sm="4" label-align-sm="left">
                <b-form-input id="nested-street" disabled v-model="getAssociatedChild.typeUser"></b-form-input>
              </b-form-group>       
              </b-form>
            </div>
            <div class="col-5"></div>

            <div class="col-2"></div>

            <div class="col-10 d-flex flex-row justify-content-between" >

              <label  label-cols-sm="4" label-align-sm="left">Turmas: </label>

              <table class="col-10 ml-2 mr-2 text-center">
                  <tr :style="{'background-color':'#e87461',color:'#fbfbf3'}">
                      <th class="p-1">Turma</th>
                      <th>Professor</th>
                      <th>Ações</th>
                  </tr>
                  <tr :style="{'border-bottom':'2px solid #707070'}" v-for="(team,index) in getChildTeams" :key="index">
                      <td class="p-4">{{team.name}}</td>
                      <td>{{team.teacher}}</td>
                      <td><b-button variant="danger" @click="removeKidFromClass(team)"><b-icon icon="trash-fill"></b-icon> Anular</b-button></td>
                  </tr>
              </table>

            </div>

            <div class="col-12 mt-4 pb-5 d-flex flex-row justify-content-end" >
              <b-button :style="{color:'#fdfdf3','background-color':'#e87461',border:'none'}" v-b-modal.modal-profile @click="whatModalDo='intoclass'" >Pedidos para Associar</b-button>
            </div>
            </div>

            <div class="mt-5 col-12 d-flex flex-row justify-content-center" v-if="getUser.child == null"> <!--Não associou a criança-->
              <p>Não existe criança associada, a este perfil</p>
            </div>

          </div>
    </b-container>
  </div>
</template>

<script>
import { mapGetters, mapMutations,mapActions } from "vuex";
export default {
  data() {
    return {
      warning:'',
      whatModalDo:"",
      passForm:{
        oldPass:"",
        newPass:"",
        confPass:""
      },
      formAdd:{
        childName:"",
        childPass:""
      },
      newImg:"",
      
    };
  },

  computed: {
    ...mapGetters(["getLoggedUser","getAssociatedChild","isUserChild","isChildFree","getChildTeams","getUser","getUsernameChild"]),
  },

  methods: {
    ...mapActions(["find_ap","updateUser_ap","createRelation_ap","findRelations_ap","removeRelation_ap"]),
    ...mapMutations(["SET_REMOVE_REQUEST","SET_ACCEPT_REQUEST","SET_REMOVE_KID_FROM_CLASS"]),

    changePassword(){
        if (this.passForm.newPass != this.passForm.confPass) {
          this.warning="A password que pretende colocar não corresponde a confirmação! Tente novamente."
        } else {
          this.updateUser_ap([this.getLoggedUser.username,{password:this.passForm.newPass}])
          .then(()=>{location.reload()})
          .catch((err)=>this.warning=`${err}`)
          
        }
      },

    addChild() {
        this.createRelation_ap({usernameChild:this.formAdd.childName,password:this.formAdd.childPass})
          .then(()=>{location.reload()})
          .catch((err)=>this.warning=`${err}`)
    },

    removeRelation(){
      if (confirm("Deseja mesmo desassociar esta criança?")) {
         this.removeRelation_ap({usernameChild:this.getUsernameChild})
          .then(()=>{location.reload()})
          .catch((err)=>alert(err))
      }
    },

    removeRequest(request){
      if (confirm("Quer eliminar este pedido?")) {
        this.SET_REMOVE_REQUEST(request)
      }
    },

    acceptRequest(request){
      if (confirm("Quer aceitar este pedido?")) {
        this.SET_ACCEPT_REQUEST(request)
        this.SET_REMOVE_REQUEST(request)
      }
    },

    removeKidFromClass(team){
      if (confirm("Quer remover a criança desta turma?")) {
        this.SET_REMOVE_KID_FROM_CLASS(team)
      }
    },

    alterImg(){
          this.updateUser_ap({imgProfile:this.newImg})
          .then(()=>{location.reload()})
          .catch((err)=>this.warning=`${err}`)
    }

  },

  created () {
    this.find_ap(this.getLoggedUser.username)
    this.findRelations_ap();
  },
  
}
</script>

<style>
  #backgroundProfile {
  width: 100%;
  min-height: 100vh;
  background: url("../assets/Grupo 6.svg");
  background-size: 1525px auto;
  background-repeat: repeat;

  }
</style>