import Vue from "vue";
import Router from "vue-router";
import LanguageSetupPage from '../components/LanguageSetupPage'
import TermsAndConditions from '../components/TermsAndConditions';
import HomePage from "@/components/HomePage";
import forgotpass from "@/components/Auth/ForgotPass";
import login from "@/components/Auth/UserLogin";
import register from "@/components/Auth/RegisterUser";
import dashboard from "@/components/Pages/HomeDashboard";
import createwallet from "@/components/Pages/CreateWallet";
import transactionslist from "@/components/Pages/TransactionsList";
import camerapage from "@/components/Pages/CameraPage";
import maketransaction from "@/components/Pages/MakeTransaction";
import generatepin from "@/components/Pages/GeneratePin";

import offlinePage from '@/components/Pages/OfflinePage.vue';

import PhoneLogin from '@/components/Auth/PhoneLogin.vue';

const includPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return includPush.call(this, location).catch((err) => err);
};
Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "LanguageSetupPage",
      component: LanguageSetupPage
    },
    {
      path: "/terms",
      name: "TermsAndConditions",
      component: TermsAndConditions
    },
    {
      path: "/login",
      name: "login",
      component: login,
      meta: {
        prev: 'homepage'
      }
    },
    {
      path: "/login/phone",
      name: "login_phone",
      component: PhoneLogin,
      meta: {
        prev: 'homepage'
      }
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: dashboard,
      meta: {
        require_auth: true,
      }
    },
    {
      path: "/register",
      name: "register",
      component: register,
      meta: {
        prev: 'homepage'
      }
    },
    {
      path: "/cwallet",
      name: "createwallet",
      component: createwallet,
      meta: {
        require_auth: true,
      }
    },
    {
      path: "/homepage",
      name: "homepage",
      component: HomePage
    },
    {
      path: "/forgotPass",
      name: "forgotPass",
      component: forgotpass,
      meta: {
        prev: 'login'
      }
    },
    {
      path: "/wallet/:id/:token?/tx",
      name: "maketransaction",
      component: maketransaction,
      props: true,
      meta: {
        require_auth: true,
        prev: 'dashboard'
      }
    },
    {
      path: "/wallet/:id/:token?/tx/camera",
      name: "camera",
      component: camerapage,
      meta: {
        require_auth: true,
        prev: (router) => {
          router.go(-1);
        }
      }
    },
    {
      path: "/wallet/:id/:token?/txs",
      name: "transactionslist",
      component: transactionslist,
      meta: {
        require_auth: true,
        prev: 'dashboard'
      }
    },
    {
      path: "/generatepin",
      name: "generatepin",
      component: generatepin,
      props: true,
      meta: {
        prev: 'login',
        require_auth: true,
      }
    },
    {
      path: '/offline',
      name: 'offline',
      component: offlinePage
    }
  ]
});

router.beforeEach((to, from, next) => {
  router.app.$root.$emit('dialog-closed');

  /**
   * Scroll to top upon navigation to any other page
   */
  document.querySelector('body').scrollTo({
    top: 0,
    behavior: 'smooth'
  })

  /**
   * User went offline
   */
  const isOnline = navigator.onLine;
  if(!isOnline && to.name !== 'offline') {
    return next({
      name: 'offline'
    })
  }

  const { meta } = to;
  const { require_auth } = meta;

  if(require_auth) {
    // Check if user cookie exists
    const session = localStorage.getItem('access_token');
    const user = localStorage.getItem('user');
    
    if(!session || session == null || !user || user == null) {
      router.app.showDialog('Error', 'Please login to continue.');

      return next({
        name: 'homepage',
      })
    }
  }

  next();
})

/**
 * Detect if user is online or offline
 */
window.addEventListener('offline', event => {
  router.push({
    name: 'offline'
  });
})


export default router;