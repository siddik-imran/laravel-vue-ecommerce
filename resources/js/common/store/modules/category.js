import axios from "axios"
import { result } from "lodash";

export const category = {
    namespaced: true,
    state: {
        categories: [],
    },
    getters: {
        categoryList(state){
            return state.categories;
        }
    },
    actions: {
        categoryList(context, payload){
            axios.get('/admin/category/?page='+payload)
            .then((result) => {
                context.commit('categoryList', result.data.categories)
            }).catch((err) => {

            });
        },
        deleteCategory(context, payload){
            axios.delete('/admin/category/'+payload)
            .then((result) => {
                context.commit('categoryList', result.data.categories)
            }).catch((err) => {

            });
        },
        categoryListAll(context){
            axios.get('/admin/all-category/')
            .then((result) => {
                context.commit('categoryList', result.data.categories)
            }).catch((err) => {

            });
        }

    },
    mutations: {
        categoryList(state, payload){
            return state.categories = payload;
        }
    }
}
