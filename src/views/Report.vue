<template>
  <div>
    <b-card>
      <b-tabs content-class="mt-3">
        <b-tab
          v-if="listMenu.find((name) => name == 'Sale Bill')"
          title="Sale Bill"
          active
        >
          <v-data-table
            :headers="headers"
            :items="listInvoice"
            :search="searchInvoice"
            sort-by="orderDate"
            class="elevation-1"
          >
            <template v-slot:item.paymentMethod="{ item }">
              {{ item.paymentMethod == "creditCard" ? "บัตรเครดิต" : "เงินสด" }}
            </template>
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>รายการขายสินค้า {{ today }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="searchInvoice"
                  append-icon="mdi-magnify"
                  label="ใส่เลข Invoice No"
                  single-line
                  hide-details
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  @click.prevent="
                    (overlayCashier = true), (dialogCashier = true)
                  "
                  >ปิดยอด</v-btn
                >
              </v-toolbar>
            </template>
          </v-data-table>
          <v-dialog
            v-model="dialogCashier"
            max-width="500px"
            :retain-focus="false"
            persistent
          >
            <v-overlay :absolute="absolute" :value="overlayCashier" responsive>
              <v-card class="mx-auto" max-width="500px" light>
                <v-card-title>
                  <b>Cashier</b>
                  <v-spacer></v-spacer>
                  <v-btn
                    icon
                    @click.prevent="
                      (dialogCashier = false), (overlayCashier = false)
                    "
                    ><v-icon>mdi-close</v-icon></v-btn
                  >
                </v-card-title>
                <v-card-subtitle class="pb-0"
                  >กรุณากรอกจำนวนเงิน</v-card-subtitle
                >
                <v-card-text class="text--primary">
                  <v-row>
                    <v-col style="background-color: orange">
                      <label>เงินทอน</label>
                      <b-form>
                        <label>1000 :</label>
                        <b-form-input
                          size="sm"
                          type="number"
                          :state="validation(formCashier.thousand)"
                          v-model="formCashier.thousand"
                          trim
                        ></b-form-input>
                        <label>500 :</label>
                        <b-form-input
                          size="sm"
                          type="number"
                          :state="validation(formCashier.fiveHundred)"
                          v-model="formCashier.fiveHundred"
                        ></b-form-input>
                        <label>100 :</label>
                        <b-form-input
                          size="sm"
                          type="number"
                          :state="validation(formCashier.oneHundred)"
                          v-model="formCashier.oneHundred"
                        ></b-form-input>
                        <label>50 :</label>
                        <b-form-input
                          size="sm"
                          type="number"
                          :state="validation(formCashier.fifty)"
                          v-model="formCashier.fifty"
                        ></b-form-input>
                        <label>20 :</label>
                        <b-form-input
                          size="sm"
                          type="number"
                          :state="validation(formCashier.twenty)"
                          v-model="formCashier.twenty"
                        ></b-form-input>
                        <label>10 :</label>
                        <b-form-input
                          size="sm"
                          type="number"
                          :state="validation(formCashier.ten)"
                          v-model="formCashier.ten"
                        ></b-form-input>
                        <label>5 :</label>
                        <b-form-input
                          size="sm"
                          type="number"
                          :state="validation(formCashier.five)"
                          v-model="formCashier.five"
                        ></b-form-input>
                        <label>2 :</label>
                        <b-form-input
                          size="sm"
                          type="number"
                          :state="validation(formCashier.two)"
                          v-model="formCashier.two"
                        ></b-form-input>
                        <label>1 :</label>
                        <b-form-input
                          size="sm"
                          type="number"
                          :state="validation(formCashier.one)"
                          v-model="formCashier.one"
                        ></b-form-input>
                        <!-- <label>0.50 :</label>
                          <b-form-input size="sm" type="number" :state="validation(formCashier.fiftyCent)" v-model="formCashier.fiftyCent"></b-form-input>
                          <label>0.25 :</label>
                          <b-form-input size="sm" type="number" :state="validation(formCashier.twentyFiveCent)" v-model="formCashier.twentyFiveCent"></b-form-input> -->
                      </b-form>
                    </v-col>
                    <v-col style="background-color: yellow">
                      <label>ยอดขาย</label>
                      <b-form>
                        <label>1000 :</label>
                        <b-form-input
                          size="sm"
                          type="number"
                          :state="validation(formCashier.thousand)"
                          v-model="formCashier.thousand"
                        ></b-form-input>
                        <label>500 :</label>
                        <b-form-input
                          size="sm"
                          type="number"
                          :state="validation(formCashier.fiveHundred)"
                          v-model="formCashier.fiveHundred"
                        ></b-form-input>
                        <label>100 :</label>
                        <b-form-input
                          size="sm"
                          type="number"
                          :state="validation(formCashier.oneHundred)"
                          v-model="formCashier.oneHundred"
                        ></b-form-input>
                        <label>50 :</label>
                        <b-form-input
                          size="sm"
                          type="number"
                          :state="validation(formCashier.fifty)"
                          v-model="formCashier.fifty"
                        ></b-form-input>
                        <label>20 :</label>
                        <b-form-input
                          size="sm"
                          type="number"
                          :state="validation(formCashier.twenty)"
                          v-model="formCashier.twenty"
                        ></b-form-input>
                        <label>10 :</label>
                        <b-form-input
                          size="sm"
                          type="number"
                          :state="validation(formCashier.ten)"
                          v-model="formCashier.ten"
                        ></b-form-input>
                        <label>5 :</label>
                        <b-form-input
                          size="sm"
                          type="number"
                          :state="validation(formCashier.five)"
                          v-model="formCashier.five"
                        ></b-form-input>
                        <label>2 :</label>
                        <b-form-input
                          size="sm"
                          type="number"
                          :state="validation(formCashier.two)"
                          v-model="formCashier.two"
                        ></b-form-input>
                        <label>1 :</label>
                        <b-form-input
                          size="sm"
                          type="number"
                          :state="validation(formCashier.one)"
                          v-model="formCashier.one"
                        ></b-form-input>
                        <!-- <label>0.50 :</label>
                          <b-form-input size="sm" type="number" :state="validation(formCashier.fiftyCent)" v-model="formCashier.fiftyCent"></b-form-input>
                          <label>0.25 :</label>
                          <b-form-input size="sm" type="number" :state="validation(formCashier.twentyFiveCent)" v-model="formCashier.twentyFiveCent"></b-form-input> -->
                      </b-form>
                    </v-col>
                    <v-col style="background-color: lightgreen">
                      <label>เงินสดย่อย</label>
                      <b-form>
                        <label>1000 :</label>
                        <b-form-input
                          size="sm"
                          type="number"
                          :state="validation(formCashier.thousand)"
                          v-model="formCashier.thousand"
                        ></b-form-input>
                        <label>500 :</label>
                        <b-form-input
                          size="sm"
                          type="number"
                          :state="validation(formCashier.fiveHundred)"
                          v-model="formCashier.fiveHundred"
                        ></b-form-input>
                        <label>100 :</label>
                        <b-form-input
                          size="sm"
                          type="number"
                          :state="validation(formCashier.oneHundred)"
                          v-model="formCashier.oneHundred"
                        ></b-form-input>
                        <label>50 :</label>
                        <b-form-input
                          size="sm"
                          type="number"
                          :state="validation(formCashier.fifty)"
                          v-model="formCashier.fifty"
                        ></b-form-input>
                        <label>20 :</label>
                        <b-form-input
                          size="sm"
                          type="number"
                          :state="validation(formCashier.twenty)"
                          v-model="formCashier.twenty"
                        ></b-form-input>
                        <label>10 :</label>
                        <b-form-input
                          size="sm"
                          type="number"
                          :state="validation(formCashier.ten)"
                          v-model="formCashier.ten"
                        ></b-form-input>
                        <label>5 :</label>
                        <b-form-input
                          size="sm"
                          type="number"
                          :state="validation(formCashier.five)"
                          v-model="formCashier.five"
                        ></b-form-input>
                        <label>2 :</label>
                        <b-form-input
                          size="sm"
                          type="number"
                          :state="validation(formCashier.two)"
                          v-model="formCashier.two"
                        ></b-form-input>
                        <label>1 :</label>
                        <b-form-input
                          size="sm"
                          type="number"
                          :state="validation(formCashier.one)"
                          v-model="formCashier.one"
                        ></b-form-input>
                        <!-- <label>0.50 :</label>
                          <b-form-input size="sm" type="number" :state="validation(formCashier.fiftyCent)" v-model="formCashier.fiftyCent"></b-form-input>
                          <label>0.25 :</label>
                          <b-form-input size="sm" type="number" :state="validation(formCashier.twentyFiveCent)" v-model="formCashier.twentyFiveCent"></b-form-input> -->
                      </b-form>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="warning"
                    text
                    @click.prevent="clearCashierForm()"
                    >Reset</v-btn
                  >
                  <v-btn
                    type="submit"
                    color="success"
                    text
                    @click.prevent="saveFormCashier()"
                    >Save</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-overlay>
          </v-dialog>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import dayjs from "dayjs";
import axios from 'axios';
export default {
  data() {
    return {
      searchInvoice: "",
      today: dayjs().format("DD-MM-YYYY"),
      headers: [
        { text: "Invoice No", value: "invoiceNo" },
        { text: "Order Date", sortable: true, value: "orderDate" },
        { text: "amount", value: "amount" },
        { text: "discount", value: "discountTotal" },
        { text: "net", value: "net" },
        { text: "points", value: "points" },
        { text: "Payment Method", value: "paymentMethod" },
        { text: "Received", value: "received" },
        { text: "change", value: "change" },
      ],
      listInvoice: [],
      userInfo: {},
      paymentMethod: undefined,
      listMenu: [],
      absolute: true,
      dialogCashier: false,
      overlayCashier: false,
      formCashier: {
        thousand: 0,
        fiveHundred: 0,
        oneHundred: 0,
        fifty: 0,
        twenty: 0,
        ten: 0,
        five: 0,
        two: 0,
        one: 0,
        fiftyCent: 0,
        twentyFiveCent: 0,
      },
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
      //TODO เช็คการเปิด tab หรือ หน้าต่าง ใหม่
      /* เรียก hostname ไปเช็ค config 
          location.toString() //http://localhost:8080/
          location.host //localhost:8080
          location.hostname //localhost
          location.port //8080 
          location.protocol //http:
      */
      let routeData = this.$router.resolve({name: 'Report'});
      // window.open(routeData.href, '_blank');
      // this.$store.state.countLogin
      // this.$store.state.countLogin++; 
      // if(this.$store.state.countLogin !== 1) {
      //   alert("ข้อมูลทุกอย่างจะถูกลบออกทั้งหมด, กรุณา Login ใหม่อีกครั้ง");
      //   this.logout();
      // }

      //TODO เช็คการบันทึกเงินในเกะ
      this.formCashier = this.$store.state.cashierBillInfo == null ? this.formCashier : this.$store.state.cashierBillInfo;

      this.defaultMenu();
      this.getListInvoice();
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
    defaultMenu() {
      let userMenu = this.userInfo.roles;
      if(userMenu !== null) {
        for (let item of userMenu) {
          for (const [key, value] of Object.entries(item)) {
            if (key == this.$route.name && item.SubMenu !== undefined) {
              this.listMenu = item.SubMenu;
            }
          }
        }
      }
    },
    getListInvoice() {
      if (this.$store.state.listInvoice !== []) {
        this.listInvoice = this.$store.state.listInvoice;
      }
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(",", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    checkCashier() {
      /**
       * TODO: API check ข้อมูลเงินใน cashier
       */
    },
    validation(value) {
      if (value == 0) {
        return null;
      }
      return parseInt(value) < 0 ? false : true;
    },
    saveFormCashier() {
      var valid = true;
      for (const [key, value] of Object.entries(this.formCashier)) {
        if (value < 0) {
          valid = false;
        }
      }
      if (!valid) {
        alert("กรุณาใส่จำนวนเงินใน cashier ให้ถูกต้อง");
      } else {
        this.$store.commit("saveCashierBillInfo", this.formCashier);
        this.dialogCashier = false;
        this.overlayCashier = false;
      }
    },
    clearCashierForm() {
      this.formCashier = {
        thousand: 0,
        fiveHundred: 0,
        oneHundred: 0,
        fifty: 0,
        twenty: 0,
        ten: 0,
        five: 0,
        two: 0,
        one: 0,
        fiftyCent: 0,
        twentyFiveCent: 0,
      };
    },
  },
};
</script>

<style>
@media screen and (max-height: 450px) {
  .overlay .closebtn {
    font-size: 40px;
    top: 15px;
    right: 35px;
  }
}
.row {
  --bs-gutter-x: 0.5rem !important;
  --bs-gutter-y: 0;
  display: flex;
  flex-wrap: wrap;
  margin-top: calc(-1 * var(--bs-gutter-y));
  margin-right: calc(-0.5 * var(--bs-gutter-x));
  margin-left: calc(-0.5 * var(--bs-gutter-x));
}
body {
  margin: 0;
  color: white;
}

.containers {
  background: grey;
  width: 100vw !important;
  height: 100vh;
}

.navbar {
  height: 22vh;
  background: rgb(46, 199, 201);
  margin: 0 10px;
}

.bottom {
  background: lightgrey;
  height: 85vh;
  margin: 0 10px;
  display: flex;
}

.left-bottom {
  background: rgb(151, 151, 151);
  width: 76%;
  display: flex;
  flex-direction: column;
}

.right-bottom {
  overflow: scroll;
  flex: 1;
  background: rgb(46, 199, 201);
}

.content-list-item {
  /* display: flex; */
  height: 60%;
  overflow-y: scroll;
  background: rgb(255, 255, 255);
}

.Calc-Price {
  flex: 1;
  background: rgb(46, 199, 201);
}

.content {
  width: 80%;
  background: rgb(46, 199, 201);
}

.list {
  flex: 1;
}
.input-group-text {
  font-family: "FontAwesome";
  font-size: 14px !important;
}
.form-control {
  font-family: "FontAwesome";
  font-size: 14px !important;
}
</style>
