<template>
    <kaiui-content>
      <kaiui-header title="Sorted Wallet" />
      <kaiui-tab-item name="Wallet Details" selected>
            <kaiui-separator title="Wallet Details" />
            <div v-if="loading" class="loader">
                Loading...
            </div>
            <div v-else>
                <kaiui-text text=""/>
                <ul class="demo">
                    <li>Wallet Type : <b>{{ singlewallet ? singlewallet.secretType : "" }}</b></li>
                    <li>Description : <b>{{ singlewallet ? singlewallet.description : "" }}</b></li>
                    <li>Balance : <b>{{ singlewallet ? singlewallet.balance.balance : "" }}</b></li>
                    <li>Address :</li>
                    <li class="address"><b>{{ singlewallet ? singlewallet.address : "" }}</b></li>
                </ul>

                <div class="card-body">
                    <kaiui-button
                        title="Wallet QR Code" 
                        v-bind:softkeys="softkeysPhone"
                        v-on:softCenter="phoneButtonSoftCenterClicked"
                    />
                    <div class="managestuff">
                        <qr-code :size="180" :text="qraddress" style="display:block" class="m-auto" v-show="isShow"></qr-code>
                    </div>

                    <kaiui-button 
                        title="Transaction Records"
                        v-bind:softkeys="softkeysPhone"
                        v-on:softCenter="softkeysRightBack"
                    />
                    <kaiui-button 
                        title="Make Transaction" 
                        v-bind:softkeys="softkeysPhone"
                        v-on:softCenter="phoneButtonShowTransaction"
                    />

                    <div v-show="isForm">
                        <form method="POST">
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

                            <div v-if="recordExist">
                                <kaiui-input
                                    label="To Wallet (try scan)"
                                    v-model="transaction.toAddress"
                                    class="kaiui-p_btn kaiui-input-input form-control"
                                    placeholder="To Address"/>

                                    <kaiui-button 
                                    title="Scan QR (Wallet Address)"
                                    v-on:softCenter="openCam"
                                    />
                            </div>
                            <div v-else>
                                <div data-v-6860e009="" 
                                    data-v-665c6f1c="" 
                                    class="kaiui-input kaiui-p_btn kaiui-input-input form-control" 
                                    value="343434">
                                        <label 
                                            data-v-6860e009="" 
                                            class="kaiui-p_sec kaiui-input-label">
                                            To Wallet
                                        </label>
                                        {{this.transaction.toAddress}}
                                </div>
                            </div>

                            <kaiui-button
                                title="Submit" 
                                v-bind:softkeys="softkeysPhoneTwo"
                                v-on:softCenter="submittransaction"/>
                        </form>
                    </div>

                    <kaiui-button 
                        title="Back"
                        v-bind:softkeys="softkeysLeft"
                        v-on:softCenter="softkeysLeftBack"
                    />
                    <SoftKey :softkeys.sync="softkeys" />
                </div>
            </div>
        </kaiui-tab-item>
    </kaiui-content>
</template>

<script>
import _ from 'lodash';
const {Base64} = require('js-base64');
import SoftKey from "../SoftKey";

export default {
    components: {
      SoftKey
    },
    data() {
        return {
            singlewallet: null,
            isShow: false,
            isForm: false,
            softkeysPhone: { center: "View" },
            softkeysPhoneTwo: { center: "Select"},
            softkeysLeft: {center: "ok"},
            qraddress: "",
            loading:true,
            transaction: {
                amount:"",
                toAddress: "",
                pincode:""
            },
            recordExist:true,
            items : null,
            urlId : null,
            softkeys: {
                left: "Previous",
                center: "",
                right: "Next"
            }
        }
    },
    methods: {
        softkeysLeftprevious (){
            this.fetchWalletIds();
            var num = this.items.findIndex(element => element.id === this.urlId);
            const indexPrevnum = num-1;
            if(indexPrevnum >= 0){
                this.$router.push({ name: "wallet", params: { id:this.items[indexPrevnum].id }})
                this.$router.go();
            }
        }, 
        softkeysRightNext (){
            this.fetchWalletIds();
            var num = this.items.findIndex(element => element.id === this.urlId);
            const indexPrevnum = num+1;
            if(indexPrevnum <= this.items.length){
                this.$router.push({ name: "wallet", params: { id:this.items[indexPrevnum].id }})
                this.$router.go();
            }
        },
        phoneButtonSoftCenterClicked (){
            this.isShow = true
            this.isForm = false
        },
        phoneButtonShowTransaction (){
            this.isForm = true
            this.isShow = false
        },
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
                this.$toastr.e('Length shound be less than 6')
                return false
            } else if(pincode < 4){
                this.$toastr.e('Length shound be greater than 4')
                return false
            }

            var userId = localStorage.getItem('user_id').toString();
            let arr1 = this.transaction? this.transaction : '';
            let arr2 = this.singlewallet;
            this.$http.post(process.env.VUE_APP_URL+'executetransaction', [arr1, arr2]).then(response => {
                if (response.data.success === true) {
                    this.loading = false;
                    const params = {'userid': userId, 'transHash': response.data.result.transactionHash, 'secrettype': this.singlewallet.secretType, 'address': this.singlewallet.address};
                    this.$http.post(process.env.VUE_APP_URL+'createtransaction', params).then(response => {console.log(response)});
                    this.isForm = false;
                    this.$toastr.s('Transfer Sucessfully!')
                } else{
                    const errors = response.data.errors
                    this.receiveValue(errors)
                }
            }).catch(error => {
                this.receiveValue(error)
            }).finally(() => this.loading = false);
        },
        softkeysLeftBack () {
            this.$router.push({ name: "wallets" });
        },
        softkeysRightBack () {
            this.$router.push({ name: "transactionslist", params: { secretType:this.singlewallet.secretType }, query: { walletId: this.$route.params.id }})
        },
        openCam(){
            this.$router.push({ name: "camera" , query: { walletId: this.$route.params.id }});
        },
        fetchWalletIds () {
            var userId = localStorage.getItem('user_id').toString();
            var identifierData = Base64.encode(userId+'_wallet');
            this.$http.get(process.env.VUE_APP_URL+'wallets',  { params: {walletId: identifierData}}).then((response) => {
                if (response.status === 200) {
                    this.loading = false
                    this.items = response.data
                } else {
                    this.loading = false
                    return this.$toastr.e("An error has occurred. Please try again.")
                }
            }).catch((error) => {
                return this.errors = error.data?.errors || error
            }).then(() => this.loading = false);
        },
        onKeyDown(event) {
          switch (event.key) {
            case "SoftLeft":
              return this.softkeysLeftprevious();
            case 'SoftRight':
              return this.softkeysRightNext();
            default:
              break;
          }
        },
        receiveValue(val){
            this.$toastr.e(val[0].message)
            return false
        },
    },
    mounted() {
        this.fetchWalletIds();
        const qrdata = this.$route.query.qrData;
        if(qrdata){
            this.isForm = true;
            this.recordExist = false;
            this.transaction.toAddress = this.$route.query.qrData;
        }
        document.addEventListener('keydown', this.onKeyDown);
    },
    created() {
        this.urlId = this.$route.params.id;
        this.$http.get(process.env.VUE_APP_URL+"wallet/"+this.$route.params.id).then((response) => {
           if (response.status === 200) {
                this.loading = false
                this.singlewallet = response ? response.data : '';
                this.qraddress = response.data.address;
            } else {
                this.$toastr.e("Enterd Data is Wrong!")
            }
        }).catch((error) => {
            this.errors = error.data?.errors || error
        }).finally(() => this.loading = false);
    },
    beforeDestroy() {
        window.removeEventListener('keydown', this.onKeyDown);
    }
}
</script>

<style scoped>
.page-link {
    font-size: 20px;
    color: #29b3ed;
    font-weight: 500;
    display: inline-block;
    margin: 20px auto;
    text-align: center;
    border: 1px solid #dee2e6;
    padding: 0.5rem 0.75rem;
    cursor: pointer;
}
ul.demo {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.demo li {
    padding: 5px;
    text-align: center;
}

.kaiui-input {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    margin: 10px 10px;
    position: relative;
    font: inherit;
}

.kaiui-input .kaiui-input-label{
    color: var(--input-placeholder-color);
    margin-bottom: 5px;
}

.kaiui-input .kaiui-input-input {
    width: 100%;
    border: 1px solid var(--input-border-color);
    padding: 10px;
    outline: 0;
    box-sizing: border-box;
}

.managestuff {
    display: flex;
    justify-content: center;
}

.managestuff img{
    width: 100%
}

.loader{
    text-align: center;
}

.demo .address{
    word-wrap: break-word;
    word-break: break-word;
    hyphens: auto;
}
</style>
