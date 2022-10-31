import Vue from "vue";
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: 'en',
    messages: {
        en: {
            select: 'Select',
            homepage: {
                title: 'Sorted Wallet - Home',
                login: 'Login',
                register: 'Register'
            }
        }
    }
})

export default i18n;