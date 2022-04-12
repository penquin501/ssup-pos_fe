<template>
  <v-card class="full-height container-fuild mx-auto">
    <v-list-item class="logo">
      <v-list-item-content>
        <v-list-item-title class="text-h6" style="text-align: center">
          <v-img src="img/auth/ssup-logo.svg" alt="Background Image"></v-img>
        </v-list-item-title>
        <v-card elevation="5" class="branch text-center"
          >Branch :: {{ branchName }}</v-card
        >
        <v-list-item-subtitle> </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item-group v-model="selectedItem" color="primary">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.link"
          @click.prevent="goto(item.link)"
          style="margin-bottom: 2px; padding: 12px"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.name"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      selectedItem: 1,
      right: null,
      userInfo: {},
      configHeader: {},
      items: [],
      branchName: "",
      url: process.env.VUE_APP_SERVER_API,
    };
  },
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
      this.userInfo = JSON.parse(this.$store.state.userInfo);
      this.configHeader = {
        headers: { Authorization: `Bearer ${this.userInfo.token}` },
      };
      this.setMenu();
    }
  },
  methods: {
    setMenu() {
      var menuItems = [];
      axios
        .get(this.url + "/menu/listmenu?type=POS&brand_id=" + this.userInfo.data.brand_id, this.configHeader)
        .then((res) => {
          menuItems = res.data;
          this.branchName = this.userInfo.data.branch;
          if (this.userInfo.roles !== null) {
            this.listUserPermission = this.userInfo.roles;

            for (let item of this.listUserPermission) {
              for (const [key, value] of Object.entries(item)) {
                for (let ele of menuItems) {
                  if (ele.name == key) {
                    this.items.push(ele);
                  }
                }
              }
            }
          }
        })
        .catch((err) => {
          console.log("get error", err);
        });
    },
    goto(link) {
      if (this.$route.path == link) {
        this.$router.go();
      }
    },
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
.logo {
  background-color: #fefff7;
}
</style>
