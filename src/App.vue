<template>
  <v-app>
    <div v-show="$store.state.is_login">
      <v-navigation-drawer v-model="drawer" app>
        <About></About>
      </v-navigation-drawer>

      <v-app-bar app>
        <v-app-bar-nav-icon @click="drawer = !drawer">
          <div v-if="drawer">
            <i class="fa fa-outdent" aria-hidden="true"></i>
          </div>
          <div v-else><i class="fa fa-indent" aria-hidden="true"></i></div>
        </v-app-bar-nav-icon>
        <v-toolbar-title>
          <div>account</div>
        </v-toolbar-title>
      </v-app-bar>

      <v-main>
        <router-view />
      </v-main>
    </div>
    <div v-show="!$store.state.is_login">
      <router-view />
    </div>
  </v-app>
</template>

<script>
import About from "@/views/layout/Menu-sidebar.vue";
export default {
  name: "App",
  components: {
    About,
  },
  data: () => ({
    drawer: null,
  }),
  mounted: function () {
    if (this.$store.state.is_login == false) {
      this.$router.push({ name: "Home" }).catch((error) => {
        if (
          error.name !== "NavigationDuplicated" &&
          !error.message.includes(
            "Avoided redundant navigation to current location"
          )
        ) {
          console.log(error);
        }
      });
    }
  },
};
</script>
