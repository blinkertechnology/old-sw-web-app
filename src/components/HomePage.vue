<template>
  <kaiui-content>
    <kaiui-header :title="$t('homepage.title')" />
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

    <SoftKey
      :softkeys.sync="softkeys"
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
    btnSoftKeys: {
      center: i18n.t('select'),
    },
    softkeys: {
      left: i18n.t('register'),
      center: "",
      right: i18n.t('login')
    },
  }),
  methods: {
    onSoftLeft() {
      this.$router.push({ name: "register" });
    },
    onSoftRight() {
      this.$router.push({ name: "login" });
    },
  },
  created() {
    setTimeout(() => (this.loader = false), 1200);
    var userId = localStorage.getItem("user_id");
    if (userId !== null) {
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