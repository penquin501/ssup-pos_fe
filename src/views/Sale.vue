<!-- @format -->

<template>
  <div>
    <v-row>
      <v-col xs="12" sm="12" md="6" lg="9" xl="9">
        <v-row>
          <v-col cols="12" class="ml-5 mr-2">
            <v-row>
              <v-col sm="6" md="3">
                <v-text-field
                  style="height: 24px"
                  height="10"
                  clearable
                  solo
                  dense
                  placeholder="Search Member"
                  :append-icon="'mdi-account-search'"
                  v-model="inputMemberCode"
                  ref="memberId"
                  @keypress.enter="getMemberInfo()"
                ></v-text-field>
              </v-col>
              <v-col sm="6" md="2">
                <v-btn
                  color="primary"
                  @click.prevent="
                    (dialogCheckMember = true), (selectedScan = {})
                  "
                  ><v-icon>mdi-account-box</v-icon></v-btn
                >
              </v-col>
              <v-col sm="6" md="3">
                <!-- TODO waiting decition process -->
                <!-- <v-btn-toggle
                  color="success"
                  dense
                  rounded
                  v-model="selectedPayPromotion"
                >
                  <v-btn value="1">Auto</v-btn>
                  <v-btn value="2">Manual</v-btn>
                </v-btn-toggle> -->
              </v-col>
              <v-col sm="6" md="3" class="text-right">
                <label
                  ><strong>{{ docDate }}</strong></label
                >
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row style="background-color: #e8f5e9">
          <v-col cols="12" class="ml-5 mr-5">
            <v-row>
              <v-col sm="4" md="4">
                <v-row>
                  <strong>{{ memberInfo.name }}</strong>
                </v-row>
                <v-row>
                  <label
                    >Point:
                    <span
                      ><strong>{{ memberInfo.point }}</strong></span
                    ></label
                  >
                </v-row>
              </v-col>
              <v-col sm="4" md="4">
                <v-row v-if="memberInfo.name !== '' && memberInfo.type !== ''">
                  <strong>{{ memberInfo.type }}</strong>
                </v-row>
                <v-row v-else-if="memberInfo.name == 'Walk-In Customer'">
                  <strong>-</strong>
                </v-row>
                <v-row v-else>
                  <strong></strong>
                </v-row>
                <v-row>
                  <label
                    >Discount:
                    <span
                      ><strong>{{ memberInfo.discount }} %</strong></span
                    ></label
                  >
                </v-row>
              </v-col>
              <v-col sm="1" md="1"> </v-col>
              <v-col sm="4" md="3">
                <v-row>
                  <span>
                    <v-switch
                      color="green"
                      v-model="selectedRedeemPoint"
                      inset
                      dense
                      label="Redeem Point"
                      @change="selectToRedeemPoint()"
                    ></v-switch>
                  </span>
                </v-row>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="pt-0 pb-0" style="color: red">{{ otherMsg }}</v-col>
            </v-row>
            <v-row>
              <v-col md="2" class="pt-0 pb-0">Remark:</v-col>
              <v-col md="10" class="pt-0 pb-0">
                <b-form-textarea
                  style="width: 600px; height: 60px; margin-bottom: 10px"
                  rows="1"
                  max-rows="2"
                  maxlength="250"
                  v-model="memberInfo.remark"
                  no-resize
                ></b-form-textarea>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="ml-5 mr-5">
            <v-row>
              <v-col md="4"
                ><label style="font-size: 24px"
                  ><strong>(00)บิลเงินสดอย่างย่อ</strong></label
                ></v-col
              >
              <v-col md="8"> </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-data-table
            v-model="selectedItems"
            :search="search"
            item-key="product_id"
            :headers="headers"
            :items="items"
            class="elevation-1 pl-2 pr-6"
            dense
            show-select
            style="background-color: #eeeeee"
          >
            <template v-slot:top>
              <v-toolbar flat style="background-color: #eeeeee">
                <v-col md="3" class="pa-0"
                  ><label>Product Barcode:</label></v-col
                >
                <v-col md="3" class="pa-0">
                  <b-form-input
                    id="input-small"
                    size="sm"
                    autocomplete="off"
                    v-model="inputProductCode"
                    ref="inputProductCode"
                    @keypress.enter="getProductInfo()"
                  ></b-form-input>
                </v-col>
                <v-col md="1"><label>Qty:</label></v-col>
                <v-col md="1" class="pa-0">
                  <b-form-input
                    id="input-small"
                    size="sm"
                    type="number"
                    v-model="qty"
                    @keypress.down="checkNumber()"
                    @change="checkNumber()"
                  ></b-form-input>
                </v-col>
                <v-col md="5" class="pa-0"> </v-col>
                <!-- <v-col md="3" class="block-bin">
                  <v-spacer></v-spacer>
                  <v-btn color="primary" plain x-small
                    ><v-icon>mdi-file-plus</v-icon> New</v-btn
                  >
                  <v-btn color="primary" @click="deleteItem()" plain x-small
                    ><v-icon>fa fa-trash-o</v-icon> Delete</v-btn
                  ></v-col
                > -->
              </v-toolbar>
            </template>
            <template v-slot:item.index="{ item, index }">
              {{ index + 1 }}
            </template>
            <template v-slot:item.product_name="{ item, index }">
              <td class="pa-0">
                {{ item.product_name }}
              </td>
            </template>
            <template v-slot:item.qty="{ item, index }">
              <td class="text-right pa-0">
                {{ item.qty }}
              </td>
            </template>
            <template v-slot:item.price="{ item, index }">
              <td class="text-right pa-0">
                {{ formatPrice(item.price) }}
              </td>
            </template>
            <template v-slot:item.amount="{ item, index }">
              <td class="text-right pa-0" style="color: green">
                {{ formatPrice(item.amount) }}
              </td>
            </template>
            <template v-slot:item.discount="{ item, index }">
              <td class="text-right pa-0">
                {{ formatPrice(item.discount) }}
              </td>
            </template>
            <template v-slot:item.total="{ item, index }">
              <td class="text-right pa-0">
                {{ formatPrice(item.total) }}
              </td>
            </template>
          </v-data-table>
        </v-row>
      </v-col>
      <v-col xs="12" sm="12" md="6" lg="3" xl="3" class="pa-0">
        <v-expansion-panels v-model="panel" accordion multiple>
          <v-expansion-panel
            style="background-color: #cdeb8b"
            @click.prevent="openPanelFunction()"
          >
            <v-expansion-panel-header
              style="background-color: #43a047; color: white"
            >
              <b>Payment</b>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row>
                <v-col>
                  <v-row>
                    <v-col md="5">Point:</v-col>
                    <v-col md="5" class="text-right">{{ 300 }}</v-col>
                    <v-col md="2">pt</v-col>
                  </v-row>
                  <v-row>
                    <v-col md="5">Point Used:</v-col>
                    <v-col md="5" class="text-right">{{ 3000 }}</v-col>
                    <v-col md="2">pt</v-col>
                  </v-row>
                  <v-row>
                    <v-col md="5">Point Total:</v-col>
                    <v-col md="5" class="text-right">{{ 300 }}</v-col>
                    <v-col md="2">pt</v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-row style="background-color: white">
                <v-col>
                  <v-row>
                    <v-col md="6">Sub Total:</v-col>
                    <v-col md="4" class="text-right">{{
                      formatPrice(1000)
                    }}</v-col>
                    <v-col md="2"></v-col>
                  </v-row>
                  <v-row>
                    <v-col md="6">Discount:</v-col>
                    <v-col md="4" class="text-right">{{
                      formatPrice(1000)
                    }}</v-col>
                    <v-col md="2"></v-col>
                  </v-row>
                  <v-row>
                    <v-col md="6">Total:</v-col>
                    <v-col class="text-center"
                      ><div style="font-size: 48px">
                        {{ formatPrice(1000) }}
                      </div></v-col
                    >
                  </v-row>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn block @click.prevent="dialogListChannel = true">
                    <v-icon>mdi-blur</v-icon>
                    Channel
                  </v-btn>
                </v-col>
              </v-row>
              <!-- <v-row>
                <v-col class="block-tax-info">
                  <v-checkbox
                    block
                    v-model="checkTaxInvoiceInfo"
                    @change="openDialogTaxInvoiceInfo()"
                    style="margin-top: 0px; padding-top: 0px; width: 150px"
                  >
                    <template v-slot:label>
                      <div>Tax Invoice</div>
                    </template>
                  </v-checkbox>
                </v-col>
                <v-col class="block-tax-info">
                  <v-btn
                    icon
                    style="width: 24px; height: 24px"
                    @click.prevent="dialogTaxInvoiceInfo = true"
                  >
                    <v-icon>mdi-message-text-outline</v-icon>
                  </v-btn>
                </v-col>
              </v-row> -->
              <v-row>
                <v-col>
                  <v-btn color="success" block
                    ><v-icon>fa fa-money</v-icon>Pay</v-btn
                  >
                </v-col>
              </v-row>
              <v-row>
                <v-col md="6">
                  <v-btn color="warning" class="form-control"
                    ><v-icon>mdi-pause</v-icon>Pause</v-btn
                  >
                </v-col>
                <v-col md="6">
                  <v-btn color="secondary" class="form-control"
                    ><v-icon>mdi-paperclip</v-icon>Re work</v-btn
                  >
                </v-col>
              </v-row>
              <v-row>
                <v-col md="6">
                  <v-btn color="primary" class="form-control"
                    ><v-icon>mdi-file-plus</v-icon>New Bill</v-btn
                  >
                </v-col>
                <v-col md="6">
                  <v-btn color="error" class="form-control"
                    ><v-icon>fa fa-trash-o</v-icon>Delete</v-btn
                  >
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn color="#FFFF8D" block
                    ><v-icon>mdi-refresh</v-icon>Refresh</v-btn
                  >
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel
            style="background-color: #cdeb8b"
            @click.prevent="openPanelFunction()"
          >
            <v-expansion-panel-header
              style="background-color: #43a047; color: white"
              @click.prevent="dialogMenuOther = true"
              ><b>Other</b>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="pl-0 pr-0">
              <!-- <SaleOthers /> -->
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
    <v-dialog v-model="dialogDelete" width="500px" persistent>
      <v-card>
        <v-card-title class="text-h5"
          >ต้องการลบรายการซื้อ ใช่หรือไม่?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click.prevent="closeDelete"
            >Cancel</v-btn
          >
          <!-- <v-btn color="blue darken-1" text @click.prevent="confirmDeleteItem">OK</v-btn> -->
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogMenuOther" width="1000px" persistent>
      <v-card height="500px">
        <v-card-title class="text-h5">
          Other
          <v-spacer></v-spacer>
          <v-icon @click.prevent="(dialogMenuOther = false), (panel = [0])"
            >mdi-close</v-icon
          >
        </v-card-title>
        <v-card-text>
          <SaleOthers />
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogListChannel" max-width="550px;" persistent>
      <v-card style="width: 500px">
        <v-card-title class="text-h5"
          >Channel
          <v-spacer></v-spacer>
          <v-icon @click.prevent="dialogListChannel = false">mdi-close</v-icon>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col
              md="3"
              v-for="(item, index) in paymentItems"
              :key="item.value"
            >
              <v-btn-toggle :color="selectColor" v-model="selectChannelIndex">
                <v-btn
                  style="width: 100px"
                  :value="item.value"
                  @click.prevent="selectedChannel(item)"
                >
                  {{ item.text }}
                </v-btn>
              </v-btn-toggle>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogCheckMember" max-width="550px;" persistent>
      <v-card style="width: 500px">
        <v-card-title class="text-h5">
          Select Member Scan
          <v-spacer></v-spacer>
          <v-icon @click.prevent="dialogCheckMember = false"
            >mdi-close</v-icon
          ></v-card-title
        >
        <v-card-text>
          <v-row>
            <v-col
              md="6"
              v-for="(item, index) in scanMemberItems"
              :key="index"
              :value="item.value"
            >
              <v-item-group mandatory v-model="active">
                <v-item v-slot="{ active, toggle }">
                  <v-card
                    class="text-center"
                    :color="active ? '#E0F7FA' : ''"
                    height="200"
                    @click="toggle, selectScanMember(item)"
                  >
                    <v-card-title v-if="active">{{ item.text }}</v-card-title>
                    <v-card-text>
                      <v-icon size="100px">{{ item.icon }}</v-icon>
                    </v-card-text>
                  </v-card>
                </v-item>
              </v-item-group>
            </v-col>
          </v-row>
          <v-row>
            <v-text-field
              v-if="Object.keys(selectedScan).length !== 0"
              :label="selectedScan.value == 'tel' ? 'Member Tel.' : 'ID Card'"
              solo
              :maxlength="selectedScan.value == 'tel' ? 10 : 13"
              v-model="inputMemberCodeByType"
            ></v-text-field>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click.prevent="confirmSelectMember()"
            >Submit</v-btn
          >
          <v-btn
            color="blue darken-1"
            text
            @click.prevent="dialogCheckMember = false"
            >Cancel</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="dialogScanMember"
      max-width="500px"
      :retain-focus="false"
      persistent
    >
      <v-card
        v-if="selectedScan.value == 'tel'"
        style="background-color: white; width: 50vw; margin: 0"
      >
        <v-card-title class="text-h5"
          >OTP
          <v-spacer></v-spacer>
          <v-icon @click.prevent="dialogScanMember = false"
            >mdi-close</v-icon
          ></v-card-title
        >
        <v-card-text class="text-center" color="white">
          <v-otp-input
            v-model="otp"
            type="password"
            :disabled="loading"
            @finish="onFinish"
          ></v-otp-input>
          <v-overlay absolute :value="loading">
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
          </v-overlay>
        </v-card-text>
        <v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="2000">
          {{ text }}
        </v-snackbar>
      </v-card>

      <v-overlay
        v-if="selectedScan.value == 'idcard'"
        :absolute="absolute"
        :opacity="opacity"
        :value="overlayScanIdCard"
        responsive
      >
        <v-card style="background-color: white; width: 50vw; margin: 0">
          <v-card-text class="text-right">
            <v-progress-linear indeterminate v-model="progressing" height="25"
              ><strong>{{ Math.ceil(progressing) }}%</strong></v-progress-linear
            >
          </v-card-text>
        </v-card>
      </v-overlay>
    </v-dialog>
  </div>
</template>

<script>
import dayjs from "dayjs";
import axios from "axios";
// const queryString = require("query-string");

import SaleOthers from "@/views/Sale/Sale-Other.vue";

export default {
  components: {
    SaleOthers,
  },
  data() {
    return {
      panel: [0],
      today: dayjs().format("DD-MM-YYYY"),
      docDate: dayjs().format("DD-MM-YYYY"),
      selectedRedeemPoint: false,
      active: false,
      inputMemberCode: "",
      inputMemberCodeByType: "",
      absolute: true,
      opacity: 1,
      overlayScanIdCard: false,
      progressing: 0,
      dialog: false,
      dialogDelete: false,
      dialogTaxInvoiceInfo: false,
      dialogListChannel: false,
      dialogMenuOther: false,
      dialogCheckMember: false,
      dialogScanMember: false,
      search: "",
      qty: 1,
      checkTaxInvoiceInfo: false,
      selectedPayPromotion: "1",
      selectedScan: {},
      selectChannelIndex: "",
      selectColor: "",
      customerInfo: {},
      memberInfo: {
        memberId: "",
        type: "",
        name: "",
        discount: "",
        point: "",
        remark: "",
      },
      otherMsg: "",
      paymentItems: [
        { value: "line", text: "Line", color: "#43A047" },
        { value: "grab", text: "Grab", color: "#388E3C" },
        { value: "panda", text: "Panda", color: "#D81B60" },
        { value: "lineman", text: "Line Man", color: "#2E7D32" },
      ],
      scanMemberItems: [
        {
          value: "idcard",
          text: "ID Card",
          color: "#43A047",
          icon: "mdi-account-card-details",
        },
        {
          value: "tel",
          text: "Tel.",
          color: "#388E3C",
          icon: "mdi-cellphone-iphone",
        },
      ],
      headers: [
        {
          text: "#",
          align: "start",
          sortable: false,
          value: "index",
        },
        { text: "Promotion", value: "promotion_code" },
        { text: "Product", value: "product_id" },
        { text: "Detail", value: "product_name", align: "center" },
        { text: "Qty", value: "qty", align: "end" },
        { text: "Price", value: "price", align: "end" },
        { text: "Amount", value: "amount", align: "end" },
        { text: "Discount", value: "discount", align: "end" },
        { text: "Total", value: "total", align: "end" },
      ],
      taxInfo: {
        fullname: "",
        taxId: "",
        address: "",
        selectTaxBranch: "",
        taxBranchNo: "",
      },
      inputProductCode: "",
      items: [],
      selectedItems: [],
      editedIndex: -1,
      editedItem: {
        product_id: 1,
        product_name: "",
        qty: 0,
        price: 0,
        discount: 0,
        total: 0,
      },
      defaultItem: {
        product_id: 1,
        product_name: "",
        qty: 0,
        price: 0,
        discount: 0,
        total: 0,
      },
      loading: false,
      snackbar: false,
      snackbarColor: "default",
      otp: "",
      text: "",
      expectedOtp: "123456",
      url: process.env.VUE_APP_SERVER_API,
      url_crm: process.env.VUE_APP_CRM_API,
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
      this.$refs.memberId.focus();
      this.openScreen2(); //เปิด screen 2

      // this.initialize();
      // if (this.$store.state.currentOrder !== null) {
      //     let currentOrder = JSON.parse(this.$store.state.currentOrder);
      //     this.invoiceNo = currentOrder.invoiceNo;
      //     this.items = currentOrder.orderInfo;
      //     this.memberInfo = currentOrder.memberInfo;
      //     this.points = currentOrder.points;
      //     this.pointsNet = currentOrder.pointsNet;
      //     this.pointsUsed = currentOrder.pointsUsed;

      //     this.calSaleTotal();
      //     this.calPoints();
      // }
      this.userInfo = JSON.parse(this.$store.state.userInfo);

      this.configHeader = {
        headers: { Authorization: `Bearer ${this.userInfo.token}` },
      };

      this.docDate =
        this.userInfo.doc_date !== null
          ? dayjs(this.userInfo.doc_date).format("DD-MM-YYYY")
          : this.today;

      // this.formCashier = this.$store.state.cashierBillInfo == null ? this.formCashier : this.$store.state.cashierBillInfo;

      // this.defaultMenu();
      // this.checkCashier();
      // this.getEmpInfo();
    }
  },
  methods: {
    openScreen2() {
      var viewportwidth = document.documentElement.clientWidth;
      var viewportheight = document.documentElement.clientHeight;
      window.resizeBy(-300, 0);
      window.moveTo(0, 0);
      let opt =
        "scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,left=" +
        (viewportwidth - 300) +
        ",top=0,width=1600vw,height=1200vh";
      let newWindow = open("/salep2", "example", opt);
      newWindow.focus();
    },
    openPanelFunction() {
      if (this.panel.length !== 0) {
        this.panel.shift();
      }
    },
    initialize() {
      this.items = [
        {
          product_id: "25237",
          product_name: "Serum Absolute Illuminating 30",
          promotion_code: "XC0000001",
          qty: 1,
          price: 1305,
          amount: 1305,
          discount: 1305,
          total: 1305,
        },
        {
          product_id: 2,
          product_name: "Ice cream sandwich",
          promotion_code: "XC0000001",
          qty: 237,
          price: 9.0,
          amount: 1000,
          discount: 37,
          total: 4.3,
        },
        {
          product_id: 3,
          product_name: "Eclair",
          promotion_code: "XC0000001",
          qty: 262,
          price: 16.0,
          discount: 23,
          amount: 1000,
          total: 6.0,
        },
        {
          product_id: 4,
          product_name: "Cupcake",
          promotion_code: "XC0000001",
          qty: 305,
          price: 3.7,
          amount: 1000,
          discount: 67,
          total: 4.3,
        },
        {
          product_id: 5,
          product_name: "Gingerbread",
          promotion_code: "XC0000002",
          qty: 356,
          price: 16.0,
          amount: 1000,
          discount: 49,
          total: 3.9,
        },
        {
          product_id: 6,
          product_name: "Jelly bean",
          promotion_code: "XC0000003",
          qty: 375,
          price: 0.0,
          amount: 1000,
          discount: 94,
          total: 0.0,
        },
        {
          product_id: 7,
          product_name: "Lollipop",
          promotion_code: "",
          qty: 392,
          price: 0.2,
          amount: 1000,
          discount: 98,
          total: 0,
        },
        {
          product_id: 8,
          product_name: "Honeycomb",
          promotion_code: "",
          qty: 408,
          price: 3.2,
          amount: 1000,
          discount: 87,
          total: 6.5,
        },
        {
          product_id: 9,
          product_name: "Donut",
          promotion_code: "",
          qty: 452,
          price: 25.0,
          amount: 51,
          discount: 4.9,
          total: 6.5,
        },
        {
          product_id: 10,
          product_name: "KitKat",
          promotion_code: "",
          qty: 518,
          price: 26.0,
          amount: 51,
          discount: 65,
          total: 7,
        },
      ];
    },
    selectScanMember(data) {
      this.selectedScan = data;
    },
    confirmSelectMember() {
      if (Object.keys(this.selectedScan).length === 0) {
        alert("กรุณาเลือกการตรวจสอบข้อมูลสมาชิกให้ถูกต้อง");
        return;
      }
      if (
        this.selectedScan.value == "tel" &&
        !this.checkValidPhone(this.inputMemberCodeByType)
      ) {
        alert("กรุณาใส่เบอร์โทรศัพท์สมาชิกให้ถูกต้อง");
        return;
      }

      if (
        this.selectedScan.value == "idcard" &&
        !this.checkID(this.inputMemberCodeByType)
      ) {
        alert("กรุณาใส่เลขที่บัตรประชาชนสมาชิกให้ถูกต้อง");
        return;
      }

      if (
        this.checkValidPhone(this.inputMemberCodeByType) ||
        this.checkID(this.inputMemberCodeByType)
      ) {
        this.dialogScanMember = true;

        if (this.checkID(this.inputMemberCodeByType)) {
          this.overlayScanIdCard = true;
          this.scanIdCard();
        }
      }
    },
    scanIdCard() {
      this.progressing = 1;

      setTimeout(() => {
        this.progressing = 25;
      }, 2000);
      setTimeout(() => {
        this.progressing = 50;
      }, 5000);
      setTimeout(() => {
        this.progressing = 75;
      }, 8000);
      setTimeout(() => {
        this.progressing = 100;

        this.dialogScanMember = false;
        this.overlayScanIdCard = false;
        this.getMemberInfo();
      }, 3000);
    },
    onFinish(rsp) {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.snackbarColor = rsp === this.expectedOtp ? "success" : "warning";
        this.text = `Processed OTP with "${rsp}" (${this.snackbarColor})`;
        this.snackbar = true;
        if (rsp === this.expectedOtp) {
          this.dialogScanMember = false;
          this.getMemberInfo();
        }
      }, 3500);
    },
    getMemberInfo() {
      if (this.inputMemberCode.trim() == "" && this.selectedScan == null) {
        this.memberInfo.name = "Walk-In Customer";
        this.memberInfo.type = "";
        this.memberInfo.point = 0;
        this.memberInfo.discount = 0;
        this.otherMsg = "";
      } else {
        let inputCode = "";

        if (this.inputMemberCode !== "") {
          inputCode = this.inputMemberCode;
        } else {
          inputCode = this.inputMemberCodeByType.trim();
        }

        let data = {
          member_code: inputCode,
          brand_id: this.userInfo.data.brand_id,
          branch_id: this.userInfo.data.branch_id,
          type: this.selectedScan == null ? "" : this.selectedScan.value,
        };

        axios
          .post(this.url_crm + "/get/member/profile", data)
          .then((res) => {
            let response = res.data;
            if (response.message == "success") {
              var member = response.member[0];
              this.customerInfo = response.member[0];

              if (response.VIP == "VIP") {
                this.memberInfo.name = member.name;
                this.memberInfo.type = "VIP Card";
                this.memberInfo.point = 0;
                this.memberInfo.discount = member.percent1;
                this.otherMsg =
                  "วงเงินจำกัด " + this.formatPrice(member.limited) + " บาท";
              } else {
                this.memberInfo.name = member.name + " " + member.surname;
                this.memberInfo.type = member.card_level + " Card";
                this.memberInfo.point = 0;
                this.memberInfo.discount = 0;
                // this.otherMsg = "วงเงินจำกัด " + this.formatPrice(member.limited) + " บาท";
                this.otherMsg = "";
              }

              this.$refs.inputProductCode.focus();
            } else {
              alert("กรุณาใส่ข้อมูลสมาชิกให้ถูกต้อง");
              this.inputMemberCode = "";
              this.memberInfo = {
                memberId: "",
                type: "",
                name: "",
                discount: "",
                point: "",
                remark: "",
              };
              this.$refs.memberId.focus();
            }

            this.overlay = false;
            this.overlayScanIdCard = false;
            this.inputMemberCodeByType = "";
            this.dialogCheckMember = false;
          })
          .catch((err) => {
            console.log("get member info", err);
            this.inputMemberCode = "";
            this.$refs.memberId.focus();
          });
      }
    },
    selectToRedeemPoint() {
      // TODO
      // if (selectedRedeemPoint) {
      //  คำนวนคะแนน คะแนนเดิม คิดเป็นกี่บาท แล้วหักออก
      // }
    },
    getProductInfo() {
      // TODO
      /*ยิง api  */

      if (this.inputProductCode == "") {
        alert("กรุณาใส่รหัสสินค้าให้ถูกต้อง");
        this.$refs.inputProductCode.focus();
        return;
      }
      if (parseInt(this.qty) <= 0) {
        alert("จำนวนสินค้าไม่ถูกต้อง");
        return;
      }
      alert("ok");
      // let params = {
      //   product: this.inputProductCode,
      //   invoice: this.invoiceNo !== "" ? this.invoiceNo : "",
      //   branch: this.userInfo.data.brand_id,
      // };
      // let selectProduct = this.items.find(
      //   (ele) => ele.barcode == params.product || ele.barcode == params.product
      // );
      // if (selectProduct) {
      //   selectProduct.saleQty = parseInt(selectProduct.saleQty) + parseInt(this.saleQty);
      //   params.qty = selectProduct.saleQty;
      // } else {
      //   params.qty = this.saleQty;
      // }
      // axios
      //   .post(this.url + "/cart/product", qs, this.configHeader)
      //   .then((res) => {
      //     if (res.status == 200) {
      //       var product = res.data.product;
      //       if (product.length == 0) {
      //         alert("ไม่พบข้อมูลสินค้า");
      //         return;
      //       } else {
      //         product = product[0];
      //         if (this.items.length !== 0) {
      //           let selectProduct = this.items.find(
      //             (ele) =>
      //               ele.barcode == params.product ||
      //               ele.barcode == params.product
      //           );
      //           if (selectProduct) {
      //             let qty = parseInt(selectProduct.saleQty);
      //             if (parseInt(this.saleQty) <= 0) {
      //               alert("จำนวนสินค้าไม่ถูกต้อง");
      //             } else {
      //               // selectProduct.saleQty = qty + parseInt(this.saleQty);
      //               selectProduct.total =
      //                 parseInt(selectProduct.price) *
      //                 parseInt(selectProduct.saleQty);
      //               selectProduct.point = 0;
      //             }
      //           } else {
      //             this.items.push({
      //               ...product,
      //               saleQty: parseInt(this.saleQty),
      //               total: parseInt(product.price) * parseInt(this.saleQty),
      //               point: 0,
      //             });
      //           }
      //         } else {
      //           this.items.push({
      //             ...product,
      //             saleQty: parseInt(this.saleQty),
      //             total: parseInt(product.price) * parseInt(this.saleQty),
      //             point: 0,
      //           });
      //         }
      //         this.calSaleTotal();
      //         this.calPoints();
      //         this.productInput = "";
      //         this.saleQty = 1;
      //         this.$refs.productInput.focus();
      //         this.currentOrder();
      //       }
      //     } else {
      //       alert("ไม่สามารถค้นหาข้อมูลสินค้านี้ได้ กรุณาติดต่อ....");
      //       return;
      //     }
      //   });
    },
    deleteItem() {
      console.log(this.selectedItems);
      // this.editedIndex = this.items.indexOf(item)
      // this.editedItem = Object.assign({}, item)
      // this.dialogDelete = true
    },
    openDialogTaxInvoiceInfo() {
      this.dialogTaxInvoiceInfo = !this.dialogTaxInvoiceInfo
        ? this.checkTaxInvoiceInfo
        : false;

      if (!this.checkTaxInvoiceInfo) {
        this.taxInfo = {
          fullname: "",
          taxId: "",
          address: "",
          selectTaxBranch: "",
          taxBranchNo: "",
        };
      }
    },
    confirmDeleteItem() {
      this.items.splice(this.editedIndex, 1);
      this.closeDelete();
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem);
      } else {
        this.items.push(this.editedItem);
      }
      this.close();
    },
    selectedChannel(item) {
      this.selectChannelIndex = item.value;
      this.selectColor = item.color;
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(",", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    checkNumber() {
      if (this.qty <= 0) {
        alert("กรุณาใส่จำนวนสินค้าให้ถูกต้อง");
        this.qty = 1;
      }
    },
    checkValidPhone(phone) {
      if (phone.length !== 10) return false;
      if (
        phone[0] + phone[1] !== "06" &&
        phone[0] + phone[1] !== "08" &&
        phone[0] + phone[1] !== "09"
      )
        return false;

      return true;
    },
    checkID(id) {
      let sum = 0;
      if (id.length != 13) return false;
      for (let i = 0; i < 12; i++) sum += parseFloat(id.charAt(i)) * (13 - i);
      if ((11 - (sum % 11)) % 10 != parseFloat(id.charAt(12))) return false;
      return true;
    },
  },
};
</script>

<style>
.block-tax-info {
  height: 30px;
  background-color: white;
  padding-top: 0px;
  padding-bottom: 0px;
}
.block-bin {
  border-left: 1px solid black;
  padding-top: 0px;
  padding-bottom: 0px;
  padding-left: 0px;
  /* padding-right: 0px; */
  /* text-align: center; */
}
.form-control {
  font-family: "Roboto", sans-serif !important;
}
/* .position-relative {
  position: relative;
} */
</style>
