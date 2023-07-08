<template>
  <kaiui-content>
    <kaiui-header :title="$t('title')" />

    <kaiui-tab-item :name="$t('pages.signup.title')" selected>
      <kaiui-separator :title="$t('pages.signup.title')" />
   
      <div v-if="!verificationCodeSend">
        <kaiui-text :text="$t('pages.signup.instructions1')" />
        <div>
          <form method="POST" class="text-left">
            <list-item
              :primaryText="this.selectedCountryId? selectedCountry.name: 'Please select a country'"
              :icon-right="true"
              :icon-left="true"
              v-on:softCenter="showCountryDialog = true"
            
            />
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
          <kaiui-dialog
            :title="$t('pages.signup.title')"
            v-model="showCountryDialog"
            :softkeys="{
              left: $t('cancel'),
              center: $t('select'),
              right: $t('agree'),
            }"
          >
            <custom-input
              placeholder="search"
              type="text"
              v-on:input="onSearch" 
              label="Please select a country"
            />

            <kaiui-radiogroup v-model="selectedCountryId">
              <kaiui-radiobutton
                v-for="c in allCountries"
                :key="c.isoCode"
                :value="c.isoCode"
                :primaryText="c.name"
                :softkeys="{
                  left: $t('cancel'),
                  center: $t('select'),
                  right: $t('agree'),
                }"
                v-on:softLeft="closeCountryDialog"
                v-on:softRight="closeCountryDialog"
                
              />
              
            </kaiui-radiogroup>
          </kaiui-dialog>
        </div>
      </div>
      <div v-if="verificationCodeSend">
        <kaiui-text
          :text="
            $t('pages.signup.instructions2', {
              email: `${this.user.email}`,
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
import countries from "@/countries.json";

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
      selectedCountryId: null,
      showCountryDialog: false,
      allCountries: countries,
    };
  },
  computed: {
    selectedCountry() {
      return (
        this.allCountries.find((c) => c.isoCode === this.selectedCountryId) ||
        {dialCode: null, name: null, isoCode: null}
      );
    },
  },

  methods: {
    onSelect() {
      this.agree = !this.agree;
    },
    closeCountryDialog() {
      this.showCountryDialog = false;
      this.allCountries = countries;
      this.$nextTick(() => {
        this.$refs.phoneNumber.focus();
      });
    },
    onSearch(search) {
      if (!search.length) {
        this.allCountries = countries;
        return ;
      }

      this.allCountries = countries.filter((c) => {
        return (
          c.name.includes(search) ||
          c.name.toLowerCase().includes(search) ||
          c.dialCode.includes(search) ||
          c.isoCode.includes(search)
        );
      });
    },

    async sendVerificationCode() {

      if(this.selectedCountry.dialCode == null){
        
        this.showDialog("", i18n.t("pages.signup.cCodeRequired"));
        return false;
      }
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
          c_code: parseInt(this.selectedCountry.dialCode.substring(1)),
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
<style scoped>
.kaiui-radiobutton {
  align-items: center;
}
</style>