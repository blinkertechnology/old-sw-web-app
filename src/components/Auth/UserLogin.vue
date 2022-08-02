<template>
  <kaiui-content>
    <kaiui-header title="Sorted Wallet" />
    <kaiui-tab-item name="Login" selected>
      <kaiui-separator title="Login" />
      <form method="POST" class="text-left">
        <kaiui-input
          label="Email"
          v-model="user.email"
          class="kaiui-p_btn kaiui-input-input form-control"
          placeholder="E-mail"
        />

        <kaiui-input
          label="Password"
          v-model="user.password"
          class="kaiui-p_btn kaiui-input-input form-control kai-custum-css"
          placeholder="Password"
        />

        <kaiui-button
          v-bind:softkeys="softkeysPhone"
          v-on:softCenter="logUser"
          v-on:softLeft="sendBack"
          title="Login"
        />

        <kaiui-button
          v-on:softCenter="phoneButtonSoftCenterClickedForgotPass"
          title="Forgot Password?"
        />
      </form>
    </kaiui-tab-item>
    <SoftKey :softkeys.sync="softkeys" />
  </kaiui-content>
</template>

<script>
import SoftKey from "../SoftKey";

export default {
  components: {
    SoftKey
  },
  data() {
    return {
      user: {
        email: null,
        password: null
      },
      errors: {},
      softkeysPhone: { left: "Back", center: "Select" },
      softkeys: {
        left: "Back",
        center: "",
        right: ""
      }
    };
  },
  methods: {
    logUser: function () {
      this.errors = {};
      if (!this.user.email) {
        this.$toastr.e("Email Required!");
        return false;
      }
      if (!this.user.password) {
        this.$toastr.e("Password Required!");
        return false;
      }

      this.$http
        .post(process.env.VUE_APP_URL + "login", this.user)
        .then((response) => {
          if (response.data.id !== "" && response.data.id !== undefined) {
            this.$toastr.s("Login Successfully!");
            localStorage.setItem("user_id", response.data.id);
            this.$router.push({ name: "dashboard" });
          } else {
            this.$toastr.e("Wrong Credentials");
          }
        })
        .catch((error) => {
          this.$toastr.e("Wrong Credentials");
        });
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
      this.$router.push({ name: "homepage" });
    },
    phoneButtonSoftCenterClickedForgotPass() {
      this.$router.push({ name: "forgotPass" });
    }
  },
  mounted() {
    document.addEventListener("keydown", this.onKeyDown);
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.onKeyDown);
  }
};
</script>

<style scoped>
.mb-3 {
  padding-left: 10px;
  margin: 5px;
}
</style>
