<template>
  <v-app>
    <div v-if="$store.state.is_login">
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
        <v-toolbar-title></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-col class="d-flex" sm="1">
          <v-select v-model="selectedLang" :items="langs" dense @change="setLang()">
            <template v-slot:item="{ item, index }">
              {{ item.text }}
                <!-- <img :src="item.image">{{ item.text }} -->
            </template>
          </v-select>
        </v-col>
        <v-spacer></v-spacer>
        <Header />
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
    langs: [
      { text: 'EN', value: 'en', image: 'https://www.gravatar.com/avatar/b17065ea1655f1e3283aac8d8fc16019?s=48&d=identicon&r=PG'},
      { text: 'TH', value: 'th', image: 'https://www.countryflags.com/wp-content/uploads/thailand-flag-png-large.png'},
      // { name: 'Hoo', value: 'TH', image: 'https://www.gravatar.com/avatar/b17065ea1655f1e3283aac8d8fc16019?s=48&d=identicon&r=PG'},
      // { name: 'Coo', value: 'TH', image: 'https://www.gravatar.com/avatar/b17065ea1655f1e3283aac8d8fc16019?s=48&d=identicon&r=PG'},
      ]
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
  methods: {
    setLang() {
      this.$i18n.locale = this.selectedLang;
    },
  }
};
</script>
