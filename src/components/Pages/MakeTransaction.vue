<template>
  <kaiui-content>
    <kaiui-header :title="$t('title')" />

    <kaiui-separator title="Make Transaction" />

    <div v-if="transactionSuccess" class="success-container">
      <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
        <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
        <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
      </svg>
    </div>

    <div v-if="loading" class="loader">
      <img src="/assets/loader.gif" />
    </div>
    <div v-else>
      <form method="POST">
        <kaiui-button title="Upload Image (QR Code)" v-on:softCenter="pickImage" />
        <kaiui-button title="Scan QR (Wallet Address)" v-on:softCenter="openCam" />
        <div class="kaiui-input kaiui-p_btn kaiui-input-input form-control">
          <label class="kaiui-p_sec kaiui-input-label">To Wallet</label>
          <input type="text" placeholder="To Address (try scan)" nav-selectable="true"
            class="kaiui-p_btn kaiui-input-input" nav-selected="true" id="nameofid" value=""
            v-model="transaction.toAddress" />
        </div>
        <custom-input type="tel" label="Amount" class="kaiui-p_btn kaiui-input-input form-control"
          placeholder="Amount" v-model="transaction.amount" />
        <custom-input type="tel" label="Pin Code" v-model="transaction.pincode"
          class="kaiui-p_btn kaiui-input-input form-control" placeholder="Pin Code" pattern="[0-9]+" />
        <kaiui-button title="Submit" v-bind:softkeys="softkeysPhoneTwo" v-on:softCenter="submit" />
        <img id="img1" src="" style="display:none" alt="qr code" />
      </form>
    </div>
    
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
        center: i18n.t('select')
      },

      loading: false,
      transactionSuccess: false,
    };
  },
  methods: {
    goback() {
      this.$router.push({
        name: "dashboard",
      });
    },

    async submit() {
      if (Number.isInteger(parseInt(this.transaction.amount)) !== true) {
        this.showNotice("", "Amount Need to be Numeric.");
        return false;
      }
      if (this.transaction.toAddress === "") {
        this.showNotice("", "Error", "To Address Field Required.");
        return false;
      }
      if (Number.isInteger(parseInt(this.transaction.pincode)) !== true) {
        this.showNotice("", "Error", "Numeric Pincode Field Required.");
        return false;
      }

      const pincode = this.transaction.pincode.length;
      if (pincode > 6) {
        this.showNotice('', 'Error', "Pincode Length shound be less than 7");
        return false;
      } else if (pincode < 4) {
        this.showNotice("", "Error", "Pincode Length shound be greater than 3");
        return false;
      }

      this.loading = true;

      try {
        const response = await this.$http.post(`wallet/${this.$route.params.id}/execute`, {
          'pin': this.transaction.pincode,
          'amount': parseFloat(this.transaction.amount),
          'to': this.transaction.toAddress
        });

        this.showNotice('', 'Success', 'Your transaction was successful.');

        this.transactionSuccess = true;
        setTimeout(() => {
          this.$router.push({
            name: "transactionslist",
            params: {
              id: this.$route.params.id,
            }
          });
        }, 2000);
      } catch (err) {
        console.log(err);
        this.showNotice("", "Error", err);
      } finally {
        this.loading = false;
      }
    },

    openCam() {
      this.$router.push({
        name: "camera",
        params: { 
          id: this.$route.params.id,
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
        this.loading = true;
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
                    this.loading = false;
                  } else {
                    document.getElementById("nameofid").value = res.data
                    alert("QR Data readed successfully.")
                    this.loading = false
                  }
                }).catch((err) => {
                  alert("Something went wrong. Please try again later.");
                  this.loading = false;
                })
              } catch (error) {
                return error;
              }
            })();
          }, 1500);

        } else {
          this.$toastr.s("Error scanning file.");
          this.loading = false;
        }
      };
      activity.onerror = () => {
        // TODO
      };
    }
  },
  mounted() {
    console.log('MakeTransaction.mounted');
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
