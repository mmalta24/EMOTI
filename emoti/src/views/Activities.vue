<template>
   <div id="backgroundActivities">
     <b-container class="col-11 pt-4">
     <div class="col-12 d-flex flex-row justify-content-between">
       <h2 :style="{color:'#e87461',fontFamily:'EAmbit SemiBold'}">Quiz</h2>
       <b-button  :style="{height:'100%','background-color':'#e87461',border:'none',color:'#fbfbf3'}" v-b-toggle.sidebar-right><b-icon icon="filter"></b-icon> Filtrar</b-button>
     </div>

     <b-sidebar id="sidebar-right" right shadow backdrop body-class="sideFilter" header-class="sideFilter">
      <div class="px-3 py-2 ">
        <h4 :style="{color:'#e87461',fontFamily:'EAmbit SemiBold'}" class="mt-3 mb-3 text-center">Filtrar</h4>

        <b-form>
          <label for="text-password" class="mt-3">Dificuldade: </label>
          <b-form-select v-model="selected" :options="options" size="sm" class="mb-3"></b-form-select>

          <label for="text-password" class="mt-3">Sugerido pelo tutor: </label>
          <b-form-select v-model="selected" :options="options" size="sm" class="mb-3"></b-form-select>

          <label for="text-password" class="mt-3">Sugerido pelo pai: </label>
          <b-form-select v-model="selected" :options="options" size="sm" class="mb-3"></b-form-select>

          <label for="text-password" class="mt-3">Número de perguntas: </label>
          <b-form-select v-model="selected" :options="options" size="sm" class="mb-3"></b-form-select>

          <div class="mt-4 d-flex flex-row justify-content-around">
            <b-button :style="{'background-color':'#fbfbf3',color:'#e87461',border:'1px solid #e87461',width:'40%'}" >Repor</b-button>
            <b-button :style="{'background-color':'#e87461',color:'#fbfbf3',border:'1px solid #e87461', width:'40%'}" >Aplicar</b-button>
          </div>
        </b-form>
      </div>
    </b-sidebar>

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

     </b-container>
    
  </div>
</template>

<script>

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