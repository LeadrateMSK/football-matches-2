import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: true,
    matches: [],
    userInput: '',
    isLive: false,
  },
  mutations: {
    SET_LOADING: (state) => {
      state.isLoading = !state.isLoading;
    },
    SET_MATCHES: (state, matches) => {
      state.matches = matches;
    },
    SET_USERINPUT: (state, userInput) => {
      state.userInput = userInput;
    },
    SET_ISLIVE: (state, isLive) => {
      state.isLive = isLive;
    },
  },
  actions: {
    CHANGE_LOADING: (context) => {
      context.commit('SET_LOADING');
    },
    CHANGE_MATCHES: (contex, matches) => {
      contex.commit('SET_MATCHES', matches);
    },
    CHANGE_USERINPUT: (contex, userInput) => {
      contex.commit('SET_USERINPUT', userInput);
    },
    CHANGE_ISLIVE: (contex, isLive) => {
      contex.commit('SET_ISLIVE', isLive);
    },
  },
  getters: {
    getIsLoading(state) { return state.isLoading; },
    getMatches(state) { return state.matches; },
    getUserInput(state) { return state.userInput; },
    getIsLive(state) { return state.isLive; },
  },
});
