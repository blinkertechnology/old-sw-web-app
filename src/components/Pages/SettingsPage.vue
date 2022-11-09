<template>
    <div>
        <kaiui-separator :title="$t('settings.changeLanguage')" />
        <kaiui-button 
            :title="$t('settings.changeLanguage')" 
            v-on:softCenter="onChangeLangauge" 
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

export default {
    mounted() {
        console.log(i18n.locale);
    },
    data: () => ({
        softkeysDialog: {
            left: i18n.t('cancel')
        },
        softkeysPhone: { 
            center: i18n.t('select') 
        },
        showLanguageSelectorDialog: false,
        selectedLanguage: 'en',
        supportedLanguages: {
            'en': 'English',
            'ur': 'Urdu',
            // '2': 'Nigerian',
            'af': 'Afrikaans',
            'vi': 'Vietnamese'
        }
    }),
    methods: {
        logout() {
            localStorage.removeItem("user_id");
            this.$router.push({ name: "login" });
        },

        onChangeLangauge() {
            this.showLanguageSelectorDialog = true;
        },

        onLanguageSelect() {
            this.showLanguageSelectorDialog = false;
            console.log(this.selectedLanguage);
        }
    }
}
</script>