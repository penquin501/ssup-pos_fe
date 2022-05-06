<template>
    <div>
        <v-card>
            <v-row>
            <v-col xs="12" sm="12" md="6" lg="9" xl="9">
                <v-row>
                    <v-col sm="6" md="3">
                        <v-text-field style="height: 10px;" center placeholder="Search Member" solo :append-icon="'mdi-account-search'" v-model="inputMemberCode"></v-text-field>
                    </v-col>
                    <v-col sm="6" md="3">
                        <v-btn color="primary"><v-icon>mdi-account-box</v-icon></v-btn>
                        <v-btn color="#FFCA28"><v-icon left>mdi-star-circle</v-icon>VIP</v-btn>
                    </v-col>
                    <v-col sm="6" md="3"></v-col>
                    <v-col sm="6" md="3" style="text-align: right;">
                        <label>Date:</label>
                        <label>{{ today }}</label>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col sm="4" md="4">
                        <v-row>
                            <label>Member Name:</label>
                            <span>ABC XXX</span>
                            <!-- <span>{{ today }}</span> -->
                        </v-row>
                        <v-row>
                            <label>Point:</label>
                            <span>0</span>
                        </v-row>
                    </v-col>
                    <v-col sm="4" md="4">
                        <v-row>
                            <label>Level:</label>
                            <span>White Card</span>
                        </v-row>
                        <v-row>
                            <label>Discount:</label>
                            <span>15</span>
                        </v-row>
                    </v-col>
                    <v-col sm="4" md="4" style="text-align: right;">
                        <v-row>
                            <v-btn-toggle color="success" rounded v-model="selectedPayPromotion">
                                <v-btn value="1">Auto</v-btn>
                                <v-btn value="2">Manual</v-btn>
                            </v-btn-toggle>
                        </v-row>
                        <v-row>
                            <span>
                                <v-switch color="green" v-model="selectedRedeemPoint" inset label="Redeem Point"></v-switch>
                            </span>
                        </v-row>
                    </v-col>
                </v-row>
                <v-row>
                    <v-data-table v-model="selected" item-key="product_id" :headers="headers" :items="items" class="elevation-1" show-select>
                        <template v-slot:top>
                            <v-toolbar flat>
                                <v-row>
                                    <v-col md="3"><label>Search Product:</label></v-col>
                                    <v-col md="4"><b-form-input id="input-small" size="sm" ></b-form-input></v-col>
                                    <v-col md="1"><label>Qty:</label></v-col>
                                    <v-col md="2"><b-form-input id="input-small" size="sm" type="number"></b-form-input></v-col>
                                </v-row>
                                <v-spacer></v-spacer>
                                <v-btn icon color="primary" dark class="mb-2" @click="deleteItem()"><v-icon large>mdi-delete</v-icon></v-btn>
                            </v-toolbar>
                            <v-row>
                                <v-col md="6"></v-col>
                                <v-col md="3"><label>Billing Type:</label></v-col>
                                <v-col md="3"><label><strong>(00)บิลเงินสดอย่างย่อ</strong></label></v-col>
                            </v-row>
                        </template>
                        <template v-slot:header.product_name="{ header }">
                            <div style="text-align: center;">{{ header.text }}</div>
                        </template>
                        <template v-slot:item.index="{ item, index }">
                            {{ index + 1 }}
                        </template>
                        <template v-slot:item.product_id="{ item, index }">
                            <div style="width: 5%;">{{ item.product_id }}</div>
                        </template>
                        <template v-slot:item.product_name="{ item, index }">
                            <div style="width: 50%;">{{ item.product_name }}</div>
                        </template>
                        <template v-slot:item.qty="{ item, index }">
                            {{ item.qty }}
                        </template>
                        <template v-slot:item.price="{ item, index }">
                            {{ formatPrice(item.price) }}
                        </template>
                        <template v-slot:item.discount="{ item, index }">
                            {{ formatPrice(item.discount) }}
                        </template>
                        <template v-slot:item.total="{ item, index }">
                            {{ formatPrice(item.total) }}
                        </template>
                    </v-data-table>
                </v-row>
            </v-col>
            <v-col xs="12" sm="12" md="6" lg="3" xl="3" style="padding-top: 0px; padding-bottom: 0px; padding-right: 0px; padding-left: 0px;">
                <v-expansion-panels v-model="panel" accordion multiple>
                    <v-expansion-panel style="background-color: #cdeb8b;" @click.prevent="openPanelFunction()">
                        <v-expansion-panel-header style="background-color: #43A047;">
                            <b>Payment</b>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-row>
                                <v-col>
                                    <v-row>
                                        <v-col>Point:</v-col>
                                        <v-col>{{ 300 }} pt</v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>Point Used:</v-col>
                                        <v-col>{{ 300 }} pt</v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>Point Total:</v-col>
                                        <v-col>{{ 3000 }} pt</v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                            <v-row style="background-color: white;">
                                <v-col>
                                    <v-row>
                                        <v-col>Sub Total:</v-col>
                                        <v-col>{{ formatPrice(0) }}</v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>Discount:</v-col>
                                        <v-col>{{ formatPrice(0) }}</v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>Total:</v-col>
                                        <v-col><div style="font-size: 48px;">{{ formatPrice(0) }}</div></v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-expansion-panels class="mb-6">
                                        <v-expansion-panel> 
                                            <v-expansion-panel-header color="primary" expand-icon="mdi-menu-down">
                                                Payment Channel
                                            </v-expansion-panel-header>
                                            <v-expansion-panel-content style="padding-left: 0px; padding-right: 0px;">
                                                <v-item-group >
                                                    <v-col v-for="(item, index) in paymentItems" :key="index" cols="12" md="12" style="padding-left: 0px;padding-right: 0px;">
                                                        <v-item v-slot="{ active, toggle }">
                                                            <v-btn :color="active ? item.color : ''" block @click.prevent="toggle">{{ item.text }}</v-btn>
                                                        </v-item>
                                                    </v-col>
                                                </v-item-group>
                                            </v-expansion-panel-content>
                                        </v-expansion-panel>
                                    </v-expansion-panels>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-checkbox block v-model="checkbox" @change="dialogTaxInvoiceInfo = !dialogTaxInvoiceInfo? checkbox: false" style="height: 30px; background-color: white;">
                                        <template v-slot:label>
                                            <div>
                                                Tax Invoice
                                                <v-icon>mdi-message-text-outline</v-icon>
                                            </div>
                                        </template>
                                    </v-checkbox>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-btn color="success" block>Pay</v-btn>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-btn color="warning" block>Pause</v-btn>
                                </v-col>
                                <v-col>
                                    <v-btn color="secondary" block>Re work</v-btn>
                                </v-col>
                            </v-row> 
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                    <v-expansion-panel style="background-color: #cdeb8b;" @click.prevent="openPanelFunction()">
                        <v-expansion-panel-header style="background-color: #43A047;"><b>Other</b></v-expansion-panel-header>
                        <v-expansion-panel-content style="padding-left: 0px; padding-right: 0px;">
                            <v-col class="d-flex" cols="12" sm="12" md="12" style="padding-top: 0px; padding-bottom: 0px;">
                                <v-col cols="12" sm="6" md="6" center>
                                    <b-button variant="primary" style="height: 100px; width: 100px;">
                                        <v-icon size="48" color="white">mdi-refresh</v-icon>
                                        <br/>
                                        <span style="font-size: 14px;">Refresh</span>
                                    </b-button>
                                </v-col>
                                <v-col cols="12" sm="6" md="6" center>
                                    <b-button variant="primary" @click.prevent="dialogDeliveryInfo=true" style="height: 100px; width: 100px;">
                                        <v-icon size="48" color="white">mdi mdi-motorbike</v-icon>
                                        <br/>
                                        <span style="font-size: 14px;">Delivery</span>
                                    </b-button>
                                </v-col>
                            </v-col>
                            <v-col class="d-flex" cols="12" sm="12" md="12" style="padding-top: 0px; padding-bottom: 0px;">
                                <v-col cols="12" sm="6" md="6" center>
                                    <b-button variant="primary" style="height: 100px; width: 100px;">
                                        <v-icon size="48" color="white">mdi-tag-multiple</v-icon>
                                        <br/>
                                        <span style="font-size: 14px;">Promotion</span>
                                    </b-button>
                                </v-col>
                                <v-col cols="12" sm="6" md="6" center>
                                    <b-button variant="primary" style="height: 100px; width: 100px;">
                                        <v-icon size="48" color="white">mdi-upload</v-icon>
                                        <br/>
                                        <span style="font-size: 14px;">Update Promotion</span>
                                    </b-button>
                                </v-col>
                            </v-col>
                            <v-col class="d-flex" cols="12" sm="12" md="12" style="padding-top: 0px; padding-bottom: 0px;">
                                <v-col cols="12" sm="6" md="6" center>
                                    <b-button variant="primary" style="height: 100px; width: 100px;">
                                        <v-icon size="48" color="white">mdi-comment-text</v-icon>
                                        <br/>
                                        <span style="font-size: 14px;">Call Survey</span>
                                    </b-button>
                                </v-col>
                                <v-col cols="12" sm="6" md="6" center>
                                    <b-button variant="primary" style="height: 100px; width: 100px;">
                                        <b-img style="width: 48px; height: 48px;" src="./img/icons/alipay-brands.svg"></b-img>
                                        <br/>
                                        <span style="font-size: 14px;">Alipay</span>
                                    </b-button>
                                </v-col>
                            </v-col>
                            <v-col class="d-flex" cols="12" sm="12" md="12" style="padding-top: 0px; padding-bottom: 0px;">
                                <v-col cols="12" sm="6" md="6" center>
                                    <b-button variant="primary" style="height: 100px; width: 100px;">
                                        <v-icon size="48" color="white">fa fa-weixin</v-icon>
                                        <br/>
                                        <span style="font-size: 14px;">We Chat</span>
                                    </b-button>
                                </v-col>
                                <v-col cols="12" sm="6" md="6" center>
                                    <!-- <b-button variant="primary" style="height: 100px; width: 100px;">
                                        <v-icon size="48" color="white">fa fa-weixin</v-icon>
                                        <span>Alipay</span>
                                    </b-button> -->
                                </v-col>
                            </v-col>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-col>
            </v-row>
        </v-card>
        <v-dialog v-model="dialogDelete" max-width="500px" persistent>
            <v-card>
                <v-card-title class="text-h5">ต้องการลบรายการซื้อ ใช่หรือไม่?</v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click.prevent="closeDelete">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click.prevent="deleteItemConfirm">OK</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialogTaxInvoiceInfo" v-if="checkbox" max-width="550px;" persistent>
            <v-card>
                <v-card-title class="text-h5">Tax Invoice Infomation</v-card-title>
                <v-card-text>
                    <v-text-field v-model="taxInfo.fullname" label="Full Name" required></v-text-field>
                    <v-text-field v-model="taxInfo.taxId" label="Tax ID" required></v-text-field>
                    <v-textarea v-model="taxInfo.address" auto-grow no-resize label="Address" rows="3" max-height="40"></v-textarea>
                    <v-radio-group v-model="taxInfo.selectTaxBranch">
                        <v-radio value="headOffice">
                            <template v-slot:label>
                                <div>Head Office</div>
                            </template>
                        </v-radio>
                        <v-radio value="branch">
                            <template v-slot:label>
                                <span>
                                    Branch No.
                                    <b-form-input v-model="taxInfo.taxBranchNo"></b-form-input>
                                </span>
                            </template>
                        </v-radio>
                    </v-radio-group>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click.prevent="dialogTaxInvoiceInfo = false">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click.prevent="deleteItemConfirm">OK</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDeliveryInfo" max-width="550px;" persistent>
            <v-card>
                <v-card-title class="text-h5">Delivery Infomation</v-card-title>
                <v-card-text>
                    <v-text-field v-model="deliveryInfo.phone" label="Mobile No." required></v-text-field>
                    <v-text-field v-model="deliveryInfo.fullname" label="Full Name" required></v-text-field>
                    <v-textarea v-model="deliveryInfo.address" auto-grow no-resize label="Address" rows="3" max-height="40"></v-textarea>
                    <v-text-field v-model="deliveryInfo.branchNo" label="Branch No." required></v-text-field>    
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click.prevent="dialogDeliveryInfo = false">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click.prevent="deleteItemConfirm">OK</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import dayjs from "dayjs";
// import axios from "axios";
// const queryString = require("query-string");

export default {
    data() {
        return {
            panel: [0],
            today: dayjs().format("DD-MM-YYYY"),
            selectedRedeemPoint: true,
            inputMemberCode: "",
            dialog: false,
            dialogDelete: false,
            dialogTaxInvoiceInfo: false, 
            dialogDeliveryInfo: false,
            checkbox: false,
            selectedPayPromotion: "1",
            paymentItems: [
                { value: "line", text: "Line", color: "#43A047" },
                { value: "grab", text: "Grab", color: "#388E3C" },
                { value: "panda", text: "Panda Rider", color: "#D81B60" },
                { value: "lineman", text: "Line Man", color: "#2E7D32" },
            ],
            headers: [
                {
                    text: 'No',
                    align: 'start',
                    sortable: false,
                    value: 'index',
                },
                { text: 'Product Id', value: 'product_id' },
                { text: 'Detail', value: 'product_name' },
                { text: 'Qty', value: 'qty' },
                { text: 'Price', value: 'price' },
                { text: 'Discount', value: 'discount' },
                { text: 'Total', value: 'total' },
            ],
            // selectTaxBranch: "",
            taxInfo: {
                fullname: "",
                taxId: "",
                address: "",
                selectTaxBranch: "",
                taxBranchNo: "",
            },
            deliveryInfo: {
                fullname: "",
                phone: "",
                address: "",
                branchNo: "",
            },
            items: [],
            selected: [],
            editedIndex: -1,
            editedItem: {
                product_id: 1,
                product_name: '',
                qty: 0,
                price: 0,
                discount: 0,
                total: 0,
            },
            defaultItem: {
                product_id: 1,
                product_name: '',
                qty: 0,
                price: 0,
                discount: 0,
                total: 0,
            },
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
            this.initialize();
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
            // this.userInfo = JSON.parse(this.$store.state.userInfo);
            
            // this.configHeader = {
            //     headers: { Authorization: `Bearer ${this.userInfo.token}` },
            // };
            // // this.generateNewInvoice();
            // this.formCashier = this.$store.state.cashierBillInfo == null ? this.formCashier : this.$store.state.cashierBillInfo;

            // this.defaultMenu();
            // this.checkCashier();
            // this.getEmpInfo();
            // this.checkAccessSystem();
        }
    },
    methods: {
        openPanelFunction() {
            if(this.panel.length !== 0) {
                this.panel.shift();
            }
        },
        initialize () {
            this.items = [
                {
                    product_id: 1,
                    product_name: 'Frozen Yogurt',
                    qty: 159,
                    price: 6.0,
                    discount: 24,
                    total: 4.0,
                },
                {
                    product_id: 2,
                    product_name: 'Ice cream sandwich',
                    qty: 237,
                    price: 9.0,
                    discount: 37,
                    total: 4.3,
                },
                {
                    product_id: 3,
                    product_name: 'Eclair',
                    qty: 262,
                    price: 16.0,
                    discount: 23,
                    total: 6.0,
                },
                {
                    product_id: 4,
                    product_name: 'Cupcake',
                    qty: 305,
                    price: 3.7,
                    discount: 67,
                    total: 4.3,
                },
                {
                    product_id: 5,
                    product_name: 'Gingerbread',
                    qty: 356,
                    price: 16.0,
                    discount: 49,
                    total: 3.9,
                },
                {
                    product_id: 6,
                    product_name: 'Jelly bean',
                    qty: 375,
                    price: 0.0,
                    discount: 94,
                    total: 0.0,
                },
                {
                    product_id: 7,
                    product_name: 'Lollipop',
                    qty: 392,
                    price: 0.2,
                    discount: 98,
                    total: 0,
                },
                {
                    product_id: 8,
                    product_name: 'Honeycomb',
                    qty: 408,
                    price: 3.2,
                    discount: 87,
                    total: 6.5,
                },
                // {
                //     product_name: 'Donut',
                //     calories: 452,
                //     fat: 25.0,
                //     carbs: 51,
                //     protein: 4.9,
                // },
                // {
                //     product_name: 'KitKat',
                //     calories: 518,
                //     fat: 26.0,
                //     carbs: 65,
                //     protein: 7,
                // },
            ];
      },
      editItem(item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem() {
        console.log(this.selected);
        // this.editedIndex = this.items.indexOf(item)
        // this.editedItem = Object.assign({}, item)
        // this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.items.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.items[this.editedIndex], this.editedItem)
        } else {
          this.items.push(this.editedItem)
        }
        this.close()
      },
      formatPrice(value) {
            let val = (value / 1).toFixed(2).replace(",", ".");
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
    },
}
</script>

<style>
/* .v-btn__content {
    display:flex;
    flex-direction:column;
} */
</style>