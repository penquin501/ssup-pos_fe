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
                <v-btn color="cyan lighten-1" @click.prevent="openDialog('TI')">โอนเข้า(TI)</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="cyan lighten-4" @click.prevent="openDialog('Adjust')">ปรับปรุงสต๊อกเพิ่ม</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="cyan lighten-3" @click.prevent="openDialog('KeyIn')">Key In Data</v-btn>
              </v-toolbar>
            </template>
          </v-data-table>
          <v-dialog v-model="dialogAdjustStock" max-width="500px" :retain-focus="false" persistent>
            <v-overlay :absolute="absolute" :value="overlayAdjustStock" responsive>
              <v-card class="mx-auto" style="width: 80vw; height: auto; margin: 0;" light>
                <v-card-title>
                  <b>โอนเข้า(TI)</b>
                  <v-spacer></v-spacer>
                  <v-btn icon @click.prevent="dialogAdjustStock=false, overlayAdjustStock=false"><v-icon>mdi-close</v-icon></v-btn>
                </v-card-title>
                <v-card-subtitle class="pb-0">โอนเข้า(TI)</v-card-subtitle>
                <v-card-text style="background-color: #F0F4C3;" class="text--primary">
                  <v-row>
                        <v-col cols="2"><label>ประเภทการโอนเข้า :</label></v-col>
                        <v-col cols="3"><b-form-input size="sm" type="text" v-model="checkInType" trim readonly></b-form-input></v-col>
                        <v-col cols="2"></v-col>
                        <v-col cols="2"><label>วันที่โอน :</label></v-col>
                        <v-col cols="3"><b-form-input size="sm" type="date" v-model="formCheckIn.invoiceDate" trim></b-form-input></v-col>
                  </v-row>
                  <v-row>
                        <v-col cols="2"><label>ป้อนเลขที่สินค้าเข้า :</label></v-col>
                        <v-col cols="3"><b-form-input size="sm" type="text" v-model="formCheckIn.invoiceNo" trim></b-form-input></v-col>
                        <v-col cols="2"><v-btn small v-if="actionForm !== 'KeyIn'" @click="dialogListInvoice=true, getListInvoiceStock()"><v-icon>mdi-magnify</v-icon>(F1)</v-btn></v-col>
                        <v-col cols="2"><label>รหัสผ่าน :</label></v-col>
                        <v-col cols="3"><b-form-input size="sm" type="text" v-model="password" trim></b-form-input></v-col>
                  </v-row>
                  <v-row>
                        <v-col cols="2"><label>หมายเหตุ :</label></v-col>
                        <v-col cols="10"><b-form-input maxlength=255 size="sm" type="text" v-model="formCheckIn.remark" trim></b-form-input></v-col>
                  </v-row>
                  <v-row v-if="actionForm !== 'TI'">
                        <v-col cols="2"><label>รหัสสินค้า :</label></v-col>
                        <v-col cols="3"><b-form-input size="sm" type="text" @change="addItem()" trim></b-form-input></v-col>
                        <v-col cols="2"></v-col>
                        <v-col cols="2"><label>จำนวน :</label></v-col>
                        <v-col cols="3"><b-form-input size="sm" type="number" v-model="qty" @keypress="validation(qty)" trim></b-form-input></v-col>
                  </v-row>
                </v-card-text>
                <v-card-text>
                    <div class="content-list-item">
                    <b-table-simple striped>
                        <b-thead>
                            <b-tr>
                                <b-td v-for="(item, index) in productfields" :key="item.id">{{ item.label }}</b-td>
                            </b-tr>
                        </b-thead>
                        <b-tbody>
                            <b-tr v-for="(item, index) in listInvoiceItem" :key="item.productId">
                                <b-td>{{ index+1 }}</b-td>
                                <b-td>{{ item.productId }}</b-td>
                                <b-td>{{ item.productName }}</b-td>
                                <b-td>{{ formatPrice(item.pricePerItem) }}</b-td>
                                <b-td>{{ item.qty }}</b-td>
                                <b-td>{{ formatPrice(item.qty * item.pricePerItem) }}</b-td>
                                <b-td>{{ item.productType }}</b-td>
                                <b-td>
                                    <b-button size="sm" @click="deleteItem(item)" class="mr-1">
                                        <v-icon small>mdi-delete</v-icon>
                                    </b-button>
                                </b-td>
                            </b-tr>
                        </b-tbody>
                        <b-tfoot>
                            <b-tr>
                                <b-td colspan="6" class="text-right">จำนวนรายการ:</b-td>
                                <b-td class="text-right">{{ listInvoiceItem.length }}</b-td>
                                <b-td class="text-left">ชิ้น</b-td>
                            </b-tr>
                            <b-tr>
                                <b-td colspan="6" class="text-right">Total:</b-td>
                                <b-td class="text-right">{{ formCheckIn.sum }}</b-td>
                                <b-td class="text-left">บาท</b-td>
                            </b-tr>
                        </b-tfoot>
                    </b-table-simple>
                    </div>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="warning" text @click.prevent="clearForm()">Reset</v-btn>
                  <v-btn type="submit" color="success" text @click.prevent="saveStockInvoice()">บันทึก</v-btn>
                </v-card-actions>
              </v-card>
            </v-overlay>
          </v-dialog>
          <v-dialog v-model="dialogListInvoice" :retain-focus="false" persistent>
            <v-card>
              <v-card-title class="text-h5">กรุณาเลือก รายการโอนเข้า?</v-card-title>
              <v-card-text>
                <b-table ref="selectableTable" selectable :items="listInvoiceStock" select-mode="single" :per-page="5" :fields="lastOrderfields" show-empty small @row-selected="onRowSelected">
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
                <v-btn color="blue darken-1" text @click="dialogListInvoice=false" >Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="confirmInvoice()">OK</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" persistent max-width="500px">
            <v-card>
              <v-card-title class="text-h5">ต้องการลบสินค้า ใช่หรือไม่?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialogDelete = false">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm()">OK</v-btn>
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
// import axios from 'axios';

export default {
    data() {
        return {
            searchInvoice: "",
            today: dayjs().format("DD-MM-YYYY"),
            headersCheckInStock: [
                { text: "Invoice No", value: "invoiceNo" },
                { text: "วันที่โอน", sortable: true, value: "invoiceDate" },
                { text: "ประเภทการโอนเข้า", value: "checkInType" },
                { text: "หมายเหตุ", value: "remark" },
            ],
            productfields: [
                {
                    key: "index",
                    label: "ลำดับ",
                    sortable: true,
                    sortDirection: "desc",
                },
                {   key: "productId", label: "รหัสสินค้า", },
                {   key: "productName", label: "รายละเอียดสินค้า", class: "text-center", },
                {   key: "pricePerItem", label: "ราคา/หน่วย", class: "text-center", },
                {   key: "qty", label: "จำนวน", class: "text-center" },
                {   key: "total", label: "จำนวนเงิน", class: "text-center" },
                {   key: "productType", label: "ประเภทสินค้า", class: "text-center" },
                {   key: "actions", label: "Actions" },
            ],
            lastOrderfields: [
                "selected",
                { key: "invoiceDate", label: "วันที่เอกสาร", class: "text-center" },
                { key: "invoiceNo", label: "เลขที่เอกสาร", class: "text-center" },
                { key: "totalQty", label: "จำนวน", class: "text-center" },
            ],
            listInvoiceItem: [],
            listCheckInStock: [],
            userInfo: {},
            actionForm: "Adjust",
            listMenu: [],
            listInvoiceStock: [],
            absolute: true,
            dialogAdjustStock: true,
            dialogListInvoice: false,
            dialogDelete: false,
            overlayAdjustStock: true,
            formCheckIn: {
                invoiceNo: "",
                invoiceDate: dayjs().format('YYYY-MM-DD'),
                // checkInType: "61 - โอนเข้า",
                remark: "",
                sum: 0,
                // listProduct: [],
            },
            checkInType: "69 - ปรับปรุงสต็อกเพิ่ม",
            selectedInvoice: {},
            password: "",
            qty: 1,
            itemIndex: 0,
            url: process.env.VUE_APP_SERVER_API,
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
        getListInvoiceStock () {
            // <b-td>{{ item.productId }}</b-td>
            // <b-td>{{ item.productName }}</b-td>
            // <b-td>{{ item.pricePerItem }}</b-td>
            // <b-td>{{ item.qty }}</b-td>
            // <b-td>{{ item.total }}</b-td>
            // <b-td>{{ item.productType }}</b-td>
            this.listInvoiceStock = [
                {
                    invoiceNo: "INV01",
                    invoiceDate: dayjs().add(-2, 'day').format("YYYY-MM-DD"),
                    totalQty: 10,
                    remark: "test A",
                    listProduct: [
                        {
                            productId: "1",
                            productName: "Dickerson1",
                            pricePerItem: "1000",
                            productType: "Type1",
                            qty: 10,
                        },
                        {
                            productId: "2",
                            productName: "Dickerson2",
                            pricePerItem: "1000",
                            productType: "Type1",
                            qty: 10,
                        },
                    ],
                },
                {
                    invoiceNo: "INV02",
                    invoiceDate: dayjs().add(-2, 'day').format("YYYY-MM-DD"),
                    totalQty: 10,
                    remark: "test A",
                    listProduct: [
                        {
                            productId: "1",
                            productName: "Dickerson1",
                            pricePerItem: "1000",
                            productType: "Type1",
                            qty: 10,
                        },
                        {
                            productId: "2",
                            productName: "Dickerson2",
                            pricePerItem: "1000",
                            productType: "Type1",
                            qty: 10,
                        },
                    ],
                },
                {
                    invoiceNo: "INV03",
                    invoiceDate: dayjs().add(-2, 'day').format("YYYY-MM-DD"),
                    totalQty: 10,
                    remark: "test A",
                    listProduct: [
                        {
                            productId: "1",
                            productName: "Dickerson1",
                            pricePerItem: "1000",
                            productType: "Type1",
                            qty: 10,
                        },
                        {
                            productId: "2",
                            productName: "Dickerson2",
                            pricePerItem: "1000",
                            productType: "Type1",
                            qty: 10,
                        },
                    ],
                },
            ];
        },
        addItem() {
            // let product = {
            //     productId: this.productInput,
            //     productName: "Dickerson" + this.productInput,
            //     productType: "Type1",
            //     pricePerItem: "1000"
            // };
            //     this.items.push({
            //     ...product,
            //     qty: parseInt(this.qty),
            //     total: parseInt(product.pricePerItem) * parseInt(this.qty),
            //   }
        },
        openDialog(action) {
            this.overlayAdjustStock = true;
            this.dialogAdjustStock = true;

            this.actionForm = action;
            if(action == "TI") {
                this.checkInType = "61 - โอนเข้า";
            }
            if(action == "Adjust") {
                this.checkInType = "69 - ปรับปรุงสต็อกเพิ่ม";
            }
            if(action == "KeyIn") {
                this.checkInType = "62 - Key In Data โอนเข้า";
            }
        },
        validation(value) {
            if(value == 0) {
                return null;
            }
            return parseInt(value) < 0? false: true;
        },
        confirmInvoice() {
            this.formCheckIn ={
                invoiceNo: this.selectedInvoice.invoiceNo,
                invoiceDate: dayjs(this.selectedInvoice.invoiceDate).format('YYYY-MM-DD'),
                remark: this.selectedInvoice.remark,
                sum: 0
            },
            this.listInvoiceItem = this.selectedInvoice.listProduct;
            this.dialogListInvoice = false;
        },
        onRowSelected(items) {
            this.selectedInvoice = items[0];
        },
        deleteItem(item) {
            this.itemIndex = this.listInvoiceItem.indexOf(item);
            this.dialogDelete = true;
        },
        deleteItemConfirm() {
            this.listInvoiceItem.splice(this.itemIndex, 1);
            this.dialogDelete = false;
        },
        clearForm () {
            this.formCheckIn ={
                invoiceNo: "",
                invoiceDate: dayjs().format('YYYY-MM-DD'),
                remark: "",
                sum: 0
            },
            // this.checkInType
            this.listInvoiceItem = [];
        },
        saveStockInvoice () {
            this.formCheckIn.listProduct = this.listInvoiceItem;
            this.formCheckIn.checkInType = this.checkInType;
            this.listCheckInStock.push(this.formCheckIn);

            this.clearForm();
            this.dialogAdjustStock = false;
            this.overlayAdjustStock = false;
        }
    },
}
</script>

<style>
.content-list-item {
  /* display: flex; */
  height: 60%;
  overflow-y: scroll;
  background: rgb(255, 255, 255);
}
</style>