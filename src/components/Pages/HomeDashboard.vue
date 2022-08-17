<template>
  <kaiui-content>
    <kaiui-header title="Sorted Wallet" />
    <div v-if="loader" class="loader">
      <img src="/assets/loader.gif" />
    </div>
    <div v-else>
      <kaiui-tab-item name="Create Wallet" selected>
        <kaiui-separator title="Dashboard" />
        <kaiui-button id="wallets" title="My Wallet(s)" v-on:softCenter="myWallets" />
        <kaiui-button title="Logout" v-on:softCenter="logout" />
      </kaiui-tab-item>
    </div>
  </kaiui-content>
</template>

<script>
export default {
  data: () => ({
    loader: true
  }),
  methods: {
    myWallets() {
      this.$router.push({ name: "wallets" });
    },
    logout() {
      localStorage.removeItem("user_id");
      this.$router.push({ name: "login" });
      this.$toastr.s("Logout Successfully.");
    }
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
      this.$http.get(process.env.VUE_APP_URL + "getpin", {
        params: { userid: userId }
      }).then((response) => {
        if (response.data[0].walletpin) {
          this.loader = false;
        } else {
          this.$toastr.e("Pin not available. Please generated.")
          this.$router.push({ name: "generatepin" })
          this.loader = false;
        }
      })
      .catch((error) => {
        this.$toastr.e("Something went wrong. Please try again later.")
        this.$router.push({ name: "generatepin" })
        return false
      })
      .then(() => (this.loader = false));
  },
  updated() {
    document.getElementById("wallets").click();
  }
};
</script>
