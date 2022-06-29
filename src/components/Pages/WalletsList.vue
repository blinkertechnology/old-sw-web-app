<template>
    <kaiui-content>
      <kaiui-header title="Sorted Wallet" />
      <kaiui-separator title="Wallet List" />
        <div v-if="loading" class="loader">
            Loading...
        </div>
        <div v-else>
             <kaiui-text text=""/>
             <kaiui-text text=""/>
            <div class="row lead border mb-3" v-for="item in items" :key="item.id">
                <div class="col-sm-5 col-md-6">Wallet: {{ item.secretType }}</div>
                <div class="col-sm-5 col-md-6">Description: {{ item.description }}</div>
                <div class="col-sm-5 col-md-6">Balance: {{ item.balance.balance }}</div>
                <div class="col-sm-5 col-md-6">
                    <kaiui-button 
                        title="View Wallet" 
                        v-bind:softkeys="softkeysPhone"
                        v-on:softLeft="phoneButtonSoftleftClicked"
                        v-on:softCenter="phoneButtonSoftRightClicked(item.id)"
                    />
                </div>
            </div>
        </div>
        <SoftKey :softkeys.sync="softkeys" />
    </kaiui-content>
</template>

<script>
import SoftKey from "../SoftKey";
const {Base64} = require('js-base64');

export default {
    components: {
      SoftKey
    },
    data() {
        return {
            items : null,
            loading: true,
            softkeysPhone: { left: "Back", center: "View" },
            softkeys: {
                left: "Back",
                center: "",
                right: ""
            }
        }
    },
    methods: {
        phoneButtonSoftleftClicked() {
            this.$router.push({ name: "dashboard" })
        },
        phoneButtonSoftRightClicked(e) {
            this.$router.push({ name: "wallet", params: { id:e }})
        },
        onKeyDown(event) {
          switch (event.key) {
            case "SoftLeft":
              return this.sendBack();
            default:
              break;
          }
        },
        sendBack() {
            this.$router.push({ name: "dashboard"})
        }
    },
    mounted() {
        var userId = localStorage.getItem('user_id').toString();
        var identifierData = Base64.encode(userId+'_wallet');

        this.$http.get(process.env.VUE_APP_URL+'wallets',  { params: {walletId: identifierData}}).then((response) => {
            if (response.status === 200) {
                this.loading = false
                this.items = response.data
            } else {
                this.loading = false
                this.$toastr.e("An error has occurred. Please try again.")
            }
        }).catch((error) => {
            this.errors = error.data?.errors || error
        }).then(() => this.loading = false);

        document.addEventListener('keydown', this.onKeyDown);
    },
    beforeDestroy() {
        window.removeEventListener('keydown', this.onKeyDown);
    }
}
</script>

<style scoped>
.mb-3{
  padding-left: 10px;
  margin: 5px;
}
.loader{
    text-align: center;
}
</style>
