<template>
  <div>
    <kaiui-content>
      <kaiui-header :title="$t('title')" />

      <tabs>
        <kaiui-tab-item :name="$t('pages.dashboard.myWallets')">
          <kaiui-separator :title="$t('pages.dashboard.myWallets')" />
          <list-item
            v-for="item in items"
            :key="item.id"

            :primaryText="$t(`wallets.${item.secretType.toLowerCase()}`)"
            :secondaryText="`Balance: ${item.balance.balance} ($US ${item.usd})`"

            :softkeys="softkeysPhone"
            v-on:softCenter="showOptionsDialog(item)"
          />
        </kaiui-tab-item>

        <kaiui-tab-item :name="$t('pages.dashboard.settings')">
          <settings-page />
        </kaiui-tab-item>

        <kaiui-tab-item :name="$t('pages.dashboard.faq')">
          <faq-page />
        </kaiui-tab-item>
      </tabs>

      <div class="ad-container" v-show="adShowing">
        <div class="ad-container__close">
          <kaiui-button 
            :title="$t('closeAd')"
            :softkeys="{
              center: $t('closeAd')
            }"
            v-on:softCenter="closeAd()"
          />
        </div>
        <div class="ad-container__ad"></div>
      </div>
    </kaiui-content>

    <kaiui-dialog
      :title="actionDialogTitle"
      v-model="showActionDialog"
      :softkeys="softkeysDialog"
      v-on:softLeft="closeDialogs"
    >
      <div v-if="showShareDialog">
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
      </div>

      <div v-if="showQRCodeDialog">
        <div v-if="selectedWallet" class="qrcode">
          <qr-code
            :size="180"
            :text="selectedWallet.address"
            style="display: block"
            class="m-auto"
          />
        </div>
      </div>

      <div v-if="!showShareDialog && !showQRCodeDialog">
        <list-item 
          :primaryText="$t('pages.dashboard.makeTransaction')"
          v-on:softCenter="toMakeTransaction"
          v-on:softLeft="closeDialogs"
        />
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
          :primaryText="$t('pages.dashboard.share')"
          v-on:softCenter="showShare"
          v-on:softLeft="closeDialogs"
        />
      </div>
    </kaiui-dialog>
  </div>
</template>

<script>
import i18n from '@/lang/setup';
import SettingsPage from '@/components/Pages/SettingsPage.vue';
import FaqPage from '@/components/Pages/FAQPage.vue';

const { Base64 } = require("js-base64");

export default {
  components: {
    SettingsPage,
    FaqPage,
  },
  data: () => ({
    adShowing: false,

    items: [],
    selectedWallet: null,

    showActionDialog: false,
    showQRCodeDialog: false,
    showShareDialog: false,
  }),
  computed: {
    actionDialogTitle() {
      if(this.showQRCodeDialog) {
        return i18n.t('pages.dashboard.qrCode');
      }
      if(this.showShareDialog) {
        return i18n.t('pages.dashboard.share');
      }
      return i18n.t('options')
    },

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
      this.showQRCodeDialog = false;
      this.showShareDialog = false;

      this.$root.$emit('dialog-opened');
    },

    closeDialogs() {
      if(this.showShareDialog) {        
        this.showShareDialog = false;
      } else if(this.showQRCodeDialog) {
        this.showQRCodeDialog = false;
      } else {
        this.showActionDialog = false;
        this.showQRCodeDialog = false;
        this.showShareDialog = false;
        this.selectedWallet = null;

        this.$root.$emit('dialog-closed');
      }
    },

    showQRCode() {
      this.showShareDialog = false;
      this.showActionDialog = true;
      this.showQRCodeDialog = true;

      this.$root.$emit('dialog-opened');
    },

    showShare() {
      this.showActionDialog = true;
      this.showShareDialog = true;
      this.showQRCodeDialog = false;

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
      this.showLoading();

      try {
        const response = await this.$http.get('wallets');
        const { data } = response;

        this.items = data.wallets || [];

        this.showAd();
      } catch(err) {
        this.showDialog(i18n.t('genericErrorTitle'), err.generic);
      } finally {
        this.hideLoading();
      }
    },

    showAd(timeout = 10 * 1000)  {
      // eslint-disable-next-line no-undef
      getKaiAd({
        publisher: process.env.VUE_APP_KAI_AD_PUBLISHER_ID,
        app: process.env.VUE_APP_KAI_AD_APP,
        slot: process.env.VUE_APP_KAI_AD_SLOT,
        test: parseInt(process.env.VUE_APP_KAI_AD_TEST),
        timeout,

        container: document.querySelector('.ad-container__ad'),

        h: 50,
        w: 240,

        onerror: err => {
          console.error(err);
          // this.showDialog('Ad error', err);
        },
        onready: ad => {
          this.adShowing = true;

          ad.call('display', {
            tabindex: 0,
            display: 'block'
          })
        }
      })
    },
    closeAd() {
      this.adShowing = false;
      
      this.$root.$emit("update-softkeys-unregister");
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

<style>
.ad-container {
  width: 100%;

  position: absolute;
  bottom: 30px;

  z-index: 9999;
}
  .ad-container__ad {
    height: 50px;
  }
  .ad-container__close {
    background-color: #cccccc;
  }
    .ad-container__close .kaiui-button {
      margin: 0 !important;
      background-color: transparent !important;
      min-height: auto !important;
    }
    .ad-container__close .kaiui-button .kaiui-button-title  {
      font-size: 12px;
      text-decoration: underline;
      text-align: right !important;
    }
    .ad-container__close .kaiui-button[nav-selected="true"] .kaiui-button-title  {
      color: #000 !important;
    }
</style>