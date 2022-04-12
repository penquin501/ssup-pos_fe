<template>
  <div>
    <b-card>
      <b-tabs content-class="mt-3">
        <b-tab
          v-if="listMenu.find((name) => name == 'Sale')"
          title="Sale"
          active
        >
          <!-- <v-btn color="primary" @click.prevent="overlay = true, dialog = true">เปิดบิล+</v-btn> -->
          <!-- <v-btn color="primary" @click.prevent="overlayCashier = true, dialogCashier = true">เงินหน้าร้าน</v-btn> -->

          <v-dialog
            v-model="dialog"
            max-width="500px"
            :retain-focus="false"
            persistent
          >
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
                            v-model="empSaleInfo.emp_name"
                          ></b-form-input>
                        </b-col>
                        <b-col cols="1" style="text-align: right"
                          >วันที่:</b-col
                        >
                        <b-col cols="2">
                          <b-form-input
                            style="font-size: 12px !important"
                            id="input-small"
                            size="sm"
                            readonly
                            v-model="saleDate"
                          ></b-form-input>
                        </b-col>
                      </b-row>
                      <b-row style="margin-left: 0px; margin-right: 0px">
                        <b-col cols="3" style="padding-bottom: 0px">
                          <!-- <v-select
                            style="text-align: center; height: 40px"
                            v-model="selectedPlayPromo"
                            :items="optionsPromotion"
                            solo
                          ></v-select> -->
                        </b-col>
                        <b-col cols="3" style="padding-bottom: 0px">
                          <!-- <v-select
                            style="text-align: center; height: 40px"
                            v-model="selectSale"
                            :items="optionsSale"
                            solo
                          ></v-select> -->
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
                            v-model="productInput"
                            ref="productInput"
                            @keypress.enter="addItem()"
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
                              @change="getMemberInfo()"
                              @keypress.enter="getMemberInfo()"
                              v-model="memberInfo.memberId"
                            ></b-form-input
                          ></b-col>
                          <b-col cols="1"
                            ><button @click.prevent="getMemberInfo()">
                              <v-icon>mdi-account-search</v-icon>
                            </button></b-col
                          >
                          <b-col cols="1">
                            <button @click.prevent="openDialog('add')">
                              <!-- <v-icon>mdi-content-paste</v-icon>Register -->
                              <i class="fa fa-id-card-o" aria-hidden="true"></i>
                            </button>
                          </b-col>
                          <b-col cols="1"></b-col>

                          <b-col cols="3">
                            <v-btn @click.prevent="closePosDialog">
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
                    <v-card-title style="padding-top: 0px">
                      <v-text-field
                        style="padding-top: 0px"
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details
                      ></v-text-field>
                    </v-card-title>
                    <div class="content-list-item">
                      <b-table
                        :items="items"
                        :fields="productfields"
                        :current-page="currentPage"
                        :filter="search"
                        stacked="md"
                        show-empty
                        small
                      >
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
                    <div class="Calc-Price">
                      <v-row no-gutters style="padding: 10px 10px 0px 10px">
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
                              v-model="net"
                              >{{ formatPrice(net) }}</v-col
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
                              @click.prevent="showPayment()"
                            >
                              <v-icon> mdi-play </v-icon>
                              payment (F10)</v-btn
                            >
                          </b-row>
                          <b-row style="margin-left: 0px; margin-right: 0px">
                            <b-col cols="4" style="padding-bottom: 0px">
                              <v-btn
                                block
                                large
                                elevation="2"
                                color="orange"
                                @click="reworkOrder"
                              >
                                <v-badge
                                  :content="$store.state.lastOrder.length"
                                  :value="$store.state.lastOrder.length"
                                  color="green"
                                >
                                  <v-icon> mdi-reload </v-icon>
                                </v-badge>
                                Rework</v-btn
                              >
                            </b-col>
                            <b-col cols="4" style="padding-bottom: 0px">
                              <v-btn
                                block
                                large
                                elevation="2"
                                color="#424242d4"
                                @click="pauseOrder"
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
                                @click="cancelOrder"
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
                    <v-expansion-panels v-model="panel" multiple>
                      <v-expansion-panel @click.prevent="openPanelFunction()" >
                        <v-expansion-panel-header class="font-16">
                          ข้อมูลสมาชิก
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                          <v-col cols="12" sm="12" md="12" style="padding-top: 0px; padding-bottom: 0px;">
                            <v-text-field
                              v-model="memberInfo.memberName"
                              class="font-16"
                              label="ชื่อสมาชิก"
                              dense
                              readonly
                            >
                            </v-text-field>
                          </v-col>

                          <v-col cols="12" sm="12" md="12" style="padding-top: 0px; padding-bottom: 0px;">
                            <v-text-field
                              v-model="memberInfo.registerDate"
                              class="font-16"
                              label="วันสมัคร"
                              dense
                              readonly
                            >
                            </v-text-field>
                          </v-col>

                          <v-col cols="12" sm="12" md="12" style="padding-top: 0px; padding-bottom: 0px;">
                            <v-text-field
                              v-model="memberInfo.expiredDate"
                              class="font-16"
                              label="วันหมดอายุ"
                              dense
                              readonly
                            >
                            </v-text-field>
                          </v-col>

                          <v-col cols="12" sm="12" md="12" style="padding-top: 0px; padding-bottom: 0px;">
                            <v-text-field
                              v-model="memberInfo.birthdayDate"
                              class="font-16"
                              label="วันเกิด"
                              dense
                              readonly
                            >
                            </v-text-field>
                          </v-col>

                          <v-col cols="12" sm="12" md="12" style="padding-top: 0px; padding-bottom: 0px;">
                            <v-text-field
                              v-model="memberInfo.opsDate"
                              class="font-16"
                              label="OPS DAY"
                              dense
                              readonly
                            >
                            </v-text-field>
                          </v-col>

                          <v-col cols="12" sm="12" md="12" style="padding-top: 0px; padding-bottom: 0px;">
                            <v-textarea
                              outlined
                              name="input-7-7"
                              label="ที่อยู่"
                              v-model="memberInfo.memberAddress"
                            ></v-textarea>
                          </v-col>
                          <v-col cols="12" sm="12" md="12"> </v-col>
                        </v-expansion-panel-content>
                      </v-expansion-panel>

                      <v-expansion-panel @click.prevent="openPanelFunction()">
                        <v-expansion-panel-header class="font-16">
                          ฟังก์ชั่น
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                          <v-col class="d-flex" cols="12" sm="12" md="12">
                            <v-col cols="12" sm="6" md="6">
                              <v-btn elevation="2" color="primary"
                                ><v-icon> mdi-worker </v-icon> Click</v-btn
                              >
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                              <v-btn elevation="2" color="primary"
                                ><v-icon> mdi-worker </v-icon> Click</v-btn
                              >
                            </v-col>
                          </v-col>

                          <v-col class="d-flex" cols="12" sm="12" md="12">
                            <v-col cols="12" sm="6" md="6">
                              <v-btn elevation="2" color="primary"
                                ><v-icon> mdi-worker </v-icon> Click</v-btn
                              >
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                              <v-btn elevation="2" color="primary"
                                ><v-icon> mdi-worker </v-icon> Click</v-btn
                              >
                            </v-col>
                          </v-col>

                          <v-col class="d-flex" cols="12" sm="12" md="12">
                            <v-col cols="12" sm="6" md="6">
                              <v-btn elevation="2" color="primary"
                                ><v-icon> mdi-worker </v-icon> Click</v-btn
                              >
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                              <v-btn elevation="2" color="primary"
                                ><v-icon> mdi-worker </v-icon> Click</v-btn
                              >
                            </v-col>
                          </v-col>
                        </v-expansion-panel-content>
                      </v-expansion-panel>

                      <v-expansion-panel @click.prevent="openPanelFunction()">
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
          <v-dialog v-model="dialogLastOrder" persistent max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >กรุณาเลือก รายการที่ทำค้างไว้?</v-card-title
              >
              <v-card-text>
                <b-table
                  ref="selectableTable"
                  selectable
                  :items="$store.state.lastOrder"
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
                  <template #cell(actions)="row">
                    <b-button
                      size="sm"
                      @click="
                        deletePauseInvoice(row.item, row.index, $event.target)
                      "
                      class="mr-1"
                      ><v-icon small>mdi-delete</v-icon></b-button
                    >
                  </template>
                </b-table>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDialogLastOrder"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="confirmLastOrder"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
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
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm()"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogCancelOrder" persistent max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >ต้องการยกเลิกรายการสินค้าทั้งหมด ใช่หรือไม่?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="closeDialogCancelOrder"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="confirmCancelOrder"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog
            v-model="dialogCancelInvoicePauseOrder"
            persistent
            max-width="500px"
          >
            <v-card>
              <v-card-title class="text-h5"
                >ต้องการยกเลิกรายการเลขที่บิลนี้ ใช่หรือไม่?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="closeDialogCancelInvoicePauseOrder"
                  >Cancel</v-btn
                >
                <v-btn
                  color="blue darken-1"
                  text
                  @click="confirmCancelInvoicePauseOrder"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogConfirmInvoice">
            <v-card style="width: 200vw; height: auto">
              <v-toolbar flat>
                <v-card-title class="text-h5">สรุปรายการสินค้า</v-card-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="dialogConfirmInvoice = false"
                  ><v-icon>mdi-close</v-icon></v-btn
                >
              </v-toolbar>

              <v-card-text>
                <b-row style="margin-top: 0px; margin-bottom: 0px">
                  <b-col
                    cols="6"
                    style="
                      padding-top: 0px;
                      padding-left: 0px;
                      padding-bottom: 0px;
                      padding-right: 5px;
                      border-right: 1px solid gray;
                      overflow-y: scroll;
                      height: 765px;
                    "
                  >
                    <div style="text-align: center">
                      <p>Sale Details</p>
                      <p>{{ saleDate }}</p>
                      <p>Sales Receipt</p>
                      <p>Sold By: {{ empSaleInfo.emp_name }}</p>
                      <p>
                        <!-- Sold To: {{ Object.keys(this.memberInfo).length === 0 ? "Walk-in customer" : memberInfo.memberName }} -->
                        Sold To: {{ memberInfo.memberName == "" ? "Walk-in customer" : memberInfo.memberName }}
                      </p>
                      <p>
                        <b-table-simple striped>
                          <b-thead>
                            <b-tr>
                              <b-th>รหัสสินค้า</b-th>
                              <b-th>รายละเอียดสินค้า</b-th>
                              <b-th>จำนวน</b-th>
                              <b-th>ราคา/หน่วย</b-th>
                              <b-th>รวม</b-th>
                            </b-tr>
                          </b-thead>
                          <b-tbody>
                            <b-tr
                              v-for="(item, index) in items"
                              :key="item.barcode"
                            >
                              <b-td>{{ item.barcode }}</b-td>
                              <b-td>{{ item.name_product }}</b-td>
                              <b-td>{{ item.saleQty }}</b-td>
                              <b-td class="text-right">{{ item.price }}</b-td>
                              <b-td class="text-right">{{ item.total }}</b-td>
                            </b-tr>
                          </b-tbody>
                          <b-tfoot>
                            <b-tr>
                              <b-td class="text-left">จำนวนรายการ:</b-td>
                              <b-td colspan="4" class="text-right">{{
                                items.length
                              }}</b-td>
                            </b-tr>
                            <b-tr>
                              <b-td class="text-left">Sub Total:</b-td>
                              <b-td colspan="4" class="text-right">{{
                                saleTotal
                              }}</b-td>
                            </b-tr>
                            <b-tr>
                              <b-td class="text-left">Discount:</b-td>
                              <b-td colspan="4" class="text-right">{{
                                discountTotal
                              }}</b-td>
                            </b-tr>
                            <b-tr>
                              <b-td class="text-left" variant="secondary"
                                >Net:</b-td
                              >
                              <b-td
                                colspan="4"
                                variant="secondary"
                                class="text-right"
                                ><b>{{ net }}</b></b-td
                              >
                            </b-tr>
                            <b-tr v-if="cashIn > net">
                              <b-td class="text-left">Change:</b-td>
                              <b-td colspan="4" class="text-right"
                                ><b>{{ cashIn - net }}</b></b-td
                              >
                            </b-tr>
                          </b-tfoot>
                        </b-table-simple>
                      </p>
                    </div>
                    <div>
                      <v-btn class="form-control"
                        ><v-icon>mdi-printer</v-icon>Print Receipt</v-btn
                      >
                    </div>
                  </b-col>
                  <b-col cols="6" style="padding: 6px !important">
                    <b-col cols="12">
                      <b-row>
                        <b-col cols="2" style="padding: 20px 0px 4px 10px"
                          ><p>Points ::</p></b-col
                        >
                        <b-col cols="2" style="padding: 20px 0px 4px 10px"
                          ><v-text-field
                            @change="paymentMethod = 'cash'"
                            v-model="memberInfo.point"
                          ></v-text-field
                        ></b-col>
                        <b-col cols="3"><p>Points Used ::</p></b-col>
                        <b-col cols="2"
                          ><v-text-field
                            @change="paymentMethod = 'cash'"
                            v-model="cashIn"
                          ></v-text-field
                        ></b-col>
                      </b-row>
                      <b-row style="margin-top: 1px !important">
                        <b-col cols="6"><p>Total ::</p></b-col>
                        <b-col cols="6"
                          ><p>{{ formatPrice(net) }}</p></b-col
                        >
                      </b-row>
                      <b-row>
                        <b-col cols="6"><p>ส่วนลด ::</p></b-col>
                        <b-col cols="6"
                          ><p>{{ formatPrice(discountTotal) }}</p></b-col
                        >
                      </b-row>
                      <b-row>
                        <b-col cols="6"><p>Tax ::</p></b-col>
                        <b-col cols="6"
                          ><p>{{ taxTotal.toFixed(2) }}</p></b-col
                        >
                      </b-row>
                      <b-row>
                        <b-col cols="6"><p>รับเงิน ::</p></b-col>
                        <b-col cols="6"
                          ><v-text-field
                            @change="paymentMethod = 'cash'"
                            v-model="cashIn"
                          ></v-text-field
                        ></b-col>

                        <b-col cols="6"><p>เงินทอน ::</p></b-col>
                        <b-col cols="6"
                          ><v-text-field
                            @change="paymentMethod = 'cash'"
                            v-model="cashIn"
                          ></v-text-field
                        ></b-col>
                      </b-row>
                      <b-row>
                        <b-col cols="6"><p>Note</p></b-col>
                        <b-col cols="6"
                          ><v-textarea
                            rows="3"
                            outlined
                            v-model="remark"
                          ></v-textarea
                        ></b-col>
                      </b-row>
                      <v-divider></v-divider>
                      <b-row style="text-align: center">
                        <b-col cols="6"
                          ><v-btn @click="paymentMethod = 'cash'"
                            ><v-icon>mdi-cash-multiple</v-icon>Cash</v-btn
                          ></b-col
                        >
                        <b-col cols="6"
                          ><v-btn @click="paymentMethod = 'creditCard'"
                            ><v-icon>mdi-credit-card</v-icon>Credit Card</v-btn
                          ></b-col
                        >
                      </b-row>
                      <v-divider></v-divider>
                      <div>
                        <v-btn
                          @click.prevent="saveOrder()"
                          color="success"
                          class="form-control"
                          >Done Payment</v-btn
                        >
                      </div>
                    </b-col>
                  </b-col>
                </b-row>
              </v-card-text>
            </v-card>
          </v-dialog>
          <v-dialog
            v-model="dialogRegister"
            max-width="500px"
            :retain-focus="false"
            persistent
          >
            <v-overlay :absolute="absolute" :value="overlayRegister" responsive>
              <v-card class="mx-auto" max-width="500px" light>
                <v-card-title>
                  <b>Member Register</b>
                  <v-spacer></v-spacer>
                  <v-btn
                    icon
                    @click.prevent="
                      (dialogRegister = false), (overlayRegister = false)
                    "
                    ><v-icon>mdi-close</v-icon></v-btn
                  >
                </v-card-title>
                <v-card-subtitle class="pb-0">ข้อมูลสมาชิก</v-card-subtitle>
                <v-card-text
                  class="text--primary"
                  style="background-color: orange"
                >
                  <v-row>
                    <v-col>
                      <label>ชื่อ :</label>
                      <b-form-input
                        size="sm"
                        type="text"
                        v-model="formRegister.firstName"
                        @keypress="inputCheckFormatName"
                      ></b-form-input>
                    </v-col>
                    <v-col>
                      <label>นามสกุล :</label>
                      <b-form-input
                        size="sm"
                        type="text"
                        v-model="formRegister.lastName"
                        @keypress="inputCheckFormatName"
                      ></b-form-input>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <label>First Name :</label>
                      <b-form-input
                        size="sm"
                        type="text"
                        v-model="formRegister.firstNameEng"
                        @keypress="inputCheckFormatName"
                      ></b-form-input>
                    </v-col>
                    <v-col>
                      <label>Lastname :</label>
                      <b-form-input
                        size="sm"
                        type="text"
                        v-model="formRegister.lastNameEng"
                        @keypress="inputCheckFormatName"
                      ></b-form-input>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <label>เลขที่บัตรประชาชน:</label>
                      <b-form-input
                        size="sm"
                        type="text"
                        maxlength="13"
                        v-model="formRegister.cardId"
                        @keypress="onlyNumber"
                      ></b-form-input>
                    </v-col>
                    <v-col>
                      <label>เบอร์โทรศัพท์ :</label>
                      <b-form-input
                        size="sm"
                        type="tel"
                        maxlength="10"
                        v-model="formRegister.phone"
                        @keypress="onlyNumber"
                      ></b-form-input>
                    </v-col>
                    <v-col>
                      <label>E-mail: </label>
                      <b-form-input
                        size="sm"
                        type="email"
                        v-model="formRegister.email"
                      ></b-form-input>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <label>วันเกิด :</label>
                      <b-form-input
                        size="sm"
                        type="date"
                        v-model="formRegister.birthday"
                      ></b-form-input>
                    </v-col>
                    <v-col>
                      <label>Member Type :</label>
                      <v-select
                        style="text-align: center; height: 20px"
                        background-color="white"
                        v-model="formRegister.type"
                        :items="options"
                        label="Type"
                        flat
                        solo
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <label>ที่อยู่ :</label>
                      <b-form-input
                        size="sm"
                        type="text"
                        v-model="formRegister.address"
                      ></b-form-input>
                    </v-col>
                    <v-col>
                      <label>จังหวัด :</label>
                      <v-select
                        style="text-align: center; height: 20px"
                        background-color="white"
                        v-model="selectedProvince"
                        @change="getDistricts()"
                        :items="provincesOptions"
                        label="จังหวัด"
                        flat
                        solo
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <label>อำเภอ :</label>
                      <v-select
                        style="text-align: center; height: 20px"
                        background-color="white"
                        v-model="selectedDistrict"
                        @change="getSubDistricts()"
                        :items="districtsOptions"
                        label="อำเภอ"
                        flat
                        solo
                      ></v-select>
                    </v-col>
                    <v-col>
                      <label>ตำบล :</label>
                      <v-select
                        style="text-align: center; height: 20px"
                        background-color="white"
                        v-model="selectedSubDistrict"
                        @change="getZipcode()"
                        :items="subdistrictsOptions"
                        label="ตำบล"
                        flat
                        solo
                      ></v-select>
                    </v-col>
                    <v-col style="padding-bottom: 24px">
                      <label>รหัสไปรษณีย์ :</label>
                      <b-form-input
                        size="sm"
                        type="text"
                        maxlength="5"
                        v-model="formRegister.zipcode"
                        @keypress="onlyNumber"
                      ></b-form-input>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="warning" text @click.prevent="clearFormRegister()"
                    >Reset</v-btn
                  >
                  <v-btn
                    type="submit"
                    color="success"
                    text
                    @click.prevent="saveFormRegister()"
                    >Save</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-overlay>
          </v-dialog>
          <!-- <v-dialog v-model="dialogConfirmEmp" persistent max-width="500px">
            <v-card>
              <v-card-title class="text-h5">กรอกรหัสพนักงาน</v-card-title>
              <v-card-text>
                <p>รหัสพนักงาน</p>
                <v-text-field v-model="empSaleInput"></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="dialogConfirmEmp = false"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click.prevent="getEmpInfo()"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog> -->
          <v-dialog
            v-model="dialogCashier"
            max-width="500px"
            :retain-focus="false"
            persistent
          >
            <v-overlay :absolute="absolute" :value="overlayCashier" responsive>
              <v-card class="mx-auto" max-width="500px" light>
                <v-card-title>
                  <b>Cashier</b>
                  <v-spacer></v-spacer>
                  <v-btn
                    icon
                    @click.prevent="
                      (dialogCashier = false), (overlayCashier = false)
                    "
                    ><v-icon>mdi-close</v-icon></v-btn
                  >
                </v-card-title>
                <v-card-subtitle class="pb-0"
                  >กรุณากรอกจำนวนเงิน</v-card-subtitle
                >
                <v-card-text class="text--primary">
                  <v-row>
                    <v-col style="background-color: orange">
                      <label>เงินทอน</label>
                      <b-form>
                        <label>1000 :</label>
                        <b-form-input
                          size="sm"
                          type="number"
                          :state="validation(formCashier.thousand)"
                          v-model="formCashier.thousand"
                          trim
                        ></b-form-input>
                        <label>500 :</label>
                        <b-form-input
                          size="sm"
                          type="number"
                          :state="validation(formCashier.fiveHundred)"
                          v-model="formCashier.fiveHundred"
                        ></b-form-input>
                        <label>100 :</label>
                        <b-form-input
                          size="sm"
                          type="number"
                          :state="validation(formCashier.oneHundred)"
                          v-model="formCashier.oneHundred"
                        ></b-form-input>
                        <label>50 :</label>
                        <b-form-input
                          size="sm"
                          type="number"
                          :state="validation(formCashier.fifty)"
                          v-model="formCashier.fifty"
                        ></b-form-input>
                        <label>20 :</label>
                        <b-form-input
                          size="sm"
                          type="number"
                          :state="validation(formCashier.twenty)"
                          v-model="formCashier.twenty"
                        ></b-form-input>
                        <label>10 :</label>
                        <b-form-input
                          size="sm"
                          type="number"
                          :state="validation(formCashier.ten)"
                          v-model="formCashier.ten"
                        ></b-form-input>
                        <label>5 :</label>
                        <b-form-input
                          size="sm"
                          type="number"
                          :state="validation(formCashier.five)"
                          v-model="formCashier.five"
                        ></b-form-input>
                        <label>2 :</label>
                        <b-form-input
                          size="sm"
                          type="number"
                          :state="validation(formCashier.two)"
                          v-model="formCashier.two"
                        ></b-form-input>
                        <label>1 :</label>
                        <b-form-input
                          size="sm"
                          type="number"
                          :state="validation(formCashier.one)"
                          v-model="formCashier.one"
                        ></b-form-input>
                        <!-- <label>0.50 :</label>
                          <b-form-input size="sm" type="number" :state="validation(formCashier.fiftyCent)" v-model="formCashier.fiftyCent"></b-form-input>
                          <label>0.25 :</label>
                          <b-form-input size="sm" type="number" :state="validation(formCashier.twentyFiveCent)" v-model="formCashier.twentyFiveCent"></b-form-input> -->
                      </b-form>
                    </v-col>
                    <v-col style="background-color: yellow">
                      <label>ยอดขาย</label>
                      <b-form>
                        <label>1000 :</label>
                        <b-form-input
                          size="sm"
                          type="number"
                          :state="validation(formCashier.thousand)"
                          v-model="formCashier.thousand"
                        ></b-form-input>
                        <label>500 :</label>
                        <b-form-input
                          size="sm"
                          type="number"
                          :state="validation(formCashier.fiveHundred)"
                          v-model="formCashier.fiveHundred"
                        ></b-form-input>
                        <label>100 :</label>
                        <b-form-input
                          size="sm"
                          type="number"
                          :state="validation(formCashier.oneHundred)"
                          v-model="formCashier.oneHundred"
                        ></b-form-input>
                        <label>50 :</label>
                        <b-form-input
                          size="sm"
                          type="number"
                          :state="validation(formCashier.fifty)"
                          v-model="formCashier.fifty"
                        ></b-form-input>
                        <label>20 :</label>
                        <b-form-input
                          size="sm"
                          type="number"
                          :state="validation(formCashier.twenty)"
                          v-model="formCashier.twenty"
                        ></b-form-input>
                        <label>10 :</label>
                        <b-form-input
                          size="sm"
                          type="number"
                          :state="validation(formCashier.ten)"
                          v-model="formCashier.ten"
                        ></b-form-input>
                        <label>5 :</label>
                        <b-form-input
                          size="sm"
                          type="number"
                          :state="validation(formCashier.five)"
                          v-model="formCashier.five"
                        ></b-form-input>
                        <label>2 :</label>
                        <b-form-input
                          size="sm"
                          type="number"
                          :state="validation(formCashier.two)"
                          v-model="formCashier.two"
                        ></b-form-input>
                        <label>1 :</label>
                        <b-form-input
                          size="sm"
                          type="number"
                          :state="validation(formCashier.one)"
                          v-model="formCashier.one"
                        ></b-form-input>
                        <!-- <label>0.50 :</label>
                          <b-form-input size="sm" type="number" :state="validation(formCashier.fiftyCent)" v-model="formCashier.fiftyCent"></b-form-input>
                          <label>0.25 :</label>
                          <b-form-input size="sm" type="number" :state="validation(formCashier.twentyFiveCent)" v-model="formCashier.twentyFiveCent"></b-form-input> -->
                      </b-form>
                    </v-col>
                    <v-col style="background-color: lightgreen">
                      <label>เงินสดย่อย</label>
                      <b-form>
                        <label>1000 :</label>
                        <b-form-input
                          size="sm"
                          type="number"
                          :state="validation(formCashier.thousand)"
                          v-model="formCashier.thousand"
                        ></b-form-input>
                        <label>500 :</label>
                        <b-form-input
                          size="sm"
                          type="number"
                          :state="validation(formCashier.fiveHundred)"
                          v-model="formCashier.fiveHundred"
                        ></b-form-input>
                        <label>100 :</label>
                        <b-form-input
                          size="sm"
                          type="number"
                          :state="validation(formCashier.oneHundred)"
                          v-model="formCashier.oneHundred"
                        ></b-form-input>
                        <label>50 :</label>
                        <b-form-input
                          size="sm"
                          type="number"
                          :state="validation(formCashier.fifty)"
                          v-model="formCashier.fifty"
                        ></b-form-input>
                        <label>20 :</label>
                        <b-form-input
                          size="sm"
                          type="number"
                          :state="validation(formCashier.twenty)"
                          v-model="formCashier.twenty"
                        ></b-form-input>
                        <label>10 :</label>
                        <b-form-input
                          size="sm"
                          type="number"
                          :state="validation(formCashier.ten)"
                          v-model="formCashier.ten"
                        ></b-form-input>
                        <label>5 :</label>
                        <b-form-input
                          size="sm"
                          type="number"
                          :state="validation(formCashier.five)"
                          v-model="formCashier.five"
                        ></b-form-input>
                        <label>2 :</label>
                        <b-form-input
                          size="sm"
                          type="number"
                          :state="validation(formCashier.two)"
                          v-model="formCashier.two"
                        ></b-form-input>
                        <label>1 :</label>
                        <b-form-input
                          size="sm"
                          type="number"
                          :state="validation(formCashier.one)"
                          v-model="formCashier.one"
                        ></b-form-input>
                        <!-- <label>0.50 :</label>
                          <b-form-input size="sm" type="number" :state="validation(formCashier.fiftyCent)" v-model="formCashier.fiftyCent"></b-form-input>
                          <label>0.25 :</label>
                          <b-form-input size="sm" type="number" :state="validation(formCashier.twentyFiveCent)" v-model="formCashier.twentyFiveCent"></b-form-input> -->
                      </b-form>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="warning"
                    text
                    @click.prevent="clearCashierForm()"
                    >Reset</v-btn
                  >
                  <v-btn
                    type="submit"
                    color="success"
                    text
                    @click.prevent="saveFormCashier()"
                    >Save</v-btn
                  >
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
import axios from "axios";
const queryString = require("query-string");

export default {
  data() {
    return {
      dialog: false,
      absolute: true,
      overlay: false,
      overlayCashier: false,
      overlayRegister: false,
      search: null,
      searchInvoice: "",
      dialogDelete: false,
      dialogCancelOrder: false,
      dialogLastOrder: false,
      dialogCancelInvoicePauseOrder: false,
      dialogConfirmInvoice: false,
      dialogConfirmEmp: false,
      dialogRegister: false,
      dialogCashier: false,
      invoiceNo: "",
      pause: false,
      panel: [0],
      today: dayjs().format("DD-MM-YYYY"),
      saleDate: dayjs().format("YYYY-MM-DD HH:mm"),
      listMenu: [],
      listInvoice: [],
      productfields: [
        {
          key: "barcode",
          label: "รหัสสินค้า",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "name_product",
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
          key: "price",
          label: "ราคา/หน่วย",
          sortable: true,
          class: "text-center",
        },
        { key: "total", label: "จำนวนเงิน", class: "text-center" },
        { key: "actions", label: "Actions" },
      ],
      lastOrderfields: [
        "selected",
        { key: "invoiceNo", label: "เลขที่บิล", class: "text-center" },
        { key: "timeRecord", label: "เวลา", class: "text-center" },
        { key: "actions", label: "Actions" },
      ],
      selectedRework: [],
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
      paymentMethod: null,
      optionsPaymentMethod: [
        { value: null, text: "เลือกวิธีชำระเงิน" },
        { value: "cash", text: "เงินสด" },
        { value: "creditCard", text: "Credit Card" },
      ],
      memberInfo: {
        memberId: "",
        memberType: "",
        memberName: "",
        memberAddress: "",
        memberPhone: "",
        point: "",
        memberlevel: "",
        memberDiscount: "",
        registerDate: dayjs().format("YYYY-MM-DD"),
        expiredDate: dayjs().format("YYYY-MM-DD"),
        birthdayDate: dayjs().format("YYYY-MM-DD"),
        opsDate: dayjs().format("YYYY-MM-DD"),
      },
      totalRows: 1,
      currentPage: 1,
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      saleQty: 1,
      productInput: "",
      points: 0,
      pointsUsed: 0,
      pointsNet: 0,
      saleTotal: 0,
      discountTotal: 0,
      net: 0,
      tax: 0,
      taxTotal: 0,
      cashIn: 0,
      remark: "",
      selectCancelInvoiceIndex: 0,
      currentItemIndex: 0,
      itemIndex: 0,
      userInfo: {},
      empSaleInfo: {},
      empSaleInput: "",
      formCashier: {
        thousand: 0,
        fiveHundred: 0,
        oneHundred: 0,
        fifty: 0,
        twenty: 0,
        ten: 0,
        five: 0,
        two: 0,
        one: 0,
        fiftyCent: 0,
        twentyFiveCent: 0,
      },
      formRegister: {
        firstName: "",
        lastName: "",
        firstNameEng: "",
        lastNameEng: "",
        cardId: "",
        phone: "",
        address: "",
        subDistrictId: "",
        subDistrict: "",
        districtId: "",
        district: "",
        provinceId: "",
        province: "",
        zipcode: "",
        type: "",
        birthday: "",
        email: "",
      },
      provincesOptions: [],
      districtsOptions: [],
      subdistrictsOptions: [],
      options: [
        { value: null, text: "เลือกประเภท" },
        { value: "1", text: "Type 1" },
        { value: "2", text: "Type 2" },
      ],
      configHeader: {},
      selectedProvince: "",
      selectedDistrict: "",
      selectedSubDistrict: "",
      actionForm: "",
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
      if (this.$store.state.currentOrder !== null) {
        let currentOrder = JSON.parse(this.$store.state.currentOrder);
        this.invoiceNo = currentOrder.invoiceNo;
        this.items = currentOrder.orderInfo;
        this.memberInfo = currentOrder.memberInfo;
        this.points = currentOrder.points;
        this.pointsNet = currentOrder.pointsNet;
        this.pointsUsed = currentOrder.pointsUsed;

        this.calSaleTotal();
        this.calPoints();
      }
      this.userInfo = JSON.parse(this.$store.state.userInfo);
      
      this.configHeader = {
        headers: { Authorization: `Bearer ${this.userInfo.token}` },
      };
      // this.generateNewInvoice();
      this.formCashier = this.$store.state.cashierBillInfo == null ? this.formCashier : this.$store.state.cashierBillInfo;

      this.defaultMenu();
      this.checkCashier();
      this.getEmpInfo();
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
    checkCashier() {
      /**
       * TODO: API check ข้อมูลเงินใน cashier
       */
      if (this.$store.state.cashierBillInfo == null) {
        this.dialogCashier = true;
        this.overlayCashier = true;
      } else {
        this.dialog = true;
        this.overlay = true;
      }
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(",", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    addItem() {
      if (this.productInput == "") {
        alert("กรุณาใส่รหัสสินค้า");
        return;
      }
      if (parseInt(this.saleQty) <= 0) {
        alert("จำนวนสินค้าไม่ถูกต้อง");
        return;
      }
      let params = {
        product: this.productInput,
        invoice: this.invoiceNo !== "" ? this.invoiceNo : "",
        branch: this.userInfo.shop.shop_code,
      };
      let selectProduct = this.items.find(
        (ele) => ele.barcode == params.product || ele.barcode == params.product
      );
      if (selectProduct) {
        selectProduct.saleQty =
          parseInt(selectProduct.saleQty) + parseInt(this.saleQty);
        params.qty = selectProduct.saleQty;
      } else {
        params.qty = this.saleQty;
      }

      var qs = queryString.stringify(params);
      console.log(qs);
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
              if (this.items.length !== 0) {
                let selectProduct = this.items.find(
                  (ele) =>
                    ele.barcode == params.product ||
                    ele.barcode == params.product
                );
                if (selectProduct) {
                  let qty = parseInt(selectProduct.saleQty);
                  if (parseInt(this.saleQty) <= 0) {
                    alert("จำนวนสินค้าไม่ถูกต้อง");
                  } else {
                    // selectProduct.saleQty = qty + parseInt(this.saleQty);
                    selectProduct.total =
                      parseInt(selectProduct.price) *
                      parseInt(selectProduct.saleQty);
                    selectProduct.point = 0;
                  }
                } else {
                  this.items.push({
                    ...product,
                    saleQty: parseInt(this.saleQty),
                    total: parseInt(product.price) * parseInt(this.saleQty),
                    point: 0,
                  });
                }
              } else {
                this.items.push({
                  ...product,
                  saleQty: parseInt(this.saleQty),
                  total: parseInt(product.price) * parseInt(this.saleQty),
                  point: 0,
                });
              }
              this.calSaleTotal();
              this.calPoints();

              this.productInput = "";
              this.saleQty = 1;
              this.$refs.productInput.focus();
              this.currentOrder();
            }
          } else {
            alert("ไม่สามารถค้นหาข้อมูลสินค้านี้ได้ กรุณาติดต่อ....");
            return;
          }
        });
    },
    calSaleTotal() {
      this.saleTotal = 0;
      this.discountTotal = 0;
      this.net = 0;
      this.taxTotal = 0;

      this.items.forEach((e) => {
        this.taxTotal += parseInt(e.total) * (parseInt(e.tax) / 100);
        this.saleTotal += parseInt(e.total);
        // this.discountTotal += parseInt(e.discount);
      });
      this.net = this.saleTotal;
      //   this.net = this.saleTotal - this.discountTotal;
    },
    calPoints() {
      this.points = 0;
      this.pointsUsed = 0;

      this.items.forEach((e) => {
        this.points += parseInt(e.point);
      });
      this.redeemPoints();
    },
    redeemPoints() {
      this.pointsNet = this.points - this.pointsUsed;
    },
    deleteItem(item, index, event) {
      this.itemIndex = this.items.indexOf(item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.items.splice(this.itemIndex, 1);

      this.currentOrder();
      this.calSaleTotal();
      this.closeDelete();
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    generateNewInvoice() {
      let generateInvNo = "" + (Math.floor(Math.random() * 10000) + 1);
      let tempInvoiceNo =
        "INV" +
        generateInvNo.padStart(5, "0") +
        dayjs().format("YYYYMMDDhhmmss");

      let checkInvoice = this.$store.state.listInvoice.find(
        (ele) => ele.invoiceNo == tempInvoiceNo
      );

      if (checkInvoice) {
        this.generateNewInvoice();
      } else {
        this.invoiceNo = tempInvoiceNo;
      }
    },
    currentOrder() {
      let data = {
        invoiceNo: this.invoiceNo,
        userInfo: this.empSaleInfo,
        memberInfo: this.memberInfo,
        orderInfo: this.items,
        points: this.points,
        pointsUsed: this.pointsUsed,
        pointsNet: this.pointsNet,
        timeRecord: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      };
      this.$store.commit("currentOrder", JSON.stringify(data));
    },
    showPayment() {
      if (this.items.length == 0) {
        alert("ไม่มีรายการสินค้า");
      } else {
        this.dialogConfirmInvoice = true;
      }
    },
    pauseOrder() {
      if (this.items.length == 0) {
        alert("ไม่มีรายการซื้อสินค้า");
      } else {
        let order = {
          invoiceNo: this.invoiceNo,
          userInfo: this.empSaleInfo,
          memberInfo: this.memberInfo,
          orderInfo: this.items,
          points: this.points,
          pointsUsed: this.pointsUsed,
          pointsNet: this.pointsNet,
          timeRecord: dayjs().format("YYYY-MM-DD HH:mm:ss"),
          status: "hold",
        };

        if (this.$store.state.lastOrder.length > 0) {
          let selectOrder = this.$store.state.lastOrder.find(
            (ele) => ele.invoiceNo == this.invoiceNo
          );
          if (selectOrder) {
            selectOrder.orderInfo = this.items;
          } else {
            this.$store.state.lastOrder.push(order);
            this.$store.commit("lastOrder", this.$store.state.lastOrder);
          }
        } else {
          this.$store.state.lastOrder.push(order);
          this.$store.commit("lastOrder", this.$store.state.lastOrder);
        }

        this.items = [];
        this.memberInfo = {};
        this.empSaleInfo = {};

        this.points = 0;
        this.pointsUsed = 0;
        this.pointsNet = 0;

        this.saleTotal = 0;
        this.discountTotal = 0;
        this.net = 0;

        this.$store.commit("currentOrder", null);
        this.generateNewInvoice();
      }
    },
    onRowSelected(items) {
      this.selectedRework = items;
    },
    deletePauseInvoice(item, index, event) {
      this.dialogCancelInvoicePauseOrder = true;
      this.selectCancelInvoiceIndex = this.$store.state.lastOrder.indexOf(item);
    },
    closeDialogCancelInvoicePauseOrder() {
      this.dialogCancelInvoicePauseOrder = false;
    },
    confirmCancelInvoicePauseOrder() {
      var selectedIndex = this.$store.state.lastOrder.indexOf(
        this.selectCancelInvoiceIndex
      );
      this.$store.state.lastOrder.splice(selectedIndex, 1);

      this.$store.commit("lastOrder", this.$store.state.lastOrder);

      if (this.selectedRework.length !== 0) {
        this.dialogLastOrder = false;
      } else {
        this.reworkOrder();
      }

      this.dialogCancelInvoicePauseOrder = false;
    },
    reworkOrder() {
      if (this.items.length !== 0) {
        alert(
          "ไม่สามารถเลือกรายการที่ค้างมาทำรายการได้ในขณะนี้, กรุณาทำรายการปัจจุบันให้สำเร็จก่อน"
        );
      } else {
        if (this.$store.state.lastOrder.length == 0) {
          alert("ไม่มีรายการค้างอยู่");
        } else {
          if (this.$store.state.lastOrder.length == 1) {
            this.invoiceNo = this.$store.state.lastOrder[0].invoiceNo;
            this.items = this.$store.state.lastOrder[0].orderInfo;
            this.memberInfo = this.$store.state.lastOrder[0].memberInfo;
            this.points = this.$store.state.lastOrder[0].points;
            this.pointsNet = this.$store.state.lastOrder[0].pointsNet;
            this.pointsUsed = this.$store.state.lastOrder[0].pointsUsed;
            this.empSaleInfo = this.$store.state.lastOrder[0].userInfo;

            this.currentOrder();
            var selectedIndex = this.$store.state.lastOrder.indexOf(
              this.$store.state.lastOrder[0]
            );
            this.$store.state.lastOrder.splice(selectedIndex, 1);

            this.$store.commit("lastOrder", this.$store.state.lastOrder);
          } else {
            this.dialogLastOrder = true;
          }

          this.calSaleTotal();
          this.calPoints();
        }
      }
    },
    confirmLastOrder() {
      this.invoiceNo = this.selectedRework[0].invoiceNo;
      this.items = this.selectedRework[0].orderInfo;
      this.memberInfo = this.selectedRework[0].memberInfo;
      this.points = this.selectedRework[0].points;
      this.pointsNet = this.selectedRework[0].pointsNet;
      this.pointsUsed = this.selectedRework[0].pointsUsed;
      this.empSaleInfo = this.selectedRework[0].userInfo;

      this.calSaleTotal();
      this.calPoints();
      var selectedIndex = this.$store.state.lastOrder.indexOf(
        this.selectedRework[0]
      );
      this.$store.state.lastOrder.splice(selectedIndex, 1);

      this.$store.commit("lastOrder", this.$store.state.lastOrder);
      this.dialogLastOrder = false;

      this.currentOrder();
    },
    cancelOrder() {
      this.dialogCancelOrder = true;
    },
    confirmCancelOrder() {
      this.items = [];
      this.pointsUsed = 0;
      this.empSaleInfo = {};

      this.calSaleTotal();
      this.calPoints();
      this.redeemPoints();
      this.dialogCancelOrder = false;
    },
    closeDialogCancelOrder() {
      this.dialogCancelOrder = false;
    },
    closeDialogLastOrder() {
      this.dialogLastOrder = false;
    },
    saveOrder() {
      if (this.userInfo == "") {
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
      } else if (this.items.length == 0) {
        alert("ไม่พบข้อมูล, รายการซื้อสินค้า");
      } else if (this.paymentMethod == undefined) {
        alert("ไม่พบข้อมูลวิธีการชำระเงิน");
      } else if (
        this.paymentMethod == "cash" &&
        (this.cashIn == 0 || this.cashIn == "")
      ) {
        alert("กรุณาใส่จำนวนรับเงิน ให้ถูกต้อง");
      } else {
        let billOrder = {
          invoiceNo: this.invoiceNo,
          orderDate: dayjs(this.saleDate).format("YYYY-MM-DD HH:mm:ss"),
          userInfo: this.empSaleInfo,
          memberInfo:
            Object.keys(this.memberInfo).length === 0
              ? "Walk-in customer"
              : this.memberInfo,
          orderInfo: this.items,
          qty: this.items.length,
          paymentMethod: this.paymentMethod,
          amount: this.saleTotal,
          discountTotal: this.discountTotal,
          net: this.net,
          received: this.paymentMethod == "cash" ? this.cashIn : this.net,
          change: this.paymentMethod == "cash" ? this.cashIn - this.net : 0,
          points: this.points,
          pointsUsed: this.pointsUsed,
          pointsNet: this.pointsNet,
          remark: this.remark,
          createdAt: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        };

        if (this.$store.state.listInvoice.length !== 0) {
          this.$store.state.listInvoice.push(billOrder);
          this.$store.commit("addListInvoice", this.$store.state.listInvoice);
        } else {
          this.listInvoice.push(billOrder);
          this.$store.commit("addListInvoice", this.listInvoice);
        }

        this.items = [];
        this.memberInfo = {};

        this.points = 0;
        this.pointsUsed = 0;
        this.pointsNet = 0;

        this.saleTotal = 0;
        this.discountTotal = 0;
        this.net = 0;

        this.cashIn = 0;

        this.$store.commit("currentOrder", null);
        this.dialogConfirmInvoice = false;
        this.generateNewInvoice();
      }
    },
    closePosDialog() {
      this.dialog = false;
      this.overlay = false;
    },
    getMemberInfo() {
      this.dialogConfirmEmp = true;
      if (this.memberInfo.memberId.trim() == "") {
        // this.memberInfo = {};
        this.memberInfo.memberType = "Walk-In Customer";
      } else {
        this.memberInfo = {
            "member_no": "IDX7250157688",
            "qty": "0.00",
            "amt": "0.00",
            "net": "0.00",
            "apply_date": "2014-06-21",
            "expire_date": "2100-12-31",
            "age_card": "4",
            "status": "0",
            "mem_status": "N",
            "forgot_card": "",
            "vip": "0",
            "email": "",
            "prefix_en": "Miss",
            "fname_en": "Thunchanok",
            "lname_en": "Krittayachaiwat",
            "area": "",
            "region_id": "0",
            "cust_day": "OPS4",
            "brand_id": "0",
            "cardtype_id": "0",
            "application_id": "REID",
            "customer_id": "13",
            "mobile_no": "0851512954",
            "id_card": "3101800738173",
            "prefix": "น.ส.",
            "name": "ธันย์ชนก",
            "surname": "กฤตยาไชยวัฒน",
            "sex": "2",
            "address": "357",
            "road": "",
            "province_name": "กรุงเทพมหานคร",
            "district": "คลองเตย",
            "sub_district": "คลองตัน",
            "zip": "10600",
            "birthday": "1971-07-05",
            "shop": "7467",
            "doc_no": "",
            "doc_dt": "1900-01-01",
            "send_company": "",
            "send_address": "357",
            "send_mu": "0",
            "send_home_name": "",
            "send_soi": "",
            "send_road": "",
            "send_tambon_id": "103302",
            "send_tambon_name": "คลองตัน",
            "send_amphur_id": "1033",
            "send_amphur_name": "คลองเตย",
            "send_province_id": "1",
            "send_province_name": "กรุงเทพมหานคร",
            "send_postcode": "10600",
            "send_tel": "",
            "send_mobile": "",
            "send_fax": "",
            "send_remark": "",
            "card_level": "White",
            "ops": "OPS4"
          }
      }
    },
    getProvinces() {
      this.provincesOptions = [];
      axios
        .get(this.url + "/province", this.configHeader)
        .then((res) => {
          for (let e of res.data.province) {
            let data = {};
            data.id = e.id;
            data.value = e;
            data.text = e.name_in_thai;

            this.provincesOptions.push(data);
          }

          if (this.formRegister.provinceId !== "") {
            let checkProvince = this.provincesOptions.find(
              (ele) => ele.id == this.formRegister.provinceId
            );
            if (checkProvince !== undefined) {
              this.selectedProvince = checkProvince.value;
              this.getDistricts();
            }
          }
        })
        .catch((err) => {
          console.log("get province", err);
        });
    },
    getDistricts() {
      this.districtsOptions = [];
      let params = {
        id: this.selectedProvince.id,
      };
      if (this.selectedProvince.id !== this.formRegister.provinceId) {
        this.formRegister.districtId = "";
        this.formRegister.district = "";
        this.formRegister.subDistrictId = "";
        this.formRegister.subDistrict = "";

        this.selectedSubDistrict = {};
        this.selectedDistrict = {};
      }
      var qs = queryString.stringify(params);
      axios
        .post(this.url + "/province/getdistricts", qs, this.configHeader)
        .then((res) => {
          for (let e of res.data.districts) {
            let data = {};
            data.id = e.id;
            data.value = e;
            data.text = e.name_in_thai;

            this.districtsOptions.push(data);
          }
          if (this.formRegister.districtId !== "") {
            let checkDistrict = this.districtsOptions.find(
              (ele) => ele.id == this.formRegister.districtId
            );
            if (checkDistrict !== undefined) {
              this.selectedDistrict = checkDistrict.value;
              this.getSubDistricts();
            }
          }
        })
        .catch((err) => {
          console.log("get districts", err);
        });
    },
    getSubDistricts() {
      this.subdistrictsOptions = [];
      let params = {
        id: this.selectedDistrict.id,
      };
      if (this.selectedDistrict.id !== this.formRegister.districtId) {
        this.formRegister.subDistrictId = "";
        this.formRegister.subDistrict = "";

        this.selectedSubDistrict = {};
      }
      var qs = queryString.stringify(params);
      axios
        .post(this.url + "/province/getsubdistricts", qs, this.configHeader)
        .then((res) => {
          for (let e of res.data.subdistricts) {
            let data = {};
            data.id = e.id;
            data.value = e;
            data.text = e.name_in_thai;

            this.subdistrictsOptions.push(data);
          }
          if (this.formRegister.subDistrictId !== "") {
            let checkSubDistrict = this.subdistrictsOptions.find(
              (ele) => ele.id == this.formRegister.subDistrictId
            );
            if (checkSubDistrict !== undefined) {
              this.selectedSubDistrict = checkSubDistrict.value;
            }
          }
        })
        .catch((err) => {
          console.log("get sub districts", err);
        });
    },
    getZipcode() {
      this.formRegister.zipcode = this.selectedSubDistrict.zip_code;
    },
    getEmpInfo() {
      this.empSaleInfo = this.userInfo.data;
      this.dialogConfirmEmp = false;
    },
    saveFormRegister() {
      var valid = true;
      var regexPhone = /^0\d{9}$/;

      valid = this.isValidation(this.formRegister, "firstName", valid);
      valid = this.isValidation(this.formRegister, "lastName", valid);
      valid = this.isValidation(this.formRegister, "firstNameEng", valid);
      valid = this.isValidation(this.formRegister, "lastNameEng", valid);
      valid = this.isValidation(this.formRegister, "cardId", valid);
      valid = this.isValidation(this.formRegister, "phone", valid);
      valid = this.isValidation(this.formRegister, "address", valid);
      valid = this.isValidation(this.formRegister, "zipcode", valid);
      valid = this.isValidation(this.formRegister, "birthday", valid);
      valid = this.isValidation(this.formRegister, "email", valid);

      valid = this.isValidation(this.selectedSubDistrict, "id", valid);
      valid = this.isValidation(this.selectedSubDistrict, "name_in_thai", valid);
      valid = this.isValidation(this.selectedDistrict, "id", valid);
      valid = this.isValidation(this.selectedDistrict, "name_in_thai", valid);
      valid = this.isValidation(this.selectedProvince, "id", valid);
      valid = this.isValidation(this.selectedProvince, "name_in_thai", valid);

      if (this.formRegister.phone.match(regexPhone) === null) {
        valid = false;
      }
      if (this.checkEmail(this.formRegister.email) === null) {
        valid = false;
      }
      // if(dayjs().diff(dayjs(this.formRegister.birthday), 'year') < 18) {
      //     valid = false;
      // }

      if (!valid) {
        alert("กรุณาใส่ข้อมูลให้ครบถ้วน");
        return;
      } else {
        let validCardID = this.checkID(this.formRegister.cardId);
        if (!validCardID) {
          alert("กรุณาใส่ข้อมูลบัตรปชช. ให้ถูกต้อง");
          return;
        } else {
          if (this.actionForm == "add") {
            this.formRegister.memberId = "M" + (this.listMember.length + 1);
            this.formRegister.registerDate = dayjs().format("YYYY-MM-DD");
          } else {
            let memberInfo = this.listMember.find(
              (ele) => ele.memberId == this.formRegister.memberId
            );
            let memberIndex = this.listMember.indexOf(memberInfo);
            if (memberIndex !== -1) {
              this.listMember.splice(memberIndex, 1);
            }
          }

          this.formRegister.subDistrictId = this.selectedSubDistrict.id;
          this.formRegister.subDistrict = this.selectedSubDistrict.name_in_thai;
          this.formRegister.districtId = this.selectedDistrict.id;
          this.formRegister.district = this.selectedDistrict.name_in_thai;
          this.formRegister.provinceId = this.selectedProvince.id;
          this.formRegister.province = this.selectedProvince.name_in_thai;

          this.listMember.push(this.formRegister);
          this.$store.commit("addListMember", this.listMember);

          this.clearFormRegister();
          this.dialogRegister = false;
          this.overlayRegister = false;
        }
      }
    },
    clearFormRegister() {
      this.formRegister = {
        firstName: "",
        lastName: "",
        firstNameEng: "",
        lastNameEng: "",
        cardId: "",
        phone: "",
        address: "",
        subDistrictId: "",
        subDistrict: "",
        districtId: "",
        district: "",
        provinceId: "",
        province: "",
        zipcode: "",
        type: "",
        birthday: "",
        email: "",
      };
      this.selectedSubDistrict = {};
      this.selectedDistrict = {};
      this.selectedProvince = {};
    },
    openDialog(action) {
      this.overlayRegister = true;
      this.dialogRegister = true;
      if (action == "add") {
        this.clearFormRegister();
        this.getProvinces();
      }
      this.actionForm = action;
    },
    validation(value) {
      if (value == 0) {
        return null;
      }
      return parseInt(value) < 0 ? false : true;
    },
    clearCashierForm() {
      this.formCashier = {
        thousand: 0,
        fiveHundred: 0,
        oneHundred: 0,
        fifty: 0,
        twenty: 0,
        ten: 0,
        five: 0,
        two: 0,
        one: 0,
        fiftyCent: 0,
        twentyFiveCent: 0,
      };
    },
    saveFormCashier() {
      var valid = true;
      for (const [key, value] of Object.entries(this.formCashier)) {
        if (value < 0) {
          valid = false;
        }
      }
      if (!valid) {
        alert("กรุณาใส่จำนวนเงินใน cashier ให้ถูกต้อง");
      } else {
        this.$store.commit("saveCashierBillInfo", this.formCashier);
        this.dialogCashier = false;
        this.overlayCashier = false;
        this.checkCashier();
      }
    },
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if (keyCode < 48 || keyCode > 57) {
        $event.preventDefault();
      }
    },
    inputCheckFormatName($event) {
      var keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if (!(keyCode < 48 || keyCode > 57)) {
        $event.preventDefault();
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
    checkEmail(email) {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    },
    checkID(id) {
      let sum = 0;
      if (id.length != 13) return false;
      for (let i = 0; i < 12; i++) sum += parseFloat(id.charAt(i)) * (13 - i);
      if ((11 - (sum % 11)) % 10 != parseFloat(id.charAt(12))) return false;
      return true;
    },
    openPanelFunction() {
      // console.log(this.panel);
      if(this.panel.length !== 0) {
        this.panel.shift();
      }
      console.log(this.panel);
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
  /* display: flex; */
  height: 60%;
  overflow-y: scroll;
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
