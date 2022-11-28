<template>
  <kaiui-content>
    <kaiui-header :title="$t('title')" />

    <div v-if="loader" class="loader">
      <img src="/assets/loader.gif" />
    </div>
    <div v-else>
      <div class="intro">
        <img src="/assets/icons/kaios_112.png" />
        <h1>{{ $t('homepage.intro.title') }}</h1>
        <h2>{{ $t('homepage.intro.sub') }}</h2>
      </div>
    </div>

    <kaiui-dialog
      :title="$t('login')"
      v-model="showLoginDialog"
      :softkeys="dialogSoftkeys"
    >
      <list-item 
        primaryText="Email/password"
        v-on:softCenter="selectLoginMethod('email')"
      />

      <list-item 
        primaryText="Phone number"
        v-on:softCenter="selectLoginMethod('phone')"
      />
    </kaiui-dialog>

    <kaiui-dialog
      :title="$t('register')"
      v-model="showSignupDialog"
      :softkeys="dialogSoftkeys"
    >
      <list-item 
        primaryText="Email/password"
        v-on:softCenter="selectSignupMethod('email')"
      />

      <list-item 
        primaryText="Phone number"
        v-on:softCenter="selectSignupMethod('phone')"
      />
    </kaiui-dialog>

    <SoftKey
      :softkeys="softkeys"
      v-on:softLeft="onSoftLeft"
      v-on:softRight="onSoftRight"
    />
  </kaiui-content>
</template>

<script>
import i18n from '@/lang/setup';
import SoftKey from './SoftKey';

export default {
  components: {
    SoftKey
  },
  data: () => ({
    loader: true,
    softkeys: {
      left: i18n.t('register'),
      right: i18n.t('login')
    },

    dialogSoftkeys: {
      left: i18n.t('cancel'),
      center: i18n.t('select'),
    },
    showLoginDialog: false,
    showSignupDialog: false,
  }),
  methods: {
    onSoftLeft() {
      this.showSignupDialog = true;
    },
    onSoftRight() {
      this.showLoginDialog = true;
    },

    selectLoginMethod(method) {
      console.log('selectLoginMethod', method);

      switch(method) {
        case 'email':
          return this.$router.push({ name: "login" });
        case 'phone':
          return this.$router.push({ name: "login_phone" });
      }
    },

    selectSignupMethod(method) {
      console.log('selectSignupMethod', method);

      switch(method) {
        case 'email':
          return this.$router.push({ name: "register" });
        case 'phone':
          return this.$router.push({ name: "login_phone" });
      }
    }
  },
  created() {
    setTimeout(() => (this.loader = false), 1200);

    const session = localStorage.getItem("session");
    if(session !== null) {
      this.$router.push({ name: "dashboard" });
    }
  },
};
</script>

<style scoped>
.intro {
  padding: 10px;

  text-align: center;
}

img {
  max-width: 100px;
}

h1 {
  /* font-family: 'Poppins'; */
  font-size: 1em;
  line-height: 1.5em;

  margin-bottom: 10px;
}
h2 {
  font-size: 0.7em;
  font-weight: 300;
}
</style>