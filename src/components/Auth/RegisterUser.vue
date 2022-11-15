<template>
  <kaiui-content>
    <kaiui-header :title="$t('title')" />
    
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

          <custom-input
            :label="$t('password')"
            v-model="user.password"
            type="password"
            class="kaiui-p_btn kaiui-input-input form-control"
            :placeholder="$t('password')"
            :showable="true"
          />

          <kaiui-button
            v-bind:softkeys="softkeysRegisterBtn"
            v-on:softCenter="logUser"
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
      softkeysRegisterBtn: { 
        center: i18n.t('select'),
      },
      softkeys: {
        left: i18n.t('back'),
      },
      loading: false
    };
  },
  methods: {
    logUser: async function () {
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

      try {
        const response = await this.$http.post('register', {
          "username": this.user.username,
          "email": this.user.email,
          "password": this.user.password
        });
        const { data } = response;
        const { token, user } = data;

        localStorage.setItem('session', token);
        localStorage.setItem('user', JSON.stringify(user));

        if(user.require_pin) {
          return this.$router.push({ name: "generatepin" });
        }

        return this.$router.push({ name: "homepage" });
      } catch(err) {
        console.log(err);

        this.receiveValue(err.response.data);
      } finally {
        this.loading = false;
      }
    },
    sendBack() {
      this.$router.push({ name: "homepage" });
    },
    receiveValue(data) {
      if(data.errors.email[0] != '' && data.errors.email[0] == "validation.unique") {
        this.showNotice("", "Something went wrong.", "Email Exist!");
      } else {
        this.showNotice("", "Something went wrong.", "Please try again.");
      }
    }
  },
};
</script>
