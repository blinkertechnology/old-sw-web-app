<template>
    <div>
        <kaiui-separator :title="$t('pages.contacts.title')" />
        
        <div v-if="contacts && contacts.length > 0">
            <list-item 
                v-for="(contact, index) in contacts"
                :key="index"
                :primaryText="contact.name"
                :secondaryText="contact.address"
                :softkeys="{
                    center: toTransactionData ? $t('select') : $t('options')
                }"
                v-on:softCenter="toTransactionData ? toTransaction(contact) : showOptions(contact)"
            />
        </div>

        <kaiui-button 
            :title="$t('pages.contacts.newContact')" 
            v-on:softCenter="newContact" 
            v-bind:softkeys="{
                center: $t('select'),
                left: $t('back'),
            }"
        />

        <kaiui-dialog
            :title="$t('options')"
            v-model="optionsDialogShowing"
            :softkeys="{
                left: $t('back'),
                center: $t('select')
            }"
            v-on:softLeft="closeOptionsDialog"
        >
            <list-item
                :primaryText="$t('pages.contacts.makeTransaction')"
                :softkeys="{
                    center: $t('select')
                }"
                v-on:softCenter="makeTransaction"
            />

            <list-item
                :primaryText="$t('pages.contacts.delete')"
                :softkeys="{
                    center: $t('select')
                }"
                v-on:softCenter="deleteContact"
            />
        </kaiui-dialog>
    </div>
</template>

<script>
import i18n from "@/lang/setup";

export default {
    data: () => ({
        toTransactionData: null,

        contacts: [],

        selectedContact: null,
        optionsDialogShowing: false,
    }),

    methods: {
        async getContacts() {
            this.showLoading();

            try {
                const response = await this.$http.get('/user/contacts');
                const { data } = response;
                const { contacts } = data;

                this.contacts = contacts;
            } catch(err) {
                console.error(err);
                this.showDialog(i18n.t("genericErrorTitle"), i18n.t("genericError"));
            } finally {
                this.hideLoading();
            }
        },

        async deleteContact() {
            this.showLoading();

            try {
                const response = await this.$http.delete(`/user/contacts/${this.selectedContact.id}`);

                // Refresh list
                this.getContacts();
            } catch(err) {
                console.error(err);
                this.showDialog(i18n.t("genericErrorTitle"), i18n.t("genericError"));
            } finally {
                this.closeOptionsDialog();
                this.hideLoading();
            }
        },

        newContact() {
            return this.$router.push({ 
                name: "newcontact" 
            });
        },

        showOptions(contact) {
            this.selectedContact = contact;
            this.optionsDialogShowing = true;
        },

        closeOptionsDialog() {
            this.selectedContact = null;
            this.optionsDialogShowing = false;
        },

        makeTransaction() {
            this.$router.push({
                name: 'dashboard',
                query: {
                    tab: 0,
                    toAddress: this.selectedContact.address,
                }
            });

            this.closeOptionsDialog();
        },

        toTransaction(contact) {
            this.$router.push({
                name: 'maketransaction',
                params: {
                    id: this.toTransactionData.walletId,
                    token: this.toTransactionData.walletToken
                },
                query: {
                    toAddress: contact.address
                }
            })
        }
    },

    mounted() {
        this.getContacts();

        // If either walletId or walletToken was present as a query paremeter, it means
        // that the user came from the transaction page and wanted to selected a contact to 
        // transact with
        const { walletId, walletToken } = this.$route.query;
        if(walletId || walletToken) {
            this.toTransactionData = {
                walletId: walletId,
                walletToken: walletToken,
            }
        }
    }
}
</script>