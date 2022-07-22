<!-- @format -->

<template>
  <div v-show="!$store.state.is_login">
    <div
      v-if="loginForm.type == 'LOCK_KEYIN_LOGIN'"
      class="container--fluid fill-height"
      style="background-color: #12998b"
    >
      <v-row no-gutters align="center" justify="end">
        <v-col sm="12" md="6" lg="4">
          <v-card>
            <v-card-text class="v-application--wrap fill-height">
              <div class="layout column align-center">
                <img src="img/auth/ssup_logo2.png" alt="SSUP Logo" />
                <h1 class="text-center my-4 primary--text"></h1>
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
                    @keyup.enter="login"
                  />
                  <div>
                    <v-btn
                      class="form-control"
                      color="#12998b"
                      @click.prevent="login"
                      >login</v-btn
                    >
                  </div>
                </v-form>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div
      v-if="loginForm.type == 'LOCK_FINGER_SCAN_LOGIN'"
      class="container--fluid fill-height"
      style="background-color: #12998b"
    >
      <v-row no-gutters align="center" justify="end">
        <v-col sm="12" md="6" lg="4">
          <v-card>
            <v-card-text class="v-application--wrap fill-height">
              <div class="layout column align-center">
                <img src="img/auth/ssup_logo2.png" alt="SSUP Logo" />

                <b-button variant="light" @click.prevent="login()"
                  ><img src="img/auth/fingerprint.png" width="200" height="200"
                /></b-button>
              </div>
              <v-form style="text-align: center">
                <div>
                  <v-btn class="form-control" @click.prevent="skipFingerScan()"
                    >Skip</v-btn
                  >
                </div>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div
      v-if="loginForm.type == 'LOCK_IDCARD_LOGIN'"
      class="container--fluid fill-height"
      style="background-color: #12998b"
    >
      <v-row no-gutters align="center" justify="end">
        <v-col sm="12" md="6" lg="4">
          <v-card>
            <v-card-text class="v-application--wrap fill-height">
              <div class="layout column align-center">
                <img src="img/auth/ssup_logo2.png" alt="SSUP Logo" />
                <img src="img/auth/cardreader.jpg" width="200" height="200" />
              </div>
              <v-form>
                <div>
                  <v-btn
                    class="form-control"
                    color="#12998b"
                    @click.prevent="dialogIdCard = true"
                    >Scan ID Card</v-btn
                  >
                </div>
                <v-dialog v-model="dialogIdCard" persistent max-width="600px">
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">กรุณากรอก password</span>
                    </v-card-title>
                    <v-card-text>
                      <b-form-input
                        type="password"
                        required
                        ref="passIdCard"
                        v-model="passIdCard"
                        placeholder="Password"
                      ></b-form-input>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click.prevent="
                          (dialogIdCard = false), (passIdCard = '')
                        "
                        >Close</v-btn
                      >
                      <v-btn color="blue darken-1" text @click.prevent="login()"
                        >Login</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
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
import dayjs from "dayjs";

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
        type: "LOCK_KEYIN_LOGIN",
      },
      state: "login",
      showMain: false,
      dialogIdCard: false,
      passIdCard: "",
      url: process.env.VUE_APP_SERVER_API,
    };
  },
  mounted: function () {
    this.$i18n.locale = "en";
    // if(this.$store.state.is_login == undefined) {
    //    this.$router.go();
    // } else {
    if (this.$store.state.is_login == false) {
      localStorage.clear();
      // this.checkTypeToLogin();
    }
    // }
  },
  methods: {
    checkTypeToLogin() {
      /* เรียก hostname ไปเช็ค config
          location.toString() //http://localhost:8080/
          location.host //localhost:8080
          location.hostname //localhost
          location.port //8080
          location.protocol //http:
      */
      let hostname = "172.63.1.24";
      axios
        .get(this.url + "/checkconfiglogin?ip=" + hostname)
        .then((res) => {
          let response = res.data;
          let configLogin = response.configLogin;
          this.loginForm.type = configLogin.config_type;

          if (this.loginForm.type == "LOCK_KEYIN_LOGIN") {
            this.loginForm.username = "";
            this.loginForm.password = "";
            this.$refs.username.focus();
          } else {
            this.loginForm.type = "LOCK_FINGER_SCAN_LOGIN";
          }
        })
        .catch((err) => {
          console.log("get error", err);
        });
    },
    login() {
      if (this.loginForm.type == "LOCK_KEYIN_LOGIN") {
        if (this.loginForm.username == "") {
          this.$refs.username.focus();
          return;
        }
        if (this.loginForm.password == "") {
          this.$refs.password.focus();
          return;
        }
      }
      if (this.loginForm.type == "LOCK_FINGER_SCAN_LOGIN") {
        this.loginForm.username = "Admin";
        this.loginForm.password = "123456";
        this.loginForm.type = "LOCK_KEYIN_LOGIN";
      }
      if (this.loginForm.type == "LOCK_IDCARD_LOGIN") {
        if (this.passIdCard == "") {
          this.$refs.passIdCard.focus();
          return;
        }
        this.loginForm.username = "Admin";
        this.loginForm.password = this.passIdCard;
        this.loginForm.type = "LOCK_KEYIN_LOGIN";
      }

      axios
        .post(this.url + "/login", this.loginForm)
        .then((res) => {
          if (res.status == 200 && res.data.message == "success") {
            this.$store.commit("doLogin", JSON.stringify(res.data));
            this.$store.commit("changeDrawer", true);
          } else {
            let msg = "";
            for (const [key, value] of Object.entries(res.data.message)) {
              for (let m of value) {
                msg += m + ", ";
              }
            }
            alert("Login ไม่สำเร็จ เนื่องจาก..." + msg);

            this.loginForm.username = "";
            this.loginForm.password = "";
            // this.$i18n.locale = 'en';
          }
        })
        .catch((err) => {
          console.log(err);
          alert(
            "ไม่สามารถใช้ username/password ได้ในตอนนี้, กรุณาติดต่อเจ้าหน้าที่"
          );
        });
    },
    skipFingerScan() {
      this.loginForm.type = "LOCK_IDCARD_LOGIN";
    },
  },
};
</script>
<style>
.btn-outline-secondary {
  /* color: #fff;  */
  background-color: transparent;
  border-color: transparent;
}
</style>
