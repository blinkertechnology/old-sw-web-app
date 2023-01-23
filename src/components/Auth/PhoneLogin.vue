<template>
    <kaiui-content>
        <kaiui-header :title="$t('title')" />

        <kaiui-separator :title="$t('login')" />

        <div v-if="!codeSend">
            <kaiui-text
                :text="$t('pages.login.instructions1')"
            />

            <br />

            <list-item 
                :primaryText="selectedCountry.name"
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

            <kaiui-button 
                :title="$t('next')"
                :softkeys="{
                    center: $t('select')
                }"
                v-on:softCenter="sendCode"
            />

            <kaiui-dialog
                :title="$t('pages.login.title')"
                v-model="showCountryDialog"
                :softkeys="{
                    left: $t('cancel'),
                    center: $t('select'),
                }"
            >
                <custom-input
                    placeholder="search"
                    type="text"
                    v-on:input="onSearch"
                />

                <kaiui-radiogroup
                    v-model="selectedCountryId"
                >
                    <kaiui-radiobutton 
                        v-for="c in allCountries"
                        :key="c.isoCode"
                        :value="c.isoCode"
                        :primaryText="c.name"
                        :secondaryText="c.dialCode"
                        :softkeys="{
                            left: $t('cancel'),
                            center: $t('select'),
                        }"
                        v-on:softLeft="closeCountryDialog"
                    />
                </kaiui-radiogroup>
            </kaiui-dialog>
        </div>

        <div v-if="codeSend">
            <kaiui-text
                :text="$t('pages.login.instructions2', {
                    phone: `${this.selectedCountry.dialCode} ${phoneNumber}`
                })"
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
import { logout, login } from '@/auth';
import countries from '@/countries.json';

export default {
    components: {
        SoftKey
    },
    data() {
        return {
            codeSend: false,

            phoneNumber: null,
            code: null,
            selectedCountryId: null,

            allCountries: countries,

            showCountryDialog: false,   
        }
    },
    computed: {
        selectedCountry() {
            return this.allCountries.find(c => c.isoCode === this.selectedCountryId) || this.allCountries[0];
        }
    },
    mounted() {
        logout();
        
        this.selectedCountryId = this.allCountries[0].isoCode;
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
            this.$nextTick(() => {
                this.$refs.phoneNumber.focus();
            })
        },

        onSearch(search) {
            if(!search.length) {
                this.allCountries = countries;
                return;
            }

            this.allCountries = countries.filter(c => {
                return c.name.includes(search) || c.dialCode.includes(search) || c.isoCode.includes(search);
            })
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

            try {
                this.showLoading('Sending one-time code.');

                const response = await this.$http.post('auth/login/phone', {
                    phone: `${this.selectedCountry.dialCode}${cleanedNumberInput}`,
                    ...(this.codeSend ? { code: this.code } : null)
                })
                const { data } = response;

                if(!this.codeSend) {
                    // Code was send, update UI
                    this.codeSend = true;
                } else {
                    const { access_token, user } = data;

                    login(access_token, user);

                    // PIN setup is required
                    if(user.require_pin) {
                        return this.$router.push({ name: "generatepin" });
                    }

                    this.$router.push({ name: "dashboard" });
                }
            } catch(err) {
                return this.showDialog(i18n.t('genericErrorTitle'), err.generic);
            } finally {
                this.hideLoading();
            }
        }
    }
}
</script>