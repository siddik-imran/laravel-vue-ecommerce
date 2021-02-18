import Vue from 'vue'
import Vuex from 'vuex'

import {user} from './modules/user'
import {admin} from './modules/admin'
import { category } from './modules/category'
import { brand } from './modules/brand'
import { product } from './modules/product'
import { wishlist } from './modules/wishlist'
import { cart } from './modules/cart'
import { order } from './modules/order'

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules:{
        user : user,
        admin : admin,
        category : category,
        brand : brand,
        product : product,
        wishlist : wishlist,
        cart : cart,
        order : order,
    }
})
