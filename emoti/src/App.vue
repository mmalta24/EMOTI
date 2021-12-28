<template>
  <div id="app">
    <div id="nav" v-if="trueorfalse == false">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {
      trueorfalse: true,
    };
  },
};
</script>

<style>
@font-face {
  font-family: Ambit;
  src: "../font/Ambit-Regular.ttf";
}
#app {
  font-family: Ambit;
  user-select: none;
}
</style>