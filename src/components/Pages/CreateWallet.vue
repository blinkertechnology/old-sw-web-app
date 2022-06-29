<template>
  <kaiui-content>
    <kaiui-header title="Sorted Wallet App" />
      <kaiui-tab-item name="Register" selected>
        <div v-if="loading" class="loader">
          <kaiui-separator title="Creating Wallet" />
        </div>
        <div v-else>
          <kaiui-separator title="Create Wallet" />
        </div>
        <kaiui-header title="Sorted Wallet" />
          <div v-if="loading" class="loader">
            Creating Wallet. Please wait for a moment...
          </div>
          <div v-else>
            <kaiui-text text=""/>
            <kaiui-text text=""/>
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
                      <kaiui-radiobutton value="USDC" primaryText="USDC"/>
                  </kaiui-radiogroup>
              </kaiui-dialog>

              <kaiui-input
                  label="Pin Code (The pin that will encrypt and decrypt the wallet. Importrant for transaction between wallets.)"
                  type="text"
                  v-model="wallet.pincode"
                  class="kaiui-p_btn kaiui-input-input"
                  placeholder="Pin Code"/>

              <kaiui-input
                  label="Description"
                  type="text"
                  v-model="wallet.description"
                  class="kaiui-p_btn kaiui-input-input"
                  placeholder="description"/>

                <kaiui-button 
                  title="Create Wallet" 
                  v-bind:softkeys="softkeysPhone"
                  v-on:softCenter="createWallet"/>
            </form>
          </div>
          <SoftKey :softkeys.sync="softkeys" />
          </kaiui-tab-item>
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
      createWallet: function () {
        if (!this.wallet.secretType) {
          this.$toastr.e("Secret type Required")
          return false
        }
        if (!this.wallet.pincode) {
          this.$toastr.e("Pin Code Required")
          return false
        }
        if (Number.isInteger(this.wallet.pincode)) {
          this.$toastr.e("Can only contain digits")
          return false
        }

        this.loading = true
        this.$http.post(process.env.VUE_APP_URL+'createwallet', this.wallet).then(response => {    
          if (response.data.result.id !== '' && response.data.result.id !== undefined) {
              this.$router.push({ name: "wallets" });
              this.$toastr.s('Walllet Created!')
              this.loading = false
          }
        }).catch(error => {
          this.$toastr.s('Something went wrong! Please try again later.')
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
            return this.sendBack();
          default:
            break;
        }
      },
      sendBack() {
        this.$router.push({ name: "dashboard" });
      }
    },
    beforeDestroy() {
        document.addEventListener('keydown', this.onKeyDown);
    },
    mounted() {
        window.removeEventListener('keydown', this.onKeyDown);
    }
}
</script>

<style scoped>
.hiddenvalues{
  display: hidden !important;
}
</style>