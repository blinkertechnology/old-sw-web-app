import Vue from "vue";
import Router from "vue-router";
import TermsAndConditions from '../components/TermsAndConditions';
import hello2 from "@/components/hello2Page";
import faq from "@/components/faqPage";
import contactus from "@/components/ContactUs";
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
      name: "TermsAndConditions",
      component: TermsAndConditions
    },
    {
      path: "/",
      name: "hello2",
      component: hello2
    },
    {
      path: "/",
      name: "faq",
      component: faq,
      meta: {
        prev: 'TermsAndConditions'
      }
    },
    {
      path: "/",
      name: "contactus",
      component: contactus
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
      path: "/wallet/:id/tx",
      name: "maketransaction",
      component: maketransaction,
      props: true,
      meta: {
        require_auth: true,
        prev: (router) => {
          router.go(-1);
        }
      }
    },
    {
      path: "/wallet/:id/tx/camera",
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
      path: "/wallet/:id/txs",
      name: "transactionslist",
      component: transactionslist,
      meta: {
        require_auth: true,
        prev: (router) => {
          router.go(-1);
        }
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
  ]
});

router.beforeEach((to, from, next) => {
  router.app.$root.$emit('dialog-closed');

  const { meta } = to;
  const { require_auth } = meta;

  if(require_auth) {
    // Check if user cookie exists
    const session = localStorage.getItem('access_token');
    const user = localStorage.getItem('user');
    
    if(!session || session == null || !user || user == null) {
      next({
        name: 'login'
      })
    }
  }

  next();
})


export default router;