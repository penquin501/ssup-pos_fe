<template>
  <div>
      <b-card>
            <b-tabs content-class="mt-3">
                <b-tab title="Permission">
                    <v-data-table :headers="headersUser" :items="listUser" :search="search" sort-by="name" class="elevation-1">
                        <template v-slot:top>
                        <v-toolbar flat>
                            <v-toolbar-title>รายชื่อ User</v-toolbar-title>
                            <v-divider class="mx-4" inset vertical></v-divider>
                            <v-spacer></v-spacer>
                            <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
                            <v-dialog v-model="dialog" max-width="800px" :retain-focus="false" persistent>
                                <v-card style="background-color: white; color: black; width: 200vw; height: auto; margin: 0;">
                                    <v-card-text>
                                        <v-container>
                                            <b-table :items="listPermission" :fields="headers" >
                                                <template #cell(actions)="row" style="text-align: center;">
                                                    <b-form-group v-slot="{ ariaDescribedby }">
                                                        <b-form-checkbox-group id="checkbox-group-2" style="display: flex;" v-model="row.item.selected" :aria-describedby="ariaDescribedby" name="flavour-2">
                                                            <b-form-checkbox :disabled="userRoles" v-for="(option, index) in options" :key="option.id" :value="option.value">{{ option.text }} &nbsp;&nbsp;</b-form-checkbox>
                                                        </b-form-checkbox-group>
                                                    </b-form-group>
                                                </template>
                                            </b-table>
                                        </v-container>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="blue darken-1" text @click.prevent="close()">Cancel</v-btn>
                                        <v-btn color="blue darken-1" text @click.prevent="savePermission()">Save</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                            <!-- <v-dialog v-model="dialogDelete" max-width="500px" persistent>
                                <v-card>
                                    <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                                        <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                                        <v-spacer></v-spacer>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog> -->
                            </v-toolbar>
                        </template>
                        <template v-slot:item.actions="{ item }">
                            <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
                        </template>
                    </v-data-table>

                </b-tab>
            </b-tabs>
      </b-card>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        search: "",
        listUserPermission: [],
        headers: [
          { key: 'name', label: 'Topic' },
          { key: 'actions', label: 'Actions' }
        ],
        listPermission: [
          { name: 'Dashboard', selected: [] },
          { name: 'Sale', selected: [] },
          { name: 'Stock', selected: [] },
          { name: 'Member Register', selected: [] },
          { name: 'Off Promotion', selected: [] },
          { name: 'Report', selected: [] },
          { name: 'Tools', selected: [] },
          { name: 'Audit', selected: [] },
        ],
        options: [
          { text: 'Read', value: 'r', selected: 0, },
          { text: 'Write', value: 'w', selected: 0, },
          { text: 'Edit', value: 'e', selected: 0, },
          { text: 'Delete', value: 'd', selected: 0, },
          { text: 'Import', value: 'i', selected: 0, },
          { text: 'Export', value: 'x', selected: 0, },
        ],
        userInfo: {},
        lKey: [],
        dialog: false,
        headersUser: [
            {
                text: 'Name',
                align: 'start',
                sortable: true,
                value: 'name',
            },
            { text: 'Roles', value: 'roles' },
            { text: 'Actions', value: 'actions' },
        ],
        listUser: [
            {
                name: 'AFrozen Yogurt',
                roles: ["Admin"],
            },
            {
                name: 'BFrozen Yogurt',
                roles: ["User"],
            },
            {
                name: 'CFrozen Yogurt',
                roles: ["User"],
            },
            {
                name: 'DFrozen Yogurt',
                roles: ["User"],
            },
            {
                name: 'EFrozen Yogurt',
                roles: ["Admin"],
            },
            {
                name: 'FFrozen Yogurt',
                roles: ["Admin"],
            },
            {
                name: 'GFrozen Yogurt',
                roles: ["Admin"],
            },
            {
                name: 'HFrozen Yogurt',
                roles: ["Admin"],
            },
            {
                name: 'IFrozen Yogurt',
                roles: ["Admin"],
            },
            {
                name: 'JFrozen Yogurt',
                roles: ["Admin"],
            },
            {
                name: 'KFrozen Yogurt',
                roles: ["Admin"],
            },
        ],
        editedIndex: -1,
        userRoles: true
      }
    },
    mounted: function () {
        if (this.$store.state.is_login == false) {
            this.$router.push({ name: "Home" }).catch((error) => {
                if (
                    error.name !== 'NavigationDuplicated' &&
                    !error.message.includes('Avoided redundant navigation to current location')
                ) {
                    console.log(error)
                }
            });
        } else {
            this.userInfo = JSON.parse(this.$store.state.userInfo);
            this.userRoles = this.userInfo.roles == "Admin" ? false: true;

            this.listUser = this.$store.state.listUser == undefined? this.listUser: this.$store.state.listUser;
        }
    },
    methods: {
        defaultPermission() {
            this.listPermission = [
                { name: 'Dashboard', selected: [] },
                { name: 'Sale', selected: [] },
                { name: 'Stock', selected: [] },
                { name: 'Member Register', selected: [] },
                { name: 'Off Promotion', selected: [] },
                { name: 'Report', selected: [] },
                { name: 'Tools', selected: [] },
                { name: 'Audit', selected: [] },
            ];
        },
        setListUserToStore() {
            this.$store.commit("setListUser", this.listUser);
        },
        setListMenuPermission(data) {
            this.defaultPermission();
            this.listUserPermission = data.listUserPermission == undefined ? []: data.listUserPermission;

            for(let item of this.listUserPermission) {
                for (const [key, value] of Object.entries(item)) {
                    for (const [k, v] of Object.entries(value)) {
                        for(let ele of this.listPermission) {
                            if(ele.name == key && v == 1) {
                                ele.selected.push(k);
                            }
                        }
                    }
                }
            }
        },
        savePermission() {
            for(let selectedItem of this.listPermission) {
                this.lKey = [];
                for(let item of this.listUserPermission) {
                    for (const [key, value] of Object.entries(item)) {
                        this.lKey.push(key);
                    }
                }
                let selectedIndex = this.lKey.indexOf(selectedItem.name);    

                if(selectedItem.selected.length == 0) {
                    if(selectedIndex !== -1) {
                        this.listUserPermission.splice(selectedIndex, 1);
                    }
                } else {
                    let permission = {
                        'r' : 0,
                        'w' : 0,
                        'e' : 0,
                        'd' : 0,
                        'i' : 0,
                        'x' : 0,
                    };
                    if(selectedIndex !== -1) {
                        this.listUserPermission.splice(selectedIndex, 1);
                    }
                    let obj = {};
                    obj[selectedItem.name] = permission;
                    for(let opt of selectedItem.selected) {
                        obj[selectedItem.name][opt] = 1;
                    }
                    this.listUserPermission.push(obj);
                }
            }
            this.listUser[this.editedIndex].listUserPermission = this.listUserPermission;
            this.$store.commit("setListUser", this.listUser); //save permission ในแต่ละเมนู

            this.userInfo.listUserPermission = this.listUserPermission; 
            this.$store.commit("updatePermission", JSON.stringify(this.userInfo)); //save ข้อมูลใน User login

            this.dialog = false;
        },
        editItem (item) {
            this.editedIndex = this.listUser.indexOf(item);
            this.setListMenuPermission(item);
            this.dialog = true;
        },
        close () {
            this.dialog = false;
        },
    },
  }
</script>

<style>

</style>