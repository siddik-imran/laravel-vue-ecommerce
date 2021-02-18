import axios from "axios"
import { result } from "lodash";

export const admin = {
    namespaced: true,
    state: {
        admin: {}
    },
    getters: {
        getAuthUser(state){
            return state.admin;
        }
    },
    actions: {
        getUser(context){
            axios.get('/admin/user')
                .then((result) => {
                    context.commit('getUser', result.data.admin)
                }).catch((err) => {

                });
        },

    },
    mutations: {
        getUser(state, payload){
            return state.admin = payload
        }
    }
}
