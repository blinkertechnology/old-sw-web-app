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
                :title="$t('pages.contacts.scan')" 
                v-on:softCenter="openCam" 
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
                v-on:softLeft="goback" 
            />
        </form>

        <SoftKey :softkeys="{
            left: $t('back')
        }" v-on:softLeft="goback" />
    </kaiui-content>
</template>

<script>
import SoftKey from "../SoftKey";

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
        const { address } = this.$route.query;
        if(address) {
            this.contact.address = address;
        }
    },
    methods: {
        async saveContact() {
            if(!this.contact.name || this.contact.name.length < 1) {
                return this.showDialog('', 'A name for this contact is required.');
            }
            if(!this.contact.address || this.contact.address.length < 1) {
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

        openCam() {
            this.$router.push({
                name: "camera",
                query: {
                    type: "contact"
                }
            })
        },

        goback() {
            this.$router.push({
                name: "dashboard",
            });
        },
    }
}
</script>