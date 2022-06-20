import Vue from 'vue'
import VueI18n from 'vue-i18n'
import axios from "axios";

Vue.use(VueI18n)

function loadLocaleMessages () {
  const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages = {}
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales(key)
    }
  })
  getLocaleApi(messages);
  return messages;
}

function getLocaleApi(messages) {
  return new Promise(function (resolve, reject) {
    if(localStorage.getItem('vuex') !== null) {
      let getVuex = localStorage.getItem('vuex');
      var decodedVuex = JSON.parse(getVuex);
      let userInfo = JSON.parse(decodedVuex.userInfo);
      axios
        .get(process.env.VUE_APP_SERVER_API + "/get/locale?brand_id="+ userInfo.data.brand_id)
        .then((res) => {
          var responses = JSON.stringify(res.data);
          var decoded = JSON.parse(responses);

          for (const [key, value] of Object.entries(messages)) {
            for (const [lang, pages] of Object.entries(decoded)) {
              if (key == lang) {
                for(const [page, v] of Object.entries(pages)) {
                  let component = {};
                  for(let a of v) {
                    component[Object.keys(a)] = String(Object.values(a));
                  }
                  value.message[page] = component;
                }
              }
            }
          }
          resolve(messages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      resolve(messages);
    }
  });
}

export default new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  silentTranslationWarn: true,
  messages: loadLocaleMessages()
})