import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    is_login: false,
    drawer: false,
    userInfo: "",
    currentOrder: null,
    lastOrder: [],
    listInvoice: [],
    listMember: [],
    listStockIn: [],
    listStockOut: [],
    listInvoiceStockPending: [],
    listInvoiceTemplate: [],
    cashierBillInfo: null,
  },
  mutations: {
    doLogin(state, data) {
      state.is_login = true;
      state.userInfo = data;
    },
    doLogout(state) {
      state.is_login = false;
      state.drawer = false;
      state.userInfo = "";
      state.currentOrder = null;
      state.lastOrder = [];
      state.listInvoice = [];
      state.listMember = [];
      state.listStockIn = [];
      state.listStockOut = [];
      state.listInvoiceStockPending = [];
      state.listInvoiceTemplate = [];
      state.cashierBillInfo = null;
    },
    changeDrawer(state, data) {
      state.drawer = data;
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
    addListMember(state, data) {
      state.listMember = data;
    },
    addListStockIn(state, data) {
      state.listStockIn = data;
    },
    addListStockOut(state, data) {
      state.listStockOut = data;
    },
    addListInvoiceStockPending(state, data) {
      state.listInvoiceStockPending = data;
    },
    updatePermission(state, data) {
      state.userInfo = data;
    },
    saveCashierBillInfo(state, data) {
      state.cashierBillInfo = data;
    }, 
    updateInvoiceTemplate(state, data) {
      state.listInvoiceTemplate = data;
    }, 
  },
  actions: {
  },
  modules: {
  },
  plugins: [new VuexPersistence().plugin]
})
