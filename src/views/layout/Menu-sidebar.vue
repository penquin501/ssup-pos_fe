<template>
  <v-card class="full-height container-fuild mx-auto">
    <v-list-item class="logo">
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
      <v-list-item-group v-model="selectedItem" color="primary">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.link"
          style="margin-bottom: 2px; padding: 12px"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      selectedItem: 1,
      right: null,
      userInfo: {},
      items: [],
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
      this.setMenu();
    }
  },
  methods: {
    setMenu() {
      var menuItems = [
        {
          title: "Dashboard",
          icon: "mdi-monitor mdi-48px",
          link: "/dashboard",
        },
        { title: "Sale", icon: "mdi-cart-plus mdi-48px", link: "/sale" },
        { title: "Stock", icon: "mdi-bank mdi-48px", link: "/stock" },
        {
          title: "Member Register",
          icon: "mdi-account-card-details mdi-48px",
          link: "/member",
        },
        {
          title: "Offer Promotion",
          icon: "mdi-wallet-giftcard mdi-48px",
          link: "/promotion",
        },
        {
          title: "Report",
          icon: "mdi-chart-areaspline mdi-48px",
          link: "/report",
        },
        { title: "Tools", icon: "mdi-settings mdi-48px", link: "/tools" },
        {
          title: "Audit",
          icon: "mdi-briefcase-check mdi-48px",
          link: "/audit",
        },
      ];

      this.userInfo = JSON.parse(this.$store.state.userInfo);
      if (this.userInfo.listUserPermission == undefined) {
        this.items = menuItems;
      } else {
        this.listUserPermission = JSON.parse(this.userInfo.listUserPermission);
        for (let item of this.listUserPermission) {
          for (const [key, value] of Object.entries(item)) {
            for (let ele of menuItems) {
              if (ele.title == key) {
                this.items.push(ele);
              }
            }
          }
        }
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
