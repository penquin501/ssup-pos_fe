<template>
    <div>
    <b-card>
      <b-tabs content-class="mt-3">
        <b-tab v-if="listMenu.find(name => name=='Check In')" title="Check In" active>
          <v-data-table :headers="headersCheckInStock" :items="listCheckInStock" :search="searchInvoice" sort-by="orderDate" class="elevation-1">
            <!-- <template v-slot:item.paymentMethod="{ item }">
              {{ item.paymentMethod == "creditCard" ? "บัตรเครดิต" : "เงินสด" }}
            </template> -->
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>รายการโอนเข้าสินค้า</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-text-field v-model="searchInvoice" append-icon="mdi-magnify" label="ใส่เลข Invoice No" single-line hide-details></v-text-field>
                <v-spacer></v-spacer>
                <v-btn color="cyan lighten-1" @click.prevent="overlayTI = true, dialogTI = true">โอนเข้า(TI)</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="cyan lighten-4" @click.prevent="overlayAdjustStock = true, dialogAdjustStock = true">ปรับปรุงสต๊อกเพิ่ม</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="cyan lighten-3" @click.prevent="overlayKeyIn = true, dialogKeyIn = true">Key In Data</v-btn>
              </v-toolbar>
            </template>
          </v-data-table>
          <v-dialog v-model="dialogTI" max-width="500px" :retain-focus="false" persistent>
            <v-overlay :absolute="absolute" :value="overlayTI" responsive>
              <v-card class="mx-auto" max-width="500px" light>
                <v-card-title>
                  <b>โอนเข้า(TI)</b>
                  <v-spacer></v-spacer>
                  <v-btn icon @click.prevent="dialogTI=false, overlayTI=false"><v-icon>mdi-close</v-icon></v-btn>
                </v-card-title>
                <v-card-subtitle class="pb-0">โอนเข้า(TI)</v-card-subtitle>
                <v-card-text class="text--primary">
                  <v-row>
                      <v-col style="background-color: #F0F4C3;">
                        <label></label>
                        <b-form>
                          <label>1000 :</label>
                          <b-form-input size="sm" type="number" trim></b-form-input>
                        </b-form>
                      </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <!-- <v-btn color="warning" text @click.prevent="clearForm()">Reset</v-btn> -->
                  <!-- <v-btn type="submit" color="success" text @click.prevent="saveForm()">Save</v-btn> -->
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
// import axios from 'axios';

export default {
    data() {
        return {
            searchInvoice: "",
            today: dayjs().format("DD-MM-YYYY"),
            headersCheckInStock: [
                { text: "Invoice No", value: "invoiceNo" },
                // { text: "Order Date", sortable: true, value: "orderDate" },
                // { text: "amount", value: "amount" },
                // { text: "discount", value: "discountTotal" },
                // { text: "net", value: "net" },
                // { text: "points", value: "points" },
                // { text: "Payment Method", value: "paymentMethod" },
                // { text: "Received", value: "received" },
                // { text: "change", value: "change" },
            ],
            listCheckInStock: [],
            userInfo: {},
            paymentMethod: undefined,
            listMenu: [],
            absolute: true,
            dialogTI: false,
            dialogAdjustStock: false,
            dialogKeyIn: false,
            overlayTI: false,
            overlayAdjustStock: false,
            overlayKeyIn: false,
            formCashier: {},
        };
    },
    mounted: function () {
        if (this.$store.state.is_login == false) {
            this.$router.push({ name: "Home" }).catch((error) => {
                if (error.name !== "NavigationDuplicated" && !error.message.includes("Avoided redundant navigation to current location")) {
                    console.log(error);
                }
            });
        } else {
            // if (this.$store.state.listInvoice !== []) {
            //     this.listInvoice = this.$store.state.listInvoice;
            // }
            this.userInfo = JSON.parse(this.$store.state.userInfo);

            /* Default User Menu*/
            let userMenu = JSON.parse(this.userInfo.listUserPermission);
            for (let item of userMenu) {
                for (const [key, value] of Object.entries(item)) {
                    if(key == this.$route.name && item.SubMenu !== undefined) {
                        this.listMenu = item.SubMenu;
                    }
                }
            }
            this.listMenu = this.listMenu.length !== 0? this.listMenu: ['Check In'];

        }
    },
    methods: {
        formatPrice(value) {
            let val = (value / 1).toFixed(2).replace(",", ".");
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        // formatPrice(value) {
        //     let val = (value / 1).toFixed(2).replace(",", ".");
        //     return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        // },
    },
}
</script>

<style>

</style>