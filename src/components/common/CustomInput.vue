<template>
    <div class="kaiui-input">
        <label class="kaiui-p_sec kaiui-input-label">{{ label }}</label>
        <input class="kaiui-p_btn kaiui-input-input" 
            :type="inputType" 
            :placeholder="placeholder"
            v-on:input="onInput" 
            v-bind:nav-selectable="true" 
            :pattern="pattern"
            :value="value"
            ref="input"

            v-on:click="onClick" 
            v-on:focus="handleFocusChange(true)"
            v-on:blur="handleFocusChange(false)"
        />
    </div>
</template>

<script>
export default {
    name: "custom-input",
    props: {
        placeholder: {
            type: String,
            required: false,
        },
        label: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: false,
        },
        pattern: {
            type: String,
            required: false,
        },
        showable: {
            type: Boolean,
            required: false,
            default: false,
        },
        value: {
            type: String,
            required: false,
            default: null,
        },
        disabled: {
            type: Boolean,
            require: false,
            default: false,
        }
    },
    data() {
        return {
            inputType: null,
        }
    },
    computed: {
        softkeys() {
            if(this.showable) {
                return {
                    left: 'Show'
                }
            }

            return null;
        }
    },
    mounted() {
        this.inputType = this.type;

        if(this.showable) {
            this.$on("softkey-left-pressed", (e) => {
                if(this.type === 'password') {
                    this.inputType = this.inputType === 'password' ? 'text' : 'password';
                }
            });
        }
    },
    methods: {
        /**
         * @private
         */
        onInput($event) {
            this.$emit("input", $event.target.value);
        },
        handleFocusChange(isNowFocused) {
            if (isNowFocused) {
                /**
                 * @private
                 */
                if(this.softkeys) this.$root.$emit("update-softkeys-register", this);
            } else {
                /**
                 * @private
                 */
                 if(this.softkeys) this.$root.$emit("update-softkeys-unregister");
            }
        },
        onClick() {
            this.handleFocusChange(true);

            /**
             * @private
             */
            this.$root.$emit("set-element-selected", this.$el);
        },

        focus() {
            this.$nextTick(() => {
                this.$root.$emit("set-element-selected", this.$refs.input);
            });
        }
    },
};
</script>

<style scoped>
.kaiui-input {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    margin: 10px 10px;
    position: relative;
    font: inherit;
}

.kaiui-input .kaiui-input-input {
    width: 100%;
    border: 1px solid var(--input-border-color);
    padding: 10px;
    outline: 0;
    box-sizing: border-box;
}

.kaiui-input .kaiui-input-label {
    color: var(--input-placeholder-color);
    margin-bottom: 5px;
}

.kaiui-input .kaiui-input-input::placeholder {
    color: var(--input-placeholder-color);
}

.kaiui-input .kaiui-input-input[nav-selected="true"] {
    border: 1px solid var(--input-selected-color);
    text-shadow: var(--input-text-shadow-color);
}
</style>