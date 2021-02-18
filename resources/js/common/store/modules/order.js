import axios from "axios"
import { result } from "lodash";

export const order = {
    namespaced: true,
    state: {
        order: {},
        orders: [],
    },
    getters: {
        order(state){
            return state.order;
        },
        orderList(state){
            return state.orders;
        }
    },
    actions: {
        userOrderList(context, payload){
            axios.get('/user/order-list/?page='+payload)
            .then((result) => {
                context.commit('orderList', result.data.orders)
            }).catch((err) => {

            });
        },
        orderList(context, payload){
            axios.get('/admin/order/?page='+payload)
            .then((result) => {
                context.commit('orderList', result.data.orders)
            }).catch((err) => {

            });
        },
        order(context, payload){
            axios.get(`/admin/order-detail/${payload}`)
            .then((result) => {
                context.commit('order', result.data.order)
            }).catch((err) => {

            });
        },
        // deleteCategory(context, payload){
        //     axios.delete('/admin/category/'+payload)
        //     .then((result) => {
        //         context.commit('categoryList', result.data.categories)
        //     }).catch((err) => {

        //     });
        // },
        // categoryListAll(context){
        //     axios.get('/admin/all-category/')
        //     .then((result) => {
        //         context.commit('categoryList', result.data.categories)
        //     }).catch((err) => {

        //     });
        // }

    },
    mutations: {
        order(state, payload){
            return state.order = payload;
        },
        orderList(state, payload){
            return state.orders = payload;
        }
    }
}
