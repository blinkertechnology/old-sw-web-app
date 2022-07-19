<template>
    <kaiui-content>
      <kaiui-header title="Sorted Wallet" />
      <kaiui-separator title="Transaction Records" />
        <div v-if="loading" class="loader">
            <img src="/assets/loader.gif"/>
        </div>
        <div v-else>
            <div v-for="item in items" :key="item['hash']" class="customclass row lead border mb-3" nav-selectable="true">
                <div class="col-sm-5 col-md-6">Secret Type: <b>Ethereum</b></div>
                <div class="col-sm-5 col-md-6">Status: <b>{{ item['txreceipt_status'] === '1' ? 'Success' : 'Fail' }}</b></div>
                <div class="col-sm-5 col-md-6">Amount: <b>{{ item['value']  / 1000000000000000000 }}</b></div>
                <div class="col-sm-5 col-md-6">Transaction From: </div>
                <div class="address"><b>{{ item['from'] }}</b></div>
                <div class="col-sm-5 col-md-6">Transaction To: </div>
                <div class="address"><b>{{ item['to'] }}</b></div>
                <div class="col-sm-5 col-md-6">Transaction At: </div>
                <div class="address"><b>{{ new Date(item['timeStamp'] * 1000).toLocaleString() }}</b></div>
            </div>
        </div>
        <SoftKey :softkeys.sync="softkeys" />
    </kaiui-content>
</template>

<script>
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
        },
        onFulfilled(transRecords){
            if (transRecords) {
                this.loading = false
                this.items = transRecords
            } else {
                this.loading = false
                this.$toastr.e("Something wrong happen. Please try again after sometime.")
            }
        }
    },
    mounted() {
        this.walletaddress = this.$route.params.secretType;
        var api = require('etherscan-api').init(process.env.ETHER_SCAN_API_ONE, 'rinkeby')
        var txlist = api.account.txlist(this.walletaddress, 1, 'latest', 1, 5, 'desc')

        const p = Promise.resolve(txlist)
        p.then((v) => {
            this.onFulfilled(v.result)
        })
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
