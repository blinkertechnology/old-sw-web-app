import Vue from "vue";
import VueI18n from 'vue-i18n';

import en from './en';
import ur from './ur';
import vi from './vi';
import ha from './ha';

Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        en,
        ha,
        ur,
        vi
    }
});

export const supportedLanguages = {
    'en': 'English',
    'ur': 'Urdu',
    'ha': 'Hausa',
    'vi': 'Vietnamese'
};
export default i18n;