import axios from "axios"
import { result } from "lodash";

export const product = {
    namespaced: true,
    state: {
        products: [],
        product: {},
        sidebarInfos: {},
    },
    getters: {
       productList(state){
            return state.products;
        },
        singleProduct(state){
            return state.product;
        },
        productSidebarInfo(state){
            return state.sidebarInfos;
        }
    },
    actions: {
        // for user
        getAllProductList(context, payload){
            axios.get('/product-list/?page='+payload)
            .then((result) => {
                context.commit('productList', result.data.products)
            }).catch((err) => {

            });
        },
        productSidebarInfo(context){
            axios.get('product-sidebar-info')
            .then((result) => {
                context.commit('productSidebarInfo', result.data)
            }).catch((err) => {

            });
        },
        productFilter(context, payload){
            axios.get(`/product-filter/${payload}`)
            .then((result) => {
                context.commit('productList', result.data.products)
            }).catch((err) => {

            });

        },

        // admin
       productList(context, payload){
            axios.get('/admin/product/?page='+payload)
            .then((result) => {
                context.commit('productList', result.data.products)
            }).catch((err) => {

            });
        },
        deleteProduct(context, payload){
            axios.delete('/admin/product/'+payload)
            .then((result) => {
                context.commit('productList', result.data)
            }).catch((err) => {

            });
        },
        editProduct(context, payload){
            axios.get(`/admin/product/${payload}/edit`)
            .then((result) => {
                context.commit('singleProduct', result.data.product)
            }).catch((err) => {

            });
        }

    },
    mutations: {
       productList(state, payload){
            return state.products = payload;
        },
        singleProduct(state, payload){
            return state.product = payload;
        },
        productSidebarInfo(state, payload){
            return state.sidebarInfos = payload;
        }
    }
}
