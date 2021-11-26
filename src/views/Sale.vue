<template>
  <div>
    <b-card>
      <b-tabs content-class="mt-3">
        <b-tab title="บิลขาย" active>
          <v-data-table
            :headers="headers"
            :items="desserts"
            :footer-props="{
              pageText: 'total',
              'items-per-page-text': 'products per page',
            }"
            sort-by="calories"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>My CRUD</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>

                <v-dialog
                  v-model="dialog"
                  max-width="500px"
                  :retain-focus="false"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary"
                      class="mb-2"
                      v-bind="attrs"
                      v-on="on"
                      @click="overlay = !overlay"
                      >เปิดบิล+</v-btn
                    >
                  </template>

                  <v-overlay :absolute="absolute" :value="overlay" responsive>
                    <div class="containers">
                      <div class="navbar">
                        <v-row no-gutters>
                          <b-col cols="7">
                            <b-row style="margin-left: 0px; margin-right: 0px">
                              <b-col
                                cols="4"
                                style="
                                  border: 0px solid black;
                                  text-align: center;
                                  background-color: green;
                                  margin: 5px;
                                  color: white;
                                "
                              >
                                <b>บิลเงินสดอย่างย่อ</b>
                              </b-col>
                              <b-col cols="2" style="text-align: right"
                                >ผู้เปิดบิล:</b-col
                              >
                              <b-col cols="2">
                                <b-form-input
                                  id="input-small"
                                  size="sm"
                                  readonly
                                  v-model="empName"
                                ></b-form-input>
                              </b-col>
                              <b-col cols="1" style="text-align: right"
                                >วันที่:</b-col
                              >
                              <b-col cols="2">
                                <b-form-input
                                  id="input-small"
                                  size="sm"
                                  readonly
                                  v-model="saleDate"
                                ></b-form-input>
                              </b-col>
                            </b-row>
                            <b-row style="margin-left: 0px; margin-right: 0px">
                              <b-col cols="3" style="padding-bottom: 0px">
                                <v-select
                                  style="text-align: center; height: 40px"
                                  v-model="selectedPlayPromo"
                                  :items="optionsPromotion"
                                  solo
                                ></v-select>
                              </b-col>
                              <b-col cols="3" style="padding-bottom: 0px">
                                <v-select
                                  style="text-align: center; height: 40px"
                                  v-model="selectSale"
                                  :items="optionsSale"
                                  solo
                                ></v-select>
                              </b-col>
                              <b-col
                                cols="1"
                                style="
                                  text-align: right;
                                  padding-left: 0px;
                                  padding-right: 0px;
                                "
                                >จำนวน:</b-col
                              >
                              <b-col cols="1"
                                ><b-form-input
                                  id="input-small"
                                  size="sm"
                                  type="number"
                                  v-model="saleQty"
                                ></b-form-input
                              ></b-col>
                              <b-col
                                cols="2"
                                style="
                                  text-align: right;
                                  padding-left: 0px;
                                  padding-right: 0px;
                                "
                                >รหัสสินค้า:</b-col
                              >
                              <b-col cols="2"
                                ><b-form-input
                                  id="input-small"
                                  size="sm"
                                ></b-form-input
                              ></b-col>
                            </b-row>
                          </b-col>
                          <b-col cols="5">
                            <v-card
                              style="
                                background-color: green;
                                font-size: 14px;
                                margin: 5px;
                                padding: 5px;
                              "
                            >
                              <b-row style="text-align: center">
                                <b-col cols="2" style="text-align: right"
                                  >รหัสสมาชิก:</b-col
                                >
                                <b-col cols="4"
                                  ><b-form-input
                                    id="input-small"
                                    size="sm"
                                    v-model="memberInfo.memberId"
                                  ></b-form-input
                                ></b-col>
                                <b-col cols="1"
                                  ><button @click.prevent="getMemberInfo">
                                    <v-icon>mdi-book-open</v-icon>
                                  </button></b-col
                                >
                                <b-col cols="2"></b-col>

                                <b-col cols="3">
                                  <v-btn @click="close">
                                    <v-icon>mdi mdi-home</v-icon>
                                  </v-btn></b-col
                                >
                              </b-row>
                              <b-row style="text-align: center">
                                <b-col cols="2" style="text-align: right"
                                  >ประเภท:</b-col
                                >
                                <b-col cols="3" style="font-size: 12px">{{
                                  memberInfo.memberType
                                }}</b-col>
                                <b-col cols="2" style="text-align: right"
                                  >คะแนนสะสม:</b-col
                                >
                                <b-col cols="2"
                                  ><b-form-input
                                    id="input-small"
                                    size="sm"
                                    v-model="memberInfo.point"
                                  ></b-form-input
                                ></b-col>
                                <b-col cols="2" style="text-align: right"
                                  >ส่วนลด %:</b-col
                                >
                                <b-col cols="1"
                                  ><b-form-input
                                    id="input-small"
                                    size="sm"
                                    v-model="memberInfo.memberDiscount"
                                  ></b-form-input
                                ></b-col>
                              </b-row>
                            </v-card>
                          </b-col>
                        </v-row>
                      </div>
                      <div class="bottom">
                        <div class="left-bottom">
                          <!-- <v-card-title style="padding-top: 0px">
                            <v-text-field
                              style="padding-top: 0px"
                              v-model="search"
                              append-icon="mdi-magnify"
                              label="Search"
                              single-line
                              hide-details
                            ></v-text-field>
                          </v-card-title> -->
                          <div class="content-list-item">
                            <b-table
                              :items="items"
                              :fields="productfields"
                              :current-page="currentPage"
                              :per-page="5"
                              :filter="search"
                              :filter-included-fields="filterOn"
                              :sort-by.sync="sortBy"
                              :sort-desc.sync="sortDesc"
                              :sort-direction="sortDirection"
                              stacked="md"
                              show-empty
                              small
                              @filtered="onFiltered"
                            >
                              <template #cell(name)="row"
                                >{{ row.value.first }}
                                {{ row.value.last }}</template
                              >

                              <template #cell(actions)="row">
                                <b-button
                                  size="sm"
                                  @click="
                                    info(row.item, row.index, $event.target)
                                  "
                                  class="mr-1"
                                  ><v-icon small @click="deleteItem(item)"
                                    >mdi-delete</v-icon
                                  ></b-button
                                >
                                <!-- <v-icon small @click="deleteItem(item)">mdi-delete</v-icon> -->
                              </template>
                            </b-table>
                          </div>
                          <div class="Calc-Price">
                            <v-row
                              no-gutters
                              style="padding: 10px 10px 0px 10px"
                            >
                              <b-col cols="6">
                                <b-row
                                  style="
                                    margin-left: 0px;
                                    margin-right: 0px;
                                    text-align: center;
                                  "
                                >
                                  <v-col
                                    style="
                                      background: rgb(0 0 0 / 52%);
                                      border-radius: 8px;
                                      text-align: center;
                                      margin-bottom: 5px;
                                      height: calc(15vh);
                                      font-size: 270%;
                                      padding: 1.5rem 0.75rem;
                                    "
                                    cols="12"
                                    sm="12"
                                    md="12"
                                    >21,899.00</v-col
                                  >
                                </b-row>
                              </b-col>
                              <b-col cols="6">
                                <b-row
                                  style="
                                    margin-left: 0px;
                                    margin-right: 0px;
                                    text-align: center;
                                    padding-top: 2px;
                                    padding-left: 5px;
                                  "
                                >
                                  <v-btn
                                    block
                                    large
                                    elevation="2"
                                    color="success"
                                  >
                                    <v-icon> mdi-play </v-icon>
                                    payment (F10)</v-btn
                                  >
                                </b-row>
                                <b-row
                                  style="margin-left: 0px; margin-right: 0px"
                                >
                                  <b-col cols="4" style="padding-bottom: 0px">
                                    <v-btn
                                      block
                                      large
                                      elevation="2"
                                      color="orange"
                                    >
                                      <v-icon> mdi-reload </v-icon>
                                      Rework</v-btn
                                    >
                                  </b-col>
                                  <b-col cols="4" style="padding-bottom: 0px">
                                    <v-btn
                                      block
                                      large
                                      elevation="2"
                                      color="#424242d4"
                                    >
                                      <v-icon> mdi-pause </v-icon>
                                      pause (F9)</v-btn
                                    >
                                  </b-col>
                                  <b-col cols="4" style="padding-bottom: 0px">
                                    <v-btn
                                      block
                                      large
                                      elevation="2"
                                      color="red"
                                    >
                                      <v-icon> mdi-delete </v-icon>
                                      Delete (F8)</v-btn
                                    >
                                  </b-col>
                                </b-row>
                              </b-col>
                            </v-row>
                          </div>
                        </div>
                        <div class="right-bottom">
                          <v-expansion-panels>
                            <v-expansion-panel>
                              <v-expansion-panel-header class="font-16">
                                ข้อมูลสมาชิก
                              </v-expansion-panel-header>
                              <v-expansion-panel-content>
                                <v-col cols="12" sm="12" md="12">
                                  <v-text-field
                                    value="Test test"
                                    class="font-16"
                                    label="ชื่อสมาชิก"
                                    dense
                                    readonly
                                  >
                                  </v-text-field>
                                </v-col>

                                <v-col cols="12" sm="12" md="12">
                                  <v-text-field
                                    value="01/06/2562"
                                    class="font-16"
                                    label="วันสมัคร"
                                    dense
                                    readonly
                                  >
                                  </v-text-field>
                                </v-col>

                                <v-col cols="12" sm="12" md="12">
                                  <v-text-field
                                    value="01/06/2566"
                                    class="font-16"
                                    label="วันหมดอายุ"
                                    dense
                                    readonly
                                  >
                                  </v-text-field>
                                </v-col>

                                <v-col cols="12" sm="12" md="12">
                                  <v-text-field
                                    value="01/06/2520"
                                    class="font-16"
                                    label="วันเกิด"
                                    dense
                                    readonly
                                  >
                                  </v-text-field>
                                </v-col>

                                <v-col cols="12" sm="12" md="12">
                                  <v-text-field
                                    value="01/06/2565"
                                    class="font-16"
                                    label="OPS DAY"
                                    dense
                                    readonly
                                  >
                                  </v-text-field>
                                </v-col>

                                <v-col cols="12" sm="12" md="12">
                                  <v-textarea
                                    outlined
                                    name="input-7-7"
                                    label="ที่อยู่"
                                    value="12/345"
                                  ></v-textarea>
                                </v-col>
                                <v-col cols="12" sm="12" md="12"> </v-col>
                              </v-expansion-panel-content>
                            </v-expansion-panel>

                            <v-expansion-panel class="v-item--active">
                              <v-expansion-panel-header class="font-16">
                                ฟังก์ชั่น
                              </v-expansion-panel-header>
                              <v-expansion-panel-content>
                                <v-col class="d-flex" cols="12" sm="12" md="12">
                                  <v-col cols="12" sm="6" md="6">
                                    <v-btn elevation="2" color="primary"
                                      ><v-icon> mdi-worker </v-icon>
                                      Click</v-btn
                                    >
                                  </v-col>
                                  <v-col cols="12" sm="6" md="6">
                                    <v-btn elevation="2" color="primary"
                                      ><v-icon> mdi-worker </v-icon>
                                      Click</v-btn
                                    >
                                  </v-col>
                                </v-col>

                                <v-col class="d-flex" cols="12" sm="12" md="12">
                                  <v-col cols="12" sm="6" md="6">
                                    <v-btn elevation="2" color="primary"
                                      ><v-icon> mdi-worker </v-icon>
                                      Click</v-btn
                                    >
                                  </v-col>
                                  <v-col cols="12" sm="6" md="6">
                                    <v-btn elevation="2" color="primary"
                                      ><v-icon> mdi-worker </v-icon>
                                      Click</v-btn
                                    >
                                  </v-col>
                                </v-col>

                                <v-col class="d-flex" cols="12" sm="12" md="12">
                                  <v-col cols="12" sm="6" md="6">
                                    <v-btn elevation="2" color="primary"
                                      ><v-icon> mdi-worker </v-icon>
                                      Click</v-btn
                                    >
                                  </v-col>
                                  <v-col cols="12" sm="6" md="6">
                                    <v-btn elevation="2" color="primary"
                                      ><v-icon> mdi-worker </v-icon>
                                      Click</v-btn
                                    >
                                  </v-col>
                                </v-col>
                              </v-expansion-panel-content>
                            </v-expansion-panel>

                            <v-expansion-panel>
                              <v-expansion-panel-header class="font-16">
                                อื่นๆ
                              </v-expansion-panel-header>
                              <v-expansion-panel-content>
                                <v-col class="d-flex" cols="12" sm="12" md="12">
                                  <v-col cols="12" sm="6" md="6">
                                    <v-btn
                                      elevation="2"
                                      color="primary"
                                      class="font-16"
                                      style="height: 80px"
                                      >Click</v-btn
                                    >
                                  </v-col>
                                  <v-col cols="12" sm="6" md="6">
                                    <v-btn
                                      elevation="2"
                                      color="primary"
                                      class="font-16"
                                      style="height: 80px"
                                      >Click</v-btn
                                    >
                                  </v-col>
                                </v-col>
                                <v-col class="d-flex" cols="12" sm="12" md="12">
                                  <v-col cols="12" sm="6" md="6">
                                    <v-btn
                                      elevation="2"
                                      color="primary"
                                      class="font-16"
                                      style="height: 80px"
                                      >Click</v-btn
                                    >
                                  </v-col>
                                  <v-col cols="12" sm="6" md="6">
                                    <v-btn
                                      elevation="2"
                                      color="primary"
                                      class="font-16"
                                      style="height: 80px"
                                      >Click</v-btn
                                    >
                                  </v-col>
                                </v-col>
                                <v-col class="d-flex" cols="12" sm="12" md="12">
                                  <v-col cols="12" sm="6" md="6">
                                    <v-btn
                                      elevation="2"
                                      color="primary"
                                      class="font-16"
                                      style="height: 80px"
                                      >Click</v-btn
                                    >
                                  </v-col>
                                  <v-col cols="12" sm="6" md="6">
                                    <v-btn
                                      elevation="2"
                                      color="primary"
                                      class="font-16"
                                      style="height: 80px"
                                      >Click</v-btn
                                    >
                                  </v-col>
                                </v-col>
                                <v-col class="d-flex" cols="12" sm="12" md="12">
                                  <v-col cols="12" sm="6" md="6">
                                    <v-btn
                                      elevation="2"
                                      color="primary"
                                      class="font-16"
                                      style="height: 80px"
                                      >Click</v-btn
                                    >
                                  </v-col>
                                  <v-col cols="12" sm="6" md="6">
                                    <v-btn
                                      elevation="2"
                                      color="primary"
                                      class="font-16"
                                      style="height: 80px"
                                      >Click</v-btn
                                    >
                                  </v-col>
                                </v-col>
                                <v-col class="d-flex" cols="12" sm="12" md="12">
                                  <v-col cols="12" sm="6" md="6">
                                    <v-btn
                                      elevation="2"
                                      color="primary"
                                      class="font-16"
                                      style="height: 80px"
                                      >Click</v-btn
                                    >
                                  </v-col>
                                  <v-col cols="12" sm="6" md="6">
                                    <v-btn
                                      elevation="2"
                                      color="primary"
                                      class="font-16"
                                      style="height: 80px"
                                      >Click</v-btn
                                    >
                                  </v-col>
                                </v-col>
                              </v-expansion-panel-content>
                            </v-expansion-panel>
                          </v-expansion-panels>
                        </div>
                      </div>
                    </div>
                  </v-overlay>
                </v-dialog>

                <v-dialog v-model="dialogDelete" max-width="500px">
                  <v-card>
                    <v-card-title class="text-h5"
                      >Are you sure you want to delete this item?</v-card-title
                    >
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeDelete"
                        >Cancel</v-btn
                      >
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="deleteItemConfirm"
                        >OK</v-btn
                      >
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)"
                >mdi-pencil</v-icon
              >
              <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
            </template>
            <!-- <template v-slot:no-data> -->
            <!-- <v-btn color="primary" @click="initialize">Reset</v-btn> -->
            <!-- </template> -->
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
      dialog: false,
      absolute: true,
      overlay: false,
      search: "",
      dialogDelete: false,
      saleDate: dayjs().format("YYYY-MM-DD"),
      items: [
        {
          productId: 40,
          productName: "Dickerson0",
          pricePerItem: "100",
          discount: "100",
        },
        {
          productId: 41,
          productName: "Dickerson1",
          pricePerItem: "100",
          discount: "100",
        },
        {
          productId: 42,
          productName: "Dickerson2",
          pricePerItem: "150",
          discount: "100",
        },
        {
          productId: 43,
          productName: "Dickerson3",
          pricePerItem: "200",
          discount: "100",
        },
      ],
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
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%",
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%",
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%",
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%",
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: "16%",
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: "0%",
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: "2%",
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: "45%",
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: "22%",
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: "6%",
        },
      ],
      editedIndex: -1,
      editedItem: {
        name: "",
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      defaultItem: {
        name: "",
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
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
      items: [],
      productfields: [
        {
          key: "productId",
          label: "รหัสสินค้า",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "productName",
          label: "รายละเอียดสินค้า",
          sortable: true,
          class: "text-center",
        },
        {
          key: "saleQty",
          label: "จำนวน",
          sortable: true,
          class: "text-center",
        },
        {
          key: "pricePerItem",
          label: "ราคา",
          sortable: true,
          class: "text-center",
        },
        { key: "total", label: "จำนวนเงิน", class: "text-center" },
        { key: "discount", label: "ส่วนลด", class: "text-center" },
        { key: "amount", label: "รวมเงิน", class: "text-center" },
        { key: "actions", label: "Actions" },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
      saleQty: 1,
    };
  },
  mounted: function () {
    if (this.$store.state.is_login == false) {
      this.$router.push({ name: "Home" });
    } else {
      this.empName = this.$store.state.userInfo.name;
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      console.log("close dialog");
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
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
    info(item, index, button) {
      alert(item);
      // this.infoModal.title = `Row index: ${index}`;
      // this.infoModal.content = JSON.stringify(item, null, 2);
      // this.$root.$emit('bv::show::modal', this.infoModal.id, button);
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    getMemberInfo() {
      this.memberInfo = {
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
  display: flex;
  height: 70%;
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
