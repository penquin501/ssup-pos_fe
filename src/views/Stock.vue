<template>
  <div>
    <b-card>
      <b-tabs content-class="mt-3">
        <b-tab v-if="listMenu.find((name) => name == 'Stock In')" title="Stock In" active>
          <v-data-table
            :headers="headersStockIn"
            :items="listStockIn"
            :search="searchInvoice"
            sort-by="invoiceNo"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>รายการโอนเข้าสินค้า</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="searchInvoice"
                  append-icon="mdi-magnify"
                  label="ใส่เลข Invoice No"
                  single-line
                  hide-details
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-btn color="cyan lighten-1" @click.prevent="openDialog('TI')">โอนเข้า(TI)</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="cyan lighten-4" @click.prevent="openDialog('AI')">ปรับปรุงสต๊อกเพิ่ม(AI)</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="cyan lighten-3" @click.prevent="openDialog('KI')">Key In Data</v-btn>
              </v-toolbar>
            </template>
          </v-data-table>
          <v-dialog
            v-model="dialogStock"
            max-width="500px"
            :retain-focus="false"
            persistent
          >
            <v-overlay :absolute="absolute" :value="overlayStock" responsive>
              <v-card
                class="mx-auto"
                style="width: 80vw; height: auto; margin: 0"
                light
              >
                <v-card-title>
                  <b>เมนูระบบงานประจำวัน</b>
                  <v-spacer></v-spacer>
                  <v-btn
                    icon
                    @click.prevent="
                      (dialogStock = false), (overlayStock = false)
                    "
                    ><v-icon>mdi-close</v-icon></v-btn
                  >
                </v-card-title>
                <v-card-text
                  style="background-color: #f0f4c3"
                  class="text--primary"
                >
                  <v-row class="stock-head">
                    <v-col class="stock-head" cols="2">
                      <label v-if="actionForm[actionForm.length-1] == 'I'">ประเภทการโอนเข้า :</label>
                      <label v-else>ประเภทการโอนออก :</label>
                    </v-col>
                    <v-col class="stock-head" cols="3">
                      <v-select v-if="actionForm == 'TO'" style="text-align: center; height: 40px; background-color: white;" :items="listStockOutType" v-model="stockType" @change="alertUser()" dense outlined></v-select>
                      <b-form-input v-else size="sm" type="text" v-model="stockType" trim readonly></b-form-input>
                    </v-col>
                    <v-col class="stock-head" cols="2"></v-col>
                    <v-col class="stock-head" cols="2">
                      <label v-if="actionForm == 'TI'">วันที่โอน :</label>
                      <label v-if="actionForm == 'KI' || actionForm == 'TO'">ประเภทสินค้า :</label>
                    </v-col>
                    <v-col class="stock-head" cols="3">
                      <b-form-input v-if="actionForm == 'TI'" size="sm" type="date" readonly v-model="formStock.invoiceDate" trim></b-form-input>
                      <b-form-input v-if="actionForm == 'KI' || actionForm == 'TO'" size="sm" type="text" readonly v-model="productType" trim></b-form-input>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="stock-head" cols="2">
                      <label v-if="actionForm[actionForm.length-1] == 'I'">ป้อนเลขที่สินค้าเข้า :</label>
                      <label v-else>ป้อนเลขที่สินค้าออก :</label>
                    </v-col>
                    <v-col class="stock-head" cols="3">
                      <b-form-input v-if="actionForm == 'KI'" size="sm" type="text" v-model="formStock.invoiceNo" @keypress="engOnly" trim></b-form-input>
                      <b-form-input v-else-if="actionForm == 'TO'" disabled size="sm" type="text" v-model="formStock.invoiceNo" @keypress="engOnly" trim></b-form-input>
                      <b-form-input v-else size="sm" type="text" v-model="formStock.invoiceNo" @keypress="engOnly" @keyup.enter="checkInvoiceStock()" v-shortkey="['f1']" @shortkey="dialogListInvoice = true, getListInvoiceStock()" trim></b-form-input>
                    </v-col>
                    <v-col class="stock-head" cols="2">
                      <v-btn small v-if="actionForm !== 'KI' && actionForm !== 'TO'" @click="dialogListInvoice = true, getListInvoiceStock()"><v-icon>mdi-magnify</v-icon>(F1)</v-btn>
                    </v-col>
                    <v-col class="stock-head" cols="2" v-if="actionForm !== 'KI' && actionForm !== 'TO'">
                      <label>รหัสผ่าน :</label>
                    </v-col>
                    <v-col class="stock-head" cols="3" v-if="actionForm !== 'KI' && actionForm !== 'TO'">
                      <b-form-input size="sm" type="password" v-model="formStock.password" trim ></b-form-input>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="stock-head" cols="2"><label>หมายเหตุ :</label></v-col>
                    <v-col class="stock-head" cols="10">
                      <b-form-input maxlength="255" size="sm" type="text" v-model="formStock.remark" trim></b-form-input>
                    </v-col>
                  </v-row>
                  <v-row v-if="actionForm !== 'TI'">
                    <v-col class="stock-head" cols="2"><label>รหัสสินค้า :</label></v-col>
                    <v-col class="stock-head" cols="3"
                      ><b-form-input
                        size="sm"
                        type="text"
                        ref="productInput"
                        v-model="productInput"
                        @keypress.enter="addItem()"
                        trim
                      ></b-form-input
                    ></v-col>
                    <v-col class="stock-head" cols="2"></v-col>
                    <v-col class="stock-head" cols="2"
                      ><label>จำนวน :</label></v-col
                    >
                    <v-col class="stock-head" cols="3"
                      ><b-form-input
                        size="sm"
                        type="number"
                        v-model="qty"
                        @keypress="validation(qty)"
                        @keypress.enter="addItem()"
                        trim
                      ></b-form-input
                    ></v-col>
                  </v-row>
                </v-card-text>
                <v-card-text>
                  <v-row>
                    <div class="content-list-item" style="height: 30vh">
                      <b-table
                        id="my-table"
                        sticky-header
                        :items="listInvoiceItem"
                        :fields="productfields"
                        :current-page="currentPage"
                        :per-page="perPage"
                        stacked="md"
                        show-empty
                        small
                      >
                        <template #cell(index)="row">
                          {{ row.index + 1 }}
                        </template>
                        <template #cell(price)="row">
                          {{ formatPrice(row.item.price) }}
                        </template>
                        <template #cell(total)="row">
                          {{ formatPrice(row.item.total) }}
                        </template>
                        <template #cell(actions)="row">
                          <b-button
                            size="sm"
                            @click="
                              deleteItem(row.item, row.index, $event.target)
                            "
                            class="mr-1"
                            ><v-icon small>mdi-delete</v-icon></b-button
                          >
                        </template>
                      </b-table>
                    </div>
                  </v-row>
                  <v-row>
                    <b-pagination
                      v-model="currentPage"
                      :per-page="perPage"
                      :total-rows="listInvoiceItem.length"
                      small
                      align="center"
                      aria-controls="my-table"
                    ></b-pagination>
                  </v-row>
                  <v-row style="text-align: center">
                    <v-col class="stock-head" cols="2"
                      ><label>จำนวนรายการ :</label></v-col
                    >
                    <v-col class="stock-head" cols="2">{{
                      listInvoiceItem.length
                    }}</v-col>
                    <v-col class="stock-head" cols="2">ชิ้น</v-col>
                    <v-col class="stock-head" cols="2"
                      ><label>Total :</label></v-col
                    >
                    <v-col class="stock-head" cols="2">{{
                      formatPrice(formStock.sum)
                    }}</v-col>
                    <v-col class="stock-head" cols="2">บาท</v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="warning" text @click.prevent="clearForm()"
                    >Reset</v-btn
                  >
                  <v-btn
                    type="submit"
                    color="success"
                    text
                    @click.prevent="saveStockInvoice()"
                    >บันทึก</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-overlay>
          </v-dialog>
          <v-dialog
            v-model="dialogListInvoice"
            :retain-focus="false"
            persistent
          >
            <v-card>
              <v-card-title class="text-h5">{{ actionForm[actionForm.length-1] == 'I'? 'กรุณาเลือก รายการโอนเข้า?':'กรุณาเลือก รายการโอนออก?'}} </v-card-title>
              <v-card-text>
                <b-table
                  ref="selectableTable"
                  selectable
                  :items="listInvoiceStock"
                  select-mode="single"
                  :per-page="5"
                  :fields="lastOrderfields"
                  show-empty
                  small
                  @row-selected="onRowSelected"
                >
                  <template #cell(selected)="{ rowSelected }">
                    <template v-if="rowSelected">
                      <span aria-hidden="true">&check;</span>
                      <span class="sr-only">Selected</span>
                    </template>
                    <template v-else>
                      <span aria-hidden="true">&nbsp;</span>
                      <span class="sr-only">Not selected</span>
                    </template>
                  </template>
                </b-table>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="dialogListInvoice = false"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="confirmInvoice()"
                  >OK</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" persistent max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >ต้องการลบสินค้า ใช่หรือไม่?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialogDelete = false"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm()"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </b-tab>
        <b-tab v-if="listMenu.find((name) => name == 'Stock Out')" title="Stock Out" active>
          <v-data-table :headers="headersStockOut" :items="listStockOut" :search="searchInvoice" sort-by="invoiceNo" class="elevation-1">
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>รายการโอนออกสินค้า</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-text-field v-model="searchInvoice" append-icon="mdi-magnify" label="ใส่เลข Invoice No" single-line hide-details></v-text-field>
                <v-spacer></v-spacer>
                  <v-btn color="cyan lighten-1" @click.prevent="openDialog('TO')">โอนออก(TO)</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn color="cyan lighten-4" @click.prevent="openDialog('AO')">ปรับปรุงสต๊อกออก(AO)</v-btn>
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
import axios from "axios";
const queryString = require("query-string");

export default {
  data() {
    return {
      searchInvoice: "",
      today: dayjs().format("DD-MM-YYYY"),
      headersStockIn: [
        { text: "Invoice No", value: "invoiceNo" },
        { text: "วันที่ Invoice", value: "invoiceDate" },
        { text: "วันที่โอนเข้า", sortable: true, value: "stampDate" },
        { text: "ประเภทการโอนเข้า", value: "stockType" },
        { text: "หมายเหตุ", value: "remark" },
      ],
      headersStockOut: [
        { text: "Invoice No", value: "invoiceNo" },
        { text: "วันที่ Invoice", value: "invoiceDate" },
        { text: "วันที่โอนออก", sortable: true, value: "stampDate" },
        { text: "ประเภทการโอนออก", value: "stockType" },
        { text: "หมายเหตุ", value: "remark" },
      ],
      productfields: [
        {
          key: "index",
          label: "ลำดับ",
          sortable: true,
          sortDirection: "desc",
          class: "text-center",
        },
        { key: "barcode", label: "รหัสสินค้า", class: "text-center" },
        {
          key: "name_product",
          label: "รายละเอียดสินค้า",
          class: "text-center",
        },
        { key: "price", label: "ราคา/หน่วย", class: "text-right" },
        { key: "qty", label: "จำนวน", class: "text-right" },
        { key: "total", label: "จำนวนเงิน", class: "text-right" },
        { key: "productType", label: "ประเภทสินค้า", class: "text-center" },
        { key: "actions", label: "Actions", class: "text-center" },
      ],
      lastOrderfields: [
        "selected",
        { key: "invoiceDate", label: "วันที่เอกสาร", class: "text-center" },
        { key: "invoiceNo", label: "เลขที่เอกสาร", class: "text-center" },
        { key: "totalQty", label: "จำนวน", class: "text-center" },
      ],
      listStockOutType: [
        { value: "22 - สินค้าหมดอายุ", text: "22 - สินค้าหมดอายุ" },
        { value: "23 - สินค้าชำรุด", text: "23 - สินค้าชำรุด" },
        { value: "24 - สินค้าเรียกเก็บคืน", text: "24 - สินค้าเรียกเก็บคืน" },
        { value: "25 - คืนสินค้า Tester", text: "25 - คืนสินค้า Tester" },
        { value: "28 - ผลิตภัณฑ์ชำรุดเสียหาย", text: "28 - ผลิตภัณฑ์ชำรุดเสียหาย" },
        { value: "32 - โอนสินค้าระหว่างสาขา", text: "32 - โอนสินค้าระหว่างสาขา" },
      ],
      listInvoiceItem: [],
      listStockIn: [],
      listStockOut: [],
      userInfo: {},
      actionForm: "",
      listMenu: [],
      listInvoiceStock: [],
      currentPage: 1,
      perPage: 10,
      totalRows: 1,
      absolute: true,
      dialogStock: false,
      dialogListInvoice: false,
      dialogDelete: false,
      overlayStock: false,
      formStock: {
        invoiceNo: "",
        invoiceDate: dayjs().format("YYYY-MM-DD"),
        remark: "",
        sum: 0,
        password: "",
        stampDate: dayjs().format("YYYY-MM-DD"),
      },
      stockType: "",
      selectedInvoice: [],
      productInput: "",
      qty: 1,
      itemIndex: 0,
      productType: "N",
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
      this.configHeader = {
        headers: { Authorization: `Bearer ${this.userInfo.token}` },
      };
      this.defaultMenu();
      this.getListStock();
    }
  },
  methods: {
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
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(",", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    getListStock() {
      if (this.$store.state.listStockIn !== []) {
        this.listStockIn = this.$store.state.listStockIn;
      }
      if (this.$store.state.listStockOut !== []) {
        this.listStockOut = this.$store.state.listStockOut;
      }
    },
    getListInvoiceStock() {
      /**
       * TODO: เรียก api รับข้อมูล
       * 
       * {
          "product_id": "25194",
          "barcode": "8850080251944",
          "name_product": "Eye Treat Absolute UV 15",
          "name_print": "Eye Treat Absolute UV 15",
          "price": "595.00",
          "unit": "",
          "tax": 7,
          "picture": "",
          "fix_stock": "36",
          "first_sale_date": "1900-01-01",
          "last_sale_date": "1900-01-01"
        }
       */

      var listInvoiceStock = [
        {
          invoiceNo: "INV01",
          invoiceDate: dayjs().add(-2, "day").format("YYYY-MM-DD"),
          totalQty: 10,
          remark: "test A",
          status: "pending",
          listProduct: [
            {
              barcode: "1",
              name_product: "Dickerson1",
              price: "1000",
              productType: "Type1",
              qty: 10,
            },
            {
              barcode: "2",
              name_product: "Dickerson2",
              price: "1000",
              productType: "Type1",
              qty: 10,
            },
          ],
        },
        {
          invoiceNo: "INV02",
          invoiceDate: dayjs().add(-2, "day").format("YYYY-MM-DD"),
          totalQty: 10,
          remark: "test A",
          status: "pending",
          listProduct: [
            {
              barcode: "3",
              name_product: "Dickerson3",
              price: "10",
              productType: "Type1",
              qty: 10,
            },
            {
              barcode: "4",
              name_product: "Dickerson4",
              price: "10",
              productType: "Type1",
              qty: 10,
            },
          ],
        },
        {
          invoiceNo: "INV03",
          invoiceDate: dayjs().add(-2, "day").format("YYYY-MM-DD"),
          totalQty: 10,
          remark: "test A",
          status: "pending",
          listProduct: [
            {
              barcode: "5",
              name_product: "Dickerson5",
              price: "100",
              productType: "Type1",
              qty: 10,
            },
            {
              barcode: "6",
              name_product: "Dickerson6",
              price: "100",
              productType: "Type1",
              qty: 10,
            },
          ],
        },
      ];

      this.listInvoiceStock = this.$store.state.listInvoiceStockPending.length == 0? listInvoiceStock: this.$store.state.listInvoiceStockPending;

      this.$store.commit("addListInvoiceStockPending", this.listInvoiceStock);
    },
    checkInvoiceStock() {
      /**
       * TODO: เรียก api รับข้อมูล
       */
      this.getListInvoiceStock();
      let checkInvoice = this.listInvoiceStock.find(
        (ele) => ele.invoiceNo == this.formStock.invoiceNo
      );
      if (checkInvoice == undefined) {
        alert("ไม่พบข้อมูล");
      } else {
        this.selectedInvoice = [];
        this.selectedInvoice.push(checkInvoice);
        this.confirmInvoice();
      }
    },
    addItem() {
      if (this.productInput == "") {
        alert("กรุณาใส่รหัสสินค้า");
        return;
      }
      let params = {
        product: this.productInput
      };
      var qs = queryString.stringify(params);
      axios
        .post(this.url + "/cart/product", qs, this.configHeader)
        .then((res) => {
          if (res.status == 200) {
            var product = res.data.product;
            if (product.length == 0) {
              alert("ไม่พบข้อมูลสินค้า");
              return;
            } else {
              product = product[0];

              if (this.listInvoiceItem.length !== 0) {
                let selectProduct = this.listInvoiceItem.find(
                  (ele) => ele.barcode == params.product
                );
                if (selectProduct) {
                  let qty = parseInt(selectProduct.qty);
                  if (parseInt(this.qty) <= 0) {
                    alert("จำนวนสินค้าไม่ถูกต้อง");
                  } else {
                    selectProduct.qty = qty + parseInt(this.qty);
                    selectProduct.total =
                      parseInt(selectProduct.price) *
                      parseInt(selectProduct.qty);
                  }
                } else {
                  this.listInvoiceItem.push({
                    ...product,
                    qty: parseInt(this.qty),
                    total: parseInt(product.price) * parseInt(this.qty),
                  });
                }
              } else {
                this.listInvoiceItem.push({
                  ...product,
                  qty: parseInt(this.qty),
                  total: parseInt(product.price) * parseInt(this.qty),
                });
              }
              this.calTotal();

              this.productInput = "";
              this.qty = 1;
              this.$refs.productInput.focus();
            }
          } else {
            alert("ไม่สามารถค้นหาข้อมูลสินค้านี้ได้ กรุณาติดต่อ....");
            return;
          }
        });
    },
    calTotal() {
      let total = 0;

      this.listInvoiceItem.forEach((e) => {
        total += parseInt(e.total);
      });
      this.formStock.sum = total;
    },
    openDialog(action) {
      this.clearForm();
      this.overlayStock = true;
      this.dialogStock = true;

      this.actionForm = action;
      if (action == "TI") {
        this.stockType = "61 - โอนเข้า";
      }
      if (action == "AI") {
        this.stockType = "69 - ปรับปรุงสต็อกเพิ่ม";
      }
      if (action == "KI") {
        this.stockType = "62 - Key In Data โอนเข้า";
      }
      // if (action == "TO") {
      //   this.stockType = "61 - โอนเข้า";
      // }
      if (action == "AO") {
        this.stockType = "39 - ปรับปรุงสต๊อกลด";
      }
    },
    engOnly($event) {
      var keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if (48 <= keyCode && keyCode <= 57) return true;
      if (65 <= keyCode && keyCode <= 90) return true;
      if (97 <= keyCode && keyCode <= 122) return true;
      return $event.preventDefault();
    },
    validation(value) {
      if (value == 0) {
        return null;
      }
      return parseInt(value) < 0 ? false : true;
    },
    alertUser() {
      if (this.stockType == '25 - คืนสินค้า Tester') {
        alert('ต้องเป็น TESTER ที่ใช้แล้วเท่านั้น หรือ (TESTER ที่เป็นสินค้ามีปัญหา และแจ้งโดยต้นสังกัด)');
      }
    },
    confirmInvoice() {
      if (this.selectedInvoice.length === 0) {
        alert("กรุณาเลือกเอกสารในการทำรายการ");
        return;
      } else {
        this.formStock = {
          invoiceNo: this.selectedInvoice[0].invoiceNo,
          invoiceDate: dayjs(this.selectedInvoice[0].invoiceDate).format("YYYY-MM-DD"),
          remark: this.selectedInvoice[0].remark,
          sum: 0,
        };
        if (this.actionForm !== "AI" && this.actionForm !== "AO") {
          this.listInvoiceItem = this.selectedInvoice[0].listProduct;
          this.listInvoiceItem.forEach((e) => {
            e.total = e.qty * e.price;
          });
          this.calTotal();
        }

        this.dialogListInvoice = false;
      }
    },
    onRowSelected(items) {
      this.selectedInvoice = [];
      this.selectedInvoice = items;
    },
    deleteItem(item, index, event) {
      this.itemIndex = this.listInvoiceItem.indexOf(item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.listInvoiceItem.splice(this.itemIndex, 1);
      this.dialogDelete = false;
    },
    clearForm() {
      this.formStock = {
        invoiceNo: "",
        invoiceDate: dayjs().format("YYYY-MM-DD"),
        remark: "",
        sum: 0,
        password: "",
        stampDate: dayjs().format("YYYY-MM-DD"),
      };
      this.listInvoiceItem = [];
    },
    saveStockInvoice() {
      var valid = true;
      if(this.actionForm !== "TO") {
        valid = this.isValidation(this.formStock, "invoiceNo", valid);
      }
      
      if (this.listInvoiceItem.length <= 0) {
        valid = false;
      }
      if (this.actionForm == "") {
        valid = false;
      }

      if (!valid) {
        alert("กรุณากรอกข้อมูลให้ถูกต้อง");
        return;
      } else {
        var validItem = true;
        this.listInvoiceItem.forEach((item) => {
          validItem = this.isValidation(item, "barcode", validItem);
          validItem = this.isValidation(item, "name_product", validItem);
          // validItem = this.isValidation(item, "productType", validItem);
          validItem = this.isValidation(item, "price", validItem);
          validItem = this.isValidation(item, "qty", validItem);
          validItem = this.isValidation(item, "total", validItem);
        });

        if (!validItem) {
          alert("กรุณากรอกข้อมูลสินค้าให้ถูกต้อง");
          return;
        } else {
          if (this.actionForm !== "KI" && this.actionForm !== "TO") {
            valid = this.isValidation(this.formStock, "password", valid);
          }

          if (!valid) {
            alert("กรุณากรอกรหัสผ่านให้ถูกต้อง");
            return;
          } else {
            this.formStock.stampDate = dayjs().format("YYYY-MM-DD");
            this.formStock.listProduct = this.listInvoiceItem;
            this.formStock.stockType = this.stockType;

            /**
             * TODO: update ข้อมูลผ่าน API
             */
            let checkInvoice = this.$store.state.listInvoiceStockPending.find(
              (ele) => ele.invoiceNo == this.formStock.invoiceNo
            );
            if (checkInvoice !== undefined) {
              let index = this.$store.state.listInvoiceStockPending.indexOf(checkInvoice);
              this.$store.state.listInvoiceStockPending.splice(index, 1);
              this.$store.commit("addListInvoiceStockPending", this.$store.state.listInvoiceStockPending);
            }
            if(this.actionForm[this.actionForm.length-1] == 'I') {
              this.listStockIn.push(this.formStock);
              this.$store.commit("addListStockIn", this.listStockIn);
            } else {
              this.listStockOut.push(this.formStock);
              this.$store.commit("addListStockOut", this.listStockOut);
            }
            
            this.clearForm();
            this.actionForm = "";
            this.dialogStock = false;
            this.overlayStock = false;
          }
        }
      }
    },
    isValidation(data, key, defaultValue) {
      if (data[key] == "") {
        return false;
      }
      if (data[key] == null) {
        return false;
      }
      if (data[key] == undefined) {
        return false;
      }
      return defaultValue;
    },
  },
};
</script>

<style>
.content-list-item {
  /* display: flex; */
  height: 60%;
  overflow-y: scroll;
  background: rgb(255, 255, 255);
}

.stock-head {
  padding-top: 5px;
  padding-bottom: 0px;
}
</style>