<template>
  <div id="backgroundW" class="d-flex align-items-center">
    <b-container class="col-12 d-flex flex-row justify-content-between pl-5 pr-2">
      <div class="col-4 d-flex flex-column align-items-center justify-content-around pt-2">
        <img src="../assets/logo2.png" width="400px" alt="" />
        
        <div class="mt-3 text-center">
          <h5 style="font-size: 25px;font-family: EAmbit SemiBold">
            Olá queres brincar e aprender ao mesmo tempo ?
          </h5>
          <p style="font-size: 20px">
            Não te preocupes! Estás no sítio certo,para além disso, os teus pais
            e professores podem juntarem-se a ti, nesta aventura!
          </p>
        </div>
        
        <div class="w-75 d-flex flex-row justify-content-around pt-2">
          <b-button @click="whatDo = 'login'" size="lg" style="width: 40%;background-color: #e87461;border: #e87461;font-family: EAmbit SemiBold;" v-b-modal.modal-center>Entrar</b-button>
          <b-button @click="whatDo = 'register'" size="lg" style="width: 40%;background-color: #fdfdf3;border: 1px solid #e87461;color: #e87461;font-family: EAmbit SemiBold;" v-b-modal.modal-center>Registar</b-button>
        </div>

      </div>

      <div class="col-7">
        <img src="../assets/foto_capa.png" width="720px" alt="" />
      </div>

      <b-modal id="modal-center" centered hide-footer header-border-variant="0" header-class="color" body-class="color">
        <div v-if="whatDo == 'login'" style="font-family: EAmbit Regular;color:#e87461" class="text-center">
           <h3 class="mt-2 mb-4" :style="{ fontFamily:'EAmbit SemiBold'}">Autenticar</h3>

          <b-form action="" @submit.prevent="login">

            <b-input-group class="mb-4">
              <b-input-group-prepend is-text>
                <span class="material-icons-round">badge</span>
              </b-input-group-prepend>
              <b-form-input v-model="formLogin.username" placeholder="Username" style="background-color: #fdfdf3" required></b-form-input>
            </b-input-group>

            <b-input-group class="mb-4">
              <b-input-group-prepend is-text>
                <span class="material-icons-round">lock</span>
              </b-input-group-prepend>
              <b-form-input type="password" v-model="formLogin.password" placeholder="Password" style="background-color: #fdfdf3" required></b-form-input>
            </b-input-group>

            <div class="d-flex flex-row justify-content-end">
              <b-button type="submit" style="background-color: #e87461; color: #fdfdf3; border: none" class="mb-2 w-25">Entrar</b-button>
            </div>

          </b-form>
        </div>

        <div v-else style="font-family: EAmbit Regular; color: #e87461" class="text-center">
          <h3 class="mt-3 mb-4" :style="{ fontFamily:'EAmbit SemiBold'}">Registar</h3>

          <b-form action="" @submit.prevent="register">
            <b-input-group class="mb-4">
              <b-input-group-prepend is-text>
                <span class="material-icons-round">badge</span>
              </b-input-group-prepend>
              <b-form-input v-model="formRegister.username" placeholder="Username" style="background-color: #fdfdf3" required></b-form-input>
            </b-input-group>

            <b-input-group class="mb-4">
              <b-input-group-prepend is-text>
                <span class="material-icons-round">lock</span>
              </b-input-group-prepend>
              <b-form-input type="password" v-model="formRegister.password" placeholder="Password" style="background-color: #fdfdf3" required></b-form-input>
            </b-input-group>

            <b-input-group class="mb-4">
              <b-input-group-prepend is-text>
                <span class="material-icons-round">lock</span>
              </b-input-group-prepend>
              <b-form-input type="password" v-model="c_password" placeholder="Confirmar Password" style="background-color: #fdfdf3" required></b-form-input>
            </b-input-group>

            <b-input-group class="mb-4">
              <b-input-group-prepend is-text>
                <span class="material-icons-round">person</span>
              </b-input-group-prepend>
              <b-form-input v-model="formRegister.name" placeholder="Nome" style="background-color: #fdfdf3" required></b-form-input>
            </b-input-group>

            <b-input-group class="mb-4">
              <b-input-group-prepend is-text>
                <span class="material-icons-round">send</span>
              </b-input-group-prepend>
              <b-form-input type="email" v-model="formRegister.email" placeholder="Email" style="background-color: #fdfdf3" required></b-form-input>
            </b-input-group>

            <b-input-group class="mb-5">
              <b-input-group-prepend is-text>
                <span class="material-icons-round">person_search</span>
              </b-input-group-prepend>
              <b-form-select v-model="formRegister.typeUser" required style="background-color: #fdfdf3">
                <b-form-select-option :value="null" disabled>Quem sou eu ?</b-form-select-option>
                <b-form-select-option v-for="(option, index) in options" :key="index" :value="option">{{ option }}</b-form-select-option>
              </b-form-select>
            </b-input-group>
            <div class="d-flex flex-row justify-content-end">
              <b-button type="submit" style="background-color: #e87461; color: #fdfdf3; border: none" class="mb-2 w-25">Registar</b-button>
            </div>
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
      whatDo: "",
      options: ["Criança", "Tutor", "Professor"],
      c_password:"",
      form:{},
      formRegister:{
        username:"",
        password:"",
        name:"",
        email:"",
        typeUser:null
      },
      formLogin:{
        username:"",
        password:""
      }
    };
  },

  computed: {
    ...mapGetters(["isUser","isUsernameAvailable"]),
  },

  methods: {
    login() {
      if (this.isUser(this.formLogin.username, this.formLogin.password)) {
        this.SET_LOGGED_USER(this.formLogin.username);
        this.$router.push({ name: "Home" });
      } else {
        alert("username ou password incorretos! por favor tente novamente.");
      }
    },

    register() {
      if (this.isUsernameAvailable(this.formRegister.username)) {
        if (this.formRegister.password === this.c_password) {
          if (this.formRegister.typeUser == "Tutor") {
            this.form = {
              username: this.formRegister.username,
              password: this.formRegister.password,
              name: this.formRegister.name,
              email: this.formRegister.email,
              typeUser: this.formRegister.typeUser,
              imageProfile:'',
              child: null,
              blocked: false,

            }
            this.SET_NEW_USER(this.form);
            this.SET_LOGGED_USER(this.formRegister.username);
            this.$router.push({ name: "Home" });
          } else if(this.formRegister.typeUser == "Professor"){
            this.form = {
              username: this.formRegister.username,
              password: this.formRegister.password,
              name: this.formRegister.name,
              email: this.formRegister.email,
              typeUser: this.formRegister.typeUser,
              blocked: false,
            }
            this.SET_NEW_USER(this.form);
            this.SET_LOGGED_USER(this.formRegister.username);
            this.$router.push({ name: "Home" });
          }else{   //Criança
            this.form = {
              username: this.formRegister.username,
              password: this.formRegister.password,
              name: this.formRegister.name,
              email: this.formRegister.email,
              imageProfile:'',
              typeUser: this.formRegister.typeUser,
              tutor:null,
              activitiesSugest:[{
                sugestFor:'Tutor',
                activities:[]
              },
              {
                sugestFor:'Professor',
                activities:[]
              }], 
              badgesId:[],
              history:[],
              points:0,
              blocked:false,
            }
            this.SET_NEW_USER(this.form);
            this.SET_LOGGED_USER(this.formRegister.username);
            this.$router.push({ name: "Home" });
          }
        } else {
          alert("A palavra-passe é diferente da confirmação! Por favor tenta outra vez.");
        }  
      } else {
        alert("Este nome já existe! Por favor escolha outro.");
      }
    },

    ...mapMutations(["SET_LOGGED_USER","SET_NEW_USER"]),
  },

};

/*

*/

</script>

<style>
#backgroundW {
  width: 100vw;
  height: 100vh;
  background: url(../assets/wallpaper1.svg);
  background-size: 1540px auto;
}
.color{
  background-color:#fdfdf3
}
</style>
