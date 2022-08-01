<template>
    <kaiui-content>
      <kaiui-header title="Welcome to Sorted Wallet" />
      <kaiui-text text="Please read Terms & Policy." />
      <kaiui-text text="Please cehck our website for Terms & Policy" />
      <kaiui-button
            v-bind:softkeys="softkeysPhone"
            v-on:softRight="phoneButtonSoftRightClicked"
            v-on:softLeft="phoneButtonSoftleftClicked"
            title="connect.."
          />
      
    </kaiui-content>
</template>

<script>

export default {
  data: () => ({
    softkeysPhone: { left: "contact us", right: "Connect/Create Wallet" },
  }),
  methods: {
    phoneButtonSoftleftClicked() {
      this.$router.push({ name: "contactus" });
    },
    phoneButtonSoftRightClicked() {
      this.$router.push({ name: "login" });
    }
  }
};
</script>

<style>
h1 {
  font-weight: normal;
  color: #42b983;
  text-align: center;
}
section {
  text-align: center;
  font-family: "Poppins";
  font-size: 1.3em;
  line-height: 1.5em;
  border: 3px;
  border-style: solid;
  border-color: #000000;
  padding: 1em;
  margin-left: auto;
  margin-right: auto;
  width: 30em;
}
</style>
