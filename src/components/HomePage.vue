<template>
  <kaiui-content>
    <kaiui-header title="Sorted Wallet - Home" />
    <div v-if="loader" class="loader">
      <img src="/assets/loader.gif" />
    </div>
    <div v-else>
      <kaiui-button
        v-on:softCenter="phoneButtonSoftCenterClickedLogin"
        title="Login"
        id="loginbutton"
      />
      <kaiui-button
        v-on:softCenter="phoneButtonSoftCenterClickedRegister"
        title="Register"
      />
    </div>
  </kaiui-content>
</template>

<script>
export default {
  data: () => ({
    loader: true
  }),
  methods: {
    phoneButtonSoftCenterClickedLogin() {
      this.$router.push({ name: "login" });
    },
    phoneButtonSoftCenterClickedRegister() {
      this.$router.push({ name: "register" });
    }
  },
  created() {
    setTimeout(() => (this.loader = false), 1200);
    var userId = localStorage.getItem("user_id");
    if (userId !== null) {
      this.$router.push({ name: "dashboard" });
    }
  },
  updated() {
    document.getElementById("loginbutton").click();
  }
};
</script>
