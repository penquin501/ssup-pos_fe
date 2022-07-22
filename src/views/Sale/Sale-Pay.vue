<!-- @format -->

<template>
  <div>
    <v-card-text class="pb-0" style="color: white">
      <div>
        <v-row class="block-net h1">
          <v-row>
            <v-col md="6" class="text-right">Net</v-col>
            <v-col md="3">{{ $i18n.locale == "en" ? "(฿)" : "" }}</v-col>
            <v-col md="3" class="text-right pr-10">{{
              formatPrice(
                $store.state.currentOrder == null
                  ? formatPrice(0)
                  : $store.state.currentOrder.main_temp[0].net
              )
            }}</v-col>
          </v-row>
          <v-row v-if="$i18n.locale == 'en'">
            <v-col md="6" class="text-right"></v-col>
            <v-col md="3">({{ currencySign }})</v-col>
            <v-col md="3" class="text-right pr-10">{{
              formatPrice(
                $store.state.currentOrder == null
                  ? formatPrice(0)
                  : $store.state.currentOrder.main_temp[0].net
              )
            }}</v-col>
          </v-row>
        </v-row>
        <v-row class="block-detail px-3 pt-1 pb-5 my-3">
          <v-row>
            <v-col md="6" class="text-right">Credit Note</v-col>
            <v-col md="3">{{ $i18n.locale == "en" ? "(฿)" : "" }}</v-col>
            <v-col md="3" class="pt-1"
              ><v-text-field
                reverse
                solo
                height="10"
                background-color="#E0E0E0"
                style="height: 24px"
                dense
                v-model="paymentForm.creditNote"
                type="number"
                readonly
              ></v-text-field
            ></v-col>
          </v-row>
          <v-row>
            <v-col md="2"></v-col>
            <v-col md="2" class="text-right"
              ><v-btn
                small
                @click.prevent="(dialogOnTop = true), getListPromotionOnTop()"
                >T</v-btn
              ></v-col
            >
            <v-col md="2" class="text-right">On Top</v-col>
            <v-col md="3">{{ $i18n.locale == "en" ? "(฿)" : "" }}</v-col>
            <v-col md="3" class="pt-1"
              ><v-text-field
                reverse
                solo
                height="10"
                background-color="#E0E0E0"
                style="height: 24px"
                dense
                v-model="paymentForm.sumOnTop"
                type="number"
                readonly
              ></v-text-field
            ></v-col>
          </v-row>
          <v-row>
            <v-col md="2"></v-col>
            <v-col md="2" class="text-right"
              ><v-btn
                small
                @click.prevent="(dialogCoupon = true), checkCoupon()"
                >V/C</v-btn
              ></v-col
            >
            <v-col md="2" class="text-right">Voucher/Coupon</v-col>
            <v-col md="3">{{ $i18n.locale == "en" ? "(฿)" : "" }}</v-col>
            <v-col md="3" class="pt-1">
              <v-row>
                <v-col md="10" class="py-0"
                  ><v-text-field
                    reverse
                    solo
                    height="10"
                    background-color="#E0E0E0"
                    style="height: 24px"
                    dense
                    v-model="paymentForm.sumVoucher"
                    type="number"
                    readonly
                  ></v-text-field
                ></v-col>
                <v-col md="2" class="py-0"
                  ><v-text-field
                    reverse
                    solo
                    height="10"
                    background-color="#E0E0E0"
                    style="height: 24px"
                    dense
                    v-model="paymentForm.amountVoucher"
                    readonly
                  ></v-text-field
                ></v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="6" class="text-right">Cash</v-col>
            <v-col md="3">{{ $i18n.locale == "en" ? "(฿)" : "" }}</v-col>
            <v-col md="3" class="pt-1"
              ><v-text-field
                reverse
                solo
                height="10"
                background-color="yellow"
                style="height: 24px"
                dense
                v-model="paymentForm.cash"
                type="number"
                @keypress.enter="calculateChange()"
              ></v-text-field
            ></v-col>
          </v-row>
          <v-row v-if="$i18n.locale == 'en'">
            <v-col md="6" class="text-right"></v-col>
            <v-col md="3">({{ currencySign }})</v-col>
            <v-col md="3" class="pt-1"
              ><v-text-field
                reverse
                solo
                height="10"
                background-color="yellow"
                style="height: 24px"
                dense
                v-model="paymentForm.cash"
                type="number"
              ></v-text-field
            ></v-col>
          </v-row>
          <v-row>
            <v-col md="6" class="text-right">Credit</v-col>
            <v-col md="3">{{ $i18n.locale == "en" ? "(฿)" : "" }}</v-col>
            <v-col md="3" class="pt-1"
              ><v-text-field
                reverse
                solo
                height="10"
                background-color="#E0E0E0"
                style="height: 24px"
                dense
                v-model="paymentForm.credit"
                type="number"
                readonly
              ></v-text-field
            ></v-col>
          </v-row>
          <v-row>
            <v-col md="6" class="text-right">Balance</v-col>
            <v-col md="3">{{ $i18n.locale == "en" ? "(฿)" : "" }}</v-col>
            <v-col md="3" class="pt-1"
              ><v-text-field
                reverse
                solo
                height="10"
                background-color="#E0E0E0"
                style="height: 24px"
                dense
                v-model="paymentForm.balance"
                type="number"
                readonly
              ></v-text-field
            ></v-col>
          </v-row>
          <v-row v-if="$i18n.locale == 'en'">
            <v-col md="6" class="text-right"></v-col>
            <v-col md="3">({{ currencySign }})</v-col>
            <v-col md="3" class="pt-1"
              ><v-text-field
                reverse
                solo
                height="10"
                background-color="#E0E0E0"
                style="height: 24px"
                dense
                v-model="paymentForm.balance"
                type="number"
                readonly
              ></v-text-field
            ></v-col>
          </v-row>
          <v-row>
            <v-col md="6" class="text-right">Change</v-col>
            <v-col md="3">{{ $i18n.locale == "en" ? "(฿)" : "" }}</v-col>
            <v-col md="3" class="pt-1"
              ><v-text-field
                reverse
                solo
                height="10"
                background-color="#E0E0E0"
                style="height: 24px"
                dense
                v-model="paymentForm.change"
                type="number"
                readonly
              ></v-text-field
            ></v-col>
          </v-row>
          <v-row v-if="$i18n.locale == 'en'">
            <v-col md="6" class="text-right"></v-col>
            <v-col md="3">({{ currencySign }})</v-col>
            <v-col md="3" class="pt-1"
              ><v-text-field
                reverse
                solo
                height="10"
                background-color="#E0E0E0"
                style="height: 24px"
                dense
                v-model="paymentForm.change"
                type="number"
                readonly
              ></v-text-field
            ></v-col>
          </v-row>
        </v-row>
      </div>
    </v-card-text>
    <v-card-actions class="pt-0">
      <b-button class="btn-action-pay btn-color">
        <b-img
          style="width: 30px; height: 30px"
          src="./img/icons/alipay-brands.svg"
        ></b-img>
        <br />
        <span style="font-size: 14px">Alipay</span>
      </b-button>
      <b-button
        class="btn-action-pay btn-color"
        @click.prevent="(dialogCreditCard = true), getCreditType()"
      >
        <v-icon size="32" color="black">mdi-credit-card-multiple</v-icon>
        <br />
        <span style="font-size: 14px">Credit Card</span>
      </b-button>
      <!-- <b-button variant="primary" class="btn-action-pay">
            <v-icon size="32" color="black">mdi-file-document-box</v-icon>
            <br />
            <span style="font-size: 14px">Tax Invoice</span>
          </b-button> -->
      <v-spacer></v-spacer>
      <b-button
        class="btn-action-pay btn-color"
        @click.prevent="savePaymentInfo()"
      >
        <v-icon size="32" color="black">mdi-content-save-all</v-icon>
        <br />
        <span style="font-size: 14px">Save</span>
      </b-button>
    </v-card-actions>

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
          <v-row>
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
          </v-row>
        </v-card-text>
        <v-card-actions class="pt-5">
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" @click.prevent="selectPromoOnTop()"
            >save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogCreditCard" max-width="550px;" persistent>
      <v-card style="width: 40vw">
        <v-card-title class="text-h5">
          Credit Card
          <v-spacer></v-spacer>
          <v-icon @click.prevent="dialogCreditCard = false"
            >mdi-close</v-icon
          ></v-card-title
        >
        <v-card-text>
          <v-row style="background-color: lightyellow; font-weight: bold">
            <v-row>
              <v-col class="py-2" md="1"></v-col>
              <v-col class="py-2" md="4">ชุดสมัครใหม่ OPNKSRI:</v-col>
              <v-col class="py-2" md="7"
                >ต้องชำระผ่านบัตรเครดิตกรุงศรีเท่านั้น</v-col
              >
            </v-row>
            <v-row>
              <v-col class="py-2" md="1"></v-col>
              <v-col class="py-2" md="4">ชุดสมัครใหม่ OPNKTC:</v-col>
              <v-col class="py-2" md="7"
                >ต้องชำระผ่านบัตรเครดิตกสิกรไทยเท่านั้น</v-col
              >
            </v-row>
          </v-row>
          <v-row style="font-weight: bold">
            <v-row>
              <v-col class="text-right">ประเภทบัตร</v-col>
              <v-col
                ><v-select
                  v-model="creditCardInfo.creditCardType"
                  :items="optionsCard"
                  style="height: 24px"
                  solo
                  dense
                  outlined
                ></v-select
              ></v-col>
            </v-row>
            <v-row>
              <v-col class="text-right">รหัสบัตรเครดิต</v-col>
              <v-col
                ><v-text-field
                  solo
                  height="10"
                  style="height: 24px"
                  dense
                  maxlength="16"
                  v-model="creditCardInfo.creditCardNo"
                ></v-text-field
              ></v-col>
            </v-row>
            <v-row>
              <v-col class="text-right">จำนวนเงิน</v-col>
              <v-col>
                <v-text-field
                  solo
                  height="10"
                  style="height: 24px"
                  dense
                  type="number"
                  v-model="creditCardInfo.creditCardValue"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-row>
        </v-card-text>
        <v-card-actions class="pt-5">
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" @click.prevent="clearCreditCardInfo()"
            >Clear</v-btn
          >
          <v-btn color="blue darken-1" @click.prevent="saveCreditCardInfo()"
            >OK</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogFreeBag" max-width="550px;" persistent>
      <v-card style="width: 80vw; background-color: #649893">
        <v-card-title class="text-h5 pb-0">
          Free Bag
          <v-spacer></v-spacer>
          <v-icon @click.prevent="dialogFreeBag = false">mdi-close</v-icon>
        </v-card-title>
        <v-card-text class="pb-0">
          <v-row>
            <v-col
              md="3"
              v-for="(item, index) in listBag"
              :key="item.product_id"
            >
              <div class="text-center white">
                <b-img
                  thumbnail
                  style="width: 100px; height: 100px; border: none"
                  :src="item.image_path"
                ></b-img>

                <br />
                <span class="text-center"
                  >{{ item.product_desc }}
                  <b-form-input
                    style="text-align: center"
                    type="number"
                    :value="item"
                    v-model="item.numBag"
                    @change="selectBag(item)"
                  ></b-form-input
                ></span>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="pt-0">
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" @click.prevent="saveBillMain()"
            >Save</v-btn
          >
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
                ref="inputCoupon"
                v-model="inputCoupon"
                @keypress.enter="addCoupon()"
              ></v-text-field
            ></v-col>
            <v-col md="4"
              ><v-btn @click.prevent="addCoupon()"
                ><v-icon>mdi-plus</v-icon></v-btn
              ></v-col
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
          <v-row
            style="border-top: 1.5px dashed black; font-size: 16px"
            class="text-center"
          >
            <v-col md="3">มูลค่า</v-col>
            <v-col md="3">{{ formatPrice(paymentForm.sumVoucher) }}</v-col>
            <v-col md="3">จำนวน</v-col>
            <v-col md="3">{{ paymentForm.amountVoucher }}</v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="pt-5">
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" @click.prevent="saveCoupon()"
            >save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogReceipt" max-width="450px;" persistent>
      <v-card class="text-center" max-width="450px">
        <v-card-text>
          <SaleReceipt />
        </v-card-text>
      </v-card>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-icon @click.prevent="closeDialog()">mdi-close</v-icon>
      </v-card-actions>
    </v-dialog>
    <v-dialog v-model="dialogDelete" max-width="500px" persistent>
      <v-card>
        <v-card-title class="text-h5"
          >ต้องการ ยกเลิก การใช้คูปองนี้ ใช่หรือไม่?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogDelete = false"
            >Cancel</v-btn
          >
          <v-btn color="blue darken-1" text @click="confirmDeleteItem()"
            >OK</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";

import SaleReceipt from "@/views/Sale/Sale-Receipt.vue";
export default {
  components: {
    SaleReceipt,
  },
  data() {
    return {
      userInfo: "",
      dialogOnTop: false,
      dialogCoupon: false,
      dialogDelete: false,
      dialogCreditCard: false,
      dialogFreeBag: false,
      dialogReceipt: false,
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
      listPromotion: [],
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
      optionsCard: [],
      creditCardInfo: {
        creditCardType: 0,
        creditCardNo: "",
        creditCardValue: 0,
      },
      coupons: [],
      listBag: [],
      paymentForm: {
        creditNote: 0,
        sumOnTop: 0,
        sumVoucher: 0,
        amountVoucher: 0,
        cash: 0,
        credit: 0,
        balance: 0,
        change: 0,
      },
      displayForm: {
        creditNote: 0,
        sumOnTop: 0,
        sumVoucher: 0,
        amountVoucher: 0,
        cash: 0,
        credit: 0,
        balance: 0,
        change: 0,
      },
      currencySign: "",
      inputCoupon: "",
      selectedIndex: -1,
      selectedBag: [],
      numBag: 0,
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
      this.currencySign = this.$i18n.locale == "en" ? "$" : "฿";
      this.userInfo = JSON.parse(this.$store.state.userInfo);
      //   let doc_date = this.userInfo.doc_date;
      this.configHeader = {
        headers: { Authorization: `Bearer ${this.userInfo.token}` },
      };
      this.coupons =
        this.$store.state.currentOrder.coupons === undefined
          ? []
          : this.$store.state.currentOrder.coupons;
      this.checkCoupon();
      this.calculateBalance();
      // this.$store.commit("currentOrder", null);

      if (this.$store.state.receiptInfo !== null) {
        this.dialogReceipt = true;
      }
    }
  },
  methods: {
    checkValue() {
      this.formatPrice(this.creditCardInfo.creditCardValue);
    },
    getCreditType() {
      this.optionsCard = [];
      this.optionsCard.push({ value: 0, text: "เลือก" });

      axios
        .get(this.url + "/cart/listpaid", this.configHeader)
        .then((res) => {
          let response = res.data;
          response.listCreditType.forEach((e) => {
            this.optionsCard.push({ ...e, text: e.description, value: e.id });
          });
        })
        .catch((err) => {
          console.log("get list credit error = ", err);
        });
    },
    clearCreditCardInfo() {
      this.creditCardInfo = {
        creditCardType: 0,
        creditCardNo: "",
        creditCardValue: 0,
      };
    },
    saveCreditCardInfo() {
      if (this.creditCardInfo.creditCardType == 0) {
        alert("กรุณาระบุ ประเภทบัตร ให้ถูกต้อง");
        return;
      }
      if (
        this.creditCardInfo.creditCardNo == "" ||
        this.creditCardInfo.creditCardNo.length !== 16
      ) {
        alert("กรุณาระบุ รหัสบัตรเครดิต ให้ถูกต้อง");
        return;
      }
      if (
        this.creditCardInfo.creditCardValue == "" ||
        parseInt(this.creditCardInfo.creditCardValue) == 0
      ) {
        alert("กรุณาระบุ จำนวนเงิน ให้ถูกต้อง");
        return;
      }
      let selectedCard = this.optionsCard.find(
        (ele) => ele.value == this.creditCardInfo.creditCardType
      );
      if (selectedCard !== undefined) {
        if (this.creditCardInfo.creditCardValue > this.paymentForm.balance) {
          alert(
            "ยอดชำระบัตรเครดิต เกินกว่า ยอดชำระสุทธิ, กรุณาตรวจสอบอีกครั้ง"
          );
          this.creditCardInfo.creditCardValue = 0;
          return;
        }
        this.paymentForm.credit = this.creditCardInfo.creditCardValue;

        this.creditCardInfo.selectedCard = selectedCard;
        this.$store.state.currentOrder.creditCardInfo = this.creditCardInfo;
        this.$store.commit("currentOrder", this.$store.state.currentOrder);
        this.calculateBalance();
        this.dialogCreditCard = false;
      }
    },
    getListPromotionOnTop() {
      this.listPromotion = [
        {
          promotion_name: "Frozen Yogurt",
          promotion_code: 159,
          value: 100,
        },
        {
          promotion_name: "Ice cream sandwich",
          promotion_code: 237,
          value: 100,
        },
        {
          promotion_name: "Eclair",
          promotion_code: 262,
          value: 100,
        },
        {
          promotion_name: "Cupcake",
          promotion_code: 305,
          value: 100,
        },
        {
          promotion_name: "Gingerbread",
          promotion_code: 356,
          value: 100,
        },
        {
          promotion_name: "Jelly bean",
          promotion_code: 375,
          value: 100,
        },
        {
          promotion_name: "Lollipop",
          promotion_code: 392,
          value: 100,
        },
        {
          promotion_name: "Honeycomb",
          promotion_code: 408,
          value: 100,
        },
        {
          promotion_name: "Donut",
          promotion_code: 452,
          value: 100,
        },
        {
          promotion_name: "KitKat",
          promotion_code: 518,
          value: 100,
        },
      ];
    },
    selectPromoOnTop() {
      this.selectedPromotion[0].promotion_code =
        this.selectedPromotion[0].promotion_code.toString();

      this.paymentForm.sumOnTop = this.selectedPromotion[0].value;
      // this.paymentForm.sumOnTop = this.formatPrice(this.paymentForm.sumOnTop); //only for display
      this.calculateBalance();
      this.dialogOnTop = false;
    },
    checkCoupon() {
      if (this.coupons.length !== 0) {
        this.calculateCouponValue();
      }
    },
    addCoupon() {
      let dataCoupon = { couponCode: this.inputCoupon, value: "100" }; //TODO: เช็คค่าจาก api
      this.coupons.push(dataCoupon);
      this.calculateCouponValue();

      this.inputCoupon = "";
      this.$refs.inputCoupon.focus();
    },
    convertStrToFloat(value) {
      if (value.length > 3) {
        value = value.replaceAll(",", "");
      }

      return parseInt(value);
    },
    calculateCouponValue() {
      // this.paymentForm.sumVoucher = this.convertStrToFloat(
      //   this.paymentForm.sumVoucher
      // );
      // console.log(this.paymentForm.sumVoucher);
      this.paymentForm.sumVoucher = 0;

      this.coupons.forEach((e) => {
        this.paymentForm.sumVoucher += parseInt(e.value);
      });
      // this.paymentForm.sumVoucher = this.formatPrice(
      //   this.paymentForm.sumVoucher
      // ); //only for display
      this.paymentForm.amountVoucher = this.coupons.length;
    },
    deleteItem(item) {
      if (this.coupons.length <= 0) {
        alert("ไม่สามารถลบข้อมูลได้ เนื่องจาก...ไม่มีรายการ Coupon/Voucher");
        return;
      }
      this.selectedIndex = this.coupons.indexOf(item);
      this.dialogDelete = true;
    },
    saveCoupon() {
      this.calculateBalance();
      this.$store.state.currentOrder.coupons = this.coupons;
      this.$store.commit("currentOrder", this.$store.state.currentOrder);

      this.dialogCoupon = false;
    },
    calculateBalance() {
      let checkCredit =
        this.creditCardInfo.creditCardValue !== 0
          ? parseInt(this.creditCardInfo.creditCardValue)
          : 0;
      let sumBalance =
        this.paymentForm.sumOnTop + this.paymentForm.sumVoucher + checkCredit;

      if (sumBalance > this.$store.state.currentOrder.main_temp[0].net) {
        alert("ยอดชำระเกินกว่ายอดรวมสุทธิ, กรุณาตรวจสอบการชำระเงินอีกครั้ง");
        return;
      }

      this.paymentForm.balance =
        parseInt(this.$store.state.currentOrder.main_temp[0].net) -
        parseInt(sumBalance);

      // this.paymentForm.balance = this.formatPrice(this.paymentForm.balance); //only for display
    },
    calculateChange() {
      this.paymentForm.change = 0;
      let pay =
        this.paymentForm.balance == 0
          ? parseInt(this.$store.state.currentOrder.main_temp[0].net)
          : this.paymentForm.balance;

      let cash = parseInt(this.paymentForm.cash * 1.0);
      // console.log(cash);
      this.paymentForm.change = parseInt(cash) - parseInt(pay);
      // this.paymentForm.change = this.formatPrice(this.paymentForm.change); //only for display
      // this.paymentForm.cash = this.formatPrice(cash); //only for display
    },
    confirmDeleteItem() {
      this.coupons.splice(this.selectedIndex, 1);
      this.calculateCouponValue();
      this.dialogDelete = false;
    },
    savePaymentInfo() {
      // let pay =
      //   parseInt(this.paymentForm.balance) == 0
      //     ? this.paymentForm.cash
      //     : this.paymentForm.balance;
      // console.log(this.paymentForm.cash);
      if (
        parseInt(this.paymentForm.cash + this.paymentForm.balance) <
        parseInt(this.$store.state.currentOrder.main_temp[0].net)
      ) {
        alert("ยอดชำระไม่ครบตามยอดสุทธิ, กรุณาตรวจสอบอีกครั้ง");
        return;
      }

      // TODO ถ้ามีแต่ cash อย่างเดียว ให้ใส่ payment_type มาด้วย

      this.$store.state.currentOrder.paymentInfo = this.paymentForm;
      this.$store.commit("currentOrder", this.$store.state.currentOrder);
      this.selectedBag = [];
      this.getListBag();
      this.dialogFreeBag = true;
    },
    getListBag() {
      this.listBag = [];
      let body = {
        brand_id: this.userInfo.data.brand_id,
      };
      axios
        .post(this.url + "/cart/listfreebag", body, this.configHeader)
        .then((res) => {
          let response = res.data;
          response.listBag.forEach((e) => {
            this.listBag.push({ ...e, numBag: 0 });
          });
        })
        .catch((err) => {
          console.log("get list free bag error = ", err);
        });
    },
    selectBag(data) {
      if (parseInt(data.numBag) >= 0) {
        this.checkAmountBag();
        let checkExistedBag = this.selectedBag.find(
          (ele) => ele.product_id == data.product_id
        );
        if (checkExistedBag !== undefined) {
          let index = this.selectedBag.indexOf(checkExistedBag);
          this.selectedBag.splice(index, 1);
        }
        if (parseInt(data.numBag) !== 0) {
          this.selectedBag.push(data);
        }
      } else {
        alert("เลือกถุงไม่ถูกต้อง, กรุณาตรวจสอบอีกครั้ง");
        data.numBag = 0;
        return;
      }
    },
    checkAmountBag() {
      let amountBag = 0;
      this.listBag.forEach((e) => {
        amountBag += parseInt(e.numBag);
      });
      if (amountBag > 3) {
        alert("จำนวนถุงเกินกว่า 3 ถุง, กรุณาตรวจสอบอีกครั้ง");
        return;
      }
    },
    saveBillMain() {
      if (this.selectedBag.length <= 0) {
        alert("เลือกถุงไม่ถูกต้อง, กรุณาตรวจสอบอีกครั้ง");
        return;
      }

      let body = {};
      body.invoice_no_temp = this.$store.state.currentOrder.invoice_no_temp;
      body.memberInfo = this.$store.state.currentOrder.memberInfo;

      this.creditCardInfo.creditCardType =
        this.creditCardInfo.creditCardType.toString();
      body.creditCardInfo = this.creditCardInfo;
      body.paymentInfo = this.$store.state.currentOrder.paymentInfo;
      body.promotionOnTopInfo = this.selectedPromotion;
      body.listCoupon = this.coupons;
      body.selectedBag = this.selectedBag;
      body.posId = location.host;

      axios
        .post(this.url + "/cart/save/bill/main", body, this.configHeader)
        .then((res) => {
          let response = res.data;
          if (response.message == "success") {
            // alert("เลขที่บิล " + response.invoice_no);
            this.printReceipt(response.invoice_no);
          } else {
            alert(
              "ไม่สามารถบันทึกรายการซื้อสินค้านี้ได้ เนื่องจาก..." +
                JSON.stringify(response.message)
            );
          }
        })
        .catch((err) => {
          console.log("save bill main error = ", err);
        });
    },
    closeDialog() {
      this.dialogReceipt = false;
      this.dialogFreeBag = false;
      this.$store.commit("currentOrder", null);
      this.$store.commit("setReceiptInfo", null);
      this.$router.go();
    },
    printReceipt(invoiceNo) {
      axios
        .get(
          this.url + "/cart/receipt?invoiceNo=" + invoiceNo,
          this.configHeader
        )
        .then((res) => {
          this.$store.commit("setReceiptInfo", res.data);
          this.dialogReceipt = true;
        })
        .catch((err) => {
          console.log("error receipt info = ", err);
        });
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(",", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
/* input {
  text-align: end;
} */
</style>
