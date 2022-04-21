<template>
  <router-view />
    <ReloadPWA />
</template>

<script>
import { defineComponent } from "vue";
import ReloadPWA from "./components/ReloadPWA.vue";

export default defineComponent({
  name: "App",
  components: {
    ReloadPWA,
  },
});
</script>