import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Home from '../components/public/Home.vue'
import Shop from '../components/public/shop/Shop.vue'
import About from '../components/public/shop/About.vue'
import Cart from '../components/public/shop/Cart.vue'
import Checkout from '../components/public/shop/Checkout.vue'
import Contact from '../components/public/shop/Contact.vue'
import Wishlist from '../components/public/shop/Wishlist.vue'

// user component import
import UserLogin from '../components/public/auth/UserLogin.vue'
import UserRegister from '../components/public/auth/UserRegister.vue'
import UserDashboard from '../components/public/user/UserDashboard.vue'

const router = new VueRouter({
    mode: 'history',
    routes:[

        { path: '/', component: Home, name: 'Home' },
        { path: '/shop', component: Shop, name: 'Shop' },
        { path: '/about', component: About, name: 'About' },
        { path: '/cart', component: Cart, name: 'Cart' },
        { path: '/contact', component: Contact, name: 'Contact' },
        {
            path: '/checkout', component: Checkout, name: 'Checkout',
            beforeEnter: (to, from, next) => {
                const isAuthenticated = localStorage.getItem('userLoggedIn') ? true : false;
                if (to.name !== 'UserLogin' && !isAuthenticated) next({ name: 'UserLogin' })
                else next();
            }
        },

        {
            path: '/wishlist', component: Wishlist, name: 'Wishlist',
            beforeEnter: (to, from, next) => {
                const isAuthenticated = localStorage.getItem('userLoggedIn') ? true : false;
                if (to.name !== 'UserLogin' && !isAuthenticated) next({ name: 'UserLogin' })
                else next();
            }
        },

        // User Componet
        {
            path: '/user-login', component: UserLogin, name: 'UserLogin',
            beforeEnter: (to, from, next) => {
                const isAuthenticated = localStorage.getItem('userLoggedIn') ? true : false;
                if (to.name !== 'UserLogin' && !isAuthenticated) next({ name: 'UserDashboard' })
                else next();
            }
        },

        { path: '/user-register', component: UserRegister, name: 'UserRegister' },

        {
            path: '/user/user-dashboard', component: UserDashboard, name: 'UserDashboard',
            beforeEnter: (to, from, next) => {
                const isAuthenticated = localStorage.getItem('userLoggedIn') ? true : false;
                if (to.name !== 'UserLogin' && !isAuthenticated) next({ name: 'UserLogin' })
                else next();
            }
        },

    ]
  })

export default router;

