<template>
   <div id="backgroundActivity">
     <b-container class="col-11 pt-4">
        <h2 :style="{color:'#e87461',fontFamily:'EAmbit SemiBold'}">{{activity.title}}</h2>

        <div class="col-12 d-flex flex-row justify-content-center">
          <div class="col-7 mt-3 row d-flex flex-row justify-content-center" style="border: 2px solid #e87461;border-radius:5px">
            <div class="col-8 d-flex flex-row justify-content-between mt-4 mb-4">
              <b-button class="d-flex flex-row justify-content-center align-items-center"  :style="{color:'#fdfdf3','background-color':'#e87461',border:'none'}"><span class="material-icons-round">arrow_back_ios</span></b-button>
              <p class="align-self-center" style="font-size:20px">Pergunta <span style="font-weight:bolder;color:#e87461">1</span> de <span style="font-weight:bolder">4</span></p>
              <b-button class="d-flex flex-row justify-content-center align-items-center"  :style="{color:'#fdfdf3','background-color':'#e87461',border:'none'}"><span class="material-icons-round">arrow_forward_ios</span></b-button>
            </div>

            <div class="col-8">
               <img width="465px" height="auto" src="../assets/Imagem 2.png" alt="">
            </div>
            <div class="col-8">
               <p>Seleciona a opção correta!</p>
            </div>
            <div class="col-8 mb-4">
              <b-form>
                <b-form-checkbox size="lg" class="mb-3">Felicidade</b-form-checkbox>
                <b-form-checkbox size="lg" class="mb-3">Triste</b-form-checkbox>
                <b-form-checkbox size="lg" class="mb-3">Zangado</b-form-checkbox>
                <b-form-checkbox size="lg" class="mb-3">Envergonhado</b-form-checkbox>
              </b-form>
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
      activity: ''
    }
  },
  computed: {
    ...mapGetters(["getActivity"]),
  },

  created() {
			this.activity=this.getActivity(this.$route.params.name)
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