<template>
  <div>
    <b-card>
      <b-tabs content-class="mt-3">
        <b-tab
          v-if="listMenu.find((name) => name == 'Permission')"
          title="Permission"
        >
          <v-data-table
            :headers="headersUser"
            :items="listUser"
            :search="search"
            sort-by="name"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>รายชื่อ User</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
                <v-dialog
                  v-model="dialog"
                  max-width="850px"
                  :retain-focus="false"
                  persistent
                >
                  <v-card
                    style="
                      background-color: white;
                      color: black;
                      width: 200vw;
                      height: auto;
                      margin: 0;
                    "
                  >
                    <v-card-text>
                      <v-container>
                        <b-table :items="listPermission" :fields="headers">
                          <template
                            #cell(actions)="row"
                            style="text-align: center"
                          >
                            <b-form-group v-slot="{ ariaDescribedby }">
                              <b-form-checkbox-group
                                id="checkbox-group-1"
                                style="display: flex"
                                v-model="row.item.selected"
                                :aria-describedby="ariaDescribedby"
                                name="flavour-1"
                              >
                                <b-form-checkbox
                                  :disabled="userRoles"
                                  v-for="(option, index) in options"
                                  :key="option.id"
                                  :value="option.value"
                                  >&nbsp;{{
                                    option.text
                                  }}&nbsp;&nbsp;</b-form-checkbox
                                >
                              </b-form-checkbox-group>
                              <v-subheader
                                style="padding-left: 0px"
                                v-if="
                                  row.item.menus.length !== 0 &&
                                  row.item.selected.length !== 0
                                "
                                >{{ $t("message.subMenu") }}</v-subheader
                              >
                              <b-form-checkbox-group
                                v-if="
                                  row.item.menus.length !== 0 &&
                                  row.item.selected.length !== 0
                                "
                                id="checkbox-group-2"
                                style="display: flex"
                                v-model="row.item.selectedMenu"
                                :aria-describedby="ariaDescribedby"
                                name="flavour-2"
                              >
                                <b-form-checkbox
                                  :disabled="userRoles"
                                  v-for="(menu, index) in row.item.menus"
                                  :key="menu.id"
                                  :value="menu.text"
                                  >&nbsp;{{
                                    menu.text
                                  }}&nbsp;&nbsp;</b-form-checkbox
                                >
                              </b-form-checkbox-group>
                            </b-form-group>
                          </template>
                        </b-table>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click.prevent="dialog = false"
                        >Cancel</v-btn
                      >
                      <v-btn
                        color="blue darken-1"
                        text
                        @click.prevent="savePermission()"
                        >Save</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)"
                >mdi-pencil</v-icon
              >
            </template>
          </v-data-table>
        </b-tab>
        <b-tab
          v-if="listMenu.find((name) => name == 'Shop Info')"
          title="Shop Info"
        >
          <b-card no-body v-if="shopInfo[0].shop_id == '' && overlay == false">
            <b-card-header
              ><v-icon>mdi-key-variant</v-icon> Purchase Code</b-card-header
            >
            <b-card-body class="text-center">
              <b-card-text>
                <b-row class="my-1">
                  <b-col sm="3"><label for="code">Code :</label></b-col>
                  <b-col sm="9"
                    ><b-form-input
                      id="code"
                      placeholder="Enter Code"
                    ></b-form-input
                  ></b-col>
                </b-row>
              </b-card-text>
              <b-button variant="primary" @click.prevent="getShopInfo()"
                >INSTALL KEY</b-button
              >
            </b-card-body>
          </b-card>
          <v-overlay
            :absolute="absolute"
            :opacity="opacity"
            :value="overlay"
            style="height: 100vh"
          >
            <b-card style="background-color: white; width: 50vw; margin: 0">
              <b-card-body class="text-right">
                <v-progress-linear
                  indeterminate
                  v-model="progressing"
                  height="25"
                  ><strong
                    >{{ Math.ceil(progressing) }}%</strong
                  ></v-progress-linear
                >
              </b-card-body>
            </b-card>
          </v-overlay>
          <b-card no-body v-if="shopInfo[0].install">
            <b-card-header
              ><v-icon>mdi-home-map-marker</v-icon> Shop ID:
              <b>{{ shopInfo[0].shop_id }}</b></b-card-header
            >
            <b-card-body class="text-right">
              <b-row>
                <b-col sm="3"><label for="shopName">Shop Name :</label></b-col>
                <b-col sm="3"
                  ><b-form-input
                    id="shopName"
                    readonly
                    v-model="shopInfo[0].shop"
                  ></b-form-input
                ></b-col>
                <b-col sm="3"
                  ><label for="brandName">Brand Name :</label></b-col
                >
                <b-col sm="3"
                  ><b-form-input
                    id="brandName"
                    readonly
                    v-model="shopInfo[0].brand"
                  ></b-form-input
                ></b-col>
              </b-row>
              <b-row>
                <b-col sm="3"><label for="shopAddress">Address :</label></b-col>
                <b-col sm="3"
                  ><b-form-input
                    id="shopAddress"
                    readonly
                    v-model="shopInfo[0].address"
                  ></b-form-input
                ></b-col>
                <b-col sm="3"><label for="shopArea">Area :</label></b-col>
                <b-col sm="3"
                  ><b-form-input
                    id="shopArea"
                    readonly
                    v-model="shopInfo[0].area"
                  ></b-form-input
                ></b-col>
              </b-row>
              <b-row>
                <b-col sm="3"
                  ><label for="shopDistrict">District :</label></b-col
                >
                <b-col sm="3"
                  ><b-form-input
                    id="shopDistrict"
                    readonly
                    v-model="shopInfo[0].district"
                  ></b-form-input
                ></b-col>
                <b-col sm="3"><label for="lease">Lease :</label></b-col>
                <b-col sm="3"
                  ><b-form-input
                    id="lease"
                    readonly
                    v-model="shopInfo[0].lease"
                  ></b-form-input
                ></b-col>
              </b-row>
              <b-row>
                <b-col sm="3"
                  ><label for="shopSubDistrict">Sub District :</label></b-col
                >
                <b-col sm="3"
                  ><b-form-input
                    id="shopSubDistrict"
                    readonly
                    v-model="shopInfo[0].sub_district"
                  ></b-form-input
                ></b-col>
                <b-col sm="3"><label for="shopZipcode">Zipcode :</label></b-col>
                <b-col sm="3"
                  ><b-form-input
                    id="shopZipcode"
                    readonly
                    v-model="shopInfo[0].zipcode"
                  ></b-form-input
                ></b-col>
              </b-row>
            </b-card-body>
          </b-card>
        </b-tab>
        <b-tab
          v-if="listMenu.find((name) => name == 'Test Equipment')"
          title="Test Equipment"
        >
          <b-row style="text-align: center">
            <b-col sm="3">
              <b-img
                center
                style="width: 150px"
                src="img/setting/etc.png"
              ></b-img>
            </b-col>
            <b-col sm="3">
              <b-img
                center
                style="width: 150px"
                src="img/setting/webcam.png"
              ></b-img>
            </b-col>
            <b-col sm="3">
              <b-img
                center
                style="width: 150px"
                src="img/setting/printer.png"
              ></b-img>
            </b-col>
            <b-col sm="3">
              <b-img
                center
                style="width: 150px"
                src="img/setting/fingerscan.png"
              ></b-img>
            </b-col>
          </b-row>
          <b-row style="text-align: center">
            <b-col sm="3">
              <b-button class="form-control" @click.prevent="selectEquip('edc')"
                >EDC</b-button
              >
            </b-col>
            <b-col sm="3">
              <b-button
                class="form-control"
                @click.prevent="selectEquip('webcam')"
                >WEB CAM</b-button
              >
            </b-col>
            <b-col sm="3">
              <b-button
                class="form-control"
                @click.prevent="selectEquip('printer')"
                >PRINTER</b-button
              >
            </b-col>
            <b-col sm="3">
              <b-button
                class="form-control"
                @click.prevent="selectEquip('fingerscan')"
                >FINGER SCAN</b-button
              >
            </b-col>
          </b-row>
          <v-dialog
            v-model="dialogIp"
            max-width="800px"
            :retain-focus="false"
            persistent
          >
            <v-card
              style="
                background-color: white;
                color: black;
                width: 200vw;
                height: auto;
                margin: 0;
              "
            >
              <b-card-header
                ><v-icon>mdi-server</v-icon> IP Address</b-card-header
              >
              <v-card-text>
                <v-container>
                  <b-form-input
                    v-model="ipAddress"
                    placeholder="Enter your IP Address"
                  ></b-form-input>
                </v-container>
                <v-container v-if="responseCheckEquip.length !== 0">
                  <v-card style="height: 200px; overflow-y: auto">
                    <v-card-text>
                      <li
                        v-for="(value, index) in responseCheckEquip"
                        :key="index"
                      >
                        {{ value }}
                      </li>
                    </v-card-text>
                  </v-card>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click.prevent="closeCheckStatus()"
                  >Cancel</v-btn
                >
                <v-btn
                  color="blue darken-1"
                  class="ma-2"
                  :loading="loadingStatus"
                  :disabled="loadingStatus"
                  text
                  @click.prevent="checkStatusEquip()"
                  >Send
                  <template v-slot:loader>
                    <span>Loading...</span>
                  </template>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </b-tab>
        <b-tab
          v-if="listMenu.find((name) => name == 'Update Data')"
          title="Update Data"
        >
          <v-data-table
            :headers="headersVersion"
            :items="lastestVersion"
            sort-by="type"
            class="elevation-1"
          >
            <template v-slot:item.index="{ item, index }">
              {{ index + 1 }}
            </template>
            <template v-slot:item.type="{ item }">
              {{ item.type }}({{ item.version }})
            </template>
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Updated Data</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon class="mr-2" @click.prevent="checkVersion(item)"
                >mdi-package-down</v-icon
              >
              <v-dialog
                v-model="dialogCheckVersion"
                max-width="800px"
                :retain-focus="false"
                persistent
              >
                <v-card
                  v-if="selectedUpdatedData == 'Code'"
                  style="
                    background-color: white;
                    color: black;
                    width: 200vw;
                    height: auto;
                    margin: 0;
                  "
                >
                  <v-card-title>Check Code Version</v-card-title>
                  <v-card-text>
                    <v-container>
                      <p>Version: {{ lastestVersionData.version }}</p>
                      <p>Updated at: {{ lastestVersionData.updated_at }}</p>
                      <p>Description:</p>
                      <li
                        v-for="(
                          value, index
                        ) in lastestVersionData.description.split(',')"
                        :key="index"
                      >
                        {{ value }}
                      </li>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click.prevent="dialogCheckVersion = false"
                      >Cancel</v-btn
                    >

                    <v-btn
                      color="blue darken-1"
                      v-if="matchedVersion !== false"
                      text
                      @click.prevent="updateVersion('Code')"
                      disabled
                      >Update</v-btn
                    >
                    <v-btn
                      color="blue darken-1"
                      v-else
                      text
                      @click.prevent="updateVersion('Code')"
                      >Update</v-btn
                    >
                  </v-card-actions>
                </v-card>

                <v-card
                  v-if="selectedUpdatedData == 'Promotion'"
                  style="
                    background-color: white;
                    color: black;
                    width: 200vw;
                    height: auto;
                    margin: 0;
                  "
                >
                  <v-card-title>Check Promotion Version</v-card-title>
                  <v-card-text>
                    <v-container>
                      <b-table
                        v-if="lastestPromotionData.length !== 0"
                        :items="lastestPromotionData"
                        :fields="headersPromotion"
                      >
                        <template #cell(name)="row" style="text-align: center">
                          {{ row.item.version }}
                        </template>
                        <template
                          #cell(actions)="row"
                          style="text-align: center"
                        >
                          <v-btn
                            color="blue darken-1"
                            text
                            @click.prevent="addPromo(row)"
                            >Update</v-btn
                          >
                        </template>
                      </b-table>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click.prevent="dialogCheckVersion = false"
                      >Cancel</v-btn
                    >

                    <v-btn
                      v-if="lastestPromotionData.length == 0"
                      color="blue darken-1"
                      text
                      @click.prevent="updateVersion('pro')"
                      disabled
                      >Update All Promotion</v-btn
                    >
                    <v-btn
                      v-else
                      color="blue darken-1"
                      text
                      @click.prevent="updateVersion('pro')"
                      >Update All Promotion</v-btn
                    >

                    <!--<v-btn v-if="lastestPromotionData.length == 0" color="blue darken-1" text @click.prevent="updatePromoVersion('list')" disabled>List Promo</v-btn>
                                        <v-btn v-else color="blue darken-1" text @click.prevent="updatePromoVersion('list')" >List Promo</v-btn> -->
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-overlay
                :absolute="absolute"
                :opacity="opacity"
                :value="overlay"
                style="height: 100vh"
              >
                <b-card style="background-color: white; width: 50vw; margin: 0">
                  <b-card-body class="text-right">
                    <v-progress-linear
                      indeterminate
                      v-model="progressing"
                      height="25"
                      ><strong
                        >{{ Math.ceil(progressing) }}%</strong
                      ></v-progress-linear
                    >
                  </b-card-body>
                </b-card>
              </v-overlay>
            </template>
          </v-data-table>
        </b-tab>
        <b-tab
          v-if="listMenu.find((name) => name == 'Hardware Logs')"
          title="Hardware Logs"
        >
          <v-data-table
            :headers="headersHardwareLogs"
            :items="hardwareLogsItems"
            sort-by="serialNo"
            sort-desc
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Hardware Logs</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-dialog
                  v-model="dialogAddHardware"
                  max-width="500px"
                  persistent
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary"
                      dark
                      class="mb-2"
                      v-bind="attrs"
                      v-on="on"
                      >New</v-btn
                    >
                  </template>

                  <v-card style="width: 200vw">
                    <b-form>
                      <v-card-title
                        style="background-color: #ffc478; color: #393e46"
                        >Add New Hardware</v-card-title
                      >
                      <v-card-text>
                        <label>Hardware Name</label>
                        <b-form-input
                          v-model="formHardwareInfo.hwName"
                          placeholder=""
                          required
                        ></b-form-input>

                        <label>Serial No</label>
                        <b-form-input
                          v-model="formHardwareInfo.serialNo"
                          placeholder=""
                          required
                        ></b-form-input>

                        <label>Brand</label>
                        <b-form-input
                          v-model="formHardwareInfo.brand"
                          placeholder=""
                          required
                        ></b-form-input>

                        <label>Group</label>
                        <!-- <b-form-input v-model="formHardwareInfo.group" placeholder="" required></b-form-input> -->
                        <v-select
                          style="text-align: center; height: 60px"
                          :items="optionsGroup"
                          v-model="formHardwareInfo.group"
                          dense
                          outlined
                        ></v-select>

                        <label>Spec</label>
                        <b-form-input
                          v-model="formHardwareInfo.spec"
                          placeholder=""
                          required
                        ></b-form-input>

                        <label>วันที่ทำรายการ</label>
                        <b-form-datepicker
                          id="example-datepicker"
                          v-model="formHardwareInfo.registerDate"
                          :locale="$i18n.locale"
                          required
                          class="mb-2"
                        ></b-form-datepicker>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click.prevent="dialogAddHardware = false"
                          >Cancel</v-btn
                        >
                        <v-btn
                          type="submit"
                          @click.prevent="saveHardwareInfo"
                          color="blue darken-1"
                          text
                          >Save</v-btn
                        >
                      </v-card-actions>
                    </b-form>
                  </v-card>
                </v-dialog>

                <v-dialog
                  v-model="dialogConfirmStatus"
                  style="height: 200vh"
                  persistent
                >
                  <v-card
                    style="
                      background-color: white;
                      color: black;
                      width: 50vw;
                      height: auto;
                      margin: 0;
                    "
                  >
                    <v-card-title class="text-h5"
                      >ต้องการ {{ displayHardware }} ใช่หรือไม่?</v-card-title
                    >
                    <v-card-text v-if="listDevice.length > 1">
                      <v-radio-group
                        v-if="selectedHardware.status"
                        v-model="selectedDevice"
                      >
                        กรุณาเลือก อุปกรณ์
                        <v-radio
                          v-for="device in listDevice"
                          :key="device.id"
                          :label="`${device.hwName} (${device.serialNo})`"
                          :value="device"
                        ></v-radio>
                      </v-radio-group>
                    </v-card-text>
                    <v-card-text v-else-if="listDevice.length == 1">
                      ระบบจะ {{ listDevice[0].status ? "ปิด" : "เปิด" }} ใช้งาน
                      {{ listDevice[0].hwName }} ({{ listDevice[0].serialNo }} )
                      อัตโนมัติ
                    </v-card-text>
                    <v-card-text v-else>
                      ไม่สามารถปิด อุปกรณ์นี้ได้ เนื่องจาก
                      ไม่มีอุปกรณ์อื่นมาใช้งานแทน
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click.prevent="dialogConfirmStatus = false"
                        >Cancel</v-btn
                      >
                      <v-btn
                        color="blue darken-1"
                        text
                        v-if="listDevice.length > 0"
                        @click.prevent="confirmHardwareStatus()"
                        >OK</v-btn
                      >
                      <v-btn
                        color="blue darken-1"
                        text
                        v-else
                        @click.prevent="confirmHardwareStatus()"
                        disabled
                        >OK</v-btn
                      >
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.status="{ item }">
              <v-icon small class="mr-2" v-if="item.status" style="color: green"
                >mdi-checkbox-blank-circle</v-icon
              >
              <v-icon small class="mr-2" v-else style="color: red"
                >mdi-checkbox-blank-circle</v-icon
              >
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon
                small
                class="mr-2"
                @click.prevent="changeHardwareStatus(item)"
                >mdi-pencil</v-icon
              >
            </template>
          </v-data-table>
        </b-tab>
        <b-tab
          v-if="listMenu.find((name) => name == 'User Tree')"
          title="User Tree"
        >
          <v-text-field
            v-model="searchUser"
            @change="defaultEmployee"
            append-icon="mdi-magnify"
            label="Search Ex.10001"
            clearable
            single-line
            clear-icon="mdi-close-circle-outline"
            hide-details
          ></v-text-field>
          <v-data-table
            style="margin-top: 10px"
            :headers="headersEmployee"
            :items="dataEmpArr"
            :expanded.sync="expanded"
            item-key="empId"
            show-expand
            class="elevation-1"
          >
            <template v-slot:item.empName="{ item }">
              {{ item.empName }}({{ item.children.length }})
            </template>
            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">
                <v-treeview :items="item.children"></v-treeview>
              </td>
            </template>
          </v-data-table>
        </b-tab>
        <b-tab v-if="listMenu.find((name) => name == 'Invoice Templates')" title="Invoice Templates">
          <v-data-table style="margin-top: 10px" :headers="headersInvoiceTemp" :items="listInvoiceTemp" item-key="id" class="elevation-1">
            <!-- <template v-slot:item.empName="{ item }">
              {{ item.empName }}({{ item.children.length }})
            </template> -->
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click.prevent="openDialogInvoiceTemp(item)">mdi-pencil</v-icon>
            </template>
          </v-data-table>
          <v-dialog v-model="dialogInvoiceTemp" max-width="500px" :retain-focus="false" persistent>
            <v-overlay :absolute="absolute" :value="overlayInvoiceTemp" responsive>
              <v-card class="mx-auto" max-width="300vw;" light>
                <v-card-title>
                  <b>Edit Invoice Templete</b>
                  <v-spacer></v-spacer>
                  <v-btn icon @click.prevent="dialogInvoiceTemp = false, overlayInvoiceTemp = false"><v-icon>mdi-close</v-icon></v-btn>
                </v-card-title>
                <v-card-text class="text--primary">
                  <v-row>
                    <v-col >
                        <ckeditor style="border: 1px grey solid; max-height: 240px;" :editor="editor" v-model="editorData" :config="editorConfig" @ready="onReady" ></ckeditor>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <p style="margin-bottom: 0px;">Header</p>
                      <div>
                        <v-tooltip top v-for="item in headChips" :key="item.id">
                          <template v-slot:activator="{ on, attrs }">
                            <v-chip class="ma-2" v-bind="attrs" v-on="on" outlined>{ {{ item }} }</v-chip>
                          </template>
                          <span>{{ item }}</span>
                        </v-tooltip>
                      </div>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <p style="margin-bottom: 0px;">Table</p>
                      <div>
                        <v-tooltip top v-for="item in tableChips" :key="item.id">
                          <template v-slot:activator="{ on, attrs }">
                            <v-chip class="ma-2" v-bind="attrs" v-on="on" outlined>{ {{ item }} }</v-chip>
                          </template>
                          <span>{{ item }}</span>
                        </v-tooltip>
                        </div>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn type="submit" color="success" text @click.prevent="saveInvoiceTemp()">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-overlay>
          </v-dialog>
        </b-tab>
        <!-- <b-tab title="Software Logs">
                </b-tab> -->
        <!-- <b-tab title="History">
                </b-tab> -->
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
// import axios from 'axios';
import dayjs from "dayjs";
import moment from "moment";

import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

const dtFormat = "MM-DD-YYYY";
const today = dayjs().format(dtFormat);

export default {
  data() {
    return {
      search: "",
      listMenu: [],
      listUserPermission: [],
      headers: [
        { key: "name", label: "Topic" },
        { key: "actions", label: "Actions" },
      ],
      headersPromotion: [
        { key: "name", label: "Promotion Name" },
        { key: "updated_at", label: `Updated at(${dtFormat})` },
        { key: "actions", label: "Actions" },
      ],
      headersHardwareLogs: [
        //   { value: 'hwId', text: 'Hardware Id' },
        { value: "hwName", text: "Hardware Name" },
        { value: "serialNo", text: "Serial Number" },
        { value: "brand", text: "Brand" },
        //   { value: 'shopId', text: 'Shop Id' },
        { value: "spec", text: "Spec" },
        { value: "group", text: "Hardware Group" },
        { value: "ipAddress", text: "Hardware IP" },
        { value: "registerDate", text: "Register Date" },
        { value: "expiredDate", text: "Expired Date" },
        { value: "status", text: "Status" },
        { value: "actions", text: "Actions" },
      ],
      headersInvoiceTemp: [
        { value: "name", text: "Title" },
        { value: "actions", text: "Actions" },
      ],
      listPermission: [],
      options: [
        { text: "Read", value: "r", selected: 0 },
        { text: "Write", value: "w", selected: 0 },
        { text: "Edit", value: "e", selected: 0 },
        { text: "Delete", value: "d", selected: 0 },
        { text: "Import", value: "i", selected: 0 },
        { text: "Export", value: "x", selected: 0 },
      ],
      userInfo: {},
      lKey: [],
      dialog: false,
      dialogIp: false,
      dialogCheckVersion: false,
      dialogAddHardware: false,
      dialogConfirmStatus: false,
      dialogInvoiceTemp: false,
      headersUser: [
        {
          text: "Name",
          align: "start",
          sortable: true,
          value: "name",
        },
        { text: "Roles", value: "roles" },
        { text: "Actions", value: "actions" },
      ],
      listUser: [
        {
          name: "AFrozen Yogurt",
          roles: ["Admin"],
        },
        {
          name: "BFrozen Yogurt",
          roles: ["User"],
        },
        {
          name: "CFrozen Yogurt",
          roles: ["User"],
        },
        {
          name: "DFrozen Yogurt",
          roles: ["User"],
        },
        {
          name: "EFrozen Yogurt",
          roles: ["Admin"],
        },
        {
          name: "FFrozen Yogurt",
          roles: ["Admin"],
        },
        {
          name: "GFrozen Yogurt",
          roles: ["Admin"],
        },
        {
          name: "HFrozen Yogurt",
          roles: ["Admin"],
        },
        {
          name: "IFrozen Yogurt",
          roles: ["Admin"],
        },
        {
          name: "JFrozen Yogurt",
          roles: ["Admin"],
        },
        {
          name: "KFrozen Yogurt",
          roles: ["Admin"],
        },
      ],
      editedIndex: -1,
      versionIndex: -1,
      userRoles: true,
      purchaseCode: "",
      progressing: 0,
      shopInfo: [
        {
          num: "",
          shop_id: "",
          shop: "",
          brand: "",
          address: "",
          district: "",
          sub_district: "",
          province: "",
          zipcode: "",
          area: "",
          lease: "",
          install: false,
        },
      ],
      absolute: true,
      opacity: 1,
      overlay: false,
      overlayInvoiceTemp: false,
      loadingStatus: false,
      responseCheckEquip: [],
      equipType: "",
      ipAddress: "",
      headersVersion: [
        { text: "No.", value: "index" },
        {
          text: "Type",
          align: "start",
          sortable: true,
          value: "type",
        },
        { text: `Lastest Date(${dtFormat})`, value: "updated_at" },
        { text: "Actions", value: "actions" },
      ],
      lastestVersion: [],
      selectedUpdatedData: "",
      currentVersionData: {},
      lastestVersionData: {},
      listPromotion: [],
      currentPromotionData: [],
      lastestPromotionData: [],
      matchedVersion: false,
      hardwareLogsItems: [],
      formHardwareInfo: {
        hwId: "",
        hwName: "",
        serialNo: Math.floor(Math.random() * 1000000000) + 1,
        brand: "",
        shopId: "",
        group: "EDC",
        ipAddress: "",
        spec: "",
        registerDate: dayjs().format("YYYY-MM-DD"),
        expiredDate: "",
        status: true,
      },
      displayHardware: "",
      selectedHardware: null,
      optionsGroup: [
        { value: "EDC", text: "EDC" },
        { value: "PRINTER", text: "PRINTER" },
        { value: "FINGERSCAN", text: "FINGERSCAN" },
        { value: "WEBCAM", text: "WEBCAM" },
      ],
      listDevice: [],
      selectedDevice: "",
      dataEmployee: [],
      searchUser: null,
      listEmployee: [],
      headersEmployee: [
        { text: "Employee ID", value: "empId" },
        { text: "Employee Name", value: "empName" },
        { text: "", value: "data-table-expand" },
      ],
      expanded: [],
      dataEmpArr: [],
      listInvoiceTemp: [],
      editor: DecoupledEditor,
      editorData: "",
      editorConfig: {
          // The configuration of the editor.
      },
      selectInvoice: "",
      headChips: [],
      tableChips: [],
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
      this.userRoles = this.userInfo.data.roles == "Admin" ? false : true;

      /* Default User Menu*/
      let userMenu = JSON.parse(this.userInfo.listUserPermission);
      for (let item of userMenu) {
        for (const [key, value] of Object.entries(item)) {
          if (key == this.$route.name && item.SubMenu !== undefined) {
            this.listMenu = item.SubMenu;
          }
        }
      }
      this.listMenu =
        this.listMenu.length !== 0
          ? this.listMenu
          : [
              "Permission",
              "Shop Info",
              "Test Equipment",
              "Update Data",
              "Hardware Logs",
              "User Tree",
              "Invoice Templates",
            ];

      this.listUser =
        this.$store.state.listUser.length == 0
          ? this.listUser
          : this.$store.state.listUser;
      this.setListUserToStore();
      this.getCurrentVersion();
      this.getHardwareInfo();
      this.getListInvoiceTemplate();
    }
  },
  methods: {
    onReady( editor )  {
        editor.ui.getEditableElement().parentElement.insertBefore(editor.ui.view.toolbar.element,editor.ui.getEditableElement());
    },
    defaultPermission() {
      this.listPermission = [
        { name: "Dashboard", menus: [], selectedMenu: [], selected: [] },
        {
          name: "Sale",
          menus: [{ text: "Sale", selected: 0 }],
          selectedMenu: [],
          selected: [],
        },
        {
          name: "Stock",
          menus: [
            { text: "Stock In", selected: 0 },
            { text: "Stock Out", selected: 0 }
          ],
          selectedMenu: [],
          selected: [],
        },
        {
          name: "Member Register",
          menus: [{ text: "Member", selected: 0 }],
          selectedMenu: [],
          selected: [],
        },
        { name: "Offer Promotion", menus: [
          { text: "Offer Promotion", selected: 0 }
        ], selectedMenu: [], selected: [] },
        {
          name: "Report",
          menus: [{ text: "Sale Bill", selected: 0 }],
          selectedMenu: [],
          selected: [],
        },
        {
          name: "Tools",
          menus: [
            { text: "Permission", selected: 0 },
            { text: "Shop Info", selected: 0 },
            { text: "Test Equipment", selected: 0 },
            { text: "Update Data", selected: 0 },
            { text: "Hardware Logs", selected: 0 },
            { text: "User Tree", selected: 0 },
            { text: "Invoice Templates", selected: 0 },
          ],
          selectedMenu: [],
          selected: [],
        },
        { name: "Audit", menus: [], selectedMenu: [], selected: [] },
      ];
    },
    setListUserToStore() {
      this.$store.commit("setListUser", this.listUser);
    },
    setListMenuPermission(data) {
      this.defaultPermission();
      this.listUserPermission =
        data.listUserPermission == undefined ? [] : data.listUserPermission;

      for (let item of this.listUserPermission) {
        for (const [key, value] of Object.entries(item)) {
          for (const [k, v] of Object.entries(value)) {
            for (let ele of this.listPermission) {
              if (ele.name == key) {
                if (v == 1) {
                  ele.selected.push(k);
                }
                ele.selectedMenu = item.SubMenu;
              }
            }
          }
        }
      }
    },
    savePermission() {
      for (let selectedItem of this.listPermission) {
        this.lKey = [];
        for (let item of this.listUserPermission) {
          for (const [key, value] of Object.entries(item)) {
            this.lKey.push(key);
          }
        }
        let selectedIndex = this.lKey.indexOf(selectedItem.name);
        if (selectedItem.selected.length == 0) {
          if (selectedIndex !== -1) {
            this.listUserPermission.splice(selectedIndex, 1);
          }
        } else {
          let permission = {
            r: 0,
            w: 0,
            e: 0,
            d: 0,
            i: 0,
            x: 0,
          };
          if (selectedIndex !== -1) {
            this.listUserPermission.splice(selectedIndex, 1);
          }
          let obj = {};
          obj[selectedItem.name] = permission;
          for (let opt of selectedItem.selected) {
            obj[selectedItem.name][opt] = 1;
          }
          obj["SubMenu"] = selectedItem.selectedMenu;
          this.listUserPermission.push(obj);
        }
      }
      this.listUser[this.editedIndex].listUserPermission =
        this.listUserPermission;
      this.$store.commit("setListUser", this.listUser); //save permission ในแต่ละเมนู

      this.userInfo.listUserPermission = JSON.stringify(
        this.listUserPermission
      );
      this.$store.commit("updatePermission", JSON.stringify(this.userInfo)); //save ข้อมูลใน User login

      this.dialog = false;
      this.$router.go();
    },
    editItem(item) {
      this.editedIndex = this.listUser.indexOf(item);
      this.setListMenuPermission(item);
      this.dialog = true;
    },
    closeCheckStatus() {
      this.loadingStatus = false;
      this.responseCheckEquip = [];
      this.dialogIp = false;
    },
    getShopInfo() {
      this.overlay = true;
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
        this.shopInfo.push({
          num: "1",
          shop_id: "7742",
          shop: "Central",
          brand: "Cute Press (Mega Bangna)",
          address: "999/9 Rama I Road",
          district: "Pathum Wan",
          sub_district: "Pathum Wan",
          province: "Bangkok",
          zipcode: "11111",
          area: "A",
          lease: "lease",
          install: true,
        });
        this.overlay = false;
      }, 10000);
    },
    selectEquip(type) {
      this.equipType = type;
      this.dialogIp = true;
      this.responseCheckEquip = [];
    },
    checkStatusEquip() {
      this.loadingStatus = true;
      let count = 0;
      this.responseCheckEquip = [];
      var result = setInterval(() => {
        count++;
        if (count >= 10) {
          clearInterval(result);
          this.loadingStatus = false;
        }
        this.responseCheckEquip.push(count);
      }, 1000);
    },
    getCurrentVersion() {
      this.currentPromotionData = [
        {
          type: "Promotion",
          version: "1.0",
          updated_at: dayjs("12-01-2021").format(dtFormat),
          description: "O0",
        },
        {
          type: "Promotion",
          version: "1.0",
          updated_at: today,
          description: "A1",
        },
        {
          type: "Promotion",
          version: "0.9",
          updated_at: dayjs("12-02-2021").format(dtFormat),
          description: "A1",
        },
        {
          type: "Promotion",
          version: "1.8",
          updated_at: dayjs("12-03-2021").format(dtFormat),
          description: "B2",
        },
        {
          type: "Promotion",
          version: "0.7",
          updated_at: dayjs("12-04-2021").format(dtFormat),
          description: "C3",
        },
        {
          type: "Promotion",
          version: "0.6",
          updated_at: dayjs("12-05-2021").format(dtFormat),
          description: "D4",
        },
      ];

      this.lastestVersion.push({
        type: "Code",
        version: "1.0",
        updated_at: dayjs("12-11-2021").format(dtFormat),
        description:
          "fix bug code1,change printer driver1,change printer driver1.1",
      });

      this.findLastestPromotion();
    },
    findLastestPromotion() {
      var maxProObj = this.currentPromotionData[0];

      for (let e of this.currentPromotionData) {
        if (new Date(e.updated_at) > new Date(maxProObj.updated_at)) {
          maxProObj = e;
        }
        if (new Date(e.updated_at) == new Date(maxProObj.updated_at)) {
          if (e.version > maxProObj.version) {
            maxProObj = e;
          }
        }
      }

      this.lastestVersion.push(maxProObj);

      this.lastestVersion.forEach((e) => {
        e.updated_at = dayjs(e.updated_at).format(dtFormat);
      });
    },
    checkVersion(item) {
      this.dialogCheckVersion = true;
      this.selectedUpdatedData = item.type;
      this.currentVersionData = item;
      this.getVersion();
      this.versionIndex = this.lastestVersion.indexOf(item);
    },
    getVersion() {
      if (this.selectedUpdatedData == "Code") {
        this.matchedVersion = false;
        this.lastestVersionData = {};

        //TODO: เรียก Api สำหรับ เช็ค version
        this.lastestVersionData = {
          type: "Code",
          version: "1.1",
          updated_at: dayjs().format(dtFormat),
          description: "fix bug code2,change printer driver2",
        };

        if (
          this.selectedUpdatedData == "Code" &&
          this.currentVersionData.version == this.lastestVersionData.version
        ) {
          this.matchedVersion = true;
          this.lastestVersionData = this.currentVersionData;
        }
      } else {
        //TODO: เรียก Api สำหรับ เช็ค version
        this.listPromotion = [
          {
            type: "Promotion",
            version: "1.0",
            updated_at: today,
            description: "A1",
          },
          {
            type: "Promotion",
            version: "1.2",
            updated_at: dayjs().add(1, "day"),
            description: "B2",
          },
          {
            type: "Promotion",
            version: "1.3",
            updated_at: dayjs().add(2, "day"),
            description: "C3",
          },
          {
            type: "Promotion",
            version: "1.4",
            updated_at: today,
            description: "D4",
          },
        ];

        this.checkCurrentPro();
      }
    },
    checkCurrentPro() {
      this.lastestPromotionData = [];
      for (let lPromo of this.listPromotion) {
        let checkCurrentPro = this.currentPromotionData.find(
          (ele) => dayjs(ele.updated_at).format(dtFormat) == dayjs(lPromo.updated_at).format(dtFormat) && ele.version == lPromo.version); //check pro ที่มีอยู่ก่อนแล้ว
        if (checkCurrentPro == undefined) {
          if (dayjs(lPromo.updated_at) >= dayjs(today)) {
            this.lastestPromotionData.push(lPromo);
          }
        }
      }

      this.lastestPromotionData.forEach((e) => {
        e.updated_at = dayjs(e.updated_at).format(dtFormat);
      });
    },
    addPromo(promo) {
      this.currentPromotionData.push(promo.item);
      this.checkCurrentPro();

      //แสดงข้อมูลล่าสุดในตารางหลัก
      this.lastestVersion.splice(this.versionIndex, 1);
      this.findLastestPromotion();
    },
    updateVersion(selectType) {
      this.lastestVersion.splice(this.versionIndex, 1);
      this.overlay = true;
      this.dialogCheckVersion = false;
      this.progressing = 1;

      if (selectType == "Code") {
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
          this.lastestVersion.push(this.lastestVersionData);
          this.overlay = false;
        }, 10000);
      } else {
        setTimeout(() => {
          this.progressing = 25;

          for (let lPromo of this.lastestPromotionData) {
            let checkCurrentPro = this.currentPromotionData.find(
              (ele) =>
                dayjs(ele.updated_at).format(dtFormat) ==
                  dayjs(lPromo.updated_at).format(dtFormat) &&
                ele.version == lPromo.version
            ); //check pro ที่มีอยู่ก่อนแล้ว
            if (checkCurrentPro == undefined) {
              if (dayjs(lPromo.updated_at) >= dayjs(today)) {
                this.currentPromotionData.push(lPromo);
              }
            }
          }
        }, 2000);
        setTimeout(() => {
          this.progressing = 50;

          this.checkCurrentPro();
        }, 5000);
        setTimeout(() => {
          this.progressing = 75;

          this.findLastestPromotion();
        }, 8000);
        setTimeout(() => {
          this.progressing = 100;
          this.overlay = false;

          console.log(this.currentPromotionData); //for debug
        }, 10000);
      }
    },
    getHardwareInfo() {
      this.hardwareLogsItems = [
        {
          hwId: 1,
          hwName: "Brothers",
          serialNo: Math.floor(Math.random() * 1000000000) + 1,
          brand: "op",
          shopId: 37,
          group: "PRINTER",
          ipAddress: "10.0.0.1",
          spec: "1.0",
          registerDate: dayjs().add(-2, "day").format(dtFormat),
          expiredDate: "",
          status: true,
        },
        {
          hwId: 2,
          hwName: "EDC",
          serialNo: Math.floor(Math.random() * 1000000000) + 1,
          brand: "op",
          shopId: 37,
          group: "EDC",
          ipAddress: "10.0.0.2",
          spec: "1.0",
          registerDate: dayjs().add(-2, "day").format(dtFormat),
          expiredDate: "",
          status: true,
        },
        {
          hwId: 3,
          hwName: "Beacon",
          serialNo: Math.floor(Math.random() * 1000000000) + 1,
          brand: "op",
          shopId: 37,
          group: "FINGERSCAN",
          ipAddress: "10.0.0.3",
          spec: "1.0",
          registerDate: dayjs().add(-2, "day").format(dtFormat),
          expiredDate: "",
          status: true,
        },
        {
          hwId: 4,
          hwName: "Logitech",
          serialNo: Math.floor(Math.random() * 1000000000) + 1,
          brand: "op",
          shopId: 37,
          group: "WEBCAM",
          ipAddress: "10.0.0.4",
          spec: "1.0",
          registerDate: dayjs().add(-2, "day").format(dtFormat),
          expiredDate: "",
          status: true,
        },
        {
          hwId: 5,
          hwName: "Logitech",
          serialNo: Math.floor(Math.random() * 1000000000) + 1,
          brand: "op",
          shopId: 37,
          group: "WEBCAM",
          ipAddress: "10.0.0.5",
          spec: "1.0",
          registerDate: dayjs().add(-2, "day").format(dtFormat),
          expiredDate: dayjs().format(dtFormat),
          status: false,
        },
        {
          hwId: 6,
          hwName: "Logitech",
          serialNo: Math.floor(Math.random() * 1000000000) + 1,
          brand: "op",
          shopId: 37,
          group: "WEBCAM",
          ipAddress: "10.0.0.6",
          spec: "1.0",
          registerDate: dayjs().add(-2, "day").format(dtFormat),
          expiredDate: dayjs().format(dtFormat),
          status: false,
        },
      ];
    },
    saveHardwareInfo() {
      var valid = true;
      valid = this.isValidation(this.formHardwareInfo, "hwName", valid);
      valid = this.isValidation(this.formHardwareInfo, "brand", valid);
      valid = this.isValidation(this.formHardwareInfo, "spec", valid);

      if (!valid) {
        alert("กรุณาใส่ข้อมูลให้ครบถ้วน");
      } else {
        this.formHardwareInfo.hwId = this.hardwareLogsItems.length + 1;
        this.formHardwareInfo.shopId = 37;
        this.formHardwareInfo.status = true;

        let checkEquip = this.hardwareLogsItems.find(
          (ele) => ele.group == this.formHardwareInfo.group
        );
        if (checkEquip !== undefined) {
          this.formHardwareInfo.group = checkEquip.group;
          this.formHardwareInfo.ipAddress = checkEquip.ipAddress;

          checkEquip.expiredDate = dayjs().format(dtFormat);
          checkEquip.status = false;
        }
        this.hardwareLogsItems.push(this.formHardwareInfo);
        this.dialogAddHardware = false;
      }
    },
    confirmHardwareStatus() {
      if (this.selectedHardware.status) {
        //ต้องการปิดอุปกรณ์
        if (this.listDevice.length > 1) {
          if (this.selectedDevice == "") {
            alert("กรุณาเลือกอุปกรณ์ที่ต้องการเปิดใช้งาน");
            return;
          } else {
            this.closeSelectDevice();
          }
        } else {
          this.selectedDevice = this.listDevice[0];
          this.closeSelectDevice();
        }
      } else {
        //ต้องการเปิดอุปกรณ์
        this.listDevice.forEach((e) => {
          e.status = false;
          e.expiredDate = dayjs().format(dtFormat);
        });
        this.selectedHardware.status = true;
      }
      this.dialogConfirmStatus = false;
    },
    closeSelectDevice() {
      this.selectedHardware.status = false;
      this.selectedHardware.expiredDate = dayjs().format(dtFormat);
      let checkEquip = this.hardwareLogsItems.find(
        (ele) =>
          ele.serialNo == this.selectedDevice.serialNo &&
          ele.hwName == this.selectedDevice.hwName
      );
      if (checkEquip !== undefined) {
        checkEquip.status = true;
      }
      this.selectedDevice = "";
    },
    changeHardwareStatus(item) {
      this.dialogConfirmStatus = true;
      this.selectedHardware = item;

      this.listDevice = [];
      this.hardwareLogsItems.forEach((e) => {
        if (e.group == item.group && e.serialNo !== item.serialNo) {
          this.listDevice.push(e);
        }
      });

      this.displayHardware = item.status ? "ปิด" : "เปิด";
      this.displayHardware += " " + `${item.hwName} (${item.serialNo})`;
    },
    defaultEmployee() {
      this.dataEmployee = [];
      this.dataEmpArr = [];
      if (this.searchUser.length >= 5) {
        this.dataEmployee = [
          {
            empId: "10001",
            empName: "test1 test1",
            empMember: "20001|20002|10001",
          },
          {
            empId: "10002",
            empName: "test2 test2",
            empMember: "10001|10002",
          },
          {
            empId: "10003",
            empName: "test3 test3",
            empMember: "10001|10003",
          },
          {
            empId: "10004",
            empName: "test4 test4",
            empMember: "10001|10002|10004",
          },
        ];
        let checkMember = this.dataEmployee.find(
          (ele) => this.searchUser == ele.empId
        );
        if (checkMember !== undefined) {
          this.generateDataToTreeFormat();
        } else {
          this.dataEmployee = [];
        }
      }
    },
    generateDataToTreeFormat() {
      this.dataEmployee.forEach((e) => {
        e.member = e.empMember.split("|");
        e.children = [];

        for (let el of e.member) {
          let checkMember = this.dataEmployee.find(
            (ele) => el == ele.empId && el !== e.member[e.member.length - 1]
          );
          if (checkMember !== undefined) {
            let obj = {};
            obj.name = e.empName;
            checkMember.children.push(obj);
          }
        }
      });
      let checkMember = this.dataEmployee.find(
        (ele) => this.searchUser == ele.empId
      );

      this.dataEmpArr = [checkMember];
    },
    getListInvoiceTemplate() {
      this.listInvoiceTemp = this.$store.state.listInvoiceTemplate.length == 0 ? 
        [{
          id: "1",
          name: "Sale Invoice",
          type: "sale",
          width: "70mm",
          meta: "",
        },
        {
          id: "2",
          name: "Purchase Invoice",
          type: "purchase",
          width: "70mm",
          meta: "",
        },
        // {
        //   id: "3",
        //   name: "Large Invoice",
        //   type: "",
        //   width: "140mm",
        //   meta: "",
        // },
        // {
        //   id: "4",
        //   name: "Large Vat Invoice",
        //   type: "",
        //   width: "140mm",
        //   meta: "",
        // },
        ] : this.$store.state.listInvoiceTemplate;
    },
    getInvoiceTemplate() {
      let checkListInvoiceTemplate = this.listInvoiceTemp.find(
        (ele) => ele.type == this.selectInvoice.type
      );
      if (checkListInvoiceTemplate !== undefined) {
        this.editorData = checkListInvoiceTemplate.meta;
      }
      if(this.selectInvoice.type == 'sale') {
        // this.editorData = `<table><tbody><tr><td><p style="text-align:center;"><span class="text-huge" style="color:rgba(0,0,0,0.87);"><strong>{ app_logo }</strong></span></p><p style="text-align:center;"><span class="text-huge"><strong>{app_name}</strong></span></p><p style="text-align:center;"><strong>SALES INVOICE</strong></p><p style="text-align:center;"><strong>{date} - {time}</strong></p><p><strong>Invoice ID: {invoice_id}</strong></p><p><strong>Sold To: {customer_name}</strong></p><p><strong>Sold By: {employee_name}</strong></p><p><strong>Phone: {phone_number}</strong></p><p><strong>Address: {address}</strong></p><p><strong>Note: {note}</strong></p></td></tr><tr><td><table><thead><tr><th><span style="color:rgb(33,37,41);"><strong>Price</strong></span></th><th><span style="color:rgb(33,37,41);"><strong>Qty</strong></span></th><th><span style="color:rgb(33,37,41);"><strong>Disc%</strong></span></th><th><span style="color:rgb(33,37,41);"><strong>Total</strong></span></th></tr></thead><tbody><tr><td colspan="4">{item_details}</td></tr><tr><td colspan="2" rowspan="1"><p>Subtotal</p><p>Tax</p><p>Discount</p><p>Total</p><p>Exchange</p></td><td colspan="2" rowspan="1"><p style="text-align:right;">{sub_total}</p><p style="text-align:right;">{tax}</p><p style="text-align:right;">{discount}</p><p style="text-align:right;">{total}</p><p style="text-align:right;">{exchange}</p></td></tr><tr><td colspan="4"><p>{payment_details}</p><p>{shipment_address}</p></td></tr></tbody></table></td></tr><tr><td><p style="text-align:center;">{barcode}</p></td></tr></tbody></table>`;

        this.headChips = ['app_logo','app_name','date','time','invoice_id','customer_name','employee_name','phone_number','address','note'];
        this.tableChips = ['item_details','sub_total','tax','discount','total','exchange','payment_details','shipment_address','barcode'];
      } 
      if(this.selectInvoice.type == 'purchase') {
        // this.editorData = `<table><tbody><tr><td><p style="text-align:center;"><span class="text-huge"><strong>{ app_logo }</strong></span></p><p style="text-align:center;"><span class="text-huge"><strong>{app_name}</strong></span></p><p style="text-align:center;"><strong>PURCHASE&nbsp;INVOICE</strong></p><p style="text-align:center;"><strong>{date} - {time}</strong></p><p><strong>Invoice ID: </strong>{invoice_id}</p><p><strong>Supplier: </strong>{supplier_name}</p><p><strong>Purchased By: </strong>{employee_name}</p></td></tr><tr><td><table><thead><tr><th><strong>Price</strong></th><th><strong>Qty</strong></th><th><strong>Disc%</strong></th><th><strong>Total</strong></th></tr></thead><tbody><tr><td colspan="4">{item_details}</td></tr><tr><td colspan="2" rowspan="1"><p>Subtotal</p><p>Tax</p><p>Discount</p><p>Total</p><p>Exchange</p></td><td colspan="2" rowspan="1"><p style="text-align:right;">{sub_total}</p><p style="text-align:right;">{tax}</p><p style="text-align:right;">{discount}</p><p style="text-align:right;">{total}</p><p style="text-align:right;">{exchange}</p></td></tr><tr><td colspan="4">{payment_details}</td></tr></tbody></table></td></tr><tr><td><p style="text-align:center;">{barcode}</p></td></tr></tbody></table>`;

        this.headChips = ['app_logo','app_name','table_name','supplier_name','date','time','invoice_id','customer_name','employee_name','phone_number','address','note'];
        this.tableChips = ['item_details','sub_total','tax','discount','total','exchange','payment_details','shipment_address','due','barcode'];
      }
    },
    openDialogInvoiceTemp(invoiceType) {
        this.dialogInvoiceTemp = true;
        this.overlayInvoiceTemp = true;

        this.selectInvoice = invoiceType;
        this.getInvoiceTemplate();
    },
    saveInvoiceTemp() {
      let checkListInvoiceTemplate = this.listInvoiceTemp.find(
        (ele) => ele.type == this.selectInvoice.type
      );
      if (checkListInvoiceTemplate !== undefined) {
        checkListInvoiceTemplate.meta = this.editorData;
      }
      this.$store.commit("updateInvoiceTemplate", this.listInvoiceTemp);
      this.dialogInvoiceTemp = false;
      this.overlayInvoiceTemp = false;
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
  },
};
</script>

<style>
.ck-content .text-tiny {
    font-size: 0.7em;
}

.ck-content .text-small {
    font-size: 0.85em;
}

.ck-content .text-big {
    font-size: 1.4em;
}

.ck-content .text-huge {
    font-size: 1.8em;
}
</style>