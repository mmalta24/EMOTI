<template>
  <div id="app">
   
     <b-navbar style="background-color:#FDFDED;box-shadow:0px 3px #00000003" class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between" fixed v-if="$store.getters.getLoggedUser">
        <b-navbar-nav href="#"  class="d-flex align-items-center col-md-3 mb-2 mb-md-0" >
          <img src="./assets/Logo_Emoti.png" width="200" alt="">
        </b-navbar-nav>

        <b-navbar-nav class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0" :style="{fontFamily:'EAmbit SemiBold'}">
          <b-nav-item class="ml-3 mr-3" ><router-link to="/home" class="d-flex flex-column align-items-center"  :style="{color:'#bfbfbf','text-decoration':'none'}"><span class="material-icons-round" style="font-size:30px">home</span>Home</router-link></b-nav-item>
          <b-nav-item class="ml-3 mr-3" ><router-link to="/activities" class="d-flex flex-column align-items-center"  :style="{color:'#bfbfbf','text-decoration':'none'}"><span class="material-icons-round" style="font-size:30px">videogame_asset</span>Atividades</router-link></b-nav-item>
          <b-nav-item class="ml-3 mr-3" ><router-link to="/profile" class="d-flex flex-column align-items-center" :style="{color:'#bfbfbf','text-decoration':'none'}" id="changeColorNav"><span class="material-icons-round" style="font-size:30px">person</span>Perfil</router-link></b-nav-item>
          <b-nav-item class="ml-3 mr-3"><router-link to="/myactivities" class="d-flex flex-column align-items-center" :style="{color:'#bfbfbf','text-decoration':'none'}" v-if="$store.getters.getLoggedUser.typeUser=='Professor' || $store.getters.getLoggedUser.typeUser=='Tutor'"><span class="material-icons-round" style="font-size:30px">palette</span>Atividades P.</router-link></b-nav-item>
          <b-nav-item class="ml-3 mr-3"><router-link to="/class" class="d-flex flex-column align-items-center" :style="{color:'#bfbfbf','text-decoration':'none'}"  v-if="$store.getters.getLoggedUser.typeUser=='Professor'"><span class="material-icons-round" style="font-size:30px">assignment</span>Turmas</router-link></b-nav-item>
        </b-navbar-nav> 

        <!--Right aligned nav items-->
        <b-navbar-nav  class="col-md-3 md-0 pd-0 d-flex flex-row justify-content-end" >
        <b-nav-item-dropdown right :style="{fontFamily:'EAmbit SemiBold'}">
           <!--Using 'button-content' slot-->
          <template #button-content>
            <b-avatar style="background-color:#BFBFBF;color:#FDFDED"></b-avatar>
          </template>
          <b-dropdown-item-button variant="secondary">
          <router-link to="/manageruser" :style="{color:'#bfbfbf','text-decoration':'none'}" v-if="$store.getters.getLoggedUser.typeUser=='Administrador'"><b-icon icon="tools" aria-hidden="true" ></b-icon> Gerir Website</router-link>
          </b-dropdown-item-button >
          <b-dropdown-divider v-if="$store.getters.getLoggedUser.typeUser=='Administrador'"></b-dropdown-divider>
          <b-dropdown-item href="#" size="sm" class="mb-2" variant="danger" @click="$store.commit('SET_LOGOUT')"><b-icon icon="door-closed-fill" aria-hidden="true"></b-icon> Terminar Sessão</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
  </b-navbar>
  
  <router-view />

  <!--Footer-->
  <div :style="{width:'100%','min-height':'35vh','background-color':'#FDFDED'}" class="d-flex flex-column align-items-center" v-if="$store.getters.getLoggedUser">
    <img src="./assets/Logo_Emoti.png" width="200" alt="" class="mt-4 mb-3">
    <p :style="{fontFamily:'EAmbit SemiBold',color:'#bfbfbf'}">Every day, a new adventure!</p>
    <div class="d-flex flex-row justify-content-around col-2 mt-2">
      <b-link href="#" :style="{fontSize:'30px',color:'#bfbfbf'}"><b-icon icon="twitter"></b-icon></b-link>
      <b-link href="#" :style="{fontSize:'30px',color:'#bfbfbf'}"><b-icon icon="facebook"></b-icon></b-link>
      <b-link href="#" :style="{fontSize:'30px',color:'#bfbfbf'}"><b-icon icon="instagram"></b-icon></b-link>
      <b-link href="#" :style="{fontSize:'30px',color:'#bfbfbf'}"><b-icon icon="youtube"></b-icon></b-link>
      <b-link href="#" :style="{fontSize:'30px',color:'#bfbfbf'}"><b-icon icon="linkedin"></b-icon></b-link>
    </div>
    <p class="mt-4" :style="{fontFamily:'EAmbit SemiBold',color:'#bfbfbf'}">&copy; Copyright EMOTI. All rights reserved</p>
  </div>

  </div>
</template>

<script>

</script>

<style>
@font-face {
  font-family: "EAmbit Regular";
  src: local("EAmbit Regular"),
   url(./font/Ambit-Regular.ttf) format("truetype");
}
@font-face {
  font-family: "EAmbit SemiBold";
  src: local("EAmbit SemiBold"),
   url(./font/Ambit-SemiBold.ttf) format("truetype");
}
@font-face{
   font-family: "BalooEmoti";
  src: local("BalooEmoti"),
   url(./font/static/BalooBhaijaan2-ExtraBold.ttf) format("truetype");
}

#app {
  font-family: EAmbit Regular;
  user-select: none;
}

#changeColorNav :hove{
  color:red
}



</style>