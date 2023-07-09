<template>
    <div class="kaiui-listitem" 
        v-bind:nav-selectable="true" 
        tabindex="0" 
        v-on:focus="handleFocusChange(true)"
        v-on:blur="handleFocusChange(false)"
        v-on:click="onClick"
    >
        <div class="kaiui-listitem-text-wrapper">
            <span class="kaiui-p_pri kaiui-listitem-primary-text">{{ primaryText }}<span class="kaiui-listitem-primary-secondary-text">{{ primarySecondaryText }}</span></span>
            <span class="kaiui-p_sec kaiui-listitem-secondary-text">{{ secondaryText }}</span>
            <span class="kaiui-p_thi kaiui-listitem-tertiary-text">{{ tertiaryText }}</span>
        </div>

        <div v-if="iconRight" class="listitem-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
        </div>
    </div>
</template>
  
<script>
/**
 * This is a copy from the kaiui-list-item component
 */
export default {
    name: "list-item",
    props: {
        /**
         * The Softkeys Object
         * @type {{ left: String, center: String, right: String }}
         * @default { center: "Select" }
         */
        softkeys: {
            default: () => ({ center: "Select" }),
            type: Object,
            required: false,
        },
        /**
         * The Primary Text
         */
        primaryText: {
            type: String,
            required: true,
        },
        primarySecondaryText: {
            type: String,
            required: false,
        },
        /**
         * The Secondary Text
         */
        secondaryText: {
            type: String,
            required: false,
        },
        /**
         * The Tertiary Text
         */
        tertiaryText: {
            type: String,
            required: false,
        },
        iconRight: {
            default: false,
            type: Boolean,
            required: false,
        },
    },
    data: () => ({
        isDestroyed: false,
    }),

    mounted() {
        this.$on("softkey-left-pressed", () => {
            /**
             * Emit the event `softLeft` when left softkey is selected
             */
            this.$emit("softLeft");
        });
        this.$on("softkey-right-pressed", () => {
            /**
             * Emit the event `softRight` when right softkey is selected
             */
            this.$emit("softRight");
        });
        this.$on("softkey-center-pressed", () => {
            /**
             * Emit the event `softCenter` when center softkey is selected
             */
            this.$emit("softCenter");
        });
    },
    destroyed() {
        /**
         * This was required, becaues somehow, the v-on:focus event would be called,
         * and the component would register it's softkeys again
         */
        this.isDestroyed = true;
    },

    methods: {
        /**
         * @private
         */
        handleFocusChange(isNowFocused) {
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
    },
};
</script>
  
<style>
.kaiui-listitem {
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    min-height: 60px;
    max-height: 60px;
    padding: 0 10px;
    text-overflow: ellipsis;
    overflow: hidden;
    outline: 0;
}

.kaiui-listitem[nav-selected="true"] {
    background-color: var(--listitem-selected-background-color);
}

.kaiui-listitem .kaiui-listitem-text-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    flex: 1;
}

.kaiui-listitem .kaiui-listitem-text-wrapper span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.kaiui-listitem[nav-selected="true"] .kaiui-listitem-primary-text {
    color: var(--listitem-selected-text-color);
}

.kaiui-listitem[nav-selected="true"] .kaiui-listitem-secondary-text {
    color: var(--listitem-selected-text-color);
}

.kaiui-listitem[nav-selected="true"] .kaiui-listitem-tertiary-text {
    color: var(--listitem-selected-text-color);
}

.listitem-icon {
    width: 25px;
    display: flex;
}
.kaiui-listitem[nav-selected="true"] .listitem-icon svg {
    color: var(--listitem-selected-text-color);
}

.kaiui-listitem-primary-secondary-text {
    font-size: small;
}
</style>
  