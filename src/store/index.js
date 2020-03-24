import Vue from 'vue'
import Vuex from 'vuex'
import { getProducts } from '../request.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [

    ]
  },
  mutations: {
    GET_PRODUCTS(state, data) {
      state.products = data;
    }
  },
  actions: {
    getProducts,
  },
  modules: {
  }
})
