<template>
  <kaiui-content>
    <kaiui-header :title="$t('title')" />
    
    <kaiui-tab-item :name="$t('pages.signup.title')" selected>
      <kaiui-separator :title="$t('pages.signup.title')" />
      <div>
        <form method="POST" class="text-left">
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
            :softkeys="{ 
              center: $t('select'),
              left: $t('back')
            }"
            v-on:softCenter="logUser"
            v-on:softLeft="sendBack"
            :title="$t('register')"
          />
        </form>
      </div>
      
      <SoftKey 
        :softkeys="{
          left: $t('back')
        }"
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
        email: null,
        password: null
      },
    };
  },
  methods: {
    logUser: async function () {
      if (!this.user.email) {
        this.showDialog("", i18n.t('pages.signup.emailRequired'));
        return false;
      }
      if (!this.user.password) {
        this.showDialog("", i18n.t('pages.signup.passwordRequired'));
        return false;
      }
      const pass = this.user.password.length;
      if (pass < 5) {
        this.showDialog("", i18n.t('pages.signup.passwordLength'));
        return false;
      } 

      this.loading = true;

      this.showLoading();

      try {
        const response = await this.$http.post('auth/signup', {
          "email": this.user.email,
          "password": this.user.password
        });
        const { data } = response;
        const { access_token, user } = data;

        localStorage.setItem('access_token', access_token);
        localStorage.setItem('user', JSON.stringify(user));

        if(user.require_pin) {
          return this.$router.push({ name: "generatepin" });
        }

        return this.$router.push({ name: "homepage" });
      } catch(err) {
        console.log(err);

        this.showDialog(i18n.t('genericErrorTitle'), err.generic);
      } finally {
        this.hideLoading();
      }
    },
    sendBack() {
      this.$router.push({ name: "homepage" });
    },
  },
};
</script>
