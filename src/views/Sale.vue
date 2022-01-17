<template>
  <div>
    <b-card>
      <b-tabs content-class="mt-3">
        <b-tab v-if="listMenu.find(name => name=='Sale')" title="Sale" active>
          <v-btn color="primary" @click.prevent="overlay = true, dialog = true">เปิดบิล+</v-btn>
          <v-btn color="primary" @click.prevent="overlayCashier = true, dialogCashier = true">เงินหน้าร้าน</v-btn>

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
                            v-model="productInput"
                            ref="productInput"
                            @change="addItem()"
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
                        <template #cell(pricePerItem)="row">
                          {{ formatPrice(row.item.pricePerItem) }}
                        </template>
                        <template #cell(total)="row">
                          {{ formatPrice(row.item.total) }}
                        </template>
                        <template #cell(actions)="row">
                          <b-button
                            size="sm"
                            @click="
                              deleteItem(
                                row.item,
                                row.index,
                                $event.target
                              )
                            "
                            class="mr-1"
                            ><v-icon small>mdi-delete</v-icon></b-button
                          >
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
                          <b-row
                            style="margin-left: 0px; margin-right: 0px"
                          >
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
                    <v-expansion-panels>
                      <v-expansion-panel>
                        <v-expansion-panel-header class="font-16">
                          ข้อมูลสมาชิก
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                          <v-col cols="12" sm="12" md="12">
                            <v-text-field
                              v-model="memberInfo.memberName"
                              class="font-16"
                              label="ชื่อสมาชิก"
                              dense
                              readonly
                            >
                            </v-text-field>
                          </v-col>

                          <v-col cols="12" sm="12" md="12">
                            <v-text-field
                              v-model="memberInfo.registerDate"
                              class="font-16"
                              label="วันสมัคร"
                              dense
                              readonly
                            >
                            </v-text-field>
                          </v-col>

                          <v-col cols="12" sm="12" md="12">
                            <v-text-field
                              v-model="memberInfo.expiredDate"
                              class="font-16"
                              label="วันหมดอายุ"
                              dense
                              readonly
                            >
                            </v-text-field>
                          </v-col>

                          <v-col cols="12" sm="12" md="12">
                            <v-text-field
                              v-model="memberInfo.birthdayDate"
                              class="font-16"
                              label="วันเกิด"
                              dense
                              readonly
                            >
                            </v-text-field>
                          </v-col>

                          <v-col cols="12" sm="12" md="12">
                            <v-text-field
                              v-model="memberInfo.opsDate"
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
                              v-model="memberInfo.memberAddress"
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
          <v-dialog
            v-model="dialogLastOrder"
            persistent
            max-width="500px"
          >
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
                        deletePauseInvoice(
                          row.item,
                          row.index,
                          $event.target
                        )
                      "
                      class="mr-1"
                      ><v-icon small>mdi-delete</v-icon></b-button
                    >
                  </template>
                </b-table>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="closeDialogLastOrder"
                  >Cancel</v-btn
                >
                <v-btn
                  color="blue darken-1"
                  text
                  @click="confirmLastOrder"
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
                <v-btn
                  color="blue darken-1"
                  text
                  @click="deleteItemConfirm()"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog
            v-model="dialogCancelOrder"
            persistent
            max-width="500px"
          >
            <v-card>
              <v-card-title class="text-h5"
                >ต้องการยกเลิกรายการสินค้าทั้งหมด
                ใช่หรือไม่?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="closeDialogCancelOrder"
                  >Cancel</v-btn
                >
                <v-btn
                  color="blue darken-1"
                  text
                  @click="confirmCancelOrder"
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
                <v-card-title class="text-h5"
                  >สรุปรายการสินค้า</v-card-title
                >
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
                        Sold To:
                        {{
                          Object.keys(this.memberInfo).length === 0
                            ? "Walk-in customer"
                            : memberInfo.memberName
                        }}
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
                              :key="item.productId"
                            >
                              <b-td>{{ item.productId }}</b-td>
                              <b-td>{{ item.productName }}</b-td>
                              <b-td>{{ item.saleQty }}</b-td>
                              <b-td class="text-right">{{
                                item.pricePerItem
                              }}</b-td>
                              <b-td class="text-right">{{
                                item.total
                              }}</b-td>
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
                          ><p>{{ taxsTotal.toFixed(2) }}</p></b-col
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
                            ><v-icon>mdi-credit-card</v-icon>Credit
                            Card</v-btn
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
          <v-dialog v-model="dialogConfirmEmp" persistent max-width="500px">
            <v-card>
              <v-card-title class="text-h5">กรอกรหัสพนักงาน</v-card-title>
              <v-card-text>
                <p>รหัสพนักงาน</p>
                <v-text-field v-model="empSaleInput"></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialogConfirmEmp = false">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click.prevent="getEmpInfo()">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialogCashier" max-width="500px" :retain-focus="false" persistent>
            <v-overlay :absolute="absolute" :value="overlayCashier" responsive>
              <v-card class="mx-auto" max-width="500px" light>
                <v-card-title>
                  <b>Cashier</b>
                  <v-spacer></v-spacer>
                  <v-btn icon @click.prevent="dialogCashier=false, overlayCashier=false"><v-icon>mdi-close</v-icon></v-btn>
                </v-card-title>
                <v-card-subtitle class="pb-0">กรุณากรอกจำนวนเงิน</v-card-subtitle>
                <v-card-text class="text--primary">
                  <v-row>
                      <v-col style="background-color: orange;">
                        <b-form>
                          <label>1000 :</label>
                          <b-form-input size="sm" type="number" :state="validation(formCashier.thousand)" v-model="formCashier.thousand" trim></b-form-input>
                          <label>500 :</label>
                          <b-form-input size="sm" type="number" :state="validation(formCashier.fiveHundred)" v-model="formCashier.fiveHundred"></b-form-input>
                          <label>100 :</label>
                          <b-form-input size="sm" type="number" :state="validation(formCashier.oneHundred)" v-model="formCashier.oneHundred"></b-form-input>
                          <label>50 :</label>
                          <b-form-input size="sm" type="number" :state="validation(formCashier.fifty)" v-model="formCashier.fifty"></b-form-input>
                          <label>20 :</label>
                          <b-form-input size="sm" type="number" :state="validation(formCashier.twenty)" v-model="formCashier.twenty"></b-form-input>
                          <label>10 :</label>
                          <b-form-input size="sm" type="number" :state="validation(formCashier.ten)" v-model="formCashier.ten"></b-form-input>
                          <label>5 :</label>
                          <b-form-input size="sm" type="number" :state="validation(formCashier.five)" v-model="formCashier.five"></b-form-input>
                          <label>2 :</label>
                          <b-form-input size="sm" type="number" :state="validation(formCashier.two)" v-model="formCashier.two"></b-form-input>
                          <label>1 :</label>
                          <b-form-input size="sm" type="number" :state="validation(formCashier.one)" v-model="formCashier.one"></b-form-input>
                          <!-- <label>0.50 :</label>
                          <b-form-input size="sm" type="number" :state="validation(formCashier.fiftyCent)" v-model="formCashier.fiftyCent"></b-form-input>
                          <label>0.25 :</label>
                          <b-form-input size="sm" type="number" :state="validation(formCashier.twentyFiveCent)" v-model="formCashier.twentyFiveCent"></b-form-input> -->
                        </b-form>
                      </v-col>
                      <v-col style="background-color: yellow;">
                        <b-form>
                          <label>1000 :</label>
                          <b-form-input size="sm" type="number" :state="validation(formCashier.thousand)" v-model="formCashier.thousand"></b-form-input>
                          <label>500 :</label>
                          <b-form-input size="sm" type="number" :state="validation(formCashier.fiveHundred)" v-model="formCashier.fiveHundred"></b-form-input>
                          <label>100 :</label>
                          <b-form-input size="sm" type="number" :state="validation(formCashier.oneHundred)" v-model="formCashier.oneHundred"></b-form-input>
                          <label>50 :</label>
                          <b-form-input size="sm" type="number" :state="validation(formCashier.fifty)" v-model="formCashier.fifty"></b-form-input>
                          <label>20 :</label>
                          <b-form-input size="sm" type="number" :state="validation(formCashier.twenty)" v-model="formCashier.twenty"></b-form-input>
                          <label>10 :</label>
                          <b-form-input size="sm" type="number" :state="validation(formCashier.ten)" v-model="formCashier.ten"></b-form-input>
                          <label>5 :</label>
                          <b-form-input size="sm" type="number" :state="validation(formCashier.five)" v-model="formCashier.five"></b-form-input>
                          <label>2 :</label>
                          <b-form-input size="sm" type="number" :state="validation(formCashier.two)" v-model="formCashier.two"></b-form-input>
                          <label>1 :</label>
                          <b-form-input size="sm" type="number" :state="validation(formCashier.one)" v-model="formCashier.one"></b-form-input>
                          <!-- <label>0.50 :</label>
                          <b-form-input size="sm" type="number" :state="validation(formCashier.fiftyCent)" v-model="formCashier.fiftyCent"></b-form-input>
                          <label>0.25 :</label>
                          <b-form-input size="sm" type="number" :state="validation(formCashier.twentyFiveCent)" v-model="formCashier.twentyFiveCent"></b-form-input> -->
                        </b-form>
                      </v-col>
                      <v-col style="background-color: lightgreen;">
                        <b-form>
                          <label>1000 :</label>
                          <b-form-input size="sm" type="number" :state="validation(formCashier.thousand)" v-model="formCashier.thousand"></b-form-input>
                          <label>500 :</label>
                          <b-form-input size="sm" type="number" :state="validation(formCashier.fiveHundred)" v-model="formCashier.fiveHundred"></b-form-input>
                          <label>100 :</label>
                          <b-form-input size="sm" type="number" :state="validation(formCashier.oneHundred)" v-model="formCashier.oneHundred"></b-form-input>
                          <label>50 :</label>
                          <b-form-input size="sm" type="number" :state="validation(formCashier.fifty)" v-model="formCashier.fifty"></b-form-input>
                          <label>20 :</label>
                          <b-form-input size="sm" type="number" :state="validation(formCashier.twenty)" v-model="formCashier.twenty"></b-form-input>
                          <label>10 :</label>
                          <b-form-input size="sm" type="number" :state="validation(formCashier.ten)" v-model="formCashier.ten"></b-form-input>
                          <label>5 :</label>
                          <b-form-input size="sm" type="number" :state="validation(formCashier.five)" v-model="formCashier.five"></b-form-input>
                          <label>2 :</label>
                          <b-form-input size="sm" type="number" :state="validation(formCashier.two)" v-model="formCashier.two"></b-form-input>
                          <label>1 :</label>
                          <b-form-input size="sm" type="number" :state="validation(formCashier.one)" v-model="formCashier.one"></b-form-input>
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
                  <v-btn color="warning" text @click.prevent="clearCashierForm()">Reset</v-btn>
                  <v-btn type="submit" color="success" text @click.prevent="saveFormCashier()">Save</v-btn>
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
// import axios from 'axios';
export default {
  data() {
    return {
      dialog: false,
      absolute: true,
      overlay: false,
      overlayCashier: false,
      search: null,
      searchInvoice: "",
      dialogDelete: false,
      dialogCancelOrder: false,
      dialogLastOrder: false,
      dialogCancelInvoicePauseOrder: false,
      dialogConfirmInvoice: false,
      dialogConfirmEmp: false,
      dialogCashier: false,
      invoiceNo: "",
      pause: false,
      today: dayjs().format("DD-MM-YYYY"),
      saleDate: dayjs().format("YYYY-MM-DD HH:mm"),
      listMenu: [],
      listInvoice: [],
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
      taxs: 0,
      taxsTotal: 0,
      cashIn: 0,
      remark: "",
      selectCancelInvoiceIndex: 0,
      currentItemIndex: 0,
      itemIndex: 0,
      userInfo: {},
      paymentMethod: undefined,
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
        twentyFiveCent: 0
      },
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
      if (this.$store.state.listInvoice !== []) {
        this.listInvoice = this.$store.state.listInvoice;
      }
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

      /* Default User Menu*/
      let userMenu = JSON.parse(this.userInfo.listUserPermission);
      for(let item of userMenu){
          for (const [key, value] of Object.entries(item)) {
              if(key == this.$route.name && item.SubMenu !== undefined) {
                  this.listMenu = item.SubMenu;
              }
          }
      }
      this.listMenu = this.listMenu.length !== 0? this.listMenu: ['Sale'];

      this.generateNewInvoice();
      this.formCashier = this.$store.state.cashierBillInfo == null? this.formCashier: this.$store.state.cashierBillInfo;
    }
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(",", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    addItem() {
      /* TODO: ยิง api เพื่อรับข้อมูลสินค้า */
      let product = {
        productId: this.productInput,
        productName: "Dickerson" + this.productInput,
        pricePerItem: "1000",
        discount: "5",
        point: 10,
        taxs: 7,
      };
      /******************************/
      if (this.items.length !== 0) {
        let selectProduct = this.items.find(
          (ele) => ele.productId == this.productInput
        );
        if (selectProduct) {
          let qty = parseInt(selectProduct.saleQty);
          // qty = this.saleQty == 1 ? qty + 1 : parseInt(this.saleQty);
          if (parseInt(this.saleQty) <= 0) {
            alert("จำนวนสินค้าไม่ถูกต้อง");
          } else {
            selectProduct.saleQty = qty + parseInt(this.saleQty);
            selectProduct.total = parseInt(selectProduct.pricePerItem) * parseInt(selectProduct.saleQty);
          }
        } else {
          this.items.push({
            ...product,
            saleQty: parseInt(this.saleQty),
            total: parseInt(product.pricePerItem) * parseInt(this.saleQty),
            taxs: (parseInt(product.pricePerItem) * parseInt(this.saleQty) * parseInt(product.taxs)) / 100,
          });
        }
      } else {
        this.items.push({
          ...product,
          saleQty: parseInt(this.saleQty),
          total: parseInt(product.pricePerItem) * parseInt(this.saleQty),
          taxs: (parseInt(product.pricePerItem) * parseInt(this.saleQty) * parseInt(product.taxs)) / 100,
        });
      }
      this.calSaleTotal();
      this.calPoints();

      this.productInput = "";
      this.saleQty = 1;
      this.$refs.productInput.focus();
      this.currentOrder();
    },
    calSaleTotal() {
      this.saleTotal = 0;
      this.discountTotal = 0;
      this.net = 0;
      this.taxsTotal = 0;

      this.items.forEach((e) => {
        this.taxsTotal += parseFloat(e.taxs);
        this.saleTotal += parseInt(e.total);
        this.discountTotal += parseInt(e.discount);
      });

      this.net = this.saleTotal - this.discountTotal;
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
      // this.$nextTick(() => {
      //   this.editedItem = Object.assign({}, this.defaultItem);
      //   this.editedIndex = -1;
      // });
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
      this.empSaleInfo ={};

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
          memberInfo: Object.keys(this.memberInfo).length === 0 ? "Walk-in customer" : this.memberInfo,
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
        this.memberInfo = {};
      } else {
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
      }
    },
    getEmpInfo() {
      this.empSaleInfo = {
        "id": this.empSaleInput,
        "username": "Admin",
        "roles": "Admin",
        "fing_path": "fing_path",
        "numoffice_d": "123456",
        "emp_name": "admin",
        "emp_surname": "suername",
        "emp_name_e": "emp_name_e",
        "emp_surname_e": "emp_surname_e",
        "img_profile": "img_profile.jpg",
        "card_id": "1010121210123",
        "emp_status": 1,
        "regis_date": "2022-01-13",
        "regis_time": "09:50:15",
        "start_date": "2022-01-13",
        "start_time": "09:50:15",
        "end_date": "2022-01-13",
        "end_time": "09:50:15",
        "reg_user": "system"
      };
      this.dialogConfirmEmp = false;
    },
    validation(value) {
      if(value == 0) {
        return null;
      }
      return parseInt(value) < 0? false: true;
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
        twentyFiveCent: 0
      };
    },
    saveFormCashier() {
      var valid = true;
      for (const [key, value] of Object.entries(this.formCashier)) {
          if(value < 0) {
              valid = false;
          }
      }
      if(!valid) {
          alert("กรุณาใส่จำนวนเงินใน cashier ให้ถูกต้อง");
      } else {
        this.$store.commit("saveCashierBillInfo", this.formCashier);
        this.dialogCashier=false; 
        this.overlayCashier=false;
      }
    }
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
