<template>
    <div class="ad-container" 
        v-show="adShowing"
        v-bind:nav-selectable="true" 
        tabindex="0" 
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
    }),

    mounted() {
        console.log('KaiOSAd mounted');
        this.showAd();

        this.$on("softkey-center-pressed", () => {
           console.log('softkey-center-pressed');
        });
    },

    methods: {
        showAd(timeout = 10 * 1000) {
            // eslint-disable-next-line no-undef
            getKaiAd({
                publisher: process.env.VUE_APP_KAI_AD_PUBLISHER_ID,
                app: process.env.VUE_APP_KAI_AD_APP,
                slot: process.env.VUE_APP_KAI_AD_SLOT,
                test: 0,
                timeout,

                container: document.querySelector('.ad-container__ad'),

                h: 50,
                w: 240,

                onerror: err => console.error(err),
                onready: ad => {
                    this.adShowing = true;

                    ad.call('display', {
                        tabindex: 5,
                        display: 'block'
                    })

                    this.src = document.querySelector('.ad-container__ad iframe').src;

                    console.log(this.src);

                    // const iframe = document.querySelector('.ad-container__ad iframe');
                    // console.log(iframe);
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