import axios from "axios"
import { result } from "lodash";

export const brand = {
    namespaced: true,
    state: {
        brands: [],
    },
    getters: {
        brandList(state){
            return state.brands;
        }
    },
    actions: {
        brandList(context, payload){
            axios.get('/admin/brand/?page='+payload)
            .then((result) => {
                context.commit('brandList', result.data.brands)
            }).catch((err) => {

            });
        },
        deleteBrand(context, payload){
            axios.delete('/admin/brand/'+payload)
            .then((result) => {
                context.commit('brandList', result.data.brands)
            }).catch((err) => {

            });
        },
        brandListAll(context){
            axios.get('/admin/all-brand/')
            .then((result) => {
                context.commit('brandList', result.data.brands)
            }).catch((err) => {

            });
        }

    },
    mutations: {
        brandList(state, payload){
            return state.brands = payload;
        }
    }
}
