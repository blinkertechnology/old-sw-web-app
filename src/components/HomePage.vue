<template>
  <kaiui-content>
    <kaiui-header :title="$t('title')" />

    <div v-if="loader" class="loader">
      <img src="/assets/loader.gif" />
    </div>
    <div v-else>
      <div class="intro">
        <img src="/assets/icons/kaios_112.png" />
        <h1>{{ $t('pages.homepage.intro.title') }}</h1>
        <h2>{{ $t('pages.homepage.intro.sub') }}</h2>
      </div>
    </div>
    <!-- v-model for two way binding that is when input changes then data changes and vice versa -->
    <kaiui-dialog
      :title="$t('login')"
      v-model="showLoginDialog"
      :softkeys="dialogSoftkeys"
      v-on:softLeft="onSoftLeft('dialog')"
    >
      <list-item 
        :primaryText="$t('pages.homepage.emailLogin')"
        v-on:softCenter="selectLoginMethod('email')"
      />

      <list-item 
        :primaryText="$t('pages.homepage.phoneLogin')"
        v-on:softCenter="selectLoginMethod('phone')"
      />
    </kaiui-dialog>

    <kaiui-dialog
      :title="$t('register')"
      v-model="showSignupDialog"
      :softkeys="dialogSoftkeys"
      v-on:softLeft="onSoftLeft('dialog')"
    >
      <list-item 
        :primaryText="$t('pages.homepage.emailLogin')"
        v-on:softCenter="selectSignupMethod('email')"
      />

      <list-item 
        :primaryText="$t('pages.homepage.phoneLogin')"
        v-on:softCenter="selectSignupMethod('phone')"
      />
    </kaiui-dialog>

    <SoftKey
      :softkeys.sync="softkeys"
      v-on:softLeft="onSoftLeft('normal')"
      v-on:softRight="onSoftRight('normal')"
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
    cancelCalled:false,

    dialogSoftkeys: {
      left: i18n.t('cancel'),
      center: i18n.t('select'),
    },
    showLoginDialog: false,
    showSignupDialog: false,
  }),
  methods: {
    onSoftLeft(source) {
      if(source==="dialog"){
        this.cancelCalled = true
      }else if(this.cancelCalled && source==="normal"){
        this.cancelCalled = false
      }else{
        this.showSignupDialog = true
        this.cancelCalled = false
      }
    

    },
    onSoftRight(source) {
      this.showLoginDialog = true;
    },

    selectLoginMethod(method) {
      switch(method) {
        case 'email':
          return this.$router.push({ name: "login" });
        case 'phone':
          return this.$router.push({ name: "login_phone" });
      }
    },

    selectSignupMethod(method) {
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

    /**
     * User was already logged in, redirect to dashboard
     */
    const session = localStorage.getItem("access_token");
    const user = localStorage.getItem("user");
    if(session && user) {
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
  .intro img {
    max-width: 100px;
  }
  .intro h1 {
    font-size: 1em;
    line-height: 1.5em;

    margin-bottom: 10px;
  }
  .intro h2 {
    font-size: 0.7em;
    font-weight: 300;
  }
</style>