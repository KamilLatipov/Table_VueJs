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
    },

    SORT_ARRAY_ASC(state, id) {
      state.products = state.products.sort((a, b) => a[id] < b[id] ? -1 : 1);
    },

    SORT_ARRAY_DES(state, id) {
      state.products = state.products.sort((a, b) => a[id] < b[id] ? 1 : -1);
    },
  },
  actions: {
    getProducts,

    sortByAsc({ commit }, id) {
      commit('SORT_ARRAY_ASC', id);
    },

    sortByDes({ commit }, id) {
      commit('SORT_ARRAY_DES', id);
    },

  },
  modules: {
  }
})
