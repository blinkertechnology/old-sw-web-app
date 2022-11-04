<template>
  <kaiui-content>
    <kaiui-header title="Sorted Wallet" />
    <kaiui-tab-item name="Forgot Password" selected>
      <kaiui-separator title="Forgot Password" />
      <div v-if="loading" class="loader">
        <img src="/assets/loader.gif" />
      </div>
      <div v-else>
        <form method="POST" class="text-left">
          <kaiui-input
            type="text"
            v-model="userPass.email"
            label="Email"
            class="kaiui-p_btn kaiui-input-input form-control"
            placeholder="Email"
          />

          <kaiui-button
            v-bind:softkeys="softkeysPhone"
            v-on:softCenter="forgotPass"
            v-on:softLeft="sendBack"
            title="Reset Password"
          />
        </form>
      </div>
    </kaiui-tab-item>
    <SoftKey 
      :softkeys.sync="softkeys"
      v-on:softLeft="sendBack"
    />
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
      softkeysPhone: { center: "Select" },
      loading: false,
      softkeys: {
        left: "Back",
        center: "",
        right: ""
      }
    };
  },
  methods: {
    forgotPass: function () {
      if (!this.userPass.email) {
        this.$toastr.e("Email Required");
        return false;
      }

      this.loading = true;
      let xhr = new XMLHttpRequest();
      xhr.open("POST", process.env.VUE_APP_URL + "forget-password", true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onreadystatechange  = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          const status = xhr.status;
          if (status === 0 || (status >= 200 && status < 400)) {
            // The request has been completed successfully
            const response = xhr.responseText;
            if (response === "success") {
              this.loading = false;
              this.$toastr.s("We have e-mailed your password reset link!");
              this.$router.push({ name: "login" });
            } else {
              this.loading = false;
              this.$toastr.e(
                "Something went wrong. Please try again after some time"
              );
            }
          } else {
            this.$toastr.e("Something went wrong. Please try again after some time");
          }
        }
      }
      xhr.onerror = function(error){
        console.error( error );
      }
      const obj = {
          "email": this.userPass.email
      };
      xhr.send(JSON.stringify(obj));
    },
    sendBack: function () {
      this.$router.push({ name: "login" });
    },
  },
};
</script>
