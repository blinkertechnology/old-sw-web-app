<template>
  <kaiui-content>
    <kaiui-header :title="$t('title')" />

    <kaiui-separator :title="$t('pages.makeTransaction.title')" />

    <div v-if="transactionSuccess" class="success-container">
      <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
        <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
        <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
      </svg>
    </div>

    <form method="POST">
      <kaiui-button 
        :title="$t('pages.makeTransaction.scanQR')" 
        v-on:softCenter="pickImage" 
        v-bind:softkeys="softkeysPhoneTwo" 
        v-on:softLeft="goback" 
      />
      <kaiui-button 
        :title="$t('pages.makeTransaction.selectContact')" 
        v-on:softCenter="selectContact" 
        v-bind:softkeys="softkeysPhoneTwo" 
        v-on:softLeft="goback" 
      />


      <custom-input
        type="text"
        :label="$t('pages.makeTransaction.destination')" 
        v-model="transaction.toAddress" 
        :placeholder="$t('pages.makeTransaction.destination')"
      />

      <custom-input
        type="text"
        digits-only
        :label="$t('pages.makeTransaction.amount')"
        :placeholder="$t('pages.makeTransaction.amount')" 
        v-model="transaction.amount" 
      />

      <custom-input 
        type="tel" 
        :label="$t('pages.makeTransaction.pin')" 
        v-model="transaction.pincode"
        :placeholder="$t('pages.makeTransaction.pin')" 
        pattern="[0-9]+" 
      />

      <kaiui-button 
        :title="$t('pages.makeTransaction.submit')" 
        v-bind:softkeys="softkeysPhoneTwo" 
        v-on:softCenter="submit" 
        v-on:softLeft="goback" 
      />
    </form>
    
    <SoftKey 
      :softkeys.sync="softkeys" 
      v-on:softLeft="goback" 
    />
  </kaiui-content>
</template>

<script>
import SoftKey from "../SoftKey";
import QrcodeDecoder from 'qrcode-decoder';
import i18n from '@/lang/setup';
import { normalizeAddress } from '@/lib/qr';

export default {
  props: ["walletdata"],
  components: {
    SoftKey
  },
  data() {
    return {      
      transaction: {
        amount: null,
        toAddress: null,
        pincode: null,
        image: null
      },
      softkeys: {
        left: i18n.t('back'),
      },
      softkeysPhoneTwo: {
        center: i18n.t('select'),
        left: i18n.t('back'),
      },

      transactionSuccess: false,
    };
  },
  methods: {
    goback() {
      this.$router.push({
        name: "dashboard",
      });
    },

    closeGasFeesDialog($event) {
      this.gasFeesDialogShowing = false;
      this.gasFee = null;
    },

    acceptGasFees() {
      this.gasFeesDialogShowing = false;
    },

    /**
     * Show gas fees to the user
     */
    async getGasFees() {
      this.showLoading();

      try {
        const response = await this.$http.post(`wallet/${this.$route.params.id}/transact/prepare`, {
          'pin': this.transaction.pincode,
          'amount': parseFloat(this.transaction.amount),
          'to': this.transaction.toAddress,
          ...(this.$route.params.token
							? { token: this.$route.params.token }
							: {}),
        });

        const { gas, token, show_fees } = response.data;

        if(!show_fees) {
          // No need to display gas fees to the user, ignore
          this.gasFee = -1000;
          this.submit();
          return;
        }

        if(!gas && show_fees) {
          throw new Error('Failed to calculate gas fees.')
        }

        this.gasFee = gas;

        this.hideLoading();

        this.showDialog(i18n.t('pages.gasFees.title'), i18n.t('pages.gasFees.body', {
          gas: gas,
          type: token
        }), {
          left: i18n.t('cancel'),
          right: i18n.t('agree')
        }, () => this.gasFee = null, () => this.submit());
      } catch(err) {
        console.error(err);
        this.showDialog('Error', err.generic);
        this.hideLoading();
      }
    },

    /**
     * Submit the transaction
     */
    async submitTransaction() {
      this.showLoading();

      try {
        const response = await this.$http.post(`wallet/${this.$route.params.id}/execute`, {
          'pin': this.transaction.pincode,
          'amount': parseFloat(this.transaction.amount),
          'to': this.transaction.toAddress,
          ...(this.$route.params.token
							? { token: this.$route.params.token }
							: {}),
        });
        const { transaction, wallet, saved_contact } = response.data;

        this.showNotice('', 'Success', 'Your transaction was successful.');

        // Show complete animation, and redirect to transaction list
        this.transactionSuccess = true;
        setTimeout(() => {
          this.$router.push({
            name: "transactionslist",
            params: {
              id: this.$route.params.id,
            },
            query: {
              ...(!saved_contact ? { requestSaveContact: this.transaction.toAddress } : {})
            }
          });
        }, 2000);
      } catch(err) {
        console.error(err);
        this.showDialog('Error', err.generic);
      } finally {
        this.hideLoading();
      }
    },

    async submit() {
      if(Number.isInteger(parseInt(this.transaction.amount)) !== true) {
        return this.showDialog('', 'Amount Need to be Numeric.');
      }
      if(this.transaction.toAddress === "") {
        return this.showDialog('', 'To Address Field Required.');
      }

      const pincode = this.transaction.pincode.length;
      if(pincode > 6) {
        return this.showDialog('', i18n.t('pages.makeTransaction.invalidPin'));
      } else if (pincode < 4) {
        return this.showDialog('', i18n.t('pages.makeTransaction.invalidPin'));
      }

      // Either calculate gas fees, or submit the transaction
      if(!this.gasFee) {
        this.getGasFees();
      } else {
        this.submitTransaction();
      }
    },

    selectContact() {
      this.$router.push({
        name: 'dashboard',
        query: {
          tab: 1,
          walletId: this.$route.params.id,
          ...(this.$route.params.token ? { walletToken: this.$route.params.token } : {})
        }
      })
    },

    async pickImage() {
      const vueCtx = this;

      const qr = new QrcodeDecoder();
      let activity = new window.MozActivity({
        name: 'pick',
        data: {
          type: 'image/*'
        }
      });

      try {
        vueCtx.showLoading();

        activity.onsuccess = async function() {
          const blob = this.result.blob;

          if(!blob) {
            vueCtx.hideLoading();
            vueCtx.showNotice('', i18n.t('genericErrorTitle'), i18n.t('genericError'));
          }

          const reader = new FileReader();
          reader.addEventListener('load', async function() {
            const res = await qr.decodeFromImage(reader.result);
            const { data } = res;

            if(!data) {
              vueCtx.showNotice('', '', i18n.t('pages.makeTransaction.scanFailed'));
            } else {
              vueCtx.transaction.toAddress = normalizeAddress(data);

              vueCtx.showNotice('', '', i18n.t('pages.makeTransaction.scanQRSuccess'));
            }

            vueCtx.hideLoading();
          });
          reader.readAsDataURL(blob);
        }

        activity.onerror = function() {
          vueCtx.hideLoading();
          vueCtx.showNotice('', i18n.t('genericErrorTitle'), i18n.t('genericError'));
        }
      } catch(err) {
        vueCtx.hideLoading();
        vueCtx.showNotice('', i18n.t('genericErrorTitle'), i18n.t('genericError'));
      }
    }
  },
  
  mounted() {
    const givenToAddress = this.$route.query.toAddress;
    if(givenToAddress) {
      this.transaction.toAddress = givenToAddress;
    }
  },
};
</script>

<style scoped>
.address {
  word-wrap: break-word;
  word-break: break-word;
  hyphens: auto;
}

.success-container {
  position: absolute;
  z-index: 9999;

  display: flex;
  align-items: center;
  justify-content: center;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background-color: #fff;
}

.checkmark {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: block;
  stroke-width: 2;
  stroke: #4bb71b;
  stroke-miterlimit: 10;
  box-shadow: inset 0px 0px 0px #4bb71b;
  animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both;
}

.checkmark__circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 2;
  stroke-miterlimit: 10;
  stroke: #4bb71b;
  fill: #fff;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;

}

.checkmark__check {
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
}

@keyframes stroke {
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes scale {

  0%,
  100% {
    transform: none;
  }

  50% {
    transform: scale3d(1.1, 1.1, 1);
  }
}

@keyframes fill {
  100% {
    box-shadow: inset 0px 0px 0px 30px #4bb71b;
  }
}
</style>
