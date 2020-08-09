import Vuex from 'vuex'
import Vue from 'vue'
import cart from './module/cart'
import products from './module/products'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    userInfo: {
      email: 'wayne.liang@infiai.com'
    }
  },
  modules: {
    cart,
    products
  }
})

export default store;