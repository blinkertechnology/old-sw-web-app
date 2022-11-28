<template>
    <kaiui-content>
        <kaiui-header :title="$t('title')" />

        <kaiui-separator :title="$t('login')" />

        <div v-if="!codeSend">
            <kaiui-dialog
                :title="$t('login')"
                v-model="showCountryDialog"
                :softkeys="{
                    left: $t('cancel'),
                    center: $t('select'),
                }"
            >
                <kaiui-radiogroup
                    v-model="selectedCountry"
                >
                    <kaiui-radiobutton 
                        v-for="c in Object.keys(supportedCountries)"
                        :key="c"
                        :value="c"
                        :primaryText="c"
                        :secondaryText="supportedCountries[c]"
                        :softkeys="{
                            left: $t('cancel'),
                            center: $t('select'),
                        }"
                        v-on:softLeft="closeCountryDialog"
                    />
                </kaiui-radiogroup>
            </kaiui-dialog>

            <kaiui-text
                text="Sorted Wallet will send you a one-time code to verify your phone number."
            />

            <br />

            <list-item 
                :primaryText="selectedCountry"
                :secondaryText="supportedCountries[selectedCountry]"
                :icon-right="true"
                :icon-left="true"
                v-on:softCenter="showCountryDialog = true"
            />

            <custom-input
                :label="$t('phoneNumber')"
                :placeholder="$t('phoneNumber')"
                type="tel"
                v-model="phoneNumber"
            />

            <kaiui-button 
                :title="$t('next')"
                :softkeys="{
                    center: $t('select')
                }"
                v-on:softCenter="sendCode"
            />
        </div>

        <div v-if="codeSend">
            <kaiui-text
                :text="`Enter the 6-digit code that was send to ${this.supportedCountries[this.selectedCountry]} ${phoneNumber}.`"
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
                    center: $t('select')
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
import i18n from '@/lang/setup';

export default {
    components: {
        SoftKey
    },
    data() {
        return {
            codeSend: false,

            phoneNumber: null,
            code: null,
            selectedCountry: null,

            supportedCountries: {
                'Hong Kong': '+852',
                'China': "+86"
            },

            showCountryDialog: false,   
        }
    },
    mounted() {
        this.selectedCountry = Object.keys(this.supportedCountries)[0];
    },
    methods: {
        sendBack() {
            if(this.codeSend) {
                this.codeSend = false;
            } else {
                this.$router.push({ 
                    name: "homepage" 
                });
            }
        },
        closeCountryDialog() {
            this.showCountryDialog = false;
        },

        /**
         * Send the verification code to the inputted phone
         */
        async sendCode() {
            if(!this.phoneNumber || this.phoneNumber.length < 1) {
                return this.showDialog('Error', 'Enter a valid phone number.');
            }

            if(this.codeSend && !this.code && this.code.length != 6) {
                return this.showDialog('Error', 'Enter a valid one-time code.');
            }
            
            // Basic phone number verification
            const cleanedNumberInput = parseInt(this.phoneNumber.replace(/ /g, ''));
            console.log(cleanedNumberInput);

            try {
                console.log(this.selectedCountry, this.phoneNumber);

                this.showLoading('Sending one-time code.');

                const response = await this.$http.post('auth/login/phone', {
                    phone: `${this.supportedCountries[this.selectedCountry]}${cleanedNumberInput}`,
                    ...(this.codeSend ? { code: this.code } : null)
                })
                const { data } = response;

                if(!this.codeSend) {
                    // Code was send, update UI
                    this.codeSend = true;
                } else {
                    const { access_token, user } = data;

                    localStorage.setItem('access_token', access_token);
                    localStorage.setItem('user', JSON.stringify(user));

                    // PIN setup is required
                    if(user.require_pin) {
                        return this.$router.push({ name: "generatepin" });
                    }

                    this.$router.push({ name: "dashboard" });
                }
            } catch(err) {
                return this.showDialog('Error', err.generic);
            } finally {
                this.hideLoading();
            }
        }
    }
}
</script>