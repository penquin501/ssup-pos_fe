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
                <!-- <v-row v-if="memberInfo.name !== '' && memberInfo.type !== ''">
                  <strong>{{ memberInfo.type }}</strong>
                </v-row> -->
                <v-row v-if="memberInfo.name == 'Walk-In Customer'">
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
            <!-- TODO: Deciding where it live -->
            <!-- <v-row>
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
            </v-row> -->
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="ml-5 mr-5">
            <v-row>
              <v-col md="4"
                ><label
                  style="font-size: 24px"
                  v-if="Object.keys(billType).length !== 0"
                  ><strong
                    >({{ billType.status_no }})
                    {{ billType.description }}</strong
                  ></label
                ></v-col
              >
              <v-col md="8"> </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-data-table
            height="350px"
            item-key="product_id"
            :headers="headers"
            :items="items"
            dense
            show-select
            style="background-color: #f5f5f5"
            v-model="selectedItems"
          >
            <template v-slot:top>
              <v-toolbar flat style="background-color: #f5f5f5">
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
              </v-toolbar>
            </template>
            <template v-slot:header.data-table-select="{ on, props }">
              <v-checkbox
                dense
                v-model="isAllChecked"
                @click.prevent="allClicked(isAllChecked)"
              ></v-checkbox>
            </template>
            <template v-slot:body="{ items, index }">
              <tr
                v-for="item in items"
                :key="item.id"
                :style="{ color: item.color, fontSize: '14px' }"
              >
                <td class="pl-4 text-center">
                  <v-checkbox
                    dense
                    v-model="selectedItems"
                    :value="item"
                    @click.prevent="rowClicked()"
                  ></v-checkbox>
                </td>
                <td class="text-center">{{ item.id }}</td>
                <td class="pa-0 text-center">{{ item.promotion_code }}</td>
                <td class="pa-0 text-center">{{ item.product_id }}</td>
                <td class="pa-0">{{ item.product_name }}</td>
                <td class="pa-0 text-right">{{ item.quantity }}</td>
                <td class="pa-0 text-right">{{ formatPrice(item.price) }}</td>
                <td class="pa-0 text-right">{{ formatPrice(item.total) }}</td>
                <td class="pa-0 text-right">
                  {{ formatPrice(item.discount) }}
                </td>
                <td class="pa-0 text-right">{{ formatPrice(item.net) }}</td>
              </tr>
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
                    <v-col md="5" class="text-right">{{
                      $store.state.currentOrder == null
                        ? 0
                        : $store.state.currentOrder.main_temp[0].point_before
                    }}</v-col>
                    <v-col md="2">pt</v-col>
                  </v-row>
                  <v-row>
                    <v-col md="5">Point Used:</v-col>
                    <v-col md="5" class="text-right">{{
                      selectedRedeemPoint == false
                        ? 0
                        : $store.state.currentOrder == null
                        ? 0
                        : $store.state.currentOrder.main_temp[0].total / 100
                    }}</v-col>
                    <v-col md="2">pt</v-col>
                  </v-row>
                  <v-row>
                    <v-col md="5">Point Total:</v-col>
                    <v-col md="5" class="text-right">{{
                      selectedRedeemPoint == false
                        ? 0
                        : $store.state.currentOrder == null
                        ? 0
                        : $store.state.currentOrder.main_temp[0].point_before -
                          $store.state.currentOrder.main_temp[0].total / 100
                    }}</v-col>
                    <v-col md="2">pt</v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-row style="background-color: white">
                <v-col>
                  <v-row>
                    <v-col md="6">Sub Total:</v-col>
                    <v-col md="4" class="text-right">
                      {{
                        $store.state.currentOrder == null
                          ? formatPrice(0)
                          : formatPrice(
                              $store.state.currentOrder.main_temp[0].sub_total
                            )
                      }}
                    </v-col>
                    <v-col md="2"></v-col>
                  </v-row>
                  <v-row>
                    <v-col md="6">Discount:</v-col>
                    <v-col md="4" class="text-right">{{
                      formatPrice(
                        $store.state.currentOrder == null
                          ? formatPrice(0)
                          : $store.state.currentOrder.main_temp[0]
                              .total_discount
                      )
                    }}</v-col>
                    <v-col md="2"></v-col>
                  </v-row>
                  <v-row>
                    <v-col md="6">VAT:</v-col>
                    <v-col md="4" class="text-right">{{
                      formatPrice(
                        $store.state.currentOrder == null
                          ? formatPrice(0)
                          : $store.state.currentOrder.main_temp[0].total_tax
                      )
                    }}</v-col>
                    <v-col md="2"></v-col>
                  </v-row>
                  <v-row>
                    <v-col md="6">Total:</v-col>
                    <v-col class="text-center"
                      ><div style="font-size: 48px">
                        {{
                          formatPrice(
                            $store.state.currentOrder == null
                              ? formatPrice(0)
                              : $store.state.currentOrder.main_temp[0].net
                          )
                        }}
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
                  <v-btn
                    color="success"
                    block
                    @click.prevent="openDialogPayment()"
                    ><v-icon>fa fa-money</v-icon>Pay</v-btn
                  >
                </v-col>
              </v-row>
              <v-row>
                <v-col md="6">
                  <v-btn
                    color="warning"
                    class="form-control"
                    @click.prevent="pause()"
                    ><v-icon>mdi-pause</v-icon>Pause</v-btn
                  >
                </v-col>
                <v-col md="6">
                  <v-btn
                    color="secondary"
                    class="form-control"
                    @click.prevent="rework()"
                    ><v-icon>mdi-paperclip</v-icon>Re work</v-btn
                  >
                </v-col>
              </v-row>
              <v-row>
                <v-col md="6">
                  <v-btn
                    color="primary"
                    class="form-control"
                    @click.prevent="resetNewBill()"
                    ><v-icon>mdi-file-plus</v-icon>New Bill</v-btn
                  >
                </v-col>
                <v-col md="6">
                  <v-btn
                    color="error"
                    class="form-control"
                    @click.prevent="checkSelectedItem()"
                    ><v-icon>fa fa-trash-o</v-icon>Delete</v-btn
                  >
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn color="#FFFF8D" block @click.prevent="refresh()"
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
        <v-card-title class="text-h5">ต้องการลบรายการ ใช่หรือไม่?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click.prevent="closeDialogDelete()"
            >Cancel</v-btn
          >
          <v-btn color="blue darken-1" text @click.prevent="confirmDeleteItem()"
            >OK</v-btn
          >
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

    <v-dialog v-model="dialogPayment" max-width="550px;" persistent>
      <v-card style="width: 80vw; background-color: #649893">
        <v-card-title class="text-h5 pb-0">
          Pay
          <v-spacer></v-spacer>
          <v-icon @click.prevent="dialogPayment = false"
            >mdi-close</v-icon
          ></v-card-title
        >
        <v-card-subtitle class="mt-2 pb-1">
          <v-btn x-small @click.prevent="dialogPreview = true">preview</v-btn>
        </v-card-subtitle>
        <SalePay />
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogPreview" max-width="550px;" persistent>
      <v-card style="width: 50vw">
        <v-card-title class="text-h5">
          Sale Details
          <v-spacer></v-spacer>
          <v-icon @click.prevent="dialogPreview = false"
            >mdi-close</v-icon
          ></v-card-title
        >
        <v-card-text>
          <v-row>
            <p><b>Date:</b> {{ userInfo.doc_date }}</p>
            <p>Sales Receipt</p>
            <p>
              <b>Sold By:</b> {{ empInfo.name }}
              {{ empInfo.surname }}
            </p>
            <p>
              <b>Sold To:</b>
              {{ memberInfo.name }}
            </p>
          </v-row>
          <v-row>
            <v-data-table
              dense
              :headers="headersReceipt"
              :items="items"
              item-key="id"
              height="300"
              :items-per-page="items.length"
              hide-default-footer
              :disable-sort="disableSort"
            >
              <template v-slot:item.product_name="{ item, index }">
                <td class="text-left pa-0" style="font-size: 13px">
                  {{ index + 1 }}. {{ item.product_name }}
                </td>
              </template>
              <template v-slot:item.quantity="{ item, index }">
                <td class="text-right pa-0" style="font-size: 13px">
                  {{ item.quantity }}
                </td>
              </template>
              <template v-slot:item.price="{ item, index }">
                <td class="text-right pa-0" style="font-size: 13px">
                  {{ formatPrice(item.price) }}
                </td>
              </template>
              <template v-slot:item.total="{ item, index }">
                <td class="text-right pa-0" style="font-size: 13px">
                  {{ formatPrice(item.total) }}
                </td>
              </template>
              <template v-slot:item.discount="{ item, index }">
                <td class="text-right pa-0" style="font-size: 13px">
                  {{ formatPrice(item.discount) }}
                </td>
              </template>
              <template v-slot:item.net="{ item, index }">
                <td class="text-right pa-0" style="font-size: 13px">
                  {{ formatPrice(item.net) }}
                </td>
              </template>
            </v-data-table>
          </v-row>
          <v-row>
            <v-col
              md="12"
              lg="12"
              class="text-center pt-2 pb-10 pr-5 pl-5"
              style="border-top: 1.5px dashed black; font-size: 16px"
            >
              <v-row>สินค้าทั้งหมด: {{ items.length }} รายการ</v-row>
              <v-row>
                <v-col md="3" class="text-right pb-0">คะแนนที่ได้รับ:</v-col>
                <v-col md="3" class="pb-0">{{
                  $store.state.currentOrder == null
                    ? 0
                    : $store.state.currentOrder.main_temp[0].point_before
                }}</v-col>
                <v-col md="3" class="text-right pb-0">รวมเงิน:</v-col>
                <v-col md="3" class="text-right pb-0">{{
                  $store.state.currentOrder == null
                    ? formatPrice(0)
                    : formatPrice($store.state.currentOrder.main_temp[0].total)
                }}</v-col>
              </v-row>
              <v-row>
                <v-col md="3" class="text-right pb-0">คะแนนที่ใช้:</v-col>
                <v-col md="3" class="pb-0">{{
                  selectedRedeemPoint == false
                    ? 0
                    : $store.state.currentOrder == null
                    ? 0
                    : $store.state.currentOrder.main_temp[0].total / 100
                }}</v-col>
                <v-col md="3" class="text-right pb-0">ส่วนลด:</v-col>
                <v-col md="3" class="text-right pb-0">{{
                  formatPrice(
                    $store.state.currentOrder == null
                      ? formatPrice(0)
                      : $store.state.currentOrder.main_temp[0].total_discount
                  )
                }}</v-col>
              </v-row>
              <v-row>
                <v-col md="3" class="text-right pb-0">คะแนนสุทธิ:</v-col>
                <v-col md="3" class="pb-0">{{
                  selectedRedeemPoint == false
                    ? 0
                    : $store.state.currentOrder == null
                    ? 0
                    : $store.state.currentOrder.main_temp[0].point_before -
                      $store.state.currentOrder.main_temp[0].total / 100
                }}</v-col>
                <v-col md="3" class="text-right pb-0">สุทธิ:</v-col>
                <v-col md="3" class="text-right pb-0">{{
                  formatPrice(
                    $store.state.currentOrder == null
                      ? formatPrice(0)
                      : $store.state.currentOrder.main_temp[0].net
                  )
                }}</v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import dayjs from "dayjs";
import axios from "axios";

import SaleOthers from "@/views/Sale/Sale-Other.vue";
import SalePay from "@/views/Sale/Sale-Pay.vue";

export default {
  components: {
    SaleOthers,
    SalePay,
  },
  data() {
    return {
      panel: [0],
      disableSort: false,
      userInfo: "",
      docDate: "",
      selectedRedeemPoint: false,
      active: false,
      inputMemberCode: "",
      inputMemberCodeByType: "",
      absolute: true,
      opacity: 1,
      overlayScanIdCard: false,
      progressing: 0,
      dialogDelete: false,
      dialogTaxInvoiceInfo: false,
      dialogListChannel: false,
      dialogMenuOther: false,
      dialogCheckMember: false,
      dialogScanMember: false,
      dialogPayment: false,
      dialogPreview: false,
      search: "",
      qty: 1,
      checkTaxInvoiceInfo: false,
      isAllChecked: false,
      selectedPayPromotion: "1",
      selectedScan: {},
      selectChannelIndex: "",
      selectColor: "",
      customerInfo: {},
      empInfo: {
        emp_id: "",
        name: "",
        surname: "",
      },
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
      statusNo: "",
      billType: {},
      headers: [
        {
          text: "#",
          align: "start",
          sortable: false,
          value: "index",
        },
        { text: "Promotion", value: "promotion_code", align: "center" },
        { text: "Product", value: "product_id", align: "center" },
        { text: "Detail", value: "product_name", align: "center" },
        { text: "Qty", value: "qty", align: "end" },
        { text: "Price", value: "price", align: "end" },
        { text: "Total", value: "total", align: "end" },
        { text: "Discount", value: "discount", align: "end" },
        { text: "Net", value: "net", align: "end" },
      ],
      headersReceipt: [
        { text: "Detail", value: "product_name", align: "center" },
        { text: "Qty", value: "quantity", align: "end" },
        { text: "Price", value: "price", align: "end" },
        { text: "Total", value: "total", align: "end" },
        { text: "Discount", value: "discount", align: "end" },
        { text: "Net", value: "net", align: "end" },
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
      // this.openScreen2(); //เปิด screen 2

      if (this.$store.state.currentOrder !== null) {
        // let currentOrder = JSON.parse(this.$store.state.currentOrder);
        let currentOrder = this.$store.state.currentOrder;
        this.invoiceNo = currentOrder.invoice_no_temp;
        this.items = currentOrder.item_temp;
        let id = 0;
        this.items.forEach((e) => {
          e.id = ++id;
        });

        this.memberInfo = currentOrder.memberInfo;
        this.billType = currentOrder.billType;

        if (currentOrder.paymentInfo !== undefined) {
          this.dialogPayment = true;
        }
      }
      this.userInfo = JSON.parse(this.$store.state.userInfo);
      let doc_date = this.userInfo.doc_date;
      if (doc_date !== "" && doc_date !== dayjs().format("YYYY-MM-DD")) {
        alert(
          "วันที่เปิดบิล " +
            doc_date +
            " ไม่ตรงกับวันที่ของระบบ กรุณาตรวจสอบอีกครั้ง"
        );
        this.$store.commit("doLogout", this.userInfo);
      } else {
        this.docDate = dayjs(this.userInfo.doc_date).format("DD-MM-YYYY");
      }

      this.empInfo = {
        emp_id: this.userInfo.data.emp_id,
        name: this.userInfo.data.emp_name,
        surname: this.userInfo.data.emp_surname,
      };
      this.configHeader = {
        headers: { Authorization: `Bearer ${this.userInfo.token}` },
      };

      // this.formCashier = this.$store.state.cashierBillInfo == null ? this.formCashier : this.$store.state.cashierBillInfo;

      // this.defaultMenu();
      // this.checkCashier();
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
      if (
        this.inputMemberCode.trim() == "" &&
        Object.keys(this.selectedScan).length === 0
      ) {
        this.memberInfo.memberId = "00";
        this.memberInfo.name = "Walk-In Customer";
        this.memberInfo.type = "00";
        this.memberInfo.point = 0;
        this.memberInfo.discount = 0;
        this.otherMsg = "";
        this.statusNo = "00";
        this.checkBillType();
      } else {
        let inputCode =
          this.inputMemberCode !== ""
            ? this.inputMemberCode
            : this.inputMemberCodeByType.trim();

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
    checkBillType() {
      let body = {
        brand_id: this.userInfo.data.brand_id,
        status_no: this.statusNo,
      };
      axios
        .post(this.url + "/cart/listbilltype", body, this.configHeader)
        .then((res) => {
          let response = res.data;
          this.billType = response.listBillType[0];
        })
        .catch((err) => {
          console.log("get list bill type error = ", err);
        });
    },
    selectToRedeemPoint() {
      // TODO
      // if (selectedRedeemPoint) {
      //  คำนวนคะแนน คะแนนเดิม คิดเป็นกี่บาท แล้วหักออก
      // }
    },

    getProductInfo() {
      if (this.memberInfo.name == "") {
        alert("กรุณาใส่ระบุสมาชิกให้ถูกต้อง");
        this.inputProductCode = "";
        this.$refs.memberId.focus();
        return;
      }
      if (this.billType.status_no == "") {
        alert("กรุณาใส่ระบุสมาชิกให้ถูกต้อง");
        this.inputProductCode = "";
        this.$refs.memberId.focus();
        return;
      }
      if (this.inputProductCode == "") {
        alert("กรุณาใส่รหัสสินค้าให้ถูกต้อง");
        this.$refs.inputProductCode.focus();
        return;
      }
      if (parseInt(this.qty) <= 0) {
        alert("จำนวนสินค้าไม่ถูกต้อง");
        return;
      }

      let body = {
        product_id: this.inputProductCode,
        qty: this.qty,
        bill_type: {
          doc_tp: this.billType.doc_tp,
          status_no: this.billType.status_no,
          description: this.billType.description,
        },
        branch_id: this.userInfo.data.branch_id,
        brand_id: this.userInfo.data.brand_id,
        member_id: this.memberInfo.memberId,
        member_name: this.memberInfo.name,
        member_level: this.memberInfo.type,
        invoice_no_temp:
          this.$store.state.currentOrder == null
            ? "-"
            : this.$store.state.currentOrder.invoice_no_temp,
        emp_id: this.userInfo.data.emp_id,
      };

      axios
        .post(this.url + "/cart/addcart/temp", body, this.configHeader)
        .then((res) => {
          if (res.status == 200) {
            res.data.memberInfo = this.memberInfo;
            res.data.billType = this.billType;
            this.$store.commit("currentOrder", res.data);
            this.items = this.$store.state.currentOrder.item_temp;
            let id = 0;
            this.items.forEach((e) => {
              e.id = ++id;
            });

            this.selectedItems = [];
            this.isAllChecked = false;
            this.inputProductCode = "";
            this.$refs.inputProductCode.focus();
          } else {
            alert("ไม่สามารถค้นหาข้อมูลสินค้านี้ได้ กรุณาติดต่อ....");
            this.inputProductCode = "";
            this.$refs.inputProductCode.focus();
            return;
          }
        });
    },
    allClicked(checked) {
      this.selectedItems = checked ? this.items : [];
    },
    rowClicked() {
      this.isAllChecked =
        this.selectedItems.length == this.items.length ? true : false;
    },
    checkSelectedItem() {
      if (this.selectedItems.length == 0) {
        alert("กรุณาเลือกรายการที่ต้องการลบให้ถูกต้อง");
      } else {
        this.dialogDelete = true;
      }
    },
    closeDialogDelete() {
      this.dialogDelete = false;
      this.selectedItems = [];
      this.isAllChecked = false;
    },
    confirmDeleteItem() {
      let body = {
        selectedItem: this.selectedItems,
        bill_type: {
          doc_tp: this.billType.doc_tp,
          status_no: this.billType.status_no,
          description: this.billType.description,
        },
        branch_id: this.userInfo.data.branch_id,
        brand_id: this.userInfo.data.brand_id,
        member_id: this.memberInfo.memberId,
        member_name: this.memberInfo.name,
        member_level: this.memberInfo.type,
        invoice_no_temp:
          this.$store.state.currentOrder == null
            ? "-"
            : this.$store.state.currentOrder.invoice_no_temp,
        emp_id: this.userInfo.data.emp_id,
      };
      axios
        .post(this.url + "/cart/delcart/temp", body, this.configHeader)
        .then((res) => {
          if (res.status == 200) {
            if (res.data.main_temp.length == 0) {
              this.$store.commit("currentOrder", null);
              this.items = res.data.item_temp;
            } else {
              res.data.memberInfo = this.memberInfo;
              res.data.billType = this.billType;

              this.$store.commit("currentOrder", res.data);
              this.items = this.$store.state.currentOrder.item_temp;
              let id = 0;
              this.items.forEach((e) => {
                e.id = ++id;
              });
            }

            this.selectedItems = []; //debug for checked item
            this.isAllChecked = false;
            this.inputProductCode = "";
            this.$refs.inputProductCode.focus();
            this.dialogDelete = false;
          } else {
            alert("ไม่สามารถค้นหาข้อมูลสินค้านี้ได้ กรุณาติดต่อ....");
            this.inputProductCode = "";
            this.$refs.inputProductCode.focus();
            return;
          }
        });
    },
    pause() {
      //TODO เอาเฉพาะเลขที่บิล, ข้อมูลบิล, ข้อมูลสมาชิก commit เข้าที่ store
    },
    openDialogPayment() {
      if (this.$store.state.currentOrder == null) {
        alert("ไม่มีรายการซื้อสินค้า, กรุณากรอกรายการซื้อสินค้าอีกครั้ง");
        this.$refs.inputProductCode.focus();
      } else {
        this.dialogPayment = true;
      }
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
    resetNewBill() {
      //TODO ล้างค่าต่างๆ ของบิล
      // this.$store.commit("currentOrder", null);
    },
    refresh() {
      //TODO clear ค่าต่างๆใน local storage แล้ว refresh
    },
    selectedChannel(item) {
      this.selectChannelIndex = item.value;
      this.selectColor = item.color;
    },
    // confirmPayment() {},
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
.btn-action-pay {
  height: 80px;
  width: 100px;
  text-align: center;
  margin-right: 5px;
}
.btn-color {
  background-color: #338787 !important;
  color: #fff !important;
  border-color: #338787 !important;
}
</style>
