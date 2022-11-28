<template>
  <div>
    <router-view></router-view>

    <div
      v-if="isLoading"
      class="loading-overlay"
    >
      <img src="/assets/loader.gif" />
    </div>

    <div class="dialog">
      <kaiui-dialog
        :title="dialogData.title"
        v-model="dialogShowing"
        :softkeys="{
          right: $t('ok'),
        }"
        v-on:softRight="closeDialog"
      >
        <kaiui-text
          :text="dialogData.message"
        />
      </kaiui-dialog>
    </div>
  </div>
</template>

<script>
import i18n from '@/lang/setup';

export default {
  name: "app",
  data: () => ({
    dialogOpen: false,

    isLoading: false,

    dialogShowing: false,
    dialogData: {
      title: null,
      message: null,
    },
  }),
  beforeDestroy() {
    document.removeEventListener("keydown", this.onKeyDown);
  },
  mounted() {
    document.addEventListener("keydown", this.onKeyDown);

    const selectedLang = this.$cookies.get('lang');
    if(selectedLang) i18n.locale = selectedLang;

    this.$root.$on('dialog-opened', () => {
      this.dialogOpen = true;
    });
    this.$root.$on('dialog-closed', () => {
      this.dialogOpen = false;
    });

    this.$root.$on('show-dialog', ({ title, message }) => {
      this.dialogShowing = true;

      this.dialogData = {
        title,
        message
      }
    })
    this.$root.$on('hide-dialog', () => {
      this.dialogShowing = false;
    });

    this.$root.$on('show-loading', () => {
      this.isLoading = true;
    });
    this.$root.$on('hide-loading', () => {
      this.isLoading = false;
    });
  },
  methods: {
    /**
     * Hijack backspace key presses, and navigate to previous route
     * Only close the app when the homepage has been reached.
     * 
     * @param {*} event 
     */
    onKeyDown(event) {
      if(event.key === 'Backspace' || event.key === '`') {
        if(this.dialogOpen) {
          event.preventDefault();
          
          return this.$root.$emit('close-dialog');
        }

        const { meta } = this.$route;

        if(meta.prev) {
          event.preventDefault();

          if(typeof meta.prev === 'function') {
            meta.prev(this.$router);
          } else {
            this.$router.push({
              name: meta.prev
            });
          }
        }
      }
    },

    closeDialog() {
      this.$root.$emit('hide-dialog');
    }
  }
}
</script>

<style>
#app {
  font-family: "Poppins";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

:root {
  /* --primary-color: red;
  --primary-dark-color: darkred; */
}

.dialog {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  height: 100%;

  z-index: 9999;
}

.loading-overlay {
  z-index: 9999;

  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  justify-content: center;
  align-items: center;
}
.loading-overlay img {
  width: 70px;
  height: 70px;
}
</style>
