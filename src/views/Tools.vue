<template>
  <div>
      <b-card>
            <b-tabs content-class="mt-3">
                <b-tab title="Permission">
                    <b-table :items="listPermission" :fields="headers" >
                        <template #cell(actions)="row" style="text-align: center;">
                            <span v-for="(option, index) in options" :key="option.id">
                                <input class="form-check-input" type="checkbox" name="inlineRadioOptions" :value="option.value" @change="selectAction(row, option)">
                                <label class="form-check-label">{{ option.text }}</label>
                                &nbsp;&nbsp;
                            </span>
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
          { name: 'Dashboard', selected: null },
          { name: 'Sale', selected: null },
          { name: 'Stock', selected: null },
          { name: 'Member', selected: null },
          { name: 'Off Promotion', selected: null },
          { name: 'Report', selected: null },
          { name: 'Tools', selected: null },
          { name: 'Audit', selected: null },
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
        // permission: {
        //     'r' : 0,
        //     'w' : 0,
        //     'e' : 0,
        //     'd' : 0,
        //     'i' : 0,
        //     'x' : 0,
        // },
        listSelectedPermission: {},
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
            this.setListMenuPermission(); //ดูว่ามี Menu อะไรให้เลือกบ้าง

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
        selectAction(rowMenu, checkPermission) {
            console.log("0", rowMenu.item.name, checkPermission.value);
            let s = {};
            console.log("s", s);
            this.listPermission.forEach(e => {
                if(e.name == rowMenu.item.name) {
                    s = e;
                }
            });
            console.log("s1", s.name, s.selected[checkPermission.value]);
            // console.log("s11", s.name, s.selected);
            s.selected[checkPermission.value] = s.selected[checkPermission.value] === 0? 1: 0;
            
            console.log("s2", s.name, s);
        },
        save() {
            console.log(this.listMenuPermission);
            /* 
                ดึง this.userInfo มาเพิ่ม key permission
            
            */
        },
    },
  }
</script>

<style>

</style>