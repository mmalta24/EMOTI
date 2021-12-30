<template>
   <div id="backgroundHome">
    <b-container class="col-11 pt-4">
      <div style="border:2px solid red">
        <h2 :style="{color:'#e87461',fontFamily:'EAmbit SemiBold'}">Novidades</h2>

        <b-card-group style="border: 2px solid red" class="d-flex flex-row flex-wrap justify-content-between">
        <b-card tag="article" style="max-width: 20vw;background-color:#fbfbf3;border:none;d-flex flex-column" class="mb-2 mr-2">
        <img src="../assets/Imagem 2.png" alt="" style="width:17rem">
        <div class="d-flex flex-row justify-content-between mt-3" style="width:16.5rem">
          <b-card-sub-title class="mb-2"><span style="color:#e87461">Quiz</span></b-card-sub-title>
          <div>
            <b-card-sub-title class="mb-2"><span class="material-icons-round">done</span><span class="material-icons-round">school</span><span class="material-icons-round" style="margin-left:5px">family_restroom</span></b-card-sub-title>
          </div>
        </div>
           <b-card-title :style="{color:'#2B4141',fontFamily:'EAmbit SemiBold',fontSize:'20px'}" class="pb-">Qual é o meu nome?</b-card-title>
        </b-card>

        <b-card tag="article" style="max-width: 20vw;background-color:#fbfbf3;border:none;d-flex flex-column" class="mb-2 mr-2">
        <img src="../assets/Imagem 2.png" alt="" style="width:17rem">
        <div class="d-flex flex-row justify-content-between mt-3" style="width:16.5rem">
          <b-card-sub-title class="mb-2"><span style="color:#e87461">Quiz</span></b-card-sub-title>
          <div>
            <b-card-sub-title class="mb-2"><span class="material-icons-round">done</span><span class="material-icons-round">school</span><span class="material-icons-round" style="margin-left:5px">family_restroom</span></b-card-sub-title>
          </div>
        </div>
           <b-card-title :style="{color:'#2B4141',fontFamily:'EAmbit SemiBold',fontSize:'20px'}" class="pb-">Qual é o meu nome?</b-card-title>
        </b-card>

        <b-card tag="article" style="max-width: 20vw;background-color:#fbfbf3;border:none;d-flex flex-column" class="mb-2 mr-2">
        <img src="../assets/Imagem 2.png" alt="" style="width:17rem">
        <div class="d-flex flex-row justify-content-between mt-3" style="width:16.5rem">
          <b-card-sub-title class="mb-2"><span style="color:#e87461">Quiz</span></b-card-sub-title>
          <div>
            <b-card-sub-title class="mb-2"><span class="material-icons-round">done</span><span class="material-icons-round">school</span><span class="material-icons-round" style="margin-left:5px">family_restroom</span></b-card-sub-title>
          </div>
        </div>
           <b-card-title :style="{color:'#2B4141',fontFamily:'EAmbit SemiBold',fontSize:'20px'}" class="pb-">Qual é o meu nome?</b-card-title>
        </b-card>

        <b-card tag="article" style="max-width: 20vw;background-color:#fbfbf3;border:none;d-flex flex-column" class="mb-2 mr-2">
        <img src="../assets/Imagem 2.png" alt="" style="width:17rem">
        <div class="d-flex flex-row justify-content-between mt-3" style="width:16.5rem">
          <b-card-sub-title class="mb-2"><span style="color:#e87461">Quiz</span></b-card-sub-title>
          <div>
            <b-card-sub-title class="mb-2"><span class="material-icons-round">done</span><span class="material-icons-round">school</span><span class="material-icons-round" style="margin-left:5px">family_restroom</span></b-card-sub-title>
          </div>
        </div>
           <b-card-title :style="{color:'#2B4141',fontFamily:'EAmbit SemiBold',fontSize:'20px'}" class="pb-">Qual é o meu nome?</b-card-title>
        </b-card>
        
        </b-card-group>

        <div class="mt-4" style="border: 2px solid blue" v-if="getLoggedUser.typeUser == 'Criança'">
          <h2 :style="{color:'#e87461',fontFamily:'EAmbit SemiBold'}">Os meus badges</h2>

          <div class="d-flex flex-row flex-wrap justify-content-around">
            <div class="text-center mt-3 ml-5 mr-5">
              <img src="../assets/Grupo 399.png" alt="" :style="{width:'150px'}">
              <b-progress :value="75" show-progress class="mb-3 mt-3" variant="warning"></b-progress>
              <h5 :style="{fontFamily:'EAmbit SemiBold'}">Felicidade</h5>
            </div>

            <div class="text-center mt-3 ml-5 mr-5">
              <img src="../assets/Grupo 399.png" alt="" :style="{width:'150px'}">
              <b-progress :value="75" show-progress class="mb-3 mt-3" variant="warning"></b-progress>
              <h5 :style="{fontFamily:'EAmbit SemiBold'}">Felicidade</h5>
            </div>

            <div class="text-center mt-3 ml-5 mr-5">
              <img src="../assets/Grupo 399.png" alt="" :style="{width:'150px'}">
              <b-progress :value="75" show-progress class="mb-3 mt-3" variant="warning"></b-progress>
              <h5 :style="{fontFamily:'EAmbit SemiBold'}">Felicidade</h5>
            </div>

            <div class="text-center mt-3 ml-5 mr-5">
              <img src="../assets/Grupo 399.png" alt="" :style="{width:'150px'}">
              <b-progress :value="75" show-progress class="mb-3 mt-3" variant="warning"></b-progress>
              <h5 :style="{fontFamily:'EAmbit SemiBold'}">Felicidade</h5>
            </div>

            <div class="text-center mt-3 ml-5 mr-5">
              <img src="../assets/Grupo 399.png" alt="" :style="{width:'150px'}">
              <b-progress :value="75" show-progress class="mb-3 mt-3" variant="warning"></b-progress>
              <h5 :style="{fontFamily:'EAmbit SemiBold'}">Felicidade</h5>
            </div>
            <div class="text-center mt-3 ml-5 mr-5">
              <img src="../assets/Grupo 399.png" alt="" :style="{width:'150px'}">
              <b-progress :value="75" show-progress class="mb-3 mt-3" variant="warning"></b-progress>
              <h5 :style="{fontFamily:'EAmbit SemiBold'}">Felicidade</h5>
            </div>

         
          </div>
        </div>

        <div class="mt-4" style="border: 2px solid blue" v-if="getLoggedUser.typeUser == 'Tutor'">
           <h2 :style="{color:'#e87461',fontFamily:'EAmbit SemiBold'}">Evolução do meu filho</h2>

           <b-form inline class="mt-4">
            <label class="mr-sm-3" for="example-datepicker">De: </label>
            <b-form-datepicker id="example-datepicker" v-model="value" class="mb-2 mr-sm-4 mb-sm-0" :style="{'background-color':'#fbfbf3'}"></b-form-datepicker>

            <label class="mr-sm-3" for="example-datepicker1">Até: </label>
            <b-form-datepicker id="example-datepicker1" v-model="value1" class="mb-2 mr-sm-4 mb-sm-0" :style="{'background-color':'#fbfbf3'}"></b-form-datepicker>
           </b-form>
           
          <table class="col-11 ml-2 mr-2 mt-5 mb-5 text-center">
            <tr :style="{'background-color':'#e87461',color:'#fbfbf3'}">
              <th class="p-2">Emoção</th>
              <th>Perguntas realizadas</th>
              <th>Perguntas Acertadas</th>
              <th>Perguntas Erradas</th>
              <th>Evolução</th>
            </tr>
            <tr :style="{'border-bottom':'2px solid #707070'}" >
              <td class="p-4">Felicidade</td>
              <td>250</td>
              <td>100</td>
              <td>150</td>
              <td>Negativa</td>
            </tr>
          </table>
        </div>
        
        <div class="mt-4" style="border: 2px solid blue" v-if="getLoggedUser.typeUser == 'Professor'">
          <h2 :style="{color:'#e87461',fontFamily:'EAmbit SemiBold'}">Evolução dos meus alunos</h2>

          <table class="col-11 ml-2 mr-2 mt-5 mb-5 text-center">
            <tr :style="{'background-color':'#e87461',color:'#fbfbf3'}">
              <th class="p-2">Username</th>
              <th>Nome</th>
              <th>Turma</th>
              <th>Pontuação obtida</th>
            </tr>
            <tr :style="{'border-bottom':'2px solid #707070'}" >
              <td class="p-4">user123</td>
              <td>João Soares Pereira de Amorim</td>
              <td>AA</td>
              <td>1500</td>
            </tr>
          </table>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      /*
      getLoggedUser: {
        username:"",
        password:"",
        name:"",
        email:"",
        typeUser: ["Criança", "Tutor", "Professor","Admin"]
      }
      */
      
    };
  },

  computed: {
    ...mapGetters(["getLoggedUser"]),
  },

  methods: {
    ...mapMutations([]),
  },
  
}



</script>

<style>
  #backgroundHome {
  width: 100%;
  height: auto;
  background: url("../assets/Grupo 6.svg");
  background-size: 1525px auto;
  background-repeat: repeat;
}



</style>

