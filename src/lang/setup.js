import Vue from "vue";
import VueI18n from 'vue-i18n';

import en from './en';
import af from './af';
import ur from './ur';
import vi from './vi';

Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        en,
        af,
        ur,
        vi
    }
})

export default i18n;