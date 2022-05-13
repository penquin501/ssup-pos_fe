<!-- @format -->

<template>
  <div>
    <v-col
      class="d-flex"
      cols="12"
      sm="12"
      md="12"
      style="padding-top: 0px; padding-bottom: 0px"
    >
      <!-- <v-col cols="12" sm="6" md="6" center>
        <b-button variant="primary" style="height: 100px; width: 100px">
          <v-icon size="48" color="white">mdi-refresh</v-icon>
          <br />
          <span style="font-size: 14px">Refresh</span>
        </b-button>
      </v-col> -->
      <v-col cols="12" sm="6" md="6" center>
        <b-button
          variant="primary"
          @click.prevent="dialogDeliveryInfo = true"
          style="height: 100px; width: 100px"
        >
          <v-icon size="48" color="white">mdi mdi-motorbike</v-icon>
          <br />
          <span style="font-size: 14px">Delivery</span>
        </b-button>
      </v-col>
      <v-col cols="12" sm="6" md="6" center>
        <b-button
          variant="primary"
          @click.prevent="dialogDeliveryInfo = true"
          style="height: 100px; width: 100px"
        >
          <v-icon size="48" color="white">mdi mdi-motorbike</v-icon>
          <br />
          <span style="font-size: 14px">Delivery</span>
        </b-button>
      </v-col>
    </v-col>
    <v-col
      class="d-flex"
      cols="12"
      sm="12"
      md="12"
      style="padding-top: 0px; padding-bottom: 0px"
    >
      <v-col cols="12" sm="6" md="6" center>
        <b-button variant="primary" style="height: 100px; width: 100px">
          <v-icon size="48" color="white">mdi-tag-multiple</v-icon>
          <br />
          <span style="font-size: 14px">Promotion</span>
        </b-button>
      </v-col>
      <v-col cols="12" sm="6" md="6" center>
        <b-button variant="primary" style="height: 100px; width: 100px">
          <v-icon size="48" color="white">mdi-upload</v-icon>
          <br />
          <span style="font-size: 14px">Update Promotion</span>
        </b-button>
      </v-col>
    </v-col>
    <v-col
      class="d-flex"
      cols="12"
      sm="12"
      md="12"
      style="padding-top: 0px; padding-bottom: 0px"
    >
      <v-col cols="12" sm="6" md="6" center>
        <b-button variant="primary" style="height: 100px; width: 100px">
          <b-img
            style="width: 48px; height: 48px"
            src="./img/icons/alipay-brands.svg"
          ></b-img>
          <br />
          <span style="font-size: 14px">Alipay</span>
        </b-button>
      </v-col>
      <v-col cols="12" sm="6" md="6" center>
        <b-button variant="primary" style="height: 100px; width: 100px">
          <v-icon size="48" color="white">fa fa-weixin</v-icon>
          <br />
          <span style="font-size: 14px">We Chat</span>
        </b-button>
      </v-col>
    </v-col>

    <v-dialog v-model="dialogDeliveryInfo" max-width="550px;" persistent>
      <v-card>
        <v-card-title class="text-h5">Delivery Infomation</v-card-title>
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
            @click.prevent="dialogDeliveryInfo = false"
            >Cancel</v-btn
          >
          <!-- <v-btn color="blue darken-1" text @click.prevent="deleteItemConfirm">OK</v-btn> -->
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      dialogDeliveryInfo: false,
      deliveryInfo: {
        fullname: "",
        phone: "",
        address: "",
        branchNo: "",
      },
    };
  },
  methods: {},
};
</script>

<style></style>
