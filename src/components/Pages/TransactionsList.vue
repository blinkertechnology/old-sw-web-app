<template>
    <kaiui-content>
      <kaiui-header title="Sorted Wallet" />
      <kaiui-separator title="Transaction Records" />
        <div v-if="loading" class="loader">
            Loading...
        </div>
        <div v-else>
            <div class="row lead border mb-3" v-for="item in items" :key="item['hash']">
                <div class="col-sm-5 col-md-6">Secret Type: {{ item['secret_type'] }}</div>
                <div class="col-sm-5 col-md-6">Status: {{ item['status'] }}</div>
                <div class="col-sm-5 col-md-6">Transaction From: {{ item['from'] }}</div>
                <div class="col-sm-5 col-md-6">Transaction To: {{ item['to'] }}</div>
                <div class="col-sm-5 col-md-6">Transaction At: {{ item['created_at'] }}</div>
            </div>
        </div>
        <hr>
        <SoftKey :softkeys.sync="softkeys" />
    </kaiui-content>
</template>

<script>
const {Base64} = require('js-base64');
import SoftKey from "../SoftKey";

export default {
    components: {
      SoftKey
    },
    data() {
        return {
            items : null,
            loading: true,
            softkeys: {
                left: "Back",
                center: "",
                right: ""
            }
        }
    },
    methods: {
        phoneButtonSoftleftClicked() {
            this.$router.push({ name: "wallets" })
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
            this.$router.push({ name: "wallet", params: { id:this.$route.query.walletId}});
            //this.$router.push({ name: "dashboard" });
        }
    },
    mounted() {
        var userId = localStorage.getItem('user_id').toString();
        var identifierData = Base64.encode(userId);

        this.$http.get(process.env.VUE_APP_URL+'transactionhistory', {params: {walletId: identifierData, secretType: this.$route.params.secretType}}).then((response) => {
            if (response.data) {
                this.loading = false
                this.items = response.data
            } else {
                this.loading = false
                this.$toastr.e("An error has occurred. Please try again.")
            }
        }).catch((error) => {
            this.errors = error.data?.errors || error
        }).then(() => this.loading = false);

        window.removeEventListener('keydown', this.onKeyDown);
    },
    beforeDestroy() {
        document.addEventListener('keydown', this.onKeyDown);
    }
}
</script>

<style scoped>
.mb-3{
  padding-left: 14px;
  margin: 15px;
}
.loader{
    text-align: center;
}
</style>
