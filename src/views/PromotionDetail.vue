<template>
  <div>
    <v-card>
      <v-card-title>
        <b>รหัสโปรโมชั่น : </b> {{ promoInfo.code }}
        <v-spacer></v-spacer>
        <v-btn outlined>
            <v-icon>mdi-arrow-left-bold-circle-outline</v-icon>
            <router-link style="text-decoration: none; color: black;" :to="{ name: 'Promotion' }">back</router-link>
        </v-btn>
      </v-card-title>
      <v-card-subtitle>
          <p><b>รายละเอียด : </b>{{ promoInfo.description }}</p>
          <p><b>ระยะเวลาการเล่น : </b>{{ promoInfo.startDate }} - {{ promoInfo.endDate }}</p>
      </v-card-subtitle>
      <v-card-text class="text--primary">
        <v-row>
            <h6><b>เงื่อนไข</b></h6>
            <ul style="list-style-type:decimal">
                <li v-for="item in promoInfo.condition" :key="item.id">
                    <div>{{ item.name }}</div>
                    <div style="margin-top: 10px; margin-bottom: 10px;" v-if="item.listPromotion.length !== 0">
                        <v-simple-table fixed-header height="150px" dense>
                            <tbody>
                                <tr v-for="r in item.listPromotion" :key="r.id"  >
                                    <td>{{ r.code }}</td>
                                    <td>{{ r.name }}</td>
                                </tr>
                            </tbody>
                        </v-simple-table>
                    </div>
                    <div style="margin-top: 10px; margin-bottom: 10px;" v-if="item.listProduct.length !== 0">
                        <v-simple-table fixed-header height="150px" dense>
                            <thead>
                                <th>รหัสสินค้า</th>
                                <th>ชื่อสินค้า</th>
                            </thead>
                            <tbody>
                                <tr v-for="r in item.listProduct" :key="r.id"  >
                                    <td>{{ r.code }}</td>
                                    <td>{{ r.name }}</td>
                                </tr>
                            </tbody>
                        </v-simple-table>
                    </div>
                </li>
            </ul>
        </v-row>
        <v-row>
            <h6><b>วิธีการเล่น</b></h6>
            <ul style="list-style-type:decimal">
                <li v-for="item in promoInfo.howto" :key="item.id">
                    <div>{{ item.name }}</div>
                    <div style="margin-top: 10px; margin-bottom: 10px;" v-if="item.listPromotion.length !== 0">
                        <v-simple-table fixed-header height="150px" dense>
                            <tbody>
                                <tr v-for="r in item.listPromotion" :key="r.id"  >
                                    <td>{{ r.code }}</td>
                                    <td>{{ r.name }}</td>
                                </tr>
                            </tbody>
                        </v-simple-table>
                    </div>
                    <div style="margin-top: 10px; margin-bottom: 10px;" v-if="item.listProduct.length !== 0" >
                        <v-simple-table fixed-header height="200px" dense>
                            <thead>
                                <th>รหัสสินค้า</th>
                                <th>ชื่อสินค้า</th>
                                <th>ราคาสินค้า</th>
                                <th>ขายในราคา</th>
                            </thead>
                            <tbody>
                                <tr v-for="r in item.listProduct" :key="r.id"  >
                                    <td>{{ r.code }}</td>
                                    <td>{{ r.name }}</td>
                                    <td>{{ r.price }}</td>
                                    <td>{{ r.priceInSell }}</td>
                                </tr>
                            </tbody>
                        </v-simple-table>
                    </div>
                </li>
            </ul>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  data() {
    return {
      promoCode: "",
      promoInfo: {},
      headersCondition: [
          { text: 'รหัส', value: 'code' },
          { text: 'รายละเอียด', value: 'name' },
      ],
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
      this.userInfo = JSON.parse(this.$store.state.userInfo);
    //   this.promoCode = this.$route.params.promoCode;
      this.getDetail();
    }
  },
  methods: {
    getDetail() {
      this.promoInfo = {
        code: this.$route.params.promoCode,
        type: "โปรหลัก",
        level: "",
        privilege: "Member",
        name: "P001",
        limit: "",
        img: "https://png.pngtree.com/png-clipart/20190116/ourmid/pngtree-hand-drawn-penguin-cute-penguin-staying-cute-penguin-cartoon-penguin-png-image_387147.jpg",
        startDate: dayjs().format("YYYY-MM-DD"),
        endDate: dayjs().add(1, "month").format("YYYY-MM-DD"),
        description: "ซื้อสินค้าครบ 1,000 บาท(สุทธิ) รับฟรี Power C(26854)/Wimantra(26553-5)/Floralista(27055-7)",
        condition: [
          {
            step: "1",
            name: "สิทธิ์ : เล่นได้ทุกคน",
            listPromotion: [],
            listProduct: [],
          },
          {
            step: "2",
            name: "ซื้อครบ 500.00 สุทธิ",
            listPromotion: [],
            listProduct: [],
          },
          {
            step: "3",
            name: "ห้ามเล่นกับโปรโมชั่นเหล่านี้",
            listPromotion: [
              {
                code: "OS03060817",
                name: "Value Set for Meituan Dianping App - RED Set 1,388 บาท",
              },
              {
                code: "OT06300317",
                name: "Value Set for Tourists: Milky Whitening Booster Intensive Set",
              },
              {
                code: "OT06300317",
                name: "Value Set for Tourists: Milky Whitening Booster Intensive Set",
              },
              {
                code: "OT06300317",
                name: "Value Set for Tourists: Milky Whitening Booster Intensive Set",
              },
              {
                code: "OT06300317",
                name: "Value Set for Tourists: Milky Whitening Booster Intensive Set",
              },
            ],
            listProduct: [
                {
                    code: "26623",
                    name: "Ultimate Renewal NightCream",
                    price: "55",
                    priceInSell: "แถมฟรี"
                },
                {
                    code: "26624",
                    name: "Skin Whitening Spot",
                    price: "35",
                    priceInSell: "แถมฟรี"
                },
                {
                    code: "26624",
                    name: "Skin Whitening Spot",
                    price: "35",
                    priceInSell: "แถมฟรี"
                },
                {
                    code: "26624",
                    name: "Skin Whitening Spot",
                    price: "35",
                    priceInSell: "แถมฟรี"
                },
            ],
          },
          {
            step: "4",
            name: "ซื้อสินค้าในกลุ่มนี้ รวมอย่างน้อย: 500 สุทธิ",
            listPromotion: [],
            listProduct: [
                {
                    code: "26623",
                    name: "Ultimate Renewal NightCream",
                    price: "55",
                    priceInSell: "แถมฟรี"
                },
                {
                    code: "26624",
                    name: "Skin Whitening Spot",
                    price: "35",
                    priceInSell: "แถมฟรี"
                },
                {
                    code: "26624",
                    name: "Skin Whitening Spot",
                    price: "35",
                    priceInSell: "แถมฟรี"
                },
                {
                    code: "26624",
                    name: "Skin Whitening Spot",
                    price: "35",
                    priceInSell: "แถมฟรี"
                },
                {
                    code: "26624",
                    name: "Skin Whitening Spot",
                    price: "35",
                    priceInSell: "แถมฟรี"
                },
                {
                    code: "26624",
                    name: "Skin Whitening Spot",
                    price: "35",
                    priceInSell: "แถมฟรี"
                },
                {
                    code: "26624",
                    name: "Skin Whitening Spot",
                    price: "35",
                    priceInSell: "แถมฟรี"
                },
                {
                    code: "26624",
                    name: "Skin Whitening Spot",
                    price: "35",
                    priceInSell: "แถมฟรี"
                },
                {
                    code: "26624",
                    name: "Skin Whitening Spot",
                    price: "35",
                    priceInSell: "แถมฟรี"
                },
                {
                    code: "26624",
                    name: "Skin Whitening Spot",
                    price: "35",
                    priceInSell: "แถมฟรี"
                },
            ],
          },
        ],
        howto: [
          {
            step: "1",
            name: "ซื้อสินค้าเหล่านี้",
            listPromotion: [],
            listProduct: [
                {
                    code: "26623",
                    name: "Ultimate Renewal NightCream",
                    price: "55",
                    priceInSell: "แถมฟรี"
                },
                {
                    code: "26624",
                    name: "Skin Whitening Spot",
                    price: "35",
                    priceInSell: "แถมฟรี"
                },
                {
                    code: "26624",
                    name: "Skin Whitening Spot",
                    price: "35",
                    priceInSell: "แถมฟรี"
                },
                {
                    code: "26624",
                    name: "Skin Whitening Spot",
                    price: "35",
                    priceInSell: "แถมฟรี"
                },
                {
                    code: "26624",
                    name: "Skin Whitening Spot",
                    price: "35",
                    priceInSell: "แถมฟรี"
                },
                {
                    code: "26624",
                    name: "Skin Whitening Spot",
                    price: "35",
                    priceInSell: "แถมฟรี"
                },
                {
                    code: "26624",
                    name: "Skin Whitening Spot",
                    price: "35",
                    priceInSell: "แถมฟรี"
                },
                {
                    code: "26624",
                    name: "Skin Whitening Spot",
                    price: "35",
                    priceInSell: "แถมฟรี"
                },
                {
                    code: "26624",
                    name: "Skin Whitening Spot",
                    price: "35",
                    priceInSell: "แถมฟรี"
                },
                {
                    code: "26624",
                    name: "Skin Whitening Spot",
                    price: "35",
                    priceInSell: "แถมฟรี"
                },
            ],
          },
          {
            step: "2",
            name: "แถมฟรีสินค้าเหล่านี้",
            listPromotion: [],
            listProduct: [
                {
                    code: "26623",
                    name: "Ultimate Renewal NightCream",
                    price: "55",
                    priceInSell: "แถมฟรี"
                },
                {
                    code: "26624",
                    name: "Skin Whitening Spot",
                    price: "35",
                    priceInSell: "แถมฟรี"
                },
            ],
          },
        ],
      };
    },
  },
};
</script>

<style>
</style>