import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  state: {
    boardCheck: 0,
    independentCheck: 0,
    categoryCheck: 0,
    token: null,
    locationAuthentication: false,
    currentLocation: ""
  },
  getters: {
    getToken(state) {
      return state.token; // 토큰 값을 반환하는 게터
    },
  },
  mutations: {
    updateIndependentCheck(state, newValue) {
      state.independentCheck = newValue;
    },
    updateBoardCheck(state, newValue) {
      state.boardCheck = newValue;
    },
    updateCategoryCheck(state, newValue) {
      state.categoryCheck = newValue;
    },
    setLocation(state, newValue) {
      state.location = newValue;
    },
    setToken(state, token) {
      state.token = token; // 토큰 값을 상태에 저장하는 뮤테이션
    },
    removeToken(state) {
      const confirmed = confirm("로그아웃 하시겠습니까?");
      if (confirmed) {
        state.token = null;
        state.currentLocation = "";
      }
    },
    toggleLocationAuthentication(state) {
      state.locationAuthentication = !state.locationAuthentication;
    },
    setCurrentLocation(state, newValue) {
      state.currentLocation = newValue;
    },
  },
  actions: {
    updateIndependentCheck({ commit }, newValue) {
      commit('updateIndependentCheck', newValue);
    },
    updateBoardCheck({ commit }, newValue) {
      commit('updateBoardCheck', newValue);
    },
    updateCategoryCheck({ commit }, newValue) {
      commit('updateCategoryCheck', newValue);
    },
    updateLocation({ commit }, newValue) {
      commit('setLocation', newValue);
    },
    saveToken({ commit }, token) {
      commit('setToken', token); // 토큰 값을 저장하는 액션
    },
    logout({ commit }) {
      commit('removeToken');
    },
    toggleLocationAuthentication({ commit }) {
      commit('toggleLocationAuthentication');
    },
    setCurrentLocation({ commit }, location) {
      commit('setCurrentLocation', location);
    },
  },
  modules: {},
  plugins: [    createPersistedState({
    key: 'my-app', // 데이터를 식별하기 위한 키 값
    paths: ['locationAuthentication', 'token', 'currentLocation'] // 지속시키고자 하는 상태의 경로를 배열로 지정
  })],
});