<template>
  <kaiui-content>
    <kaiui-header title="Sorted Wallet" />
      <div v-if="loader" class="loader">
        <img src="/assets/loader.gif"/>
      </div>
      <div v-else>
        <kaiui-tab-item name="Create Wallet" selected>
          <kaiui-separator title="Dashboard" />
          <kaiui-button title="Create New Wallet" v-on:softCenter="createWallet" id="cwallet"/>
          <kaiui-button title="My Wallet(s)" v-on:softCenter="myWallets" />
          <kaiui-button title="Logout" v-on:softCenter="logout" />
        </kaiui-tab-item>
    </div>
  </kaiui-content>
</template>

<script>
  export default {
      props: [
        'totalwallets',
      ],
      data: () => ({
        loader: true,
      }),
      methods: {
        createWallet(){
          this.$router.push({ name: "createwallet" })
          this.$router.go()
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
        setTimeout(() => this.loader = false, 1200)
        var userId = localStorage.getItem('user_id');
        if(userId === null){
            this.$router.push({ name: "homepage" });
        }
      },
      updated() {
          document.getElementById("cwallet").click();
      }
  }
</script>
