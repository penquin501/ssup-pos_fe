import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    is_login: false,
    userInfo: "",
    currentOrder: null,
    lastOrder: [],
    listInvoice: [],
    listUser: [],
    cashierBillInfo: null,
  },
  mutations: {
    doLogin(state, data) {
      state.is_login = true;
      state.userInfo = data;
    },
    doLogout(state) {
      state.is_login = false;
      state.userInfo = "";
      state.currentOrder = null;
      state.lastOrder = [];
      state.listInvoice = [];
      state.listUser = [];
      state.cashierBillInfo = null;
    },
    currentOrder(state, data) {
      state.currentOrder = data;
    },
    lastOrder(state, data) {
      state.lastOrder = data;
    },
    addListInvoice(state, data) {
      state.listInvoice = data;
    },
    updatePermission(state, data) {
      state.userInfo = data;
    },
    setListUser(state, data) {
      state.listUser = data;
    }, 
    saveCashierBillInfo(state, data) {
      state.cashierBillInfo = data;
    }, 
  },
  actions: {
  },
  modules: {
  },
  plugins: [new VuexPersistence().plugin]
})
