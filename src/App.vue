<template>
  <div class="container">
    <router-view></router-view>

    <div v-if="isLoading" class="loading-overlay">
      <img src="/assets/loader.gif" />
    </div>

    <div class="dialog">
      <kaiui-dialog :title="dialogData.title" v-model="dialogShowing" :softkeys="{
        right: $t('ok'),
      }" v-on:softRight="closeDialog">
        <kaiui-text :text="dialogData.message" />
      </kaiui-dialog>
    </div>
  </div>
</template>

<script>
import i18n from '@/lang/setup';
import { logout } from '@/auth';

export default {
  name: "app",
  data: () => ({
    dialogOpen: false,

    isLoading: false,

    dialogShowing: false,
    dialogData: {
      title: "",
      message: "",
    },
  }),
  beforeDestroy() {
    document.removeEventListener("keydown", this.onKeyDown);
  },
  created() {
    /**
     * Intercept any outgoing request, and attach the "Authorization" header
     */
    this.$http.interceptors.request.use(config => {
      const access_token = localStorage.getItem('access_token');
      if(access_token) {
        config.headers.common['Authorization'] = `Bearer ${access_token}`;
      }
      return config;
    })

    /**
     * Intercept any responses, and catch 401s,
     * which means the user is not authenticated and redirect back to login page
     */
     this.$http.interceptors.response.use(response => {
      return response;
    }, error => {
      error.generic = error && error.response && error.response.data && error.response.data.error ? error.response.data.error : i18n.t('genericError');

      if(error.response.status === 401) {
        logout();

        error.generic = i18n.t('loggedOut');

        this.$router.push({
          name: 'homepage'
        })
      }

      return Promise.reject(error);
    })
  },
  mounted() {
    document.addEventListener("keydown", this.onKeyDown);

    const selectedLang = this.$cookies.get('lang');
    if (selectedLang) i18n.locale = selectedLang;

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

    /**
     * 
     */
    const bodyEl = document.querySelector('body')
    const observer = new MutationObserver(records => {
      records.forEach(record => {
        if(record.type === 'attributes' && record.attributeName === 'nav-selected') {
          const isSelected = record.target.getAttribute('nav-selected') === "true";

          if(isSelected) {
            const rect = record.target.getBoundingClientRect();
            const absTop = bodyEl.scrollTop + rect.top;

            if(absTop < 150) {
              bodyEl.scrollTo({ 
                top: 0,
                behavior: 'smooth'
              })
            }
          }
        }
      })
    })

    observer.observe(this.$el, {
      attributes: true,
      subtree: true,
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
      if (event.key === 'Backspace' || event.key === '`') {
        /**
         * Main dialog is open, close it
         */
        if (this.dialogShowing) {
          event.preventDefault();

          return this.$root.$emit('hide-dialog');
        }

        /**
         * A dialog is showing inside another view
         */
        if (this.dialogOpen) {
          event.preventDefault();

          return this.$root.$emit('close-dialog');
        }

        const { meta } = this.$route;

        if (meta.prev) {
          event.preventDefault();

          if (typeof meta.prev === 'function') {
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
:root {
  /* --primary-color: red;
  --primary-dark-color: darkred; */
}

#app {
  font-family: "Poppins";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
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

.kaiui-tabs-header .kaiui-tabs-header-tab:after {
  content: '';

  border-right: 1px solid #ccc;
}

.kaiui-content-wrapper {
  padding-bottom: 30px;
}
</style>
