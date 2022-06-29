<template>
  <kaiui-content>
    <kaiui-header title="Welcome to Sorted Wallet" />
    <kaiui-header title="Details" />
    <kaiui-text text="This is details page" />
        <kaiui-button
          v-bind:softkeys="softkeysPhone"
          v-on:softLeft="phoneButtonSoftleftClicked"
          title="Agree"
        />
 </kaiui-content>
</template>

<script>
export default {
    data: () => ({
        softkeysPhone: { left: "Back"},
    }),
    methods: {
      phoneButtonSoftleftClicked()  {     
        this.$router.push({ name: "HelloWorld" });
      },        
  },
}
</script>