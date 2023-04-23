<template>
  <div>
    <kaiui-content>
      <kaiui-header :title="$t('title')" />

      <div v-if="loader" class="loader">
        <img src="/assets/loader.gif" />
      </div>
      <div v-else>
        <div v-for="(p, i) in body" :key="i">
          <kaiui-text 
            v-for="(s, j) in p.split('\n').filter(x => x.length > 0)"
            :key="j"
            :text="s"
          />
        </div>

        <kaiui-checkbox 
          :primaryText="$t('tac.confirm.primary')" 
          :secondaryText="$t('tac.confirm.secondary')" 
          class="tandc"
          v-bind:softkeys="softkeysPhone"
          v-on:softCenter="onSelect"
          v-on:softRight="onAgree"
          id="myCheck"
        />

        <SoftKey 
          :softkeys.sync="softkeys"
          v-on:softLeft="sendBottom"
        />

        <div class="exacthere"></div>
      </div>
    </kaiui-content>
  </div>
</template>

<script>
import SoftKey from "./SoftKey";
import i18n from '@/lang/setup';

export default {
  components: {
    SoftKey
  },
  data: () => ({
    softkeysPhone: { 
      center: i18n.t('select'),
      right: i18n.t('tac.agree')
    },
    agree: false,
    softkeys: {
      left: i18n.t('tac.scrollDown')
    },
    loader: true,
    body: i18n.t('tac.body')
  }),
  methods: {
    onAgree() {
      if(!this.agree) {
        this.showNotice("", "", i18n.t('tac.error'));
        return false;
      }

      this.$cookies.set("TAC_agreed", true, { expires: "90D" });
      // this.$router.push({ name: "homepage" });
    },
    onSelect() {
      this.agree = !this.agree;
    },
   
    sendBottom() {
      let pageBottom = document.querySelector(".exacthere");
      pageBottom.scrollIntoView({ behavior: "smooth" });
      document.getElementById("myCheck").click();
    },
  },
  created() {
    setTimeout(() => (this.loader = false), 1200);
    if(this.$cookies.get("TAC_agreed")) {
      // this.$router.push({ name: "homepage" });
    }
  },
};
</script>

<style scoped>
.tandc span {
  font-size: 12px;
}
.tandc {
  margin-bottom: 40px;
}
</style>
