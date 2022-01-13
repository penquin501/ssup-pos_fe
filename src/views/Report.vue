<template>
  <div>
    <b-card>
      <b-tabs content-class="mt-3">
        <b-tab v-if="listMenu.find(name => name=='Sale Bill')" title="Sale Bill" active>
          <v-data-table :headers="headers" :items="listInvoice" :search="searchInvoice" sort-by="orderDate" class="elevation-1">
            <template v-slot:item.paymentMethod="{ item }">
              {{ item.paymentMethod == "creditCard" ? "บัตรเครดิต" : "เงินสด" }}
            </template>
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>รายการขายสินค้า {{ today }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-text-field v-model="searchInvoice" append-icon="mdi-magnify" label="ใส่เลข Invoice No" single-line hide-details></v-text-field>
              </v-toolbar>
            </template>
          </v-data-table>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import dayjs from "dayjs";
// import axios from 'axios';
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
      if (this.$store.state.listInvoice !== []) {
        this.listInvoice = this.$store.state.listInvoice;
      }
      this.userInfo = JSON.parse(this.$store.state.userInfo);

      /* Default User Menu*/
      let userMenu = JSON.parse(this.userInfo.listUserPermission);
      for(let item of userMenu){
          for (const [key, value] of Object.entries(item)) {
              if(key == this.$route.name && item.SubMenu !== undefined) {
                  this.listMenu = item.SubMenu;
              }
          }
      }
      this.listMenu = this.listMenu.length !== 0? this.listMenu: ['Sale Bill'];

      // this.generateNewInvoice();
    }
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(",", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
