
import * as getters from './getters'
import {
  actions
} from './actions'
import {
  mutations
} from './mutations'
import {
  state
} from './state'

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
