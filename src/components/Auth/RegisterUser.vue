<template>
  <kaiui-content>
     <kaiui-header title="Sorted Wallet" />
      <kaiui-tab-item name="Register" selected>
        <kaiui-separator title="Register" /> 
          <form
            method="POST"
            class="text-left">
            <kaiui-input
                type="text"
                label="Username"
                v-model="user.username"
                class="kaiui-p_btn kaiui-input-input form-control"
                placeholder="User Name"/>

            <kaiui-input
              type="email"
              label="Email"
              v-model="user.email"
              class="kaiui-p_btn kaiui-input-input form-control"
              placeholder="Email Address"/>

            <kaiui-input
              label="Password"
              v-model="user.password"
              type="password"
              class="kaiui-p_btn kaiui-input-input form-control"
              placeholder="Password"/>
    
            <kaiui-button
              v-bind:softkeys="softkeysPhone"
              v-on:softCenter="logUser"
              v-on:softLeft="sendBack"
              title="Register"
            />
          </form>
          <SoftKey :softkeys.sync="softkeys" />
        </kaiui-tab-item>
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
            user: {
                email: null,
                password: null,
            },
            softkeysPhone: { left: "Back", center: "Select" },
            softkeys: {
              left: "Back",
              center: "",
              right: ""
            }
        }
    },
    methods: {
      logUser: function () {
          if (!this.user.email) {
            this.$toastr.e("Email Required!")
            return false
          }
          if (!this.user.password) {
            this.$toastr.e("Password Required!")
            return false
          }
          this.$http.post(process.env.VUE_APP_URL+'register', this.user).then(response => {
              if (response.data == "success") {
                this.$toastr.s('Register Successfully!')
                  this.$router.push({ name: "dashboard" })
              } else {
                  this.$router.push({ name: "Register" })
                  this.$toastr.e('An error has occurred. Please try again.')
              }
          }).catch(error => {
            this.$toastr.e(error.response.data.message)
          })
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
          this.$router.push({ name: "homepage"})
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
