// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import VueKaiUI from "vue-kaiui";
import router from "./router";
import axios from 'axios'
import VueSession from 'vue-session';
import AxiosPlugin from 'vue-axios-cors';
import VueQRCodeComponent from 'vue-qrcode-component';
import VueQrcodeReader from "vue-qrcode-reader";
import VueCookies from 'vue-cookies';

import i18n from '@/lang/setup';

import CustomInput from '@/components/common/CustomInput.vue';
import ListItem from '@/components/common/ListItem.vue';

import DialogMixin from '@/mixins/dialog.vue';
import LoadingMixin from '@/mixins/loading.vue';

const instance = axios.create({
  baseURL: process.env.VUE_APP_URL,
  headers: {
    'ngrok-skip-browser-warning': 'skip',
    'User-Agent': 'sorted-wallet',
    'Content-Type': 'application/json',
  }
})

/**
 * Intercept any outgoing request, and attach the "Authorization" header
 */
instance.interceptors.request.use(config => {
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
instance.interceptors.response.use(response => {
  return response;
}, error => {
  error.generic = error && error.response && error.response.data && error.response.data.error ? error.response.data.error : 'Something went wrong, try again.';

  if(error.response.status === 401) {
    console.log('401 error');
    return router.push({
      name: 'login',
      query: {
        reason: 'You\'ve been logged out, please log in again.'
      }
    })
  }

  return Promise.reject(error);
})

Vue.prototype.$http = instance;

Vue.config.productionTip = false;

Vue.use(VueKaiUI);
Vue.use(VueSession);
Vue.use(AxiosPlugin);
Vue.use(VueQrcodeReader);
Vue.use(VueCookies);

Vue.component('qr-code', VueQRCodeComponent);

Vue.component(CustomInput.name, CustomInput);
Vue.component(ListItem.name, ListItem);

Vue.mixin(DialogMixin);
Vue.mixin(LoadingMixin);


/* eslint-disable no-new */
new Vue({
  render: (h) => h(App),
  router,
  template: "<App/>",
  i18n,

  components: { App },
}).$mount("#app");

window.addEventListener('keydown', (e) => {
  switch(e.key) {
    case 'ArrowLeft':
      e.preventDefault();

      return document.dispatchEvent(new KeyboardEvent('keydown', {
        'key': 'SoftLeft'
      }));
    case 'ArrowRight':
      e.preventDefault();

      return document.dispatchEvent(new KeyboardEvent('keydown', {
        'key': 'SoftRight'
      }));

    case 'Enter':
      e.preventDefault();

      return document.dispatchEvent(new KeyboardEvent('keydown', {
        'key': 'SoftCenter'
      }));
  }
})
