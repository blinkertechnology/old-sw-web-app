import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import hello2 from '@/components/hello2Page'
import faq from '@/components/faqPage'
import contactus from '@/components/ContactUs'
import HomePage from '@/components/HomePage'
import forgotpass from '@/components/Auth/ForgotPass'
import details from '@/components/Pages/DetailsPage'
import login from '@/components/Auth/UserLogin'
import register from '@/components/Auth/RegisterUser'
import dashboard from '@/components/Pages/HomeDashboard'
import createwallet from '@/components/Pages/CreateWallet'
import wallets from '@/components/Pages/WalletsList'
import wallet from '@/components/Pages/SingleWallet'
import transactionslist from '@/components/Pages/TransactionsList'
import camerapage from '@/components/Pages/CameraPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/',
        name: 'HelloWorld',
        component: HelloWorld
    },
    {
        path: '/',
        name: 'hello2',
        component: hello2
    },
    {
        path: '/',
        name: 'faq',
        component: faq
    },
    {
        path: '/',
        name: 'contactus',
        component: contactus
    },
    {
        path: '/',
        name: 'details',
        component: details
    },
     {
        path: '/login',
        name: 'login',
        component: login
    },
    {
        path: '/',
        name: 'dashboard',
        component: dashboard
    },
    {
        path: '/',
        name: 'register',
        component: register
    },
    {
        path: '/cwallet',
        name: 'createwallet',
        component: createwallet
    },
    {
        path: '/walletlist',
        name: 'wallets',
        component: wallets
    },
    {
        path: '/wallet/:id',
        name: 'wallet',
        component: wallet
    },
    {
        path: '/transactions/:secretType',
        name: 'transactionslist',
        component: transactionslist
    },
    {
        path: '/camerapage',
        name: 'camera',
        component: camerapage
    },
    {
        path: '/homepage',
        name: 'homepage',
        component: HomePage
    },
    {
        path: '/forgotPass',
        name: 'forgotPass',
        component: forgotpass
    },
  ]
})
