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
        :title="$t('pages.makeTransaction.upload')" 
        v-on:softCenter="pickImage" 
        v-bind:softkeys="softkeysPhoneTwo" 
        v-on:softLeft="goback" 
      />
      <kaiui-button 
        :title="$t('pages.makeTransaction.scan')" 
        v-on:softCenter="openCam" 
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

      <img id="img1" src="" style="display:none" alt="qr code" />
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
      console.log('closeGasFeesDialog');
      console.log($event);

      this.gasFeesDialogShowing = false;
      this.gasFee = null;
    },

    acceptGasFees() {
      console.log('acceptGasFees');
      this.gasFeesDialogShowing = false;
    },

    /**
     * Show gas fees to the user
     */
    async getGasFees() {
      this.showLoading();

      try {
        const response = await this.$http.post(`wallet/${this.$route.params.id}/transact/fees`, {
          'pin': this.transaction.pincode,
          'amount': parseFloat(this.transaction.amount),
          'to': this.transaction.toAddress,
          ...(this.$route.params.token
							? { token: this.$route.params.token }
							: {}),
        });

        const { fees, wallet } = response.data;
        const { gasPrice, gas, value } = fees;

        this.gasFee = (gasPrice * gas) / 1000000000000000000;

        this.showDialog(i18n.t('pages.gasFees.title'), i18n.t('pages.gasFees.body', {
          gas: this.gasFee
        }), {
          left: i18n.t('cancel'),
          right: i18n.t('agree')
        }, () => this.gasFee = null, () => this.submit());
      } catch(err) {
        console.error(err);
        this.showDialog('Error', err.generic);
      } finally {
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

        this.showNotice('', 'Success', 'Your transaction was successful.');

        // Show complete animation, and redirect to transaction list
        this.transactionSuccess = true;
        setTimeout(() => {
          this.$router.push({
            name: "transactionslist",
            params: {
              id: this.$route.params.id,
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
        return this.showDialog('', 'Pincode Length shound be less than 7');
      } else if (pincode < 4) {
        return this.showDialog('', 'Pincode Length shound be greater than 3');
      }

      // Either calculate gas fees, or submit the transaction
      if(!this.gasFee) {
        console.log('Calculate gas fees');
        this.getGasFees();
      } else {
        console.log('Submit transaction');
        this.submitTransaction();
      }
    },

    openCam() {
      this.$router.push({
        name: "camera",
        params: { 
          id: this.$route.params.id,
          ...(this.$route.params.token ? { token: this.$route.params.token } : {})
        }
      });
    },

    pickImage() {
      const qr = new QrcodeDecoder();
      let activity = new window.MozActivity({
        name: 'pick',
        data: {
          type: 'image/jpeg' // The type could be image/*, image/jpeg, image/png, dongle/image
        }
      });

      this.launchActivity = true;
      let self = this;

      activity.onsuccess = function success() {
        this.showLoading();

        self.launchActivity = false;
        let blob = this.result.blob;
        if (blob) {
          // Scan QR Code
          const reader = new FileReader();
          reader.onloadend = function () {
            document.getElementById("img1").src = reader.result;
          }
          reader.readAsDataURL(blob);

          setTimeout(() => {
            const img1 = document.querySelector('#img1');
            (async () => {
              try {
                await qr.decodeFromImage(img1).then((res) => {
                  if (res.data === undefined) {
                    alert("No QR code found. Please upload again.");
                    this.hideLoading();
                  } else {
                    this.transaction.toAddress = res.data;
                    alert("QR Data readed successfully.")
                    this.hideLoading();
                  }
                }).catch((err) => {
                  alert("Something went wrong. Please try again later.");
                  this.hideLoading();
                })
              } catch (error) {
                return error;
              }
            })();
          }, 1500);

        } else {
          this.showNotice("", "Error", "Error scanning file.");
          this.hideLoading();
        }
      };
      activity.onerror = () => {
        // TODO
      };
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
