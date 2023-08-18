<template>
    <kaiui-content>
      <kaiui-header :title="$t('title')" />

      <tabs :active-tab=defaultTab>
        <kaiui-tab-item :name="$t('pages.dashboard.myWallets')">
          <wallets-page />
        </kaiui-tab-item>

        <kaiui-tab-item :name="$t('pages.dashboard.contacts')">
          <contacts-page />
        </kaiui-tab-item>

        <kaiui-tab-item :name="$t('pages.dashboard.settings')">
          <settings-page />
        </kaiui-tab-item>

        <kaiui-tab-item :name="$t('pages.dashboard.faq')">
          <faq-page />
        </kaiui-tab-item>
      </tabs>
    </kaiui-content>
</template>

<script>
import SettingsPage from "@/components/Pages/SettingsPage.vue";
import FaqPage from "@/components/Pages/FAQPage.vue";
import ContactsPage from "@/components/Pages/ContactsPage.vue";
import WalletsPage from "@/components/Pages/WalletsPage.vue";

export default {
  components: {
    SettingsPage,
    FaqPage,
    ContactsPage,
    WalletsPage,
  },
  data: () => ({
    defaultTab: 0,
  }),
  mounted() {
    const { tab, success } = this.$route.query;

    this.defaultTab = tab || 0;

    /**
     * TODO: There shouldonly be a single component with <kaiui-content />, ideally in App.vue
     */
    if(success) {
      this.showNotice('', 'Success', success);
    }
  },
};
</script>