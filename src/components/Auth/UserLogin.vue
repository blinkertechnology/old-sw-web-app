<template>
  <kaiui-content>
    <kaiui-header title="Sorted Wallet" />
    <kaiui-tab-item name="Login" selected>
      <kaiui-separator title="Login" />
      <form method="POST" class="text-left">
        <kaiui-input
          :label="$t('email')"
          v-model="user.email"
          class="kaiui-p_btn kaiui-input-input form-control"
          :placeholder="$t('email')"
        />

        <password-input
          :label="$t('password')"
          v-model="user.password"
          class="kaiui-p_btn kaiui-input-input form-control kai-custum-css"
          :placeholder="$t('password')"
        />

        <kaiui-button
          v-bind:softkeys="softkeysPhone"
          v-on:softCenter="logUser"
          v-on:softLeft="sendBack"
          :title="$t('login')"
        />
      </form>
    </kaiui-tab-item>
    <SoftKey 
      :softkeys.sync="softkeys" 
      v-on:softLeft="sendBack"
      v-on:softRight="forgotPassword"
    />
  </kaiui-content>
</template>

<script>
import SoftKey from "../SoftKey";
import i18n from '@/lang/setup';

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
      softkeysPhone: { 
        center: i18n.t('select') 
      },
      softkeys: {
        left: i18n.t('back'),
        center: "",
        right: i18n.t('forgotPassword')
      }
    };
  },
  mounted() {
    // Force logout 
    localStorage.removeItem("user_id");
  },
  methods: {
    logUser () {
      this.errors = {};
      if (!this.user.email) {
        this.showNotice("", "Error", "Enter a valid email address.");
        return false;
      }
      if (!this.user.password) {
        this.showNotice("", "Error", "Password required.");
        return false;
      }

      let xhr = new XMLHttpRequest();
      xhr.open("POST", process.env.VUE_APP_URL + "login", true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onreadystatechange  = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          const status = xhr.status;
          if (status === 0 || (status >= 200 && status < 400)) {
            // The request has been completed successfully
            const response = JSON.parse(xhr.responseText);
            if (response.id !== "" && response.id !== undefined) {
              this.$toastr.s("Login Successfully!");
              localStorage.setItem("user_id", response.id);
              this.$router.push({ name: "dashboard" });
            } else {
              this.showNotice("", "Error", "Wrong Credentials.");
            }
          } else {
            this.showNotice("", "Error", "Wrong Credentials.");
          }
        }
      }
      xhr.onerror = function(error){
        console.error( error );
        this.showNotice("", "Error", "Please try again.");
      }

      const obj = {
          "email": this.user.email,
          "password": this.user.password
      };
      xhr.send(JSON.stringify(obj));
    },
    sendBack() {
      this.$router.push({ name: "homepage" });
    },
    forgotPassword() {
      this.$router.push({ name: "forgotPass" });
    }
  }
};
</script>

<style scoped>
.mb-3 {
  padding-left: 10px;
  margin: 5px;
}
</style>
