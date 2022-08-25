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
      this.$toastr.s("Logged Out Successfully");
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
    let xhr = new XMLHttpRequest();

    var params = "userid="+userId;
    xhr.open("GET", process.env.VUE_APP_URL + "getpin?"+params, true);
      xhr.onreadystatechange  = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          const status = xhr.status;
          if (status === 0 || (status >= 200 && status < 400)) {
            const response = JSON.parse(xhr.responseText);
            if (response[0].walletpin) {
              this.loader = false;
            } else {
              this.$toastr.e("Pin not available. Please generated.")
              this.$router.push({ name: "generatepin" })
              this.loader = false;
            }
          } else {
            this.$toastr.e("Something went wrong. Please try again later.")
            this.$router.push({ name: "generatepin" })
            return false
          }
        }
      }
      xhr.onerror = function(error){
          console.error( error );
      }
      xhr.send();
  },
  updated() {
    document.getElementById("wallets").click();
  }
};
</script>
