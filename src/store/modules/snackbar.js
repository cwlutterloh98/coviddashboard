// by default show nothing
const state = {
  show: false,
  message: "",
  type: ""
};
// snackbar states
const mutations = {
  show: (state, { message, type }) =>
    ([state.message, state.type, state.show] = [message, type, true]),
  hide: state => (state.show = false)
};

export default {
  namespaced: true,
  state,
  mutations
};
