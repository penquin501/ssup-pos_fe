<template>
  <v-app>
    <div v-show="$store.state.is_login">
      <v-navigation-drawer v-model="drawer" app>
        <Sidebar />
      </v-navigation-drawer>

      <v-app-bar app>
        <v-app-bar-nav-icon @click="drawer = !drawer">
          <div v-if="drawer">
            <i class="fa fa-outdent" aria-hidden="true"></i>
          </div>
          <div v-else><i class="fa fa-indent" aria-hidden="true"></i></div>
        </v-app-bar-nav-icon>
        <v-toolbar-title> </v-toolbar-title>
        <Header />
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
import Sidebar from "@/views/layout/Menu-sidebar.vue";
import Header from "@/views/layout/Header-navbar.vue";

export default {
  name: "App",
  components: {
    Sidebar,
    Header,
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
