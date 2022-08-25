<template>
  <kaiui-content>
    <kaiui-header title="Sorted Wallet" />
    <kaiui-tab-item name="Make Transaction" selected>
      <kaiui-separator title="Make Transaction" />
      <div v-if="loading" class="loader">
        <img src="/assets/loader.gif" />
      </div>
      <div v-else>
        <form method="POST">
          <kaiui-button
            title="Upload Image (QR Code)"
            v-on:softCenter="pickImage"
          />
          <kaiui-button
            title="Scan QR (Wallet Address)"
            v-on:softCenter="openCam"
          />
          <div
            data-v-6860e009=""
            data-v-f9ff9db6=""
            class="kaiui-input kaiui-p_btn kaiui-input-input form-control"
            value=""
          >
          <label data-v-6860e009="" class="kaiui-p_sec kaiui-input-label">To Wallet</label>
            <input
              data-v-6860e009=""
              type="text"
              placeholder="To Address (try scan)"
              nav-selectable="true"
              class="kaiui-p_btn kaiui-input-input"
              nav-selected="true"
              id="nameofid"
              value=""
              v-model="transaction.toAddress"
            />
          </div>
          <kaiui-input
            type="number"
            label="Amount"
            class="kaiui-p_btn kaiui-input-input form-control"
            placeholder="Amount"
            v-model="transaction.amount"
          />
          <kaiui-input
            label="Pin Code"
            v-model="transaction.pincode"
            class="kaiui-p_btn kaiui-input-input form-control"
            placeholder="Pin Code"
          />
          <kaiui-button
            title="Submit"
            v-bind:softkeys="softkeysPhoneTwo"
            v-on:softCenter="submittransaction"
          />
          <img id="img1" src="" style="display:none" alt="qr code" />
        </form>
      </div>
      <kaiui-text text="" />
    </kaiui-tab-item>
    <SoftKey :softkeys.sync="softkeys" />
  </kaiui-content>
</template>

<script>
import SoftKey from "../SoftKey";
import QrcodeDecoder from 'qrcode-decoder';

export default {
  props: ["walletdata"],
  components: {
    SoftKey
  },
  data() {
    return {
      transaction: {
        amount: "",
        toAddress: "",
        pincode: "",
        image: ""
      },
      softkeys: {
        left: "Back",
        center: "",
        right: ""
      },
      recordExist: true,
      softkeysPhoneTwo: { center: "Select" },
      singlewallet: null,
      singlewalletId: null,
      loading: false
    };
  },
  methods: {
    submittransaction() {
      if (Number.isInteger(parseInt(this.transaction.amount)) !== true) {
        this.$toastr.e("Amount Need to be Numeric");
        return false;
      }
      if (this.transaction.toAddress === "") {
        this.$toastr.e("To Address Field Required");
        return false;
      }
      if (Number.isInteger(parseInt(this.transaction.pincode)) !== true) {
        this.$toastr.e("Numeric Pincode Field Required.");
        return false;
      }

      const pincode = this.transaction.pincode.length;
      if (pincode > 6) {
        this.$toastr.e("Pincode Length shound be less than 7");
        return false;
      } else if (pincode < 4) {
        this.$toastr.e("Pincode Length shound be greater than 3");
        return false;
      }

      var userId = localStorage.getItem("user_id").toString();
      let arr1 = this.transaction ? this.transaction : "";
      let arr2 = this.singlewallet;

      let xhr = new XMLHttpRequest();
      xhr.open("POST", process.env.VUE_APP_URL + "executetransaction", true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onreadystatechange  = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          const status = xhr.status;
          if (status === 0 || (status >= 200 && status < 400)) {
            // The request has been completed successfully
            const response = JSON.parse(xhr.responseText);
              //create Transaction Records
              this.loading = false;
              const params = {
                userid: userId,
                transHash: response.result.transactionHash,
                secrettype: this.singlewallet.secretType,
                address: this.singlewallet.address,
                amount: this.transaction.amount,
                wallet_to: this.transaction.toAddress
              };
              xhr.open("POST", process.env.VUE_APP_URL + "createtransaction", true);
              xhr.setRequestHeader("Content-Type", "application/json");
              xhr.send(JSON.stringify(params));

            this.isForm = false;
            this.$toastr.s("Your transaction was successful.");
            localStorage.removeItem("singlewalletdata");
            this.$router.push({
              name: "wallet",
              params: { id: this.$route.query.walletId }
            });
          }
        }
      }
      // Error Handling:
      xhr.onerror = function(error){
        this.receiveValue(error);
      }

      const obj1 = {
        "amount": this.transaction.amount,
        "toAddress": this.transaction.toAddress,
        "pincode": this.transaction.pincode,
      };
      const obj2 = {
        arr2
      };
      xhr.send(JSON.stringify([obj1, obj2.arr2]));
    },
    openCam() {
      this.$router.push({
        name: "camera",
        query: { walletId: this.$route.query.walletId }
      });
    },
    receiveValue(val) {
      this.$toastr.e(val[0].message);
      return false;
    },
    onKeyDown(event) {
      switch (event.key) {
        case "SoftLeft":
          return this.leftNext();
        default:
          break;
      }
    },
    leftNext() {
      this.$router.push({
        name: "wallet",
        params: { id: this.singlewalletId }
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
                  if(res.data === undefined) {
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
    this.singlewalletId = this.$route.query.walletId;
    const x = localStorage.getItem("singlewalletdata");
    const data = JSON.parse(x);
    this.singlewallet = data;
    if (this.walletdata !== undefined) {
      localStorage.setItem("singlewalletdata", JSON.stringify(this.walletdata));
    }
    const qrdata = this.$route.query.qrData;
    if (qrdata) {
      this.recordExist = false;
      this.transaction.toAddress = qrdata;

      setTimeout(() => {
        document.getElementById("nameofid").value = this.transaction.toAddress;
      }, 500);
    }
    document.addEventListener("keydown", this.onKeyDown);
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.onKeyDown);
  }
};
</script>

<style scoped>
.address {
  word-wrap: break-word;
  word-break: break-word;
  hyphens: auto;
}
</style>
