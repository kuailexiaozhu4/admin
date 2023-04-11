import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        hospitalId: ''
    },
    getters: {},
    mutations: {
        setHospitalId(state, value) {
            state.hospitalId = value;
        }
    },
    actions: {},
    modules: {}
})
