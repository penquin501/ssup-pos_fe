<template>
  <v-card class="full-height container-fuild mx-auto">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h6" style="text-align: center">
          <v-img src="img/auth/ssup-logo.svg" alt="Background Image"></v-img>
        </v-list-item-title>
        <v-card elevation="5" class="branch text-center"
          >Branch :: 000000</v-card
        >
        <v-list-item-subtitle> </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        link
        style="margin-top: 20px; margin-bottom: 20px"
      >
        <router-link :to="item.link" d-flex>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            {{ item.title }}
          </v-list-item-title>
          <v-list-item-content> </v-list-item-content>
        </router-link>
      </v-list-item>
    </v-list>

    <v-list dense>
      <v-list-item-group v-model="selectedItem" color="primary">
        <v-list-item v-for="(item, i) in items" :key="i">
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    selectedItem: 1,
    items: [
      { text: "Real-Time", icon: "mdi-clock" },
      { text: "Audience", icon: "mdi-account" },
      { text: "Conversions", icon: "mdi-flag" },
    ],
  }),
  mounted: function () {
    if (this.$store.state.is_login == false) {
      this.$router.push({ name: "Home" });
    }
  },
};
</script>
<style scoped>
.branch {
  padding: 10px;
}
.full-height {
  height: 100%;
  background-color: rgb(46, 199, 201) !important;
}
</style>
