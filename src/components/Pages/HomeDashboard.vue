<template>
  <kaiui-content>
    <kaiui-header title="Sorted Wallet" />
    
    <div v-if="loader" class="loader">
      <img src="/assets/loader.gif" />
    </div>
    <kaiui-tabs v-else>
      <kaiui-tab-item :name="$t('dashboard.myWallets')" selected>
        <kaiui-button 
          id="wallets" 
          :title="$t('dashboard.myWallets')" 
          v-on:softCenter="myWallets" 
          v-bind:softkeys="softkeysPhone"
        />
      </kaiui-tab-item>
      <kaiui-tab-item :name="$t('dashboard.settings')">
        <settings-page />
      </kaiui-tab-item>
    </kaiui-tabs>
  </kaiui-content>
</template>

<script>
import i18n from '@/lang/setup';
import SettingsPage from '@/components/Pages/SettingsPage.vue';

export default {
  components: {
    SettingsPage
  },
  data: () => ({
    loader: true,
    softkeysPhone: { 
      center: i18n.t('select') 
    },
  }),
  methods: {
    myWallets() {
      this.$router.push({ name: "wallets" });
    },
  },
  created() {
    setTimeout(() => (this.loader = false), 1200);
    var userId = localStorage.getItem("user_id");
    if (userId === null) {
      this.$router.push({ name: "homepage" });
    }
  },
  mounted() {
    var userId = localStorage.getItem("user_id");
    console.log(userId);
  },
  updated() {
    document.getElementById("wallets").click();
  }
};
</script>
