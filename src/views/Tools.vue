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
            this.listUserPermission = this.userInfo.listUserPermission == undefined ? []: this.userInfo.listUserPermission;

            this.setListMenuPermission();
        }
    },
    methods: {
        setListMenuPermission() {
            for(let item of this.listUserPermission) {
                for (const [key, value] of Object.entries(item)) {
                    for (const [k, v] of Object.entries(value)) {
                        for(let ele of this.listPermission) {
                            if(ele.name == key && v==1) {
                                ele.selected.push(k);
                            }
                        }
                    }
                }
            }
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

            this.userInfo.listUserPermission = this.listUserPermission;
            this.$store.commit("updatePermission", JSON.stringify(this.userInfo));
        },
    },
  }
</script>

<style>

</style>