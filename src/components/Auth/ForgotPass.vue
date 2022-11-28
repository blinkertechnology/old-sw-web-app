<template>
  <kaiui-content>
    <kaiui-header :title="$t('title')" />
    
    <kaiui-separator :title="$t('pages.forgotPassword.title')" />

    <div>
      <form method="POST" class="text-left">
        <custom-input
          type="text"
          v-model="email"
          :label="$t('email')"
          :placeholder="$t('email')"
        />

        <kaiui-button
          v-bind:softkeys="softkeysPhone"
          v-on:softCenter="forgotPass"
          v-on:softLeft="sendBack"
          :title="$t('pages.forgotPassword.resetPassword')"
        />
      </form>
    </div>

    <SoftKey 
      :softkeys.sync="softkeys"
      v-on:softLeft="sendBack"
    />
  </kaiui-content>
</template>

<script>
import SoftKey from "../SoftKey";
import i18n from '@/lang/setup';

export default {
  components: {
    SoftKey
  },
  data() {
    return {
      email: null,
      softkeysPhone: { 
        center: i18n.t('select') 
      },
      softkeys: {
        left: i18n.t('back')
      }
    };
  },
  methods: {
    async forgotPass() {
      if(!this.email) {
        return this.showDialog(i18n.t('error'), 'Enter a valid email address.');
      }

      try {
        this.showLoading();

        await this.$http.post('auth/forget-password', {
          'email': this.email
        });

        this.showDialog(i18n.t('success'), `An email has been send to ${this.email} with instructions on how to reset your password.`);
      } catch(err) {
        console.log(err);

        this.showDialog(i18n.t('error'), i18n.t('genericError'));
      } finally {
        this.hideLoading();
      }
    },
    sendBack: function () {
      this.$router.push({ 
        name: "login" 
      });
    },
  },
};
</script>
