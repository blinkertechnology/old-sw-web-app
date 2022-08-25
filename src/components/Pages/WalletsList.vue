<template>
  <kaiui-content>
    <kaiui-header title="Sorted Wallet" />
    <div v-if="loading" class="loader">
      <img src="/assets/loader.gif" />
    </div>
    <div v-else>
      <div
        class="row lead border mb-3"
        v-for="item in items"
        :key="item.id"
        nav-selectable="true"
        id="singlewalletbutton"
      >
        <div class="col-sm-5 col-md-6 tokentype">
          Token:
          {{
            item.secretType.charAt(0).toUpperCase() +
            item.secretType.slice(1).toLowerCase()
          }}
        </div>
        <div class="col-sm-5 col-md-6">Balance: {{ item.balance.balance }}</div>
        <div class="col-sm-5 col-md-6">
          <kaiui-button
            nav-selectable="false"
            title="View Wallet"
            v-bind:softkeys="softkeysPhone"
            v-on:softLeft="phoneButtonSoftleftClicked"
            v-on:softCenter="phoneButtonSoftRightClicked(item.id, item.secretType)"
          />
        </div>
      </div>
      <kaiui-text text="" />
    </div>
    <SoftKey :softkeys.sync="softkeys" />
  </kaiui-content>
</template>

<script>
import SoftKey from "../SoftKey";
const { Base64 } = require("js-base64");

export default {
  components: {
    SoftKey
  },
  data() {
    return {
      items: null,
      loading: true,
      softkeysPhone: { left: "Back", center: "View" },
      softkeys: {
        left: "Back",
        center: "",
        right: ""
      }
    };
  },
  methods: {
    phoneButtonSoftleftClicked() {
      this.$router.push({ name: "dashboard" });
    },
    phoneButtonSoftRightClicked(e, sType) {
      this.$router.push({ name: "wallet", params: { id: e }, query:{secretType: sType} });
      this.$router.go();
    },
    onKeyDown(event) {
      switch (event.key) {
        case "SoftLeft":
          return this.sendBack();
        default:
          break;
      }
    },
    sendBack() {
      this.$router.push({ name: "dashboard" });
    }
  },
  mounted() {
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
            this.loading = false
            this.$toastr.e("Something went wrong. Please try again later.")
            return false
        }
      }
    }
    xhr.onerror = function(error){
        console.error( error );
    }
    xhr.send();

    document.addEventListener("keydown", this.onKeyDown);
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.onKeyDown);
  },
  updated() {
    document.getElementById("singlewalletbutton").click();
  }
};
</script>

<style scoped>
.mb-3 {
  padding-left: 10px;
  margin: 5px;
  border-bottom: 1px solid #cccaca;
}
.loader {
  text-align: center;
}
</style>
