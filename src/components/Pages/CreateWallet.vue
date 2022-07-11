<template>
  <kaiui-content>
    <kaiui-header title="Sorted Wallet" />
      <kaiui-tab-item name="Register" selected>
        <div v-if="loading" class="loader">
          <kaiui-separator title="Creating Wallet" />
        </div>
        <div v-else>
          <kaiui-separator title="Create Wallet" />
        </div>
        <div v-if="loading" class="loader">
          <img src="/assets/loader.gif"/>
          Creating Wallet. Please wait for a moment...
        </div>
        <div v-else>
          <div class="card-body">
            <form method="POST">
              <kaiui-button 
                title="Select Wallet Type" 
                v-on:softCenter="showValueSelectorDialog"
                v-on:softLeft="phoneButtonSoftleftClicked"/>
                
              <kaiui-dialog
                  title="Select"
                  v-model="shouldShowValueSelectorDialog"
                  v-on:softLeft="valueSelectorDialogLeftSelected"
                  v-on:softRight="valueSelectorDialogRightSelected">
                  <kaiui-radiogroup v-model="wallet.secretType">
                      <kaiui-radiobutton value="BITCOIN" primaryText="BITCOIN"/>
                      <kaiui-radiobutton value="ETHEREUM" primaryText="ETHEREUM"/>
                      <kaiui-radiobutton value="MATIC" primaryText="MATIC"/>
                  </kaiui-radiogroup>
              </kaiui-dialog>

              <kaiui-input
                  label="Pin Code"
                  type="text"
                  v-model="wallet.pincode"
                  class="kaiui-p_btn kaiui-input-input"
                  placeholder="Pin Code"/>
              <div nav-selectable="true">(The pin that will encrypt and decrypt the wallet. Important for transaction between wallets.)</div>
              <kaiui-input
                  label="Description"
                  type="text"
                  v-model="wallet.description"
                  class="kaiui-p_btn kaiui-input-input"/>

                <kaiui-button 
                  title="Create Wallet" 
                  v-bind:softkeys="softkeysPhone"
                  v-on:softCenter="Createnewwallet"
                  v-on:softLeft="sendBack"/>
            </form>
          </div>
          <kaiui-text text=""/>
          <kaiui-text text=""/>
        </div>
      </kaiui-tab-item>
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
        var userId = localStorage.getItem('user_id').toString();
        var identifierData = Base64.encode(userId+'_wallet');
        return {
            wallet: {
                identifier: identifierData,
                walletType: 'WHITE_LABEL',
                secretType: null,
                pincode: null,
                description: null,
            },
            errors: {},
            shouldShowValueSelectorDialog: false,
            selectedInputValue: null,
            softkeysPhone: {left: "Back", center: "Select"},
            loading: false,
            softkeys: {
                left: "Back",
                center: "",
                right: ""
            }
        }
    },
    methods: {
      Createnewwallet () {
        if (this.wallet.secretType === null) {
          this.$toastr.e("Secret type Required")
          return false
        }
        if(Number.isInteger(parseInt(this.wallet.pincode)) !== true){
            this.$toastr.e('Numeric Pincode Field Required.')
            return false
        }
        const pincode = this.wallet.pincode.length
        if(pincode > 6){
            this.$toastr.e('Length shound be less than 6')
            return false
        } else if(pincode < 4){
            this.$toastr.e('Length shound be greater than 4')
            return false
        }

        if (this.wallet.description === null) {
          this.$toastr.e("Description Required")
          return false
        }

        this.loading = true
        this.$http.post(process.env.VUE_APP_URL+'createwallet', this.wallet).then(response => {  
          if (response.data.success === true) {
              this.$router.push({ name: "wallets" });
              this.$toastr.s('Walllet Created!')
              this.loading = false
          } else {
            this.loading = false
            const errors = response.data.errors
            this.receiveValue(errors)
          }
        }).catch(error => {
            this.receiveValue(error)
        }).then(() => this.loading = false);
      },
      phoneButtonSoftleftClicked() {
        this.$router.push({ name: "dashboard" });
      },
      showValueSelectorDialog() {
        this.shouldShowValueSelectorDialog = !this.shouldShowValueSelectorDialog
      },
      valueSelectorDialogRightSelected() {
        this.$toastr.s('Selected')
      },
      valueSelectorDialogLeftSelected() {
        this.$toastr.e('Cancel')
      },
      onKeyDown(event) {
          switch (event.key) {
          case "SoftLeft":
              return this.sendBacktodashboard()
          default:
              break;
          }
      },
      sendBacktodashboard() {
        this.$router.push({ name: "dashboard" });
      },
      receiveValue(val){
          this.$toastr.e(val[0].message)
          return false
      }
    },
    mounted() {
      document.addEventListener('keydown', this.onKeyDown);
    },
    beforeDestroy() {
      window.removeEventListener('keydown', this.onKeyDown);
    }
}
</script>

<style scoped>
.hiddenvalues{
  display: hidden !important;
}
</style>