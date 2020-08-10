import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    attendance: [],
    snackBar: {
      ativo: false,
      mensagem: "",
      color: "",
      timeout: 0,
    },
  },
  mutations: {
    setAttendance(state, attendance) {
      state.attendance = attendance;
    },
    setarSBAtivo(state, status) {
      state.snackBar.ativo = status;
    },
    habilitarSnackBar(state, dados) {
      if (dados.mensagem !== "") {
        state.snackBar.mensagem = dados.mensagem;
        state.snackBar.color = dados.color;
        state.snackBar.timeout = dados.timeout;
        state.snackBar.ativo = dados.ativo;
      }
    },
  },
  actions: {},
  getters: {
    getAttendance: (state) => state.attendance,
  },
  modules: {},
});
