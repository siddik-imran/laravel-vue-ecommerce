import axios from "axios"
import { result } from "lodash";

export const user = {
    namespaced: true,
    state: {
        user: {},
        userList: []
    },
    getters: {
        getAuthUser(state){
            return state.user;
        },
        userList(state){
            return state.userList;
        }
    },
    actions: {
        getUser(context){
            axios.get('/user')
                .then((result) => {
                    context.commit('getUser', result.data.user)
                }).catch((err) => {

                });
        },
        userLogout(context){
            axios.post('/logout')
            .then(res=>{
                context.commit('getUser', res.data)
            })
        },
        userList(context, payload){
            axios.get('/admin/user-list?page='+payload)
            .then((result) => {
                context.commit('userList', result.data.user_list)
            }).catch((err) => {

            });

        }
    },
    mutations: {
        getUser(state, payload){
            return state.user = payload
        },
        userList(state, payload){
            return state.userList = payload
        }
    }
}
