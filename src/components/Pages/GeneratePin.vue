<template>
  <kaiui-content>
    <kaiui-header title="Sorted Wallet" />
    <kaiui-separator title="Create your pin code" />
    <div v-if="loading" class="loading">
      <img src="/assets/loader.gif" />
    </div>
    <div v-else>
        <kaiui-tab-item name="Generate Pin" selected>
        <form method="POST" class="text-left">
            <kaiui-input
                type="number"
                label="Pin"
                v-model="user.pin"
                class="kaiui-input-input form-control"
                placeholder="Enter Pin"
            />
            <kaiui-input
                type="number"
                label="Confirm Pin"
                v-model="user.confirmpin"
                class="kaiui-input-input form-control"
                placeholder="Re-enter Pin"
            />
            <kaiui-text text="Please keep it for future wallet transactions."/>
            <kaiui-button
                v-bind:softkeys="softkeysPhone"
                v-on:softCenter="generatepinnow"
                title="Submit"
            />
        </form>
      </kaiui-tab-item>
    </div>
  </kaiui-content>
</template>

<script>
const { Base64 } = require("js-base64");
export default {
    data() {
        var userId = localStorage.getItem("user_id");
        var walletUserEncryption = Base64.encode(userId);
        return {
            user: {
                pin: "",
                confirmpin: "",
                user: walletUserEncryption
            },
            loading: true,
            softkeysPhone: { center: "Select" },
        }
    },
    methods: {
        generatepinnow() {
            if (isNaN(this.user.pin) === true) {
                this.$toastr.e("Numeric Pin Required")
                return false
            }
            if (this.user.pin === "") {
                this.$toastr.e("Pin Required");
                return false;
            }
            if (isNaN(this.user.confirmpin) === true) {
                this.$toastr.e("Numeric Confirm Pin Required")
                return false
            }
            if (this.user.pin !== this.user.confirmpin) {
                this.$toastr.e("Entered pin not match")
                return false
            }
            
            const pin = this.user.pin.length;
            if (pin > 6) {
                this.$toastr.e("Pin Length shound be less than 7");
                return false;
            } else if (pin < 4) {
                this.$toastr.e("Pin Length shound be greater than 3");
                return false;
            }
            
            this.loading = true
            this.$http.post(process.env.VUE_APP_URL + "savepin", this.user).then((response) => {
                if (response.data == "success") {
                    this.loading = false
                    this.$toastr.s("Pin saved successfully!")
                    this.$router.push({ name: "dashboard" })
                } else {
                    this.$toastr.s("Something went wrong! Please try again later")
                    this.loading = false;
                }
            })
            .catch((error) => {
                this.$toastr.s("Something went wrong! Please try again later")
            }).then(() => (this.loading = false));
        }
    },
    mounted() {
        const userId = localStorage.getItem("user_id");        
        if(userId === null) {
            this.$router.push({ name: "homepage" })
        }
        this.$http.get(process.env.VUE_APP_URL + "getpin", {
            params: { userid: userId }
        })
        .then((response) => {
            if (response.data[0].walletpin) {
            this.loading = false;
            this.$router.push({ name: "homepage" })
            }
        })
        .catch((error) => {
            this.$toastr.e("Something went wrong. Please try again later.")
            return false
        })
        .then(() => (this.loading = false));
    }
};
</script>

<style scoped>
.loading {
  text-align: center;
}
</style>