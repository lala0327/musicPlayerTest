<template>
  <ReloadPWA class="absolute top-0 z-10" />
  <router-view />
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
