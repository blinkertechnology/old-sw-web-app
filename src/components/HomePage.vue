<template>
  <kaiui-content>
    <kaiui-header :title="$t('homepage.title')" />
    <div v-if="loader" class="loader">
      <img src="/assets/loader.gif" />
    </div>
    <div v-else>
      <kaiui-button
        :softkeys="btnSoftKeys"
        v-on:softCenter="phoneButtonSoftCenterClickedLogin"
        :title="$t('homepage.login')"
        id="loginbutton"
      />
      <kaiui-button
        :softkeys="btnSoftKeys"
        v-on:softCenter="phoneButtonSoftCenterClickedRegister"
        :title="$t('homepage.register')"
      />
    </div>
  </kaiui-content>
</template>

<script>
import i18n from '@/lang/setup';

export default {
  data: () => ({
    loader: true,
    btnSoftKeys: {
      center: i18n.t('select'),
    }
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
