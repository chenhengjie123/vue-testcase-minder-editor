export const mutations = {

  changeDrag(state, bool) {
    state.working.draging = bool;
  },

  setMinder(state, data) {
    state.minder = data
  },

  setEditor(state, data) {
    state.editor = data
  },

  changeSave(state, bool) {
    state.working.saving = bool;
  },

  changeCount(state) {
    state.count++;
  },

  increment(state) {
    state.count++
  },

  decrement(state) {
    state.count--
  },

  registerEvent(state, callback) {
    state.callbackQueue.push(callback);
  },

  setConfig(state, data) {
    var supported = Object.keys(state.config);

    for (var key in data) {
      if (data.hasOwnProperty(key) && supported.indexOf(key) !== -1) {
        state.config[key] = data[key];
      } else {
        console.error('Unsupported config key: ', key, ', please choose in :', supported.join(', '));
        return false;
      }
    }
    return true;
  }

}
