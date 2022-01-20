<template>
  <div class="hello">
    <b-navbar style="background-color:#FDFDED;box-shadow:0px 3px #00000003" class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between" fixed v-if="$store.getters.getLoggedUser">
        <b-navbar-nav href="#"  class="d-flex align-items-center col-md-3 mb-2 mb-md-0" >
          <img src="../assets/Logo_Emoti.png" width="200" alt="">
        </b-navbar-nav>

        <b-navbar-nav class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0" :style="{fontFamily:'EAmbit SemiBold'}">
          <b-nav-item class="ml-3 mr-3"  @click="colorClick('home')" @mouseover="colorHome='#e87461'" @mouseleave="colorHome=colorLeaveHome"><router-link to="/home" class="d-flex flex-column align-items-center"  :style="{color:colorHome,'text-decoration':'none'}"><span class="material-icons-round" style="font-size:30px" >home</span>Home</router-link></b-nav-item>
          <b-nav-item class="ml-3 mr-3"  @click="colorClick('activities')" @mouseover="colorActivities='#e87461'" @mouseleave="colorActivities=colorLeaveActivities"><router-link to="/activities" class="d-flex flex-column align-items-center"  :style="{color:colorActivities,'text-decoration':'none'}"><span class="material-icons-round" style="font-size:30px">videogame_asset</span>Atividades</router-link></b-nav-item>
          <b-nav-item class="ml-3 mr-3"  @click="colorClick('profile')" @mouseover="colorProfile='#e87461'" @mouseleave="colorProfile=colorLeaveProfile"><router-link to="/profile" class="d-flex flex-column align-items-center" :style="{color:colorProfile,'text-decoration':'none'}"><span class="material-icons-round" style="font-size:30px">person</span>Perfil</router-link></b-nav-item>
          <b-nav-item class="ml-3 mr-3"  @click="colorClick('activitiesp')" @mouseover="colorActivitiesP='#e87461'" @mouseleave="colorActivitiesP=colorLeaveActivitiesP"><router-link to="/myactivities" class="d-flex flex-column align-items-center" :style="{color:colorActivitiesP,'text-decoration':'none'}" v-if="$store.getters.getLoggedUser.typeUser=='Professor' || $store.getters.getLoggedUser.typeUser=='Tutor'"><span class="material-icons-round" style="font-size:30px">palette</span>Atividades P.</router-link></b-nav-item>
          <b-nav-item class="ml-3 mr-3"  @click="colorClick('teams')" @mouseover="colorTeams='#e87461'" @mouseleave="colorTeams=colorLeaveTeams"><router-link to="/class" class="d-flex flex-column align-items-center" :style="{color:colorTeams,'text-decoration':'none'}"  v-if="$store.getters.getLoggedUser.typeUser=='Professor'"><span class="material-icons-round" style="font-size:30px">assignment</span>Turmas</router-link></b-nav-item>
        </b-navbar-nav> 

        <!--Right aligned nav items-->
        <b-navbar-nav  class="col-md-3 md-0 pd-0 d-flex flex-row justify-content-end" >
        <b-nav-item-dropdown right :style="{fontFamily:'EAmbit SemiBold'}">
           <!--Using 'button-content' slot-->
          <template #button-content>
            <b-avatar style="background-color:#BFBFBF;color:#FDFDED"></b-avatar>
          </template>
          <b-dropdown-item-button variant="secondary"  v-if="$store.getters.getLoggedUser.typeUser=='Administrador'">
          <router-link to="/manageruser" :style="{color:'#bfbfbf','text-decoration':'none'}"><b-icon icon="person-lines-fill" aria-hidden="true" ></b-icon> Gerir Utilizadores</router-link>
          </b-dropdown-item-button >
          <b-dropdown-item-button variant="secondary"  v-if="$store.getters.getLoggedUser.typeUser=='Administrador'">
          <router-link to="/manageractivities" :style="{color:'#bfbfbf','text-decoration':'none'}"><b-icon icon="brush-fill" aria-hidden="true" ></b-icon> Gerir Actividades</router-link>
          </b-dropdown-item-button >
          <b-dropdown-item-button variant="secondary"  v-if="$store.getters.getLoggedUser.typeUser=='Administrador'">
          <router-link to="" :style="{color:'#bfbfbf','text-decoration':'none'}"><b-icon icon="award-fill" aria-hidden="true" ></b-icon> Gerir Badges</router-link>
          </b-dropdown-item-button >
          <b-dropdown-divider v-if="$store.getters.getLoggedUser.typeUser=='Administrador'"></b-dropdown-divider>
          <b-dropdown-item href="#" size="sm" class="mb-2" variant="danger" @click="$store.commit('SET_LOGOUT')"><b-icon icon="door-closed-fill" aria-hidden="true"></b-icon> Terminar Sessão</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
  </b-navbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      colorHome: '#e87461',
      colorActivities:'#bfbfbf',
      colorProfile:'#bfbfbf',
      colorActivitiesP:'#bfbfbf',
      colorTeams:'#bfbfbf',
      colorLeaveHome:'#e87461',
      colorLeaveActivities:'#bfbfbf',
      colorLeaveProfile:'#bfbfbf',
      colorLeaveActivitiesP:'#bfbfbf',
      colorLeaveTeams:'#bfbfbf'
    }
  },
  methods: {
    colorClick(page) {
      if(this.colorActivities=="#e87461"){
        this.colorActivities='#bfbfbf'
        this.colorLeaveHome='#bfbfbf'
      }
      else if(this.colorHome=="#e87461"){
        this.colorHome='#bfbfbf'
        this.colorLeaveActivities='#bfbfbf'
      }
      else if(this.colorProfile=="#e87461"){
        this.colorProfile='#bfbfbf'
        this.colorLeaveProfile='#bfbfbf'
      }
      else if(this.colorActivitiesP=="#e87461"){
        this.colorActivitiesP='#bfbfbf'
        this.colorLeaveActivitiesP='#bfbfbf'
      }
      else if(this.colorLeaveTeams=='#e87461'){
        this.colorTeams='#bfbfbf'
        this.colorLeaveTeams='#bfbfbf'
      }
      //set new color
      if(page=='home'){
        this.colorHome='#e87461'
        this.colorLeaveHome='#e87461'
      }
      else if(page=='activities'){
        this.colorActivities='#e87461'
        this.colorLeaveActivities='#e87461'
      }
       else if(page=='profile'){
        this.colorProfile='#e87461'
        this.colorLeaveProfile='#e87461'
      }
      else if(page=='activitiesp'){
        this.colorActivitiesP='#e87461'
        this.colorLeaveActivitiesP='#e87461'
      }
      else if(page=='teams'){
        this.colorTeams='#e87461'
        this.colorLeaveTeams='#e87461'
      }
    }
  },
}
</script>

<style>
 
</style>


