<template>
  <kaiui-content>
    <kaiui-header title="Sorted Wallet" />
    <kaiui-tab-item name="Register" selected>
      <kaiui-separator title="Register" />
      <div v-if="loading" class="loader">
        <img src="/assets/loader.gif" />
      </div>
      <div v-else>
        <form method="POST" class="text-left">
          <kaiui-input
            type="text"
            label="Username"
            v-model="user.username"
            class="kaiui-p_btn kaiui-input-input form-control"
            placeholder="User Name"
          />

          <kaiui-input
            type="email"
            label="Email"
            v-model="user.email"
            class="kaiui-p_btn kaiui-input-input form-control"
            placeholder="Email Address"
          />

          <kaiui-input
            label="Password"
            v-model="user.password"
            type="password"
            class="kaiui-p_btn kaiui-input-input form-control"
            placeholder="Password"
          />

          <kaiui-button
            v-bind:softkeys="softkeysPhone"
            v-on:softCenter="logUser"
            v-on:softLeft="sendBack"
            title="Register"
          />
        </form>
      </div>
      <kaiui-text text="" />
      <SoftKey :softkeys.sync="softkeys" />
    </kaiui-tab-item>
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
      softkeysPhone: { left: "Back", center: "Select" },
      softkeys: {
        left: "Back",
        center: "",
        right: ""
      },
      loading: false
    };
  },
  methods: {
    logUser: function () {
      if (!this.user.email) {
        this.$toastr.e("Email Required!");
        return false;
      }
      if (!this.user.password) {
        this.$toastr.e("Password Required!");
        return false;
      }

      this.loading = true;
      this.$http
        .post(process.env.VUE_APP_URL + "register", this.user)
        .then((response) => {
          if (response.data == "success") {
            this.$toastr.s("Register Successfully!");
            this.loading = false;
            this.$router.push({ name: "dashboard" });
          } else {
            this.$router.push({ name: "Register" });
            this.receiveValue(response);
            this.loading = false;
          }
        })
        .catch((error) => {
          this.receiveValue(error);
          this.loading = false;
        })
        .then(() => (this.loading = false));
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
    receiveValue(val) {
      if (val.response.data.errors.email[0] == "validation.unique") {
        this.$toastr.e("Email Exist!");
        return false;
      } else {
        this.$toastr.e(val.response.data.message);
        return false;
      }
    }
  },
  beforeDestroy() {
    document.addEventListener("keydown", this.onKeyDown);
  },
  mounted() {
    window.removeEventListener("keydown", this.onKeyDown);
  }
};
</script>
