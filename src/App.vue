<!-- @format -->

<template>
  <v-app>
    <div v-if="$store.state.is_login">
      <v-navigation-drawer v-model="drawer" app>
        <Sidebar />
      </v-navigation-drawer>

      <v-app-bar app>
        <v-col md="1">
          <v-app-bar-nav-icon @click="drawer = !drawer">
            <div v-if="drawer">
              <i class="fa fa-outdent" aria-hidden="true"></i>
            </div>
            <div v-else><i class="fa fa-indent" aria-hidden="true"></i></div>
          </v-app-bar-nav-icon>
        </v-col>
        <v-col md="8"></v-col>
        <v-col md="2">
          <v-btn-toggle
            rounded
            v-model="selectedLang"
            @change="setLang()"
            mandatory
          >
            <v-btn
              icon
              :value="item.value"
              v-for="item in languages"
              :key="item.value"
            >
              <flag :iso="item.flag" /> {{ item.text }}
            </v-btn>
          </v-btn-toggle>
        </v-col>
        <v-col md="1">
          <Header />
        </v-col>
      </v-app-bar>

      <v-main>
        <router-view />
      </v-main>
    </div>
    <div v-if="!$store.state.is_login">
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
    selectedLang: "en",
    languages: [
      { flag: "us", value: "en", text: "EN" },
      { flag: "th", value: "th", text: "TH" },
    ],
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
    } else {
      this.$i18n.locale = this.selectedLang;
    }
  },
  methods: {
    setLang() {
      this.$i18n.locale = this.selectedLang;
      this.$root.$i18n.locale = this.selectedLang;
    },
  },
};
</script>
