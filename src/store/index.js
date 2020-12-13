import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const state = {
    baseUrl: 'https://5fd62f4dea55c40016041ce8.mockapi.io/customers',
    customers: [],
    message: null,
}
const getters = {
    getCustomers(state) {
        return state.customers
    },
    getMessage(state) {
        return state.message
    },
}
const mutations = {
    setCustomer(state, payload) {
        state.customers = payload
    },
    setMessage(state, message) {
        state.message = message
    }
}
const actions = {
    addCustomer(vuexContext, payload) {
        axios.post(state.baseUrl, payload)
            .then(() => {
                vuexContext.dispatch('getCustomer')
                vuexContext.commit('setMessage', 'Customer Added')
            })
            .catch(err => {
                console.log(err)
            })
    },
    getCustomer(vuexContext) {
        axios.get(state.baseUrl)
            .then(response => {
                vuexContext.commit('setCustomer', response.data)
            })
            .catch(err => {
                console.log(err)
            })
    },
    editCustomer(vuexContext, payload) {
        axios.put(`${state.baseUrl}/${payload.id}`, payload)
            .then(() => {
                vuexContext.dispatch('getCustomer')
                vuexContext.commit('setMessage', 'Customer Edited')
            })
            .catch(err => {
                console.log(err)
            })
    },
    deleteCustomer(vuexContext, id) {
        axios.delete(`${state.baseUrl}/${id}`)
            .then(() => {
                vuexContext.dispatch('getCustomer')
                vuexContext.commit('setMessage', 'Customer Deleted')
            })
            .catch(err => {
                console.log(err)
            })
    }
}

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
})

export default store