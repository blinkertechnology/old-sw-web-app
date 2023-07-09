<template>
  <kaiui-content>
    <kaiui-header :title="$t('title')" />

    <kaiui-separator :title="$t('login')" />

    <div v-if="!codeSend">
      <kaiui-text :text="$t('pages.login.instructions1')" />

      <br />

      <list-item
        :primaryText="this.selectedCountryId? selectedCountry.name: 'Please select country code'"
        :secondaryText="selectedCountry.dialCode"
        :icon-right="true"
        :icon-left="true"
        v-on:softCenter="showCountryDialog = true"
      />

      <custom-input
        :label="$t('phoneNumber')"
        :placeholder="$t('phoneNumber')"
        type="tel"
        v-model="phoneNumber"
        ref="phoneNumber"
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
        :title="$t('next')"
        :softkeys="{
          center: $t('select'),
        }"
        v-on:softCenter="sendCode"
      />

      <kaiui-dialog
        :title="$t('pages.login.title')"
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
          label="Please select country code"
        />

        <kaiui-radiogroup v-model="selectedCountryId">
          <kaiui-radiobutton
            v-for="c in allCountries"
            :key="c.isoCode"
            :value="c.isoCode"
            :primaryText="c.name"
            :secondaryText="c.dialCode"
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

    <div v-if="codeSend">
      <kaiui-text
        :text="
          $t('pages.login.instructions2', {
            phone: `${this.selectedCountry.dialCode} ${phoneNumber}`,
          })
        "
      />

      <custom-input
        :label="$t('otpCode')"
        :placeholder="$t('otpCode')"
        type="tel"
        v-model="code"
      />

      <kaiui-button
        :title="$t('login')"
        :softkeys="{
          center: $t('select'),
        }"
        v-on:softCenter="sendCode"
      />
    </div>

    <SoftKey
      :softkeys="{
        left: $t('back'),
      }"
      v-on:softLeft="sendBack"
    />
  </kaiui-content>
</template>

<script>
import SoftKey from "../SoftKey";
import i18n from "@/lang/setup";
import { logout, login } from "@/auth";
import countries from "@/countries.json";

export default {
  components: {
    SoftKey,
  },
  data() {
    return {
      softkeysPhone: {
        center: i18n.t("select"),
        right: i18n.t("tac.agree"),
      },
      agree: false,
      softkeys: {
        left: i18n.t("tac.scrollDown"),
      },
      loader: true,
      codeSend: false,

      phoneNumber: null,
      code: null,
      selectedCountryId: null,

      allCountries: countries,

      showCountryDialog: false,
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
  mounted() {
    logout();

    // this.selectedCountryId = this.allCountries[0].isoCode;
  },
  methods: {
    onSelect() {
      this.agree = !this.agree;
    },
    sendBack() {
      if (this.codeSend) {
        this.codeSend = false;
      } else {
        this.$router.push({
          name: "homepage",
        });
      }
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
        return;
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

    /**
     * Send the verification code to the inputted phone
     */
    async sendCode() {
      this.$cookies.set("TAC_agreed", true, { expires: "90D" });
      if(this.selectedCountry.dialCode=="None"){
        return this.showDialog("Error", "Select a valid country code.");
      }
      if (!this.phoneNumber || this.phoneNumber.length < 1) {
        return this.showDialog("Error", "Enter a valid phone number.");
      }

      if (!this.agree) {
        this.showNotice("", "", i18n.t("tac.error"));
        return false;
      }
     
      if (this.codeSend && !this.code && this.code.length != 6) {
        return this.showDialog("Error", "Enter a valid one-time code.");
      }

      // Basic phone number verification
      const cleanedNumberInput = parseInt(this.phoneNumber.replace(/ /g, ""));

      try {
        this.showLoading("Sending one-time code.");

        const response = await this.$http.post("auth/login/phone", {
          phone: `${this.selectedCountry.dialCode}${cleanedNumberInput}`,
          ...(this.codeSend ? { code: this.code } : null),
          ...{ c_code: parseInt(this.selectedCountry.dialCode.substring(1)) },
        });
        const { data } = response;

        if (!this.codeSend) {
          // Code was send, update UI
          this.codeSend = true;
        } else {
          const { access_token, user } = data;

          login(access_token, user);

          // PIN setup is required
          if (user.require_pin) {
            return this.$router.push({ name: "generatepin" });
          }

          this.$router.push({ name: "dashboard" });
        }
      } catch (err) {
        return this.showDialog(i18n.t("genericErrorTitle"), err.generic);
      } finally {
        this.hideLoading();
      }
    },
  },
};
</script>
