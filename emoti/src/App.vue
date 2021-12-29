<template>
  <div id="app">
    <!--<div id="nav" v-if="trueorfalse == false">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>-->
    <div @mouseleave="listOne=false">
     <b-navbar style="background-color:#FDFDED;box-shadow:0px 3px #00000003" class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between" fixed v-if="trueorfalse == true">
        <b-navbar-nav href="#"  class="d-flex align-items-center col-md-3 mb-2 mb-md-0" >
          <img src="./assets/Logo_Emoti.png" width="200" alt="">
        </b-navbar-nav>

        <b-navbar-nav class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0" :style="{fontFamily:'EAmbit SemiBold'}">
          <b-nav-item class="ml-3 mr-3" ><router-link to="/home" class="d-flex flex-column align-items-center"  :style="{color:'#bfbfbf','text-decoration':'none'}"><span class="material-icons-round" style="font-size:30px">home</span>Home</router-link></b-nav-item>
          <b-nav-item class="ml-3 mr-3" @click="listOne=true"><div  class="d-flex flex-column align-items-center" :style="{color:'#bfbfbf','text-decoration':'none'}"><span class="material-icons-round" style="font-size:30px">videogame_asset</span>Atividades</div>
          </b-nav-item>
          <b-nav-item class="ml-3 mr-3" ><router-link to="/profile" class="d-flex flex-column align-items-center" :style="{color:'#bfbfbf','text-decoration':'none'}"><span class="material-icons-round" style="font-size:30px">person</span>Perfil</router-link></b-nav-item>
          <b-nav-item class="ml-3 mr-3"><router-link to="/myactivities" class="d-flex flex-column align-items-center" :style="{color:'#bfbfbf','text-decoration':'none'}"><span class="material-icons-round" style="font-size:30px">palette</span>Atividades P.</router-link></b-nav-item>
          <b-nav-item class="ml-3 mr-3"><router-link to="/class" class="d-flex flex-column align-items-center" :style="{color:'#bfbfbf','text-decoration':'none'}"><span class="material-icons-round" style="font-size:30px">assignment</span>Turmas</router-link></b-nav-item>
        </b-navbar-nav> 

        <!--Right aligned nav items-->
        <b-navbar-nav  class="col-md-3 md-0 pd-0 d-flex flex-row justify-content-end" >
        <b-nav-item-dropdown right :style="{fontFamily:'EAmbit SemiBold'}">
           <!--Using 'button-content' slot-->
          <template #button-content>
            <b-avatar style="background-color:#BFBFBF;color:#FDFDED"></b-avatar>
          </template>
          <b-dropdown-item-button variant="secondary">
          <b-icon icon="tools" aria-hidden="true"></b-icon> Gerir Website
          </b-dropdown-item-button>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item href="#" size="sm" class="mb-2" variant="danger" ><b-icon icon="door-closed-fill" aria-hidden="true"></b-icon> Terminar Sessão</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
  </b-navbar>
  <div style="z-index:2;position:absolute;background-color:white;width:100%;height:8%;" class="d-flex flex-row justify-content-center align-items-center"  v-if="listOne">
        <div :style="{fontFamily:'EAmbit SemiBold'}">
          <router-link to="/activities" class="ml-4 mr-4" :style="{color:'#bfbfbf','text-decoration':'none'}" >Quizzes</router-link>
          <router-link to="/activities" class="ml-4 mr-4" :style="{color:'#bfbfbf','text-decoration':'none'}" >Reconhecimento</router-link>
          <router-link to="/activities" class="ml-4 mr-4" :style="{color:'#bfbfbf','text-decoration':'none'}" >Atividades Personalizadas (Tutor)</router-link>
          <router-link to="/activities" class="ml-4 mr-4" :style="{color:'#bfbfbf','text-decoration':'none'}" >Atividades Personalizadas (Professor)</router-link>
        </div>
      </div>
  </div>
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {
      trueorfalse: true,
      isHovered:false,
      listOne:false
    };
  },
};
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


</style>