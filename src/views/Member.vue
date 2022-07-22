<!-- @format -->

<template>
  <div>
    <b-card>
      <b-tabs content-class="mt-3">
        <b-tab
          v-if="listMenu.find((name) => name == 'Member')"
          title="Member"
          active
        >
          <v-data-table
            :headers="headers"
            :items="listMember"
            :search="searchMember"
            sort-by="memberId"
            class="elevation-1"
          >
            <template v-slot:item.index="{ item, index }">
              {{ index + 1 }}
            </template>
            <template v-slot:item.memberName="{ item }">
              {{ item.firstName }} {{ item.lastName }}
            </template>
            <template v-slot:item.memberType="{ item }">
              {{ item.type == "1" ? "Type 1" : "Type 2" }}
            </template>
            <template v-slot:item.memberAddress="{ item }">
              {{ item.address }} {{ item.subDistrict }} {{ item.district }}
              {{ item.province }} {{ item.zipcode }}
            </template>
            <template v-slot:item.memberPhone="{ item }">
              {{ item.phone }}
            </template>
            <template v-slot:item.birthdayDate="{ item }">
              {{ item.birthday }}
            </template>
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>รายการสมาชิก</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="searchMember"
                  append-icon="mdi-magnify"
                  label="ใส่เลขรหัสสมาชิก"
                  single-line
                  hide-details
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click.prevent="openDialog('add')"
                  >สมัครสมาชิก</v-btn
                >
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="editMemberData(item)"
                >mdi-pencil</v-icon
              >
            </template>
          </v-data-table>
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
                  <v-btn color="warning" text @click.prevent="clearForm()"
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
      searchMember: "",
      today: dayjs().format("YYYY-MM-DD"),
      headers: [
        { text: "No.", value: "index" },
        { text: "Member Id", value: "memberId" },
        { text: "Name", sortable: true, value: "memberName" },
        { text: "Member Type", value: "memberType" },
        { text: "Address", value: "memberAddress" },
        { text: "Phone", value: "memberPhone" },
        { text: "Birthday Date", value: "birthdayDate" },
        { text: "Register Date", value: "registerDate" },
        { text: "Actions", value: "actions" },
      ],
      listMember: [],
      userInfo: {},
      paymentMethod: undefined,
      listMenu: [],
      absolute: true,
      dialogRegister: false,
      overlayRegister: false,
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
      url: process.env.VUE_APP_SERVER_API,
      configHeader: {},
      selectedProvince: "",
      selectedDistrict: "",
      selectedSubDistrict: "",
      actionForm: "",
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
      this.defaultMenu();
      this.configHeader = {
        headers: { Authorization: `Bearer ${this.userInfo.token}` },
      };
      this.getListMember();
    }
  },
  methods: {
    defaultMenu() {
      let userMenu = this.userInfo.roles;
      if (userMenu !== null) {
        for (let item of userMenu) {
          for (const [key, value] of Object.entries(item)) {
            if (key == this.$route.name && item.SubMenu !== undefined) {
              this.listMenu = item.SubMenu;
            }
          }
        }
      }
    },
    getListMember() {
      if (this.$store.state.listMember !== []) {
        this.listMember = this.$store.state.listMember;
      }
    },
    getProvinces() {
      this.provincesOptions = [];
      axios
        .get(this.url + "/address/provinces", this.configHeader)
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
    openDialog(action) {
      this.overlayRegister = true;
      this.dialogRegister = true;
      if (action == "add") {
        this.clearForm();
        this.getProvinces();
      }
      this.actionForm = action;
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
      valid = this.isValidation(
        this.selectedSubDistrict,
        "name_in_thai",
        valid
      );
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

          this.clearForm();
          this.dialogRegister = false;
          this.overlayRegister = false;
        }
      }
    },
    clearForm() {
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
    editMemberData(data) {
      this.openDialog("edit");
      this.formRegister = data;

      this.getProvinces();
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
  },
};
</script>

<style></style>
