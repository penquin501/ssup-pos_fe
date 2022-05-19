<!-- @format -->

<template>
  <div>
    <v-tabs v-model="tab">
      <v-tab v-for="item in items" :key="item.tab">
        {{ item.tab }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item.tab">
        <v-card flat>
          <v-card-text>
            <v-row>
              <v-col
                md="3"
                v-for="(item, index) in item.content.menus"
                :key="item.value"
              >
                <v-btn
                  :value="item.value"
                  block
                  @click.prevent="item.dialog = true"
                >
                  {{ item.name }}
                </v-btn>

                <v-dialog
                  v-if="item.value == 'delivery'"
                  v-model="item.dialog"
                  max-width="550px;"
                  persistent
                >
                  <v-card>
                    <v-card-title class="text-h5"
                      >Delivery Infomation</v-card-title
                    >
                    <v-card-text>
                      <v-text-field
                        v-model="deliveryInfo.phone"
                        label="Mobile No."
                        required
                      ></v-text-field>
                      <v-text-field
                        v-model="deliveryInfo.fullname"
                        label="Full Name"
                        required
                      ></v-text-field>
                      <v-textarea
                        v-model="deliveryInfo.address"
                        auto-grow
                        no-resize
                        label="Address"
                        rows="3"
                        max-height="40"
                      ></v-textarea>
                      <v-text-field
                        v-model="deliveryInfo.branchNo"
                        label="Branch No."
                        required
                      ></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click.prevent="item.dialog = false"
                        >Cancel</v-btn
                      >
                      <!-- <v-btn color="blue darken-1" text @click.prevent="deleteItemConfirm">OK</v-btn> -->
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

                <v-dialog
                  v-model="item.dialog"
                  v-if="item.value == 'vat'"
                  max-width="550px;"
                  persistent
                >
                  <v-card>
                    <v-card-title class="text-h5"
                      >Tax Invoice Infomation</v-card-title
                    >
                    <v-card-text>
                      <v-text-field
                        v-model="taxInfo.fullname"
                        label="Full Name"
                        required
                      ></v-text-field>
                      <v-text-field
                        v-model="taxInfo.taxId"
                        label="Tax ID"
                        required
                      ></v-text-field>
                      <v-textarea
                        v-model="taxInfo.address"
                        auto-grow
                        no-resize
                        label="Address"
                        rows="3"
                        max-height="40"
                      ></v-textarea>
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
                              <b-form-input
                                v-model="taxInfo.taxBranchNo"
                              ></b-form-input>
                            </span>
                          </template>
                        </v-radio>
                      </v-radio-group>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click.prevent="item.dialog = false"
                        >Cancel</v-btn
                      >
                      <v-btn
                        color="blue darken-1"
                        text
                        @click.prevent="confirmTaxInvoiceInfo()"
                        >OK</v-btn
                      >
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
// import axios from "axios";
// const queryString = require("query-string");

export default {
  data() {
    return {
      url: process.env.VUE_APP_SERVER_API,
      configHeader: {},
      userInfo: {},
      dialogDelivery: false,
      deliveryInfo: {
        fullname: "",
        phone: "",
        address: "",
        branchNo: "",
      },
      taxInfo: {
        fullname: "",
        taxId: "",
        address: "",
        selectTaxBranch: "",
        taxBranchNo: "",
      },
      tab: null,
      items: [
        {
          tab: "Promotion",
          content: {
            menus: [
              {
                name: "Special Promotion",
                value: "special_promotion",
                dialog: false,
              },
            ],
          },
        },
        {
          tab: "Inquiry",
          content: {
            menus: [
              { name: "Summary", value: "summary", dialog: false },
              { name: "Stock", value: "stock", dialog: false },
              { name: "Bill", value: "bill", dialog: false },
              { name: "Member", value: "member", dialog: false },
              {
                name: "Promotion Description",
                value: "promo_detail",
                dialog: false,
              },
            ],
          },
        },
        {
          tab: "Address",
          content: {
            menus: [
              { name: "VAT", value: "vat", dialog: false },
              { name: "Passport", value: "passport", dialog: false },
              { name: "Delivery", value: "delivery", dialog: false },
            ],
          },
        },
        // { tab: "Other", content: "Tab 4 Content" },
      ],
    };
  },
  methods: {
    confirmTaxInvoiceInfo() {
      // TODO
    },
  },
};
</script>

<style></style>
