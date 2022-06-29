<template>
  <kaiui-content>
    <kaiui-header title="Sorted Wallet" />
    <kaiui-tab-item name="Create Wallet" selected>
      <kaiui-separator title="Dashboard" />
      <kaiui-button title="Create New Wallet" v-on:softCenter="createWallet" />
      <kaiui-button title="My Wallet(s)" v-on:softCenter="myWallets" />
      <kaiui-button title="Logout" v-on:softCenter="logout" />
    </kaiui-tab-item>
  </kaiui-content>
</template>

<script>
  export default {
      props: [
        'totalwallets',
      ],
      methods: {
        createWallet(){
          this.$router.push({ name: "createwallet" })
        },
        myWallets(){
          this.$router.push({ name: "wallets" })
        },
        logout(){
          localStorage.removeItem('user_id');
          this.$router.push({ name: "login" })
          this.$toastr.s("Loged Out.")
        }
      },
      created(){
          var userId = localStorage.getItem('user_id');
          if(userId === null){
              this.$router.push({ name: "homepage" });
          }
      }
  }
</script>
