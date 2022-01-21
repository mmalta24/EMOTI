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
        <b-card tag="article" :style="{'max-width': '20vw','background-color':'#fbfbf3',border:'none','padding-top':cardAffect==index?'0px':'10px'}" class="mb-2 mr-2"  v-for="(activity, index) in getFilteredActivities(this.formFilter)" :key="index" @mouseover="cardAffect=index" @mouseleave="cardAffect=null">
        <img v-bind:src="activity.caseIMG" alt="" style="width:17rem">
        <div class="d-flex flex-row justify-content-between mt-3" style="width:16.5rem">
          <b-card-sub-title class="mb-2"><span style="color:#e87461">{{activity.category}}</span></b-card-sub-title>
          <div>
            <b-card-sub-title class="mb-2"><span class="material-icons-round">done</span><span class="material-icons-round">school</span><span class="material-icons-round" style="margin-left:5px">family_restroom</span></b-card-sub-title>
          </div>
        </div>
           <b-card-title><b-link :style="{color:'#2B4141',fontFamily:'EAmbit SemiBold',fontSize:'20px','text-decoration':'none'}" class="stretched-link" @click="$router.push({ name: 'Activity', params: { name: activity.title } })">{{activity.title}}</b-link></b-card-title>
        </b-card>
        
        
        </b-card-group>

        
        

     </b-container>
    
  </div>
</template>

<script>
import { mapGetters} from "vuex";

export default {
  data() {
    return {
      formFilter: {
        level:'',
        category:'',
        sugestFrom:'',
        nQuestions:'',
      },
      levels:['Fácil','Médio','Dificil'],
      categories:['Quiz','Reconhecimento','Atividades Personalizadas (Tutor)','Atividades Personalizadas (Professor)'],
      sugestions:['Tutor','Professor','Ambos'],
      cardAffect:null
    }
  },
methods: {
  resetForm() {
    this.formFilter.level=this.formFilter.category=this.formFilter.sugestFrom=this.formFilter.nQuestions=''
  }
},

computed: {
    ...mapGetters(["getFilteredActivities"]),


  },
watch: {
  formFilter() {
  }
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