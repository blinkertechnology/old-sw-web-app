<template>
    <kaiui-content>
      <kaiui-header title="Sorted Wallet" />
      <kaiui-separator title="Transaction Records" />
        <div v-if="loading" class="loader">
            <img src="/assets/loader.gif"/>
        </div>
        <div v-else>
            <div v-for="item in items" :key="item['hash']" class="customclass row lead border mb-3" nav-selectable="true">
                <div class="col-sm-5 col-md-6">Secret Type: <b>{{ item['secret_type'] }}</b></div>
                <div class="col-sm-5 col-md-6">Status: <b>{{ item['status'] }}</b></div>
                <div class="col-sm-5 col-md-6">Amount: <b>{{ item['amount'] }}</b></div>
                <div class="col-sm-5 col-md-6">Transaction From: </div>
                <div class="address"><b>{{ item['from']}}</b></div>
                <div class="col-sm-5 col-md-6">Transaction To: </div>
                <div class="address"><b>{{ item['to'] }}</b></div>
                <div class="col-sm-5 col-md-6">Transaction At: </div>
                <div class="address"><b>{{ item['created_at'] }}</b></div>
            </div>
        </div>
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
            },
            walletaddress:null
        }
    },
    methods: {
        onKeyDown(event) {
            switch (event.key) {
            case "SoftLeft":
                return this.sendBacknow()
            default:
                break;
            }
        },
        sendBacknow(){
            this.$router.push({ name: "wallet", params: { id:this.$route.query.walletId}})
            this.$router.go()
        }
    },
    mounted() {
        this.walletaddress = this.$route.query.walletId;
        var userId = localStorage.getItem('user_id').toString()
        var identifierData = Base64.encode(userId)
        this.$http.get(process.env.VUE_APP_URL+'transactionhistory', {
            params: {
                walletId: identifierData,
                address: this.$route.params.secretType
            }
        }).then((response) => {
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
        
        document.addEventListener('keydown', this.onKeyDown);
    },
    beforeDestroy() {
        window.removeEventListener('keydown', this.onKeyDown);
    }
}
</script>

<style scoped>
.mb-3{
  padding-left: 14px;
  margin: 15px;
  border-bottom: 1px solid grey;
}
.loader{
    text-align: center;
}
.address{
    word-wrap: break-word;
    word-break: break-word;
    hyphens: auto;
}
.customclass{
    text-align: center;
}
</style>
