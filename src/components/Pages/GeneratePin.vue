<template>
  <kaiui-content>
    <kaiui-header :title="$t('title')" />

    <kaiui-separator :title="$t('pages.setupPIN.title')" />

    <form method="POST" class="text-left">
        <custom-input
            type="tel"
            :label="$t('pages.setupPIN.pinInput')"
            v-model="pin"
            class="kaiui-input-input form-control"
            :placeholder="$t('pages.setupPIN.pinInput')"
            pattern="[0-9]+"
        />
        <custom-input
            type="tel"
            :label="$t('pages.setupPIN.confirmPinInput')"
            v-model="confirmpin"
            class="kaiui-input-input form-control"
            :placeholder="$t('pages.setupPIN.confirmPinInput')"
            pattern="[0-9]+"
        />
        <kaiui-text :text="$t('pages.setupPIN.instructions1')"/>
        <kaiui-button
            v-bind:softkeys="softkeysPhone"
            v-on:softCenter="onSubmit"
            :title="$t('pages.setupPIN.submit')"
        />
    </form>
  </kaiui-content>
</template>

<script>
const { Base64 } = require("js-base64");
import i18n from '@/lang/setup';

export default {
    data() {
        return {
            pin: "",
            confirmpin: "",
        }
    },
    computed: {
        softkeysDialog: () => ({
            left: i18n.t('cancel')
        }),
        softkeysPhone: () => ({
            center: i18n.t('select') 
        })
    },
    methods: {
        async onSubmit() {
            if(isNaN(this.pin) === true) {
                return this.showDialog(i18n.t('genericErrorTitle'), i18n.t('pages.setupPIN.errors.required'));
            }
            if(this.pin === "") {
                return this.showDialog(i18n.t('genericErrorTitle'), i18n.t('pages.setupPIN.errors.required'));
            }
            if(this.pin !== this.confirmpin) {
                return this.showDialog(i18n.t('genericErrorTitle'), i18n.t('pages.setupPIN.errors.match'));
            }
            
            const pin = this.pin.length;
            if (pin > 6) {
                return this.showDialog(i18n.t('genericErrorTitle'), i18n.t('pages.setupPIN.errors.length'));
            } else if (pin < 4) {
                return this.showDialog(i18n.t('genericErrorTitle'), i18n.t('pages.setupPIN.errors.length'));
            }
            
            this.showLoading();

            try {
                await this.$http.post('pin', {
                    "pin": this.pin,
                    "pinRe": this.confirmpin,
                });
                this.$router.push({ 
                    name: "dashboard" 
                });
            } catch(err) {
                this.showDialog("", err.generic);
            } finally {
                this.hideLoading();
            }
        }
    }
};
</script>