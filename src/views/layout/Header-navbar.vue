<template>
  <v-menu
    offset-y
    origin="center center"
    :nudge-bottom="10"
    transition="scale-transition"
  >
    <template v-slot:activator="{ on }">
      <v-btn icon large text v-on="on" class="avatar">
        <v-avatar size="36px">
          <v-icon x-large class="blue--text"> mdi-account </v-icon>
        </v-avatar>
      </v-btn>
    </template>
    <v-list class="pa-0">
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-icon x-large class="blue--text"> mdi-account </v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>test</v-list-item-title>
            <v-list-item-subtitle>tesdddd</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider />
      <v-list-item
        v-for="(item, index) in menuitems"
        :key="index"
        ripple="ripple"
        :disabled="item.disabled"
        :target="item.target"
        rel="noopener"
        @click="item.click"
      >
        <v-list-item-action v-if="item.icon">
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      menuitems: [
        {
          icon: "mdi-account",
          title: "profile",
          click: (e) => {
            console.log(e);
          },
        },
        {
          icon: "mdi-exit-to-app",

          title: "logout",
          click: (e) => {
            console.log(e);
            this.$store.commit("doLogout");
            window.localStorage.removeItem('vuex');
            // this.logout();
          },
        },
      ],
    };
  },
};
</script>
<style scoped>
.avatar {
  right: 20px;
  position: absolute;
}
</style>
