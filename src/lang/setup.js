import Vue from "vue";
import VueI18n from 'vue-i18n';

import en from './en.json';
import ur from './ur.json';
import vi from './vi.json';
import ha from './ha.json';
import fr from './fr.json';
import ar from './ar.json';
import es from './es.json';

Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        en,
        ha,
        ur,
        vi,
        fr,
        ar,
        es
    }
});

export const supportedLanguages = {
    'en': 'English',
    'ur': 'اردو',
    'ha': 'Hausa',
    'vi': 'Tiếng Việt',
    'fr': 'Français',
    'es': 'Español',
    'ar': 'عربي'
};
export default i18n;