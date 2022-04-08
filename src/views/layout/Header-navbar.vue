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
            <p class="text-caption mt-1">{{ user.position }}</p>
            <!-- <v-divider class="my-3"></v-divider>
            <v-btn depressed rounded text>Edit Account</v-btn> -->
            <v-divider class="my-3"></v-divider>
            <v-btn depressed rounded text @click.prevent="logout()">logout</v-btn>
          </div>
        </v-list-item-content>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import axios from "axios";

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
          initials: this.userInfo.data.emp_name[0] + this.userInfo.data.emp_surname[0],
          fullName: this.userInfo.data.emp_name + " "+ this.userInfo.data.emp_surname,
          position: this.userInfo.data.position,
        };
        this.$i18n.locale = this.selectedLang;
    }
  },
  methods: {
    logout()  {
      axios
        .post(this.url + "/logout", {"username" : this.userInfo.data.username})
        .then((res) => {
          let response = res.data;

          if(response.message == "success") {
            this.$store.commit("doLogout");
            window.localStorage.removeItem("vuex");
          } else {
            alert("ไม่สามารถออกจากระบบได้ เนื่องจาก..." + response.message);
          }
        })
        .catch((err) => {
          console.log("get error", err);
          alert("ไม่สามารถออกจากระบบได้ เนื่องจาก..." + err);
        });
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
