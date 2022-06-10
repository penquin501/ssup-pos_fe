<!-- @format -->

<template>
  <div>
    <v-row class="block-net h1">
      <v-row>
        <v-col md="6" class="text-right">Net</v-col>
        <v-col md="3">{{ $i18n.locale == "en" ? "(฿)" : "" }}</v-col>
        <v-col md="3" class="text-right pr-10">{{ formatPrice(10000) }}</v-col>
      </v-row>
      <v-row v-if="$i18n.locale == 'en'">
        <v-col md="6" class="text-right"></v-col>
        <v-col md="3">({{ currencySign }})</v-col>
        <v-col md="3" class="text-right pr-10">{{ formatPrice(10000) }}</v-col>
      </v-row>
    </v-row>
    <v-row class="block-detail px-3 pt-1 pb-5 my-3">
      <v-row>
        <v-col md="6" class="text-right">Credit Note</v-col>
        <v-col md="3">{{ $i18n.locale == "en" ? "(฿)" : "" }}</v-col>
        <v-col md="3" class="pt-1"
          ><v-text-field solo height="10" style="height: 24px" dense
            >0.00</v-text-field
          ></v-col
        >
      </v-row>
      <v-row>
        <v-col md="2"></v-col>
        <v-col md="2" class="text-right"
          ><v-btn small @click.prevent="dialogOnTop = true">T</v-btn></v-col
        >
        <v-col md="2" class="text-right">On Top</v-col>
        <v-col md="3">{{ $i18n.locale == "en" ? "(฿)" : "" }}</v-col>
        <v-col md="3" class="pt-1"
          ><v-text-field solo height="10" style="height: 24px" dense
            >0.00</v-text-field
          ></v-col
        >
      </v-row>
      <v-row>
        <v-col md="2"></v-col>
        <v-col md="2" class="text-right"
          ><v-btn small @click.prevent="dialogCoupon = true">V/C</v-btn></v-col
        >
        <v-col md="2" class="text-right">Voucher/Coupon</v-col>
        <v-col md="3">{{ $i18n.locale == "en" ? "(฿)" : "" }}</v-col>
        <v-col md="3" class="pt-1">
          <v-row>
            <v-col md="10" class="py-0"
              ><v-text-field solo height="10" style="height: 24px" dense
                >0.00</v-text-field
              ></v-col
            >
            <v-col md="2" class="py-0"
              ><v-text-field solo height="10" style="height: 24px" dense
                >0.00</v-text-field
              ></v-col
            >
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col md="6" class="text-right">Cash</v-col>
        <v-col md="3">{{ $i18n.locale == "en" ? "(฿)" : "" }}</v-col>
        <v-col md="3" class="pt-1"
          ><v-text-field solo height="10" style="height: 24px" dense
            >0.00</v-text-field
          ></v-col
        >
      </v-row>
      <v-row v-if="$i18n.locale == 'en'">
        <v-col md="6" class="text-right"></v-col>
        <v-col md="3">({{ currencySign }})</v-col>
        <v-col md="3" class="pt-1"
          ><v-text-field solo height="10" style="height: 24px" dense
            >0.00</v-text-field
          ></v-col
        >
      </v-row>
      <v-row>
        <v-col md="6" class="text-right">Credit</v-col>
        <v-col md="3">{{ $i18n.locale == "en" ? "(฿)" : "" }}</v-col>
        <v-col md="3" class="pt-1"
          ><v-text-field solo height="10" style="height: 24px" dense
            >0.00</v-text-field
          ></v-col
        >
      </v-row>
      <v-row>
        <v-col md="6" class="text-right">Balance</v-col>
        <v-col md="3">{{ $i18n.locale == "en" ? "(฿)" : "" }}</v-col>
        <v-col md="3" class="pt-1"
          ><v-text-field solo height="10" style="height: 24px" dense
            >0.00</v-text-field
          ></v-col
        >
      </v-row>
      <v-row v-if="$i18n.locale == 'en'">
        <v-col md="6" class="text-right"></v-col>
        <v-col md="3">({{ currencySign }})</v-col>
        <v-col md="3" class="pt-1"
          ><v-text-field solo height="10" style="height: 24px" dense
            >0.00</v-text-field
          ></v-col
        >
      </v-row>
      <v-row>
        <v-col md="6" class="text-right">Change</v-col>
        <v-col md="3">{{ $i18n.locale == "en" ? "(฿)" : "" }}</v-col>
        <v-col md="3" class="pt-1"
          ><v-text-field solo height="10" style="height: 24px" dense
            >0.00</v-text-field
          ></v-col
        >
      </v-row>
      <v-row v-if="$i18n.locale == 'en'">
        <v-col md="6" class="text-right"></v-col>
        <v-col md="3">({{ currencySign }})</v-col>
        <v-col md="3" class="pt-1"
          ><v-text-field solo height="10" style="height: 24px" dense
            >0.00</v-text-field
          ></v-col
        >
      </v-row>
    </v-row>

    <v-dialog v-model="dialogOnTop" max-width="550px;" persistent>
      <v-card style="width: 50vw">
        <v-card-title class="text-h5">
          On Top
          <v-spacer></v-spacer>
          <v-icon @click.prevent="dialogOnTop = false"
            >mdi-close</v-icon
          ></v-card-title
        >
        <v-card-text>
          <v-data-table
            dense
            v-model="selectedPromotion"
            :headers="headersPromotion"
            :items="listPromotion"
            :single-select="singleSelect"
            item-key="promotion_code"
            show-select
            class="elevation-1"
            height="300"
            :items-per-page="listPromotion.length"
            hide-default-footer
            :disable-sort="disableSort"
          >
          </v-data-table>
        </v-card-text>
        <v-card-actions class="pt-5">
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1">save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogCoupon" max-width="550px;" persistent>
      <v-card style="width: 40vw">
        <v-card-title class="text-h5">
          Voucher/Coupon
          <v-spacer></v-spacer>
          <v-icon @click.prevent="dialogCoupon = false"
            >mdi-close</v-icon
          ></v-card-title
        >
        <v-card-text>
          <v-row>
            <v-col md="8"
              ><v-text-field
                solo
                height="10"
                style="height: 24px"
                dense
                label="Voucher/Coupon Code"
              ></v-text-field
            ></v-col>
            <v-col md="4"
              ><v-btn><v-icon>mdi-plus</v-icon></v-btn></v-col
            >
          </v-row>
          <v-row class="py-3">
            <v-data-table
              dense
              :headers="headersCoupon"
              :items="coupons"
              item-key="id"
              :items-per-page="coupons.length"
              height="300"
              class="elevation-1"
              hide-default-footer
              :disable-sort="disableSort"
            >
              <template v-slot:item.index="{ item, index }">
                {{ index + 1 }}
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
              </template>
            </v-data-table>
          </v-row>
          <v-row class="text-center">
            <v-col md="3">มูลค่า</v-col>
            <v-col md="3">300</v-col>
            <v-col md="3">จำนวน</v-col>
            <v-col md="3">{{ coupons.length }}</v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="pt-5">
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1">save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5"
          >Are you sure you want to delete this item?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="deleteItemConfirm"
            >OK</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
// import axios from "axios";
export default {
  data() {
    return {
      dialogOnTop: false,
      dialogCoupon: false,
      dialogDelete: false,
      disableSort: false,
      singleSelect: true,
      selectedPromotion: [],
      headersPromotion: [
        {
          text: "Promotion",
          value: "promotion_code",
        },
        { text: "Detail", value: "promotion_name" },
      ],
      listPromotion: [
        {
          promotion_name: "Frozen Yogurt",
          promotion_code: 159,
        },
        {
          promotion_name: "Ice cream sandwich",
          promotion_code: 237,
        },
        {
          promotion_name: "Eclair",
          promotion_code: 262,
        },
        {
          promotion_name: "Cupcake",
          promotion_code: 305,
        },
        {
          promotion_name: "Gingerbread",
          promotion_code: 356,
        },
        {
          promotion_name: "Jelly bean",
          promotion_code: 375,
        },
        {
          promotion_name: "Lollipop",
          promotion_code: 392,
        },
        {
          promotion_name: "Honeycomb",
          promotion_code: 408,
        },
        {
          promotion_name: "Donut",
          promotion_code: 452,
        },
        {
          promotion_name: "KitKat",
          promotion_code: 518,
        },
      ],
      headersCoupon: [
        {
          text: "#",
          align: "start",
          sortable: false,
          value: "index",
        },
        { text: "Voucher/Coupon", value: "couponCode", align: "center" },
        { text: "Value", value: "value", align: "center" },
        { text: "", value: "actions", align: "center", sortable: false },
      ],
      coupons: [
        { id: 1, couponCode: "abc", value: "100" },
        { id: 2, couponCode: "abc", value: "100" },
        { id: 3, couponCode: "abc", value: "100" },
      ],
      currencySign: "",
      url: process.env.VUE_APP_SERVER_API,
    };
  },
  mounted: function () {
    // console.log(this.$i18n.locale);
    this.currencySign = this.$i18n.locale == "en" ? "$" : "฿";
    // this.userInfo = JSON.parse(this.$store.state.userInfo);
    // this.configHeader = {
    //   headers: { Authorization: `Bearer ${this.userInfo.token}` },
    // };
    //   if (this.$store.state.is_login == false) {
    //   this.$router.push({ name: "Home" }).catch((error) => {
    //     if (
    //       error.name !== "NavigationDuplicated" &&
    //       !error.message.includes(
    //         "Avoided redundant navigation to current location"
    //       )
    //     ) {
    //       console.log(error);
    //     }
    //   });
    // } else {
    // }
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(",", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    deleteItem(item) {
      console.log(item);
      this.editedIndex = this.coupons.indexOf(item);
      //   this.editedItem = Object.assign({}, item);
      //   this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.listPromotion.splice(this.editedIndex, 1);
      this.closeDelete();
    },
    close() {
      this.dialog = false;
      //   this.$nextTick(() => {
      //     this.editedItem = Object.assign({}, this.defaultItem);
      //     this.editedIndex = -1;
      //   });
    },
    closeDelete() {
      this.dialogDelete = false;
      //   this.$nextTick(() => {
      //     this.editedItem = Object.assign({}, this.defaultItem);
      //     this.editedIndex = -1;
      //   });
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.listPromotion[this.editedIndex], this.editedItem);
      } else {
        this.listPromotion.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>

<style>
.block-net {
  background-color: black;
  border: 3px solid green;
  color: greenyellow;
}
.block-detail {
  background-color: #338787;
  font-size: large;
}
</style>
