<template>
    <kaiui-content>
      <kaiui-header title="Sorted Wallet" />
      <kaiui-tab-item name="Make Transaction" selected>
            <kaiui-separator title="Make Transaction" />
                <form method="POST">
                    <div v-if="recordExist">
                        <kaiui-input
                        label="To Wallet (try scan)"
                        v-model="transaction.toAddress"
                        class="kaiui-p_btn kaiui-input-input form-control"
                        placeholder="To Address"/>
                    </div>
                    <div v-else>
                        <div data-v-665c6f1c="" 
                            class="kaiui-input kaiui-p_btn kaiui-input-input form-control" 
                            value="343434">
                                <label 
                                    data-v-6860e009="" 
                                    class="kaiui-p_sec kaiui-input-label">
                                    To Wallet
                                </label>
                                <div class="address">{{this.transaction.toAddress}}</div>
                        </div>
                    </div>
                    <kaiui-button 
                        title="Scan QR (Wallet Address)"
                        v-on:softCenter="openCam"/>
                    <kaiui-input
                        type="number"
                        label="Amount"
                        class="kaiui-p_btn kaiui-input-input form-control"
                        placeholder="Amount"
                        v-model="transaction.amount"/>

                    <kaiui-input
                        label="Pin Code"
                        v-model="transaction.pincode"
                        class="kaiui-p_btn kaiui-input-input form-control"
                        placeholder="Pin Code"/>

                    <kaiui-button
                        title="Submit" 
                        v-bind:softkeys="softkeysPhoneTwo"
                        v-on:softCenter="submittransaction"/>
                </form>
        </kaiui-tab-item>
        <SoftKey :softkeys.sync="softkeys" />
    </kaiui-content>
</template>

<script>
import SoftKey from "../SoftKey";

export default {
    props: ['walletdata'],
    components: {
      SoftKey
    },
    data() {
        return {
            transaction: {
                amount:"",
                toAddress: "",
                pincode:""
            },
            softkeys: {
                left: "Back",
                center: "",
                right: ""
            },
            recordExist:true,
            softkeysPhoneTwo: { center: "Select"},
            singlewallet: null,
        }
    },
    methods: {
        submittransaction () {
            if(Number.isInteger(parseInt(this.transaction.amount)) !== true){
                this.$toastr.e('Amount Need to be Numeric')
                return false
            }
            if(this.transaction.toAddress === ""){
                this.$toastr.e('To Address Field Required')
                return false
            }
            if(Number.isInteger(parseInt(this.transaction.pincode)) !== true){
                this.$toastr.e('Numeric Pincode Field Required.')
                return false
            }

            const pincode = this.transaction.pincode.length
            if(pincode > 6){
                this.$toastr.e('Pincode Length shound be less than 7')
                return false
            } else if(pincode < 4){
                this.$toastr.e('Pincode Length shound be greater than 3')
                return false
            }

            var userId = localStorage.getItem('user_id').toString();
            let arr1 = this.transaction? this.transaction : '';
            let arr2 = this.singlewallet;
            this.$http.post(process.env.VUE_APP_URL+'executetransaction', [arr1, arr2]).then(response => {
                if (response.data.success === true) {
                    this.loading = false
                    const params = {
                        'userid': userId, 
                        'transHash': response.data.result.transactionHash, 
                        'secrettype': this.singlewallet.secretType,
                        'address': this.singlewallet.address,
                        'amount': this.transaction.amount,
                        'wallet_to': this.transaction.toAddress
                    }
                    this.$http.post(process.env.VUE_APP_URL+'createtransaction', params).then(response => {console.log(response)})
                    this.isForm = false
                    this.$toastr.s('Transfer Sucessfully!')
                    localStorage.removeItem('singlewalletdata')
                    this.$router.push({ name: "wallet", params: { id:this.$route.query.walletId}})
                } else{
                    const errors = response.data.errors
                    this.receiveValue(errors)
                }
            }).catch(error => {
                this.receiveValue(error)
            }).then(() => this.loading = false);
        },
        openCam(){
            this.$router.push({ name: "camera" , query: { walletId: this.$route.query.walletId}});
        },
        receiveValue(val){
            this.$toastr.e(val[0].message)
            return false
        },
        onKeyDown(event) {
          switch (event.key) {
            case "SoftLeft":
              return this.leftNext();
            default:
              break;
          }
        },
        leftNext (){
            this.$router.push({ name: "wallet", params: { id:this.$route.query.walletId}})
        }
    },
    mounted() {
        const x = localStorage.getItem('singlewalletdata')
        const data = JSON.parse(x)
        this.singlewallet = data
        if( this.walletdata !== undefined ) {
            localStorage.setItem('singlewalletdata', JSON.stringify(this.walletdata))
        }
        const qrdata = this.$route.query.qrData;
        if(qrdata){
            this.recordExist = false;
            this.transaction.toAddress = this.$route.query.qrData;
        }
        document.addEventListener('keydown', this.onKeyDown);
    },
    beforeDestroy() {
        window.removeEventListener('keydown', this.onKeyDown);
    }
}
</script>

<style scoped>
.address{
    word-wrap: break-word;
    word-break: break-word;
    hyphens: auto;
}
</style>