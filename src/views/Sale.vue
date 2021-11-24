<template>
  <div>
    <b-card>
      <b-tabs content-class="mt-3">
        <b-tab title="บิลขาย" active>
          <v-data-table :headers="headers" :items="desserts" :footer-props="{ pageText: 'total', 'items-per-page-text':'products per page'}" sort-by="calories" class="elevation-1">
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>My CRUD</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>

                <v-dialog v-model="dialog" max-width="500px" :retain-focus="false">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" class="mb-2" v-bind="attrs" v-on="on" @click="overlay = !overlay">เปิดบิล+</v-btn>
                  </template>

                  <v-overlay :absolute="absolute" :value="overlay">
                    <v-card style="background-color: white; color: black; width: 100vw; height: 100vh; margin: 0;">
                      <v-card-title style="color: black; padding-bottom: 0px; padding-top: 0px;">
                        <span class="text-h5">บิลเงินสด</span>
                      </v-card-title>

                      <v-card-text style="background-color: lightgreen; color: black">
                        <v-row no-gutters>
                          <b-col cols="7">
                            <v-card style="background-color: blue">
                              <b-row style="margin-left: 0px; margin-right: 0px">
                                <b-col cols="1" style="padding-left: 0px; padding-right: 0px"></b-col>
                                <b-col cols="5" style="border: 1px solid black; text-align: center; background-color: green;">
                                  <b>บิลเงินสดอย่างย่อ</b>
                                </b-col>
                                <b-col cols="2" style="text-align: right">ผู้เปิดบิล:</b-col>
                                <b-col cols="3">
                                  <b-form-input id="input-small" size="sm" readonly v-model="empName"></b-form-input>
                                </b-col>
                                <b-col cols="1" style="padding-left: 0px; padding-right: 0px"></b-col>
                              </b-row>
                              <b-row style="margin-left: 0px; margin-right: 0px">
                                <b-col cols="3" style="padding-bottom: 0px;">
                                  <v-select style="text-align: center; height: 60px;" v-model="selectedPlayPromo" :items="optionsPromotion" solo></v-select>
                                </b-col>
                                <b-col cols="3" style="padding-bottom: 0px;">
                                  <v-select style="text-align: center; height: 60px;" v-model="selectSale" :items="optionsSale" solo></v-select>
                                </b-col>
                                <b-col cols="1" style="text-align: right; padding-left: 0px; padding-right: 0px;">จำนวน:</b-col>
                                <b-col cols="1"><b-form-input id="input-small" size="sm" v-model="saleQty"></b-form-input></b-col>
                                <b-col cols="1" style="text-align: right; padding-left: 0px; padding-right: 0px;">รหัสสินค้า:</b-col>
                                <b-col cols="3">
                                  <b-form-input id="input-small" size="sm" v-model="productInput" ref="productInput" @change="addItem()"></b-form-input>
                                </b-col>
                              </b-row>
                            </v-card>
                          </b-col>
                          <b-col cols="5">
                            <v-card style="background-color: green">
                              <b-row style="text-align: center">
                                <b-col cols="2" style="text-align: right">รหัสสมาชิก:</b-col>
                                <b-col cols="4"><b-form-input id="input-small" size="sm" @change="getMemberInfo()" v-model="memberInfo.memberId"></b-form-input></b-col>
                                <b-col cols="1"><button @click.prevent="getMemberInfo()"><v-icon>mdi-book-open</v-icon></button></b-col>
                                <b-col cols="1"><i class="fa fa-star" aria-hidden="true"></i></b-col>
                                <b-col cols="3"><b-form-input style="text-align: center;" id="input-small" size="sm" v-model="saleDate" readonly></b-form-input></b-col>
                              </b-row>
                              <b-row style="text-align: center;">
                                <b-col cols="2" style="text-align: right">ประเภท:</b-col>
                                <b-col cols="2">{{ memberInfo.memberType }}</b-col>
                                <b-col cols="2" style="text-align: right">คะแนนสะสม:</b-col>
                                <b-col cols="2"><b-form-input id="input-small" size="sm" v-model="memberInfo.point"></b-form-input></b-col>
                                <b-col cols="2" style="text-align: right">ส่วนลด %:</b-col>
                                <b-col cols="2"><b-form-input id="input-small" size="sm" v-model="memberInfo.memberDiscount"></b-form-input></b-col>
                              </b-row>
                            </v-card>
                          </b-col>
                        </v-row>
                        <v-row>
                          <b-col cols="8" style="padding-top: 0px; padding-bottom: 0px;">
                            <b-row no-gutters>
                              <v-card-title style="padding-top: 0px;">
                                <v-text-field style="padding-top: 0px;" v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
                              </v-card-title>
                              <b-table :items="items" :fields="productfields" :current-page="currentPage" :per-page="5" :filter="search" :filter-included-fields="filterOn" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :sort-direction="sortDirection" stacked="md" show-empty small @filtered="onFiltered">
                                <template #cell(actions)="row">
                                  <b-button size="sm" @click="deleteItem(row.item, row.index, $event.target)" class="mr-1"><v-icon small >mdi-delete</v-icon></b-button>
                                </template>
                              </b-table>
                            </b-row>
                            <b-row>
                              <b-col cols="8" style="padding-top: 0px; padding-bottom: 0px;">
                                <b-row>
                                  <b-col cols="12" style="text-align: center; padding-top: 0px; padding-bottom: 0px;">
                                    <b-form-input class="form-control ma-2" style="text-align: center; font-size: 17px;" readonly v-model="net"></b-form-input>
                                  </b-col>
                                </b-row>
                                <b-row>
                                  <b-col cols="12" style="text-align: center; padding-top: 0px; padding-bottom: 0px;">
                                    <v-btn color="success" class="form-control ma-2 white--text">
                                      <v-icon>mdi-play</v-icon>Payment(F10)
                                    </v-btn>
                                  </b-col>
                                </b-row>
                                <b-row>
                                  <b-col cols="12" style="text-align: center; padding-top: 0px; padding-bottom: 0px;">
                                    <v-btn color="warning" class="ma-2 white--text"><v-icon>mdi-restore</v-icon>Rework</v-btn>
                                    <v-btn color="yellow" class="ma-2 white--text"><v-icon>mdi-pause</v-icon>Pause(F9)</v-btn>
                                    <v-btn color="error" class="ma-2 white--text"><v-icon>mdi-delete</v-icon>Delete(F8)</v-btn>
                                  </b-col>
                                </b-row>
                              </b-col>
                              <b-col cols="4" style="padding-top: 0px; padding-bottom: 0px;">
                                <b-row style="margin-bottom: 0px;">
                                  <b-col cols="6" style="padding-top: 0px; padding-left: 0px; padding-bottom: 0px; padding-right: 0px;">
                                    <v-text-field class="font-10" style="margin-bottom: 0px; padding-top: 0px; padding-bottom: 0px;" label="Points:" outlined v-model="points" readonly></v-text-field>
                                  </b-col>
                                  <b-col cols="6" style="padding-top: 0px; padding-left: 0px; padding-bottom: 0px; padding-right: 0px;">
                                    <v-text-field style="margin-bottom: 0px; padding-top: 0px; padding-bottom: 0px;" label="Total Money:" outlined v-model="saleTotal" readonly></v-text-field>
                                  </b-col>
                                </b-row>
                                <b-row style="margin-top: 0px; margin-bottom: 0px;">
                                  <b-col cols="6" style="padding-top: 0px; padding-left: 0px; padding-bottom: 0px; padding-right: 0px;">
                                    <v-text-field label="Points Used:" outlined v-model="pointsUsed" @change="redeemPoints()"></v-text-field>
                                  </b-col>
                                  <b-col cols="6" style="padding-top: 0px; padding-left: 0px; padding-bottom: 0px; padding-right: 0px;">
                                    <v-text-field label="Discount:" outlined v-model="discountTotal" readonly></v-text-field>
                                  </b-col>
                                </b-row>
                                <b-row style="margin-top: 0px; margin-bottom: 0px;">
                                  <b-col cols="6" style="padding-top: 0px; padding-left: 0px; padding-bottom: 0px; padding-right: 0px;">
                                    <v-text-field label="Points Net:" outlined v-model="pointsNet" readonly></v-text-field>
                                  </b-col>
                                  <b-col cols="6" style="padding-top: 0px; padding-left: 0px; padding-bottom: 0px; padding-right: 0px;">
                                    <v-text-field label="Net:" outlined v-model="net" readonly></v-text-field>
                                  </b-col>
                                </b-row>
                              </b-col>
                            </b-row>
                          </b-col>
                          <b-col cols="4">
                            <v-expansion-panels>
                              <v-expansion-panel style="background-color: grey">
                                <v-expansion-panel-header>ข้อมูลสมาชิก</v-expansion-panel-header>
                                <v-expansion-panel-content>
                                  <!-- ข้อมูลสมาชิก -->
                                  <v-text-field class="font-10" label="ชื่อสมาชิก:" v-model="memberInfo.memberName"></v-text-field>
                                  <v-text-field label="วันสมัคร:" v-model="memberInfo.registerDate"></v-text-field>
                                  <v-text-field label="วันหมดอายุ:" v-model="memberInfo.expiredDate"></v-text-field>
                                  <v-text-field label="วันเกิด:" v-model="memberInfo.birthdayDate"></v-text-field>
                                  <v-text-field label="OPS Day:" v-model="memberInfo.opsDate"></v-text-field>
                                  <v-text-field label="ที่อยู่:" outlined v-model="memberInfo.memberAddress"></v-text-field>
                                </v-expansion-panel-content>
                              </v-expansion-panel>
                              <v-expansion-panel style="background-color: grey">
                                <v-expansion-panel-header>ฟังก์ชั่น</v-expansion-panel-header>
                                <v-expansion-panel-content>
                                  <!-- ฟังก์ชั่น -->
                                  <v-row no-gutters v-for="(item, index) in 3" :key="item">
                                    <v-col cols="12" style="text-align: center;">
                                      <v-btn style="height: 30px;" class="ma-2" color="secondary">Accept Terms</v-btn>
                                      <v-btn style="height: 30px;" class="ma-2" color="secondary">Accept Terms</v-btn>
                                    </v-col>
                                  </v-row>
                                </v-expansion-panel-content>
                              </v-expansion-panel>
                              <v-expansion-panel style="background-color: grey">
                                <v-expansion-panel-header>อื่นๆ</v-expansion-panel-header>
                                <v-expansion-panel-content>
                                  <!-- อื่นๆ -->
                                  <v-row no-gutters v-for="(item, index) in 5" :key="item">
                                    <v-col cols="12" style="text-align: center;">
                                      <v-btn style="height: 30px;" class="ma-2" color="secondary">Accept Terms</v-btn>
                                      <v-btn style="height: 30px;" class="ma-2" color="secondary">Accept Terms</v-btn>
                                    </v-col>
                                  </v-row>
                                </v-expansion-panel-content>
                              </v-expansion-panel>
                            </v-expansion-panels>
                          </b-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </v-overlay>
                </v-dialog>

                <v-dialog v-model="dialogDelete" max-width="500px">
                  <v-card>
                    <v-card-title class="text-h5">ต้องการลบสินค้า ใช่หรือไม่?</v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                      <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
              <!-- <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon> -->
              <!-- <v-icon small @click="deleteItem(item)">mdi-delete</v-icon> -->
            </template>
          </v-data-table>
        </b-tab>
        <!-- <b-tab title="Second"><p>I'm the second tab</p></b-tab> -->
        <!-- <b-tab title="Disabled" disabled><p>I'm a disabled tab!</p></b-tab> -->
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
      dialog: true,
      absolute: true,
      overlay: true,
      search: "",
      dialogDelete: false,
      saleDate: dayjs().format("YYYY-MM-DD"),
      headers: [
        {
          text: "Dessert (100g serving)",
          align: "start",
          filterable: false,
          value: "name",
        },
        { text: "Calories", value: "calories" },
        { text: "Fat (g)", value: "fat" },
        { text: "Carbs (g)", value: "carbs" },
        { text: "Protein (g)", value: "protein" },
        { text: "Iron (%)", value: "iron" },
      ],
      desserts: [],
      productfields: [
        { key: 'productId', label: 'รหัสสินค้า', sortable: true, sortDirection: 'desc' },
        { key: 'productName', label: 'รายละเอียดสินค้า', sortable: true, class: 'text-center' },
        { key: 'saleQty', label: 'จำนวน', sortable: true, class: 'text-center' },
        { key: 'pricePerItem', label: 'ราคา/หน่วย', sortable: true, class: 'text-center' },
        { key: 'total', label: 'จำนวนเงิน', class: 'text-center' },
        { key: 'actions', label: 'Actions' }
      ],
      items: [],
      selectedPlayPromo: 1,
      optionsPromotion: [
        { value: 1, text: "เล่นโปรโมชั่น" },
        { value: 2, text: "ไม่เล่นโปรโมชั่น" },
      ],
      selectSale: null,
      optionsSale: [
        { value: null, text: "ช่องทางการขาย" },
        { value: 1, text: "Grab" },
        { value: 2, text: "Panda Rider" },
      ],
      empName: "",
      msgText: "test",
      memberInfo: {
        memberId: "12324",
        memberType: "Exclusive CARD",
        memberName: "Test Test",
        memberAddress: "12/345",
        memberPhone: "081-123-4567",
        point: "100",
        memberlevel: "99",
        memberDiscount: "5",
        registerDate: dayjs("01/11/2564").format("YYYY-MM-DD"),
        expiredDate: dayjs("01/10/2564").format("YYYY-MM-DD"),
        birthdayDate: dayjs("01/10/2564").format("YYYY-MM-DD"),
        opsDate: dayjs("01/10/2564").format("YYYY-MM-DD"),
      },
      totalRows: 1,
      currentPage: 1,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      saleQty: 1,
      productInput: "",
      points: 0,
      pointsUsed: 0,
      pointsNet: 0,
      saleTotal: 0,
      discountTotal: 0,
      net: 0,
    };
  },
  mounted: function () {
    if (this.$store.state.is_login == false) {
      // this.$router.push({ name: "Home" });
      this.$router.push({ name: "Home" }).catch((error) => {
        if (
          error.name !== 'NavigationDuplicated' &&
          !error.message.includes('Avoided redundant navigation to current location')
        ) {
          console.log(error)
        }
      });
    } else {
      this.empName = this.$store.state.userInfo.name;
    }
  },
  watch: {
    dialogAlert(val) {
      // val || this.close();
    },
    dialogDeleteAlert(val) {
      // val || this.closeDelete();
    },
  },
  methods: {
    addItem() {
      /* TODO: ยิง api เพื่อรับข้อมูลสินค้า */
      let data = { 
        productId: this.productInput, 
        productName: 'Dickerson'+ this.productInput, 
        pricePerItem: '100', 
        discount:"5",
        point: 10  
      };
      /******************************/
      if (this.items.length !== 0) {
        let selectProduct = this.items.find(
          (ele) => ele.productId == this.productInput
        );
        if (selectProduct) {
          let qty = parseInt(selectProduct.saleQty);
          qty = this.saleQty==1? qty+1: parseInt(this.saleQty);
          selectProduct.saleQty = qty;
          selectProduct.total = parseInt(selectProduct.pricePerItem) * parseInt(qty);
        } else {
          this.items.push(
            { 
              ...data, 
              saleQty: parseInt(this.saleQty),
              total: parseInt(data.pricePerItem) * parseInt(this.saleQty),
            }
          );
        }
      } else {
        this.items.push(
          { 
            ...data, 
            saleQty: parseInt(this.saleQty),
            total: parseInt(data.pricePerItem) * parseInt(this.saleQty),
          }
        );
      }
      this.calSaleTotal();
      this.calPoints();

      this.productInput = "";
      this.$refs.productInput.focus();
    },
    calSaleTotal() {
      this.saleTotal = 0;
      this.discountTotal = 0;
      this.net = 0;

      this.items.forEach( e => {
        this.saleTotal += parseInt(e.total);
        this.discountTotal += parseInt(e.discount);
      });

      this.net = this.saleTotal - this.discountTotal;
    },
    calPoints() {
      this.points = 0;
      this.pointsUsed = 0;

      this.items.forEach( e => {
        this.points += parseInt(e.point);
      });
      this.redeemPoints();
    },
    redeemPoints() {
      this.pointsNet = this.points - this.pointsUsed;
    },    
    editItem(item) {
      // this.editedIndex = this.desserts.indexOf(item);
      // this.editedItem = Object.assign({}, item);
      // this.dialog = true;
    },
    deleteItem(item, index, event) {
      this.editedIndex = this.items.indexOf(item);
      // this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.items.splice(this.editedIndex, 1);
      this.calSaleTotal();
      this.closeDelete();
    },
    close() {
      // this.dialog = false;
      // this.$nextTick(() => {
      //   this.editedItem = Object.assign({}, this.defaultItem);
      //   this.editedIndex = -1;
      // });
    },
    closeDelete() {
      this.dialogDelete = false;
      // this.$nextTick(() => {
      //   this.editedItem = Object.assign({}, this.defaultItem);
      //   this.editedIndex = -1;
      // });
    },
    pauseOrder() {
      let order = {

      };
      
      this.commit('lastOrder', order);
    },
    reworkOrder() {
      // this.commit('lastOrder', this.order);
    },
    save() {
      // if (this.editedIndex > -1) {
      //   Object.assign(this.desserts[this.editedIndex], this.editedItem);
      // } else {
      //   this.desserts.push(this.editedItem);
      // }
      // this.close();
    },
    onFiltered(filteredItems) {
    //     // Trigger pagination to update the number of buttons/pages due to filtering
    //   this.totalRows = filteredItems.length
    //   this.currentPage = 1
    },
    getMemberInfo() {
      this.memberInfo= {
        memberId: "56789",
        memberType: "Exclusive CARD",
        memberName: "Test2 Test2",
        memberAddress: "12/345",
        memberPhone: "081-123-4567",
        point: "100",
        memberlevel: "99",
        memberDiscount: "5",
        registerDate: dayjs("01/11/2564").format("YYYY-MM-DD"),
        expiredDate: dayjs("01/10/2564").format("YYYY-MM-DD"),
        birthdayDate: dayjs("01/10/2564").format("YYYY-MM-DD"),
        opsDate: dayjs("01/10/2564").format("YYYY-MM-DD"),
      };
    },
  },
};
</script>

<style>

</style>