import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import VueI18n from 'vue-i18n'
import i18n from '../i18n'
// import zhHans from 'vuetify/lib/locale/zh-Hans' //for set new lang
Vue.use(Vuetify);
Vue.use(VueI18n);

// console.log(JSON.stringify(zhHans));//for set new lang
export default new Vuetify({
    // theme: { light: true },
    lang: {
        t: (key, ...params) => i18n.t(key, params),
    },
});
