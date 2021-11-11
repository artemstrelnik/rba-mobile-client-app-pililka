import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    activeRoute: 1,
    menu: [],
    modules: [],
    basket: [],
    showPreloader: false,
    modalData: {
      show: false,
      text: "",
      closeCallback: () => {}
    }
  },

  actions: {
    userLogged({ commit }, user) {
      commit('USER_LOGGED', user)
    },
    setActiveRoute({ commit }, route) {
      commit('SET_ROUTE', route)
    },
    setMenu({ commit }, menu) {
      commit('SET_MENU', menu)
    },
    setModules({ commit }, modules) {
      commit('SET_MODULES', modules)
    },
    setBasket({ commit }, basket) {
      commit('SET_BASKET', basket)
    },
    clearBasket({ commit }) {
      commit('SET_BASKET', [])
    },
    addBasket({ commit }, newProduct) {
      commit('ADD_BASKET', newProduct)
    },
    displayPreloader({ commit }) {
      commit('SHOW_PRELOADER');
    },
    hidePreloader({ commit }) {
      commit('HIDE_PRELOADER');
    },
    showModal({ commit }, modalInfo) {
      commit("SHOW_MODAL", modalInfo);
    },
    hideModal({ commit }) {
      commit("HIDE_MODAL");
    }
  },

  mutations: {
    USER_LOGGED(state, user) {
      state.user = user
    },
    SET_MENU(state, menu) {
      state.menu = menu
    },
    SET_MODULES(state, modules) {
      state.modules = modules
    },
    SET_ROUTE(state, route) {
      state.activeRoute = route
    },
    SET_BASKET(state, basket) {
      state.basket = basket
      localStorage.setItem('basket', JSON.stringify(state.basket))
    },
    ADD_BASKET(state, newProduct) {
      state.basket.unshift(newProduct)
      localStorage.setItem('basket', JSON.stringify(state.basket))
    },
    SHOW_PRELOADER(state) {
      state.showPreloader = true;
    },
    HIDE_PRELOADER(state) {
      state.showPreloader = false;
    },
    SHOW_MODAL(state, modalInfo) {
      state.modalData.show = true;
      state.modalData.text = modalInfo.text;
      state.modalData.closeCallback = modalInfo.closeCallback;
    },
    HIDE_MODAL(state) {
      state.modalData.show = false;
      state.modalData.text = "";
      state.modalData.closeCallback = () => {};
    }
  }
})
