<template>
  <v-app>
    <v-app-bar app color="#26C9AD" dark>
      <div class="d-flex align-center">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <strong id="logo" @click="router()">HOME</strong>
      </div>

      <v-spacer></v-spacer>

      <v-btn target="_blank" text>
        <span class="mr-2">User: Caio César</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
    <snackBar />
  </v-app>
</template>

<script>
import snackBar from "./components/SnackBar";
export default {
  components: { snackBar },
  name: "App",
  data: () => ({
    //
  }),
  methods: {
    router() {
      this.$router.push("/");
    },
  },
};
</script>
<style>
#logo:hover {
  cursor: pointer;
}
</style>
