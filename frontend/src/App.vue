<template>
  <div class="bg-secondary">
    <Header-App/>
    <router-view></router-view>
    <Footer-App/>
  </div>
</template>

<script>
import Header-App from "./components/Header-App.vue";
import Footer-App from "./components/Footer-App.vue";
export default {
  name: "App",
  components: {
    Header-App,
    Footer-App,
  },
};
</script>