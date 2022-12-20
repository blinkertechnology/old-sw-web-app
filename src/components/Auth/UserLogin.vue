<template>
  <kaiui-content>
    <kaiui-header :title="$t('title')" />
    
    <kaiui-separator title="Login" />
    <form method="POST" class="text-left">
      <kaiui-input
        :label="$t('email')"
        v-model="user.email"
        class="kaiui-p_btn kaiui-input-input form-control"
        :placeholder="$t('email')"
      />

      <custom-input
        :label="$t('password')"
        type="password"
        v-model="user.password"
        class="kaiui-p_btn kaiui-input-input form-control kai-custum-css"
        :placeholder="$t('password')"
        :showable="true"
      />

      <kaiui-button
        :softkeys="{ 
          center: $t('select'),
          left: $t('back')
        }"
        v-on:softCenter="logUser"
        v-on:softLeft="sendBack"
        :title="$t('login')"
      />
    </form>


    <SoftKey 
      :softkeys="{
        left: $t('back'),
        right: $t('forgotPassword')
      }" 
      v-on:softLeft="sendBack"
      v-on:softRight="forgotPassword"
    />
  </kaiui-content>
</template>

<script>
import SoftKey from "../SoftKey";
import { logout } from '@/auth';

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
    };
  },
  mounted() {
    logout();
  },
  methods: {
    async logUser () {
      if (!this.user.email) {
        this.showDialog('Error', 'Enter a valid email address.');
        return false;
      }

      if (!this.user.password) {
        this.showDialog('Error', 'Password required.');
        return false;
      }

      try {
        this.showLoading('Sending one-time code.');

        const response = await this.$http.post('auth/login', {
          "email": this.user.email,
          "password": this.user.password
        })
        const { data } = response;
        const { access_token, user } = data;

        if(access_token && user) {
          localStorage.setItem('access_token', access_token);
          localStorage.setItem('user', JSON.stringify(user));

          // PIN setup is required
          if(user.require_pin) {
            return this.$router.push({ name: "generatepin" });
          }

          this.$router.push({ name: "dashboard" });
        } else {
          this.showDialog('Error', 'Wrong Credentials.');
        }
      } catch(err) {
        console.log(err);

        this.showDialog('Error', 'Wrong Credentials.');
      } finally {
        this.hideLoading();
      }
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
