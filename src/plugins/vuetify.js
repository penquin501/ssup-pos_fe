import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import VueI18n from 'vue-i18n';

Vue.use(Vuetify);
Vue.use(VueI18n);

const messages = {
    en: {
      $vuetify: {
        dataIterator: {
          rowsPerPageText: 'Items per page:',
          pageText: '{0}-{1} of {2}',
        },
      },
    },
    sv: {
      $vuetify: {
        dataIterator: {
          rowsPerPageText: 'Element per sida:',
          pageText: '{0}-{1} av {2}',
        },
      },
    },
  };
  const i18n = new VueI18n({
    locale: 'en', // set locale
    messages, // set locale messages
  })
  
export default new Vuetify({
    // lang: {
    //     t: (key, ...params) => i18n.t(key, params),
    //   },
    // lang: {
    //     // locales,
    //     current: settings.locale,
    //     t: (key, ...params) => i18n.t(key, params),
    //   },
});
