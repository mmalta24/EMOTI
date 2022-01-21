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
              <b-button v-else class="d-flex flex-row justify-content-center align-items-center"  :style="{color:'#fdfdf3','background-color':'#e87461',border:'none'}" @click="submitActivity()"><span class="material-icons-round">done_all</span></b-button>
            </div>

            <div class="col-8">
               <img width="465px" height="auto" :src="activity.questions[positionArray].img" alt="">
            </div>
            <div class="col-8">
               <p>Seleciona a opção correta!</p>
            </div>
            <div class="col-8 mb-4">
              <b-form-group v-slot="{ ariaDescribedby }">
                <b-form-radio class="mb-3" size="lg" v-model="qAnswer" :aria-describedby="ariaDescribedby" name="some-radios" v-for="(answer,index) in activity.questions[positionArray].answers" :key="index" :value="answer">{{answer}}</b-form-radio>
              </b-form-group>
            </div>
          </div>
        </div>
     </b-container>
  </div>
</template>

<script>
import { mapGetters} from "vuex";

export default {
  
  data() {
    return {
      activity: '',
      nQuestion:1,
      tQuestion:null,
      positionArray:0,
      qAnswer:"",
      responses:[],
    }
  },
  computed: {
    ...mapGetters(["getActivity"]),
  },

  created() {
		this.activity=this.getActivity(this.$route.params.name)
    this.tQuestion=this.activity.questions.length
	},

  methods: {
    nextQuestion() {
      this.positionArray++
      this.nQuestion++
    },

    previousQuestion(){
      this.positionArray--
      this.nQuestion--
    },

    submitActivity(){
      console.log(this.responses);
    }
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