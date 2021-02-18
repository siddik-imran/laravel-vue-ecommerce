import axios from "axios"
import { result } from "lodash";

export const wishlist = {
    namespaced: true,
    state: {
        wishlists: [],
    },
    getters: {
        wishList(state){
            return state.wishlists;
        }
    },
    actions: {
        wishList(context, payload){
            axios.get('/user/wishlist/?page='+payload)
            .then((result) => {
                context.commit('wishList', result.data.wishlists)
            }).catch((err) => {

            });
        },
        deleleWishlist(context, payload){
            axios.delete('/user/wishlist/'+payload)
            .then((result) => {
                context.commit('wishList', result.data.wishlists)
            }).catch((err) => {

            });
        },
        // wishListAll(context){
        //     axios.get('/admin/all-wishlist/')
        //     .then((result) => {
        //         context.commit('wishList', result.data.wishlists)
        //     }).catch((err) => {

        //     });
        // }

    },
    mutations: {
        wishList(state, payload){
            return state.wishlists = payload;
        }
    }
}
