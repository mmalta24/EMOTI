<template>
   <div id="backgroundActivity">
     <h3>{{activity.title}}</h3>
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
			this.activity=this.getActivity(this.$route.params.id)
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