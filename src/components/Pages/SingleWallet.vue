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
            Balance :
            <b>{{ singlewallet ? singlewallet.balance.balance : "" }}</b>
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
      }
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
        query: { walletId: this.$route.params.id },
        params: { walletdata: this.singlewallet }
      });
    },
    softkeysLeftBack() {
      this.$router.push({ name: "wallets" });
    },
    softkeysRightBack() {
      this.$router.push({
        name: "transactionslist",
        params: { secretType: this.singlewallet.address },
        query: { walletId: this.$route.params.id }
      });
    },
    fetchWalletIds() {
      this.loading = true;
      var userId = localStorage.getItem("user_id").toString();
      var identifierData = Base64.encode(userId + "_wallet");
      this.$http
        .get(process.env.VUE_APP_URL + "wallets", {
          params: { walletId: identifierData }
        })
        .then((response) => {
          if (response.status === 200) {
            this.loading = false;
            this.items = response.data;
          } else {
            this.loading = false;
            return this.$toastr.e("An error has occurred. Please try again.");
          }
        })
        .catch((error) => {
          return (this.errors = error.data?.errors || error);
        })
        .then(() => (this.loading = false));
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
    this.loading = true;
    this.$http
      .get(process.env.VUE_APP_URL + "wallet/" + this.$route.params.id)
      .then((response) => {
        if (response.status === 200) {
          this.loading = false;
          this.singlewallet = response ? response.data : null;
          this.qraddress = response.data.address;
        }
        if (response.data.error) {
          this.loading = false;
          this.$toastr.e(response.data.error);
        }
      })
      .catch((error) => {})
      .then(() => (this.loading = false));

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
