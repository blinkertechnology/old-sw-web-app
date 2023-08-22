<template>
    <div>
        <kaiui-separator :title="$t('pages.dashboard.myWallets')" />

        <div v-if="getWalletsList().length">
            <list-item
                v-for="(wallet, index) in getWalletsList()"
                :key="index"
                :primaryText="wallet.primaryLabel"
                :primarySecondaryText="wallet.primarySecondaryLabel"
                :secondaryText="wallet.secondaryLabel"
                :softkeys="softkeysPhone"
                v-on:softCenter="showOptionsDialog(wallet.item)"
            />
            
            <kai-os-ad :isFullAd="isFullAdVisible" />
        </div>

        <kaiui-dialog
            :title="actionDialogTitle"
            v-model="showActionDialog"
            :softkeys="softkeysDialog"
            v-on:softLeft="closeDialogs"
        >
            <div v-if="showShareDialog">
                <list-item
                    :primaryText="$t('pages.dashboard.shareEmail')"
                    :softkeys="softkeysListItem"
                    v-on:softCenter="shareViaEmail"
                    v-on:softLeft="closeDialogs"
                />
                <list-item
                    :primaryText="$t('pages.dashboard.shareMessage')"
                    :softkeys="softkeysListItem"
                    v-on:softCenter="shareViaMessage"
                    v-on:softLeft="closeDialogs"
                />
            </div>

            <div v-if="showQRCodeDialog">
                <div v-if="selectedWallet" class="qrcode">
                <qr-code
                    :size="140"
                    :text="selectedWallet.address"
                    style="display: block"
                    class="m-auto"
                />
                </div>
            </div>

            <div v-if="!showShareDialog && !showQRCodeDialog">
                <list-item
                :primaryText="$t('pages.dashboard.makeTransaction')"
                v-on:softCenter="toMakeTransaction"
                v-on:softLeft="closeDialogs"
                />
                <list-item
                :primaryText="$t('pages.dashboard.qrCode')"
                v-on:softCenter="showQRCode"
                v-on:softLeft="closeDialogs"
                />
                <list-item
                :primaryText="$t('pages.dashboard.transactionRecords')"
                v-on:softCenter="toTransactionList"
                v-on:softLeft="closeDialogs"
                />
                <list-item
                :primaryText="$t('pages.dashboard.share')"
                v-on:softCenter="showShare"
                v-on:softLeft="closeDialogs"
                />
            </div>
        </kaiui-dialog>
    </div>
</template>

<script>
import i18n from "@/lang/setup";
import KaiOSAd from "@/components/common/KaiOSAd.vue";

export default {
    components: {
        "kai-os-ad": KaiOSAd,
    },
    data: () => ({
        items: [],

        selectedWallet: null,
        showActionDialog: false,
        showQRCodeDialog: false,
        showShareDialog: false,

        showFullAd: false,
    }),
    computed: {
        isFullAdVisible() {
            return this.showFullAd;
        },
        actionDialogTitle() {
            if(this.showQRCodeDialog) {
                return i18n.t("pages.dashboard.qrCode");
            }
            if(this.showShareDialog) {
                return i18n.t("pages.dashboard.share");
            }
            return i18n.t("options");
        },

        softkeysPhone: () => ({
            center: i18n.t("options"),
        }),
        softkeysDialog: () => ({
            left: i18n.t("cancel"),
        }),
        softkeysListItem: () => ({
            left: i18n.t("cancel"),
            center: i18n.t("select"),
        }),
    },
    mounted() {
        this.getWallets();

        this.showFullAd = !this.showFullAd;

        this.$root.$on("close-dialog", () => {
            this.closeDialogs();
        });
        this.$root.$on("close-ad", () => {
            this.showFullAd = !this.showFullAd;
        });
    },
    methods: {
        async getWallets() {
            this.showLoading();

            try {
                const response = await this.$http.get("wallets");
                const { data } = response;

                this.items = data.wallets || [];
            } catch (err) {
                this.showDialog(i18n.t("genericErrorTitle"), err.generic);
            } finally {
                this.hideLoading();
            }
        },
        getWalletsList() {
            const walletsForDisplay = [];

            this.items.forEach((item) => {
                let usdAmount = item.usd.toFixed(2);
                walletsForDisplay.push({
                    primaryLabel:
                        item.balance.balance +
                        " " +
                        i18n.t(`wallets.${item.secretType.toLowerCase()}`),
                    primarySecondaryLabel: "",
                    secondaryLabel: `$${usdAmount} USD`,
                    item: item,
                });
                if (item.tokens.length) {
                    item.tokens.forEach((token) => {
                        usdAmount = token.usd.toFixed(2);
                        walletsForDisplay.push({
                            primaryLabel:
                                token.balance +
                                " " +
                                i18n.t(
                                    `wallets.${item.secretType.toLowerCase()}_${token.symbol.toLowerCase()}`
                                ),
                            primarySecondaryLabel: i18n.t(
                                `wallets.${item.secretType.toLowerCase()}_alternate`
                            ),
                            secondaryLabel: `$${usdAmount} USD`,
                            item: {
                                ...token,
                                id: item.id,
                                address: item.address,
                            },
                        });
                    });
                }
            });

            return walletsForDisplay;
        },

        showOptionsDialog(wallet) {
            this.selectedWallet = wallet;
            this.showActionDialog = true;
            this.showQRCodeDialog = false;
            this.showShareDialog = false;

            this.$root.$emit("dialog-opened");
        },

        closeDialogs() {
            if(this.showShareDialog) {
                this.showShareDialog = false;
            } else if (this.showQRCodeDialog) {
                this.showQRCodeDialog = false;
            } else {
                this.showActionDialog = false;
                this.showQRCodeDialog = false;
                this.showShareDialog = false;
                this.selectedWallet = null;

                this.$root.$emit("dialog-closed");
            }
        },

        showQRCode() {
            this.showShareDialog = false;
            this.showActionDialog = true;
            this.showQRCodeDialog = true;

            this.$root.$emit("dialog-opened");
        },

        showShare() {
            this.showActionDialog = true;
            this.showShareDialog = true;
            this.showQRCodeDialog = false;

            this.$root.$emit("dialog-opened");
        },

        backToDashboard() {
            this.$router.push({ name: "dashboard" });
        },

        toMakeTransaction() {
            this.$router.push({
                name: "maketransaction",
                params: {
                id: this.selectedWallet.id,
                ...(this.selectedWallet.symbol
                    ? { token: this.selectedWallet.symbol }
                    : {}),
                },
            });
        },
        toTransactionList() {
            this.$router.push({
                name: "transactionslist",
                params: {
                    id: this.selectedWallet.id,
                    ...(this.selectedWallet.symbol
                        ? { token: this.selectedWallet.symbol }
                        : {}),
                },
            });
        },

        shareViaEmail() {
            window.location.href = `mailto:?body=${this.selectedWallet.address}`;
        },
        shareViaMessage() {
            window.location.href = `sms:?body=${this.selectedWallet.address}`;
        },
    }
}
</script>

<style scoped>
.qrcode {
    display: flex;
    justify-content: center;

    margin-top: 10px;
    margin-bottom: 10px;
}

.qrcode img {
    width: 100%;
}
</style>