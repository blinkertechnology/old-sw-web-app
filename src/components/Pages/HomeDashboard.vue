<template>
  <div>
    <kaiui-content>
      <kaiui-header :title="$t('title')" />

      <div v-if="loading" class="loader">
        <img src="/assets/loader.gif" />
      </div>
      <kaiui-tabs v-else>
        <kaiui-tab-item :name="$t('pages.dashboard.myWallets')" selected>
          <kaiui-separator :title="$t('pages.dashboard.myWallets')" />
          <list-item
            v-for="item in items"
            :key="item.id"

            :primaryText="item.description"
            :secondaryText="`Balance: ${item.balance.balance} ($US ${item.usd})`"

            :softkeys="softkeysPhone"
            v-on:softCenter="showOptionsDialog(item)"
          />

          
        </kaiui-tab-item>
        <kaiui-tab-item :name="$t('pages.dashboard.settings')">
          <settings-page />
        </kaiui-tab-item>
      </kaiui-tabs>
    </kaiui-content>

    <kaiui-dialog
      :title="$t('back')"
      v-model="showActionDialog"
      :softkeys="softkeysDialog"
    >
      <list-item 
        :primaryText="$t('pages.dashboard.qrCode')"
        v-on:softCenter="showQRCode"
        v-on:softLeft="closeDialogs"
      />
      <list-item 
        :primaryText="$t('pages.dashboard.transactionRecords')"
        v-on:softCenter="toTransactionList"
        v-on:softLeft="closeDialogs"
      />
      <list-item 
        :primaryText="$t('pages.dashboard.makeTransaction')"
        v-on:softCenter="toMakeTransaction"
        v-on:softLeft="closeDialogs"
      />
      <list-item 
        :primaryText="$t('pages.dashboard.share')"
        v-on:softCenter="showShare"
        v-on:softLeft="closeDialogs"
      />
    </kaiui-dialog>

    <kaiui-dialog
      :title="$t('pages.dashboard.share')"
      v-model="showShareDialog"
      :softkeys="softkeysDialog"
      v-on:softLeft="closeDialogs"
    >
      <list-item 
        :primaryText="$t('pages.dashboard.shareEmail')"
        :softkeys="softkeysListItem"
        v-on:softCenter="shareViaEmail"
        v-on:softLeft="closeDialogs"
      />
      <list-item 
        :primaryText="$t('pages.dashboard.shareMessage')"
        :softkeys="softkeysListItem"
        v-on:softCenter="shareViaMessage"
        v-on:softLeft="closeDialogs"
      />
    </kaiui-dialog>

    <kaiui-dialog
      title="QR Code"
      v-model="showQRCodeDialog"
      :softkeys="softkeysDialog"
      v-on:softLeft="closeDialogs"
    >
      <div v-if="selectedWallet" class="qrcode">
          <qr-code
            :size="180"
            :text="selectedWallet.address"
            style="display: block"
            class="m-auto"
          />
      </div>
    </kaiui-dialog>
  </div>
</template>

<script>
import i18n from '@/lang/setup';
import SettingsPage from '@/components/Pages/SettingsPage.vue';
const { Base64 } = require("js-base64");

export default {
  components: {
    SettingsPage,
  },
  data: () => ({
    loading: true,
    items: [],
    selectedWallet: null,

    showActionDialog: false,
    showQRCodeDialog: false,
    showShareDialog: false,
  }),
  computed: {
    softkeysPhone: () => ({
      left: null,
      center: i18n.t('options')
    }),
    softkeysDialog: () => ({
      left: i18n.t('cancel'),
    }),
    softkeysListItem: () => ({
      left: i18n.t('cancel'),
      center: i18n.t('select'),
    }),
  },
  methods: {
    showOptionsDialog(wallet) {
      this.selectedWallet = wallet;
      this.showActionDialog = true;

      this.$root.$emit('dialog-opened');
    },

    closeDialogs() {    
      this.$root.$emit('dialog-closed');

      this.showActionDialog = false;
      this.showQRCodeDialog = false;
      this.showShareDialog = false;

      this.selectedWallet = null;
    },

    showQRCode() {
      this.showActionDialog = false;
      this.showQRCodeDialog = true;

      this.$root.$emit('dialog-opened');
    },

    showShare() {
      this.showActionDialog = false;
      this.showShareDialog = true;

      this.$root.$emit('dialog-opened');
    },

    backToDashboard() {
      this.$router.push({ name: "dashboard" });
    },

    toMakeTransaction() {
      this.$router.push({
        name: "maketransaction",
        params: { 
          id: this.selectedWallet.id,
        }
      });
    },
    toTransactionList() {
      this.$router.push({
        name: "transactionslist",
        params: { 
          id: this.selectedWallet.id,
        }
      });
    },

    shareViaEmail() {
      window.location.href = `mailto:?body=${this.selectedWallet.address}`;
    },
    shareViaMessage() {
      window.location.href = `sms:?body=${this.selectedWallet.address}`;
    },

    async getWallets() {
      this.loading = true;

      var user = JSON.parse(localStorage.getItem("user"));
      var identifierData = Base64.encode(`user=${user.id}`);

      try {
        const response = await this.$http.get('wallets');
        const { data } = response;

        this.items = data.wallets || [];
      } catch(err) {
        console.log(err);
        this.showNotice(i18n.t('error'), i18n.t('genericError'));
      } finally {
        this.loading = false;
      }
    }
  },
  mounted() {
    this.getWallets();

    this.$root.$on('close-dialog', () => {
      this.closeDialogs();
    });
  },
};
</script>

<style scoped>
.qrcode {
  display: flex;
  justify-content: center;

  margin-top: 10px;
  margin-bottom: 10px;
}

.qrcode img {
  width: 100%;
}
</style>
