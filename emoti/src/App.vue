<template>
  <div id="app">
    <Nav/>
  
    <router-view />

    <Footer/>
  </div>
</template>

<script>
  import Nav from './components/navBar.vue'
  import Footer from './components/footer.vue'
  
  export default {
    components: {
      Nav,
      Footer
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

#changeColorNav :hove{
  color:red
}



</style>