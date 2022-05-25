<!-- @format -->

<template>
  <div>
    <v-dialog
      fullscreen
      v-model="dialog"
      max-width="300vw;"
      hide-overlay
      persistent
    >
      <v-card class="pl-0 pr-0" style="width: 200vw" tile>
        <v-card-text class="pl-0 pr-0" style="background-color: #53c3ac">
          <v-row v-if="$store.state.currentOrder !== null">
            <v-col sm="12" md="6" lg="6" class="pa-3"
              ><v-row class="ml-5 mr-5"
                ><v-col md="12" lg="12" class="text-center">
                  <v-banner elevation="10" shaped color="white"
                    ><p>
                      กรุณาเรียกรับใบเสร็จรับเงิน เพื่อสิทธิประโยชน์ของท่าน
                    </p>
                    <p style="margin-bottom: 0px">
                      หากไม่ได้รับความสะดวก กรุณาติดต่อ 02-7005700
                    </p></v-banner
                  >
                </v-col></v-row
              >
              <v-row
                ><v-col md="12" lg="12" class="text-center pb-5">
                  <v-row class="ml-5 mr-5 elevation-10">
                    <v-data-table
                      class="pl-4"
                      fixed-header
                      dense
                      height="315px"
                      :items-per-page="items.length"
                      :headers="headers"
                      :items="items"
                      hide-default-footer
                      disable-sort="false"
                    >
                      <template v-slot:item.product_name="{ item, index }">
                        <td class="text-left pa-0" style="font-size: 13px">
                          {{ index + 1 }}. {{ item.product_name }}
                        </td>
                      </template>
                      <template v-slot:item.qty="{ item, index }">
                        <td class="text-right pa-0" style="font-size: 13px">
                          {{ item.qty }}
                        </td>
                      </template>
                      <template v-slot:item.price="{ item, index }">
                        <td class="text-right pa-0" style="font-size: 13px">
                          {{ formatPrice(item.price) }}
                        </td>
                      </template>
                      <template v-slot:item.amount="{ item, index }">
                        <td class="text-right pa-0" style="font-size: 13px">
                          {{ formatPrice(item.amount) }}
                        </td>
                      </template>
                      <template v-slot:item.discount="{ item, index }">
                        <td class="text-right pa-0" style="font-size: 13px">
                          {{ formatPrice(item.discount) }}
                        </td>
                      </template>
                      <template v-slot:item.total="{ item, index }">
                        <td class="text-right pa-0" style="font-size: 13px">
                          {{ formatPrice(item.total) }}
                        </td>
                      </template>
                    </v-data-table>
                  </v-row>
                </v-col></v-row
              >
              <v-row class="ma-5 elevation-10" style="background-color: white">
                <v-col
                  md="12"
                  lg="12"
                  class="text-center pt-2 pb-10 pr-5 pl-5"
                  style="border-top: 1.5px dashed black; font-size: 16px"
                >
                  <v-row>สินค้าทั้งหมด: {{ items.length }} รายการ</v-row>
                  <v-row>
                    <v-col md="3" class="text-right pb-0"
                      >คะแนนที่ได้รับ:</v-col
                    >
                    <v-col md="3" class="pb-0">2</v-col>
                    <v-col md="3" class="text-right pb-0">รวมเงิน:</v-col>
                    <v-col md="3" class="text-right pb-0">{{
                      formatPrice(1000)
                    }}</v-col>
                  </v-row>
                  <v-row>
                    <v-col md="3" class="text-right pb-0">คะแนนที่ใช้:</v-col>
                    <v-col md="3" class="pb-0">2</v-col>
                    <v-col md="3" class="text-right pb-0">ส่วนลด:</v-col>
                    <v-col md="3" class="text-right pb-0">{{
                      formatPrice(1000)
                    }}</v-col>
                  </v-row>
                  <v-row>
                    <v-col md="3" class="text-right pb-0">คะแนนสุทธิ:</v-col>
                    <v-col md="3" class="pb-0">2</v-col>
                    <v-col
                      md="3"
                      class="text-right pb-0"
                      style="color: red; font-size: 20px"
                      >สุทธิ:</v-col
                    >
                    <v-col
                      md="3"
                      class="text-right pb-0"
                      style="color: red; font-size: 20px"
                      >{{ formatPrice(1000) }}</v-col
                    >
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
            <v-col sm="12" md="6" lg="6" class="pa-3">
              <v-row style="height: 50%" class="elevation-10 rounded-lg">
                <v-col>
                  <v-row class="ml-5 mr-5"
                    ><v-col md="12" lg="12" class="text-center"
                      ><v-banner elevation="10" shaped color="white"
                        ><p style="margin-bottom: 0px">คุณ ABC XXX</p></v-banner
                      >
                    </v-col></v-row
                  >
                  <v-row>
                    <v-col md="12" lg="12" class="text-center">
                      <p style="font-size: 20px; color: white">OPS Rewards</p>
                      <p style="font-size: 14px; color: #336e66">
                        คะแนนสะสมมีค่า แลกรับส่วนลดได้ตลอดทั้งปี
                      </p>
                      <p style="font-size: 22px; color: #218275">
                        ท่านสมาชิกสามารถแลกรับส่วนลดได้จากคะแนนสะสม <br />ทุกๆ
                        100 บาท = 1 คะแนน
                      </p>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-row class="mt-7 elevation-10 rounded-lg">
                <v-col class="mb-5">
                  <v-row style="margin-left: 20px; margin-right: 20px"
                    ><v-col md="12" lg="12" class="text-center">
                      <v-banner elevation="10" shaped color="white"
                        ><p style="margin-bottom: 0px">
                          ข้อมูลสมาชิก
                        </p></v-banner
                      >
                    </v-col></v-row
                  >
                  <v-row>
                    <v-col
                      md="12"
                      lg="12"
                      class="text-center"
                      style="color: white"
                    >
                      <v-row>
                        <v-col md="6" class="text-right pb-0"
                          >ชื่อ/นามสกุล:</v-col
                        >
                        <v-col md="6" class="text-center pb-0">ABC XXX</v-col>
                      </v-row>
                      <v-row>
                        <v-col md="6" class="text-right pb-0"
                          >ประเภทบัตร:</v-col
                        >
                        <v-col md="6" class="text-center pb-0"
                          >WHITE CARD</v-col
                        >
                      </v-row>
                      <!-- <v-row>
                    <v-col md="6" class="text-right pb-0">บัตรหมดอายุ:</v-col>
                    <v-col md="6" class="text-center pb-0">2</v-col>
                  </v-row> -->
                      <v-row>
                        <v-col md="6" class="text-right pb-0"
                          >คะแนนสะสมรวมทั้งสิ้น:</v-col
                        >
                        <v-col md="6" class="text-center pb-0">403</v-col>
                      </v-row>
                      <v-row>
                        <v-col md="6" class="text-right pb-0"
                          >คะแนนสะสมหมดอายุ 31/12/2565:</v-col
                        >
                        <v-col md="6" class="text-center pb-0">0</v-col>
                      </v-row>
                      <v-row>
                        <v-col md="6" class="text-right pb-0"
                          >คะแนนสะสมหมดอายุ 31/12/2566:</v-col
                        >
                        <v-col md="6" class="text-center pb-0">403</v-col>
                      </v-row>
                      <v-row>
                        <v-col md="6" class="text-right pb-0">เบอร์โทร:</v-col>
                        <v-col md="6" class="text-center pb-0"
                          >0833539168</v-col
                        >
                      </v-row>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col sm="12" md="6" lg="6" class="elevation-10">
              <v-row style="height: 20%"></v-row>
              <v-row class="ma-2">
                <!-- my image -->
                <!-- <v-img src="https://picsum.photos/id/11/500/300"></v-img> -->
                <!-- my video -->
                <video autoplay controls loop>
                  <source
                    src="https://file-examples.com/storage/fe6bd68931628d5b79b8f47/2017/04/file_example_MP4_480_1_5MG.mp4"
                    type="video/mp4"
                  />
                </video>
                <!-- Youtube -->
                <!-- <iframe
                  width="420"
                  height="315"
                  src="https://www.youtube.com/embed/tgbNymZ7vqY?playlist=tgbNymZ7vqY&loop=1"
                > 
                </iframe>-->
              </v-row>
              <v-row style="height: 20%"></v-row>
            </v-col>
            <v-col sm="12" md="6" lg="6" class="px-3 py-0">
              <v-row>
                <v-col md="1" lg="1"></v-col>
                <v-col md="10" lg="10"
                  ><v-img
                    style="height: 95vh"
                    src="https://picsum.photos/200"
                  ></v-img
                ></v-col>
                <v-col md="1" lg="1"></v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: true,
      headers: [
        // {
        //   text: "#",
        //   align: "start",
        //   sortable: false,
        //   value: "index",
        // },
        // { text: "Promotion", value: "promotion_code" },
        // { text: "Product", value: "product_id" },
        { text: "Detail", value: "product_name", align: "center" },
        { text: "Qty", value: "qty", align: "end" },
        { text: "Price", value: "price", align: "end" },
        { text: "Amount", value: "amount", align: "end" },
        { text: "Discount", value: "discount", align: "end" },
        { text: "Total", value: "total", align: "end" },
      ],
      items: [],
    };
  },
  mounted: function () {
    this.initialize();
  },
  methods: {
    initialize() {
      this.items = [
        {
          product_id: "25237",
          product_name: "Serum Absolute Illuminating 30",
          promotion_code: "XC0000001",
          qty: 1,
          price: 1305,
          amount: 1305,
          discount: 1305,
          total: 1305,
        },
        {
          product_id: 2,
          product_name: "Ice cream sandwich",
          promotion_code: "XC0000001",
          qty: 237,
          price: 9.0,
          amount: 1000,
          discount: 37,
          total: 4.3,
        },
        {
          product_id: 3,
          product_name: "Eclair",
          promotion_code: "XC0000001",
          qty: 262,
          price: 16.0,
          discount: 23,
          amount: 1000,
          total: 6.0,
        },
        {
          product_id: 4,
          product_name: "Cupcake",
          promotion_code: "XC0000001",
          qty: 305,
          price: 3.7,
          amount: 1000,
          discount: 67,
          total: 4.3,
        },
        {
          product_id: 5,
          product_name: "Gingerbread",
          promotion_code: "XC0000002",
          qty: 356,
          price: 16.0,
          amount: 1000,
          discount: 49,
          total: 3.9,
        },
        {
          product_id: 6,
          product_name: "Jelly bean",
          promotion_code: "XC0000003",
          qty: 375,
          price: 0.0,
          amount: 1000,
          discount: 94,
          total: 0.0,
        },
        {
          product_id: 7,
          product_name: "Lollipop",
          promotion_code: "",
          qty: 392,
          price: 0.2,
          amount: 1000,
          discount: 98,
          total: 0,
        },
        {
          product_id: 8,
          product_name: "Honeycomb",
          promotion_code: "",
          qty: 408,
          price: 3.2,
          amount: 1000,
          discount: 87,
          total: 6.5,
        },
        {
          product_id: 9,
          product_name: "Donut",
          promotion_code: "",
          qty: 452,
          price: 25.0,
          amount: 51,
          discount: 4.9,
          total: 6.5,
        },
        {
          product_id: 10,
          product_name: "KitKat",
          promotion_code: "",
          qty: 518,
          price: 26.0,
          amount: 51,
          discount: 65,
          total: 7,
        },
        {
          product_id: 11,
          product_name: "KitKat",
          promotion_code: "",
          qty: 518,
          price: 26.0,
          amount: 51,
          discount: 65,
          total: 7,
        },
      ];
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(",", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};
</script>

<style></style>
