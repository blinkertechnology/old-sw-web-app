<template>
  <div
    class="ad-container"
    ref="adContainer"
    v-show="adShowing"
    v-bind:nav-selectable="true"
    tabindex="1"
    v-on:focus="handleFocusChange(true)"
    v-on:blur="handleFocusChange(false)"
  >
    <div class="ad-container__ad">
    </div>
  </div>
</template>

<script>
import i18n from "@/lang/setup";

export default {
  data: () => ({
    adShowing: false,
    softkeys: {
      center: i18n.t("view"),
    },
    ad: null,
    adContainer: null,
    adClicked: false,
  }),
  props: {
    isFullAd: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    if(this.isFullAd){
      this.adContainer = this.$refs.adContainer;
    }

    this.$nextTick(() => {
      this.showAd();
    });
    

    this.$on("softkey-center-pressed", () => {
      this.ad.call("click");
      this.adClicked = true;
      this.closeAd();
    });

    this.$root.$on("close-internal-browser", () => {
      this.closeAd();

      this.$root.$emit("internal-browser-closed");
    });
  },

  methods: {
    showAd(timeout = 10 * 1000) {
      // Get the ad container element.
      if (this.isFullAd) {
        const adContainerElement = document.querySelector(".ad-container");

        // Set the CSS properties of the ad container element.
        adContainerElement.style.width = "100%";
        adContainerElement.style.height = "100%";
        adContainerElement.style.position = "absolute";
        adContainerElement.style.top = "0";
        adContainerElement.style.left = "0";
      }

      // eslint-disable-next-line no-undef
      getKaiAd({
        publisher: process.env.VUE_APP_KAI_AD_PUBLISHER_ID,
        app: process.env.VUE_APP_KAI_AD_APP,
        slot: process.env.VUE_APP_KAI_AD_SLOT,
        test: parseInt(process.env.VUE_APP_KAI_AD_TEST),
        timeout,
        container: this.isFullAd? this.$refs.adContainer.querySelector(".ad-container__ad"): document.querySelector(".ad-container__ad"),

        h: this.isFullAd ? window.innerHeight : 50,
        w: this.isFullAd ? window.innerWidth : 240,

        onerror: (err) => console.error(err),
        onready: (ad) => {
          this.adShowing = true;
          this.ad = ad;
          this.$nextTick(() => {
            // Set focus on the adContainer element
            if(this.isFullAd){
              this.adContainer.focus();
            }
            
          });
          if (this.isFullAd) {
            ad.call("display", {
              position: "absolute",
              tabindex: 5,
            });
            if(!this.adClicked){


              this.timeoutID = setTimeout(() => {
              if(!this.adClicked)
               this.closeAd();
            }, 10 * 1000);}
            
          } else {
            ad.call("display", {
              tabindex: 5,
              display: "block",
            });
          }
          ad.on("click", () => {
            this.$root.$emit("internal-browser-opened");
          });
        },
      });
    },
    closeAd() {
      this.adShowing = false;
      this.$root.$emit("close-ad");
      this.$root.$emit("update-softkeys-unregister");
      if(this.isFullAd){
        this.adContainer = null
      }
    },

    /**
     * @private
     */
    handleFocusChange(isNowFocused) {
      if (this.isDestroyed) return;

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
  },
};
</script>

<style>
.ad-container {
  width: 100%;
  /* height: 100%; */
  z-index: 9998;
}

.ad-container__ad {
  height: 50px;
  /* width: 100%; */
}
.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 9999;
  background: transparent;
  border: none;
  padding: 10px;
  border-radius: 50%;
  color: #000;
  font-weight: bold;
  cursor: pointer;
}
</style>
