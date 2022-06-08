import Vue from 'vue'
import Vuex from 'vuex'

const store = new Vuex.Store({
    state: {
        backendUrl: "http://127.0.0.1:8000/api/students"
    },
    mutations: {},
    actions: {},
    modules: {},
    getters: {
        getServerUrl: (state, getters) => {
            return state.backendUrl
        }
    },
})

export default store
