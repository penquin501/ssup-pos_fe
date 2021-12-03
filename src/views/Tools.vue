<template>
  <div>
      <b-card>
            <b-tabs content-class="mt-3">
                <b-tab title="Permission">
                    <b-table :items="listPermission" :fields="headers" >
                        <template #cell(actions)="row" style="text-align: center;">
                            <b-form-group v-slot="{ ariaDescribedby }">
                                <b-form-checkbox-group id="checkbox-group-2" style="display: flex;" v-model="row.item.selected" :aria-describedby="ariaDescribedby" name="flavour-2">
                                    <b-form-checkbox  v-for="(option, index) in options" :key="option.id" :value="option.value">{{ option.text }} &nbsp;&nbsp;</b-form-checkbox>
                                </b-form-checkbox-group>
                            </b-form-group>
                            {{ row.item.selected }}
                        </template>
                    </b-table>
                    <b-btn @click.prevent="save()">Save</b-btn>
                </b-tab>
            </b-tabs>
      </b-card>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        listUserPermission: [
            {"Dashboard":{"r":1,"w":0,"e":0,"d":0,"i":0,"x":0}},
            {"Sale":{"r":1,"w":0,"e":0,"d":0,"i":0,"x":0}}
        ],
        headers: [
          { key: 'name', label: 'Topic' },
          { key: 'actions', label: 'Actions' }
        ],
        listPermission: [
          { name: 'Dashboard', selected: [] },
          { name: 'Sale', selected: [] },
          { name: 'Stock', selected: [] },
          { name: 'Member', selected: [] },
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
        permission: {
            'r' : 0,
            'w' : 0,
            'e' : 0,
            'd' : 0,
            'i' : 0,
            'x' : 0,
        },
        listSelectedPermission: [],
        lKey: [],
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
            // this.setListMenuPermission(); //ดูว่ามี Menu อะไรให้เลือกบ้าง

            /* 
                TODO: เช็คว่า user มีข้อมูลส่วนนี้แล้วหรือยัง 
                ถ้ายังไม่มี set ใหม่ 
                ถ้ามีแล้ว ให้เอา ข้อมูลของ user มาเช็คเข้ากับ list menu เบื้องต้น
            */
        }
    },
    methods: {
        setListMenuPermission() {
            let permission = {
                'r' : 0,
                'w' : 0,
                'e' : 0,
                'd' : 0,
                'i' : 0,
                'x' : 0,
            };
            this.listPermission.forEach(e => {
                e.selected = permission;
            }); 
        },
        save() {
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
            console.log("listUserPermission", this.listUserPermission);
            /* 
                ดึง this.userInfo มาเพิ่ม key permission
            */
        },
    },
  }
</script>

<style>

</style>