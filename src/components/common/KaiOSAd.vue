<template>
    <div class="ad-container" 
        v-show="adShowing"
        v-bind:nav-selectable="true" 
        tabindex="1" 
        v-on:focus="handleFocusChange(true)"
        v-on:blur="handleFocusChange(false)"
    >
        <div class="ad-container__ad"></div>
    </div>
</template>

<script>
import i18n from '@/lang/setup';

export default {
    data: () => ({
        adShowing: false,
        softkeys: {
            center: i18n.t('view')
        },
        ad: null,
    }),

    mounted() {
        this.showAd();

        this.$on("softkey-center-pressed", () => {
            this.ad.call('click');
            this.closeAd();
        });

        this.$root.$on('close-internal-browser', () => {
            this.closeAd();

            this.$root.$emit('internal-browser-closed');
        })
    },

    methods: {
        showAd(timeout = 10 * 1000) {
            // eslint-disable-next-line no-undef
            getKaiAd({
                publisher: process.env.VUE_APP_KAI_AD_PUBLISHER_ID,
                app: process.env.VUE_APP_KAI_AD_APP,
                slot: process.env.VUE_APP_KAI_AD_SLOT,
                test: parseInt(process.env.VUE_APP_KAI_AD_TEST),
                timeout,

                container: document.querySelector('.ad-container__ad'),

                h: 50,
                w: 240,

                onerror: err => console.error(err),
                onready: ad => {
                    this.adShowing = true;
                    this.ad = ad;

                    ad.call('display', {
                        tabindex: 5,
                        display: 'block'
                    });

                    ad.on('click', () => {
                        this.$root.$emit('internal-browser-opened');
                    })
                },
            })
        },
        closeAd() {
            this.adShowing = false;

            this.$root.$emit("update-softkeys-unregister");
        },

        /**
         * @private
         */
         handleFocusChange(isNowFocused) {
            console.log('handleFocusChange');

            if(this.isDestroyed) return;

            if (isNowFocused) {
                /**
                 * @private
                 */
                this.$root.$emit("update-softkeys-register", this);
            } else {
                /**
                 * @private
                 */
                this.$root.$emit("update-softkeys-unregister");
            }
        },
        /**
         * @private
         */
        onClick() {
            this.handleFocusChange(true);
            /**
             * @private
             */
            this.$root.$emit("set-element-selected", this.$el);
        },
    }
}
</script>

<style>
.ad-container {
    width: 100%;

    z-index: 9999;
}

.ad-container__ad {
    height: 50px;
}
</style>