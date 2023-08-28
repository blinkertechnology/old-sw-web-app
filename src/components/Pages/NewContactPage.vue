<template>
    <kaiui-content>
        <kaiui-header :title="$t('title')" />

        <kaiui-separator :title="$t('pages.contacts.newContact')" />

        <form method="POST">
            <custom-input 
                type="text" 
                :label="$t('pages.contacts.name')" 
                v-model="contact.name"
                :placeholder="$t('pages.contacts.name')" 
            />

            <kaiui-button 
                :title="$t('pages.contacts.scanQR')" 
                v-on:softCenter="pickImage" 
                v-bind:softkeys="{
                    center: $t('select')
                }" 
            />

            <custom-input 
                type="text" 
                :label="$t('pages.contacts.address')" 
                v-model="contact.address"
                :placeholder="$t('pages.contacts.address')" 
            />

            <kaiui-button 
                :title="$t('pages.contacts.create')" 
                v-bind:softkeys="{
                    center: $t('select'),
                    left: $t('back')
                }" 
                v-on:softCenter="saveContact"
                v-on:softLeft="goBack" 
            />
        </form>

        <SoftKey 
            :softkeys="{
                left: $t('back')
            }" 
            v-on:softLeft="goBack"
        />
    </kaiui-content>
</template>

<script>
import SoftKey from "../SoftKey";
import i18n from '@/lang/setup';
import QrcodeDecoder from 'qrcode-decoder';
import { normalizeAddress } from '@/lib/qr';

export default {
    components: {
        SoftKey
    },
    data: () => ({
        contact: {
            name: null,
            address: null,
        }
    }),
    mounted() {
        /**
         * When the route query parameters contain an "address" key, prefill
         * the contact address with it
         */
        const { address } = this.$route.query;
        if (address) {
            this.contact.address = address;
        }
    },
    methods: {
        async saveContact() {
            if (!this.contact.name || this.contact.name.length < 1) {
                return this.showDialog('', 'A name for this contact is required.');
            }
            if (!this.contact.address || this.contact.address.length < 1) {
                return this.showDialog('', 'An address for this contact is required.');
            }

            try {
                this.showLoading();

                const response = await this.$http.post('/user/contacts', {
                    name: this.contact.name,
                    address: this.contact.address,
                });

                return this.$router.push({
                    name: "dashboard",
                    query: {
                        tab: 1,
                        success: 'Contact saved.'
                    }
                });
            } catch (err) {
                console.error(err);
                this.showDialog('Error', err.generic);
            } finally {
                this.hideLoading();
            }
        },

        async pickImage() {
            const vueCtx = this;

            const qr = new QrcodeDecoder();
            let activity = new window.MozActivity({
                name: 'pick',
                data: {
                    type: 'image/*'
                }
            });

            try {
                vueCtx.showLoading();

                activity.onsuccess = async function () {
                    const blob = this.result.blob;

                    if (!blob) {
                        vueCtx.hideLoading();
                        vueCtx.showNotice('', i18n.t('genericErrorTitle'), i18n.t('genericError'));
                    }

                    const reader = new FileReader();
                    reader.addEventListener('load', async function () {
                        const res = await qr.decodeFromImage(reader.result);
                        const { data } = res;

                        if (!data) {
                            vueCtx.showNotice('', '', i18n.t('pages.contacts.scanFailed'));
                        } else {
                            vueCtx.contact.address = normalizeAddress(data);

                            vueCtx.showNotice('', '', i18n.t('pages.contacts.scanQRSuccess'));
                        }

                        vueCtx.hideLoading();
                    });
                    reader.readAsDataURL(blob);
                }

                activity.onerror = function () {
                    vueCtx.hideLoading();
                    vueCtx.showNotice('', i18n.t('genericErrorTitle'), i18n.t('genericError'));
                }
            } catch (err) {
                vueCtx.hideLoading();
                vueCtx.showNotice('', i18n.t('genericErrorTitle'), i18n.t('genericError'));
            }
        },

        goBack() {
            this.$router.push({
                name: "dashboard",
                query: {
                    tab: 1
                }
            });
        },
    }
}
</script>