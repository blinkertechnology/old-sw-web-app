// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import VueKaiUI from "vue-kaiui";
import router from "./router";
import axios from 'axios'
import VueToastr from "vue-toastr";
import VueSession from 'vue-session';
import AxiosPlugin from 'vue-axios-cors';
import VueQRCodeComponent from 'vue-qrcode-component';
import VueQrcodeReader from "vue-qrcode-reader";
import VueCookie from 'vue-cookie';

import i18n from '@/lang/setup';

import CustomInput from '@/components/CustomInput.vue';

const instance = axios.create({
  baseURL: process.env.VUE_APP_URL,
  headers: {
    // 'ngrok-skip-browser-warning': 'skip',
    // 'User-Agent': 'sorted-wallet',
    // 'Content-Type': 'application/json'
  }
})

Vue.prototype.$http = instance;

Vue.config.productionTip = false;

Vue.use(VueKaiUI);
Vue.use(VueSession);
Vue.use(AxiosPlugin);
Vue.use(VueQrcodeReader);
Vue.use(VueToastr, {
  defaultTimeout: 3000,
  defaultProgressBar: false,
  defaultProgressBarValue: 0,
  defaultType: "error",
  defaultPosition: "toast-top-full-width",
  defaultCloseOnHover: false,
  defaultStyle: { "background-color": "red" },
  defaultClassNames: ["animated", "zoomInUp"]
});
Vue.use(VueCookie);

Vue.component('qr-code', VueQRCodeComponent);

Vue.component(CustomInput.name, CustomInput);


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
