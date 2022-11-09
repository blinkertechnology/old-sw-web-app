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
            :label="$t('username')"
            v-model="user.username"
            class="kaiui-p_btn kaiui-input-input form-control"
            :placeholder="$t('username')"
          />

          <kaiui-input
            type="email"
            :label="$t('email')"
            v-model="user.email"
            class="kaiui-p_btn kaiui-input-input form-control"
            :placeholder="$t('email')"
          />

          <password-input
            :label="$t('password')"
            v-model="user.password"
            type="password"
            class="kaiui-p_btn kaiui-input-input form-control"
            :placeholder="$t('password')"
          />

          <kaiui-button
            v-bind:softkeys="softkeysPhone"
            v-on:softCenter="logUser"
            v-on:softLeft="sendBack"
            :title="$t('register')"
          />
        </form>
      </div>
      <kaiui-text text="" />
      <SoftKey 
        :softkeys.sync="softkeys"
        v-on:softLeft="sendBack"
      />
    </kaiui-tab-item>
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
        username:null,
        email: null,
        password: null
      },
      softkeysPhone: { 
        center: i18n.t('select'),
      },
      softkeys: {
        left: i18n.t('back'),
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
      const pass = this.user.password.length;
      if (pass < 5) {
        this.$toastr.e("Password length should not be less than 5.");
        return false;
      } 

      this.loading = true;
      let xhr = new XMLHttpRequest();
      xhr.open("POST", process.env.VUE_APP_URL + "register", true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onreadystatechange  = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          const status = xhr.status;
          if (status === 0 || (status >= 200 && status < 400)) {
            // The request has been completed successfully
            const response = xhr.responseText;

            if (response == "success") {
              this.$toastr.s("Register Successfully!");
              this.$router.push({ name: "homepage" });
              this.loading = false;
            } else {
              this.$router.push({ name: "Register" });
              this.receiveValue(response);
              this.loading = false;
            }
          } else {
            this.$toastr.e("Something went wrong. Please try again after some time");
          }
        }
      }
      xhr.onerror = function(error){
        console.error( error );
      }
      const obj = {
        "username": this.user.username,
        "email": this.user.email,
        "password": this.user.password
      };
      xhr.send(JSON.stringify(obj));
    },
    sendBack() {
      this.$router.push({ name: "homepage" });
    },
    receiveValue(val) {
      this.loading = false;
      if (val.response.data.errors.email[0] != '' && val.response.data.errors.email[0] == "validation.unique") {
        this.$toastr.e("Email Exist!");
        return false;
      } else {
        this.$toastr.e(val.response.data.message);
        return false;
      }
    }
  },
};
</script>
