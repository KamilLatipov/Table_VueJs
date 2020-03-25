import Vue from 'vue'
import Vuex from 'vuex'
import { getProducts } from '../request.js'
import { deleteProducts } from '../request.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
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

    DELETE_PRODUCTS(state, idArray) {
      idArray.forEach(item =>
         state.products = state.products.filter(n => n.product !== item)
      )
    }
  },
  actions: {
    getProducts,

    deleteProducts,

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
