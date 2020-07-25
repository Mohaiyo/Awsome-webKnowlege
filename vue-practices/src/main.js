import Vue from 'vue'
import App from './App.vue'
import { Button, Tabs } from 'ant-design-vue'
// import Vuex from 'vuex'
import Vuex from './views/minVuex/min-vuex'

Vue.config.productionTip = false

Vue.use(Button)
Vue.use(Tabs)
// Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment(state, payload) {
      state.count = state.count + payload
    }
  }
})
Vue.prototype.$store = store
Vue.directive('ant-ref', {
    bind: function bind(el, binding, vnode) {
      console.log(binding)
      console.log('vnode', vnode.componentInstance)
      binding.value(vnode.componentInstance || el, vnode.key)
    },
    update: function update(el, binding, vnode, oldVnode) {
      if (oldVnode.data && oldVnode.data.directives) {
        var oldBinding = oldVnode.data.directives.find(function(directive) {
          var name = directive.name
          return name === 'ant-ref' || 'ref'
        })
        if (oldBinding && oldBinding.value !== binding.value) {
          oldBinding && oldBinding.value(null, oldVnode.key)
          binding.value(vnode.componentInstance || el, vnode.key)
          return
        }
      }

      if (vnode.componentInstance !== oldVnode.componentInstance || vnode.elm !== oldVnode.elm) {
        binding.value(vnode.componentInstance || el, vnode.key)
      }
    },
    unbind: function(el, binding, vnode) {
      binding.value(null, vnode.key)
    }
})


new Vue({
  // store: store,
  render: h => h(App),
}).$mount('#app')
