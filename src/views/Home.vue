<template>
  <div v-show="!$store.state.is_login">
    <div class="container--fluid fill-height success">
      <v-row no-gutters align="center" justify="end">
        <v-col sm="12" md="6" lg="4">
          <v-card>
            <v-card-text class="v-application--wrap fill-height">
              <div class="layout column align-center">
                <img
                  src="img/auth/ssup-logo.svg"
                  alt="Vue Vuetify Admin Logo"
                  width="200"
                  height="200"
                />
                <h1 class="text-center my-4 primary--text"></h1>
              </div>
              <v-form>
                <v-text-field
                  v-model="loginForm.username"
                  ref="username"
                  append-icon="mdi-account"
                  name="username"
                  type="text"
                  required
                  autocomplete="username"
                />
                <v-text-field
                  v-model="loginForm.password"
                  ref="password"
                  append-icon="mdi-lock"
                  name="password"
                  type="password"
                  required
                  autocomplete="current-password"
                />
                <div>
                  <v-btn
                    class="form-control"
                    color="success"
                    @click.prevent="login"
                    >login</v-btn
                  >
                </div>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
// import HelloWorld from '../components/HelloWorld'
import axios from "axios";

export default {
  name: "Home",

  components: {
    // HelloWorld,
  },
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      state: "login",
      showMain: false,
      url: "http://localhost:8100",
    };
  },
  mounted: function () {
    if (this.$store.state.is_login == false) {
      this.loginForm.username = "";
      this.loginForm.password = "";

      this.$refs.username.focus();
    }
  },
  methods: {
    login() {
      if (this.loginForm.password == "") {
        this.$refs.password.focus();
        return;
      }
      axios
        .post(this.url + "/api/login", this.loginForm)
        .then((res) => {
          if (res.status == 201) {
            this.$store.commit("doLogin", JSON.stringify(res.data));
          } else {
            alert(
              "ไม่สามารถใช้ username/password ได้ในตอนนี้, กรุณาติดต่อเจ้าหน้าที่"
            );
            this.loginForm.username = "";
            this.loginForm.password = "";
          }
        })
        .catch((err) => {
          console.log("login error = ", err);
          if (err.response.status !== 201) {
            alert("username/password ไม่ถูกต้อง, กรุณากรอกให้ถูกต้อง");
            this.loginForm.username = "";
            this.loginForm.password = "";

            this.$refs.username.focus();
            return;
          }
        });
    },
    logout() {
      this.$store.commit("doLogout");
    },
  },
};
</script>
