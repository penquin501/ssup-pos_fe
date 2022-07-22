<!-- @format -->

<template>
  <div>
    <!-- Header Part -->
    <h3>ORIENTAL PRINCESS</h3>
    <h5>SSUP(THAILAND) CO.,LTD.</h5>
    <h5>TAX INVOICE(ABB.)</h5>
    <v-row>
      <v-col class="pa-0 text-left">TAX ID:</v-col>
      <v-col class="pa-0 text-left">{{ brandTaxId }}</v-col>
      <v-col class="pa-0 text-right">POS ID:</v-col>
      <v-col class="pa-0 text-right">{{ receiptInfo.main[0].pos_id }}</v-col>
    </v-row>
    <v-row>
      <v-col class="pa-0 text-left">Branch:</v-col>
      <v-col class="pa-0 text-left">{{ branchName }}</v-col>
      <v-col class="pa-0 text-right"></v-col>
      <v-col class="pa-0 text-right"></v-col>
    </v-row>
    <v-row>
      <v-col class="pa-0 text-left">Branch No.:</v-col>
      <v-col class="pa-0 text-left">{{ receiptInfo.main[0].branch_id }}</v-col>
      <v-col class="pa-0 text-right"></v-col>
      <v-col class="pa-0 text-right"></v-col>
    </v-row>
    <v-row>
      <v-col class="pa-0 text-left">Rcpt:</v-col>
      <v-col class="pa-0 text-left">{{ receiptInfo.invoice_no }}</v-col>
      <v-col class="pa-0 text-right">{{ dateBill }}</v-col>
      <v-col class="pa-0 text-right">{{ timeBill }}</v-col>
    </v-row>
    <v-row>
      <v-col class="pa-0 text-left">Member ID:</v-col>
      <v-col class="pa-0 text-left">{{
        receiptInfo.main[0].customer_id
      }}</v-col>
      <v-col class="pa-0 text-right">Cashier:</v-col>
      <v-col class="pa-0 text-right">{{ receiptInfo.main[0].user_name }}</v-col>
    </v-row>
    <!-- Detail Part -->
    <v-row>
      <table>
        <thead>
          <th style="text-align: center">Description</th>
          <th style="text-align: right">Price</th>
          <th style="text-align: right">QTY</th>
          <th style="text-align: right">Disc.</th>
          <th style="text-align: right">Net</th>
        </thead>
        <tbody>
          <tr v-for="item in receiptInfo.item" :key="item.product_id">
            <td style="text-align: left">{{ item.product_name_print }}</td>
            <td style="text-align: right">{{ formatPrice(item.price) }}</td>
            <td style="text-align: right">{{ item.quantity }}</td>
            <td style="text-align: right">{{ formatPrice(item.discount) }}</td>
            <td style="text-align: right">{{ formatPrice(item.net) }}</td>
          </tr>
        </tbody>
      </table>
    </v-row>

    <!-- Summary Part -->
    <v-row>
      <v-col class="pa-0 text-left">Quantity = </v-col>
      <v-col class="pa-0 text-left">{{ receiptInfo.item.length }}</v-col>
      <v-col class="pa-0 text-right">Total</v-col>
      <v-col class="pa-0 text-right">{{ receiptInfo.main[0].total }}</v-col>
    </v-row>
    <v-row>
      <v-col class="pa-0 text-left">*** Vat Included ***</v-col>
      <!-- <v-col class="pa-0 text-left"></v-col> -->
      <v-col class="pa-0 text-right">Discount</v-col>
      <v-col class="pa-0 text-right">{{ receiptInfo.main[0].discount }}</v-col>
    </v-row>
    <v-row>
      <v-col class="pa-0 text-left"></v-col>
      <v-col class="pa-0 text-left"></v-col>
      <v-col class="pa-0 text-right">Net</v-col>
      <v-col class="pa-0 text-right">{{ receiptInfo.main[0].net }}</v-col>
    </v-row>
    <v-row>
      <v-col class="pa-0 text-left"></v-col>
      <v-col class="pa-0 text-left"></v-col>
      <v-col class="pa-0 text-right">Received</v-col>
      <v-col class="pa-0 text-right">{{ receiptInfo.main[0].cash }}</v-col>
    </v-row>
    <v-row>
      <v-col class="pa-0 text-left"></v-col>
      <v-col class="pa-0 text-left"></v-col>
      <v-col class="pa-0 text-right">Change</v-col>
      <v-col class="pa-0 text-right">{{ receiptInfo.main[0].change }}</v-col>
    </v-row>

    <!-- Point Part -->
    <v-row>
      <v-col class="pa-0 text-left">คะแนนยกมา</v-col>
      <v-col class="pa-0 text-right">{{
        receiptInfo.main[0].point_before
      }}</v-col>
      <v-col class="pa-0 text-right">คะแนน</v-col>
    </v-row>
    <v-row>
      <v-col class="pa-0 text-left">คะแนนที่ได้รับในบิลนี้</v-col>
      <v-col class="pa-0 text-right">{{
        receiptInfo.main[0].point_receive
      }}</v-col>
      <v-col class="pa-0 text-right">คะแนน</v-col>
    </v-row>
    <v-row>
      <v-col class="pa-0 text-left">คะแนนที่แลกใช้ในบิลนี้</v-col>
      <v-col class="pa-0 text-right">{{ receiptInfo.main[0].point_use }}</v-col>
      <v-col class="pa-0 text-right">คะแนน</v-col>
    </v-row>
    <v-row>
      <v-col class="pa-0 text-left">คะแนนคงเหลือทั้งสิ้น</v-col>
      <v-col class="pa-0 text-right">{{
        receiptInfo.main[0].point_after
      }}</v-col>
      <v-col class="pa-0 text-right">คะแนน</v-col>
    </v-row>
    <v-row>
      <v-col class="pa-0 text-left">คะแนนที่จะหมดอายุ(วันที่ 31/12/2022)</v-col>
      <v-col class="pa-0 text-right">{{
        receiptInfo.main[0].point_before
      }}</v-col>
      <v-col class="pa-0 text-right">คะแนน</v-col>
    </v-row>

    <!-- Member Priviledge Part -->
    <v-row>
      <p class="pa-0 ma-0 text-left">
        รับส่วนลด 15% ในวันอังคารหรือวันพฤหัสบดี
      </p>
      <p class="pa-0 ma-0 text-left">
        สัปดาห์ใดก็ได้ของเดือน โดยเลือกได้ 1 วัน/เดือน
      </p>
    </v-row>

    <!-- Contact Part -->
    <v-row>
      <v-col class="pa-0 text-left">www.orientalprincess.com</v-col>
      <v-col class="pa-0 text-right">Beauty Line:</v-col>
      <v-col class="pa-0 text-right">02-700-5700</v-col>
    </v-row>
    <v-row>
      <v-col class="pa-0 text-left">เบอร์โทรศัพท์สาขา:</v-col>
      <v-col class="pa-0 text-left">085-8989898</v-col>
      <v-col class="pa-0 text-right"></v-col>
      <!-- <v-col class="pa-0 text-right"></v-col> -->
    </v-row>

    <!-- Condition Part -->
    <v-row>
      <p class="pa-0 ma-0 text-left" style="text-decoration: underline">
        รับประกันความพึงพอใจของสินค้า
      </p>
      <ol>
        <li class="pa-0 ma-0 text-left">
          รับเปลี่ยนหรือคืนสินค้าภายใน 14 วัน
          นับจากวันที่ซื้อโดยแสดงใบเสร็จและบัตรประจำตัวประชาชน/Virtual Card
        </li>
        <li class="pa-0 ma-0 text-left">
          การเปลี่ยนสินค้าจะได้รับส่วนลดตามโปรโมชั่น
          ในวันที่ทำการเปลี่ยนสินค้าเท่านั้น
        </li>
        <li class="pa-0 ma-0 text-left">
          การเปลี่ยนหรือคืนสินค้าในรายการโปรโมชั่นต้องนำสินค้าในรายการโปรโมชั่นมาเปลี่ยนหรือคืนทั้งหมด
        </li>
        <li class="pa-0 ma-0 text-left">
          ทางบริษัทฯ ขอสงวนสิทธิ์ในการเปลี่ยนแปลงโดยมิต้องแจ้งให้ทราบล่วงหน้า
        </li>
      </ol>
    </v-row>

    <!-- QR Code Part -->
    <v-row>
      <v-col>
        <QRCanvas
          :width="25"
          :height="25"
          style="width: 150px"
          :options="options"
        ></QRCanvas>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-row>
          <v-col class="pa-0 text-right"
            ><v-icon large>mdi-flower</v-icon></v-col
          >
          <v-col class="pa-0 text-left">OP Mobile Application</v-col>
        </v-row>
        <v-row>
          <v-col class="pa-0 text-right"
            ><v-icon large>mdi-facebook-box</v-icon></v-col
          >
          <v-col class="pa-0 text-left"
            >/orientalprincesssociety <br />
            /orientalprincesssociety</v-col
          >
        </v-row>
        <v-row>
          <v-col class="pa-0 text-right"
            ><v-icon large>mdi-instagram</v-icon></v-col
          >
          <v-col class="pa-0 text-left">orientalprincesssociety</v-col>
        </v-row>
        <v-row>
          <v-col class="pa-0 text-right"
            ><v-icon large>mdi-facebook-messenger</v-icon></v-col
          >
          <v-col class="pa-0 text-left">Oriental Princess</v-col>
        </v-row>
        <v-row>
          <v-col class="pa-0 text-right"
            ><v-icon large>mdi-youtube-play</v-icon></v-col
          >
          <v-col class="pa-0 text-left">Oriental Princess</v-col> </v-row
        ><v-row>
          <v-col class="pa-0 text-right"
            ><v-icon large>mdi-twitter-box</v-icon></v-col
          >
          <v-col class="pa-0 text-left">Oriental Princess</v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- Add Line Shop Part -->
    <v-row style="border-top: 1.5px dashed black; font-size: 16px">
      <p class="pa-0 ma-0">Add Line Shop</p>
      <p class="pa-0 ma-0">Scan Here</p>
      <v-col>
        <QRCanvas
          :width="25"
          :height="25"
          style="width: 150px"
          :options="options"
        ></QRCanvas>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import dayjs from "dayjs";
const { QRCanvas } = require("qrcanvas-vue");
export default {
  components: {
    QRCanvas,
  },
  data() {
    return {
      disableSort: false,
      receiptInfo: "",
      userInfo: "",
      brandTaxId: "",
      branchName: "",
      dateBill: "",
      timeBill: "",
      options: {
        cellSize: 8,
        data: "Oriental Princess",
      },
      headersReceipt: [
        { text: "Description", value: "product_name", align: "center" },
        { text: "Price", value: "price", align: "end" },
        { text: "QTY", value: "quantity", align: "end" },
        { text: "Disc.", value: "discount", align: "end" },
        { text: "Net", value: "net", align: "end" },
      ],
    };
  },
  mounted: function () {
    this.userInfo =
      this.$store.state.userInfo !== undefined
        ? JSON.parse(this.$store.state.userInfo)
        : "";
    this.brandTaxId = this.userInfo.data.brand_tax_id;
    this.branchName = this.userInfo.data.branch;
    this.receiptInfo =
      this.$store.state.receiptInfo !== null
        ? this.$store.state.receiptInfo
        : "";
    this.dateBill = dayjs(this.receiptInfo.main[0].created_at).format(
      "YYYY-MM-DD"
    );
    this.timeBill = dayjs(this.receiptInfo.main[0].created_at).format(
      "HH:mm:ss"
    );
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(",", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};
</script>

<style></style>
