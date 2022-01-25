<template>
   <div id="backgroundActivity">
     <b-container class="col-11 pt-4">
        <h2 :style="{color:'#e87461',fontFamily:'EAmbit SemiBold'}">{{activity.title}}</h2>

        <div class="col-12 d-flex flex-row justify-content-center">
          <div class="col-7 mt-3 row d-flex flex-row justify-content-center" style="border: 2px solid #e87461;border-radius:5px">
            <div class="col-8 d-flex flex-row justify-content-between mt-4 mb-4">
              <b-button class="d-flex flex-row justify-content-center align-items-center"  :style="{color:'#fdfdf3','background-color':'#e87461',border:'none'}" :disabled="nQuestion==1" @click="previousQuestion()"><span class="material-icons-round">arrow_back_ios</span></b-button>
              <p class="align-self-center" style="font-size:20px">Pergunta <span style="font-weight:bolder;color:#e87461">{{nQuestion}}</span> de <span style="font-weight:bolder">{{tQuestion}}</span></p>
              
              <b-button class="d-flex flex-row justify-content-center align-items-center"  :style="{color:'#fdfdf3','background-color':'#e87461',border:'none'}" @click="nextQuestion()" v-if="positionArray != activity.questions.length-1"><span class="material-icons-round">arrow_forward_ios</span></b-button>
              <b-button v-else class="d-flex flex-row justify-content-center align-items-center"  :style="{color:'#fdfdf3','background-color':'#e87461',border:'none'}" @click="submitActivity()"  v-b-modal.modalActivity><span class="material-icons-round">done_all</span></b-button>
            </div>

            <div class="col-8">
               <img width="465px" height="auto" :src="activity.questions[positionArray].img" alt="">
            </div>
            <div class="col-8">
               <p>Seleciona a opção correta!</p>
            </div>
            <div class="col-8 mb-4">
              <b-form-group v-slot="{ ariaDescribedby }">
                <b-form-radio-group v-model="responses[positionArray]" :aria-describedby="ariaDescribedby" stacked>
                  <b-form-radio class="mb-3" size="lg" :aria-describedby="ariaDescribedby" name="some-radios" v-for="(answer,index) in activity.questions[positionArray].answers" :key="index" :value="answer">{{answer}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </div>
          </div>
        </div>
     </b-container>

     <b-modal id="modalActivity" size="lg" centered hide-footer header-border-variant="0" header-class="color" body-class="color" hide-header-close no-close-on-esc no-close-on-backdrop>

       <div :style="{fontFamily:'EAmbit SemiBold'}" class="text-center d-flex flex-column align-items-center">
         <h2 :style="{color:'#e87461'}" class="mt-4">Parabéns, concluíste a atividade !!</h2>

         <p :style="{fontSize:'40px'}" class="mt-4"><span :style="{color:'#e87461'}">{{countRightAnswers}}</span>/{{tQuestion}}</p>

         <p :style="{fontSize:'22px',fontFamily:'EAmbit Regular'}">Conseguiste acertar {{countRightAnswers}} questões em {{tQuestion}} propostas</p>

          <table class="col-8 text-center mt-4 mb-3">
            <tr :style="{'background-color':'#e87461',color:'#fbfbf3'}">
              <th class="p-1">Emoção</th>
              <th>Pontos</th>
            </tr>
            <tr :style="{'border-bottom':'2px solid #707070'}" v-for="(result,index) in countResponsesRightList" :key="index">
              <td class="p-4">{{result.emotion}}</td>
              <td>{{result.points}}</td>
            </tr>
          </table>

          <p :style="{fontSize:'22px',fontFamily:'EAmbit Regular'}" class="mt-5">Conseguiste acumular mais <span :style="{color:'#e87461'}">{{countPointsEarned}}</span> pontos!</p>

          <b-button :style="{color:'#fdfdf3','background-color':'#e87461',border:'none'}" class="mt-4 mb-5"><router-link to="/activities" :style="{color:'#ffffff','text-decoration':'none'}">Voltar ao Catálogo</router-link></b-button>

       </div>

     </b-modal>
  </div>
</template>

<script>
import { mapGetters} from "vuex";
import { mapMutations} from "vuex";

export default {
  
  data() {
    return {
      activity: '',
      nQuestion:1,
      tQuestion:null,
      positionArray:0,
      responses:[],
      countResponsesRightList:[],
      countRightAnswers:0,
      countPointsEarned:0,
    }

  },
  computed: {
    ...mapGetters(["getLoggedUser","getActivity","getBagdes"]),
  },

  created() {
		this.activity=this.getActivity(this.$route.params.name)
    this.tQuestion=this.activity.questions.length
	},

  methods: {
    ...mapMutations(["SET_ADD_TO_HISTORY","SET_NEW_BADGE_TO_USER","SET_ADD_TO_QUESTIONSDONE"]),

    nextQuestion() {
      this.positionArray++
      this.nQuestion++
    },

    previousQuestion(){
      this.positionArray--
      this.nQuestion--
    },

    submitActivity(){
      for (let i = 0; i < this.tQuestion; i++) {
        if (this.responses[i]==this.activity.questions[i].correctAnswer) {
          this.countRightAnswers+=1
          this.countPointsEarned+=this.activity.questions[i].points
          this.countResponsesRightList.push({emotion:this.activity.questions[i].correctAnswer,points:this.activity.questions[i].points})
        }else{
          this.countResponsesRightList.push({emotion:this.activity.questions[i].correctAnswer,points:0})
        }   
      }

      //regist results in local
      if (this.getLoggedUser.typeUser=="Criança") {
        let newDate = new Date();
        let day = String(newDate. getDate());
        let month = String(newDate. getMonth()+1);
        let year = newDate. getFullYear();
        let actualDate = day + '/' + month + '/' + year;
        let info = {
          date: actualDate,
          activityTitle:this.activity.title,
          results:this.countResponsesRightList,
          pointsEarned:this.countPointsEarned
        }
        this.SET_ADD_TO_HISTORY(info)
        this.SET_ADD_TO_QUESTIONSDONE(info)
        //check if won any badges
        this.CheckBadgesWon()


      }

    },

    CheckBadgesWon(){
      
      for (let i = 0; i < this.getBagdes.length; i++) {
        if (this.getBagdes[i].badgeEmotion=="Total") {
          if (this.getLoggedUser.points>=this.getBagdes[i].pointsNedded) {
            if (!this.getLoggedUser.badgesId.some((badgeId)=>badgeId==this.getBagdes[i].badgeName)) {
              this.SET_NEW_BADGE_TO_USER(this.getBagdes[i].badgeName)
            }
          }
        }else{
          var checkerPoints = 0
          for (let a = 0; a < this.getLoggedUser.questionsDone.length; a++) {
            if (this.getLoggedUser.questionsDone[a].emotion == this.getBagdes[i].badgeEmotion) {
              checkerPoints += +this.getLoggedUser.questionsDone[a].points
            }          
          }
          if (checkerPoints >= this.getBagdes[i].pointsNedded) {
            if (!this.getLoggedUser.badgesId.some((badgeId)=>badgeId==this.getBagdes[i].badgeName)) {
              this.SET_NEW_BADGE_TO_USER(this.getBagdes[i].badgeName)
            }
          }
          
        }
        
      }
    },
  },
};
</script>

<style>
  #backgroundActivity {
  width: 100%;
  min-height: 100vh;
  background: url("../assets/Grupo 6.svg");
  background-size: 1525px auto;
}
</style>