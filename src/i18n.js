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
      axios
        .get(process.env.VUE_APP_SERVER_API + "/get/locale")
        .then((res) => {
          var responses = res.data;
          for (const [key, value] of Object.entries(messages)) {
            for (let ii of responses) {
              if (key == ii.lang) {
                value.message[ii.key] = ii.msg;
              }
            }
          }
          resolve(messages);
        })
        .catch((err) => {
          console.log(err);
        });
  });
}

export default new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  silentTranslationWarn: true,
  messages: loadLocaleMessages()
})