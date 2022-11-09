import Vue from "vue";
import Router from "vue-router";
import TermsAndConditions from '../components/TermsAndConditions';
import hello2 from "@/components/hello2Page";
import faq from "@/components/faqPage";
import contactus from "@/components/ContactUs";
import HomePage from "@/components/HomePage";
import forgotpass from "@/components/Auth/ForgotPass";
import details from "@/components/Pages/DetailsPage";
import login from "@/components/Auth/UserLogin";
import register from "@/components/Auth/RegisterUser";
import dashboard from "@/components/Pages/HomeDashboard";
import createwallet from "@/components/Pages/CreateWallet";
import wallets from "@/components/Pages/WalletsList";
import wallet from "@/components/Pages/SingleWallet";
import transactionslist from "@/components/Pages/TransactionsList";
import camerapage from "@/components/Pages/CameraPage";
import maketransaction from "@/components/Pages/MakeTransaction";
import generatepin from "@/components/Pages/GeneratePin";

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
      path: "/",
      name: "details",
      component: details
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
      path: "/",
      name: "dashboard",
      component: dashboard
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
      path: "/walletlist",
      name: "wallets",
      component: wallets,
      meta: {
        prev: 'dashboard',
        require_auth: true,
      }
    },
    {
      path: "/wallet/:id",
      name: "wallet",
      component: wallet,
      props: true,
      meta: {
        prev: 'wallets',
        require_auth: true,
      }
    },
    {
      path: "/transactions/:secretType",
      name: "transactionslist",
      component: transactionslist,
      meta: {
        require_auth: true,
      }
    },
    {
      path: "/camerapage",
      name: "camera",
      component: camerapage,
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
      path: "/maketransaction",
      name: "maketransaction",
      component: maketransaction,
      props: true,
      meta: {
        require_auth: true,
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
  const { meta } = to;
  const { require_auth } = meta;

  if(require_auth) {
    // Check if user cookie exists
    const session = localStorage.getItem("user_id");
    if(!session || session == null) {
      next({
        name: 'login'
      })
    }
  }

  next();
})


export default router;