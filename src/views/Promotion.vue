<template>
  <div>
    <b-card>
      <b-tabs content-class="mt-3">
        <b-tab v-if="listMenu.find((name) => name == 'Offer Promotion')" title="วิธีเล่น Promotion" active>
          <v-data-table
            :headers="headers"
            :items="listPromotion"
            :expanded.sync="expanded"
            :single-expand="singleExpand"
            item-key="code"
            show-expand
            sort-by="startDate"
            class="elevation-1"
          >
            <template v-slot:item.index="{ item, index }">
              {{ index + 1 }}
            </template>
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>รายการ Promotion {{ today }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-text-field v-model="searchMember" @keypress.enter="checkMemberPromotion()" append-icon="mdi-magnify" label="กรอกรหัสสมาชิก" single-line hide-details></v-text-field>
              </v-toolbar>
            </template>
            <template v-slot:item.img="{ item }">
              <div>
                <v-btn @click="openDialog(item.img)" plain style="width: 70px; height: 70px">
                  <v-img v-if="item.img !== ''" :src="item.img" contain :alt="item.name" :aspect-ratio="1" ></v-img>
                  <v-img v-else src="img/auth/noimage.png" contain :aspect-ratio="1"></v-img>
                </v-btn>
              </div>
            </template>
            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length" style="padding-top: 16px; padding-bottom: 16px;">
                <p style="margin-bottom: 0px;"><b>รหัสโปรโมชั่น :</b> {{ item.code }}</p>
                <p style="word-wrap: break-word; margin-bottom: 0px;"><b>รายละเอียด :</b> {{ item.description }}</p>
                <p style="margin-bottom: 0px;"><b>ระยะเวลาการเล่น : </b>{{ item.startDate }} - {{ item.endDate }}</p>
                <p><router-link :to="{ name: 'PromotionDetail', params: { promoCode: item.code }}">วิธีการเล่น</router-link></p>
              </td>
            </template>
          </v-data-table>
          <v-dialog v-model="dialogPromotion" max-width="500px" :retain-focus="false" persistent>
            <v-overlay :absolute="absolute" :value="overlayPromotion" responsive>
              <v-card class="mx-auto" max-width="500px" light style="width: 200vw; height: auto; margin: 0">
                <v-card-title>
                  <b>Promotion</b>
                  <v-spacer></v-spacer>
                  <v-btn icon @click.prevent="dialogPromotion = false, overlayPromotion = false"><v-icon>mdi-close</v-icon></v-btn>
                </v-card-title>
                <v-card-subtitle class="pb-0"></v-card-subtitle>
                <v-card-text class="text--primary">
                  <v-row>
                    <v-zoomer style="width: 500px; height: 500px; border: solid 0px silver;">
                      <img v-if="imgPromotion !== ''" :src="imgPromotion" style="object-fit: contain; width: 100%; height: 100%" :style="`transform: rotate(${rotation}deg);`" />
                      <img v-else src="img/auth/noimage.png" style="object-fit: contain; width: 100%; height: 100%" :style="`transform: rotate(${rotation}deg);`" />
                    </v-zoomer>
                  </v-row>
                  <v-row>
                    <v-col cols="6" align="center">
                      <v-btn @click.prevent="rotateLeft"><v-icon>mdi-rotate-left</v-icon></v-btn>
                    </v-col>
                    <v-col cols="6" align="center">
                      <v-btn @click.prevent="rotateRight"><v-icon>mdi-rotate-right</v-icon></v-btn>
                    </v-col>
                  </v-row>
                </v-card-text>
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
      searchMember: "",
      expanded: [],
      singleExpand: true,
      today: dayjs().format("DD-MM-YYYY"),
      headers: [
        { text: "ลำดับ", value: "index", align: 'center' },
        { text: "ประเภท", value: "type" },
        { text: "Level", value: "level" },
        { text: "รหัส", sortable: true, value: "code" },
        // { text: "Name", value: "name" },
        { text: "เริ่มเล่น", value: "startDate" },
        { text: "สิ้นสุด", value: "endDate" },
        { text: "สิทธิ์", value: "privilege" },
        { text: "รายละเอียด", value: "description" },
        { text: "ซื้อครบ", value: "limit" },
        { text: "Image", value: "img" },
        { text: "", value: "data-table-expand" },
      ],
      listPromotion: [],
      imgPromotion: "",
      userInfo: {},
      listMenu: [],
      absolute: true,
      rotation: 0,
      dialogPromotion: false,
      overlayPromotion: false,
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

      /* Default User Menu*/
      let userMenu = JSON.parse(this.userInfo.listUserPermission);
      for (let item of userMenu) {
        for (const [key, value] of Object.entries(item)) {
          if (key == this.$route.name && item.SubMenu !== undefined) {
            this.listMenu = item.SubMenu;
          }
        }
      }
      this.listMenu = this.listMenu.length !== 0 ? this.listMenu : ["Offer Promotion"];
      this.getListPromotion();
    }
  },
  methods: {
    getListPromotion() {
      this.listPromotion = [
        {
          code: "OC02041221",
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
              },
              {
                  step: "2",
                  name: "ซื้อครบ 500.00 สุทธิ",
                  listPromotion: [],
              },
              {
                  step: "3",
                  name: "ห้ามเล่นกับโปรชั่นเหล่านี้",
                  listPromotion: [
                      {
                          code: "",
                          name: ""
                      },
                      {
                          code: "",
                          name: ""
                      },
                  ],
              },
            ],
          howto: [
              {
                  step: "1",
                  name: "ลดสินค้าเหล่านี้เป็น %",
                  listProduct: [],
              },
              {
                  step: "2",
                  name: "ลดสินค้าเหล่านี้เป็น %",
                  listProduct: [],
              },
            ]
        },
        {
          code: "OX08080616",
          type: "ท้ายบิล",
          level: "2",
          privilege: "",
          name: "P002",
          limit: "300",
          img: "https://static.pexels.com/photos/111788/pexels-photo-111788-large.jpeg",
          startDate: dayjs().format("YYYY-MM-DD"),
          endDate: dayjs().add(1, "month").format("YYYY-MM-DD"),
          description: "Platinum Member:ซื้อสินค้าใหม่ Phenomenal Perfect Coverage Cream To Powder Foundation ลด 30%",
        },
      ];
    },
    openDialog(img) {
      this.dialogPromotion = true;
      this.overlayPromotion = true;

      this.imgPromotion = img;
    },
    checkMemberPromotion() {
        this.listPromotion = [];

        this.listPromotion = [
        {
          code: "P010",
          name: "P010",
          img: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Large_Scaled_Forest_Lizard.jpg",
          startDate: dayjs().format("YYYY-MM-DD"),
          endDate: dayjs().add(1, "month").format("YYYY-MM-DD"),
          description: "1",
        },
        {
          code: "P011",
          name: "P011",
          img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Earth_poster_large.jpg/800px-Earth_poster_large.jpg",
          startDate: dayjs().format("YYYY-MM-DD"),
          endDate: dayjs().add(1, "month").format("YYYY-MM-DD"),
          description:
            "0123456789 01234567890 123456789012345678901234567890 12345678901234567890123456789 012345678901234567890123456789012345678901234567890123456789" +
            " 01234567890123456789012345678901234567890123456789012345678901234567890123456 789012345678901234567890123456789012345678901234567890123456789" +
            " 01234567890123456789012345678901234567890123456789012345678901234567890123456 789012345678901234567890123 456789012345678901234567890123456789",
        },
      ];
    },
    rotateRight() {
      this.rotation += 90;
    },
    rotateLeft() {
      this.rotation -= 90;
    },
  },
};
</script>

<style>
</style>