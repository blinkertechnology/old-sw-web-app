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
            <custom-input
                type="tel"
                label="Pin"
                v-model="pin"
                class="kaiui-input-input form-control"
                placeholder="Enter Pin"
                pattern="[0-9]+"
            />
            <custom-input
                type="tel"
                label="Confirm Pin"
                v-model="confirmpin"
                class="kaiui-input-input form-control"
                placeholder="Re-enter Pin"
                pattern="[0-9]+"
            />
            <kaiui-text text="Please keep it for future wallet transactions."/>
            <kaiui-button
                v-bind:softkeys="softkeysPhone"
                v-on:softCenter="onSubmit"
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
        return {
            pin: "",
            confirmpin: "",
            loading: false,
            softkeysPhone: { 
                center: "Select" 
            },
        }
    },
    methods: {
        onSubmit() {
            var userId = localStorage.getItem("user_id");
            var user = Base64.encode(userId);
        
            console.log(this.pin, this.confirmpin);

            if (isNaN(this.pin) === true) {
                this.showNotice("", "Error", "Numeric Pin Required.");
                return false
            }
            if (this.pin === "") {
                this.$toastr.e("Pin Required");
                return false;
            }
            if (isNaN(this.confirmpin) === true) {
                this.$toastr.e("Numeric Confirm Pin Required")
                return false
            }
            if (this.pin !== this.confirmpin) {
                this.$toastr.e("Entered pin not match")
                return false
            }
            
            const pin = this.pin.length;
            if (pin > 6) {
                this.$toastr.e("Pin Length shound be less than 7");
                return false;
            } else if (pin < 4) {
                this.$toastr.e("Pin Length shound be greater than 3");
                return false;
            }
            
            this.loading = true
            let xhr = new XMLHttpRequest();
            xhr.open("POST", process.env.VUE_APP_URL + "savepin", true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange  = () => {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    const status = xhr.status;
                    if (status === 0 || (status >= 200 && status < 400)) {
                        // The request has been completed successfully
                        const response = xhr.responseText;
                        if (response == "success") {
                            this.loading = false
                            this.$toastr.s("Pin saved successfully!")
                            this.$router.push({ name: "dashboard" })
                        } else {
                            this.$toastr.s("Something went wrong! Please try again later")
                            this.loading = false;
                        }
                    } else {
                        this.$toastr.s("Something went wrong! Please try again later")
                        this.loading = false;
                    }
                }
            }
            xhr.onerror = function(error){
                console.error( error );
            }
            const obj = {
                "pin": this.pin,
                "confirmpin": this.confirmpin,
                "user": user
            };
            console.log(obj);
            xhr.send(JSON.stringify(obj));
        }
    }
};
</script>

<style scoped>
.loading {
  text-align: center;
}
</style>