<template>
  <kaiui-content>
    <kaiui-header title="Welcome to Sorted Wallet" />
    <kaiui-header title="FAQ" />
    <kaiui-text text="This is FAQ page" />
    <kaiui-button
      v-bind:softkeys="softkeysPhone"
      v-on:softLeft="phoneButtonSoftleftClicked"
      title="Back"
    />
  </kaiui-content>
</template>

<script>
export default {
  data: () => ({
    softkeysPhone: { left: "Back" }
  }),
  methods: {
    phoneButtonSoftleftClicked() {
      this.$router.push({ name: "HelloWorld" });
    }
  }
};
</script>
