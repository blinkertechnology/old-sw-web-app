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

        <custom-input
          :label="$t('password')"
          type="password"
          v-model="user.password"
          class="kaiui-p_btn kaiui-input-input form-control kai-custum-css"
          :placeholder="$t('password')"
          :showable="true"
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
    async logUser () {
      this.errors = {};
      if (!this.user.email) {
        this.showNotice("", "Error", "Enter a valid email address.");
        return false;
      }
      if (!this.user.password) {
        this.showNotice("", "Error", "Password required.");
        return false;
      }

      try {
        const response = await this.$http.post('login', {
          "email": this.user.email,
          "password": this.user.password
        })
        const { data } = response;
        if(data.id !== "" && data.id !== undefined) {
          localStorage.setItem("user_id", response.id);

          // PIN setup is required
          if(response.require_pin) {
            return this.$router.push({ name: "generatepin" });
          }

          this.$router.push({ name: "dashboard" });
        } else {
          this.showNotice("", "Error", "Wrong Credentials.");
        }
      } catch(err) {
        console.log(err);
        this.showNotice("", "Error", "Wrong Credentials.");
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

<style scoped>
.mb-3 {
  padding-left: 10px;
  margin: 5px;
}
</style>
