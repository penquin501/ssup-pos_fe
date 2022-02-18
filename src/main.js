import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import FlagIcon from 'vue-flag-icon';
import VueZoomer from 'vue-zoomer'
import CKEditor from '@ckeditor/ckeditor5-vue2';

import VueI18n from 'vue-i18n'
import i18n from './i18n'

import dayjs from "dayjs";
import moment from "moment";

import 'dayjs/locale/th'

Vue.config.productionTip = false
Vue.use(VueI18n)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(FlagIcon)
Vue.use(VueZoomer)
Vue.use(require('vue-shortkey'))
Vue.use( CKEditor );

new Vue({
  router,
  store,
  dayjs,
  moment,
  vuetify,
  i18n,
  render: function (h) { return h(App) }
}).$mount('#app')
