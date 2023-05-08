<template>
  <kaiui-content>
    <kaiui-header :title="$t('title')" />
  
    <div v-if="loader" class="loader">
      <img src="/assets/loader.gif" />
    </div>
    <div v-else>
      <div class="intro">
        <img src="/assets/icons/kaios_112.png" />
        <kaiui-text :text="$t('pages.homepage.intro.title')" />
        <kaiui-text :text="$t('pages.firstpage.choose')" />
        
      </div>
    </div>
    <div>
      <kaiui-radiogroup v-model="$i18n.locale">
        <kaiui-radiobutton
          v-for="(key, value) in supportedLanguages"
          :key="key"
          :value="value"
          :primaryText="key"
          v-on:softCenter="onLanguageSelect"
        />
      </kaiui-radiogroup>
    </div>
    <div>
      <kaiui-button
        :title="$t('ok')"
        v-on:softCenter="onSoftRight"
        v-bind:softkeys="softkeysPhone"
      />
    </div>
    <SoftKey :softkeys.sync="softkeys" v-on:softRight="onSoftRight" />
  </kaiui-content>
</template>

<script>
import SoftKey from "./SoftKey";
import i18n, { supportedLanguages } from "@/lang/setup";

export default {
  components: {
    SoftKey,
  },
  data: () => ({
    softkeys: {
      // left: i18n.t('register'),
      right: i18n.t("next"),
    },
    supportedLanguages: supportedLanguages,
    // showLanguageSelectorDialog: false,
  }),
  mounted() {
    this.$root.$on("close-dialog", () => {
      this.closeLanguageDialog();
    });
  },
  methods: {
    // onSoftLeft() {

    // },
    onSoftRight() {
      return this.$router.push({ name: "homepage" });
    },
    onLanguageSelect() {
      this.closeLanguageDialog();
      console.log("language selected is", this.selectedLanguage);
      this.$cookies.set("lang", i18n.locale);
      this.softkeys.right = i18n.t("next");
      // return this.$router.push({ name: "homepage" });
      // return this.$router.push({ name: "homepage" });
    },
  },
};
</script>

<style scoped>
.abc {
  overflow-y: scroll;
}
.intro {
  
  padding: 5px; 

  text-align: center;
}
.intro img {
  max-width: 100px;
}
.intro h1 {
  font-size: 1em;
  line-height: 1.5em;

  margin-bottom: 10px;
}
.intro h2 {
  font-size: 0.7em;
  font-weight: 300;
}
</style>
