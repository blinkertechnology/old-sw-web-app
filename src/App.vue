<template>
    <router-view></router-view>
</template>

<script>
import i18n from '@/lang/setup';

export default {
  name: "app",
  data: () => ({
    dialogOpen: false,
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
          console.log('close-dialog', this.dialogOpen);
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
</style>
