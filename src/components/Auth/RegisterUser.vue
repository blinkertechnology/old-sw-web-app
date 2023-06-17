<template>
  <kaiui-content>
    <kaiui-header :title="$t('title')" />

    <kaiui-tab-item :name="$t('pages.signup.title')" selected>
      <kaiui-separator :title="$t('pages.signup.title')" />
      <div v-if="!verificationCodeSend">
        <div>
          <form method="POST" class="text-left">
            <kaiui-input
              type="email"
              :label="$t('email')"
              v-model="user.email"
              class="kaiui-p_btn kaiui-input-input form-control"
              :placeholder="$t('email')"
            />

            <custom-input
              :label="$t('password')"
              v-model="user.password"
              type="password"
              class="kaiui-p_btn kaiui-input-input form-control"
              :placeholder="$t('password')"
              :showable="true"
            />
            <kaiui-checkbox
              :primaryText="$t('tac.confirm.primary')"
              :secondaryText="$t('tac.confirm.secondary')"
              class="tandc"
              v-bind:softkeys="softkeysPhone"
              v-on:softCenter="onSelect"
              id="myCheck"
            />
            <kaiui-button
              :softkeys="{
                center: $t('select'),
                left: $t('back'),
              }"
              v-on:softCenter="sendVerificationCode"
              v-on:softLeft="sendBack"
              :title="$t('register')"
            />
          </form>
        </div>
      </div>
      <div v-if="verificationCodeSend">
        <kaiui-text
          :text="
            $t('pages.login.instructions2', {
              phone: `${this.user.email}`,
            })
          "
        />

        <custom-input
          :label="$t('otpCode')"
          :placeholder="$t('otpCode')"
          type="tel"
          v-model="verificationCode"
        />

        <kaiui-button
          :title="$t('login')"
          :softkeys="{
            center: $t('select'),
          }"
          v-on:softCenter="sendVerificationCode"
        />
      </div>
      <SoftKey
        :softkeys="{
          left: $t('back'),
        }"
        v-on:softLeft="sendBack"
      />
    </kaiui-tab-item>
  </kaiui-content>
</template>

<script>
import SoftKey from "../SoftKey";
import i18n from "@/lang/setup";
import { login } from "@/auth";

export default {
  components: {
    SoftKey,
  },
  data() {
    return {
      user: {
        email: null,
        password: null,
      },
      softkeysPhone: {
        center: i18n.t("select"),
        right: i18n.t("tac.agree"),
      },
      agree: false,
      softkeys: {
        left: i18n.t("tac.scrollDown"),
      },
      loader: true,
      verificationCodeSend: false,
      verificationCode: null,
    };
  },
  methods: {
    onSelect() {
      this.agree = !this.agree;
    },

    async sendVerificationCode() {
      if (!this.user.email) {
        this.showDialog("", i18n.t("pages.signup.emailRequired"));
        return false;
      }
      if (!this.user.password) {
        this.showDialog("", i18n.t("pages.signup.passwordRequired"));
        return false;
      }
      try {
        const response = await this.$http.post("auth/signup", {
          email: this.user.email,
          password: this.user.password,
          ...(this.verificationCodeSend
            ? { verificationCode: this.verificationCode }
            : null),
        });
        const { data } = response;

        if (!this.verificationCodeSend) {
          // Code was send, update UI
          this.verificationCodeSend = true;
        } else {
          const { access_token, user } = data;
          login(access_token, user);
          if (user.require_pin) {
            return this.$router.push({ name: "generatepin" });
          }
          return this.$router.push({ name: "homepage" });
        }
      } catch (err) {
        console.log(err);

        this.showDialog(i18n.t("genericErrorTitle"), err.generic);
      } finally {
        this.hideLoading();
      }
    },
    logUser: async function () {
      if (!this.agree) {
        this.showNotice("", "", i18n.t("tac.error"));
        return false;
      }
      console.log("inside on agree. new value is", this.agree);
      this.$cookies.set("TAC_agreed", true, { expires: "90D" });

      if (!this.user.email) {
        this.showDialog("", i18n.t("pages.signup.emailRequired"));
        return false;
      }
      if (!this.user.password) {
        this.showDialog("", i18n.t("pages.signup.passwordRequired"));
        return false;
      }
      const pass = this.user.password.length;
      if (pass < 5) {
        this.showDialog("", i18n.t("pages.signup.passwordLength"));
        return false;
      }

      this.loading = true;

      this.showLoading();

      try {
        const response = await this.$http.post("auth/signup", {
          email: this.user.email,
          password: this.user.password,
        });
        const { data } = response;
        const { access_token, user } = data;

        login(access_token, user);

        if (user.require_pin) {
          return this.$router.push({ name: "generatepin" });
        }

        return this.$router.push({ name: "homepage" });
      } catch (err) {
        console.log(err);

        this.showDialog(i18n.t("genericErrorTitle"), err.generic);
      } finally {
        this.hideLoading();
      }
    },
    sendBack() {
      this.$router.push({ name: "homepage" });
    },
  },
};
</script>
