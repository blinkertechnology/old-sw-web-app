<template>
  <kaiui-content>
    <kaiui-header title="Sorted Wallet" />
    <kaiui-tab-item name="Wallet Details" selected>
      <div v-if="loading" class="loader">
        <img src="/assets/loader.gif" />
      </div>
      <div v-else>
        <ul class="demo" nav-selectable="true">
          <li>
            Token :
            <b>{{
              singlewallet
                ? singlewallet.secretType.charAt(0).toUpperCase() +
                  singlewallet.secretType.slice(1).toLowerCase()
                : ""
            }}</b>
          </li>
          <li>
            Description :
            <b>{{ singlewallet ? singlewallet.description : "" }}</b>
          </li>
          <li>
            Wallet Balance :
            <b>{{ singlewallet ? singlewallet.balance.balance : "" }}</b>
          </li>
          <li>
            USD Balance:
            <b>{{ singlewallet && singlewallet.secretType === "MATIC" ? singlewallet.calculatedMatic : singlewallet.calculatedBtc  }}</b>
          </li>
          <li>Address :</li>
          <li class="address">
            <b>{{ singlewallet ? singlewallet.address : "" }}</b>
          </li>
         
        </ul>
        <div class="card-body">
          <kaiui-button
            title="Wallet QR Code"
            v-bind:softkeys="softkeysPhone"
            v-on:softCenter="phoneButtonSoftCenterClicked"
            id="clickhere"
          />
          <div class="managestuff" v-show="isShow">
            <qr-code
              :size="180"
              :text="qraddress"
              style="display: block"
              class="qraddressclass m-auto"
            ></qr-code>
          </div>
          <kaiui-button
            title="Transaction Records"
            v-bind:softkeys="softkeysPhone"
            v-on:softCenter="softkeysRightBack"
            id="singlewalletbutton"
          />
          <kaiui-button
            title="Make Transaction"
            v-bind:softkeys="softkeysPhoneTransaction"
            v-on:softCenter="phoneButtonShowTransaction"
          />
          <kaiui-button
            title="Back"
            v-bind:softkeys="softkeysLeft"
            v-on:softCenter="softkeysLeftBack"
          />
          <SoftKey :softkeys.sync="softkeys" />
        </div>
      </div>
    </kaiui-tab-item>
  </kaiui-content>
</template>

<script>
import _ from "lodash";
const { Base64 } = require("js-base64");
import SoftKey from "../SoftKey";

export default {
  components: {
    SoftKey
  },
  data() {
    return {
      singlewallet: null,
      isShow: false,
      softkeysPhone: { center: "View" },
      softkeysLeft: { center: "ok" },
      qraddress: "",
      loading: true,
      items: null,
      softkeys: {
        left: "Previous",
        center: "",
        right: "Next"
      },
      softkeysPhoneTransaction: {
        center: "Proceed"
      },
      usdValue: null,
      walletBalance: null,
    };
  },
  methods: {
    softkeysLeftprevious() {
      this.loading = true;
      this.fetchWalletIds();
      var num = this.items.findIndex(
        (element) => element.id === this.$route.params.id
      );
      const indexPrevnum = num - 1;
      if (indexPrevnum >= 0) {
        this.$router.push({
          name: "wallet",
          params: { id: this.items[indexPrevnum].id }
        });
        this.$router.go();
      }
    },
    softkeysRightNext() {
      this.loading = true;
      this.fetchWalletIds();
      var num = this.items.findIndex(
        (element) => element.id === this.$route.params.id
      );
      const indexPrevnum = num + 1;
      if (indexPrevnum <= this.items.length) {
        this.$router.push({
          name: "wallet",
          params: { id: this.items[indexPrevnum].id }
        });
        this.$router.go();
      }
    },
    phoneButtonSoftCenterClicked() {
      this.isShow = true;
      const qr = document.querySelector(".qraddressclass");
      qr.setAttribute("nav-selectable", "true");

      setTimeout(() => {
        let pageBottom = document.querySelector("#clickhere");
        pageBottom.scrollIntoView({ behavior: "smooth" });
      }, 1500);
    },
    phoneButtonShowTransaction() {
      this.$router.push({
        name: "maketransaction",
        query: { walletId: this.$route.params.id},
        params: { walletdata: this.singlewallet }
      });
    },
    softkeysLeftBack() {
      this.$router.push({ name: "wallets" });
    },
    softkeysRightBack() {
      this.$router.push({
        name: "transactionslist",
        params: { secretType: this.singlewallet.address},
        query: { walletId: this.$route.params.id, walletType: this.singlewallet.secretType }
      });
    },
    fetchWalletIds() {
      this.loading = true;
      var userId = localStorage.getItem("user_id").toString();
      var identifierData = Base64.encode(userId + "_wallet");

      let xhr = new XMLHttpRequest();
      var params = "walletId="+identifierData;
      xhr.open("GET", process.env.VUE_APP_URL + "wallets?"+params, true);
      xhr.onreadystatechange  = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          const status = xhr.status;
          if (status === 0 || (status >= 200 && status < 400)) {
            const response = JSON.parse(xhr.responseText);
            this.loading = false;
            this.items = response;
          } else {
            this.loading = false;
            return this.$toastr.e("An error has occurred. Please try again.");
          }
        }
      }
      // Error Handling:
      xhr.onerror = function(error){
          this.loading = false;
          this.$toastr.e(error);
      }
      xhr.send();
    },
    onKeyDown(event) {
      switch (event.key) {
        case "SoftLeft":
          return this.softkeysLeftprevious();
        case "SoftRight":
          return this.softkeysRightNext();
        default:
          break;
      }
    }
  },
  mounted() {
    this.usdValue = this.$route.query.secretType;
    this.loading = true;

    let xhr = new XMLHttpRequest();
    xhr.open("GET", process.env.VUE_APP_URL + "wallet/" + this.$route.params.id, true);
    xhr.onreadystatechange  = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        const status = xhr.status;
        if (status === 0 || (status >= 200 && status < 400)) {
          const response = JSON.parse(xhr.responseText);
          this.loading = false;
          this.singlewallet = response;
          this.qraddress = response.address;
          this.walletBalance = response.balance.balance;
        } else {
          this.loading = false
          this.$toastr.e("Something went wrong. Please try again later.")
          return false
        }
      }
    }
    // Error Handling:
    xhr.onerror = function(error){
        this.loading = false;
        this.$toastr.e(error);
    }
    xhr.send();

    document.addEventListener("keydown", this.onKeyDown);
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.onKeyDown);
  },
  created() {
    this.fetchWalletIds();
  }
};
</script>

<style scoped>
.page-link {
  font-size: 20px;
  color: #29b3ed;
  font-weight: 500;
  display: inline-block;
  margin: 20px auto;
  text-align: center;
  border: 1px solid #dee2e6;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
}
ul.demo {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.demo li {
  padding: 5px;
  text-align: center;
}

.kaiui-input {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  margin: 10px 10px;
  position: relative;
  font: inherit;
}

.kaiui-input .kaiui-input-label {
  color: var(--input-placeholder-color);
  margin-bottom: 5px;
}

.kaiui-input .kaiui-input-input {
  width: 100%;
  border: 1px solid var(--input-border-color);
  padding: 10px;
  outline: 0;
  box-sizing: border-box;
}

.managestuff {
  display: flex;
  justify-content: center;
}

.managestuff img {
  width: 100%;
}

.loader {
  text-align: center;
}

.demo .address {
  word-wrap: break-word;
  word-break: break-word;
  hyphens: auto;
}
</style>
