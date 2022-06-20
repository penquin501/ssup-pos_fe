<!-- @format -->

<template>
  <div>
    <v-menu bottom min-width="200px" rounded offset-y>
      <template v-slot:activator="{ on }">
        <v-btn icon x-large v-on="on">
          <v-avatar color="brown" size="48">
            <span class="white--text text-h5">{{ user.initials }}</span>
          </v-avatar>
        </v-btn>
      </template>
      <v-card>
        <v-list-item-content class="justify-center">
          <div class="mx-auto text-center">
            <h5>{{ user.fullName }}</h5>
            <!-- {{ $t("message.hello", { msg: "hello" }) }} -->
            <!-- {{ $t("message.test") }} -->
            <p class="text-caption mt-1">{{ user.position }}</p>
            <!-- <v-divider class="my-3"></v-divider>
            <v-btn depressed rounded text>Edit Account</v-btn> -->
            <v-divider class="my-3"></v-divider>
            <v-btn depressed rounded text @click.prevent="logout()"
              >logout</v-btn
            >
          </div>
        </v-list-item-content>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";

export default {
  name: "Header",
  data() {
    return {
      user: {
        initials: "",
        fullName: "",
        position: "",
      },
      url: process.env.VUE_APP_SERVER_API,
      userInfo: {},
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

      this.user = {
        initials:
          this.userInfo.data.emp_name[0] + this.userInfo.data.emp_surname[0],
        fullName:
          this.userInfo.data.emp_name + " " + this.userInfo.data.emp_surname,
        position: this.userInfo.data.position,
      };
    }
  },
  methods: {
    logout() {
      this.$store.commit("doLogout", this.userInfo);
    },
  },
};
</script>
<style scoped>
.avatar {
  right: 20px;
  position: absolute;
}
li {
  text-decoration: underline;
  color: #459ce7;
  cursor: pointer;
}
</style>
