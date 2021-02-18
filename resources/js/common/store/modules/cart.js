import axios from "axios"
import { result } from "lodash";

export const cart = {
    namespaced: true,
    state: {
        products: [],
    },
    getters: {
       productList(state){
            return state.products;
        },
    },
    actions: {

        productList(context){
            axios.get('/cart/cart-product-list')
            .then((result) => {
                context.commit('productList', result.data)
            }).catch((err) => {

            });
        },

        // deleteProduct(context, payload){
        //     axios.delete('/admin/product/'+payload)
        //     .then((result) => {
        //         context.commit('productList', result.data)
        //     }).catch((err) => {

        //     });
        // },
        // editProduct(context, payload){
        //     axios.get(`/admin/product/${payload}/edit`)
        //     .then((result) => {
        //         context.commit('singleProduct', result.data.product)
        //     }).catch((err) => {

        //     });
        // }

    },
    mutations: {
       productList(state, payload){
            return state.products = payload;
        },

    }
}
