<template>
  <div v-show="!$store.state.is_login">
    <div v-if="loginForm.type == 'UNLOCK_FINGER_LOGIN'" class="container--fluid fill-height success">
      <v-row no-gutters align="center" justify="end">
        <v-col sm="12" md="6" lg="4">
          <v-card>
            <v-card-text class="v-application--wrap fill-height">
              <div class="layout column align-center">
                <img src="img/auth/ssup-logo.svg" alt="Vue Vuetify Admin Logo" width="200" height="200"/>
                <h1 class="text-center my-4 primary--text"></h1>
                <v-form>
                  <v-text-field v-model="loginForm.username" ref="username" append-icon="mdi-account" name="username" type="text" required autocomplete="username" />
                  <v-text-field v-model="loginForm.password" ref="password" append-icon="mdi-lock" name="password" type="password" required autocomplete="current-password" @keyup.enter="login"/>
                  <div>
                    <v-btn class="form-control" color="success" @click.prevent="login">login</v-btn>
                  </div>
                </v-form>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div v-if="loginForm.type == 'LOCK_FINGER_SCAN'" class="container--fluid fill-height success">
      <v-row no-gutters align="center" justify="end">
        <v-col sm="12" md="6" lg="4">
          <v-card>
            <v-card-text class="v-application--wrap fill-height">
              <div class="layout column align-center">
                <img src="img/auth/ssup-logo.svg" alt="Vue Vuetify Admin Logo" width="200" height="200"/>

                <b-button variant="light" @click.prevent="login()"><img src="img/auth/fingerprint.png" width="200" height="200"/></b-button>
              </div>
              <v-form style="text-align: center;">
                <div>
                  <v-btn class="form-control" @click.prevent="skipFingerScan()">Skip</v-btn>
                </div>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div v-if="loginForm.type == 'LOCK_IDCARD_LOGIN'" class="container--fluid fill-height success">
      <v-row no-gutters align="center" justify="end">
        <v-col sm="12" md="6" lg="4">
          <v-card>
            <v-card-text class="v-application--wrap fill-height">
              <div class="layout column align-center">
                <img src="img/auth/ssup-logo.svg" alt="Vue Vuetify Admin Logo" width="200" height="200"/>
                <img src="img/auth/cardreader.jpg" width="200" height="200"/>
              </div>
              <v-form>
                <div>
                  <v-btn class="form-control" color="success" @click.prevent="dialogIdCard = true">Scan ID Card</v-btn>
                </div>
                <v-dialog v-model="dialogIdCard" persistent max-width="600px">
                    <v-card>
                      <v-card-title>
                        <span class="text-h5">กรุณากรอก password</span>
                      </v-card-title>
                      <v-card-text>
                        <b-form-input type='password' required ref="passIdCard" v-model="passIdCard" placeholder="Password"></b-form-input>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click.prevent="dialogIdCard = false, passIdCard=''">Close</v-btn>
                        <v-btn color="blue darken-1" text @click.prevent="login()">Login</v-btn>
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
        type: "UNLOCK_FINGER_LOGIN"
      },
      state: "login",
      showMain: false,
      dialogIdCard: false,
      passIdCard: "",
      url: "http://127.0.0.1:8100",
    };
  },
  mounted: function () {
    this.$i18n.locale = 'en';
    if (this.$store.state.is_login == false) {
      this.checkTypeToLogin();
    }
  },
  methods: {
    checkTypeToLogin() {
      // TODO: api เช็คเงื่อนไขการ login

      // this.loginForm.type = "UNLOCK_FINGER_LOGIN";
      // this.loginForm.type = "LOCK_FINGER_SCAN";
      // this.loginForm.type = "LOCK_IDCARD_LOGIN";

      if(this.loginForm.type == "UNLOCK_FINGER_LOGIN") {
        this.loginForm.username = "";
        this.loginForm.password = "";
        this.$refs.username.focus();
      } else {
        this.loginForm.type = "LOCK_FINGER_SCAN";
      }
    },
    login() {
      if(this.loginForm.type == "UNLOCK_FINGER_LOGIN") {
        if (this.loginForm.password == "") {
          this.$refs.password.focus();
          return;
        }
      } 
      if(this.loginForm.type == "LOCK_FINGER_SCAN") {
        this.loginForm.username = "Admin";
        this.loginForm.password = "123456";
        this.loginForm.type = "UNLOCK_FINGER_LOGIN";
      } 
      if(this.loginForm.type == "LOCK_IDCARD_LOGIN") {
        if(this.passIdCard == ""){
          this.$refs.passIdCard.focus();
          return;
        }
        this.loginForm.username = "Admin";
        this.loginForm.password = this.passIdCard;
        this.loginForm.type = "UNLOCK_FINGER_LOGIN";
      } 

      axios
        .post(this.url + "/api/login", this.loginForm)
        .then((res) => {
          // console.log(JSON.stringify(res.data));
          if (res.status == 201 && res.data.message == 'login succeed') {
            this.$store.commit("doLogin", JSON.stringify(res.data));
          } else {
            alert("ไม่สามารถใช้ username/password ได้ในตอนนี้, กรุณาติดต่อเจ้าหน้าที่");
            this.loginForm.username = "";
            this.loginForm.password = "";
            // this.$i18n.locale = 'en';
          }
        })
        .catch((err) => {
          console.log("login error = ", err);
          if (err.response.status !== 201) {
            if(this.loginForm.type == "UNLOCK_FINGER_LOGIN") {
              alert("Login ไม่สำเร็จ เนื่องจาก..."+ res.data.message);
              this.loginForm.username = "";
              this.loginForm.password = "";
              this.$refs.username.focus();
              return;
            }
            
          } 
          if(err.response.status == 401) {
            if(this.loginForm.type == "UNLOCK_FINGER_LOGIN") {
              alert("Login ไม่สำเร็จ เนื่องจาก..."+ res.data.message);
              this.loginForm.username = "";
              this.loginForm.password = "";
              this.$refs.username.focus();
              return;
            }
          }
        });
    },
    logout() {
      this.$store.commit("doLogout");
    },
    skipFingerScan() {
      this.loginForm.type = 'LOCK_IDCARD_LOGIN';
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
