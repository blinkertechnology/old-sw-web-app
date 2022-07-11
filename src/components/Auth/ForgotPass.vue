<template>
    <kaiui-content>
        <kaiui-header title="Sorted Wallet" />
        <kaiui-tab-item name="Forgot Password" selected>
            <kaiui-separator title="Forgot Password" /> 
            <div v-if="loading" class="loader">
                <img src="/assets/loader.gif"/>
            </div>
            <div v-else>
                <form 
                method="POST"
                class="text-left">
                    <kaiui-input
                    type="text"
                    v-model="userPass.email"
                    label="Email Address"
                    class="kaiui-p_btn kaiui-input-input form-control"
                    placeholder="Email"/>
                    
                    <kaiui-button
                    v-bind:softkeys="softkeysPhone"
                    v-on:softCenter="forgotPass"
                    v-on:softLeft="sendBack"
                    title="Send Password Reset Link"/>
                </form>
            </div>
        </kaiui-tab-item>
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
            userPass: {
                email: null
            },
            softkeysPhone: { left: "Back", center: "Select" },
            loading: false,
            softkeys: {
                left: "Back",
                center: "",
                right: ""
            },
        }
    },
    methods: {
        forgotPass: function () {
            if (!this.userPass.email) {
                this.$toastr.e("Email Required")
                return false
            }
            this.loading = true
            this.$http.post(process.env.VUE_APP_URL+'forget-password', this.userPass).then(response => {
                if(response.data === 'success'){
                    this.loading = false
                    this.$toastr.s('We have e-mailed your password reset link!')
                    this.$router.push({ name: "login" })
                } else {
                    this.loading = false
                    this.$toastr.e('Something went wrong. Please try again after some time')
                }
            }).catch(error => {
                this.$toastr.e('Something went wrong. Please try again after some time')
            }).then(() => this.loading = false);
        },
        sendBack: function (){
            this.$router.push({ name: "homepage" })
        },
        onKeyDown(event) {
          switch (event.key) {
            case "SoftLeft":
              return this.sendBack();
            default:
              break;
          }
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