<template>
  <transition :name="transitionName">
    <router-view />
  </transition>
  <ReloadPWA />
</template>

<script>
import { defineComponent } from "vue";
import ReloadPWA from "./components/ReloadPWA.vue";

export default defineComponent({
  name: "App",
  data() {
    return {
      transitionName: "",
    };
  },
  components: {
    ReloadPWA,
  },

});
</script>
