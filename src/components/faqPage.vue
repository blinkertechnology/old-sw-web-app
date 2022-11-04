<template>
  <kaiui-content>
    <kaiui-header title="Welcome to Sorted Wallet" />
    <kaiui-header title="FAQ" />
    <kaiui-text text="This is FAQ page" />

    <SoftKey 
      :softkeys.sync="softkeys"
      v-on:softLeft="back"
    />
  </kaiui-content>
</template>

<script>
import SoftKey from "./SoftKey";

export default {
  components: {
    SoftKey
  },
  data: () => ({
    softkeys: { left: "Back" }
  }),
  methods: {
    back() {
      this.$router.push({ name: "TermsAndConditions" });
    }
  }
};
</script>
