import Vue from 'vue'
import Vuex from 'vuex'

import App from './App'

// import '../lib/VueTestcaseMinderEditor.css'
import VueTestcaseMinderEditor from './src/VueTestcaseMinderEditor.vue'

// Vue.use(VueTestcaseMinderEditor)
// console.log('using VueTestcaseMinderEditor', VueTestcaseMinderEditor)

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    caseEditorStore: VueTestcaseMinderEditor.caseEditorStore
  }
})

new Vue({
  el: '#app',
  store,
  render: h => h(App),
  components: {
    App
  }
}).$mount('#app')
