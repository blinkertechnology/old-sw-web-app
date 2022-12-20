<template>
    <div>
        <div v-if="isDev">
            <kaiui-separator title="App info" />

            <kaiui-text 
                :text="`Environment: ${appEnv}`" />
            <kaiui-text 
                :text="`Version: ${appVersion}`" />
        </div>
        
        <kaiui-separator :title="$t('pages.settings.changeLanguage')" />
        <kaiui-button 
            :title="$t('pages.settings.changeLanguage')" 
            v-on:softCenter="openLanguageDialog" 
            v-bind:softkeys="softkeysPhone"
        />

        <kaiui-separator :title="$t('logout')" />
        <kaiui-button 
            :title="$t('logout')" 
            v-on:softCenter="logout" 
            v-bind:softkeys="softkeysPhone"
        />

        <kaiui-dialog
          :title="$t('select')"
          v-model="showLanguageSelectorDialog"
          :softkeys="softkeysDialog"
        >
            <kaiui-radiogroup v-model="$i18n.locale">
                <kaiui-radiobutton v-for="(key, value) in supportedLanguages" :key="key"
                    :value="value"
                    :primaryText="key"
                    v-on:softCenter="onLanguageSelect"
                />
            </kaiui-radiogroup>
        </kaiui-dialog>
    </div>
</template>

<script>
import i18n from '@/lang/setup';
import { logout } from '@/auth';

export default {
    data: () => ({
        showLanguageSelectorDialog: false,
        supportedLanguages: {
            'en': 'English',
            'ur': 'Urdu',
            // '2': 'Nigerian',
            'af': 'Afrikaans',
            'vi': 'Vietnamese'
        },

        isDev: process.env.VUE_APP_ENV === 'development' || process.env.VUE_APP_ENV === 'staging',
        appEnv: process.env.VUE_APP_ENV,
        appVersion: process.env.VUE_APP_VERSION,
    }),
    computed: {
        softkeysDialog: () => ({
            left: i18n.t('cancel')
        }),
        softkeysPhone: () => ({
            center: i18n.t('select') 
        })
    },
    mounted() {
        this.$root.$on('close-dialog', () => {
            this.closeLanguageDialog();
        });
    },
    methods: {
        async logout() {
            try {
                await this.$http.get('auth/logout');
            } catch(err) {
                console.error(err);
            } finally {
                logout();

                this.$router.push({ 
                    name: "homepage" 
                });
            }
        },

        openLanguageDialog() {
            this.showLanguageSelectorDialog = true;

            this.$root.$emit('dialog-opened');
        },
        closeLanguageDialog() {
            this.$root.$emit('dialog-closed');
            this.showLanguageSelectorDialog = false;
        },

        onLanguageSelect() {
            this.closeLanguageDialog();
            this.$cookies.set("lang", i18n.locale);
        }
    }
}
</script>