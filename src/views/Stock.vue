<template>
  <div>
    <b-card>
      <b-tabs content-class="mt-3">
        <b-tab
          v-if="listMenu.find((name) => name == 'Stock In')"
          title="Stock In"
          active
        >
          <v-data-table
            :headers="headersStockInStock"
            :items="listStockIn"
            :search="searchInvoice"
            sort-by="invoiceNo"
            class="elevation-1"
          >
            <!-- <template v-slot:item.paymentMethod="{ item }">
              {{ item.paymentMethod == "creditCard" ? "บัตรเครดิต" : "เงินสด" }}
            </template> -->
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
                <v-btn color="cyan lighten-1" @click.prevent="openDialog('TI')"
                  >โอนเข้า(TI)</v-btn
                >
                <v-spacer></v-spacer>
                <v-btn
                  color="cyan lighten-4"
                  @click.prevent="openDialog('Adjust')"
                  >ปรับปรุงสต๊อกเพิ่ม</v-btn
                >
                <v-spacer></v-spacer>
                <v-btn
                  color="cyan lighten-3"
                  @click.prevent="openDialog('KeyIn')"
                  >Key In Data</v-btn
                >
              </v-toolbar>
            </template>
          </v-data-table>
          <v-dialog
            v-model="dialogAdjustStock"
            max-width="500px"
            :retain-focus="false"
            persistent
          >
            <v-overlay
              :absolute="absolute"
              :value="overlayAdjustStock"
              responsive
            >
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
                      (dialogAdjustStock = false), (overlayAdjustStock = false)
                    "
                    ><v-icon>mdi-close</v-icon></v-btn
                  >
                </v-card-title>
                <v-card-text
                  style="background-color: #f0f4c3"
                  class="text--primary"
                >
                  <v-row>
                    <v-col class="stock-head" cols="2"
                      ><label>ประเภทการโอนเข้า :</label></v-col
                    >
                    <v-col class="stock-head" cols="3"
                      ><b-form-input
                        size="sm"
                        type="text"
                        v-model="stockInType"
                        trim
                        readonly
                      ></b-form-input
                    ></v-col>
                    <v-col class="stock-head" cols="2"></v-col>
                    <v-col
                      class="stock-head"
                      cols="2"
                      v-if="actionForm !== 'KeyIn'"
                      ><label>วันที่โอน :</label></v-col
                    >
                    <v-col class="stock-head" cols="2" v-else
                      ><label>ประเภทสินค้า :</label></v-col
                    >
                    <v-col
                      class="stock-head"
                      cols="3"
                      v-if="actionForm !== 'KeyIn'"
                      ><b-form-input
                        size="sm"
                        type="date"
                        readonly
                        v-model="formStockIn.invoiceDate"
                        trim
                      ></b-form-input
                    ></v-col>
                    <v-col class="stock-head" cols="3" v-else
                      ><b-form-input
                        size="sm"
                        type="text"
                        readonly
                        v-model="productType"
                        trim
                      ></b-form-input
                    ></v-col>
                  </v-row>
                  <v-row>
                    <v-col class="stock-head" cols="2"
                      ><label>ป้อนเลขที่สินค้าเข้า :</label></v-col
                    >
                    <v-col class="stock-head" cols="3">
                      <b-form-input
                        v-if="actionForm == 'KeyIn'"
                        size="sm"
                        type="text"
                        v-model="formStockIn.invoiceNo"
                        @keypress="engOnly"
                        trim
                      ></b-form-input>
                      <b-form-input
                        v-else
                        size="sm"
                        type="text"
                        v-model="formStockIn.invoiceNo"
                        @keypress="engOnly"
                        @keyup.enter="checkInvoiceStock()"
                        @keyup.ctrl.112="
                          (dialogListInvoice = true), getListInvoiceStock()
                        "
                        trim
                      >
                      </b-form-input>
                    </v-col>
                    <v-col class="stock-head" cols="2"
                      ><v-btn
                        small
                        v-if="actionForm !== 'KeyIn'"
                        @click="
                          (dialogListInvoice = true), getListInvoiceStock()
                        "
                        ><v-icon>mdi-magnify</v-icon>(F1)</v-btn
                      ></v-col
                    >
                    <v-col
                      class="stock-head"
                      cols="2"
                      v-if="actionForm !== 'KeyIn'"
                      ><label>รหัสผ่าน :</label></v-col
                    >
                    <v-col
                      class="stock-head"
                      cols="3"
                      v-if="actionForm !== 'KeyIn'"
                      ><b-form-input
                        size="sm"
                        type="password"
                        v-model="formStockIn.password"
                        trim
                      ></b-form-input
                    ></v-col>
                  </v-row>
                  <v-row>
                    <v-col class="stock-head" cols="2"
                      ><label>หมายเหตุ :</label></v-col
                    >
                    <v-col class="stock-head" cols="10"
                      ><b-form-input
                        maxlength="255"
                        size="sm"
                        type="text"
                        v-model="formStockIn.remark"
                        trim
                      ></b-form-input
                    ></v-col>
                  </v-row>
                  <v-row v-if="actionForm !== 'TI'">
                    <v-col class="stock-head" cols="2"
                      ><label>รหัสสินค้า :</label></v-col
                    >
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
                      formatPrice(formStockIn.sum)
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
              <v-card-title class="text-h5"
                >กรุณาเลือก รายการโอนเข้า?</v-card-title
              >
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
      headersStockInStock: [
        { text: "Invoice No", value: "invoiceNo" },
        { text: "วันที่ Invoice", sortable: true, value: "invoiceDate" },
        { text: "วันที่โอนเข้า", sortable: true, value: "stockInDate" },
        { text: "ประเภทการโอนเข้า", value: "stockInType" },
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
      listInvoiceItem: [],
      listStockIn: [],
      userInfo: {},
      actionForm: "",
      listMenu: [],
      listInvoiceStock: [],
      currentPage: 1,
      perPage: 10,
      totalRows: 1,
      absolute: true,
      dialogAdjustStock: false,
      dialogListInvoice: false,
      dialogDelete: false,
      overlayAdjustStock: false,
      formStockIn: {
        invoiceNo: "",
        invoiceDate: dayjs().format("YYYY-MM-DD"),
        remark: "",
        sum: 0,
        password: "",
        stockInDate: dayjs().format("YYYY-MM-DD"),
      },
      stockInType: "69 - ปรับปรุงสต็อกเพิ่ม",
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

      /* Default User Menu*/
      let userMenu = JSON.parse(this.userInfo.listUserPermission);
      for (let item of userMenu) {
        for (const [key, value] of Object.entries(item)) {
          if (key == this.$route.name && item.SubMenu !== undefined) {
            this.listMenu = item.SubMenu;
          }
        }
      }
      this.listMenu = this.listMenu.length !== 0 ? this.listMenu : ["Stock In"];

      this.configHeader = {
        headers: { Authorization: `Bearer ${this.userInfo.token}` },
      };
      this.getListStockIn();
    }
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(",", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    getListStockIn() {
      if (this.$store.state.listStockIn !== []) {
        this.listStockIn = this.$store.state.listStockIn;
      }
    },
    getListInvoiceStock() {
      /**
       * TODO: เรียก api รับข้อมูล
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

      this.listInvoiceStock =
        this.$store.state.listInvoiceStockPending.length == 0
          ? listInvoiceStock
          : this.$store.state.listInvoiceStockPending;

      this.$store.commit("addListInvoiceStockPending", this.listInvoiceStock);
    },
    checkInvoiceStock() {
      /**
       * TODO: เรียก api รับข้อมูล
       */
      this.getListInvoiceStock();
      let checkInvoice = this.listInvoiceStock.find(
        (ele) => ele.invoiceNo == this.formStockIn.invoiceNo
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
        // product: "8850080251944",
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
      this.formStockIn.sum = total;
    },
    openDialog(action) {
      this.overlayAdjustStock = true;
      this.dialogAdjustStock = true;

      this.clearForm();
      this.actionForm = action;
      if (action == "TI") {
        this.stockInType = "61 - โอนเข้า";
      }
      if (action == "Adjust") {
        this.stockInType = "69 - ปรับปรุงสต็อกเพิ่ม";
      }
      if (action == "KeyIn") {
        this.stockInType = "62 - Key In Data โอนเข้า";
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
    confirmInvoice() {
      if (this.selectedInvoice.length === 0) {
        alert("กรุณาเลือกเอกสารในการทำรายการ");
        return;
      } else {
        this.formStockIn = {
          invoiceNo: this.selectedInvoice[0].invoiceNo,
          invoiceDate: dayjs(this.selectedInvoice[0].invoiceDate).format(
            "YYYY-MM-DD"
          ),
          remark: this.selectedInvoice[0].remark,
          sum: 0,
        };
        if (this.actionForm !== "Adjust") {
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
      (this.formStockIn = {
        invoiceNo: "",
        invoiceDate: dayjs().format("YYYY-MM-DD"),
        remark: "",
        sum: 0,
        password: "",
        stockInDate: dayjs().format("YYYY-MM-DD"),
      }),
        (this.listInvoiceItem = []);
    },
    saveStockInvoice() {
      var valid = true;
      valid = this.isValidation(this.formStockIn, "invoiceNo", valid);

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
          validItem = this.isValidation(item, "productType", validItem);
          validItem = this.isValidation(item, "price", validItem);
          validItem = this.isValidation(item, "qty", validItem);
          validItem = this.isValidation(item, "total", validItem);
        });

        if (!validItem) {
          alert("กรุณากรอกข้อมูลให้ถูกต้อง");
          return;
        } else {
          if (this.actionForm == "TI") {
            valid = this.isValidation(this.formStockIn, "password", valid);
          }

          if (this.actionForm == "Adjust") {
            valid = this.isValidation(this.formStockIn, "password", valid);
          }

          // if(this.actionForm == "KeyIn") {
          // this.formStockIn.invoiceDate = dayjs().format("YYYY-MM-DD");
          // }

          if (!valid) {
            alert("กรุณากรอกรหัสผ่านให้ถูกต้อง");
            return;
          } else {
            this.formStockIn.stockInDate = dayjs().format("YYYY-MM-DD");
            this.formStockIn.listProduct = this.listInvoiceItem;
            this.formStockIn.stockInType = this.stockInType;

            /**
             * TODO: update ข้อมูลผ่าน API
             */
            let checkInvoice = this.$store.state.listInvoiceStockPending.find(
              (ele) => ele.invoiceNo == this.formStockIn.invoiceNo
            );
            if (checkInvoice !== undefined) {
              let index =
                this.$store.state.listInvoiceStockPending.indexOf(checkInvoice);
              this.$store.state.listInvoiceStockPending.splice(index, 1);
              this.$store.commit(
                "addListInvoiceStockPending",
                this.$store.state.listInvoiceStockPending
              );
            }

            this.listStockIn.push(this.formStockIn);
            this.$store.commit("addListStockIn", this.listStockIn);

            this.clearForm();
            this.actionForm = "";
            this.dialogAdjustStock = false;
            this.overlayAdjustStock = false;
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